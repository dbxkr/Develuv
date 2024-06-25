import {useState} from "react";

const QuizInsertItem = ({qForm,setQForm,page,setQInPage}) => {

  const [qinput, setQinput] = useState();


  const [choices, setChoices] = useState([{ id: 1, text: '' }]);

  const addChoice = () => {
    const newChoice = { id: choices.length + 1, text: '' };
    setChoices([...choices, newChoice]);
  };

  const handleChoiceChange = (id, event) => {
    const newChoices = choices.map(choice =>
      choice.id === id ? { ...choice, text: event.target.value } : choice
    );
    setChoices(newChoices);
  };

  const removeChoice = (id) => {
    // 선택지를 삭제하고, 이후 선택지의 id를 1씩 감소시킴
    const newChoices = choices
      .filter(choice => choice.id !== id) // 해당 id의 선택지를 제거
      .map((choice, index) => ({
        ...choice,
        id: index + 1 // id를 1부터 재배열
      }));
    setChoices(newChoices);
  };

  function onPrev() {
    setQInPage(page-1);
  }

  function onNext() {
    setQInPage(page+1);
  }

  function onChangeQIn(e) {
    setQinput(e.target.value);
  }

  return(
    <div className={"QuizInsertItem"}>

      {/* 진행 사항 */}
      <div className={"progress_c"}>
        <div className={"progress_font"}>{page}</div>
      </div>

      {/* 질문 입력창 */}
      <div className={"qinput_div"}>
        <input className={"qinput"} value={qinput}
               onChange={onChangeQIn}
               placeholder={"질문을 입력해주세요"}/>
      </div>

      {/* 답안 선택지 입력창*/}
      <div className={"choice_div"}>
        {choices.map((choice, index) => (
          <div key={choice.id} className={"choice_input_div"}>
            <textarea
              className={"choice_input"}
              placeholder={`선택지 ${choice.id}`}
              value={choice.text}
              onChange={(e) => handleChoiceChange(choice.id, e)}
            />
            {index === choices.length - 1 ? (
              <button className={"choice_btn"} onClick={addChoice}>+</button>
            ) : (
              <button className={"choice_btn"} onClick={() => removeChoice(choice.id)}>-</button>
            )}
          </div>
        ))}
        {/* 선택지 input을 추가하는 버튼 */}
      </div>

      {/* 이전, 다음, 제출 버튼 */}
      {
        page === 1 ? "" :
          <button className={"pn_qin_btn"}
            onClick={onPrev}
          >이전</button>
      }
      {
        page === 5 ?
          "":
          <button className={"pns_qin_btn"}
                  type={"button"}
            onClick={onNext}
          >
            다음
          </button>
      }
      <button className={"pns_qin_btn"}
              type={"button"}
        // onClick={onSubmit}
      >
        제출
      </button>
    </div>
  )
}

export default QuizInsertItem