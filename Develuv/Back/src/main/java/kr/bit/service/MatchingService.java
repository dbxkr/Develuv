package kr.bit.service;

import kr.bit.mapper.MatchingListMapper;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URLEncoder;

@Service
public class MatchingService {

    @Autowired
    private MatchingListMapper matchingListMapper;

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

    public Double degToRad(Double deg){
        return deg * (Math.PI/180.0);
    }

    public double radToDeg(Double rad){
        return rad * 180.0 / Math.PI;
    }


    // 주소 2개로 두 지점간의 거리 구하는 함수
    public Double getDistance(String address1, String address2) {
        //po[0] = latitude , po[1] = longitude

        Double[] po1 = getCoodr(address1);
        Double[] po2 = getCoodr(address2);

//        double dLat = degToRad(po1[0]-po2[0]);
//        double dLng = degToRad(po1[1]-po2[1]);
//
//        int r =6371;
//        double a = (Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(degToRad(po1[0])) * Math.cos(degToRad(po2[0])) * Math.sin(dLng/2) * Math.sin(dLng/2));
//        double c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
//        double d = r * c;


        double theta = po1[1] - po2[1];
        double dist = Math.sin(degToRad(po1[0]))* Math.sin(degToRad(po2[0]))
                + Math.cos(degToRad(po1[0]))*Math.cos(degToRad(po2[0]))*Math.cos(degToRad(theta));
        dist = Math.acos(dist);
        dist = radToDeg(dist);
        dist = dist * 60*1.1515*1609.344;

        return dist; //단위 meter

    }
}
