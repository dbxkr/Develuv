package kr.bit.controller;

import kr.bit.dto.FreeQuizDTO;
import kr.bit.mapper.FreeQuizMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FreeQuizController {

    @Autowired
    private FreeQuizMapper freeQuizMapper;

    @GetMapping("/freequiz/check/{userId}")
    public int checkCount(@PathVariable String userId) {
        //오늘 퀴즈에 참여한 유저인지 체크.
        int quizCount = freeQuizMapper.getQuizCount(userId);
        return quizCount;
    }

    @GetMapping("/freequiz/admin")
    public List<FreeQuizDTO> getQuizes() {
        FreeQuizDTO freeQuizDTO = new FreeQuizDTO();
        List<FreeQuizDTO> quizes = freeQuizMapper.getQuizes();
        return quizes;
    }

    @GetMapping("/freequiz/{quizId}")
    public List<FreeQuizDTO> getChoices(@PathVariable int quizId) {
        List<FreeQuizDTO> choices = freeQuizMapper.getChoices(quizId);
        System.out.println(choices.getClass());
        return choices;
    }

    @PostMapping("/freequiz/setuser")
    public void updateUserCount(@RequestBody FreeQuizDTO freeQuizDTO) {
        freeQuizMapper.updateUserCount(freeQuizDTO.getUser_id());
    }

    @PostMapping("/freequiz/reward")
    public void updateUserReward(@RequestBody FreeQuizDTO freeQuizDTO) {
        int totalScore = freeQuizDTO.getQuizCount() * 1000;
        freeQuizDTO.setQuizCount(totalScore);
        freeQuizMapper.updateUserReward(freeQuizDTO);
    }

}
