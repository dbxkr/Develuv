import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";

const Mypage = () => {
  const params = useParams();
  const { user } = useAuth();
  const [blur, setBlur] = useState(0); // 초기 값 설정
  const navigate = useNavigate();

  const startChat = () => {
    axios
      .get(`http://localhost:8080/chatlists/start?myId=${user.id}&oppoId=${params.user_id}`)
      .then((res) => {
        console.log(res);
        navigate("/chat");
      })
      .catch((error) => {
        console.error("Error starting chat:", error);
      });
  };

  const handleBlur = (e) => {
    setBlur(e.target.value); // 입력 값에 따라 blur 값을 업데이트
  };

  const goToEditProfile = () => {
    navigate("/edit-profile");
  };

  const fileId = "1AlgaE2QFjz6jKQzslYbmSuucYgdNmRnx";
  const imgUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=s4000`;

  return (
    <div style={{ paddingTop: "50px" }}> {/* 헤더 아래 여백을 주는 스타일 설정 */}
      <img
        src={imgUrl}
        alt=""
        style={{
          filter: `blur(${blur}px)`,
          marginTop: "20px",
          width: "300px", // 이미지의 너비를 300px로 설정
          height: "auto" // 높이는 자동으로 조정되도록 설정
        }}
      />
      <input type="number" onChange={handleBlur} />
      <button onClick={startChat}>채팅 시작하기</button>
      <p>여기는 {params.user_id} 마이페이지</p>
      <button onClick={goToEditProfile}>회원정보 수정</button>
    </div>
  );
};

export default Mypage;
