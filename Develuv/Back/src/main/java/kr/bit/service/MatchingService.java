package kr.bit.service;

import kr.bit.dto.MatchingListDTO;
import kr.bit.dto.matching.LatLonDTO;
import kr.bit.mapper.MatchingListMapper;
import kr.bit.service.matching.KDTree;
import kr.bit.service.matching.KDTreeAl;
import org.jscience.mathematics.number.Float64;
import org.jscience.mathematics.vector.Float64Vector;
import org.jscience.mathematics.vector.Vector;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@Service
public class MatchingService {

    @Autowired
    private MatchingListMapper matchingListMapper;

    private final KDTreeAl kdTreeAl = new KDTreeAl();

    // 위도경도 테이블 삽입
    public void insertCoodr(String address, String city , String user_id) {
        Double[] coodr = getCoodr(address);
        LatLonDTO inLatLon = new LatLonDTO(user_id, city, coodr[0], coodr[1]);
        matchingListMapper.insertLatLon(inLatLon);
    }

    // 맨처음 도시로 리스트 가져오기
    public List<MatchingListDTO> findMatchingListByCity(String user_id){

        LatLonDTO userLatLon = matchingListMapper.findLatLonByUserId(user_id);
        List<LatLonDTO> cityUserList = matchingListMapper.findLatLonByCity(userLatLon.getCity());
        KDTree kdTree = new KDTree(2);

        System.out.println("받은 city 값 : "+ userLatLon.getCity() + " userId : " +user_id);
        System.out.println("찾은 유저의 latlon 값 개수 "+cityUserList.size());

        int cnt =0;
        for(LatLonDTO latLon : cityUserList){
            kdTree.insert(latLon);
            cnt++;
        }

        System.out.println("넣은 latlon 값: "+ cnt);

        Vector<Float64> target = Float64Vector.valueOf(userLatLon.getLatitude(), userLatLon.getLongitude());

        // 12개의 최근접 이웃 찾기
        List<LatLonDTO> neighbors = kdTree.nearestNeighbors(target, 12);

        System.out.println("최근접 이웃 12 명의 위도 경도");
        System.out.println(neighbors.size());

        List<MatchingListDTO> result = new ArrayList<>();

        for(LatLonDTO latLon : neighbors){
            System.out.println(latLon.getLatitude() + " : " + latLon.getLongitude());
            MatchingListDTO matchingListDTO = matchingListMapper.findMatchingUserById(latLon.getUser_id());
            result.add(matchingListDTO);
        }

        return result;
    }

    // nbti로 매칭 리스트 가져오기
    public List<MatchingListDTO> findMatchingListByNbti(String user_id, String nbti) {
        LatLonDTO userLatLon = matchingListMapper.findLatLonByUserId(user_id);
        List<String> nbtiUsers = matchingListMapper.findUserByNbti(userLatLon.getCity(), nbti);
        List<LatLonDTO> nbtiUserList = new ArrayList<>();

        for(String user : nbtiUsers){
            LatLonDTO fLatlon = matchingListMapper.findLatLonByUserId(user);
            nbtiUserList.add(fLatlon);
        }

        KDTree kdTree = new KDTree(2);

        for(LatLonDTO latLon : nbtiUserList){ kdTree.insert(latLon); }

        Vector<Float64> target = Float64Vector.valueOf(userLatLon.getLatitude(), userLatLon.getLongitude());
        // 12개의 최근접 이웃 찾기
        List<LatLonDTO> neighbors = kdTree.nearestNeighbors(target, 12);
        List<MatchingListDTO> result = new ArrayList<>();

        for(LatLonDTO latLon : neighbors){
            System.out.println(latLon.getLatitude() + " : " + latLon.getLongitude());
            MatchingListDTO matchingListDTO = matchingListMapper.findMatchingUserById(latLon.getUser_id());
            result.add(matchingListDTO);
        }

        return result;
    }

    // nbti로 매칭 리스트 가져오기
    public List<MatchingListDTO> findMatchingListByFame(String user_id) {
        LatLonDTO userLatLon = matchingListMapper.findLatLonByUserId(user_id);
        System.out.println("유명한 사람들 아이디 가져오기");
        List<String> famousUsers = matchingListMapper.findUserByFame(userLatLon.getCity());

        List<LatLonDTO> famousUserList = new ArrayList<>();

        System.out.println("리스트에 담기");

        for(String user : famousUsers){
            LatLonDTO fLatlon = matchingListMapper.findLatLonByUserId(user);
            famousUserList.add(fLatlon);
        }

        for (LatLonDTO latLon : famousUserList) {
            System.out.println(latLon.getUser_id()+"=" +latLon.getLatitude() + " : " + latLon.getLongitude());
        }

        System.out.println("트리 넣기 전");
        KDTree kdTree = new KDTree(2);
        for(LatLonDTO latLon : famousUserList){ kdTree.insert(latLon); }

        Vector<Float64> target = Float64Vector.valueOf(userLatLon.getLatitude(), userLatLon.getLongitude());
        // 12개의 최근접 이웃 찾기
        List<LatLonDTO> neighbors = kdTree.nearestNeighbors(target, 12);
        List<MatchingListDTO> result = new ArrayList<>();
        for(LatLonDTO latLon : neighbors){
            System.out.println(latLon.getLatitude() + " : " + latLon.getLongitude());
            MatchingListDTO matchingListDTO = matchingListMapper.findMatchingUserById(latLon.getUser_id());
            result.add(matchingListDTO);
        }
        return result;
    }

    // 카카오 map api : 좌표값 가져오는 api
    public Double[] getCoodr(String address) {
        String API_KEY = "fed4d7c3e73a555647b2911db743953b";
        String BASE_URL = "https://dapi.kakao.com/v2/local/search/address.json?query=";

        try {
            Double[] position = new Double[2];

            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "KakaoAK " + API_KEY);
            HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
            String encode = URLEncoder.encode(address, "UTF-8");

            URI uri = new URI(BASE_URL + encode);
            ResponseEntity<String> res = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);

            JSONParser jsonParser = new JSONParser();
            JSONObject body = (JSONObject) jsonParser.parse(res.getBody().toString());
            JSONArray docu = (JSONArray) body.get("documents");
            JSONObject addr = (JSONObject) docu.get(0);
            JSONObject reAddr = (JSONObject) addr.get("address");

            System.out.println("위도경도값 : " + reAddr.get("x") +" : " + reAddr.get("y"));

            position[0] = Double.parseDouble(reAddr.get("y").toString()); //latitude
            position[1] = Double.parseDouble(reAddr.get("x").toString()); //longitude

            return position;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }


}
