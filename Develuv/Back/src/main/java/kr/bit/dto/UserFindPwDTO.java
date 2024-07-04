package kr.bit.dto;

import lombok.Data;

@Data
public class UserFindPwDTO {
    String user_id;
    String user_email;
    String new_password;
}
