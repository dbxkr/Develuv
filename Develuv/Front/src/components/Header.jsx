import React, { useState, useEffect, useRef } from "react";
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
    zIndex: "1001",
  },
};

// 모달의 root element를 설정합니다. (App의 root element를 사용하는 것이 일반적입니다.)
Modal.setAppElement("#root");

function Header() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴가 열려 있는지 여부를 나타내는 상태
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const needLogin = ["/chat", "/main", "/mypage"];
  const menuRef = useRef(null); // 메뉴 슬라이드 영역을 참조하기 위한 ref

  useEffect(() => {
    if (needLogin.some((path) => location.pathname.includes(path))) {
      if (!isLoggedIn) {
        alert("로그인 해");
        navigate("/");
      }
    }
  }, [location, isLoggedIn, navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          <div
            className="menu_bar"
            onClick={toggleMenu}
            style={{ cursor: "pointer" }}
          >
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

        {isLoggedIn && (
          <>
            <div
              className="right-container"
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "50px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Link
                  to={`/mypage/${user.user_id}`}
                  style={{ color: "white", marginRight: "20px" }}
                >
                  {user.user_name}님 환영합니다
                </Link>
              </div>
            </div>
          </>
        )}

        <div
          ref={menuRef}
          className="menu-slide"
          style={{
            position: "fixed",
            top: "110px", // 헤더 아래에 위치하도록 수정
            left: isMenuOpen ? "0" : "-250px",
            width: "250px",
            height: "calc(100vh - 110px)", // 전체 화면 높이에서 헤더 높이만큼 뺀 크기로 설정
            background: "#001d3d",
            color: "white",
            transition: "left 0.3s ease",
            opacity: 0.8,
          }}
        >
          <ul
            style={{
              listStyle: "none",
              padding: "20px 0",
              margin: "0",
              textAlign: "center",
            }}
          >
            {user && user.user_id && (
              <li style={{ display: "flex", justifyContent: "center" }}>
                <Link
                  to={`/mypage/${user.user_id}`}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    marginBottom: "20px",
                    display: "block",
                  }}
                >
                  마이페이지
                </Link>
              </li>
            )}
            {user && user.user_id && (
              <li style={{ display: "flex", justifyContent: "center" }}>
                <Link
                  to="/main"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    marginBottom: "20px",
                    display: "block",
                  }}
                >
                  매칭
                </Link>
              </li>
            )}
            {user && user.user_id && (
              <li style={{ display: "flex", justifyContent: "center" }}>
                <Link
                  to="/chat"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    marginBottom: "20px",
                    display: "block",
                  }}
                >
                  채팅
                </Link>
              </li>
            )}
            {user && user.user_id && (
              <li style={{ display: "flex", justifyContent: "center" }}>
                <Link
                  to="/free"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    marginBottom: "20px",
                    display: "block",
                  }}
                >
                  무료 토큰
                </Link>
              </li>
            )}
            <li style={{ display: "flex", justifyContent: "center" }}>
              <Link
                to="/"
                style={{
                  color: "white",
                  textDecoration: "none",
                  marginBottom: "20px",
                  display: "block",
                }}
              >
                홈
              </Link>
            </li>
          </ul>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px 0",
            }}
          >
            {user && user.user_id ? (
              <button
                className="loginBtn"
                onClick={handleLogout}
                style={{
                  backgroundColor: "white",
                  position: "absolute",
                  color: "#00356d",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "5px",
                  width: "80%",
                  bottom: "100px", // 위치를 더 올리기 위해 조정
                }}
              >
                로그아웃
              </button>
            ) : (
              <button
                className="loginBtn"
                onClick={openModal}
                style={{
                  backgroundColor: "white",
                  position: "absolute",
                  marginTop: "auto",
                  color: "#00356d",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "5px",
                  width: "80%",
                  bottom: "100px", // 위치를 더 올리기 위해 조정
                }}
              >
                로그인
              </button>
            )}
          </div>
        </div>
      </header>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Login Modal"
      >
        <Login closeModal={closeModal} />
        <button
          onClick={closeModal}
          style={{
            backgroundColor: "#00356d",
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          닫기
        </button>
      </Modal>
    </div>
  );
}

export default Header;
