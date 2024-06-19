import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import Login from "./login/login";
import { useAuth } from "../AuthProvider";
import menuImg from "../assets/menubar_white.svg"; // SVG 파일을 임포트
import chatBtn from "../assets/messenger_white.svg"; // SVG 파일을 임포트

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
  const needLogin = ["/chat", "/main", "/mypage"];
  useEffect(() => {
    if (needLogin.includes(location.pathname)) {
      if (!isLoggedIn) {
        alert("로그인 해");
        navigate("/");
      }
    }
  }, [location, isLoggedIn]);

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
          padding: "20px",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          height: "70px",
        }}
      >
        <div
          className="left-container"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="menu_bar">
            <img src={menuImg} alt="Menu" />
          </div>
          <Link
            to="/"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginLeft: "20px",
              color: "white",
            }}
          >
            DeveLuv
          </Link>
        </div>

        {user && (
          <>
            <div
              className="center-container"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Link to="/chat" style={{ marginRight: "30px", color: "white" }}>
                채팅(테스트)
              </Link>
              <Link to="/main" style={{ color: "white" }}>
                매칭(테스트)
              </Link>
            </div>

            <div
              className="right-container"
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "50px",
              }}
            >
              <div className="chat_btn" style={{ marginRight: "50px" }}>
                <Link to="/chat">
                  {" "}
                  {/* Link 컴포넌트로 chatBtn을 클릭하면 /chat으로 이동하도록 설정 */}
                  <img src={chatBtn} alt="Chat" />
                </Link>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                {user.name ? user.name : null}
                <button
                  className="loginBtn"
                  onClick={handleLogout}
                  style={{
                    marginLeft: "20px",
                    backgroundColor: "white",
                    color: "#00356d",
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "5px",
                    whiteSpace: "nowrap",
                  }}
                >
                  로그아웃
                </button>
              </div>
            </div>
          </>
        )}

        {!user && location.pathname === "/" && (
          <button
            className="loginBtn"
            onClick={openModal}
            style={{
              backgroundColor: "white",
              color: "#00356d",
              padding: "5px 10px",
              border: "none",
              borderRadius: "5px",
              marginRight: "50px",
            }}
          >
            로그인
          </button>
        )}
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
