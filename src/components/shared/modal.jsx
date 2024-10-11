import React, { useEffect, useState } from "react";
import "../../css/modal.css";

// 이미지 버튼 
export const Modal = ({ isOpen, onClose, message, pinkMessage }) => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsHidden(false); // isOpen이 true일 때 isHidden을 false로 초기화
      const timer = setTimeout(() => {
        handleClose();
      }, 1500); // 1.5초 후에 모달을 닫음

      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    } else {
      setIsHidden(false); // isOpen이 false일 때 isHidden도 초기화
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsHidden(true);
    setTimeout(() => {
      onClose(); // 모달을 완전히 닫기
    }, 300); // CSS transition duration과 동일해야 함
  };

  if (!isOpen && !isHidden) return null;

  return (
    <div className={`modal-overlay ${isHidden ? "hide" : ""}`}>
      <div className={`modal-content ${isHidden ? "hide" : ""}`}>
        <p>{message}</p>
        <div className="modal-select-group">
          <button className="modal-button" onClick={handleClose}>
            {pinkMessage}
          </button>
        </div>
      </div>
    </div>
  );
};

// 검색 경고 
export const AlertModal = ({ isOpen, onClose, message }) => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsHidden(false); // isOpen이 true일 때 isHidden을 false로 초기화
      const timer = setTimeout(() => {
        handleClose();
      }, 1500); // 1.5초 후에 모달을 닫음

      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    } else {
      setIsHidden(false); // isOpen이 false일 때 isHidden도 초기화
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsHidden(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen && !isHidden) return null;

  return (
    <div className={`modal-overlay ${isHidden ? "hide" : ""}`}>
      <div className={`modal-content ${isHidden ? "hide" : ""}`} style={{ width: "370px", height: "150px", textAlign: "center" }}>
        <p>{message}</p>
        <div className="modal-select-group">
          <button className="modal-button" style={{ marginBottom: "-5px" }} onClick={handleClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

// 서브페이지 (30% 화면) 검색 경고 
export const SubAlertModal = ({ isOpen, onClose, message, direction }) => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsHidden(false); // isOpen이 true일 때 isHidden을 false로 초기화
      const timer = setTimeout(() => {
        handleClose();
      }, 1500); // 1.5초 후에 모달을 닫음

      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    } else {
      setIsHidden(false); // isOpen이 false일 때 isHidden도 초기화
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsHidden(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen && !isHidden) return null;

  const position = `${window.innerWidth * 0.00000001}px`;
  const modalPosition = direction === "right"
    ? { right: position, top: "32%", transform: "translateY(-50%,-50%)" }
    : { left: position, top: "32%", transform: "translateY(-50%,-50%)" };

  return (
    <div
      className={`modal-overlay ${isHidden ? "hide" : ""}`}
      style={{
        position: "relative",
        width: "320px",
        height: "90px",
        textAlign: "center",
        padding: "10px",
        background: "transparent",
        ...modalPosition,
      }}
    >
      <div
        className={`modal-content ${isHidden ? "hide" : ""}`}
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
          onClick={handleClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
};
