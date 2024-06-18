import MatchingItem from "./MatchingItem.jsx";
import {useEffect, useRef, useState} from "react";
import "./MatchingItem.css"
import axios from "axios";



const MatchingList = ({matchList, matchType, setMatchList, setMatchType, user_id}) => {

  const address = useRef("");

  useEffect(() => {
    axios.get('http://localhost:8080/matchingList/getUserAdr',{
      params:{
        user_id:user_id
      }}).then(
      response => {
        address.current=response.data;
        console.log(address.current);
      }).catch(error => {
      console.log("error get address => ", error);
    });

    const formData = new FormData();
    if (matchType === 'normal') { // 일반 매칭 검색
      formData.append("searchAdr", address.current);
      axios.get('http://localhost:8080/matchingList', {
        params: {
          searchAdr: address.current
        }
      })
        .then(response => {
          setMatchList(response.data);
          console.log(matchList);
        })
        .catch(error => {
          console.error('Error getList normal => ', error);
        });
    } else if(matchType === 'rematch') { // 다시 검색
      console.log(matchType);
    } else if(matchType === 'nbti') { // 선택한 nbti로 검색
      console.log(matchType);
    } else if(matchType === 'fame'){ // 유명한순
      formData.append("searchAdr", address.current);
      axios.get('http://localhost:8080/matchingList/fame', {
        params: {
          searchAdr: address.current
        }
      })
        .then(response => {
          setMatchList(response.data);
          console.log(matchList);
        })
        .catch(error => {
          console.error('Error getList fame => ', error);
        });
    }
  }, [matchType]);

  return (
    <div className={"MatchingList"}>
      <div className={"MatchingItems"}>
        {matchList.map((item) =>
          <MatchingItem key={item.user_id} user_id={item.user_id} user_name={item.user_name}
                        user_gender={item.user_gender}
                        user_adress={item.user_address} user_nbti={item.user_nbti} user_profile={item.user_profile}/>)}
      </div>
    </div>
  )
}

export default MatchingList