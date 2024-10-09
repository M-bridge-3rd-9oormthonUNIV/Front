import React, { useEffect } from "react";
import "../../css/modal.css";

// 기본 모달
export const Modal = ({ isOpen, onClose, message }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 1500); 
      return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 정리
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-select-group">
          <button className="modal-button" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

// 경고 모달
export const AlertModal = ({ isOpen, onClose, message }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 1500); 
      return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 정리
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div
        className="modal-content"
        style={{ width: "370px", height: "150px", textAlign: "center" }}
      >
        <p>{message}</p>
        <div className="modal-select-group">
          <button
            className="modal-button"
            style={{ marginBottom: "-5px" }}
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

// 서브페이지(30%) 경고 모달
export const SubAlertModal = ({ isOpen, onClose, message, direction }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 1500); 
      return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 정리
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 화면의 30% 위치 계산
  const position = `${window.innerWidth * 0.00000001}px`;

  // 모달의 위치 스타일 설정
  const modalPosition =
    direction === "right"
      ? { right: position, top: "32%", transform: "translateY(-50%,-50%)"  } // 오른쪽에 붙게
      : { left: position, top: "32%", transform: "translateY(-50%,-50%)" }; // 왼쪽에 붙게

  return (
    <div
      className="modal-overlay"
      style={{
        position: "relative",
        width: "320px",
        height: "90px",
        textAlign: "center",
        padding: "10px",
        background: "transparent",
        ...modalPosition, // 위치 스타일 적용
      }}
    >
      <div
        className="modal-content"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          width: "320px",
          height: "90px",
          gap: "10px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "13px" }}>{message}</p>
        <button
          className="modal-button"
          style={{
            width: "45px",
            height: "30px",
            fontSize: "12px",
          }}
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
};
