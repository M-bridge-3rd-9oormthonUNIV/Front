import React, { useState, useEffect } from "react";
import { requestImageGenerate, requestImageShare } from "./imageControlApi";
import "../../css/imagePage.css";
import "../../css/contentPage.css";
import ImageGeneratePage from "./imageGeneratePage";
import GalleryPage from "./galleryPage";

export default function LeftPage({
  leftSubPageVisible,
  leftButtonPosition,
  rightSubPageVisible,
  handleDragStart,
}) {
  const [isImageButtonGroupVisible, setIsImageButtonGroupVisible] =
    useState(false); // 버튼 그룹 보이기 상태 추가
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // 화면 너비 상태 추가

  // 화면 크기 변화를 감지하여 상태 업데이트
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleButtonClick = () => {
    // 버튼 클릭 시 이미지 버튼 그룹의 보이기 상태 토글
    setIsImageButtonGroupVisible(!isImageButtonGroupVisible);
  };

  return (
    <>
      {/* 왼쪽 버튼 */}
      <div
        className="bt-left"
        onMouseDown={() => handleDragStart("left")}
        onClick={handleButtonClick} // 클릭 이벤트 추가
        style={{
          transform: `translateX(${leftButtonPosition}px)`,
          visibility: rightSubPageVisible ? "hidden" : "visible",
        }}
      ></div>

      {/* 가짜 왼쪽 버튼 페이지(배경투명 윤곽선만 있음) */}
      <div
        className={`fake-side-page-left`}
        style={{
          transform: `translateX(${Math.min(
            leftButtonPosition - windowWidth * 0.7, // windowWidth 사용
            0
          )}px)`,
          visibility:
            rightSubPageVisible === false && leftButtonPosition >= 1
              ? "visible"
              : "hidden", // 두 조건 모두 만족할 때만 보이게 설정
        }}
      ></div>

      {/* 가짜 왼쪽 반원 버튼(shadow효과) */}
      <div
        className={`fake-ellipse-left`}
        style={{
          transform: `translateX(${Math.min(
            leftButtonPosition - windowWidth * 0.7, // windowWidth 사용
            0
          )}px)`,
          visibility:
            rightSubPageVisible === false && leftButtonPosition <= 1
              ? "visible"
              : "hidden", // 두 조건 모두 만족할 때만 보이게 설정
        }}
      ></div>

      {/* 분기 작업 필요 */}
      {/* 
      <GalleryPage
        leftSubPageVisible={leftSubPageVisible}
        leftButtonPosition={leftButtonPosition}
        rightSubPageVisible={rightSubPageVisible}
        handleDragStart={handleDragStart}
        isImageButtonGroupVisible={isImageButtonGroupVisible}
      ></GalleryPage>   */}

      <ImageGeneratePage
        leftSubPageVisible={leftSubPageVisible}
        leftButtonPosition={leftButtonPosition}
        rightSubPageVisible={rightSubPageVisible}
        handleDragStart={handleDragStart}
        isImageButtonGroupVisible={isImageButtonGroupVisible}
      ></ImageGeneratePage>
    </>
  );
}
