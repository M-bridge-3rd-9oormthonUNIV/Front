import React, { useState } from "react";
import { requestTranslateLyrics } from "./musicLyricsApi";
import "../../css/homePage.css";
import "../../css/musicLyricsPage.css";

/* 가사 컴포넌트 (가사 호출, 표시) */
export default function LyricsDisplay({ originalLyrics, translatedLyrics }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("korean");
  const options = ["korean", "english"];

  // 언어 변경 토글
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // 옵션 클릭
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    requestTranslateLyrics("songId", option); // * 전역변수 songId 사용, 수정해야함
    setIsOpen(false); // 선택 후 드롭다운 닫기
  };

  return (
    <>
      {/* 화면 1 (가사 제공 o) */}
      {originalLyrics !== "데이터없음" && translatedLyrics !== "데이터없음" ? (
        <div className="allLyricsBox">
          <div className="lyricsBox">
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "center",
              }}
            >
              {/* 원문 가사  */}
              <div className="lyricsIcon">
                <p style={{ fontSize: "16px" }}>original</p>
              </div>
            </div>

            <div className="lyrics">{originalLyrics}</div>
          </div>

          {/* 가운데 라인 (스크롤?)*/}
          <div className="line"></div>

          {/* 번역 가사 */}
          <div className="lyricsBox">
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "center",
              }}
            >
              <div className="dropdown">
                <button
                  onClick={toggleDropdown}
                  style={{
                    display: "flex",
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    flexDirection: "row",
                    backgroundColor: "transparent",
                    outline: "none",
                    border: "none",
                    color: "white",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  <p className="arrow">⌄</p>
                  <p
                    style={{
                      position: "absolute",
                      display: "flex",
                      left: "32px",
                      top: "-13px",
                      textAlign: "center",
                    }}
                  >
                    {selectedOption}
                  </p>
                </button>

                {isOpen && (
                  <div className="dropdown-menu">
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className="dropdown-item"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="lyrics">{translatedLyrics}</div>
          </div>
        </div>
      ) : (
        <div className="allLyricsBox">
          {/* 화면 2 (가사 제공 x) */}
          <div className="lyricsBox">
            <div
              style={{
                marginTop: "50px",
                marginBottom: "90px",
                display: "flex",
                flexDirection: "column",
                justifyItems: "center",
                alignItems: "center",
                border: "none",
                outline: "none",
                color: "transparent",
                backgroundColor: "transparent",
              }}
            >
              <div className="face"></div>
              <p
                style={{
                  color: "#FF00E5",
                  textAlign: "center",
                }}
              >
                Sorry, We don't have lyrics<br></br>가사가 제공되지 않는
                음원입니다
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
