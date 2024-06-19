import MatchingList from "./MatchingList.jsx";
import HeadBar from "../Navigate/HeadBar.jsx";
import { useEffect, useRef, useState } from "react";
import Left from "./Left.jsx";
import axios from "axios";
import { useAuth } from "../../AuthProvider.jsx";

const Matching = () => {
  const [matchList, setMatchList] = useState([]);
  const [matchType, setMatchType] = useState("normal");
  const { user } = useAuth();
  const user_id = "user01";

  return (
    <div className={"Matching"}>
      {/*  나머지 컴포넌트*/}
      <HeadBar user_id={user.id} />
      <Left />
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
