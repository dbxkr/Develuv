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
        QuizOppoDTO quizBlurCount = userQuizMapper.getQuizBlurCount(quizOppoDTO);
        return quizBlurCount.getQuiz();
    }

    @PostMapping("/quiz/reward")
    public int getReward(@RequestBody QuizOppoDTO quizOppoDTO) {
        QuizOppoDTO quizBlurCount = userQuizMapper.getQuizBlurCount(quizOppoDTO);
        // 만약 받아온 유저의 블러 레벨이 4(최대치) 상태이면 언블러 리워드를 적용하지 않는다.
        if(quizBlurCount.getBlur() >= 4) {
            return quizBlurCount.getBlur();
        } else {
            userQuizMapper.updateBlur(quizOppoDTO);
            return quizBlurCount.getBlur() + 1;
        }
    }

}
