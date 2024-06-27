import axios from "axios";
import "./QuizForm.css";
import { useEffect, useRef, useState } from "react";
import QuizContent from "./QuizContent";
import { useNavigate } from "react-router-dom";

const QuizForm = ({ userId }) => {
  const navigate = useNavigate();
  const [quizes, setQuizes] = useState([]); // 모든 퀴즈를 저장
  const [answer, setAnswer] = useState([]); //유저가 선택한 정답을 저장
  const ans = useRef([]); //유저가 선택한 정답을 순서대로 넣기 위한 변수
  const [page, setPage] = useState(1); //페이지 계산을 위한 변수
  const [modal, setModal] = useState(false); //모달 띄우는 변수
  userId = "hhy"; // 임의로 아이디 세팅

  // 출제자 아이디가 변경될때마다 문제 목록 가져오기 :D
  useEffect(() => {
    const getQuizes = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/quiz/user/" + userId
        );
        console.log("가져온 문제:", res.data);
        setQuizes(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getQuizes();
  }, [userId]);

  // 퀴즈 값을 받아왔을 때만 렌더링하게 만든다..
  const renderQuizContent = () => {
    if (quizes.length > 0 && quizes[page - 1]) {
      return (
        <QuizContent
          page={page}
          quiz={quizes[page - 1].quiz}
          answer={quizes[page - 1].answer}
          ans={ans}
          qId={quizes[page - 1].q_id}
          setAnswer={setAnswer}
        />
      );
    } else {
      return <p>Loading...</p>; // 데이터가 로드되지 않았을 때 로딩 상태 표시
    }
  };

  // 프로그레스 바 길이 계산
  const barLength = (page / quizes.length) * 500;

  // 페이지 이동 함수
  const prevPage = () => {
    setPage(page - 1);
    console.log(page);
  };

  const nextPage = () => {
    setPage(page + 1);
    console.log(page);
  };

  // 결과 제출 함수
  const onSubmit = () => {
    console.log("최종선택: ", answer);
    // 채점 전에, 값을 전부 선택하지 않으면 경고와 함께 진행되지 않도록 세팅.
    for (let i = 0; i < quizes.length; i++) {
      if (answer[i] !== true && answer[i] !== false) {
        setModal(true);
      } else {
        //채점 함수 호출
        goMarking();
      }
    }
  };

  function goMarking() {
    //채점용 변수 선언
    let score = 0;
    for (let i = 0; i < quizes.length; i++) {
      // 값이 true면 score 를 증가시킨다.
      if (answer[i] === true) {
        score++;
      }
    }
    // score 숫자와 문제 수가 같으면 전부 정답이라는 뜻
    if (score === quizes.length) {
      console.log("score", score);
      alert("🎉정답입니다🎉 언블러 1회권을 획득했습니다");
      navigate("/mypage/:" + userId);
    }
    if (score !== quizes.length) {
      alert("🥲정답이 아니네요...");
      navigate("/mypage/:" + userId);
    }
  }
  // 모달 관련 함수
  function onModal() {
    return (
      <div className="modal">
        <h4>모든 항목을 선택해주세요!</h4>
        <p>선택해 주시지 않으면 채점할 수가 없어용 :(</p>
        <p>
          <button onClick={removeModal}>네</button>
        </p>
      </div>
    );
  }
  function removeModal() {
    setModal(false);
  }

  return (
    <>
      <div className="container">
        <div>{modal === true ? onModal() : null}</div>
        <div className="bar-div">
          <div className="progress-line-gray">
            <div
              className="progress-line-blue"
              style={{ width: `${barLength}px` }}
            />
            <div className="total-quiz-number">{quizes.length}</div>
            <div
              className="current-quiz-number"
              style={{ left: `${barLength - 30}px` }}
            >
              {page}
            </div>
          </div>
        </div>
        <div className="quiz-div">{renderQuizContent()}</div>
        <div className="button-container">
          {page > 1 ? <button onClick={prevPage}>이전</button> : null}
          {page === quizes.length ? (
            <button onClick={onSubmit}>제출</button>
          ) : (
            <button onClick={nextPage}>다음</button>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizForm;
