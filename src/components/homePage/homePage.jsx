import React, { useState } from "react";
import "../../css/homePage.css";
import "../../css/contentPage.css";
import LeftPage from "../imagePage/leftPage";
import RightPage from "../chatGPT-page/rightPage";

// 홈 화면
// (1) 검색화면, (2) 유튜브 영상 + 가사 화면
export default function HomePage() {
  const [leftSubPageVisible, setLeftSubPageVisible] = useState(false);
  const [rightSubPageVisible, setRightSubPageVisible] = useState(false);
  const [leftButtonPosition, setLeftButtonPosition] = useState(0);
  const [rightButtonPosition, setRightButtonPosition] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragDirection, setDragDirection] = useState(null);

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
          <img // 로고
            className="logo"
            src={`${process.env.PUBLIC_URL}/Group26.png`}
            alt="Logo"
          />

          <h1 className="title">M-bridge</h1>

          <form>
            {/* 검색창 */}
            <input className="search" />
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
      </div>
    </div>
  );
}
