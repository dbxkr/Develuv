//Quiz 클래스의 ID , 질문, 선택지, 정답을 담고 있는 데이터 모델
//데이터 베이스나 서비스 계층에서 사용

package kr.bit.model;

public class Quiz {
    private Long id; // 퀴즈 ID
    private String question; // 퀴즈 질문
    private String[] options; // 퀴즈 선택지
    private String correctAnswer; // 퀴즈 정답

    // Getter와 Setter 메서드
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String[] getOptions() {
        return options;
    }

    public void setOptions(String[] options) {
        this.options = options;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }
}
