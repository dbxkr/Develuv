package kr.bit.dto.quizInsert;

import lombok.Data;
import java.util.List;

@Data
public class QuizInsertDTO {
    private String user_id;
    private int q_num;
    private String quiz;
    private int answer;
    private List<ChoiceInsertDTO> choices;
}
