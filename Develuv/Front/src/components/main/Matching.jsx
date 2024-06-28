import MatchingList from "./MatchingList.jsx";
import { useEffect, useRef, useState } from "react";
import Left from "./Left.jsx";

const Matching = () => {
  const useris = localStorage.getItem("user");
  let user_id;
  if(useris) {
    const userObject = JSON.parse(useris);
    user_id = userObject.id;
  }

  const [matchList, setMatchList] = useState([]);
  const [matchType, setMatchType] = useState("normal");
  const [excludedUserIds, setExcludedUserIds] = useState([]);

  return (
    <div className={"Matching"}>
      <Left
        userId={user_id}
        setMatchType={setMatchType}
        setMatchList={setMatchList} // 추가
        setExcludedUserIds={setExcludedUserIds} // 추가
      />
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
