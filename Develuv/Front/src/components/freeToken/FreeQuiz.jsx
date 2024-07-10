import "./FreeQuiz.css";
import { useAuth } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";

const FreeQuiz = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  function goAdminQuiz() {
    navigate("/free/quiz");
  }

  return (
    <div className="free-token-container">
      <div className="free-token-header">FREE TOKEN</div>
      <h2>문제를 풀고 무료 토큰을 받아보세요</h2>
      <div className="free-token-body">
        <h2>Quiz</h2>
        <hr />
        <div className="free-token-content">
          문제는 총 2개입니다 🤍
          <br />
          문제 하나를 맞힐 때마다 1,000 토큰을 드려요 !
          <br />
          (1일 최대 2,000 토큰 획득 가능)
          <br />
          <button onClick={goAdminQuiz}>도전</button>
        </div>
      </div>
    </div>
  );
};

export default FreeQuiz;
