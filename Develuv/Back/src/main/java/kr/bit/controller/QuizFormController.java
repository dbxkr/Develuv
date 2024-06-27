package kr.bit.controller;

import kr.bit.dto.QuizFormDTO;
import kr.bit.mapper.UserQuizMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class QuizFormController {

    @Autowired
    UserQuizMapper userQuizMapper;

    @GetMapping("/quiz/user/{userId}")
    public List<QuizFormDTO> getQuizes(@PathVariable("userId") String user_id) {
        List<QuizFormDTO> quizes = userQuizMapper.getQuizes(user_id);
        return quizes;
    }

    @GetMapping("/quiz/{qId}")
    public List<QuizFormDTO> getChoices(@PathVariable("qId") int q_id) {
        List<QuizFormDTO> choices = userQuizMapper.getChoies(q_id);
        return choices;
    }

}
