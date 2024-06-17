import React, { useState } from 'react'
import './Modal.css'
import icon from '../../assets/money.svg' // SVG 이미지 파일 import

const Modal = ({ type, closeModal }) => {
  const [isNbtiSelection, setIsNbtiSelection] = useState(false)

  const handleCoinUse = () => {
    if (type === 'nbti') {
      alert('1000 코인을 사용하여 NBTI 유형의 유저를 소개받습니다.')
      setIsNbtiSelection(true)
    } else {
      alert('1000 코인을 사용하여 새로운 유저를 소개받습니다.')
      closeModal()
    }
  }

  const handleNbtiSubmit = () => {
    // NBTI 제출 로직
    closeModal()
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={closeModal}>
          &times;
        </span>
        {!isNbtiSelection ? (
          <>
            <img
              src={icon}
              alt="Icon"
              style={{ width: '50px', height: '50px' }}
            />
            <p>1000 BIT로 한번 더 소개받기</p>
            <button onClick={handleCoinUse}>1000 BIT 결제</button>
            <button onClick={closeModal}>뒤로가기</button>
          </>
        ) : (
          <>
            <h4>NBTI</h4>

            <div className="nbti-container">
              <ul>
                <li>
                  <input
                    type="radio"
                    id="front"
                    name="nbti1"
                    value="F"
                    onClick={handleNbtiSubmit}
                  />
                  <label htmlFor="front">Front</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="inside"
                    name="nbti2"
                    value="I"
                    onClick={handleNbtiSubmit}
                  />
                  <label htmlFor="inside">Inside</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="window"
                    name="nbti3"
                    value="W"
                    onClick={handleNbtiSubmit}
                  />
                  <label htmlFor="window">Window</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="daytime"
                    name="nbti4"
                    value="D"
                    onClick={handleNbtiSubmit}
                  />
                  <label htmlFor="daytime">Daytime</label>
                </li>
              </ul>
              <ul className="vs">
                <li>
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
                    onClick={handleNbtiSubmit}
                  />
                  <label htmlFor="back">Back</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="outside"
                    name="nbti2"
                    value="O"
                    onClick={handleNbtiSubmit}
                  />
                  <label htmlFor="outside">Outside</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="mac"
                    name="nbti3"
                    value="M"
                    onClick={handleNbtiSubmit}
                  />
                  <label htmlFor="mac">Mac</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="night"
                    name="nbti4"
                    value="N"
                    onClick={handleNbtiSubmit}
                  />
                  <label htmlFor="night">Night</label>
                </li>
              </ul>
            </div>
            <button onClick={handleNbtiSubmit}>제출</button>
          </>
        )}
      </div>
    </div>
  )
}

export default Modal
