import MatchingItem from "./MatchingItem.jsx";
import { useEffect, useRef, useState } from "react";
import "./MatchingItem.css";
import axios from "axios";

//매칭 항목 리스트 표시
//선택된 매칭 타입에 따라 매칭 리스트 필터링
//매칭 리스트 가져오는 역할
const MatchingList = ({
  matchList,
  matchType,
  setMatchList,
  setMatchType,
  user_id,
  user_nbti, // nbti 값을 props로 전달받기
  excludedUserIds, // 추가된 부분
  setExcludedUserIds, // 추가된 부분
}) => {
  const address = useRef("");

  useEffect(() => {
    // if (
    //   matchType === "nbti" ||
    //   matchType === "rematch" ||
    //   matchType === "fame"
    // ) {
    //   // 이미 matchList가 설정되어 있으면 새로 데이터를 가져오지 않음
    //   return;
    // }
    console.log("매칭타입",matchType);
    getMatchList();
  }, [matchType]);

  function getMatchList() {
    const formData = new FormData();
    const updatedExcludedUserIds = [user_id, ...(excludedUserIds || [])]; // 자신의 사용자 ID와 기존 제외 리스트 포함, 배열로 초기화
    if (matchType === "normal") {
      // 일반 매칭 검색

      axios
        .get("http://localhost:8080/matching/kdtree", {
          params: {
            user_id: user_id,
          },
        })
        .then(async (response) => {
          await setMatchList(response.data);
          await console.log("매칭된 리스트",matchList,response.data);
        })
        .catch((error) => {
          console.error("Error getList normal => ", error);
        });
    } else if (matchType === "rematch") {
      // 다시 검색

      axios
        .get("http://localhost:8080/matching/kdtree/random", {
          params: {
            user_id: user_id,
            excludedUserIds: updatedExcludedUserIds.join(","), // 추가된 부분
          },
        })
        .then((response) => {
          setMatchList(response.data);
          setExcludedUserIds((prevIds) => [
            ...prevIds,
            ...response.data.map((user) => user.user_id),
          ]); // 추가된 부분
          console.log(matchList);
        })
        .catch((error) => {
          console.error("Error getList rematch => ", error);
        });
    } else if (matchType === "nbti") {
      // 선택한 nbti로 검색
      console.log(matchType);
      // formData.append('searchAdr', address.current)
      axios
        .get("http://localhost:8080/matching/kdtree/nbti", {
          params: {
            user_id: user_id,
            nbti: user_nbti, //요거 props 받은거로 바꿔주기
            excludedUserIds: updatedExcludedUserIds.join(","), // 추가된 부분
          },
        })
        .then((response) => {
          setMatchList(response.data);
          setExcludedUserIds((prevIds) => [
            ...prevIds,
            ...response.data.map((user) => user.user_id),
          ]); // 추가된 부분
          console.log(matchList);
        })
        .catch((error) => {
          console.error("Error getList nbti => ", error);
        });
    } else if (matchType === "fame") {
      // 유명한순
      formData.append("searchAdr", address.current);
      axios
        .get("http://localhost:8080/matching/kdtree/famous", {
          params: {
            user_id: user_id,
            excludedUserIds: updatedExcludedUserIds.join(","), // 추가된 부분
          },
        })
        .then((response) => {
          setMatchList(response.data);
          setExcludedUserIds((prevIds) => [
            ...prevIds,
            ...response.data.map((user) => user.user_id),
          ]); // 추가된 부분
          console.log(matchList);
        })
        .catch((error) => {
          console.error("Error getList fame => ", error);
        });
    }
  }

  const { formData, setFormData } = useState();

  return (
    <div className={"MatchingList"}>
      <div className={"MatchingItems"}>
        {matchList.map((item) => (
          <MatchingItem
            key={item.user_id}
            user_id={item.user_id}
            user_name={item.user_name}
            user_gender={item.user_gender}
            user_adress={item.user_address}
            user_nbti={item.user_nbti}
            user_profile={item.user_profile}
            user_birth={item.user_birth}
          />
        ))}
      </div>
    </div>
  );
};

export default MatchingList;
