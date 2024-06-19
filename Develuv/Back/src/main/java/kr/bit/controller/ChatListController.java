package kr.bit.controller;

import kr.bit.dto.ChatListDTO;
import kr.bit.dto.UserDto;
import kr.bit.service.ChatListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chatlists")
public class ChatListController {

    private final ChatListService chatListService;

    @Autowired
    public ChatListController(ChatListService chatListService) {
        this.chatListService = chatListService;
    }

    @GetMapping("/user/{userId}")
    public List<ChatListDTO> getChatListsByUserId(@PathVariable String userId) {
        return chatListService.getChatListsByUserId(userId);
    }

    @GetMapping("/room/participants/{roomId}")
    public List<UserDto> getParticipantsByRoomId(@PathVariable String roomId) {
        return chatListService.getParticipantsByRoomId(roomId);
    }

    @GetMapping("/room/users/{roomId}")
    public List<UserDto> getUsersByRoomId(@PathVariable String roomId) {
        return chatListService.getUsersByRoomId(roomId);
    }
}
