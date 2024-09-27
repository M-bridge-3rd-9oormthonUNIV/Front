import React, { useEffect, useState } from "react";
import "../../css/homePage.css";
import "../../css/musicLyricsPage.css";
import Lyrics from "./lyricsDisplay";
import YoutubePlayer from "./videoPlayer";
import RightPage from "../chatGPT-page/rightPage";
import LeftPage from "../imagePage/leftPage";
import {
  requestYoutubeUrl,
  requestTranslateLyrics,
  requestOriginalLyrics,
} from "./musicLyricsApi";
import searchMusicApi from "./searchMusicApi";

export default function MusicLyricsPage() {
  const [leftSubPageVisible, setLeftSubPageVisible] = useState(false);
  const [rightSubPageVisible, setRightSubPageVisible] = useState(false);
  const [leftButtonPosition, setLeftButtonPosition] = useState(0);
  const [rightButtonPosition, setRightButtonPosition] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragDirection, setDragDirection] = useState(null);

  const [originalLyrics, setOriginalLyrics] = useState();
  const [translatedLyrics, setTranslatedLyrics] = useState();
  const [videoUrl, setVideoUrl] = useState("");

  // 드래그 핸들러 (추후 수정 필요)
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

  // 초기 1회 fetch
  useEffect(() => {
    fetchAllData({ trackId: "dd", lang: "fdf" });
  }, []);

  // 데이터 fetch
  const fetchAllData = async ({ trackId, lang }) => {
    if (!trackId) {
      console.error("trackId가 없습니다:", trackId);
      return;
    }
    try {
      const [data1, data2, data3] = await Promise.all([
        requestYoutubeUrl(trackId),
        requestOriginalLyrics(trackId),
        requestTranslateLyrics(trackId, lang),
      ]);

      setVideoUrl(data1);
      setOriginalLyrics(data2);
      setTranslatedLyrics(data3);
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }
  };

  // 검색 후 작업 (fetch)
  const handleSearch = async (event) => {
    event.preventDefault(); // 기본 폼 제출 방지
    const query = event.target.elements.search.value; // input에서 검색어를 가져옴

    // 검색 API 호출
    const query2 = await searchMusicApi(query);

    // trackId가 없는 경우 처리
    if (!query2.trackId) {
      console.error("trackId가 없습니다:", query2);
      return;
    }

    fetchAllData(query2);
  };

  return (
    <div
      className="main-container"
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
    >
      <div className="main-page">
        <button className="vector-image" alt="Vector"></button>
        <img className="background-image" alt="Background"></img>

        <div className="search-container">
          <form className="search-box" onSubmit={handleSearch}>
            <input
              className="search"
              name="search"
              placeholder="Taylor Swift - cruel summer"
              style={{ fontWeight: "700", fontSize: "15px" }}
            />
            <button type="submit" className="search-bt"></button>
          </form>

          {/* 비디오(영상) 부분 */}
          <YoutubePlayer videoUrl={videoUrl} />
        </div>

        {/* 가사 부분 */}
        <Lyrics
          originalLyrics={originalLyrics}
          translatedLyrics={translatedLyrics}
        />

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
