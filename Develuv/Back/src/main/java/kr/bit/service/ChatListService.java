package kr.bit.service;

import kr.bit.dto.ChatListDTO;
import kr.bit.dto.ChatStatusDTO;
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

    public UserDto getParticipantsByRoomId(String roomId, String myId) {
        UserDto participants = chatListMapper.getParticipantsByRoomId(roomId, myId);

        // 데이터를 콘솔에 출력
        System.out.println("Participant - " + participants);

        return participants;
    }

    public List<UserDto> getUsersByRoomId(String roomId) {
        return chatListMapper.getUsersByRoomId(roomId);
    }

    public String getRoomIdByUserId(String myId, String oppoId) {
        return chatListMapper.getRoomIdByUserId(myId, oppoId);
    }

    public String getRoomIdByRoomId(String roomId) {
        return chatListMapper.getRoomIdByRoomId(roomId);
    }

    public void createNewChatRoom(String roomId, String roomName, String myId, String oppoId) {
        chatListMapper.createNewChatroom(roomId, roomName);
        chatListMapper.insertIntoChatlists(roomId,myId);
        chatListMapper.insertIntoChatlists(roomId,oppoId);
    }

    public void joinExistingChatRoom(String roomId, String myId) {
        chatListMapper.insertIntoChatlists(roomId,myId);
    }

    public ChatStatusDTO getChatStatus(ChatStatusDTO chatStatusDTO) {
        ChatStatusDTO dto = chatListMapper.getRecentMsg(chatStatusDTO);
        int unreadCnt = chatListMapper.getUnreadCnt(chatStatusDTO);

        if(dto == null) {
            chatStatusDTO.setUnreadCnt(unreadCnt);
            return chatStatusDTO;
        } else {
            chatStatusDTO.setMessage_content(dto.getMessage_content());
            chatStatusDTO.setMessage_time(dto.getMessage_time());
            chatStatusDTO.setUnreadCnt(unreadCnt);
            return chatStatusDTO;
        }
    }

    public void updateReadMessage(ChatStatusDTO chatStatusDTO) {
        chatListMapper.updateReadMessage(chatStatusDTO);
    }

    public void exitRoom(ChatStatusDTO chatStatusDTO) {
        chatListMapper.exitChatlist(chatStatusDTO);
        chatListMapper.exitChatmessage(chatStatusDTO);
        chatListMapper.exitChatroom(chatStatusDTO);
    }

    public void setOppo(String myId, String oppoId) {
        chatListMapper.setOppo(myId, oppoId);
    }


}
