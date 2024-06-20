package kr.bit.dto;

import lombok.Data;

@Data
public class UserProfileDto {
    private String user_id;
    private String user_pw;
    private String user_phone;
    private String user_job;
    private String user_address;

    // 필요한 생성자, getter/setter 등은 추가적으로 정의할 수 있음
}
