package kr.bit.dto;

import lombok.Data;

@Data
public class UserFindIdDTO {
    String user_email;
    String auth_number;
    String user_provider_id;
    String user_id;
}
