package kr.bit.controller;

import kr.bit.dto.UserFindIdDTO;
import kr.bit.dto.UserFindPwDTO;
import kr.bit.dto.social.KakaoLoginDTO;
import kr.bit.dto.social.NaverLoginDTO;
import kr.bit.dto.UserDto;
import kr.bit.model.User;
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
    UserService userService;

    @GetMapping("/findId")
    public Map<String, String> findId(@ModelAttribute UserFindIdDTO userFindIdDTO) {
        Map<String, String> data = new HashMap<>();
        String id = userService.findId(userFindIdDTO);
        data.put("아이디", id);

        return data;
    }

    @PostMapping("/save")
    public void saveUser(@RequestBody UserDto userDto) {
        userService.saveUser(userDto);
    }

    @PostMapping("/signup")
    @CrossOrigin(origins = "http://localhost:3500")
    public ResponseEntity<String> signup(@RequestBody UserDto userDto) {
        try {
            userService.saveUser(userDto);
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Type", "application/json; charset=UTF-8");
            return new ResponseEntity<>("회원가입이 완료되었습니다.", headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Type", "application/json; charset=UTF-8");
            return new ResponseEntity<>("회원가입 중 오류가 발생했습니다.", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/findPw")
    public Map<String, String> findPw(@ModelAttribute UserFindPwDTO userFindPwDTO) {
        Map<String, String> data = new HashMap<>();
        String pw = userService.findPw(userFindPwDTO);
        data.put("비번", pw);

        return data;
    }

    @GetMapping("/login")
    public Map<String, Object> longin(@RequestParam String user_id, @RequestParam String user_pw) {
        Map<String, Object> data = new HashMap<>();
        data.put("user_info", userService.login(user_id, user_pw));
        return data;
    }

    @PostMapping("/sns/naver")
    public Map<String, Object> snsNaver(@RequestBody NaverLoginDTO naverLoginDTO) {
        String header = "Bearer " + naverLoginDTO.getCode();
        naverLoginDTO.setMember(userService.findById(naverLoginDTO.getId()));
        Map<String, Object> data = new HashMap<>();
        data.put("naver", naverLoginDTO);
        return data;
    }

    @PostMapping("/sns/kakao")
    public Map<String, Object> snsKakao(@RequestBody KakaoLoginDTO kakaoLoginDTO) {
        kakaoLoginDTO.setMember(userService.findById(kakaoLoginDTO.getId()));
        Map<String, Object> data = new HashMap<>();
        data.put("kakao", kakaoLoginDTO);
        return data;
    }

    @GetMapping("/checkUserId")
    @CrossOrigin(origins = "http://localhost:3500")
    public boolean checkUserId(@RequestParam String userId) {
        return userService.isUserIdAvailable(userId);
    }

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

    @GetMapping("/info/{user_id}")
    public UserDto getUserById(@PathVariable String user_id) {
        return userService.getUserById(user_id);
    }
}