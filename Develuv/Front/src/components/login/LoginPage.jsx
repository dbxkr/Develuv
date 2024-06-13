import { useEffect, useState } from "react";
import Modal from "react-modal";
import Login from "./login";
import LoginBackground from "./LoginBackground";
import axios from "axios";
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

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const { naver } = window;

  const naverLogin = new naver.LoginWithNaverId({
    clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
    callbackUrl: "http://localhost:3500/callback/naver",
    isPopup: true,
    loginButton: {
      color: "green",
      type: 1,
      height: 40,
    },
  });

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
    //마운트 시 사이즈 받아오기
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    //미은트 시 네이버 유저인지 체크
    getNaverUser();
    //마운트 시 카카오 유저인지 체크
    const token = localStorage.getItem("kakao.access_token");
    console.log("카카오 토큰 :" + token);
    if (token) {
      const token = localStorage.getItem("kakao.access_token");
      getKakaoUserData(token)
        .then((data) => {
          console.log(data);
          setUser(data.properties);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("kakao.access_token");
        });
    }

    // cleanup 함수를 반환하여 이벤트 리스너를 제거합니다.
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {}, [user]);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }
  const logout = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.includes("access_token")) {
        localStorage.removeItem(key);
      }
    }
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div>
      <div>
        {user ? (
          <div>
            {user.name}
            <button className="loginBtn" onClick={logout}>
              로그아웃
            </button>
          </div>
        ) : (
          <button className="loginBtn" onClick={openModal}>
            로그인
          </button>
        )}
      </div>
      <div></div>
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
        <Login setUser={setUser} user={user} getNaverUser={getNaverUser} />
        <button onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
}

export default LoginPage;
