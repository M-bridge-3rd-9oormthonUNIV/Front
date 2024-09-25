import React from "react";
import "../../css/contentPage.css";

// 70% 구간 (sidePage)
// (1) 갤러리 화면, (2) 이미지 생성화면

// 30% 구간 (subPage)
// (1) 노래 검색화면, (2) 가사 화면
export default function LeftPage({ leftSubPageVisible, leftButtonPosition, rightSubPageVisible, handleDragStart }) {
  return (
    <>
      {/* 왼쪽 버튼 */}
      <div
        className="round-button-left"
        onMouseDown={() => handleDragStart("left")}
        style={{
          transform: `translateX(${leftButtonPosition}px)`,
          display: rightSubPageVisible ? "none" : "block"
        }}
      ></div>

      {/* 왼쪽 사이드 페이지 70% */}
      <div
        className={`side-page left-side show`}
        style={{
          width: `${leftButtonPosition}px`,
        }}
      >
        <div className="side-content">image(이미지띄우기, 스크롤기능)</div>
      </div>

      {/* 서브 페이지 30% */}
      <div className={`sub-page left-sub ${leftSubPageVisible ? "show" : ""}`}>
        <div>lyrics(가사띄우기, 스크롤기능)</div>
      </div>
    </>
  );
}
