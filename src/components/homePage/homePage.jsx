import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/homePage.css";
import "../../css/contentPage.css";
import LeftPage from "../imagePage/leftPage";
import RightPage from "../chatGPT-page/rightPage";
import searchMusicApi from "../shared/searchMusicApi";

export default function HomePage() {
  const [leftSubPageVisible, setLeftSubPageVisible] = useState(false);
  const [rightSubPageVisible, setRightSubPageVisible] = useState(false);
  const [leftButtonPosition, setLeftButtonPosition] = useState(0);
  const [rightButtonPosition, setRightButtonPosition] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragDirection, setDragDirection] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      alert("검색어를 입력하세요.");
    } else {
      const regex = /^[^\s-]+ ?- ?[^\s-]+$/;
      if (!regex.test(searchQuery)) {
        alert(
          "형식이 올바르지 않습니다. \n'가수-제목' 또는 '가수 - 제목' 형태로 입력해 주세요."
        );
      } else {
        // searchMusicApi 호출
        // const song = searchMusicApi("taylorswift", "cruelsummer");
        // console.log(song);
        navigate("/music-lyrics");
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
            <div className="logo" />
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
          </div>
        </>

        <LeftPage
          leftSubPageVisible={leftSubPageVisible}
          leftButtonPosition={leftButtonPosition}
          rightSubPageVisible={rightSubPageVisible}
          handleDragStart={handleDragStart}
        />

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
