import React from "react";
import "../../css/contentPage.css";

// 70% 구간 (sidePage)
// (1) ChatGPT화면

// 30% 구간 (subPage)
// (1) 가사 화면, (2) ?
export default function RightPage({
  rightSubPageVisible,
  rightButtonPosition,
  leftSubPageVisible,
  handleDragStart,
}) {
  return (
    <>
      {/* 오른쪽 버튼 */}
      <div
        className="round-button-right"
        onMouseDown={() => handleDragStart("right")}
        style={{
          transform: `translateX(-${rightButtonPosition}px)`,
          display: leftSubPageVisible ? "none" : "block",
        }}
      ><div className="round-button-right-image"></div></div>

      {/* 오른쪽 사이드 페이지 70% */}
      <div
        className={`side-page right-side show`}
        style={{
          width: `${rightButtonPosition}px`,
        }}
      >
        <div className="side-content">ChatGPT</div>
      </div>

      {/* 가사 페이지 30% */}
      <div
        className={`sub-page right-sub ${rightSubPageVisible ? "show" : ""}`}
      >
        <div>lyrics(가사띄우기, 스크롤기능)</div>
      </div>
    </>
  );
}
