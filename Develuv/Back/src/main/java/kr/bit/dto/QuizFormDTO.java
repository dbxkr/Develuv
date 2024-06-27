package kr.bit.dto;

import lombok.Data;

@Data
public class QuizFormDTO {

    // userquiz table
    private String quiz; //문제
    private int answer; //답
    private String user_id; //출제자 아이디
    private int q_num; //출제자가 출제한 문제 수
    private int q_id; // pk ai

    //quiz_choice table
    private String content; //문항 (선택지)
    private String[] contents;
    private int c_num; //선택지 번호..

}
