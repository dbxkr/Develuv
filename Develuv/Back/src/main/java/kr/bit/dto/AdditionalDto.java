package kr.bit.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter @Setter
public class AdditionalDto {
    //users 테이블
    private String user_id;
    private String user_pro_lang;
    private String user_drink;
    private String user_smoke;
    private String user_religion;
    private String user_edu;

    //userdating 테이블
    private String dating_style;
}
