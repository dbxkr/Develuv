import React from "react";

const FindIdModal = ({ handleCloseModal, setEmail, foundId, findId }) => {
  return (
    <div className="modal-body">
      <h3>아이디 찾기</h3>
      <div className="form-group">
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
      </div>
      <p>ID: {foundId}</p> {/* 아이디 찾기 결과를 표시 */}
      <div className="button-container">
        <button onClick={findId}>OK</button>
        <button onClick={handleCloseModal}>Close</button>
      </div>
    </div>
  );
};

export default FindIdModal;
