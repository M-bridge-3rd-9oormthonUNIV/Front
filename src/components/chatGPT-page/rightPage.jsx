import React from "react";
import "../../css/contentPage.css";
import SubLyricsDisplay from "../shared/subLyricsDisplay";
import SubSearchDisplay from "../shared/subSearchDisplay";

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
        className="bt-right"
        onMouseDown={() => handleDragStart("right")}
        style={{
          transform: `translateX(-${rightButtonPosition}px)`,
          visibility: leftSubPageVisible ? "hidden" : "visible",
        }}
      ></div>

      {/* 가짜 오른쪽 버튼 페이지 */}
      <div
        className={`fake-side-page-right`}
        style={{
          transform: `translateX(${Math.max(
            -(rightButtonPosition - window.innerWidth * 0.7)
          )}px)`,
          visibility:
            leftSubPageVisible === false && rightButtonPosition >= 1
              ? "visible"
              : "hidden", // 두 조건 모두 만족할 때만 보이게 설정
        }}
      ></div>

      {/* 가짜 오른쪽 반원 버튼 */}
      <div
        className={`fake-ellipse-right`}
        style={{
          transform: `translateX(${Math.max(
            -(rightButtonPosition - window.innerWidth * 0.7)
          )}px)`,
          visibility:
            leftSubPageVisible === false && rightButtonPosition <= 1
              ? "visible"
              : "hidden", // 두 조건 모두 만족할 때만 보이게 설정
        }}
      ></div>

      {/* 오른쪽 사이드 페이지 70% */}
      <div
        className="side-page right-side show"
        style={{
          transform: `translateX(${Math.max(
            -(rightButtonPosition - window.innerWidth * 0.7),
            0
          )}px)`,
          visibility:
            leftSubPageVisible === false && rightButtonPosition >= 1
              ? "visible"
              : "hidden", // 두 조건 모두 만족할 때만 보이게 설정
          opacity: Math.min(rightButtonPosition / (window.innerWidth * 0.7), 1),
        }}
      ></div>

      {/* 가사 페이지 30% */}
      <div
        className={`sub-page right-sub ${rightSubPageVisible ? "show" : ""}`}
      >
        <SubSearchDisplay></SubSearchDisplay>
        {/* <SubLyricsDisplay></SubLyricsDisplay> */}
      </div>
    </>
  );
}
