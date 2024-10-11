import React, { useState, useEffect } from "react";
import "../../css/imagePage.css";
import "../../css/contentPage.css";
import ImageGeneratePage from "./imageGeneratePage";
import GalleryPage from "./galleryPage";
import { motion } from "framer-motion";

export default function LeftPage({
  leftSubPageVisible,
  leftButtonPosition,
  rightSubPageVisible,
  songId,
  moveLeftButton,
}) {
  const [isImageButtonGroupVisible, setIsImageButtonGroupVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isBtLeftVisible, setIsBtLeftVisible] = useState(true); // 왼쪽 버튼 가시성 상태
  const [isBtLeftImageVisible, setIsBtLeftImageVisible] = useState(false); // 이미지 제어 버튼 가시성 상태
  const [animateLeftButton, setAnimateLeftButton] = useState(true); // 왼쪽 버튼 애니메이션 여부


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 0);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 이미지 클릭 시 왼쪽 버튼 숨기고, 이미지 버튼 보이기
  const handleImageClick = (event) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    setIsBtLeftVisible(false); // 왼쪽 버튼 숨김
    setIsBtLeftImageVisible(true); // 이미지 제어 버튼 보이기
  };

  // 페이지 클릭 시 왼쪽 버튼 다시 보이기
  const handlePageClick = () => {
    setAnimateLeftButton(false); // 애니메이션 없이 나타나도록 설정
    setIsBtLeftImageVisible(false); // 이미지 제어 버튼 숨김
    setIsBtLeftVisible(true); // 왼쪽 버튼 다시 보이기
    setIsImageButtonGroupVisible(false);
  };

  const handleButtonClick = () => {
    moveLeftButton();
    setAnimateLeftButton(true); // 버튼 이동 시 애니메이션 사용
  };

  return (
    <div onClick={handlePageClick}>
    {/* <div>  */}
      {/* 왼쪽 버튼 */}
      {isBtLeftVisible && (
        <motion.div
          animate={!isInitialLoad ? { x: leftButtonPosition } : { x: 0 }}
          transition={{ type: "spring", stiffness: 30 }}
          className={`bt-left ${rightSubPageVisible ? "fade-out" : "fade-in"}`}
          onClick={handleButtonClick}
          style={{ opacity: rightSubPageVisible ? 0 : 1 }}
        ></motion.div>
      )}

      {/* 이미지 버튼 그룹 제어 버튼 */}
      {isBtLeftImageVisible && (
        <button
          className="bt-left-image"
          style={{
            position: 'absolute', 
            left: "64.75%", 
            transform: 'translateY(-31%)', 
          }}
          onClick={(event) => {
            event.stopPropagation(); // 이벤트 버블링 방지
            setIsImageButtonGroupVisible(!isImageButtonGroupVisible);
          }}
        ></button>
      )}

      {/* 자식 컴포넌트에 handleImageClick 전달 */}
      {songId === "undefined" ? (
        <GalleryPage
          leftSubPageVisible={leftSubPageVisible}
          leftButtonPosition={leftButtonPosition}
          rightSubPageVisible={rightSubPageVisible}
          isImageButtonGroupVisible={isImageButtonGroupVisible}
          isInitialLoad={isInitialLoad}
        />
      ) : (
        <ImageGeneratePage
          leftSubPageVisible={leftSubPageVisible}
          leftButtonPosition={leftButtonPosition}
          rightSubPageVisible={rightSubPageVisible}
          isImageButtonGroupVisible={isImageButtonGroupVisible}
          isInitialLoad={isInitialLoad}
          songId={songId}
          handleImageClick={handleImageClick} // 이미지 클릭 이벤트 함수 전달
        />
      )}
    </div>
  );
}

