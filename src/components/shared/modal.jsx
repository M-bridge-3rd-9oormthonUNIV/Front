import React from "react";
import "../../css/modal.css";

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-logo"></div>
        <p>{message}</p>
        <div className="modal-select-group">
          {/* "닫기" 버튼으로 수정 */}
          <button className="modal-button" onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
