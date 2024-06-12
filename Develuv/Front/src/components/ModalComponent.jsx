import React from "react";
import Modal from "react-modal";

const ModalComponent = ({ isOpen, handleCloseModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div>
        {/* 아이디 찾기 모달 내용 */}
        <h3>아이디 찾기</h3>
        {/* 아이디 찾기 내용을 여기에 추가하세요 */}
        <button onClick={handleCloseModal}>Close</button>
      </div>
    </Modal>
  );
};

export default ModalComponent;
