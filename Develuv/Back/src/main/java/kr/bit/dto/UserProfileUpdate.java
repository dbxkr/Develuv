package kr.bit.dto;

import lombok.Data;

@Data
public class UserProfileUpdate {
    private String type;
    private String value;
    private String user_id;
    private String user_pw;
}
