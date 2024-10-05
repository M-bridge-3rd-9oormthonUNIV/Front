// Modal.jsx
import React from "react";
import "../../css/modal.css";

const Modal = ({ isOpen, onClose, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-logo"></div>
        <p>{message}</p>
        <div className="modal-select-group">
          <button onClick={onConfirm}>예</button>
          <button onClick={onClose}>아니요</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
