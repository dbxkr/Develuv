package kr.bit.service;

import kr.bit.dto.ChatListDTO;
import kr.bit.dto.UserDto;
import kr.bit.mapper.ChatListMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatListService {

    private final ChatListMapper chatListMapper;

    @Autowired
    public ChatListService(ChatListMapper chatListMapper) {
        this.chatListMapper = chatListMapper;
    }

    public List<ChatListDTO> getChatListsByUserId(String userId) {
        return chatListMapper.getChatListsByUserId(userId);
    }

    public List<UserDto> getParticipantsByRoomId(String roomId) {
        List<UserDto> participants = chatListMapper.getParticipantsByRoomId(roomId);

        // 데이터를 콘솔에 출력
        for (UserDto participant : participants) {
            System.out.println("Participant - User ID: " + participant.getUser_id() + ", User Name: " + participant.getUser_name());
        }

        return participants;
    }

    public List<UserDto> getUsersByRoomId(String roomId) {
        return chatListMapper.getUsersByRoomId(roomId);
    }
}
