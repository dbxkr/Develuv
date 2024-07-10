package kr.bit.controller;

import kr.bit.dto.*;
import kr.bit.service.ChatListService;
import kr.bit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/chatlists")
public class ChatListController {

    private final ChatListService chatListService;
    private final UserService userService;

    @Autowired
    public ChatListController(ChatListService chatListService, UserService userService) {
        this.chatListService = chatListService;
        this.userService = userService;
    }

    @GetMapping("/user/{userId}")
    public List<ChatListDTO> getChatListsByUserId(@PathVariable String userId) {
        return chatListService.getChatListsByUserId(userId);
    }

    @GetMapping("/room/participants/{roomId}")
    public UserDto getParticipantsByRoomId(@PathVariable String roomId, @RequestParam String myId) {
        return chatListService.getParticipantsByRoomId(roomId, myId);
    }

    @GetMapping("/room/users/{roomId}")
    public List<UserDto> getUsersByRoomId(@PathVariable String roomId) {
        return chatListService.getUsersByRoomId(roomId);
    }

    @GetMapping("/room/chatstatus")
    public ChatStatusDTO getChatStatus(@RequestParam String room_id, @RequestParam String user_id) {
        ChatStatusDTO chatStatusDTO = new ChatStatusDTO();
        chatStatusDTO.setRoom_id(room_id);
        chatStatusDTO.setUser_id(user_id);
        return chatListService.getChatStatus(chatStatusDTO);
    }

    @PostMapping("/room/readmessage")
    public void updateReadMessage(@RequestBody ChatStatusDTO chatStatusDTO) {
        System.out.println("정보 잘 받아옴?"+ chatStatusDTO);
        chatListService.updateReadMessage(chatStatusDTO);
    }

    @GetMapping("/start")
    public Map<String, Object> start(@RequestParam String myId, @RequestParam String oppoId) {
        Map<String, Object> data = new HashMap<>();
        //기존 채팅방이 있는지 확인
        String roomId = chatListService.getRoomIdByUserId(myId,oppoId);

        if(roomId == null) {
            String[] userIds = {myId, oppoId};
            Arrays.sort(userIds);
            //만약 내가 있었다가 나갔던 방이 있다면
            roomId = chatListService.getRoomIdByRoomId(String.join("_", userIds));
            if(roomId == null) {
                //기존의 채팅방이 없다면
                roomId = String.join("_", userIds);
                String roomName = userService.findNameById(myId)+"_"+userService.findNameById(oppoId);
                try{
                    chatListService.setOppo(myId, oppoId);
                    chatListService.setOppo(oppoId, myId);
                }catch (Exception e) {
                }
                chatListService.createNewChatRoom(roomId, roomName, myId, oppoId);
            }else{
                chatListService.joinExistingChatRoom(roomId, myId);
            }
        }

        data.put("myId", myId);
        data.put("oppoId", oppoId);
        data.put("roomId", roomId);
        return data;
    }

    @PostMapping("/exit")
    public void exit(@RequestBody ChatStatusDTO chatStatusDTO) {
        chatListService.exitRoom(chatStatusDTO);
    }
}
