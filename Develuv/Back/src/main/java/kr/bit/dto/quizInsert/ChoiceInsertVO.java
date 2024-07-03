package kr.bit.dto.quizInsert;

import lombok.Data;

@Data
public class ChoiceInsertVO {
    private int c_id;
    private int q_id;
    private int c_num;
    private String content;
}
