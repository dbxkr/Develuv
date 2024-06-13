//퀴즈 데이터 관리
//퀴즈 답안의 정답 여부 검사
//남은 시도 횟수를 관리

package kr.bit.service;

import kr.bit.model.Quiz;
import java.util.ArrayList;
import java.util.List;

public class QuizService {
    private List<Quiz> quizzes = new ArrayList<>(); // 퀴즈 목록
    private int attempts = 4; // 남은 시도 횟수

    // QuizService 생성자 - 기본 퀴즈 데이터를 설정
    public QuizService() {
        Quiz quiz = new Quiz();
        quiz.setId(1L);
        quiz.setQuestion("다음 중 프로그래밍 언어가 아닌 것은?");
        quiz.setOptions(new String[]{"Java", "C++", "Python", "HTML"});
        quiz.setCorrectAnswer("HTML");
        quizzes.add(quiz);
    }

    // 사용자가 제출한 답안을 검사하는 메서드
    public boolean checkAnswer(String answer) {
        Quiz quiz = quizzes.get(0); // 첫 번째 퀴즈 사용
        return quiz.getCorrectAnswer().equals(answer); // 정답 여부 검사
    }

    // 남은 시도 횟수를 감소시키는 메서드
    public int decrementAttempts() {
        if (attempts > 0) {
            attempts--; // 시도 횟수를 감소
        }
        return attempts; // 남은 시도 횟수 반환
    }
}
