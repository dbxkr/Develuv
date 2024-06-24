import MatchingList from './MatchingList.jsx'
import HeadBar from '../Navigate/HeadBar.jsx'
import { useEffect, useRef, useState } from 'react'
import Left from './Left.jsx'
import axios from 'axios'

const Matching = () => {
  const user_id = 'user01'
  const [matchList, setMatchList] = useState([])
  const [matchType, setMatchType] = useState('normal')
  const [excludedUserIds, setExcludedUserIds] = useState([])

  return (
    <div className={'Matching'}>
      <HeadBar user_id={user_id} />
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
  )
}

export default Matching
