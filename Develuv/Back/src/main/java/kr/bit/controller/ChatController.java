package kr.bit.controller;

import kr.bit.dto.ChatDTO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @PostMapping("/send")
    public Map<String, Object> chat(@RequestBody ChatDTO chatDTO) {
        System.out.println("*************************************************************************************************");
        System.out.println("*************************************************************************************************");
        System.out.println(chatDTO);
        System.out.println("*************************************************************************************************");
        System.out.println("*************************************************************************************************");
        Map<String, Object> data = new HashMap<>();
        data.put("키", "값");
        return data;
    }
}
