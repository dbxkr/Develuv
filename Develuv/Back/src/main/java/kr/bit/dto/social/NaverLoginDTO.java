package kr.bit.dto.social;

import lombok.Data;

@Data
public class NaverLoginDTO {
    String name;
    String email;
    String gender;
    String id;
    String mobile;
    String birthday;
    String birthyear;
    String provider;
    String code;
    boolean member;
}
