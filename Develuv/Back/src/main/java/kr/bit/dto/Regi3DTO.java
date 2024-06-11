package kr.bit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Regi3DTO {
    private String user_id;
    private String user_name;
    private String user_gender;
    private String user_job;
    private String user_address;
}
