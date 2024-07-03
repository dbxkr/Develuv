import axios from "axios";
import "../mypage/QuizForm.css";
import { useAuth } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import FreeQuizContent from "./FreeQuizContent";

const FreeQuizForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [page, setPage] = useState(1); //페이지 계산을 위한 변수
  const [quizes, setQuizes] = useState([]); // 모든 퀴즈를 저장
  const [answer, setAnswer] = useState([]); //유저가 선택한 정답을 저장
  const ans = useRef([]); //유저가 선택한 정답을 순서대로 넣기 위한 변수
  const [modal, setModal] = useState(false); //모달 띄우는 변수

  // useEffect에서 순서 제어
  useEffect(() => {
    const fetchData = async () => {
      const check = await checkCount();
      console.log("check?", check);
      if (check === 1) {
        alert("오늘은 이미 참여하셨어요 🤯");
        navigate("/free");
      } else {
        getQuizes();
      }
    };

    fetchData();
  }, [user]);

  // 오늘의 퀴즈에 참여했는지 여부 조회
  const checkCount = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/freequiz/check/${user.user_id}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  // 퀴즈 가져오기 함수
  const getQuizes = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/freequiz/admin`);
      console.log("가져온 문제:", res.data);
      setQuizes(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // 퀴즈 값을 받아왔을 때만 렌더링하게 만든다..
  const renderQuizContent = () => {
    if (quizes.length > 0 && quizes[page - 1]) {
      return (
        <FreeQuizContent
          page={page}
          quiz={quizes[page - 1].quiz}
          content={quizes[page - 1].content}
          answer={quizes[page - 1].answer}
          ans={ans}
          quizId={quizes[page - 1].quiz_id}
          setAnswer={setAnswer}
        />
      );
    } else {
      return <p> ... Loading ...</p>; // 데이터가 로드되지 않았을 때 로딩 상태 표시
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
    let check = 0;
    for (let i = 0; i < quizes.length; i++) {
      if (answer[i] !== true && answer[i] !== false) {
        check++;
      }
    }
    if (check > 0) {
      setModal(true);
    }
    if (check === 0) {
      // 이미 한번 문제를 풀었으니까 다시 못 풀게 한다.
      try {
        axios.post("http://localhost:8080/freequiz/setuser", {
          user_id: user.user_id,
        });
      } catch {
        console.log("중복참여 판정 실패...");
      }
      // 채점하자 !
      goMarking();
    }
  };

  // 채점하는 함수
  function goMarking() {
    //채점용 변수 선언
    let score = 0;
    for (let i = 0; i < quizes.length; i++) {
      // 값이 true면 score 를 증가시킨다.
      if (answer[i] === true) {
        score++;
      }
    }
    // score 개수당 1,000 토큰 지급!
    console.log("score", score);
    if (score === 0) {
      alert("🥲정답을 맞히지 못했습니다.");
      navigate("/free");
    } else {
      alert(
        `🎉${score} 개의 문제를 맞혔습니다!🎉 ${
          score * 1000
        } 토큰이 보상으로 지급되었습니다.`
      );
      navigate("/free");
      axios.post("http://localhost:8080/freequiz/reward", {
        user_id: user.user_id,
        quizCount: score,
      });
    }
  }

  // 모달 관련 함수
  function onModal() {
    return (
      <div className="quiz-modal">
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
        <div className="button-container1">
          {page > 1 ? (
            <button className="quiz-button" onClick={prevPage}>
              이전
            </button>
          ) : null}
          {page === quizes.length ? (
            <button className="quiz-button" onClick={onSubmit}>
              제출
            </button>
          ) : (
            <button className="quiz-button" onClick={nextPage}>
              다음
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default FreeQuizForm;
