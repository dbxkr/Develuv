import {useParams} from "react-router-dom";

const Mypage = () => {
  const params = useParams();
  return(
    <div>여기는 {params.id} 마이페이지</div>
  )
}

export default Mypage
