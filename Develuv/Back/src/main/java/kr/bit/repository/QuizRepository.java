//퀴즈 데이터 저장하고 조회하는 메서드 제공
//퀴즈 목록 저장하고 취즈를 조화하거나 저장하는 기능 제공
package kr.bit.repository;

import java.util.ArrayList;
import java.util.List;

import kr.bit.model.Quiz;

// 퀴즈 데이터를 저장하고 조회하는 메서드를 제공
public class QuizRepository {
    private List<Quiz> quizzes = new ArrayList<>(); // 퀴즈 목록

    // 모든 퀴즈를 조회하는 메서드
    public List<Quiz> findAll() {
        return quizzes;
    }

    // 퀴즈를 저장하는 메서드
    public void save(Quiz quiz) {
        quizzes.add(quiz);
    }

    // ID로 퀴즈를 조회하는 메서드
    public Quiz findById(Long id) {
        return quizzes.stream()
                .filter(q -> q.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
}
