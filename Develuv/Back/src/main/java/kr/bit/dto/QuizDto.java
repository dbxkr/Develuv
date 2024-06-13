// 퀴즈의 질문 , 선택지 , 정답 정보 담고 있음
//데이터 전송할 때 사용

package kr.bit.dto;

// 퀴즈의 질문, 선택지, 정답 정보를 담고 있는 데이터 전송 객체
public class QuizDto {
    private String question; // 퀴즈 질문
    private String[] options; // 퀴즈 선택지
    private String correctAnswer; // 퀴즈 정답

    // Getter와 Setter 메서드
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
