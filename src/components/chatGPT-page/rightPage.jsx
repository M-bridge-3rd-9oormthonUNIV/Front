import React, { useState, useEffect } from "react";
import "../../css/contentPage.css";
import SubLyricsDisplay from "../shared/subLyricsDisplay";
import SubSearchDisplay from "../shared/subSearchDisplay";
import Chat from "./chatPage";

export default function RightPage({
  rightSubPageVisible,
  rightButtonPosition,
  leftSubPageVisible,
  handleDragStart,
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 화면 크기 변경 시 windowWidth 업데이트
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            -(rightButtonPosition - windowWidth * 0.7),
            0
          )}px)`,
          visibility:
            leftSubPageVisible === false && rightButtonPosition >= 2
              ? "visible"
              : "hidden", // 두 조건 모두 만족할 때만 보이게 설정
        }}
      ></div>

      {/* 가짜 오른쪽 반원 버튼 */}
      <div
        className={`fake-ellipse-right`}
        style={{
          transform: `translateX(${Math.max(
            -(rightButtonPosition - windowWidth * 0.7),
            0
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
            -(rightButtonPosition - windowWidth * 0.7),
            0
          )}px)`,
          visibility:
            leftSubPageVisible === false && rightButtonPosition >= 1
              ? "visible"
              : "hidden", // 두 조건 모두 만족할 때만 보이게 설정
          opacity: Math.min(rightButtonPosition / (windowWidth * 0.7), 1),
        }}
      >
        <Chat></Chat>
      </div>

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
