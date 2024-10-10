import React, { useState, useEffect } from "react";
import "../../css/imagePage.css";
import "../../css/contentPage.css";
import SubSearchDisplay from "../shared/subSearchDisplay";
import { motion } from "framer-motion";
import Chat from "./chatPage";

export default function RightPage({
  rightSubPageVisible,
  rightButtonPosition,
  leftSubPageVisible,
  songId,
  moveRightButton,
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // 로딩 상태 추가
  const [shouldAnimateSubPage, setShouldAnimateSubPage] = useState(false); // 서브 페이지 애니메이션 상태


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    
    // 처음 로드 후 상태 업데이트
    const timer = setTimeout(() => {
      setIsInitialLoad(false); // 초기 로드 상태를 false로 변경
    }, 0);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleButtonClick = () => {
    moveRightButton(); // 부모에서 전달된 함수 호출
  };

  // 사이드 페이지 애니메이션이 끝났을 때 서브 페이지 애니메이션 시작
  useEffect(() => {
    if (!isInitialLoad) {
      const timer = setTimeout(() => {
        setShouldAnimateSubPage(true); // 서브 페이지 애니메이션 시작
      },1000); // 0.3초 지연 후 서브 페이지 애니메이션 시작

      return () => clearTimeout(timer);
    }
  }, [isInitialLoad]);

  return (
    <>
      {/* 오른쪽 버튼 */}
      <motion.div
        animate={!isInitialLoad ? { x: -rightButtonPosition } : { x: 0 }} // 로딩 상태에 따라 애니메이션 다르게 적용
        transition={{ type: "spring", stiffness: 30 }} // 스프링 애니메이션 설정
        className={`bt-right ${leftSubPageVisible ? "fade-out" : "fade-in"}`}
        onClick={handleButtonClick} // 클릭 이벤트 추가
        style={{
          // visibility는 사용하지 않음
          opacity: leftSubPageVisible ? 0:1,
        }}
      ></motion.div>

      {/* 가짜 왼쪽 반원 버튼 (shadow효과) */}
      {/* <div
        className={`fake-ellipse-right`}
        style={{
          transform: `translateX(${Math.max(
            windowWidth * 0.7 - rightButtonPosition,
            0
          )}px)`,
          visibility:
            leftSubPageVisible === false && rightButtonPosition <= 1
              ? "visible"
              : "hidden",
        }}
      ></div> */}

      {/* 오른쪽 사이드 페이지 70% */}
      <motion.div
        className={`side-page right-side show ${leftSubPageVisible ? "fade-out" : "fade-in"}`}
        style={{
              opacity:
            leftSubPageVisible === false && rightButtonPosition >= 0
              ? 1
              : 0,
        }}
        animate={!isInitialLoad ? { x: Math.max(-(rightButtonPosition - windowWidth * 0.7), 0) } : { x: 0 }} // rightButtonPosition에 따라 x 값 애니메이션
        transition={{ type: "spring", stiffness: 30 }} // 스프링 애니메이션 설정
      ><Chat></Chat></motion.div>

      {/* 서브 페이지 30% */}
      <motion.div
        className={`sub-page right-sub ${rightSubPageVisible ? "show" : ""}`}
        animate={
          shouldAnimateSubPage // 서브 페이지 애니메이션 상태 확인
            ? {
                x: Math.min(
                  rightButtonPosition - windowWidth * 0.7 + windowWidth * 0.3,
                  0
                ),
              }
            : { x: 0 }
        } 
        transition={{ type: "spring", stiffness: 30 }} // 스프링 애니메이션 설정
      >
        <SubSearchDisplay direction={"right"} />
      </motion.div>
    </>
  );
}