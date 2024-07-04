package kr.bit.dto;

import lombok.Data;

@Data
public class UserDto {
    private String user_id;
    private String user_pw;
    private String user_name;
    private String user_email;
    private String user_birth;
    private String user_phone;
    private String user_gender = ""; // 기본값 설정
    private String user_profile = ""; // 기본값 설정
    private String user_provider_id = ""; // 기본값 설정
    private int user_heart = 0; // 기본값 설정
    private String user_code = ""; // 기본값 설정
    private String user_job = ""; // 기본값 설정
    private String user_address = ""; // 기본값 설정
    private String user_nbti = ""; // 기본값 설정
    private String verification_code;
    private String user_pro_lang;
    private String user_drink;
    private String user_smoke;
    private String user_religion;
    private String user_edu;
    private String user_instagram;
    private String user_git;
    private String user_memo;
    private String user_city = "";
    private int token;
    private int blur=0;
}
