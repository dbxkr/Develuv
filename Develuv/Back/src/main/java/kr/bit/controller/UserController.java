package kr.bit.controller;

import kr.bit.dto.UserFindPwDTO;
import kr.bit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/findPw")
    public Map<String,String> findPw(@ModelAttribute UserFindPwDTO userFindPwDTO) {
        Map<String, String> data = new HashMap<>();
        String pw = userService.findPw(userFindPwDTO);
        data.put("비번",pw);

        return data;
    }
}
