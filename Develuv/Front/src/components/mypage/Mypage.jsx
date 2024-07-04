import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import locationIcon from "../../assets/location.svg";
import jobIcon from "../../assets/job.svg";
import userIcon from "../../assets/user.svg";
import instagramIcon from "../../assets/instagram.svg";
import quizIcon from "../../assets/quiz.svg";
import githubIcon from "../../assets/github.svg";
import memoIcon from "../../assets/memo.svg";
import NbtiModal from "./NbtiModal"; // Import the modal component
import styled from "styled-components";
import MarkdownEditor from "../main/detail/MarkdownEditor";
import MarkDownViewer from "../main/detail/MarkdownViewer"; // Import the MarkDownViewer component
import "./Mypage.css";

const Mypage = () => {
  const params = useParams();
  const { user, login } = useAuth();
  const [blur, setBlur] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const [quiz, setQuiz] = useState("");
  const [code, setCode] = useState('print("hello world")'); // 코드 상태 추가
  const navigate = useNavigate();
  const isMyPage = user.user_id === params.user_id;
  const springUrl = "http://localhost:8080";
  const blurLevel = [50, 70, 90, 140, 4000];
  const newValue = useRef(null);
  const [focused, setFocused] = useState(null);
  const [flipped, setFlipped] = useState(false); // 추가된 상태

  // State for the modal visibility
  const [isNbtiModalVisible, setIsNbtiModalVisible] = useState(false);
  const [nbti, setNbti] = useState(user.user_nbti || ""); // Store selected NBTI

  const proLangs = [
    { lang: "Java", title: "Java" },
    { lang: "Python", title: "Python" },
    { lang: "C", title: "C언어" },
    { lang: "C++", title: "C++" },
    { lang: "C#", title: "C#" },
  ];
  const alchols = [
    { type: "never", title: "전혀" },
    { type: "somtimes", title: "가끔" },
    { type: "often", title: "자주" },
    { type: "etc", title: "기타" },
  ];
  const smokes = [
    { type: "nonSmoke", title: "비흡연" },
    { type: "smoke", title: "흡연" },
  ];
  const datingStyles = [
    { type: "activity", title: "액티비티" },
    { type: "display", title: "전시" },
    { type: "home", title: "집" },
    { type: "gourme", title: "맛집탐방" },
    { type: "coding", title: "코딩" },
    { type: "etc", title: "기타" },
  ];
  const jongs = [
    { type: "none", title: "무교" },
    { type: "christan", title: "기독교" },
    { type: "catholic", title: "가톨릭" },
    { type: "buddism", title: "불교" },
    { type: "etc", title: "기타" },
  ];
  const educations = [
    { type: "highschool", title: "고등학교" },
    { type: "bachelor", title: "대학교" },
    { type: "master", title: "대학원" },
    { type: "doctor", title: "박사" },
    { type: "etc", title: "기타" },
  ];
  const fetchUserInfo = async () => {
    try {
      if (isMyPage) {
        login(user.user_id, "");
        setBlur(4);
        setUserInfo({ ...user });
        setCode(user.user_code || ""); // user_code 값을 code 상태로 설정
        console.log("내 페이지 정보", user);
      } else {
        const response = await axios.post(
          `${springUrl}/user/otherInfo?user_id=${params.user_id}&my_id=${user.user_id}`
        );
        console.log("response", response);
        setUserInfo(response.data);
        setBlur(response.data.blur); // 다른 사용자의 마이페이지일 때 블러 적용
        setCode(response.data.user_code || ""); // user_code 값을 code 상태로 설정
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [params.user_id, isMyPage]); // 사용자 정보가 변경될 때마다 다시 로드

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age;
  };

  const startChat = () => {
    axios
      .get(
        `${springUrl}/chatlists/start?myId=${user.user_id}&oppoId=${params.user_id}`
      )
      .then((res) => {
        console.log(res);
        navigate("/chat");
      })
      .catch((error) => {
        console.error("Error starting chat:", error);
      });
  };

  const goToEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleInputChange = (e) => {
    newValue.current = e.target.value;
  };

  const updateProfile = (e) => {
    setFocused(null);
    axios
      .post(`${springUrl}/user/updateOneProfile`, {
        type: e,
        value: newValue.current,
        user_id: user.user_id,
      })
      .then(() => {
        fetchUserInfo(); // Refresh user info after update
        setIsNbtiModalVisible(false); // 모달 창 닫기
        // window.location.href = `/mypage/${user.user_id}`; // 성공 시 마이페이지로 이동
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("정보 업데이트 중 오류가 발생했습니다."); // 실패 메시지 표시
      });
  };

  const handleQuizChange = (e) => {
    setQuiz(e.target.value);
    // Save to backend
    axios
      .put(`${springUrl}/user/info/${user.user_id}`, { quiz: e.target.value })
      .catch((error) => {
        console.error("Error updating Quiz:", error);
      });
  };
  const handleNbtiChange = (newNbti) => {
    if (isMyPage) {
      axios
        .post(`${springUrl}/user/updateOneProfile`, {
          type: "nbti",
          value: newNbti,
          user_id: user.user_id,
        })
        .then(() => {
          setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            user_nbti: newNbti,
          }));
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          alert("정보 업데이트 중 오류가 발생했습니다."); // 실패 메시지 표시
        });
    }
  };

  const toggleNbtiModal = () => {
    setIsNbtiModalVisible(!isNbtiModalVisible);
  };

  const swapFlip = () => {
    setFlipped(!flipped);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    // 백엔드 API 호출하여 user_code 업데이트
    axios
      .put(
        `http://localhost:8080/api/edit-profile/update-code/${user.user_id}`,
        newCode
      )
      .then((response) => {
        console.log("User code updated successfully");
      })
      .catch((error) => {
        console.error("Error updating user code:", error);
      });
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const age = calculateAge(userInfo.user_birth);
  const tempB = 0;

  return (
    <div className="mypage-container">
      <div className="profile-section">
        <ProfileContainer>
          <FlipButton onClick={swapFlip}>🔄</FlipButton>
          <Card flipped={flipped}>
            <CardFront>
              <ProfilePicture>
                <img
                  src={userInfo.user_profile + 4000 + "&blur=AW2$zxORd"}
                  alt="Profile"
                  onContextMenu={(event) => {
                    event.preventDefault();
                  }}
                  style={{ filter: `blur(${(4 - blur - tempB) * 2}px)` }}
                />
              </ProfilePicture>
            </CardFront>
            <CardBack>
              {isMyPage ? (
                <>
                  <InfoText>
                    ##두개 앞에 언어를 쓰고 그 뒤에는 자신의 코드를 작성하세요
                    <br />
                    ex) java##public void main() &#123;
                    System.out.println("안녕하세요") &#125;
                  </InfoText>
                  <MarkdownEditor
                    lang={"python"}
                    text={code}
                    onChange={handleCodeChange}
                    style={{ height: "100%", width: "100%", overflow: "auto" }} // 위치 조정
                  />
                </>
              ) : (
                <MarkDownViewer
                  lang={code.split("##")[0]}
                  text={code.split("##")[1] || ""}
                  style={{ height: "100%", overflow: "auto" }}
                />
              )}
            </CardBack>
          </Card>
        </ProfileContainer>
        <div className="button-group">
          {isMyPage ? (
            <button id="edit-profile-btn" onClick={goToEditProfile}>
              회원정보 수정
            </button>
          ) : (
            <button id="start-chat-btn" onClick={startChat}>
              채팅 시작하기
            </button>
          )}
        </div>
      </div>
      <div className="info-section">
        <div className="info-group">
          <div className="info-row">
            <h2>
              <img src={userIcon} alt="User" className="icon" />
              {userInfo.user_name} ({age})
              <span
                className={`gender-icon ${
                  userInfo.user_gender === "Female" ||
                  userInfo.user_gender === "female"
                    ? "female"
                    : "male"
                }`}
              >
                {userInfo.user_gender === "Male" ||
                userInfo.user_gender === "male"
                  ? "♂️"
                  : "♀️"}
              </span>
            </h2>
          </div>
          <div className="info-row">
            <img src={locationIcon} alt="Location" className="icon" />
            <p>{isMyPage ? userInfo.user_address : userInfo.user_city}</p>
          </div>
          <div className="info-row">
            <img src={jobIcon} alt="Job" className="icon" />
            <p>{userInfo.user_job}</p>
          </div>
          <div className="info-row">
            <img src={memoIcon} alt="Memo" className="icon" />
            {isMyPage ? (
              <div className="profile-change">
                <input
                  type="text"
                  placeholder="메모 (30자까지 입력 가능합니다)"
                  defaultValue={user.user_memo}
                  maxLength={30} // 메모를 30자로 제한
                  onChange={handleInputChange}
                  onFocus={() => {
                    setFocused("memo");
                  }}
                  className={focused === "memo" ? null : "n-focus"}
                />
                <button
                  style={focused === "memo" ? null : { display: "none" }}
                  onClick={() => {
                    updateProfile("memo");
                  }}
                >
                  수정
                </button>
              </div>
            ) : (
              <span>{userInfo.user_memo}</span>
            )}
          </div>
        </div>
        <div className="info-group">
          <div className="info-row">
            <div className="tooltip-container">
              <div onClick={isMyPage ? toggleNbtiModal : null}>
                <span className={`info-tag ${isMyPage ? "clickable" : ""}`}>
                  {userInfo.user_nbti}
                </span>
              </div>
              <span className="tooltip-text">{isMyPage ? "NBTI" : `NBTI`}</span>
            </div>
            <div className="tooltip-container">
              {isMyPage ? (
                <select
                  className="info-tag"
                  onChange={(e) => {
                    newValue.current = e.target.value;
                    updateProfile("proLang");
                  }}
                  defaultValue={userInfo.user_pro_lang}
                >
                  {proLangs.map((lang, index) => (
                    <option key={index} value={lang.lang}>
                      {lang.title}
                    </option>
                  ))}
                </select>
              ) : (
                userInfo.user_pro_lang &&
                userInfo.user_pro_lang.split(",").map((lang, index) => (
                  <span className="info-tag" key={index}>
                    {lang}
                  </span>
                ))
              )}
              <span className="tooltip-text">선호하는 언어</span>
            </div>
          </div>
          <div className="extra-info">
            <div className="tooltip-container">
              {isMyPage ? (
                <select
                  className="info-tag"
                  onChange={(e) => {
                    newValue.current = e.target.value;
                    updateProfile("drink");
                  }}
                  defaultValue={userInfo.user_drink}
                >
                  {alchols.map((drink, index) => (
                    <option key={index} value={drink.type}>
                      {drink.title}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="info-tag">{userInfo.user_drink}</span>
              )}
              <span className="tooltip-text">음주 빈도</span>
            </div>
            <div className="tooltip-container">
              {isMyPage ? (
                <select
                  className="info-tag"
                  onChange={(e) => {
                    newValue.current = e.target.value;
                    updateProfile("smoke");
                  }}
                  defaultValue={userInfo.user_smoke}
                >
                  {smokes.map((smoke, index) => (
                    <option key={index} value={smoke.type}>
                      {smoke.title}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="info-tag">{userInfo.user_smoke}</span>
              )}
              <span className="tooltip-text">흡연 여부</span>
            </div>
            <div className="tooltip-container">
              {isMyPage ? (
                <select
                  className="info-tag"
                  onChange={(e) => {
                    newValue.current = e.target.value;
                    updateProfile("religion");
                  }}
                  defaultValue={userInfo.user_religion}
                >
                  {jongs.map((religion, index) => (
                    <option key={index} value={religion.type}>
                      {religion.title}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="info-tag">{userInfo.user_religion}</span>
              )}
              <span className="tooltip-text">종교</span>
            </div>
            <div className="tooltip-container">
              {isMyPage ? (
                <select
                  className="info-tag"
                  onChange={(e) => {
                    newValue.current = e.target.value;
                    updateProfile("edu");
                  }}
                  defaultValue={userInfo.user_edu}
                >
                  {educations.map((edu, index) => (
                    <option key={index} value={edu.type}>
                      {edu.title}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="info-tag">{userInfo.user_edu}</span>
              )}
              <span className="tooltip-text">학력</span>
            </div>
          </div>
        </div>

        <div className="social-section">
          <div className="social-row">
            <img src={githubIcon} alt="GitHub" className="icon" />
            {isMyPage ? (
              <div className="profile-change">
                <input
                  type="text"
                  placeholder="깃 주소"
                  defaultValue={user.user_git}
                  onChange={handleInputChange}
                  onFocus={() => {
                    setFocused("git");
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setFocused(null);
                    }, 100);
                  }}
                  className={focused === "git" ? null : "n-focus"}
                />
                <button
                  style={focused === "git" ? null : { display: "none" }}
                  onClick={() => {
                    updateProfile("git");
                  }}
                >
                  수정
                </button>
              </div>
            ) : (
              <span>{userInfo.user_git}</span>
            )}
          </div>
          <div className="social-row">
            <img src={quizIcon} alt="Quiz" className="icon" />
            <span
              onClick={() => navigate("/mypage/" + userInfo.user_id + "/quiz")}
            >
              My Quiz
            </span>
          </div>
        </div>
      </div>

      {/* Include the NBTI Modal */}
      <NbtiModal
        isVisible={isNbtiModalVisible}
        onClose={toggleNbtiModal}
        onUpdate={(newNbti) => handleNbtiChange(newNbti)}
      />
    </div>
  );
};

export default Mypage;

const ProfileContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 200px; /* Adjust as needed */
  margin: auto;
  margin-top: 90px; /* 사진과 버튼의 간격을 벌리기 위해 추가 */
`;

const FlipButton = styled.button`
  position: absolute;
  z-index: 100;
  font-size: 20px;
  width: 30px;
  height: 30px;
  text-align: center;
  background-color: transparent;
  &:hover,
  &:focus {
    background-color: transparent;
    border: none; /* Remove border */
    outline: none; /* Remove outline */
  }
  right: 10px; /* Adjust position as needed */
  top: 10px; /* Adjust position as needed */
`;

const ProfilePicture = styled.div`
  img {
    width: 100%;
    height: auto;
    max-height: 300px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const Card = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  width: 100%;
  max-width: 200px;
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: transform 1s;
  transform: ${({ flipped }) =>
    flipped ? "rotateY(180deg)" : "rotateY(0deg)"};
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  backface-visibility: hidden;
`;

const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column; /* 변경된 부분 */
  align-items: flex-start; /* 변경된 부분 */
  justify-content: flex-start; /* 변경된 부분 */
  padding: 10px;
  overflow: auto; /* 스크롤 가능하게 변경 */
`;

const InfoText = styled.div`
  margin-bottom: 10px;
  text-align: center;
  font-size: 12px;
  color: #666;
`;
