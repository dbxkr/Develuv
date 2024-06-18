import MatchingList from "./MatchingList.jsx";
import "./Matching.css"
import {useState} from "react";
import HeadBar from "../Navigate/HeadBar.jsx";

const Matching = () => {
  const [matchType, setMatchType] = useState("normal");
  const [matchList, setMatchList] = useState([]);

  const user_id="user01";

  return(
    <div className={"Matching"}>
      {/*  나머지 컴포넌트*/}
      <HeadBar user_id={user_id}/>
      <MatchingList matchType={matchType} setMatchType={setMatchType}
      matchList={matchList} setMatchList={setMatchList} user_id={user_id}/>
    </div>
  )
}
export default Matching

