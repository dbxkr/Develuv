package kr.bit.controller;

import kr.bit.dto.UserFindIdDTO;
import kr.bit.dto.UserFindPwDTO;
import kr.bit.dto.UserLoginDTO;
import kr.bit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

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
    @GetMapping("/sns")
    public Map<String,Object> sns(@RequestParam String authUrl) {
        System.out.println(authUrl);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(authUrl, String.class);

        Map<String, Object> data = new HashMap<>();
        data.put("유저_정보",response.getStatusCode());
        return data;
    }
    @GetMapping("/Callback")
    public Map<String,Object> callback(@RequestBody(required = false) Map<String, String> payload, @RequestParam String code) {
//        String authCode = payload.get("code");
//        System.out.println("***********callback payload***********"+authCode);
        System.out.println("***********callback code***********"+code);

        Map<String, Object> data = new HashMap<>();
        data.put("code",code);
        return data;
    }


}
