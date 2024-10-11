import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeftPage from "../imagePage/leftPage";
import RightPage from "../chatGPT-page/rightPage";
import LogoWithAnimation from "./logoExplanation";
import Carousel from "./carousel";
import "../../css/homePage.css";
import "../../css/contentPage.css";
import searchMusicApi from "../shared/searchMusicApi";
import { AlertModal } from "../shared/modal";
import useButtonController from "./useButtonController";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormatErrorModalOpen, setIsFormatErrorModalOpen] = useState(false);
  const [isSearchPromptModalOpen, setIsSearchPromptModalOpen] = useState(false);
  const [isHelpGuideModalOpen, setIsHelpGuideModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    leftButtonPosition,
    rightButtonPosition,
    leftSubPageVisible,
    rightSubPageVisible,
    moveButton,
  } = useButtonController(); // 사용

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      setIsSearchPromptModalOpen(true);
      return;
    }

    const regex = /^\s*([^\s-]+(?:\s+[^\s-]+)*)\s*-\s*([^\s-]+(?:\s+[^\s-]+)*)\s*$/;
    const match = searchQuery.match(regex);
    
    if (!match) {
      setIsFormatErrorModalOpen(true);
      return;
    }

    const [_, artist, song] = match;
    try {
      const songData = await searchMusicApi(artist, song);
      if (songData) {
        navigate(`/music-lyrics?songId=${songData.songId}&artist=${songData.artist}&song=${songData.title}`);
      } else {
        alert("곡을 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("API 호출 중 에러 발생:", error);
    }
  };

  return (
    <div className="main-container">
      <div className="main-page">
      <button
          className="vector-image"
          alt="도움말"
          onClick={() => setIsHelpGuideModalOpen(true)}
          style={{ zIndex: leftSubPageVisible || rightSubPageVisible ? 1 : 4 }} // z-index 조정
        />
        <div
          className="center"
          // style={{ opacity: leftSubPageVisible || rightSubPageVisible ? 0 : 1 }}
        >
          <LogoWithAnimation />
          <p className="title">M-BRIDGE</p>
          <form className="search-box" onSubmit={handleSearch}>
            <input
              className="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="가수 - 제목으로 검색해주세요"
              style={{ background: "rgba(255, 255, 255, 0.15)", fontSize: "25px" }}
            />
            <button type="submit" className="search-bt" onClick={handleSearch}/>
          </form>
          <div className="carousel-wrapper" style={{
              zIndex: leftSubPageVisible || rightSubPageVisible ? -1 : 1,
              opacity: leftSubPageVisible || rightSubPageVisible ? -1 : 1,
              
            }}>
            <Carousel />
          </div>
        </div>

        <LeftPage
          leftSubPageVisible={leftSubPageVisible}
          leftButtonPosition={leftButtonPosition}
          rightSubPageVisible={rightSubPageVisible}
          moveLeftButton={() => moveButton(true)}
          songId={"undefined"} // 실제 songId로 대체
        />

        <RightPage
          rightSubPageVisible={rightSubPageVisible}
          rightButtonPosition={rightButtonPosition}
          leftSubPageVisible={leftSubPageVisible}
          moveRightButton={() => moveButton(false)}
          songId={"undefined"} // 실제 songId로 대체
        />

        {/* 모달 팝업창 */}
        <AlertModal
          isOpen={isFormatErrorModalOpen}
          onClose={() => setIsFormatErrorModalOpen(false)}
          message={"형식이 올바르지 않습니다.\n '가수-제목' 또는 '가수 - 제목' 형태로 입력해 주세요."}
        />
        <AlertModal
          isOpen={isSearchPromptModalOpen}
          onClose={() => setIsSearchPromptModalOpen(false)}
          message={"검색어를 입력하세요."}
        />
        <AlertModal
          isOpen={isHelpGuideModalOpen}
          onClose={() => setIsHelpGuideModalOpen(false)}
          message={"현재 도움말 정보는 준비 중입니다.\n 곧 유용한 정보로 찾아뵙겠습니다."}
        />
      </div>
    </div>
  );
}
