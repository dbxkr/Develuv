package kr.bit.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import kr.bit.dto.TokenDTO;

import kr.bit.dto.UserDto;

import kr.bit.model.User;
import kr.bit.service.UserService;
import kr.bit.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.IOException;
import java.util.List; // java.awt.List 대신 java.util.List 사용
import java.util.Map;

@RestController
@RequestMapping("/api")

public class TokenController {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserService userService;

    // 사용자 토큰 정보를 가져옵니다.
    @GetMapping("/tokens")
    public void getToken(@RequestParam String user_id, HttpServletResponse response) throws IOException {
        TokenDTO token = tokenService.getToken(user_id);
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        response.setContentType("application/json");
        response.getWriter().write(mapper.writeValueAsString(token));
    }
//
//    // 코인 사용 이력을 추가합니다.
//    @PostMapping("/tokens/history")
//    public void addCoinHistory(@RequestParam String user_id, @RequestParam int amount) {
//        tokenService.addCoinHistory(user_id, amount);
//    }


    // 사용자 코인을 차감합니다.
    @PostMapping("/tokens/deduct")
    public void deductTokens(@RequestBody Map<String, Object> payload, HttpServletResponse response) throws IOException {
        String user_id = (String) payload.get("user_id");
        int amount = (int) payload.get("amount");
        tokenService.deductTokens(user_id, amount);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    // 사용자 코인을 추가합니다.
    @PostMapping("/tokens/add")
    public void addTokens(@RequestBody Map<String, Object> payload, HttpServletResponse response) throws IOException {
        String user_id = (String) payload.get("user_id");
        int amount = (int) payload.get("amount");
        tokenService.addTokens(user_id, amount);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @GetMapping("/tokens/recommend")
    public List<User> recommendUser(
            @RequestParam("user_id") String userId,
            @RequestParam(value = "excludedUserIds", required = false) String excludedUserIds) {
        return userService.recommendUser(userId, excludedUserIds);
    }

    // NBTI 필터링된 유저를 추천받는 API
    @GetMapping("/tokens/recommend/nbti")
    public ResponseEntity<?> recommendUserByNbti(
            @RequestParam String user_id,
            @RequestParam String user_nbti,
            @RequestParam(required = false) String excludedUserIds) {
        System.out.println("Received user_id: " + user_id);
        System.out.println("Received user_nbti: " + user_nbti);
        System.out.println("Received excludedUserIds: " + excludedUserIds);

        try {
            List<User> recommendedUsers = userService.findUsersByNbti(user_nbti, excludedUserIds);
            if (recommendedUsers.isEmpty()) {
                return new ResponseEntity<>("No users found with the given NBTI", HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(recommendedUsers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to recommend user by NBTI", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 유명한 유저를 추천받는 API
    @GetMapping("/tokens/recommend/fame")
    public ResponseEntity<List<User>> recommendUserByFame(
            @RequestParam String user_id,
            @RequestParam(required = false) String excludedUserIds) {
        try {
            if (excludedUserIds == null || excludedUserIds.isEmpty()) {
                excludedUserIds = "''";
            }
            List<User> recommendedUsers = userService.findUsersByFame(excludedUserIds);
            if (recommendedUsers.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(recommendedUsers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
