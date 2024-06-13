import React, { useState, useEffect } from 'react'
import './SignupStep2.css'
import axios from 'axios'

const SignupStep2 = () => {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    email: '',
    verificationCode: '',
    username: '',
    birthDate: '',
    phoneNumber: '',
  })

  const [formErrors, setFormErrors] = useState({
    userId: '',
    password: '',
    email: '',
  })

  const [fieldTouched, setFieldTouched] = useState({
    userId: false,
    password: false,
    email: false,
  })

  const [showVerificationField, setShowVerificationField] = useState(false)
  const [userIdAvailable, setUserIdAvailable] = useState(null)
  const [verificationMessage, setVerificationMessage] = useState('')

  useEffect(() => {
    if (fieldTouched.userId) validateUserId(formData.userId)
    if (fieldTouched.password) validatePassword(formData.password)
    if (fieldTouched.email) validateEmail(formData.email)
  }, [formData, fieldTouched])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFocus = (e) => {
    const { name } = e.target
    setFieldTouched({
      ...fieldTouched,
      [name]: true,
    })
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setFieldTouched({
      ...fieldTouched,
      [name]: false,
    })
  }

  const validateUserId = (userId) => {
    let error = ''
    if (userId.length < 6) {
      error = '아이디는 6글자 이상이어야 합니다.'
    }
    setFormErrors((prevErrors) => ({ ...prevErrors, userId: error }))
  }

  const validatePassword = (password) => {
    let error = ''
    if (password.length < 8) {
      error = '비밀번호는 8글자 이상이어야 합니다.'
    } else if (!/\d/.test(password)) {
      error = '비밀번호에는 숫자가 포함되어야 합니다.'
    }
    setFormErrors((prevErrors) => ({ ...prevErrors, password: error }))
  }

  const validateEmail = (email) => {
    let error = ''
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      error = '유효한 이메일 주소를 입력하세요.'
    }
    setFormErrors((prevErrors) => ({ ...prevErrors, email: error }))
  }

  const handleCheckId = async () => {
    try {
      console.log(formData.userId)
      const response = await axios.get(
        `http://localhost:8080/user/checkUserId?userId=${formData.userId}`
      )
      setUserIdAvailable(response.data)
    } catch (error) {
      console.error('Error checking user ID:', error)
    }
  }

  const handleSendVerificationCode = async () => {
    if (!formErrors.email) {
      try {
        const response = await axios.post(
          `http://localhost:8080/user/sendVerificationCode?email=${formData.email}`
        )
        setShowVerificationField(true)
        alert(response.data.msg) // 서버에서 보낸 메시지 알림
      } catch (error) {
        console.error('Error sending verification code:', error)
      }
    }
  }

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/user/verifyCode?email=${formData.email}&code=${formData.verificationCode}`
      )
      if (response.data.isValid) {
        setVerificationMessage('인증이 완료되었습니다.')
      } else {
        setVerificationMessage('인증에 실패하였습니다. 다시 시도해주세요')
      }
    } catch (error) {
      setVerificationMessage('Error verifying code: ' + error.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:8080/user/signup',
        formData
      )
      alert(response.data) // 서버에서 반환된 메시지를 알림으로 표시
    } catch (error) {
      console.error('Error signing up:', error)
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <div className="quiz-container">
      <div className="progress-container">
        <div className="progress-line">
          <div className="progress-circle second" />
          <div className="progress-circle fifth" />
        </div>
      </div>
      <div className="copy">
        <div className="sign-up">Sign Up</div>
        <div className="welcome-to-bluv">Welcome to Bluv</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="field input-with-button">
          <input
            type="text"
            name="userId"
            placeholder="아이디"
            value={formData.userId}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="with-button-input"
          />
          <button
            type="button"
            className="check-button"
            onClick={handleCheckId}
          >
            중복확인
          </button>
          {fieldTouched.userId && formErrors.userId && (
            <p className="error-message2">{formErrors.userId}</p>
          )}
        </div>
        {userIdAvailable !== null && (
          <p className="availability-message">
            {userIdAvailable
              ? '사용 가능한 아이디입니다.'
              : '이미 사용 중인 아이디입니다.'}
          </p>
        )}
        <div className="field">
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {fieldTouched.password && formErrors.password && (
            <p className="error-message2">{formErrors.password}</p>
          )}
        </div>
        <div className="field input-with-button">
          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="with-button-input"
          />
          <button
            type="button"
            className="check-button"
            onClick={handleSendVerificationCode}
          >
            인증 번호 받기
          </button>
          {fieldTouched.email && formErrors.email && (
            <p className="error-message2">{formErrors.email}</p>
          )}
        </div>
        {showVerificationField && (
          <div className="field input-with-button">
            <input
              type="text"
              name="verificationCode"
              placeholder="인증번호를 입력하세요"
              value={formData.verificationCode}
              onChange={handleChange}
              className="with-button-input"
            />
            <button
              type="button"
              className="check-button"
              onClick={handleVerifyCode}
            >
              확인
            </button>
          </div>
        )}
        {verificationMessage && (
          <p className="verification-message">{verificationMessage}</p>
        )}
        <div className="separator"></div>
        <div className="field">
          <input
            type="text"
            name="username"
            placeholder="이름"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <input
            type="text"
            name="phoneNumber"
            placeholder="휴대전화번호"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">
          회원가입
        </button>
      </form>
    </div>
  )
}

export default SignupStep2
