import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위해 사용
import LeftPage from "../imagePage/leftPage";
import RightPage from "../chatGPT-page/rightPage";
import searchMusicApi from "./searchMusicApi";
import LogoWithAnimation from "./logoExplanation";
import Carousel from "./carousel";
import "../../css/homePage.css";
import "../../css/contentPage.css";

/* 홈화면 1- 메인 (검색 전 화면) */
export default function HomePage() {
  const [leftSubPageVisible, setLeftSubPageVisible] = useState(false);
  const [rightSubPageVisible, setRightSubPageVisible] = useState(false);
  const [leftButtonPosition, setLeftButtonPosition] = useState(0);
  const [rightButtonPosition, setRightButtonPosition] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragDirection, setDragDirection] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const handleSearch = (e) => {
    e.preventDefault();

    // searchQuery.trim()이 빈 문자열인지 확인
    if (searchQuery.trim() === "") {
      alert("검색어를 입력하세요."); // 아무 것도 입력되지 않았을 때의 처리
    } else {
      // 가수-제목 또는 가수 - 제목 형식 확인
      const regex = /^[^\s-]+ ?- ?[^\s-]+$/; // 공백이 있을 수 있고, -로 구분된 두 단어를 요구하는 정규 표현식
      if (!regex.test(searchQuery)) {
        alert(
          "형식이 올바르지 않습니다. \n'가수-제목' 또는 '가수 - 제목' 형태로 입력해 주세요."
        ); // 형식이 맞지 않을 때의 처리
      } else {

        // searchMusicApi 호출
        // searchMusicApi(artist.trim(), title.trim()); // 트림하여 공백 제거

        navigate("/music-lyrics"); // 검색 후 MusicLyricsPage로 이동
      }
    }
  };

  // 마우스 드래그 이벤트
  const handleDrag = (event) => {
    if (dragging) {
      const newPosition = event.clientX;
      const limit = window.innerWidth * 0.7;

      if (dragDirection === "left") {
        // 왼쪽 드래그
        setLeftButtonPosition(Math.min(newPosition, limit));
      } else if (dragDirection === "right") {
        // 오른쪽 드래그
        setRightButtonPosition(
          Math.min(window.innerWidth - newPosition, limit)
        );
      }

      // 왼쪽 서브페이지 표시 여부 결정
      setLeftSubPageVisible(leftButtonPosition >= limit);

      // 오른쪽 서브페이지 표시 여부 결정
      setRightSubPageVisible(rightButtonPosition >= limit);
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


  return (
    <div
      className="main-container"
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd} // 여기서 드래그 종료 처리
    >
      <div className="main-page">
        <button className="vector-image" alt="Vector"></button>

        <div className="center">
          <LogoWithAnimation />

          <p className="title">M-BRIDGE</p>

          <form className="search-box" onSubmit={handleSearch}>
            {/* 검색창 */}
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
        </div>

        {/* 왼쪽 버튼과 이미지 생성(갤러리)화면 */}
        <LeftPage
          leftSubPageVisible={leftSubPageVisible}
          leftButtonPosition={leftButtonPosition}
          rightSubPageVisible={rightSubPageVisible}
          handleDragStart={handleDragStart}
        />

        {/* 오른쪽 버튼과 챗지피티 화면 */}
        <RightPage
          rightSubPageVisible={rightSubPageVisible}
          rightButtonPosition={rightButtonPosition}
          leftSubPageVisible={leftSubPageVisible}
          handleDragStart={handleDragStart}
        />

        <div>
        <div className="carousel-wrapper">
          <Carousel />
        </div>
        {/* 필요한 다른 내용들 */}
        </div>
      </div>
    </div>
  );
}
