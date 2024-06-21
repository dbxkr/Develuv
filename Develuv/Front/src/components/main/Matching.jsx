import MatchingList from "./MatchingList.jsx";
import HeadBar from "../Navigate/HeadBar.jsx";
import { useEffect, useRef, useState } from "react";
import Left from "./Left.jsx";

const Matching = () => {
  const user_id = "user01";
  const [matchList, setMatchList] = useState([]);
  const [matchType, setMatchType] = useState("normal");

  return (
    <div className={"Matching"}>
      {/*  나머지 컴포넌트*/}
      <HeadBar user_id={user_id} />
      <Left matchType={matchType} setMatchType={setMatchType} />
      <MatchingList
        matchType={matchType}
        setMatchType={setMatchType}
        matchList={matchList}
        setMatchList={setMatchList}
        user_id={user_id}
      />
    </div>
  );
};
export default Matching;
