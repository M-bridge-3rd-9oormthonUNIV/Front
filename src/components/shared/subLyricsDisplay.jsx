import React, { useEffect, useState, useContext } from "react";
import "../../css/contentPage.css";
import "../../components/homePage/musicLyricsApi";
import { MyContext } from "../shared/myContext";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위해 사용

export default function SubLyricsDisplay({ songId }) {
  const [lyricsPairs, setLyricsPairs] = useState([]);
  const {
    originalLyrics,
    setOriginalLyrics,
    translatedLyrics,
    setTranslatedLyrics,
  } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLyrics = () => {
      console.log("원문가사 : " + originalLyrics);
      console.log("번역가사 : " + translatedLyrics);

      // <i> 태그 제거하기 - 줄 바꿈 생겨서 제거 필요
      const removeTags = (text) => {
        if (typeof text !== "string") {
          console.error("removeTags: Expected a string but received:", text);
          return ""; // 또는 기본값을 반환
        }
        return text.replace(/<[^>]*>/g, ""); // HTML 태그 제거
      };

      // <br> 태그 기준으로 나눔
      const originalLines = removeTags(originalLyrics).split("<br>");
      const translatedLines = removeTags(translatedLyrics).split("<br>");

      // 줄 수 맞추기 (짧은 쪽에 빈 문자열 추가)
      const maxLength = Math.max(originalLines.length, translatedLines.length);
      while (originalLines.length < maxLength) {
        originalLines.push("");
      }
      while (translatedLines.length < maxLength) {
        translatedLines.push("");
      }

      // 원문과 번역 한 줄씩 묶어서 배열로 만듦
      const pairedLyrics = originalLines.map((line, index) => ({
        original: line,
        translated: translatedLines[index],
      }));

      setLyricsPairs(pairedLyrics);
    };

    // // 둘 다 변경될 때만 fetchLyrics 호출
    if (songId && originalLyrics && translatedLyrics) {
      fetchLyrics();
    }
  }, [songId, originalLyrics, translatedLyrics]); // 의존성 배열에 originalLyrics와 translatedLyrics 추가

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
              <div
                style={{ color: "white", marginBottom: "8px" }}
                dangerouslySetInnerHTML={{ __html: pair.original }}
              ></div>
              <div
                style={{ color: "#FF6DCC", marginBottom: "8px" }}
                dangerouslySetInnerHTML={{ __html: pair.translated }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
