package kr.bit.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import kr.bit.dto.TokenDTO;
import kr.bit.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class TokenController {

    @Autowired
    private TokenService tokenService;


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
}