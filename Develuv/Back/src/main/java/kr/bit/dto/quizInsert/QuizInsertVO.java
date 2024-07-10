package kr.bit.dto.quizInsert;

import lombok.Data;

import java.util.List;

@Data
public class QuizInsertVO {
    private int q_id;  // 이 필드를 추가합니다.
    private String user_id;
    private int q_num;
    private String quiz;
    private int answer;
    private List<ChoiceInsertVO> choices;
}
