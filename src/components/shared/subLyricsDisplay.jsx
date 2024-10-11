import React, { useEffect, useState, useContext } from "react";
import "../../css/contentPage.css";
import { MyContext } from "../shared/myContext";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위해 사용

export default function SubLyricsDisplay({ songId }) {
  const [lyricsPairs, setLyricsPairs] = useState([]);
  const {
    originalLyrics,
    setOriginalLyrics,
    translatedLyrics,
    setTranslatedLyrics,
    lyricsState,
    setLyricsState
  } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLyrics = () => {
      console.log("원문가사 : " + originalLyrics);
      console.log("번역가사 : " + translatedLyrics);

      // HTML 태그 제거하기
      const removeTags = (text) => {
        if (typeof text !== "string") {
          console.error("removeTags: Expected a string but received:", text);
          return ""; // 기본값을 반환
        }
        return text.replace(/<[^>]*>/g, ""); // 모든 HTML 태그 제거
      };

      // 가사를 줄 단위로 나누기 (줄바꿈 기준으로 나누기)
      const originalLines = removeTags(originalLyrics).split("\n");
      const translatedLines = removeTags(translatedLyrics).split("\n");

      // 줄 수 맞추기 (짧은 쪽에 빈 문자열 추가)
      const maxLength = Math.max(originalLines.length, translatedLines.length);
      while (originalLines.length < maxLength) {
        originalLines.push("");
      }
      while (translatedLines.length < maxLength) {
        translatedLines.push("");
      }

      // 원문과 번역을 한 줄씩 짝지어서 배열로 만들기
      const pairedLyrics = originalLines.map((line, index) => ({
        original: line,
        translated: translatedLines[index],
      }));

      setLyricsPairs(pairedLyrics);
      setLyricsState(false);
    };

    // 가사들이 모두 준비되었을 때 fetchLyrics 실행
    if (songId && originalLyrics && translatedLyrics && lyricsState) {
      fetchLyrics();
    }
  }, [lyricsState]); // lyricsState 변경 시마다 실행

  // 가사가 없을 때
  if (lyricsPairs.length === 0) {
    return (
      <div className="subLyricsDisplay">
        <div className="vector-image"></div>
        <div className="sub-logo"></div>
        <div className="miniLyrics">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "50%",
              marginBottom: "90px",
              alignItems: "center",
              textAlign: "center",
              color: "#FF00E5",
            }}
          >
            <div className="face"></div>
            <p>
              Sorry, We don't have lyrics
              <br />
              가사가 제공되지 않는 음원입니다
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="subLyricsDisplay">
        <div className="vector-image"></div>
        <div className="sub-logo" onClick={() => navigate("/")}></div>
        <div className="miniLyrics">
          {/* 원문 가사와 번역 가사를 한 줄씩 번갈아 표시 */}
          {lyricsPairs.map((pair, index) => (
            <div key={index}>
              <div style={{ color: "white", marginBottom: "8px" }}>
                {pair.original}
              </div>
              <div style={{ color: "#FF6DCC", marginBottom: "8px" }}>
                {pair.translated}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
