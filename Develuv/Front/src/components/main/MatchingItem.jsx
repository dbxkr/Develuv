import reactimg from '../../assets/react.svg'
import { Link } from 'react-router-dom'

const MatchingItem = ({
  user_id,
  user_name,
  user_gender,
  user_nbti,
  user_adress,
  user_profile,
}) => {
  return (
    <div className={'MatchingItem'}>
      <div className={'matching_item_profile'}>
        <Link to={`/mypage/${user_id}`}>
          <img
            src={reactimg}
            style={{ width: '180px', height: '180px' }}
            alt="User Profile"
          />
        </Link>
      </div>
      <div className={'matching_item_name'}>
        {user_name}, 나이, {user_gender}
      </div>
      <div className={'matching_item_nbti'}>NBTI: {user_nbti}</div>
      <div className={'matching_item_adr'}>{user_adress}</div>
    </div>
  )
}

export default MatchingItem
