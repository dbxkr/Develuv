import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Login from "./login/login";
import { useAuth } from "../AuthProvider";
import menuImg from "../assets/menubar_white.svg"; // SVG 파일을 임포트

const customStyles = {
  content: {
    top: 'calc(500px)', // 헤더 바로 아래에서 보이도록 설정
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

Modal.setAppElement("#root");

function Header() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const needLogin = ["/chat", "/main", "/mypage"];
  const menuRef = useRef(null);

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
        )}
      </header>

      <div
        ref={menuRef}
        className={`menu-slide ${isMenuOpen ? "open" : ""}`}
        style={{
          position: "fixed",
          top: "110px", // 헤더 바로 아래에 위치
          left: isMenuOpen ? "0" : "-250px",
          width: "250px",
          height: "calc(100vh - 70px)",
          background: "#001d3d",
          color: "white",
          transition: "left 0.3s ease",
          zIndex: 1001,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          opacity: 0.8,
        }}
      >
        <ul
          style={{
            listStyle: "none",
            padding: "20px 0",
            margin: "0",
            textAlign: "center",
            flex: "1",
          }}
        >
          {user && user.user_id && (
            <>
              <li style={{ marginBottom: "20px" }}>
                <Link
                  to={`/mypage/${user.user_id}`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  마이페이지
                </Link>
              </li>
              <li style={{ marginBottom: "20px" }}>
                <Link
                  to="/main"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  매칭
                </Link>
              </li>
              <li style={{ marginBottom: "20px" }}>
                <Link
                  to="/chat"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  채팅
                </Link>
              </li>
            </>
          )}
          <li>
            <Link
              to="/"
              style={{ color: "white", textDecoration: "none" }}
            >
              홈
            </Link>
          </li>
        </ul>

        <div
          style={{
            padding: "60px",
            background: "#001d3d",
            textAlign: "center",
          }}
        >
          {user && user.user_id ? (
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "white",
                color: "#00356d",
                padding: "5px 10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              로그아웃
            </button>
          ) : (
            <button
              onClick={openModal}
              style={{
                backgroundColor: "white",
                color: "#00356d",
                padding: "5px 10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              로그인
            </button>
          )}
        </div>
      </div>

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
