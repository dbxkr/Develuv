package kr.bit.dto;

import lombok.Data;

@Data
public class ChatStatusDTO {
    private String room_id;
    private String user_id;
    private String message_content;
    private String message_time;
    private Integer unreadCnt;
}
