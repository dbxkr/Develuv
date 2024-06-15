import { useRef, useState, useEffect } from "react";
import "./Nbti.css";
import axios from "axios";
import { Tooltip } from "react-tooltip";

//이전 페이지에서 사용자의 id 를 받아와야 한다.
function Nbti({ user_id }) {
  //임시 id 세팅...
  user_id = "hhy";

  //NBTI 상세설명 작성 --> 툴팁으로 띄운다.
  const description =
    "NBTI란? MBTI 처럼 개인의 개발성향을 분류하는 Develuv 만의 심리학 도구입니다. 네 가지 기본 지표 중에서 자신의 개발 유형을 선택해주세요 !";

  //유저가 선택한 nbti 요소를 배열 형태로 저장한다.
  const [nbti, setNbti] = useState(["", "", "", ""]);
  const inputNbti = useRef(["", "", "", ""]);

  const onSetNbti = (e) => {
    //유저의 입력순서가 아닌 NBTI 순서대로 저장하기 위해서 useRef로 순서대로 배열에 담은 후 setNbti 로 저장했다.
    if (e.target.name === "nbti1") {
      inputNbti.current[0] = e.target.value;
    }
    if (e.target.name === "nbti2") {
      inputNbti.current[1] = e.target.value;
    }
    if (e.target.name === "nbti3") {
      inputNbti.current[2] = e.target.value;
    }
    if (e.target.name === "nbti4") {
      inputNbti.current[3] = e.target.value;
    }
    setNbti([...inputNbti.current]);
  };

  //유효성 검사 : NBTI 4개를 전부 선택해야 [다음] 버튼이 활성화되도록 함.
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    checkNbti();
  }, [nbti]);

  const checkNbti = () => {
    const allSelected = nbti.every(
      (value) => value !== "" && value !== undefined
    );
    setIsValid(allSelected);
  };

  //[이전] 혹은 [다음] 버튼을 누르면 선택한 nbti 배열을 서버에 전송한다.
  const url = "http://localhost:8080/register/nbti";
  function onSubmit() {
    axios
      .post(url, {
        user_id: user_id,
        nbti: nbti,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <div className="progress-container">
        <div className="progress-line">
          <div className="total-progress-line">
            <div className="progress-circle-fourth" />
            <div className="progress-circle-fifth" />
          </div>
        </div>
      </div>

      <div className="container-header">
        <h2>
          NBTI
          <img
            src="src/assets/question-circle-fill.svg"
            width={20}
            height={20}
            data-tooltip-id="tooltip"
            data-tooltip-content={description}
          />
          <Tooltip
            id="tooltip"
            place="top"
            style={{ fontSize: "0.7em" }}
            backgroundColor="gray"
            arrowColor="transparent"
          />
        </h2>
        <h4>당신의 NBTI를 선택해주세요.</h4>
      </div>
      <div className="container-button">
        <ul>
          <li>
            <input
              type="radio"
              id="front"
              name="nbti1"
              value="F"
              onClick={onSetNbti}
            />
            <label htmlFor="front">Front</label>
          </li>
          <li>
            <input
              type="radio"
              id="inside"
              name="nbti2"
              value="I"
              onClick={onSetNbti}
            />
            <label htmlFor="inside">Inside</label>
          </li>
          <li>
            <input
              type="radio"
              id="window"
              name="nbti3"
              value="W"
              onClick={onSetNbti}
            />
            <label htmlFor="window">Window</label>
          </li>
          <li>
            <input
              type="radio"
              id="daytime"
              name="nbti4"
              value="D"
              onClick={onSetNbti}
            />
            <label htmlFor="daytime">Daytime</label>
          </li>
        </ul>
        <ul>
          <li className="container-button-center">
            <h3>vs</h3>
          </li>
        </ul>
        <ul>
          <li>
            <input
              type="radio"
              id="back"
              name="nbti1"
              value="B"
              onClick={onSetNbti}
            />
            <label htmlFor="back">Back</label>
          </li>
          <li>
            <input
              type="radio"
              id="outside"
              name="nbti2"
              value="O"
              onClick={onSetNbti}
            />
            <label htmlFor="outside">Outside</label>
          </li>
          <li>
            <input
              type="radio"
              id="mac"
              name="nbti3"
              value="M"
              onClick={onSetNbti}
            />
            <label htmlFor="mac">Mac</label>
          </li>
          <li>
            <input
              type="radio"
              id="night"
              name="nbti4"
              value="N"
              onClick={onSetNbti}
            />
            <label htmlFor="night">Night</label>
          </li>
        </ul>
      </div>
      <div className="container-footer">
        <button className="left-button" onClick={onSubmit}>
          이전
        </button>
        <button className="right-button" onClick={onSubmit} disabled={!isValid}>
          다음
        </button>
      </div>
    </div>
  );
}

export default Nbti;
