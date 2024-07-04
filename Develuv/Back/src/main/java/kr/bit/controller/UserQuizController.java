package kr.bit.controller;

import kr.bit.dto.quizInsert.ChoiceInsertDTO;
import kr.bit.dto.quizInsert.ChoiceInsertVO;
import kr.bit.dto.quizInsert.QuizInsertDTO;
import kr.bit.dto.quizInsert.QuizInsertVO;
import kr.bit.mapper.UserQuizRegiMapper;
import kr.bit.service.QuizService;
import kr.bit.service.UserQuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/user/quiz")
public class UserQuizController {

    @Autowired
    private UserQuizService userQuizService;

    @Autowired
    private UserQuizRegiMapper userQuizRegiMapper;

    @PostMapping("/register/{hasQuiz}")
    public ResponseEntity<String> registerUserQuiz(@RequestBody List<QuizInsertDTO> quizzes,
                                                   @PathVariable("hasQuiz") String hasQuiz) {
        if(hasQuiz.equals("f")) {

            for (int i = 0; i < quizzes.size(); i++) {
                QuizInsertDTO quiz = quizzes.get(i);
                if (quiz.getUser_id() == null || quiz.getQuiz().isEmpty() || quiz.getAnswer() == 0) {
                    System.out.println("empty quiz");
                    continue;
                }
                System.out.println("서비스 실행 전");

                userQuizRegiMapper.insertUserQuiz(quiz.getUser_id(), quiz.getQ_num(), quiz.getQuiz(), quiz.getAnswer());
                System.out.println("퀴즈 넣기 성공! ");


                int quizId = userQuizRegiMapper.getQuizId(quiz.getUser_id(), quiz.getQ_num(), quiz.getQuiz(), quiz.getAnswer());


                List<ChoiceInsertDTO> choices = quiz.getChoices();
                for (int j = 0; j < choices.size(); j++) {
                    ChoiceInsertDTO choice = choices.get(j);
                    choice.setQ_id(quizId);
                    choice.setContent(choice.getContent().replaceAll("\n", "<br/>"));
                    System.out.println("replace choice enter to <br/> : " + choice.getContent());

                    userQuizRegiMapper.insertChoice(choice.getQ_id(), choice.getC_num(), choice.getContent());
                    System.out.println("선택지 넣기 성공!!");
                }
                System.out.println("quizDTO is : " + quiz);
            }
        } else {    // 이미 퀴즈가 있는 경우 update
            userQuizService.updateUserQuiz(quizzes);
            return ResponseEntity.ok("퀴즈 업데이트 성공!!");
        }
        return ResponseEntity.ok("Registered user quiz");

    }


    @PostMapping("/getquiz")
    public ResponseEntity<List<QuizInsertDTO>> getQuiz(@RequestBody Map<String, String> payload) {

        String user_id = payload.get("user_id");
        List<QuizInsertVO> result = userQuizRegiMapper.getQuizzesByUserId(user_id);

        List<QuizInsertDTO> results = new ArrayList<>();
        for(QuizInsertVO quizVO : result){
            List<ChoiceInsertDTO> choices= new ArrayList<>();
            for (ChoiceInsertVO choiceVO : quizVO.getChoices()){
                ChoiceInsertDTO choice = new ChoiceInsertDTO();
                choice.setQ_id(choiceVO.getQ_id());
                choice.setC_num(choiceVO.getC_num());
                choice.setContent(choiceVO.getContent().replaceAll("<br/>", "\n"));
                choices.add(choice);
            }
            QuizInsertDTO quiz = new QuizInsertDTO();
            quiz.setQ_num(quizVO.getQ_num());
            quiz.setQuiz(quizVO.getQuiz());
            quiz.setAnswer(quizVO.getAnswer());
            quiz.setChoices(choices);
            quiz.setUser_id(user_id);
            results.add(quiz);
        }
        System.out.println(results);

        return ResponseEntity.ok(results);
    }
}
