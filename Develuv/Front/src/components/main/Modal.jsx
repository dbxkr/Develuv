import React, { useState, useEffect } from "react";
import "./Modal.css";
import {
  getUserCoins,
  deductCoins,
  recommendUser,
  recommendUserByNbti,
  recommendUserByFame,
} from "./api";
import icon from "../../assets/money.png";
//결제 확인 nbti 선택 상위 유저 리스트 설정 기능 처리
const Modal = ({
  type,
  closeModal,
  userId,
  setMatchType,
  excludedUserIds = [], // 기본값으로 빈 배열을 설정
  setExcludedUserIds,
  // setMatchList, // 매칭 리스트를 설정하는 함수 추가
  setUserNbti, // nbti 값을 props로 전달받기
}) => {
  const [isNbtiSelection, setIsNbtiSelection] = useState(false);
  const [nbti, setNbti] = useState({
    nbti1: "",
    nbti2: "",
    nbti3: "",
    nbti4: "",
  });
  const [coins, setCoins] = useState(0);
  const [noUserFound, setNoUserFound] = useState(false);

  useEffect(() => {
    const fetchUserCoins = async () => {
      try {
        const userCoins = await getUserCoins(userId);
        setCoins(userCoins);
      } catch (error) {
        console.error("Error fetching user coins:", error);
      }
    };
    fetchUserCoins();
  }, [userId]);

  const handleCoinUse = async () => {
    // 결제 확인 메시지를 사용자에게 표시
    const confirmPayment = window.confirm("결제하시겠습니까?");
    if (!confirmPayment) return; // 사용자가 결제를 확인하지 않으면 함수 종료

    let price;

    if (type === "onceMore") {
      price = 500;
    } else {
      price = 1000;
    }

    try {
      // 코인을 차감하는 API 호출
      const remainingCoins = await deductCoins(userId, price);
      setCoins(remainingCoins); // 차감된 후 남은 코인 상태 업데이트

      // 남은 코인이 1000 미만인 경우 결제 중단 및 경고 메시지 표시
      if (remainingCoins < price) {
        alert("코인이 부족합니다.");
        return;
      }

      // 'onceMore' 타입인 경우
      if (type === "onceMore") {
        // 추천 유저를 가져오는 API 호출
        const users = await recommendUser(userId, excludedUserIds);
        if (users && users.length > 0) {
          // 추천 유저가 있는 경우
          setNoUserFound(false); // 유저를 찾지 못한 상태를 false로 설정
          await setMatchType("");
          setMatchType("rematch"); // 매칭 타입을 'rematch'로 설정
          // 제외된 유저 ID 목록 업데이트
          // setExcludedUserIds((prevIds) => [
          //   ...prevIds,
          //   ...users.map((user) => user.user_id),
          // ])
          // setMatchList(users) // 매칭 리스트에 추천 유저 리스트 설정
          closeModal(); // 모달 창 닫기
        } else {
          setNoUserFound(true); // 추천 유저가 없는 경우 상태 업데이트
        }
      }
      // 'topUser' 타입인 경우
      else if (type === "topUser") {
        // 유명한 유저를 가져오는 API 호출
        const users = await recommendUserByFame(userId, excludedUserIds);
        if (users && users.length > 0) {
          // 유명한 유저가 있는 경우
          setNoUserFound(false); // 유저를 찾지 못한 상태를 false로 설정
          await setMatchType("");
          await setMatchType("fame"); // 매칭 타입을 'fame'으로 설정
          // // 제외된  유저 ID 목록 업데이트
          // setExcludedUserIds((prevIds) => [
          //   ...prevIds,
          //   ...users.map((user) => user.user_id),
          // ])
          // setMatchList(users) // 매칭 리스트에 유명한 유저 리스트 설정
          closeModal(); // 모달 창 닫기
        } else {
          setNoUserFound(true); // 유명한 유저가 없는 경우 상태 업데이트
        }
      }
      // 'nbti' 타입인 경우
      else if (type === "nbti") {
        setIsNbtiSelection(true); // NBTI 선택 모드로 전환
      }
    } catch (error) {
      // API 호출 중 오류 발생 시 처리
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "Insufficient coins"
      ) {
        alert("코인이 부족합니다."); // 코인이 부족한 경우 경고 메시지 표시
      } else {
        console.error("Failed to use coins:", error); // 기타 오류 콘솔에 출력
        console.log("Error details:", error.response ? error.response : error); // 오류 세부 정보 콘솔에 출력
      }
    }
  };

  // NBTI 변경 핸들러
  const handleNbtiChange = (e) => {
    const { name, value } = e.target;
    setNbti((prevNbti) => ({
      ...prevNbti,
      [name]: value,
    }));
  };

  const handleNbtiSubmit = async () => {
    try {
      // 자신의 사용자 ID를 excludedUserIds에 포함
      const updatedExcludedUserIds = [...excludedUserIds, userId];

      const users = await recommendUserByNbti(
        userId,
        nbti,
        updatedExcludedUserIds
      ); // 여기를 수정
      if (users && users.length > 0) {
        setNoUserFound(false);
        // nbti 세팅 (usesatate 나 useRef 변수 설정 ex setNbti("BOMD") or nbti.current="BOMD")
        const combinedNbti = `${nbti.nbti1}${nbti.nbti2}${nbti.nbti3}${nbti.nbti4}`;
        setUserNbti(combinedNbti);
        await setMatchType("");
        setMatchType("nbti");
        // setExcludedUserIds((prevIds) => [
        //   ...prevIds,
        //   ...users.map((user) => user.user_id),
        // ])
        // setMatchList(users) // 매칭 리스트에 유저 리스트를 설정
        closeModal();
      } else {
        setNoUserFound(true);
      }
      setIsNbtiSelection(false);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "Insufficient coins"
      ) {
        alert("코인이 부족합니다.");
      } else {
        console.error("Failed to use coins:", error);
        console.log("Error details:", error.response ? error.response : error);
      }
    }
  };

  return (
    <div className="modal">
      <div className="m-modal-content">
        <span className="close-button" onClick={closeModal}>
          &times;
        </span>
        {!isNbtiSelection ? (
          <>
            <img
              src={icon}
              alt="Icon"
              style={{ width: "50px", height: "50px" }}
            />
            <p className="modal-text">
              {type == "onceMore" ? 500 : 1000} BIT로 한번 더 소개받기
            </p>
            <p>현재 코인: {coins}</p>
            <button className="modal-button" onClick={handleCoinUse}>
              {type == "onceMore" ? 500 : 1000} BIT 결제
            </button>
            <button className="modal-button" onClick={closeModal}>
              뒤로가기
            </button>
            {noUserFound && (
              <div>
                <p>해당 조건에 맞는 유저를 찾지 못했습니다.</p>
              </div>
            )}
          </>
        ) : (
          <>
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
            <button className="submit-button" onClick={handleNbtiSubmit}>
              제출
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
