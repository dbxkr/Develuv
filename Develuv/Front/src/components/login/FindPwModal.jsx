import React from "react";

const FindPwModal = ({ handleClosePwModal, foundPw, findPw }) => {
  return (
    <div className="modal-body">
      <h3>비밀번호 찾기</h3>
      <div className="form-group">
        <input type="text" id="pw-id" required placeholder="ID" />
      </div>
      <div className="form-group">
        <input type="email" id="pw-email" required placeholder="Email" />
      </div>
      <p>Password: {foundPw}</p> {/* 비밀번호 찾기 결과를 표시 */}
      <div className="button-container">
        <button onClick={findPw}>OK</button>
        <button onClick={handleClosePwModal}>Close</button>
      </div>
    </div>
  );
};

export default FindPwModal;
