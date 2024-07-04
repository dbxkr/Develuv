import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import google from "../.././img/google.png";
import kakao from "../.././img/kakao.png";
import axios from "axios";
import "./login.css";
import FindIdModal from "./FindIdModal";
import FindPwModal from "./FindPwModal";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { useAuth } from "../../AuthProvider";
import { useRef } from "react";

function Login({ closeModal }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPwModalOpen, setIsPwModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [foundId, setFoundId] = useState(""); // 아이디 찾기 결과를 저장하는 상태
  const [foundPw, setFoundPw] = useState(""); // 비밀번호 찾기 결과를 저장하는 상태
  const url = "http://localhost:8080/user/";
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("id:", id);
    console.log("pw:", password);
    axios
      .get(url + `/login?user_id=${id}&user_pw=${password}`)
      .then((res) => {
        console.log(res);
        if (res.data.user_info == null) {
          alert("아이디 혹은 비밀번호를 확인해주세요.");
        } else {
          console.log(res);
          login(res.data.user_info.user_id, res.data.user_info.user_name);
          closeModal();
          navigate("/"); // 로그인 성공 시 MainChat 컴포넌트로 이동
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

  const findId = async () => {
    try {
      const response = await axios.get(url + "findId?user_email=" + email);
      console.log(response.data);
      if (
        response.data &&
        typeof response.data === "object" &&
        response.data !== null
      ) {
        setFoundId(Object.values(response.data).join(", ")); // foundId 상태에 설정
      } else {
        setFoundId(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const findPw = async () => {
    const id = document.getElementById("pw-id").value; // 비밀번호 찾기 모달의 ID 필드
    const email = document.getElementById("pw-email").value; // 비밀번호 찾기 모달의 Email 필드
    try {
      const response = await axios.get(
        url + "findPw?user_id=" + id + "&user_email=" + email
      );
      console.log(response.data);
      if (response.data && response.data.비번) {
        setFoundPw(response.data.비번); // foundPw 상태에 설정
      } else {
        setFoundPw("비밀번호를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error(error);
      setFoundPw("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const { naver } = window;

  useEffect(() => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
      callbackUrl: "http://localhost:3500/callback/naver",
      isPopup: false,
      loginButton: {
        color: "green",
        type: 1,
        height: 40,
      },
    });
    naverLogin.init();
    // getNaverUser();
  }, []);

  //회원일때 어디페이지로 가는지 확인하기
  const handleGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = encodeURI("http://localhost:3500/callback/google"); // Must match the configured redirect URI
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=email profile`;
    window.location.href = googleAuthUrl;
  };

  const handleKakaoLogin = () => {
    // 클라이언트 ID와 리다이렉트 URI를 사용하여 카카오 OAuth 2.0 인증 요청 URL을 생성합니다.
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID; // 여기에 자신의 카카오 클라이언트 ID를 넣어주세요.
    const redirectUri = encodeURI("http://localhost:3500/callback/kakao"); // 설정한 리다이렉트 URI와 일치해야 합니다.
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenPwModal = () => {
    setIsPwModalOpen(true);
  };

  const handleClosePwModal = () => {
    setIsPwModalOpen(false);
  };

  // 아이디, 비밀번호, 로그인까지 tab 누르면 이동하도록 함.
  const inputRefs = useRef([]);

  useEffect(() => {
    // 인풋 요소들 배열 초기화
    inputRefs.current = inputRefs.current.slice(0, 3);
    inputRefs.current[0].focus();
  }, []);

  const handleKeyDown = (event, index) => {
    if (event.key === "Tab" && !event.shiftKey) {
      event.preventDefault();
      const nextIndex = (index + 1) % inputRefs.current.length;
      inputRefs.current[nextIndex].focus();
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <p>Please enter your ID and Password.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            ref={(el) => (inputRefs.current[0] = el)}
            onKeyDown={(e) => handleKeyDown(e, 0)}
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            placeholder="ID"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            ref={(el) => (inputRefs.current[1] = el)}
            onKeyDown={(e) => handleKeyDown(e, 1)}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>
        <div>
          <button
            type="submit"
            ref={(el) => (inputRefs.current[2] = el)}
            onKeyDown={(e) => handleKeyDown(e, 2)}
            className="login-button"
          >
            Login
          </button>
        </div>
      </form>
      <div className="link-container">
        <a href="#" className="link" onClick={handleOpenModal}>
          아이디 찾기
        </a>{" "}
        |
        <a href="#" className="link" onClick={handleOpenPwModal}>
          비밀번호 찾기
        </a>{" "}
        |
        <Link to={"/register"} onClick={closeModal} className="link">
          {" "}
          {/* Use Link to navigate to Quiz.jsx */}
          회원가입
        </Link>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <FindIdModal
          findId={findId}
          foundId={foundId}
          setEmail={setEmail}
          handleCloseModal={handleCloseModal}
        />
      </Modal>

      <Modal
        isOpen={isPwModalOpen}
        onRequestClose={handleClosePwModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <FindPwModal
          findPw={findPw}
          foundPw={foundPw}
          handleClosePwModal={handleClosePwModal}
        />
      </Modal>

      <div className="divider">
        <span>or continue with</span>
      </div>
      <br></br>
      <div className="image-container">
        <img
          className="google"
          src={google}
          alt="Google"
          onClick={handleGoogleLogin}
        />
        <div id="naverIdLogin" />
        <img
          className="kakao"
          src={kakao}
          alt="Kakao"
          onClick={handleKakaoLogin}
        />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p>
        By logging in,<br></br>you agree to our Terms of Service and Privacy
        Policy
      </p>
    </div>
  );
}

export default Login;
