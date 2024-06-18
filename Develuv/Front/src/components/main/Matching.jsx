import MatchingList from "./MatchingList.jsx";
import "./Matching.css"
import {useState} from "react";

const Matching = () => {
  const [matchType, setMatchType] = useState("");
  const [matchList, setMatchList] = useState([]);

  return(
    <div className={"Matching"}>
      {/*  나머지 컴포넌트*/}
      <MatchingList matchType={matchType} setMatchType={setMatchType}
      matchList={matchList} setMatchList={setMatchList}/>
      <Left />
      <MatchingList
        matchType={matchType}
        setMatchType={setMatchType}
        matchList={matchList}
        setMatchList={setMatchList}
      />
    </div>
  )
}
export default Matching

