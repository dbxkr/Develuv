import React, { useState, useEffect } from 'react'
import './SignupStep2.css'
import axios from 'axios'

const SignupStep2 = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    user_pw: '',
    user_pw_confirm: '',
    user_email: '',
    verification_code: '',
    user_name: '',
    user_birth: '',
    user_phone: '',
    user_gender: '',
    user_profile: '',
    user_provider_id: '',
    user_heart: '',
    user_code: '',
    user_job: '',
    user_address: '',
    user_nbti: '',
  })

  const [formErrors, setFormErrors] = useState({
    user_id: '',
    user_pw: '',
    user_pw_confirm: '',
    user_email: '',
  })

  const [fieldTouched, setFieldTouched] = useState({
    user_id: false,
    user_pw: false,
    user_pw_confirm: false,
    user_email: false,
  })

  const [showVerificationField, setShowVerificationField] = useState(false)
  const [userIdAvailable, setUserIdAvailable] = useState(null)
  const [verificationMessage, setVerificationMessage] = useState('')
  const [userIdCheckMessage, setUserIdCheckMessage] = useState('')

  useEffect(() => {
    if (fieldTouched.user_id) validateUserId(formData.user_id)
    if (fieldTouched.user_pw) validatePassword(formData.user_pw)
    if (fieldTouched.user_pw_confirm)
      validatePasswordConfirm(formData.user_pw, formData.user_pw_confirm)
    if (fieldTouched.user_email) validateEmail(formData.user_email)
  }, [formData, fieldTouched])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    if (name === 'user_id') {
      setUserIdCheckMessage('') // 아이디 필드가 수정되면 중복 확인 메시지를 숨김
    }
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

  const validateUserId = (user_id) => {
    let error = ''
    if (user_id.length < 6) {
      error = '아이디는 6글자 이상이어야 합니다.'
    }
    setFormErrors((prevErrors) => ({ ...prevErrors, user_id: error }))
  }

  const validatePassword = (user_pw) => {
    let error = ''
    if (user_pw.length < 8) {
      error = '비밀번호는 8글자 이상이어야 합니다.'
    } else if (!/\d/.test(user_pw)) {
      error = '비밀번호에는 숫자가 포함되어야 합니다.'
    }
    setFormErrors((prevErrors) => ({ ...prevErrors, user_pw: error }))
  }

  const validatePasswordConfirm = (user_pw, user_pw_confirm) => {
    let error = ''
    if (user_pw !== user_pw_confirm) {
      error = '비밀번호가 일치하지 않습니다.'
    }
    setFormErrors((prevErrors) => ({ ...prevErrors, user_pw_confirm: error }))
  }

  const validateEmail = (user_email) => {
    let error = ''
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(user_email)) {
      error = '유효한 이메일 주소를 입력하세요.'
    }
    setFormErrors((prevErrors) => ({ ...prevErrors, user_email: error }))
  }

  const handleCheckId = async () => {
    if (!formErrors.user_id) {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/checkUserId?userId=${formData.user_id}`
        )
        setUserIdAvailable(response.data)
        setUserIdCheckMessage(
          response.data
            ? '사용 가능한 아이디입니다.'
            : '이미 사용 중인 아이디입니다.'
        )
      } catch (error) {
        console.error('Error checking user ID:', error)
      }
    }
  }

  const handleSendVerificationCode = async () => {
    if (!formErrors.user_email) {
      try {
        const response = await axios.post(
          `http://localhost:8080/user/sendVerificationCode?email=${formData.user_email}`
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
        `http://localhost:8080/user/verifyCode?email=${formData.user_email}&code=${formData.verification_code}`
      )
      if (response.data.isValid) {
        setVerificationMessage('인증이 완료되었습니다.')
      } else {
        setVerificationMessage('인증에 실패하였습니다.')
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
            name="user_id"
            placeholder="아이디"
            value={formData.user_id}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="with-button-input"
          />
          <button
            type="button"
            className="check-button"
            onClick={handleCheckId}
            disabled={!!formErrors.user_id} // 유효성 에러가 있으면 버튼 비활성화
          >
            중복확인
          </button>
          {fieldTouched.user_id && formErrors.user_id && (
            <p className="error-message2">{formErrors.user_id}</p>
          )}
          {!fieldTouched.user_id && userIdCheckMessage && (
            <p className="availability-message">{userIdCheckMessage}</p>
          )}
        </div>
        <div className="field">
          <input
            type="password"
            name="user_pw"
            placeholder="비밀번호"
            value={formData.user_pw}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {fieldTouched.user_pw && formErrors.user_pw && (
            <p className="error-message2">{formErrors.user_pw}</p>
          )}
        </div>
        <div className="field">
          <input
            type="password"
            name="user_pw_confirm"
            placeholder="비밀번호 재확인"
            value={formData.user_pw_confirm}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {fieldTouched.user_pw_confirm && formErrors.user_pw_confirm && (
            <p className="error-message2">{formErrors.user_pw_confirm}</p>
          )}
        </div>
        <div className="field input-with-button">
          <input
            type="email"
            name="user_email"
            placeholder="이메일"
            value={formData.user_email}
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
          {fieldTouched.user_email && formErrors.user_email && (
            <p className="error-message2">{formErrors.user_email}</p>
          )}
        </div>
        {showVerificationField && (
          <div className="field input-with-button">
            <input
              type="text"
              name="verification_code"
              placeholder="인증번호를 입력하세요"
              value={formData.verification_code}
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
        <div className="parent-container">
          {verificationMessage && (
            <p className="verification-message">{verificationMessage}</p>
          )}
        </div>
        <div className="separator"></div>
        <div className="field">
          <input
            type="text"
            name="user_name"
            placeholder="이름"
            value={formData.user_name}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <input
            type="date"
            name="user_birth"
            value={formData.user_birth}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <input
            type="text"
            name="user_phone"
            placeholder="휴대전화번호"
            value={formData.user_phone}
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
