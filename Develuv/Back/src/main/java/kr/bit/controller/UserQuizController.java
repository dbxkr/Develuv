package kr.bit.controller;

import kr.bit.dto.quizInsert.ChoiceInsertDTO;
import kr.bit.dto.quizInsert.QuizInsertDTO;
import kr.bit.mapper.UserQuizRegiMapper;
import kr.bit.service.QuizService;
import kr.bit.service.UserQuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/user/quiz")
public class UserQuizController {

    @Autowired
    private UserQuizService userQuizService;

    @Autowired
    private UserQuizRegiMapper userQuizRegiMapper;

    @PostMapping("/register")
    public ResponseEntity<String> registerUserQuiz(@RequestBody List<QuizInsertDTO> quizzes) {

        for (int i = 0; i < quizzes.size(); i++) {
            QuizInsertDTO quiz = quizzes.get(i);
            if (quiz.getUser_id() == null || quiz.getQuiz().isEmpty() || quiz.getAnswer() == 0) {
                System.out.println("empty quiz");
                continue;
            }
            System.out.println("서비스 실행 전");

            userQuizRegiMapper.insertUserQuiz(quiz.getUser_id(),quiz.getQ_num(), quiz.getQuiz(), quiz.getAnswer());
            System.out.println("퀴즈 넣기 성공! ");


            int quizId = userQuizRegiMapper.getQuizId(quiz.getUser_id(), quiz.getQ_num(), quiz.getQuiz(),quiz.getAnswer());


            List<ChoiceInsertDTO> choices = quiz.getChoices();
            for (int j = 0; j < choices.size(); j++) {
                ChoiceInsertDTO choice = choices.get(j);
                choice.setQ_id(quizId);
                choice.setContent(choice.getContent().replaceAll("\\n", "<br/>"));
                System.out.println("replace choice enter to <br/> : " + choice.getContent());

                userQuizRegiMapper.insertChoice(choice.getQ_id(),choice.getC_num(),choice.getContent());
                System.out.println("선택지 넣기 성공!!");
            }
            System.out.println("quizDTO is : " + quiz);
        }
        


        return ResponseEntity.ok("Registered user quiz");
    }


    @PostMapping("/getquiz")
    public ResponseEntity<QuizInsertDTO> getQuiz(@RequestParam("user_id")String user_id) {




        return ResponseEntity.ok();
    }
}
