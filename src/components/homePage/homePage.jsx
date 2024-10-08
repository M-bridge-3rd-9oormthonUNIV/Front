import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위해 사용
import LeftPage from "../imagePage/leftPage";
import RightPage from "../chatGPT-page/rightPage";
import LogoWithAnimation from "./logoExplanation";
import Carousel from "./carousel";
import "../../css/homePage.css";
import "../../css/contentPage.css";
import searchMusicApi from "../shared/searchMusicApi";
import { AlertModal } from "../shared/modal";

export default function HomePage() {
  const [leftSubPageVisible, setLeftSubPageVisible] = useState(false);
  const [rightSubPageVisible, setRightSubPageVisible] = useState(false);
  const [leftButtonPosition, setLeftButtonPosition] = useState(0);
  const [rightButtonPosition, setRightButtonPosition] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragDirection, setDragDirection] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormatErrorModalOpen, setIsFormatErrorModalOpen] = useState(false);
  const [isSearchPromptModalOpen, setIsSearchPromptModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchQuery.trim() === "") {
      setIsSearchPromptModalOpen(true);
    } else {
      // 정규 표현식 수정
      const regex =
        /^\s*([^\s-]+(?:\s+[^\s-]+)*)\s*-\s*([^\s-]+(?:\s+[^\s-]+)*)\s*$/;
      const match = searchQuery.match(regex);

      if (!match) {
        setIsFormatErrorModalOpen(true);
      } else {
        const artist = match[1]; // 가수 이름
        const track = match[2]; // 노래 제목

        try {
          // API 호출 부분 주석 해제 및 매개변수 전달
          const songData = await searchMusicApi(artist, track);

          // songData가 정상적으로 반환되었는지 확인
          if (songData) {
            // 여기서 필요한 추가 작업 수행 (예: 페이지 이동)
            navigate(
              `/music-lyrics?songId=${songData.songId}&artist=${songData.artist}&track=${songData.title}`
            );
          } else {
            alert("곡을 찾을 수 없습니다.");
          }
        } catch (error) {
          console.error("API 호출 중 에러 발생:", error);
        }
      }
    }
  };

  const handleDrag = (event) => {
    if (dragging) {
      const newPosition = event.clientX;
      const limit = window.innerWidth * 0.7;

      if (dragDirection === "left") {
        setLeftButtonPosition(Math.min(newPosition, limit));
      } else if (dragDirection === "right") {
        setRightButtonPosition(
          Math.min(window.innerWidth - newPosition, limit)
        );
      }
    }
  };

  const handleDragStart = (direction) => {
    setDragging(true);
    setDragDirection(direction);
  };

  const handleDragEnd = () => {
    setDragging(false);
    setDragDirection(null);
  };

  // leftButtonPosition과 rightButtonPosition에 따라 서브페이지 표시 여부를 결정하는 로직
  useEffect(() => {
    const limit = window.innerWidth * 0.7;
    setLeftSubPageVisible(leftButtonPosition >= limit);
    setRightSubPageVisible(rightButtonPosition >= limit);
  }, [leftButtonPosition, rightButtonPosition]);

  return (
    <div
      className="main-container"
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
    >
      <div className="main-page">
        <>
          <button className="vector-image" alt="Vector"></button>
          <div
            className="center"
            style={{
              opacity: leftSubPageVisible || rightSubPageVisible ? 0 : 1,
            }}
          >
            <LogoWithAnimation />
            <p className="title">M-BRIDGE</p>
            <form className="search-box" onSubmit={handleSearch}>
              <input
                className="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="가수 - 제목으로 검색해주세요"
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  fontSize: "25px",
                }}
              />
              <button type="submit" className="search-bt"></button>
            </form>
            <div className="carousel-wrapper">
              <Carousel />
            </div>
          </div>
        </>

        <LeftPage
          leftSubPageVisible={leftSubPageVisible}
          leftButtonPosition={leftButtonPosition}
          rightSubPageVisible={rightSubPageVisible}
          songId={"undefined"}
          handleDragStart={handleDragStart}
        />

        <RightPage
          rightSubPageVisible={rightSubPageVisible}
          rightButtonPosition={rightButtonPosition}
          leftSubPageVisible={leftSubPageVisible}
          songId={"undefined"}
          handleDragStart={handleDragStart}
        />

        {/* 모달 팝업창 */}
        <AlertModal
          isOpen={isFormatErrorModalOpen}
          onClose={() => setIsFormatErrorModalOpen(false)}
          message={
            "형식이 올바르지 않습니다.\n '가수-제목' 또는 '가수 - 제목' 형태로 입력해 주세요."
          }
        />

        <AlertModal
          isOpen={isSearchPromptModalOpen}
          onClose={() => setIsSearchPromptModalOpen(false)}
          message={"검색어를 입력하세요."}
        />
      </div>
    </div>
  );
}
