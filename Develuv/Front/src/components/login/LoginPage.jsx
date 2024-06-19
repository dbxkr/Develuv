import { useEffect, useState } from "react";

import LoginBackground from "./LoginBackground";
import axios from "axios";

function LoginPage() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    // 마운트 시 사이즈 받아오기
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
  return (
    <div>
      <div style={{ marginTop: "90px" }}>
        <LoginBackground
          key={windowSize.width + windowSize.height}
          windowSize={windowSize}
        />
      </div>
    </div>
  );
}

export default LoginPage;
