import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../imgupload"; // 이미지 업로드 컴포넌트 임포트
import DaumPostCode from "../register/Register3/DaumPostCode";
import "./UserProfileEdit.css"; // 새로운 CSS 파일 임포트

const UserProfileEdit = () => {
  const { user } = useAuth();
  const [userId, setUserId] = useState(user.user_id);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState(user.user_phone || "");
  const [job, setJob] = useState(user.user_job || "");
  const [address, setAddress] = useState(user.user_address || "");
  const [profileImageUrl, setProfileImageUrl] = useState(user.user_profile);
  const [newImagePreview, setNewImagePreview] = useState(null); // 새 이미지 미리보기 상태 추가
  const image = useRef();
  const navigate = useNavigate();
  const client_id = import.meta.env.VITE_GOOGLE_DRIVE_CLIENT_ID;
  const secret_key = import.meta.env.VITE_GOOGLE_DRIVE_SECRET_KEY;

  const [accessToken, setAccessToken] = useState(import.meta.env.VITE_GOOGLE_DRIVE_API_KEY);
  const refreshToken = import.meta.env.VITE_GOOGLE_DRIVE_REFRESH_TOKEN;

  const [formData, setFormData] = useState([{ user_address: '' }]);
  const [city, setCity] = useState();

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post("https://oauth2.googleapis.com/token", {
        client_id,
        client_secret: secret_key,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      });
      setAccessToken(response.data.access_token);
    } catch (error) {
      console.error("Error refreshing access token", error);
    }
  };

  useEffect(() => {
    refreshAccessToken();
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleJobChange = (e) => {
    setJob(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleImageUpload = (image, imageUrl) => {
    setProfileImageUrl(imageUrl);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    image.current = file;

    // 새 이미지 미리보기 설정
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setNewImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !phone || !job || !address) {
      alert("비밀번호, 휴대전화, 직업, 지역을 모두 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    let newProfileImageUrl = profileImageUrl;

    if (image.current) {
      const folderId = "1MTa41ozlOhsVe5ID--NZ8Br_xii27knL";
      const formData = new FormData();
      formData.append(
        "metadata",
        new Blob(
          [
            JSON.stringify({
              name: image.current.name,
              mimeType: image.current.type,
              parents: [folderId],
            }),
          ],
          { type: "application/json" }
        )
      );
      formData.append("file", image.current);

      try {
        const response = await axios.post(
          "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
          formData,
          {
            headers: {
              "Content-Type": "multipart/related",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const fileId = response.data.id;
        newProfileImageUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=s`;
        setProfileImageUrl(newProfileImageUrl);
      } catch (error) {
        console.error("프로필 이미지 업로드 오류:", error);
        alert(`프로필 이미지 업로드 실패: ${error.response?.data?.message || error.message}`);
        return;
      }
    }

    const userData = {
      user_id: userId,
      user_pw: password,
      user_phone: phone,
      user_job: job,
      user_address: address,
      user_profile: newProfileImageUrl,
    };

    try {
      await axios.put(`http://localhost:8080/user/edit-profile/${user.user_id}`, userData);
      alert("프로필이 성공적으로 업데이트 되었습니다.");
      window.location.href = `/mypage/${user.user_id}`;
    } catch (error) {
      console.error("프로필 업데이트 오류:", error);
      alert(`프로필 업데이트 실패: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleCancel = () => {
    navigate(`/mypage/${user.user_id}`);
  };

  useEffect(() => {
    console.log(formData.user_address);
    setAddress(formData.user_address);
  }, [formData])

  return (
    <div>
      <h2>회원정보 수정</h2>
      <form onSubmit={handleSubmit}>
        <label>
          아이디:
          <input type="text" value={userId} readOnly />
        </label>
        <br />
        <label>
          비밀번호:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <label>
          비밀번호 확인:
          <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        </label>
        <br />
        <label>
          휴대전화:
          <input type="text" value={phone} onChange={handlePhoneChange} />
        </label>
        <br />
        <label>
          직업:
          <input type="text" value={job} onChange={handleJobChange} />
        </label>
        <br />
        <div className="address-container">
          <label>
            지역:
            <input type="text" value={address} onChange={handleAddressChange} />
          </label>
          <DaumPostCode formData={formData} setFormData={setFormData} />
        </div>
        <br />
        <label>
          프로필 사진:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <br />
        {profileImageUrl && !newImagePreview && (
          <div>
            <img src={profileImageUrl} alt="프로필 미리보기" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
          </div>
        )}
        {newImagePreview && (
          <div>
            <img src={newImagePreview} alt="새 프로필 미리보기" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
          </div>
        )}
        <ImageUpload onImageUpload={handleImageUpload} />
        <br />
        <div className="button-container">
          <button type="submit">저장</button>
          <button type="button" onClick={handleCancel}>취소</button>
        </div>

      </form>
    </div>
  );
};

export default UserProfileEdit;
