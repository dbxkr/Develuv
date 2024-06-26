package kr.bit.controller;

import kr.bit.dto.quizInsert.QuizInsertDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/user/quiz")
public class UserQuizController {

    @PostMapping("/register")
    public ResponseEntity<String> registerUserQuiz(@RequestBody List<QuizInsertDTO> quizzes) {

        System.out.println("Received quizzes : " + quizzes);

        return ResponseEntity.ok("Registered user quiz");
    }
}
