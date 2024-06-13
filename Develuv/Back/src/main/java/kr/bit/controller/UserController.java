package kr.bit.controller;

import kr.bit.dto.UserDto;
import kr.bit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/save")
    public void saveUser(@RequestBody UserDto userDto) {
        userService.saveUser(userDto);
    }

    // 회원가입 요청을 처리합니다.
    @PostMapping("/signup")
    @CrossOrigin(origins = "http://localhost:3500")
    public ResponseEntity<String> signup(@RequestBody UserDto userDto) {
        try {
            userService.saveUser(userDto);  // 예외 발생 가능성
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Type", "application/json; charset=UTF-8");
            return new ResponseEntity<>("회원가입이 완료되었습니다.", headers, HttpStatus.OK);
        } catch (Exception e) {  // 추가된 예외 처리
            e.printStackTrace();
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Type", "application/json; charset=UTF-8");
            return new ResponseEntity<>("회원가입 중 오류가 발생했습니다.", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 사용자 ID 중복 확인 요청을 처리합니다.
    @GetMapping("/checkUserId")
    @CrossOrigin(origins = "http://localhost:3500")
    public boolean checkUserId(@RequestParam String userId) {
        return userService.isUserIdAvailable(userId);
    }


    // 이메일 인증 요청을 처리하여 인증 코드를 발송합니다.
    @PostMapping("/sendVerificationCode")
    @CrossOrigin(origins = "http://localhost:3500")
    public Map<String, Object> sendVerificationCode(@RequestParam String email) {
        String msg = userService.sendVerificationCode(email);
        Map<String, Object> map = new HashMap<>();
        map.put("msg", msg);
        return map;
    }


    @PostMapping("/verifyCode")
    @CrossOrigin(origins = "http://localhost:3500")
    public Map<String, Object> verifyCode(@RequestParam String email, @RequestParam String code) {
        String msg = userService.verifyCode(email, code);
        boolean isValid = msg.equals("인증이 완료되었습니다.");
        Map<String, Object> map = new HashMap<>();
        map.put("isValid", isValid);
        map.put("msg", msg);
        return map;
    }
}