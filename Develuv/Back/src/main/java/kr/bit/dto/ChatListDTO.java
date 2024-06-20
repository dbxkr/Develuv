package kr.bit.dto;

import lombok.Data;

@Data
public class ChatListDTO {
    private String roomId; // chatlists 테이블의 room_id
    private String userId; // chatlists 테이블의 user_id
    private String roomName; // chatroom 테이블의 room_name
    private String roomCreateTime; // chatroom 테이블의 room_create_time
}
