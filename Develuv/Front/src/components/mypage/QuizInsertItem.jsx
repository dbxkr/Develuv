import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const QuizInsertItem = ({page, q_num, setQInPage, qFormData, updateQForm, quizForm, choiceForm, hasQuiz, user_id}) => {

  const [quiz, setQuiz] = useState('');
  const textareaRefs = useRef([]);
  const [choices, setChoices] = useState([{q_num:q_num,c_num: 1, content: ''}]);
  const answer = useRef(0);
  const q_num1 = useRef(q_num);
  const [ans,setAns] = useState(answer.current);
  const navi = useNavigate();
  const idVal = localStorage

  document.addEventListener('contextmenu', event => event.preventDefault());

  useEffect(() => {
    console.log('page 선택지 렌더링!', choiceForm);
    setChoices(choiceForm);
    setQuiz(quizForm);
    answer.current = qFormData[page - 1].answer;
  }, [page]);

  // 현재 페이지 formData 저장
  const saveCurrentData = () => {
    const qsForm = {quiz, answer: answer.current, choices};
    return updateQForm(page, qsForm);

  };

  // 선택지 추가
  const addChoice = () => {
    if (choices.length < 4) {
      const newChoice = {q_num:q_num,c_num: choices.length + 1, content: ''};
      setChoices([...choices, newChoice]);
    }
  };

  // 선택지 textarea 높이 가변성 함수
  const adjustHeight = (element) => {
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
  };

  //선택지 삭제 함수
  const removeChoice = (c_num) => {
    // 선택지를 삭제하고, 이후 선택지의 id를 1씩 감소시킴
    const newChoices = choices
      .filter(choice => choice.c_num !== c_num) // 해당 id의 선택지를 제거
      .map((choice, index) => ({
        ...choice,
        c_num: index + 1 // id를 1부터 재배열
      }));
    setChoices(newChoices);
    answer.current = 0;
  };

  // 질문 이전 다음 함수
  function onPrev() {
    if (answer.current !== 0) {
      saveCurrentData();
      setQInPage(page - 1);
    } else {
      alert("정답을 선택해주세요!!")
    }
  }

  function onNext() {
    if (answer.current !== 0) {
      saveCurrentData();
      setQInPage(page + 1);
    } else {
      alert("정답을 선택해주세요!!")
    }
  }

  // 질문 입력창 onChange 함수
  function onChangeQIn(e) {
    setQuiz(e.target.value);
  }

  // 선택지 입력창 onChange 함수
  const handleChoiceChange = (c_num, event) => {
    const newChoices = choices.map(choice =>
      choice.c_num === c_num ? {...choice, content: event.target.value} : choice
    );
    setChoices(newChoices);
    adjustHeight(event.target);
  };

  // // 질문들 submit 함수
  // const onSubmit = async () => {
  //   try {
  //     if (answer.current !== 0) {
  //
  //       await saveCurrentData();
  //       console.log("모든 페이지 데이터:", qFormData);
  //
  //       const response = await axios.post("http://localhost:8080/api/user/quiz/register",qFormData)
  //       console.log(response.data);
  //
  //     } else {
  //       alert("정답을 선택해주세요!!")
  //     }
  //   } catch (error) {
  //     console.log("Submit FormData Error!!!");
  //   }
  // }

  const onSubmit = () => {
    try {
      if (answer.current !== 0) {
        const postData = saveCurrentData();
        console.log("postdata : ",postData);
        const arr = postData.map((item, index) => ({
          ...item,
          q_num: index+1,
          choices: item.choices.map(choice=>({
            ...choice,
            q_num: index+1
          }))
        }))
        console.log(arr);

        axios.post(`http://localhost:8080/api/user/quiz/register/${hasQuiz}`, arr)
          .then(async (response) => {
            await console.log(response.data);
            await alert("퀴즈 업로드 완료");
            await navi(`/mypage/${user_id}`);
          })
          .catch((error)=> {
            console.log("error register user quiz");
          })
      } else {
        alert("정답을 선택해주세요!!");
      }
    } catch (error) {
      console.log("Submit FormData Error!!!", error);
    }
  };

  // 질문 정답 onChange 함수
  function onClickAnswer(answerC_num) {
    answer.current = answerC_num;
    console.log("선태된 정답 ", answer)
    setAns(answer.current);
  }

  return (
    <div className={"QuizInsertItem"}>

      {/* 진행 사항 */}
      <div className={"progress_c"}>
        <div className={`${page === 1 ? "progress_font_sel" : "progress_font"}`}>1</div>
        <div className={`${page === 2 ? "progress_font_sel" : "progress_font"}`}>2</div>
        <div className={`${page === 3 ? "progress_font_sel" : "progress_font"}`}>3</div>
        <div className={`${page === 4 ? "progress_font_sel" : "progress_font"}`}>4</div>
        <div className={`${page === 5 ? "progress_font_sel" : "progress_font"}`}>5</div>
        <button className={"pns_qin_btn"}
                type={"button"}
                onClick={onSubmit}
                style={{position: "fixed", right: "10%", top: "110px"}}
        >
          제출
        </button>
      </div>

      {/* 질문 입력창 */}
      <div className={"qinput_div"}>
        <input className={"quiz"} value={quiz}
               onChange={onChangeQIn}
               placeholder={"질문을 입력해주세요"}/>
      </div>

      {/* 답안 선택지 입력창*/}
      <div className={"choice_div"}>
        {choices.map((choice, index) => (
          <div key={choice.c_num} className={"choice_input_div"}>
            {choice.c_num === ans ?
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                   className="bi bi-check-circle-fill" viewBox="0 0 16 16" style={{color: "pink", width:"30px", height:"30px"}}>
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
              </svg>
              : <button className={"choice_btn"} type={"button"} style={{color:"#303F7B"}} onClick={() => onClickAnswer(choice.c_num)}> </button>
            }
            <textarea
              ref={el => textareaRefs.current[index] = el}
              className={"choice_input"}
              placeholder={`선택지 ${choice.c_num}`}
              value={choice.content}
              onChange={(e) => handleChoiceChange(choice.c_num, e)}
              onInput={(e) => adjustHeight(e.target)}
            />
            {index === choices.length - 1 ? (
              index === 3 ?
                <button className={"choice_btn"} onClick={() => removeChoice(choice.c_num)}>-</button> :
                <button className={"choice_btn"} onClick={addChoice}>+</button>
            ) : (
              <button className={"choice_btn"} onClick={() => removeChoice(choice.c_num)}>-</button>
            )}
          </div>
        ))}
        {/* 선택지 input을 추가하는 버튼 */}
      </div>

      {/* 이전, 다음, 제출 버튼 */}
      {
        page === 1 ? "" :
          <button className={"pns_qin_btn"}
                  onClick={onPrev}
          >이전</button>
      }
      {
        page === 5 ?
          "" :
          <button className={"pns_qin_btn"}
                  type={"button"}
                  onClick={onNext}
                  style={{float: "right"}}
          >
            다음
          </button>
      }
      {/*<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"*/}
      {/*     className="bi bi-check-circle-fill" viewBox="0 0 16 16" style={{color:"blue"}}>*/}
      {/*  <path*/}
      {/*    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>*/}
      {/*</svg>*/}

    </div>
  )
}

export default QuizInsertItem