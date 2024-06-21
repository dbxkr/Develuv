import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../AuthProvider'
import './Mypage.css'

const Mypage = () => {
  const params = useParams()
  const { user } = useAuth()
  const [blur, setBlur] = useState(0)
  const [userInfo, setUserInfo] = useState(null)
  const navigate = useNavigate()
  const isMyPage = user.id === params.user_id
  const springUrl = 'http://localhost:8080'

  useEffect(() => {
    axios
      .get(`${springUrl}/user/info/${params.user_id}`)
      .then((response) => {
        console.log('response', response)
        setUserInfo(response.data)
        if (!isMyPage) {
          setBlur(10)
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error)
      })
  }, [params.user_id, isMyPage])

  const calculateAge = (birthDate) => {
    const today = new Date()
    const birthDateObj = new Date(birthDate)
    let age = today.getFullYear() - birthDateObj.getFullYear()
    const monthDifference = today.getMonth() - birthDateObj.getMonth()
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--
    }
    return age
  }

  const startChat = () => {
    axios
      .get(
        `${springUrl}/chatlists/start?myId=${user.id}&oppoId=${params.user_id}`
      )
      .then((res) => {
        console.log(res)
        navigate('/chat')
      })
      .catch((error) => {
        console.error('Error starting chat:', error)
      })
  }

  const handleBlur = (e) => {
    setBlur(e.target.value)
  }

  const goToEditProfile = () => {
    navigate('/edit-profile')
  }

  if (!userInfo) {
    return <div>Loading...</div>
  }

  const age = calculateAge(userInfo.user_birth)

  return (
    <div className="mypage-container">
      <div className="profile-section">
        <div className="profile-picture">
          <img
            src={userInfo.user_profile}
            alt="Profile"
            style={{ filter: `blur(${blur}px)` }}
          />
        </div>
        {!isMyPage && (
          <input
            type="number"
            onChange={handleBlur}
            placeholder="Set blur level"
            className="blur-input"
          />
        )}
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
        <div className="info-row">
          <h2>
            <span
              style={{
                color: userInfo.user_gender === 'Female' ? 'pink' : 'blue',
              }}
            >
              {userInfo.user_gender === 'Male' ? '♂️' : '♀️'}
            </span>
            {userInfo.user_name} ({age})
          </h2>
        </div>
        <div className="info-row">
          <p>📍 {userInfo.user_address}</p>
        </div>
        <div className="info-row">
          <p>💼 {userInfo.user_job}</p>
        </div>
        <div className="info-row-inline">
          <div className="nbti-lang">
            <span>{userInfo.user_nbti}</span>
          </div>
          <div className="skills">
            {userInfo.user_pro_lang ? (
              userInfo.user_pro_lang
                .split(',')
                .map((lang, index) => <span key={index}>{lang}</span>)
            ) : (
              <span>&nbsp;</span>
            )}
          </div>
        </div>
        <div className="extra-info">
          <span>{userInfo.user_drink}</span>
          <span>{userInfo.user_smoke}</span>
          <span>{userInfo.user_religion}</span>
          <span>{userInfo.user_edu}</span>
        </div>
      </div>
    </div>
  )
}

export default Mypage
