package kr.bit.controller;

import kr.bit.dto.ChatDTO;
import kr.bit.mapper.ChatMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatMapper chatMapper;

    @PostMapping("/join")
    public List<ChatDTO> chat(@RequestBody ChatDTO chatDTO) {
        System.out.println("*************************************************************************************************");
        System.out.println("*************************************************************************************************");
        System.out.println(chatDTO);
        System.out.println("*************************************************************************************************");
        System.out.println("*************************************************************************************************");
        List<ChatDTO> allChatMessages = chatMapper.getAllChatMessages(chatDTO.getRoom_id());
        return allChatMessages;
    }

    @PostMapping("/send")
    public void sendChat(@RequestBody ChatDTO chatDTO) {
        System.out.println(chatDTO);
        //가장 최근의 messageId 가져와서 DTO 에 세팅.
        int messageId = chatMapper.getMessageId() + 1;
        System.out.println(messageId);
        chatDTO.setMessage_id(messageId);
        //디비에 insert.
        int result = chatMapper.saveChat(chatDTO);
        System.out.println("디비 저장 됨??? = " + result);
    }

}
