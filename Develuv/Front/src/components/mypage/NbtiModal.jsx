import React, { useState, useEffect } from "react";
import "./NbtiModal.css";

const NbtiModal = ({ isVisible, onClose, onUpdate }) => {
  const [nbti, setNbti] = useState(["", "", "", ""]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setNbti(["", "", "", ""]); // 모달이 열릴 때 NBTI 상태 초기화
      setIsValid(false); // 모달이 열릴 때 유효성 상태 초기화
    }
  }, [isVisible]);

  const handleNbtiChange = (e) => {
    const newNbti = [...nbti];
    if (e.target.name === "nbti1") {
      newNbti[0] = e.target.value;
    }
    if (e.target.name === "nbti2") {
      newNbti[1] = e.target.value;
    }
    if (e.target.name === "nbti3") {
      newNbti[2] = e.target.value;
    }
    if (e.target.name === "nbti4") {
      newNbti[3] = e.target.value;
    }
    setNbti(newNbti);
  };

  useEffect(() => {
    const allSelected = nbti.every((value) => value !== "");
    setIsValid(allSelected);
  }, [nbti]);

  const handleUpdate = () => {
    if (isValid) {
      onUpdate(nbti.join(""));
      onClose(); // 모달을 닫기 위해 호출
    } else {
      alert("모든 NBTI 항목을 선택해주세요."); // 알림창 표시
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="n-modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>NBTI</h3>
        <h4>선호하는 NBTI를 골라주세요.</h4>
        <div className="nbti-container">
          <ul>
            <li>
              <input
                type="radio"
                id="front"
                name="nbti1"
                value="F"
                onChange={handleNbtiChange}
              />
              <label htmlFor="front">Front</label>
            </li>
            <li>
              <input
                type="radio"
                id="inside"
                name="nbti2"
                value="I"
                onChange={handleNbtiChange}
              />
              <label htmlFor="inside">Inside</label>
            </li>
            <li>
              <input
                type="radio"
                id="window"
                name="nbti3"
                value="W"
                onChange={handleNbtiChange}
              />
              <label htmlFor="window">Window</label>
            </li>
            <li>
              <input
                type="radio"
                id="daytime"
                name="nbti4"
                value="D"
                onChange={handleNbtiChange}
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
                onChange={handleNbtiChange}
              />
              <label htmlFor="back">Back</label>
            </li>
            <li>
              <input
                type="radio"
                id="outside"
                name="nbti2"
                value="O"
                onChange={handleNbtiChange}
              />
              <label htmlFor="outside">Outside</label>
            </li>
            <li>
              <input
                type="radio"
                id="mac"
                name="nbti3"
                value="M"
                onChange={handleNbtiChange}
              />
              <label htmlFor="mac">Mac</label>
            </li>
            <li>
              <input
                type="radio"
                id="night"
                name="nbti4"
                value="N"
                onChange={handleNbtiChange}
              />
              <label htmlFor="night">Night</label>
            </li>
          </ul>
        </div>
        <div className="n-modal-buttons">
          <button onClick={onClose}>취소</button>
          <button onClick={handleUpdate}>업데이트</button>
        </div>
      </div>
    </div>
  );
};

export default NbtiModal;
