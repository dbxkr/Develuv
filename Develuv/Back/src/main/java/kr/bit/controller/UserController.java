package kr.bit.controller;

import kr.bit.dto.UserFindIdDTO;
import kr.bit.dto.UserFindPwDTO;
import kr.bit.dto.UserLoginDTO;
import kr.bit.dto.social.KakaoLoginDTO;
import kr.bit.dto.social.NaverLoginDTO;
import kr.bit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/findId")
    public Map<String,String> findId(@ModelAttribute UserFindIdDTO userFindIdDTO) {
        Map<String, String> data = new HashMap<>();
        String id = userService.findId(userFindIdDTO);
        data.put("아이디",id);

        return data;
    }

    @GetMapping("/findPw")
    public Map<String,String> findPw(@ModelAttribute UserFindPwDTO userFindPwDTO) {
        Map<String, String> data = new HashMap<>();
        String pw = userService.findPw(userFindPwDTO);
        data.put("비번",pw);

        return data;
    }

    @GetMapping("/login")
    public Map<String,Object> longin(@RequestParam String user_id, @RequestParam String user_pw) {
        Map<String, Object> data = new HashMap<>();
        data.put("유저_정보",userService.login(user_id,user_pw));
        return data;
    }
    @PostMapping("/sns/naver")
    public Map<String,Object> snsNaver(@RequestBody NaverLoginDTO naverLoginDTO) {
        String header = "Bearer " + naverLoginDTO.getCode(); // Bearer 다음에 공백 추가
//        System.out.println("***********callback code***********:\n"+header);
        naverLoginDTO.setMember(userService.findById(naverLoginDTO.getId()));
        System.out.println("**************************************");
//        System.out.println("header: "+header);
//        System.out.println(naverLoginDTO);
//        try {
//            String apiURL = "https://openapi.naver.com/v1/nid/me";
//            URL url = new URL(apiURL);
//            HttpURLConnection con = (HttpURLConnection)url.openConnection();
//            con.setRequestMethod("GET");
//            con.setRequestProperty("Authorization", header);
//            int responseCode = con.getResponseCode();
//            BufferedReader br;
//            if(responseCode==200) { // 정상 호출
//                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
//            } else {  // 에러 발생
//                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
//            }
//            String inputLine;
//            StringBuffer response = new StringBuffer();
//            while ((inputLine = br.readLine()) != null) {
//                response.append(inputLine);
//            }
//            br.close();
//            System.out.println(response.toString());
//        } catch (Exception e) {
//            System.out.println(e);
//        }
        System.out.println("**************************************");
        Map<String, Object> data = new HashMap<>();
        data.put("naver",naverLoginDTO);
        return data;
    }

    @PostMapping("/sns/kakao")
    public Map<String,Object> snsKakao(@RequestBody KakaoLoginDTO kakaoLoginDTO) {

        kakaoLoginDTO.setMember(userService.findById(kakaoLoginDTO.getId()));
        Map<String, Object> data = new HashMap<>();
        data.put("kakao",kakaoLoginDTO);
        return data;
    }


}
