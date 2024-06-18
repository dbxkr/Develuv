import MatchingList from './MatchingList.jsx'
import { useEffect, useState } from 'react'
import Left from './Left.jsx'

const Matching = () => {
  const [matchType, setMatchType] = useState('normal')
  const [matchList, setMatchList] = useState([])
  return (
    <div className={'Matching'}>
      {/*  나머지 컴포넌트*/}
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
