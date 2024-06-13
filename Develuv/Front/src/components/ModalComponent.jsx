import React from "react";
import Modal from "react-modal";

const ModalComponent = ({ handleCloseModal }) => {
  isOpen = { isOpen };
  onRequestClose = { handleCloseModal };
  className = "modal-content";
  overlayClassName = "modal-overlay";
  return (
    <div className="modal-body">
      <h3>아이디 찾기</h3>
      <div className="form-group">
        <input
          type="email"
          value={email}
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

export default ModalComponent;
