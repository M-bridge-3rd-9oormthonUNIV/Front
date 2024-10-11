import React, { useEffect, useState, useContext } from "react";
import SubSearchDisplay from "../shared/subSearchDisplay";
import { requestImages } from "./imageDisplayApi"; // API 요청 함수
import "../../css/imagePage.css";
import "../../css/contentPage.css";
import { AlertModal } from "../shared/modal.jsx";
import { motion } from "framer-motion";
import { MyContext } from "../shared/myContext";

export default function GalleryPage({
  leftSubPageVisible,
  leftButtonPosition,
  rightSubPageVisible,
  handleDragStart,
  isImageButtonGroupVisible,
  isInitialLoad,
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [imageUrls, setImageUrls] = useState([]); // 이미지 URL 상태 관리
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  const [shouldAnimateSubPage, setShouldAnimateSubPage] = useState(false); // 서브 페이지 애니메이션 상태
  const [isHelpGuideModalOpen, setIsHelpGuideModalOpen] = useState(false);
  const { galleryImageUrl, setGalleryImageUrl } = useContext(MyContext);

  // 이미지 가져오기 함수
  const fetchImages = async () => {
    setLoading(true); // 로딩 시작
    try {
      const images = await requestImages(); // 이미지 API 호출
      const urls = images.map((image) => image.url); // 이미지 URL 추출
      setImageUrls(urls); // 상태 업데이트
    } catch (error) {
      console.error("이미지 로드 중 오류 발생:", error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  // 컴포넌트가 마운트될 때 이미지 가져오기
  useEffect(() => {
    // fetchImages();
  }, [galleryImageUrl]);

  // 사이드 페이지 애니메이션이 끝났을 때 서브 페이지 애니메이션 시작
  useEffect(() => {
    if (!isInitialLoad) {
      const timer = setTimeout(() => {
        setShouldAnimateSubPage(true); // 서브 페이지 애니메이션 시작
      }, 1000); // 0.3초 지연 후 서브 페이지 애니메이션 시작

      return () => clearTimeout(timer);
    }
  }, [isInitialLoad]);

  return (
    <>
      {/* 왼쪽 사이드 페이지 70% */}
      <motion.div
        className={`side-page left-side show ${
          rightSubPageVisible ? "fade-out" : "fade-in"
        }`}
        animate={
          !isInitialLoad
            ? { x: Math.min(leftButtonPosition - windowWidth * 0.7, 0) }
            : { x: 0 }
        } // leftButtonPosition에 따라 x 값 애니메이션
        transition={{ type: "spring", stiffness: 30 }} // 스프링 애니메이션 설정
        style={{
          opacity:
            rightSubPageVisible === false && leftButtonPosition >= 0 ? 1 : 0, // 두 조건 모두 만족할 때만 보이게 설정
        }}
      >
        <div
          className="vector-image-left"
          onClick={() => setIsHelpGuideModalOpen(true)}
        ></div>

        {/* 갤러리 구현 */}
        <div className="gallery">
          {loading ? ( // 로딩 중일 때 스피너 표시
            <div className="loading-container">
              <div className="spinner"></div>
              <p>이미지를 불러오는 중...</p>
            </div>
          ) : (
            // imageUrls.map((url, index) => (
            //   <img
            //     key={index}
            //     alt={`Image ${index}`}
            //     src={url}
            //     className="image"
            //   />
            // ))
            galleryImageUrl && ( // galleryImageUrl 값이 있을 때만 이미지 표시
              <img className="image" src={galleryImageUrl} alt="Gallery" />
            )
          )}
        </div>
      </motion.div>

      {/* 서브 페이지 30% */}
      <motion.div
        className={`sub-page left-sub ${leftSubPageVisible ? "show" : ""}`}
        animate={
          shouldAnimateSubPage // 서브 페이지 애니메이션 상태 확인
            ? {
                x: -Math.min(
                  leftButtonPosition - windowWidth * 0.7 + windowWidth * 0.3,
                  0
                ),
              }
            : { x: 0 }
        } // leftButtonPosition에 따라 x 값 애니메이션
        transition={{ type: "spring", stiffness: 30 }} // 스프링 애니메이션 설정
      >
        <SubSearchDisplay direction={"left"} />

<AlertModal
          isOpen={isHelpGuideModalOpen}
          onClose={() => setIsHelpGuideModalOpen(false)}
          message={"현재 도움말 정보는 준비 중입니다.\n 곧 유용한 정보로 찾아뵙겠습니다."}
        />
      </motion.div>
    </>
  );
}
