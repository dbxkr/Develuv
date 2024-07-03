import MatchingList from './MatchingList.jsx'
import { useEffect, useRef, useState } from 'react'
import Left from './Left.jsx'

const Matching = () => {
  const useris = localStorage.getItem('user')
  let user_id
  if (useris) {
    const userObject = JSON.parse(useris)
    user_id = userObject.id
  }

  const [matchList, setMatchList] = useState([])
  const [matchType, setMatchType] = useState('normal')
  const [excludedUserIds, setExcludedUserIds] = useState([])
  const [userNbti, setUserNbti] = useState('') // nbti 변수 추가

  return (
    <div className={'Matching'}>
      <Left
        userId={user_id}
        setMatchType={setMatchType}
        setMatchList={setMatchList} // 추가
        setExcludedUserIds={setExcludedUserIds} // 추가
        setUserNbti={setUserNbti} // nbti props 넣어주기
      />
      <MatchingList
        matchType={matchType}
        setMatchType={setMatchType}
        matchList={matchList}
        setMatchList={setMatchList}
        user_id={user_id}
        user_nbti={userNbti} // nbti props 넣어주기
        setExcludedUserIds={setExcludedUserIds} // 추가된 부분
      />
    </div>
  )
}

export default Matching
