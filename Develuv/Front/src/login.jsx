import React, { useState } from "react";
import Modal from "react-modal";
import google from "./img/google.png";
import kakao from "./img/kakao.png";
import naver from "./img/naver.png";
import "./login.css";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기에 로그인 로직을 추가합니다
    console.log("ID:", id);
    console.log("Password:", password);
  };

  const handleNaverLogin = async () => {
    const clientId = import.meta.env.VITE_NAVER_CLIENT_ID; // 네이버에서 발급받은 클라이언트 ID
    const redirectUri = encodeURI("http://localhost:3500/callback/naver"); // 콜백 URL
    const state = Math.random().toString(36).substr(2, 11); // 상태 코드 (CSRF 방지를 위해 사용)
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;

    window.location.href = naverAuthUrl;
  };
  //회원일때 어디페이지로 가는지 확인하기
  const handleGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = encodeURI("http://localhost:3500/callback/google"); // Must match the configured redirect URI
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=email profile`;
  };

  const handleKakaoLogin = () => {
    // 클라이언트 ID와 리다이렉트 URI를 사용하여 카카오 OAuth 2.0 인증 요청 URL을 생성합니다.
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID; // 여기에 자신의 카카오 클라이언트 ID를 넣어주세요.
    const redirectUri = encodeURI("hhttp://localhost:3500/callback/kakao"); // 설정한 리다이렉트 URI와 일치해야 합니다.
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <p>Please enter your ID and Password.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            placeholder="ID"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>
        <div>
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
      </form>
      <div className="link-container">
        <a href="#" className="link" onClick={handleOpenModal}>
          아이디 찾기
        </a>{" "}
        |
        <a href="#" className="link">
          비밀번호 찾기
        </a>{" "}
        |
        <a href="#" className="link">
          회원가입
        </a>
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <div>
          <h3>아이디 찾기</h3>
          <button onClick={handleCloseModal}>Closeqwe</button>
        </div>
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
        <img
          className="naver"
          src={naver}
          alt="Naver"
          onClick={handleNaverLogin}
        />
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
        By loggin in,<br></br>you agree to our Terms of Service and Privacy
        Policy
      </p>
    </div>
  );
}

export default Login;
