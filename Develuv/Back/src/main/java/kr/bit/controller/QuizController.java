// 퀴즈 데이터 제공
// 사용자가 제출한 퀴즈 답안 검사하고 결과 반환

package kr.bit.controller;

import org.springframework.web.bind.annotation.*;
import kr.bit.model.Quiz;
import kr.bit.service.QuizService;

import java.util.HashMap;
import java.util.Map;

@RestController
public class QuizController {
    private QuizService quizService;

    public QuizController() {
        this.quizService = new QuizService(); // QuizService 인스턴스 생성
    }

    // 퀴즈 데이터를 반환하는 엔드포인트
    @GetMapping("/quizzes")
    public Quiz getQuiz() {
        // 샘플 퀴즈 데이터를 생성하여 반환
        Quiz quiz = new Quiz();
        quiz.setId(1L);
        quiz.setQuestion("다음 중 프로그래밍 언어가 아닌 것은?");
        quiz.setOptions(new String[]{"Java", "C++", "Python", "HTML"});
        quiz.setCorrectAnswer("HTML");
        return quiz;
    }

    // 퀴즈 답안을 제출받아 정답 여부를 검사하는 엔드포인트
    @PostMapping("/quizzes/submit")
    public Map<String, Object> submitQuiz(@RequestBody Map<String, String> payload) {
        String answer = payload.get("answer"); // 사용자가 제출한 답안
        boolean isCorrect = quizService.checkAnswer(answer); // 답안 검사
        int attemptsLeft = quizService.decrementAttempts(); // 남은 시도 횟수 감소
        Map<String, Object> response = new HashMap<>();
        response.put("correct", isCorrect); // 정답 여부
        response.put("attemptsLeft", attemptsLeft); // 남은 시도 횟수
        return response;
    }
}
