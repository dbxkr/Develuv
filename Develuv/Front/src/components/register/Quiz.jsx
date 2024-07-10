import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Quiz = ({ setProgress, state }) => {
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(4); // 시도 횟수 4번으로 설정
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/quizzes")
      .then((response) => {
        console.log(response.data); // 응답 데이터 확인
        setQuiz(response.data); // 퀴즈 데이터 설정
      })
      .catch((error) => {
        console.error("Error fetching quiz:", error);
        setErrorMessage("Error fetching quiz."); // 오류 발생 시 메시지 설정
      });
  }, []);

  const handleAnswerChange = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/quizzes/submit",
        { answer: selectedAnswer }
      );
      if (response.data.correct) {
        setProgress(2);
      } else {
        setAttemptsLeft(response.data.attemptsLeft); // 오답일 경우 남은 시도 횟수 업데이트
        setErrorMessage("오답입니다. 다시 도전해보세요!"); // 오류 메시지 설정
      }
    } catch (error) {
      setErrorMessage("Error submitting quiz."); // 제출 오류 시 메시지 설정
      console.error("Error submitting quiz:", error);
    }
  };

  if (!quiz) return <p>Loading...</p>;
  if (!quiz.options) return <p>Error loading quiz options.</p>;

  return (
    <div className="quiz-container">
      <div className="progress-container1">
        <div className="progress-line1">
          <div className="progress-circle1" />
          <div className="progress-circle1" />
        </div>
      </div>
      <div className="quiz-header-box">
        <div className="quiz-header">
          <p>
            코딩에 진심인 여러분들을 위해
            <br />
            여러분의 코딩 열정을 확인하기 위해 간단한 문제를 준비했습니다
            <br />
            <br />
            문제를 풀고 DEVELUV와 함께해요~
          </p>
        </div>
      </div>
      <div className="quiz-content">
        <h2>Quiz</h2>
        <h2>
          <p>{quiz.question}</p>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="quiz-options">
            {quiz.options.map((option) => (
              <button
                key={option}
                type="button"
                className={`radio-like-button ${
                  selectedAnswer === option ? "selected" : ""
                }`}
                onClick={() => handleAnswerChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button type="submit" className="submit-button">
            제출
          </button>
        </form>
        {errorMessage && (
          <p className="error-message">
            {errorMessage} 남은 시도 횟수: {attemptsLeft}
          </p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
