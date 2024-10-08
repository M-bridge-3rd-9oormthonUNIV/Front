import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위해 사용
import "../../css/contentPage.css";
import searchMusicApi from "./searchMusicApi";
import { SubAlertModal } from "./modal";

export default function SubSearchDisplay({ direction }) {
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가
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
            console.log("API 응답 데이터:", songData);

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

  return (
    <div className="subSearchDisplay">
      <div className="vector-image"></div>
      <div className="sub-logo"></div>

      <form className="sub-search-box" onSubmit={handleSearch}>
        {/* 검색창 */}
        <input
          className="sub-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            fontSize: "25px",
          }}
        />
        <button type="submit" className="sub-search-bt"></button>
      </form>
      <SubAlertModal
        isOpen={isFormatErrorModalOpen}
        onClose={() => setIsFormatErrorModalOpen(false)}
        message={
          "형식이 올바르지 않습니다.\n '가수-제목' 또는 '가수 - 제목' 형태로 입력해 주세요."
        }
        direction={direction}
      />

      <SubAlertModal
        isOpen={isSearchPromptModalOpen}
        onClose={() => setIsSearchPromptModalOpen(false)}
        message={
          "노래를 입력하세요."
        }
        direction={direction}
      />
    </div>
  );
}
