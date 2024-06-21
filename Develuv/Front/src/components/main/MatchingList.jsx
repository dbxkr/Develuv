import MatchingItem from "./MatchingItem.jsx";
import {useEffect, useRef, useState} from "react";
import "./MatchingItem.css";
import axios from "axios";


const MatchingList = ({matchList, matchType, setMatchList, setMatchType, user_id,}) => {
  const address = useRef("");
  const distance = useRef(0.0);

  useEffect(() => {
    axios
      .get("http://localhost:8080/matchingList/getUserAdr", {
        params: {
          user_id: user_id,
        },
      })
      .then((response) => {
        address.current = response.data;
        getMatchList();
        // returnDistance("서울 강남구 도곡로 159", "서울 강남구 도곡로 249");
        // testGeopoint();
      })
      .catch((error) => {
        console.log("error get address => ", error);
      });
    if (distance !== 0) {
      console.log(distance.current);
    }
  }, [matchType]);


  function getMatchList() {
    const formData = new FormData();
    if (matchType === "normal") {
      // 일반 매칭 검색
      console.log("before call List address : " + address.current);
      formData.append("searchAdr", address.current);
      axios
        .get("http://localhost:8080/matchingList", {
          params: {
            searchAdr: address.current,
          },
        })
        .then((response) => {
          setMatchList(response.data);
          console.log(matchList);
          testGeopoint();
        })
        .catch((error) => {
          console.error("Error getList normal => ", error);
        });
    } else if (matchType === "rematch") {
      // 다시 검색
      console.log(matchType);
    } else if (matchType === "nbti") {
      // 선택한 nbti로 검색
      console.log(matchType);
    } else if (matchType === "fame") {
      // 유명한순
      formData.append("searchAdr", address.current);
      axios
        .get("http://localhost:8080/matchingList/fame", {
          params: {
            searchAdr: address.current,
          },
        })
        .then((response) => {
          setMatchList(response.data);
          console.log(matchList);
        })
        .catch((error) => {
          console.error("Error getList fame => ", error);
        });
    }
  }

  function testGeopoint() {
    console.log("axios 호출전");
    const formdata = new FormData();
    // let inaddress = JSON.parse("서울시 강남구 도곡로 143")
    let inaddress = "서울시 강남구 도곡로 143";

    formdata.append("saddress", inaddress);
    axios
      .post("http://localhost:8080/matching/geopoint", formdata)
      .then((response) => {
        console.log("받은 좌표값: " + response.data);
      })
      .catch((error) => {
        console.log("error get geopoint => ", error);
      });
  }

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
          />
        ))}
      </div>
    </div>
  );
};

export default MatchingList;
