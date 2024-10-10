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
  const [isBtLeftImageVisible, setIsBtLeftImageVisible] = useState(false); // bt-left-image 버튼 가시성 상태

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

  const handleImageClick = () => {
    setIsBtLeftVisible(false); // 왼쪽 버튼 숨김
    setIsBtLeftImageVisible(true); // bt-left-image 버튼 보이기
  };

  const handlePageClick = () => {
    setIsBtLeftVisible(true); // 왼쪽 버튼 다시 보이기
    setIsBtLeftImageVisible(false); // bt-left-image 버튼 숨김
  };

  const handleButtonClick = () => {
    moveLeftButton();
  };

  return (
    <div onClick={handlePageClick}>
      {isBtLeftVisible && (
        <motion.div
          animate={!isInitialLoad ? { x: leftButtonPosition } : { x: 0 }}
          transition={{ type: "spring", stiffness: 30 }}
          className={`bt-left ${rightSubPageVisible ? "fade-out" : "fade-in"}`}
          onClick={handleButtonClick}
          style={{ opacity: rightSubPageVisible ? 0 : 1 }}
        ></motion.div>
      )}

      {isBtLeftImageVisible && (
        <button
          className="bt-left-image"
          onClick={() => {
            // 여기서 이미지 버튼 그룹을 제어하는 동작 추가
            setIsImageButtonGroupVisible(!isImageButtonGroupVisible);
          }}
        >
        </button>
      )}

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
        />
      )}
    </div>
  );
}
