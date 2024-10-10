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
import useButtonController from "./useButtonController";

export default function MusicLyricsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [songId, setSongId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // 버튼 컨트롤 훅 사용
  const {
    leftButtonPosition,
    rightButtonPosition,
    leftSubPageVisible,
    rightSubPageVisible,
    moveButton,
  } = useButtonController(); // 사용

  // alert 모달
  const [isFormatErrorModalOpen, setIsFormatErrorModalOpen] = useState(false);
  const [isSearchPromptModalOpen, setIsSearchPromptModalOpen] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchQuery.trim() === "") {
      setIsSearchPromptModalOpen(true);
    } else {
      const regex =
        /^\s*([^\s-]+(?:\s+[^\s-]+)*)\s*-\s*([^\s-]+(?:\s+[^\s-]+)*)\s*$/;
      const match = searchQuery.match(regex);

      if (!match) {
        setIsFormatErrorModalOpen(true);
      } else {
        const artist = match[1]; // 가수 이름
        const song = match[2]; // 노래 제목

        try {
          const songData = await searchMusicApi(artist, song);

          if (songData) {
            navigate(
              `/music-lyrics?songId=${songData.songId}&artist=${songData.artist}&song=${songData.title}`
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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const songIdParam = queryParams.get("songId");
    const artistParam = queryParams.get("artist");
    const songParam = queryParams.get("song");

    if (songIdParam && artistParam) {
      setSongId(songIdParam);
      setArtist(artistParam);
      setSong(songParam);
      setSearchQuery("");
    }
  }, [location]);

  return (
    <div className="main-container">
      <div className="main-page">
        <button className="vector-image" alt="Vector"></button>
        <img className="background-image" alt="Background"></img>

        <div className="music-box">
          <div
            className="search-container"
            // style={{ opacity: leftSubPageVisible || rightSubPageVisible ? 0 : 1 }}
          >
            <div className="search-logo" onClick={() => navigate('/')}></div>
            <form className="search-box" onSubmit={handleSearch}>
              <input
                className="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                name="search"
                placeholder={`${artist} - ${song}`}
              />
              <button type="submit" className="search-bt"></button>
            </form>
          </div>

          {artist!=""&&song!=""&&<VideoPlayer artist={artist} song={song} />}

          <div
            style={{
              // opacity: leftSubPageVisible || rightSubPageVisible ? 0 : 1,
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
          moveLeftButton={() => moveButton(true)} // 왼쪽 버튼 이동
        />

        <RightPage
          rightSubPageVisible={rightSubPageVisible}
          rightButtonPosition={rightButtonPosition}
          leftSubPageVisible={leftSubPageVisible}
          songId={songId}
          moveRightButton={() => moveButton(false)} // 오른쪽 버튼 이동
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
