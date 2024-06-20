import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";

const UserProfileEdit = () => {
    const { user } = useAuth();
    const [userId, setUserId] = useState(user.id);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState(user.phone || "");
    const [job, setJob] = useState(user.job || "");
    const [address, setAddress] = useState(user.address || "");
    const navigate = useNavigate();

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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return;
        }

        const userData = {
            user_id: userId,
            user_pw: password,
            user_phone: phone,
            user_job: job,
            user_address: address,
        };

        // Assuming you have an API endpoint to update user profile
        axios
            .put(`http://localhost:8080/api/edit-profile/${user.id}`, userData)
            .then((res) => {
                console.log("Profile updated successfully:", res);
                alert("프로필이 성공적으로 업데이트 되었습니다."); // 프로필 업데이트 성공 시 alert 창 띄우기
                navigate("/mypage/Mypage"); // Redirect to mypage after successful update
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
                alert(`프로필 업데이트 실패: ${error.response.data.message}`); // 에러 메시지 alert로 표시
            });

    };

    const handleCancel = () => {
        navigate("/mypage"); // Redirect to mypage without saving changes
    };

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
                <label>
                    지역:
                    <input type="text" value={address} onChange={handleAddressChange} />
                </label>
                <br />
                <button type="submit">저장</button>
                <button type="button" onClick={handleCancel}>취소</button>
            </form>
        </div>
    );
};

export default UserProfileEdit;
