import React, { useEffect, useState } from "react";
import "../../css/homePage.css";
import "../../css/musicLyricsPage.css";
import Lyrics from "./lyrics";
import YoutubePlayer from "./youtubePlayer";
import RightPage from "../chatGPT-page/rightPage";
import LeftPage from "../imagePage/leftPage";
import {
  requestYoutubeUrl,
  requestTranslateLyrics,
  requestOriginalLyrics,
} from "./musicLyricsApi";

/* 홈화면 2- 검색 후 화면 */
// 완성
// 유튜브 영상 띄우기 (무한반복 o 백그라운드는 아직 미완성)
// 양 옆 버튼 드래그 페이지
// 원문 가사 띄우기
// 번역 가사 띄우기
// 가사 파트 스크롤 기능
// placeholder에 가사 제목 띄우기
// 이미지 호스팅

// 미완
// 언어 설정
// 도움말 

export default function MusicLyricsPage() {
  // 양 옆 페이지 드래그 제어
  const [leftSubPageVisible, setLeftSubPageVisible] = useState(false);
  const [rightSubPageVisible, setRightSubPageVisible] = useState(false);
  const [leftButtonPosition, setLeftButtonPosition] = useState(0);
  const [rightButtonPosition, setRightButtonPosition] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragDirection, setDragDirection] = useState(null);

  // 가사 (순서대로 원문, 번역)
  const [originalLyrics, setOriginalLyrics] = useState();
  const [translatedLyrics, setTranslatedLyrics] = useState();

  // 비디오
  const [videoUrl, setVideoUrl] = useState("");

  // 드래그 작업
  const handleDrag = (event) => {
    if (!dragging) return;

    const newPosition = event.clientX;
    const limit = window.innerWidth * 0.7;

    if (dragDirection === "left") {
      setLeftButtonPosition(Math.min(newPosition, limit));
    } else if (dragDirection === "right") {
      setRightButtonPosition(Math.min(window.innerWidth - newPosition, limit));
    }

    setLeftSubPageVisible(leftButtonPosition >= limit);
    setRightSubPageVisible(rightButtonPosition >= limit);
  };

  const handleDragStart = (direction) => {
    setDragging(true);
    setDragDirection(direction);
  };

  const handleDragEnd = () => {
    setDragging(false);
    setDragDirection(null);
  };

  // 영상 가져오고 가사 fetch (쿼리 - 가수, 제목 정보)
  const fetchAllData = async (query) => {
    try {
      const [data1, data2, data3] = await Promise.all([
        requestYoutubeUrl(query),
        requestOriginalLyrics(query),
        requestTranslateLyrics(query),
      ]);

      setVideoUrl(data1);
      setOriginalLyrics(data2);
      setTranslatedLyrics(data3);

    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // 검색을 위한 핸들러
  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.elements.search.value; // input에서 검색어를 가져옴
    
    if (query.trim()) {
      fetchAllData(query);
    }
  };

  return (
    <div
      className="main-container"
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
    >
      <div className="main-page">
        <button className="vector-image" alt="Vector"></button>

        {/* 뒷배경 */}
        <img className="background-image" alt="Background"></img>

        <div className="search-container" >
          {/* 검색창 */}
          <form className="search-box" onSubmit={handleSearch}>
            <input
              className="search"
              name="search" // input에 name 속성 추가
              placeholder="Taylor Swift - cruel summer"
              style={{ fontWeight: "700", fontSize: "15px" }}
            />
            <button type="submit" onClick={handleSearch} className="search-bt">
            </button>
          </form>

          {/* 유튜브 영상 */}
          {/* <YoutubePlayer videoUrl={videoUrl}/> */}
          {videoUrl ? <YoutubePlayer videoUrl={videoUrl} /> : <p>Loading...</p>}
        </div>

        {/* 가사 (원문, 번역) */}
        {originalLyrics && translatedLyrics ? (
          <Lyrics
            originalLyrics={originalLyrics}
            translatedLyrics={translatedLyrics}
          />
        ) : (
          <p>Loading</p>
        )}

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
