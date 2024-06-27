package kr.bit.controller;

import kr.bit.dto.QuizFormDTO;
import kr.bit.dto.QuizOppoDTO;
import kr.bit.mapper.UserQuizMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/quiz/user")
    public void updateQuizCount(@RequestBody QuizOppoDTO quizOppoDTO) {
        System.out.println(quizOppoDTO);
        userQuizMapper.updateQuizCount(quizOppoDTO);
    }

    @GetMapping("/quiz/check")
    public int getQuizCount(@RequestParam("user_id") String user_id,
                            @RequestParam("oppo_id") String oppo_id) {
        QuizOppoDTO quizOppoDTO = new QuizOppoDTO();
        quizOppoDTO.setUser_id(user_id);
        quizOppoDTO.setOppo_id(oppo_id);
        int result = userQuizMapper.getQuizCount(quizOppoDTO);
        return result;
    }

}
