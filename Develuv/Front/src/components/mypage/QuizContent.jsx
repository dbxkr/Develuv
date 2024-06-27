import { useEffect, useRef, useState } from "react";
import axios from "axios";

const QuizContent = ({ page, quiz, answer, ans, qId, setAnswer }) => {
  console.log("현재 페이지 : ", page);
  console.log(`${page} 페이지 문제 확인: ${quiz}의 답은 ${answer}란다:)`);
  const [choices, setChoices] = useState([]);
  const radioRef = useRef();

  // q_id 로 해당 문제의 선택지 가져오기
  useEffect(() => {
    const getChoices = async () => {
      try {
        const res = await axios.get("http://localhost:8080/quiz/" + qId);
        console.log("가져온 선택지:", res.data);
        setChoices(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getChoices();
  }, [qId]);

  useEffect(() => {
    if (radioRef !== undefined) {
      console.log("라디오버튼 상태 !!", radioRef.checked);
    }
  });

  // 선택지를 라디오 버튼으로 만들기...
  const printChoices = () => {
    return choices.map((el) => (
      <div key={el.c_num}>
        <div className="choice-container">
          <label className="choice-label" htmlFor={`choice_${el.c_num}`}>
            <input
              className="choice-input"
              ref={radioRef}
              type="radio"
              name="ch"
              //   value={el.c_num}
              id={`choice_${el.c_num}`}
              // 선택한 라디오 버튼의 번호를 부모 컴포넌트 ans에 저장
              onClick={(e) => {
                if (e.target.value == answer) {
                  ans.current[page - 1] = true;
                }
                if (e.target.value != answer) {
                  ans.current[page - 1] = false;
                }
                setAnswer(ans.current);
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
      {printChoices()}
    </div>
  );
};

export default QuizContent;
