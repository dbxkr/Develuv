import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'

function Nbti({ progress, setProgress, formData, setFormData }) {
  // 유저가 선택한 nbti 요소를 배열 형태로 저장
  const [nbti, setNbti] = useState('')
  const inputNbti = useRef(['', '', '', ''])

  // nbti 선택 시 상태 업데이트
  const onSetNbti = (e) => {
    if (e.target.name === 'nbti1') {
      inputNbti.current[0] = e.target.value
    }
    if (e.target.name === 'nbti2') {
      inputNbti.current[1] = e.target.value
    }
    if (e.target.name === 'nbti3') {
      inputNbti.current[2] = e.target.value
    }
    if (e.target.name === 'nbti4') {
      inputNbti.current[3] = e.target.value
    }
    setNbti(inputNbti.current.join(''))
  }

  // nbti 배열의 유효성 검사를 통해 다음 버튼 활성화 여부 결정
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    checkNbtiValidity()
  }, [nbti])

  const checkNbtiValidity = () => {
    const allSelected = inputNbti.current.every((value) => value !== '')
    setIsValid(allSelected)
  }

  // [이전] 버튼 클릭 시 이전 페이지로 이동
  const navigateToPrevious = () => {
    setProgress(progress - 1)
  }

  // [다음] 버튼 클릭 시 유효성 검사 후 서버에 데이터 전송 후 다음 페이지로 이동
  const url = 'http://localhost:8080/register/nbti'
  const onSubmit = () => {
    // if (isValid) {
    //   axios
    //     .post(url, {
    //       user_id: user_id,
    //       nbti: nbti,
    //     })
    //     .then((res) => {
    //       console.log(res);
    //       navigate(nextPage);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // } else {
    //   alert("모든 NBTI 항목을 선택해주세요.");
    // }
    setFormData({ ...formData, user_nbti: nbti })
    setProgress(progress + 1)
  }

  //NBTI 상세설명 작성 --> 툴팁으로 띄운다.
  const description =
    'NBTI란? MBTI 처럼 개인의 개발성향을 분류하는 Develuv 만의 심리학 도구입니다. 네 가지 기본 지표 중에서 자신의 개발 유형을 선택해주세요 !'
  return (
    <div>
      {/* Progress Indicator */}
      <div className="signup4container"></div>

      <div className="container-header">
        <div className="tt4">
          NBTI{' '}
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
            style={{ fontSize: '0.7em', zIndex: 1 }}
            backgroundColor="gray"
            arrowColor="transparent"
          />
        </div>
        <div className="gray_font4">자신의 코딩 유형을 골라주세요</div>
        <div className="gray_font4-2">
          전부 선택해주셔야 다음으로 진행할 수 있습니다
        </div>
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
        <button className="left-button" onClick={navigateToPrevious}>
          이전
        </button>
        <button
          className="right-button"
          onClick={() => onSubmit()}
          disabled={!isValid}
        >
          다음
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="signup4container">
        <div className="progress-container4">
          <div className="progress-line4">
            <div className="progress-circle4 fourth" />
            <div className="progress-circle4 fifth" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nbti
