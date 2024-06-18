// Header.jsx

import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import Login from "./login/login";
import { useAuth } from "../AuthProvider";
// 모달에 대한 스타일을 정의합니다.
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    overflow: "scroll",
  },
};

// 모달의 root element를 설정합니다. (App의 root element를 사용하는 것이 일반적입니다.)
Modal.setAppElement("#root");
function Header() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  // const { naver } = window;

  // const naverLogin = new naver.LoginWithNaverId({
  //   clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
  //   callbackUrl: "http://localhost:3500/callback/naver",
  //   isPopup: true,
  //   loginButton: {
  //     color: "green",
  //     type: 1,
  //     height: 40,
  //   },
  // });

  const getNaverUser = async () => {
    await naverLogin.getLoginStatus((status) => {
      console.log(`네이버 로그인?: ${status}`);
      if (status) {
        setUser({ ...naverLogin.user });
      }
    });
  };

  const getKakaoUserData = async (token) => {
    const user = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    console.log(user);
    return user.data;
  };

  useEffect(() => {
    // // 미운트 시 네이버 유저인지 체크
    // getNaverUser();
    // // 마운트 시 카카오 유저인지 체크
    // const token = localStorage.getItem("kakao.access_token");
    // console.log("카카오 토큰 :" + token);
    // if (token) {
    //   getKakaoUserData(token)
    //     .then((data) => {
    //       setUser(data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       localStorage.removeItem("kakao.access_token");
    //     });
    // }
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <header
        style={{
          background: "linear-gradient(90deg, #001d3d, #525dc3)",
          padding: "50px",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          height: "5px",
        }}
      >
        <Link to={"/"} style={{ fontSize: "24px", fontWeight: "bold" }}>
          DeveLuv
        </Link>
        <Link to={"/chat"}>채팅</Link>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "100px",
          }}
        >
          {user ? (
            <div>
              {user.name ? user.name : null}
              <button
                className="loginBtn"
                onClick={handleLogout}
                style={{
                  marginLeft: "10px",
                  backgroundColor: "white",
                  color: "#00356d",
                  padding: "7px 14px",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                로그아웃
              </button>
            </div>
          ) : location.pathname == "/" ? (
            <button
              className="loginBtn"
              onClick={openModal}
              style={{
                backgroundColor: "white",
                color: "#00356d",
                padding: "7px 14px",
                border: "none",
                borderRadius: "5px",
                marginRight: "20px",
              }}
            >
              로그인
            </button>
          ) : null}
        </div>
      </header>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Login Modal"
      >
        <Login closeModal={closeModal} />
        <button onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
}

export default Header;
