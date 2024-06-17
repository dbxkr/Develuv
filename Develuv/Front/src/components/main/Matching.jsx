import MatchingList from "./MatchingList.jsx";

import Left from "./Left.jsx";

const Matching = () => {
  return(
    <div className={"Matching"}>
      {/*  나머지 컴포넌트*/}
      <Left />
      <MatchingList />
    </div>
  )
}
export default Matching

