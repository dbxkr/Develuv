import { useEffect, useState } from "react";
import Modal from "react-modal";
import Login from "./login";
import LoginBackground from "./LoginBackground";
import "./lb.css";
// import Login from "../../login";

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

function LoginPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // cleanup 함수를 반환하여 이벤트 리스너를 제거합니다.
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div>
      <button className="loginBtn" onClick={openModal}>
        로그인
      </button>
      <LoginBackground
        key={windowSize.width + windowSize.height}
        windowSize={windowSize}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Login Modal"
      >
        <Login />
        <div className="closeBtn">
          <button onClick={closeModal}>닫기</button>
        </div>
      </Modal>
    </div>
  );
}

export default LoginPage;
