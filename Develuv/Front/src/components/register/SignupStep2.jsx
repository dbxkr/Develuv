import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const SignupStep2 = ({
  setProgress,
  formData,
  setFormData,
  state,
  fieldTouched,
  setFieldTouched,
  formErrors,
  setFormErrors,
  userIdAvailable,
  setUserIdAvailable,
}) => {
  const navigate = useNavigate();

  const [showVerificationField, setShowVerificationField] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [userIdCheckMessage, setUserIdCheckMessage] = useState("");

  useEffect(() => {
    if (fieldTouched.user_id) validateUserId(formData.user_id);
    if (fieldTouched.user_pw) validatePassword(formData.user_pw);
    if (fieldTouched.user_pw_confirm)
      validatePasswordConfirm(formData.user_pw, formData.user_pw_confirm);
    if (fieldTouched.user_email) validateEmail(formData.user_email);
  }, [formData, fieldTouched]);

  if (state && state.user != null) {
    formData.provider = "develuv";
    console.log("state", state);
    setUserIdAvailable(true);
    formData.user_provider_id = state.provider;
    formData.user_id = state.user.id;
    formData.user_pw = state.provider;
    formData.user_pw_confirm = state.provider;
    if (state.provider === "naver") {
      formData.user_email = state.user.email;
      formData.verification_code = state.user.provider;
      formData.user_name = state.user.name;
      formData.user_birth = state.user.birthyear + "-" + state.user.birthday;
      formData.user_phone = state.user.mobile;
    }
    if (state.provider === "google") {
      formData.user_name = state.user.name;
      formData.user_email = state.user.email;
      formData.user_profile = state.user.profile;
    }
  }
  useEffect(() => {
    console.log(state);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "user_id") {
      setUserIdCheckMessage(""); // 아이디 필드가 수정되면 중복 확인 메시지를 숨김
      setUserIdAvailable(false);
    }
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setFieldTouched({
      ...fieldTouched,
      [name]: true,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setFieldTouched({
      ...fieldTouched,
      [name]: false,
    });
  };

  const validateUserId = (user_id) => {
    let error = "";
    if (user_id.length < 6) {
      error = "아이디는 6글자 이상이어야 합니다.";
    }
    setFormErrors((prevErrors) => ({ ...prevErrors, user_id: error }));
  };

  const validatePassword = (user_pw) => {
    let error = "";
    if (user_pw.length < 8) {
      error = "비밀번호는 8글자 이상이어야 합니다.";
    } else if (!/\d/.test(user_pw)) {
      error = "비밀번호에는 숫자가 포함되어야 합니다.";
    }
    setFormErrors((prevErrors) => ({ ...prevErrors, user_pw: error }));
  };

  const validatePasswordConfirm = (user_pw, user_pw_confirm) => {
    let error = "";
    if (user_pw !== user_pw_confirm) {
      error = "비밀번호가 일치하지 않습니다.";
    }
    setFormErrors((prevErrors) => ({ ...prevErrors, user_pw_confirm: error }));
  };

  const validateEmail = (user_email) => {
    let error = "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user_email)) {
      error = "유효한 이메일 주소를 입력하세요.";
    }
    setFormErrors((prevErrors) => ({ ...prevErrors, user_email: error }));
  };

  const handleCheckId = async () => {
    if (!formErrors.user_id) {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/checkUserId?userId=${formData.user_id}`
        );
        setUserIdAvailable(response.data);
        setUserIdCheckMessage(
          response.data
            ? "사용 가능한 아이디입니다."
            : "이미 사용 중인 아이디입니다."
        );
      } catch (error) {
        console.error("Error checking user ID:", error);
      }
    }
  };

  const handleSendVerificationCode = async () => {
    if (!formErrors.user_email) {
      try {
        const response = await axios
          .post(
            `http://localhost:8080/user/sendVerificationCode?email=${formData.user_email}`
          )
          .then((res) => {
            console.log(res);
            if (
              res.data.msg === "이미 가입된 이메일입니다." ||
              res.data.msg ===
                "메일 전송에 실패했습니다. 주소를 다시 확인해주세요."
            ) {
              setShowVerificationField(false); // 이미 가입된 이메일일 경우 필드 숨김
            } else {
              setShowVerificationField(true); // 인증 번호 입력 필드 표시
            }
            alert(res.data.msg); // 서버에서 보낸 메시지 알림
          });

        // console.log(response.data) // 응답 데이터를 로그로 출력
      } catch (error) {
        console.error("Error sending verification code:", error);
      }
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/user/verifyCode?email=${formData.user_email}&code=${formData.verification_code}`
      );
      if (response.data.isValid) {
        setVerificationMessage("인증이 완료되었습니다.");
      } else {
        setVerificationMessage("인증에 실패하였습니다.");
      }
    } catch (error) {
      setVerificationMessage("Error verifying code: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필수 필드들이 비어 있는지 확인
    const requiredFields = [
      "user_id",
      "user_pw",
      "user_pw_confirm",
      "user_email",
      "verification_code",
      "user_name",
      "user_birth",
      "user_phone",
    ];

    let allFieldsFilled = true;
    const newFormErrors = { ...formErrors };

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newFormErrors[field] = "이 필드는 필수입니다.";
        allFieldsFilled = false;
      } else {
        newFormErrors[field] = "";
      }
    });

    setFormErrors(newFormErrors);

    if (!allFieldsFilled) {
      alert("모든 필수 필드를 입력하세요.");
      return;
    }

    if (!userIdAvailable) {
      alert("아이디 중복 여부를 확인하세요.");
      return;
    }

    // 기존 유효성 검사를 통과했는지 확인
    if (
      formErrors.user_id ||
      formErrors.user_pw ||
      formErrors.user_pw_confirm ||
      formErrors.user_email
    ) {
      alert("입력한 필드에 오류가 있습니다. 다시 확인해주세요.");
      return;
    }

    setProgress(3);
    // try {
    // const response = await axios.post(
    //   "http://localhost:8080/user/signup",
    //   formData
    // );
    // alert(response.data); // 서버에서 반환된 메시지를 알림으로 표시
    // } catch (error) {
    //   console.error("Error signing up:", error);
    //   alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    // }
  };

  return (
    <div className="quiz-container">
      <div className="progress-container2">
        <div className="progress-line2">
          <div className="progress-circle2 second"></div>
          <div className="progress-circle2 last-child"></div>
        </div>
      </div>
      <div className="copy">
        <div className="sign-up">Sign Up</div>
        <div className="welcome-to-bluv">Welcome to Develuv</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="field input-with-button">
          <input
            type="text"
            name="user_id"
            placeholder="아이디"
            value={state && state.user ? state.provider : formData.user_id}
            onChange={handleChange}
            onFocus={state && state.user ? null : handleFocus}
            onBlur={state && state.user ? null : handleBlur}
            className="with-button-input"
            readOnly={state && !!state.user}
            style={
              state && state.user ? { backgroundColor: "lightgray" } : null
            }
          />
          <button
            type="button"
            className="check-button"
            onClick={state && state.user ? null : handleCheckId}
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
            onFocus={state && state.user ? null : handleFocus}
            onBlur={state && state.user ? null : handleBlur}
            style={
              state && state.user ? { backgroundColor: "lightgray" } : null
            }
            readOnly={state && !!state.user}
          />
          {fieldTouched.user_pw && formErrors.user_pw && (
            <p className="error-message3">{formErrors.user_pw}</p>
          )}
        </div>
        <div className="field">
          <input
            type="password"
            name="user_pw_confirm"
            placeholder="비밀번호 재확인"
            value={formData.user_pw_confirm}
            onChange={handleChange}
            onFocus={state && state.user ? null : handleFocus}
            onBlur={state && state.user ? null : handleBlur}
            style={
              state && state.user ? { backgroundColor: "lightgray" } : null
            }
            readOnly={state && !!state.user}
          />
          {fieldTouched.user_pw_confirm && formErrors.user_pw_confirm && (
            <p className="error-message3">{formErrors.user_pw_confirm}</p>
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
            readOnly={
              state &&
              (state.provider === "naver" || state.provider === "google")
                ? true
                : false
            }
            style={
              state &&
              (state.provider === "naver" || state.provider === "google")
                ? { backgroundColor: "lightgray" }
                : null
            }
          />
          <button
            type="button"
            className="check-button"
            onClick={
              state &&
              (state.provider === "naver" || state.provider === "google")
                ? null
                : handleSendVerificationCode
            }
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
            <p
              className={`verification-message ${
                verificationMessage.includes("완료") ? "success" : "error"
              }`}
            >
              {verificationMessage}
            </p>
          )}
        </div>
        <div className="separator"></div>
        <div className="field">
          <input
            type="text"
            name="user_name"
            placeholder="이름"
            value={formData.user_name}
            readOnly={
              state &&
              (state.provider === "naver" || state.provider === "google")
                ? true
                : false
            }
            style={
              state &&
              (state.provider === "naver" || state.provider === "google")
                ? { backgroundColor: "lightgray" }
                : null
            }
            onChange={handleChange}
          />
          {fieldTouched.user_name && formErrors.user_name && (
            <p className="error-message2">{formErrors.user_name}</p>
          )}
        </div>
        <div className="field">
          <input
            type="date"
            name="user_birth"
            value={formData.user_birth}
            readOnly={state && state.provider === "naver" ? true : false}
            style={
              state && state.provider === "naver"
                ? { backgroundColor: "lightgray" }
                : null
            }
            onChange={handleChange}
          />
          {fieldTouched.user_birth && formErrors.user_birth && (
            <p className="error-message2">{formErrors.user_birth}</p>
          )}
        </div>
        <div className="field">
          <input
            type="text"
            name="user_phone"
            placeholder="휴대전화번호"
            value={formData.user_phone}
            readOnly={state && state.provider === "naver" ? true : false}
            style={
              state && state.provider === "naver"
                ? { backgroundColor: "lightgray" }
                : null
            }
            onChange={handleChange}
          />
          {fieldTouched.user_phone && formErrors.user_phone && (
            <p className="error-message2">{formErrors.user_phone}</p>
          )}
        </div>
        <button type="submit" className="submit-button2">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignupStep2;
