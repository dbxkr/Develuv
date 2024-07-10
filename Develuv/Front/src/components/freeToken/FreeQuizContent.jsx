import { useEffect, useRef, useState } from "react";
import axios from "axios";

const FreeQuizContent = ({
  page,
  quiz,
  content,
  answer,
  ans,
  quizId,
  setAnswer,
}) => {
  console.log("현재 페이지 : ", page);
  console.log(`${page} 페이지 문제 확인: ${quiz}의 답은 ${answer}란다:)`);
  const [choices, setChoices] = useState([]);

  // 퀴즈 선택지를 가져오는 함수
  useEffect(() => {
    const getChoices = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/freequiz/${quizId}`);
        console.log("가져온 선택지:", res.data);
        setChoices(res.data);
        return res.data;
      } catch (error) {
        console.log(error);
        return null;
      }
    };

    getChoices();
  }, [quizId]);

  // 페이지가 변경될 때마다 라디오 버튼의 선택 상태 초기화
  useEffect(() => {
    const radioButtons = document.querySelectorAll(
      `input[name="ch_${quizId}"]`
    );
    radioButtons.forEach((radio) => (radio.checked = false));
  }, [page, quizId]);

  // 선택지를 라디오 버튼으로 만들기...
  const printChoices = () => {
    return choices.map((el, index) => (
      <div key={index}>
        <div className="choice-container">
          <label
            className="choice-label"
            htmlFor={`choice_${quizId}_${el.c_num}`}
          >
            <input
              className="choice-input"
              type="radio"
              name={`ch_${quizId}`}
              id={`choice_${quizId}_${el.c_num}`}
              value={el.c_num}
              // 선택한 라디오 버튼의 번호를 부모 컴포넌트 ans에 저장
              onClick={(e) => {
                if (parseInt(e.target.value) === answer) {
                  ans.current[page - 1] = true;
                } else {
                  ans.current[page - 1] = false;
                }
                setAnswer([...ans.current]);
                console.log("정답상황: ", ans.current);
              }}
            />
            <span dangerouslySetInnerHTML={{ __html: el.content }} />
          </label>
        </div>
      </div>
    ));
  };

  return (
    <div className="children-container">
      <h3>Q. {quiz}</h3>
      <div className="free-quiz-container">
        <span dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      {printChoices()}
    </div>
  );
};

export default FreeQuizContent;
