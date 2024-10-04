import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LyricsDisplay from "./lyricsDisplay";
import VideoPlayer from "./videoPlayer";
import RightPage from "../chatGPT-page/rightPage";
import LeftPage from "../imagePage/leftPage";
import {
  requestVideoUrl,
  requestTranslateLyrics,
  requestOriginalLyrics,
} from "./musicLyricsApi";
import "../../css/homePage.css";
import "../../css/musicLyricsPage.css";

/* 홈화면 2- 검색 후 화면 */

export default function MusicLyricsPage() {
  // 양 옆 페이지 드래그 제어
  const [leftSubPageVisible, setLeftSubPageVisible] = useState(false);
  const [rightSubPageVisible, setRightSubPageVisible] = useState(false);
  const [leftButtonPosition, setLeftButtonPosition] = useState(0);
  const [rightButtonPosition, setRightButtonPosition] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragDirection, setDragDirection] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // * 가사 (순서대로 원문, 번역), 비디오 링크 -> 나중에 전역변수로 수정해야할듯 (컨텍스트 api 아님 리덕스 써서..)
  const [originalLyrics, setOriginalLyrics] = useState();
  const [translatedLyrics, setTranslatedLyrics] = useState();
  const [videoUrl, setVideoUrl] = useState("");

  // * 검색 작업
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

        fetchAllData(searchQuery);
        // navigate("/music-lyrics"); // 검색 후 MusicLyricsPage로 이동
      }
    }
  };

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
  // * 추후 수정 필요.. 각 컴포넌트에 fetch 맡겨야 할 듯
  const fetchAllData = async (query) => {
    try {
      const [data1, data2, data3] = await Promise.all([
        requestVideoUrl(query),
        requestOriginalLyrics(query),
        requestTranslateLyrics(query),
      ]);

      setVideoUrl(data1);
      setOriginalLyrics(data2);
      setTranslatedLyrics(data3);

      navigate("/music-lyrics"); // 검색 후 MusicLyricsPage로 이동
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

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

        <div className="search-container">
          {/* 검색창 */}
          <form className="search-box" onSubmit={handleSearch}>
            <input
              className="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              name="search" // input에 name 속성 추가
              placeholder="Taylor Swift - cruel summer" // * 백엔드 api 완성되면 전역 변수로 변경 예정
            />
            <button
              type="submit"
              onClick={handleSearch}
              className="search-bt"
            ></button>
          </form>

          {/* 유튜브 영상 */}
          <VideoPlayer videoUrl={videoUrl} />
        </div>

        {/* 가사 (원문, 번역) */}
        <LyricsDisplay
          originalLyrics={originalLyrics}
          translatedLyrics={translatedLyrics}
        />

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
