import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import axios from "axios";

const Mypage = () => {
  const params = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const starChat = () => {
    axios
      .get(
        "http://localhost:8080/chatlists/start?myId=" +
          user.id +
          "&oppoId=" +
          params.user_id
      )
      .then((res) => {
        console.log(res);
        navigate("/chat");
      });
  };
  return (
    <div>
      <button onClick={starChat}>채팅 시작하기</button>
      여기는 {params.user_id} 마이페이지
    </div>
  );
};

export default Mypage;
