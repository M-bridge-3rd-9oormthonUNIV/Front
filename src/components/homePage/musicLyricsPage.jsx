import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LyricsDisplay from "./lyricsDisplay";
import VideoPlayer from "./videoPlayer";
import RightPage from "../chatGPT-page/rightPage";
import LeftPage from "../imagePage/leftPage";
import searchMusicApi from "../shared/searchMusicApi";
import "../../css/homePage.css";
import "../../css/musicLyricsPage.css";
import "../../css/contentPage.css";
import { AlertModal } from "../shared/modal";

export default function MusicLyricsPage() {
  const [leftSubPageVisible, setLeftSubPageVisible] = useState(false);
  const [rightSubPageVisible, setRightSubPageVisible] = useState(false);
  const [leftButtonPosition, setLeftButtonPosition] = useState(0);
  const [rightButtonPosition, setRightButtonPosition] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragDirection, setDragDirection] = useState(null);
  // 검색
  const [searchQuery, setSearchQuery] = useState("");
  // 곡 정보
  const [artist, setArtist] = useState("");
  const [track, setTrack] = useState("");
  const [songId, setSongId] = useState("");
  // 페이지 이동
  const navigate = useNavigate();
  const location = useLocation();
  // alert 모달
  const [isFormatErrorModalOpen, setIsFormatErrorModalOpen] = useState(false);
  const [isSearchPromptModalOpen, setIsSearchPromptModalOpen] = useState(false);

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
        const inputArtist = match[1]; // 가수 이름
        const inputTrack = match[2]; // 노래 제목

        try {
          const songData = await searchMusicApi(inputArtist, inputTrack);

          if (songData) {
            console.log("API 응답 데이터:", songData);
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

  useEffect(() => {
    const limit = window.innerWidth * 0.7;
    setLeftSubPageVisible(leftButtonPosition >= limit);
    setRightSubPageVisible(rightButtonPosition >= limit);
  }, [leftButtonPosition, rightButtonPosition]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const songIdParam = queryParams.get("songId");
    const artistParam = queryParams.get("artist");
    const trackParam = queryParams.get("track");

    if (songIdParam && artistParam) {
      setSongId(songIdParam);
      setArtist(artistParam);
      setTrack(trackParam);
      setSearchQuery("");
    }
  }, [location]);

  return (
    <div
      className="main-container"
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
    >
      <div className="main-page">
        <button className="vector-image" alt="Vector"></button>
        <img className="background-image" alt="Background"></img>

        <div className="music-box">
          <div
            className="search-container"
            style={{
              opacity: leftSubPageVisible || rightSubPageVisible ? 0 : 1,
            }}
          >
            <form className="search-box" onSubmit={handleSearch}>
              <input
                className="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                name="search"
                placeholder={`${artist} - ${track}`}
              />
              <button type="submit" className="search-bt"></button>
            </form>
          </div>

          <VideoPlayer artist={artist} songId={songId} />

          <div
            style={{
              opacity: leftSubPageVisible || rightSubPageVisible ? 0 : 1,
              height: "52%",
              overflow: "hidden",
              scrollbarWidth: "none",
            }}
          >
            <LyricsDisplay songId={songId} />
          </div>
        </div>

        <LeftPage
          leftSubPageVisible={leftSubPageVisible}
          leftButtonPosition={leftButtonPosition}
          rightSubPageVisible={rightSubPageVisible}
          songId={songId}
          handleDragStart={() => handleDragStart("left")}
        />

        <RightPage
          rightSubPageVisible={rightSubPageVisible}
          rightButtonPosition={rightButtonPosition}
          leftSubPageVisible={leftSubPageVisible}
          songId={songId}
          handleDragStart={() => handleDragStart("right")}
        />
 
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
          message={"노래를 입력하세요."}
        />
      </div>
    </div>
  );
}
