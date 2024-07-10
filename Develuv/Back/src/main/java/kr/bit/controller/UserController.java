package kr.bit.controller;

import kr.bit.dto.*;
import kr.bit.dto.social.GoogleLoginDTO;
import kr.bit.dto.social.KakaoLoginDTO;
import kr.bit.dto.social.NaverLoginDTO;
import kr.bit.model.User;
import kr.bit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/findId")
    public Map<String, String> findId(@ModelAttribute UserFindIdDTO userFindIdDTO) {
        Map<String, String> data = new HashMap<>();
        String id = userService.findId(userFindIdDTO).getUser_id();
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
        String message =  userService.findPwEmail(userFindPwDTO);
        data.put("비번", message);
        return data;
    }

    @GetMapping("/login")
    public Map<String, Object> login(@RequestParam String user_id, @RequestParam String user_pw) {
        Map<String, Object> data = new HashMap<>();
        UserLoginDTO userLoginDTO = userService.login(user_id, user_pw);
        if (userLoginDTO == null) {
            data.put("user_info", null);
        } else {
            data.put("user_info", userLoginDTO);
        }
        return data;
    }

    @PostMapping("/sns/naver")
    public Map<String, Object> snsNaver(@RequestBody NaverLoginDTO naverLoginDTO) {
        String header = "Bearer " + naverLoginDTO.getCode();
        if(!naverLoginDTO.getProvider().equals("naver")) {
            return null;
        }
        naverLoginDTO.setMember(userService.findById(naverLoginDTO.getId()));
        Map<String, Object> data = new HashMap<>();
        data.put("naver", naverLoginDTO);
        return data;
    }

    @PostMapping("/sns/kakao")
    public Map<String, Object> snsKakao(@RequestBody KakaoLoginDTO kakaoLoginDTO) {
        if(!kakaoLoginDTO.getProvider().equals("kakao")) {
            return null;
        }
        kakaoLoginDTO.setMember(userService.findById(kakaoLoginDTO.getId()));
        Map<String, Object> data = new HashMap<>();
        data.put("kakao", kakaoLoginDTO);
        return data;
    }

    @PostMapping("/sns/google")
    public Map<String, Object> snsGoogle(@RequestBody GoogleLoginDTO googleLoginDTO) {
        if(!googleLoginDTO.getProvider().equals("google")) {
            return null;
        }
        googleLoginDTO.setMember(userService.findById(googleLoginDTO.getId()));
        Map<String, Object> data = new HashMap<>();
        data.put("google", googleLoginDTO);
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

    @PostMapping("/info")
    public UserDto getUserById(@RequestParam String user_id) {
        return userService.findUserById(user_id);
    }

    @PostMapping("/otherInfo")
    public UserDto getOtherUserById(@RequestParam String user_id, @RequestParam String my_id) {
        return userService.findOtherUserById(user_id, my_id);
    }

    @PostMapping("/updateOneProfile")
    public void updateOneProfile(@RequestBody UserProfileUpdate userDto) {
        userService.updateOneProfile(userDto);

    }

    @PutMapping("/edit-profile/{userId}")
    public ResponseEntity<String> updateUserProfile(@PathVariable String userId, @RequestBody UserDto userDto) {
        userDto.setUser_id(userId);

        // 비밀번호가 null 또는 빈 문자열인 경우 기존 비밀번호를 유지합니다.
        if (userDto.getUser_pw() == null || userDto.getUser_pw().isEmpty()) {
            String existingPassword = userService.findPasswordByUserId(userId);
            userDto.setUser_pw(existingPassword);
        }

        userService.updateUserProfile(userDto);
        return ResponseEntity.ok("프로필이 성공적으로 업데이트 되었습니다.");
    }

    @PostMapping("/getAll")
    public List<UserDto> getAll() {
        return userService.getAll();
    }
}
