package kr.bit.dto.social;

import lombok.Data;

@Data
public class GoogleLoginDTO {
    String id;
    String provider;
    boolean member;
}
