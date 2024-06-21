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

    // 카카오 map api
    public Float[] getCoodr(String address) {
        String API_KEY = "fed4d7c3e73a555647b2911db743953b";
        String BASE_URL = "https://dapi.kakao.com/v2/local/search/address.json?query=";

        try {
            Float[] position = new Float[2];

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

            System.out.println(body);
            System.out.println(docu.toString());

            System.out.println(reAddr.get("x"));
            System.out.println(reAddr.get("y"));

            position[0] = Float.parseFloat(reAddr.get("x").toString());
            position[1] = Float.parseFloat(reAddr.get("y").toString());

            return position;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public Float degToRad(Float deg){
        return (float) (deg * (Math.PI/180));
    }

    public Double getDistance(Float[] po1, Float[] po2) {
        int r =6371;

        float dLat = degToRad(po1[0]-po2[0]);
        float dLng = degToRad(po1[1]-po2[1]);

        double a = (Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(degToRad(po1[0])) * Math.cos(degToRad(po2[0])) * Math.sin(dLng/2) * Math.sin(dLng/2));
        double c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
        double d = r * c;

        return d;

    }




}
