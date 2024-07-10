package kr.bit.dto;

import lombok.Data;

@Data
public class QuizOppoDTO {

    //opponent table
    private String user_id;
    private String oppo_id;
    private int blur;
    private int quiz;

}
