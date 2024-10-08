import React, { useEffect, useState } from "react";
import SubSearchDisplay from "../shared/subSearchDisplay";
import { requestImages } from "./imageDisplayApi"; // API 요청 함수
import "../../css/imagePage.css";
import "../../css/contentPage.css";

export default function GalleryPage({
  leftSubPageVisible,
  leftButtonPosition,
  rightSubPageVisible,
  handleDragStart,
  isImageButtonGroupVisible,
}) {
  const [imageUrls, setImageUrls] = useState([]); // 이미지 URL 상태 관리
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

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
    fetchImages();
  }, []);

  return (
    <>
      {/* 왼쪽 사이드 페이지 70% */}
      <div
        className={`side-page left-side show`}
        style={{
          transform: `translateX(${Math.min(
            leftButtonPosition - window.innerWidth * 0.7,
            0
          )}px)`,
          opacity: Math.min(leftButtonPosition / (window.innerWidth * 0.7), 1),
          visibility:
            rightSubPageVisible === false && leftButtonPosition >= 0
              ? "visible"
              : "hidden", // 두 조건 모두 만족할 때만 보이게 설정
        }}
      >
        {/* 갤러리 구현 */}
        <div className="gallery">
          {loading ? ( // 로딩 중일 때 스피너 표시
            <div className="loading-container">
              <div className="spinner"></div>
              <p>이미지를 불러오는 중...</p>
            </div>
          ) : (
            imageUrls.map((url, index) => (
              <image
                key={index}
                alt={`Image ${index}`}
                src={url}
                className="image"
              />
            ))
          )}
        </div>
      </div>

      {/* 서브 페이지 30% */}
      <div className={`sub-page left-sub ${leftSubPageVisible ? "show" : ""}`}>
        <SubSearchDisplay direction={"left"}/>
        {/* 이미지 버튼 그룹 */}
      </div>
    </>
  );
}