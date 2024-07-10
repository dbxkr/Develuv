package kr.bit.dto;

import lombok.Data;

@Data
public class FreeQuizDTO {

    //user info
    private String user_id;

    //codequiz table
    private int quiz_id;
    private String quiz;
    private int answer;
    private String content;

    //codequiz_choice table
    private int c_id;
    private int c_num;

    //token table
    private int quizCount;

}
