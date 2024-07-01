import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useAuth } from "../../AuthProvider";
import { Link } from "react-router-dom";

function DetailedInfo({ oppoId }) {
  const [userInfo, setUserInfo] = useState();
  const springUrl = "http://localhost:8080";
  const blurLevel = [50, 70, 90, 140, 4000];
  const [blur, setBlur] = useState(0);
  const { user } = useAuth();

  const fetchUserInfo = async () => {
    try {
      const response = await axios.post(
        `${springUrl}/user/otherInfo?user_id=${oppoId}&my_id=${user.user_id}`
      );
      console.log("oppoId", oppoId);
      console.log("response", response);
      setUserInfo(response.data);
      setBlur(response.data.blur); // 다른 사용자의 마이페이지일 때 블러 적용
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const spendToken = () => {
    if (user.token <= 0) {
      alert("보유중인 토큰이 부족합니다");
      return;
    }
    if (blur < 4) {
      if (
        window.confirm(
          `현재 보유중인 토큰은 ${user.token}개 입니다. 1000개를 소모해서 블러 단계를 높이겠습니까?`
        )
      ) {
        axios
          .post(`${springUrl}/chat/unblur`, {
            myId: user.user_id,
            oppoId: oppoId,
          })
          .then(() => {
            setBlur(blur + 1);
            user.token = user.token - 1000;
          })
          .catch();
      }
    } else {
      alert("이미 최고 단계입니다");
    }
  };

  const degrade = () => {
    if (blur > 0) {
      if (
        window.confirm(
          "테스트용도의 기능이며 이걸 내린다고 딱히 코인을 돌려주진 않을겁니다. 그래도 하시겠습니까?"
        )
      ) {
        axios
          .post(`${springUrl}/chat/blur`, {
            myId: user.user_id,
            oppoId: oppoId,
          })
          .then(() => {
            alert("아니 왜 그런 결정을...?");
            setBlur(blur - 1);
          })
          .catch();
      }
    } else {
      alert("더 안내려갑니다");
    }
  };

  if (userInfo == null) {
    return <div>loadgin...</div>;
  }

  return (
    <InfoContainer>
      <InfoBody>
        <ProfileContainer>
          <ImgContainer>
            <OppoImg
              src={userInfo.user_profile + blurLevel[blur] + "&blur=TN1q/^23"}
              style={{ filter: `blur(${(4 - blur) * 2}px)` }}
            />
          </ImgContainer>
          <Link to={"/mypage/" + userInfo.user_id}>
            <ProfileButton>마이 페이지로 이동</ProfileButton>
          </Link>
        </ProfileContainer>
        <BlurLevel>
          <div>
            {Array.from({ length: blur }, (_, i) => (
              <span key={i}>❤️</span>
            ))}
            {Array.from({ length: 4 - blur }, (_, i) => (
              <span key={i}>🤍</span>
            ))}
          </div>
          <div>
            <ProfileButton onClick={spendToken}>
              블러 단계 높이기+
            </ProfileButton>
            <ProfileButton onClick={degrade}>블러 단계 낮추기-</ProfileButton>
          </div>
        </BlurLevel>
      </InfoBody>
    </InfoContainer>
  );
}

export default DetailedInfo;

const InfoContainer = styled.div`
  margin-top: 2px;
  width: 650px;
  max-height: 900px;
  min-height: 81vh;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin-left: 30px;
`;

const InfoBody = styled.div`
  flex: 1;
  border: 1px solid #ffffff;
  background: #ffffff;
  position: relative;
  overflow-y: auto;
  max-height: 100%;
  border-radius: 5px;
  display: flex;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  align-items: center;
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  width: 310px;
  height: 420px;
  margin-left: 50px;
  margin-right: 50px;
  border-radius: 15px;
`;

const OppoImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 15px;
`;

const BlurLevel = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 5px;
  align-items: center;
`;
const ProfileButton = styled.button`
  width: auto;
`;
