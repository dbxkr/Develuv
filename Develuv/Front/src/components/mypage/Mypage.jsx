import React, { useState, useEffect } from "react";
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
import "./Mypage.css";

const Mypage = () => {
  const params = useParams();
  const { user } = useAuth();
  const [blur, setBlur] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const [quiz, setQuiz] = useState("");
  const navigate = useNavigate();
  const isMyPage = user.user_id === params.user_id;
  const springUrl = "http://localhost:8080";
  const blurLevel = [50, 70, 90, 140, 4000];
  const [git, setGit] = useState(user.user_git);
  const [memo, setMemo] = useState(user.user_memo);
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    if (isMyPage) {
      setBlur(4); // 자신의 마이페이지일 때 블러 초기화
      setUserInfo({ ...user });
    } else {
      axios
        .post(
          `${springUrl}/user/otherInfo?user_id=${params.user_id}&my_id=${user.user_id}`
        )
        .then((response) => {
          console.log("response", response);
          setUserInfo(response.data);
          setBlur(response.data.blur); // 다른 사용자의 마이페이지일 때 블러 적용
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [params.user_id, isMyPage]);

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

  const handleGithubChange = (e) => {
    const newValue = e.target.value;
    setGit(newValue);
  };
  const handleMemoChange = (e) => {
    const newValue = e.target.value;
    setMemo(newValue);
  };

  const updateProfile = (e) => {
    let newValue;
    console.log(e);
    if (e === "memo") {
      newValue = memo;
    } else if (e === "git") {
      newValue = git;
    }
    axios
      .post(`${springUrl}/user/updateOneProfile`, {
        type: e,
        value: newValue,
        user_id: user.user_id,
      })
      .catch((error) => {
        console.error("Error updating Instagram:", error);
      });
  };

  const handleQuizChange = (e) => {
    const newValue = e.target.value;
    setQuiz(newValue);
    // Save to backend
    axios
      .put(`${springUrl}/user/info/${user.user_id}`, { quiz: newValue })
      .catch((error) => {
        console.error("Error updating Quiz:", error);
      });
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const age = calculateAge(userInfo.user_birth);

  return (
    <div className="mypage-container">
      <div className="profile-section">
        <div className="profile-picture">
          <img
            src={
              userInfo.user_profile + blurLevel[blur + 0] + "&blur=AW2$zxORd"
            }
            alt="Profile"
            // style={{ filter: `blur(${blur}px)` }}
            onContextMenu={(event) => {
              event.preventDefault();
            }}
            style={{ filter: `blur(${(4 - blur - tempB) * 2}px)` }}
          />
        </div>

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
              <img
                src={userIcon}
                alt="User"
                className="icon" // 아이콘 스타일을 위한 클래스
              />
              {userInfo.user_name} ({age})
              <span
                className={`gender-icon ${
                  userInfo.user_gender === "Female" ? "female" : "male"
                }`}
              >
                {userInfo.user_gender === "Male" ? "♂️" : "♀️"}
              </span>
            </h2>
          </div>
          <div className="info-row">
            <img
              src={locationIcon}
              alt="Location"
              className="icon" // 아이콘 스타일을 위한 클래스
            />
            <p>{userInfo.user_address}</p>
          </div>
          <div className="info-row">
            <img
              src={jobIcon}
              alt="Job"
              className="icon" // 아이콘 스타일을 위한 클래스
            />
            <p>{userInfo.user_job}</p>
          </div>
          <div className="info-row">
            <img
              src={memoIcon}
              alt="Memo"
              className="icon" // 아이콘 스타일을 위한 클래스
            />
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
                  onBlur={() => {
                    setTimeout(() => {
                      setFocused(null);
                    }, 100);
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
            <span className="info-tag">{userInfo.user_nbti}</span>
            {userInfo.user_pro_lang &&
              userInfo.user_pro_lang.split(",").map((lang, index) => (
                <span className="info-tag" key={index}>
                  {lang}
                </span>
              ))}
          </div>
          <div className="extra-info">
            <span className="info-tag">{userInfo.user_drink}</span>
            <span className="info-tag">{userInfo.user_smoke}</span>
            <span className="info-tag">{userInfo.user_religion}</span>
            <span className="info-tag">{userInfo.user_edu}</span>
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
    </div>
  );
};

export default Mypage;
