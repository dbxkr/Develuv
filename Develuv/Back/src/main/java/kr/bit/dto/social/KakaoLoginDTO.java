package kr.bit.dto.social;

import lombok.Data;

@Data
public class KakaoLoginDTO {
    String id;
    String access_token;
    String nickname;
    String provider;
    boolean member;
}
