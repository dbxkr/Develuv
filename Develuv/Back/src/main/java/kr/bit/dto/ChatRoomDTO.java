package kr.bit.dto;

import lombok.Data;

@Data
public class ChatRoomDTO {
    private String room_id; // chatroom 테이블의 room_id
    private String room_name; // chatroom 테이블의 room_name
    private String room_create_time; // chatroom 테이블의 room_create_time
}
