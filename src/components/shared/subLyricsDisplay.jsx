import React, { useEffect, useState } from "react";
import "../../css/contentPage.css";
import "../../components/homePage/musicLyricsApi";
import {
  requestOriginalLyrics,
  requestTranslateLyrics,
} from "../../components/homePage/musicLyricsApi";

export default function SubLyricsDisplay({ songId }) {
  const [lyricsPairs, setLyricsPairs] = useState([]);

  useEffect(() => {
    const fetchLyrics = async (songId) => {
      try {
        const [original, translated] = await Promise.all([
          requestOriginalLyrics(songId),
          requestTranslateLyrics(songId, "korean"),
        ]);

        console.log("원문가사 : " + original);
        console.log("번역가사 : " + translated);

        // <i> 태그 제거하기 - 줄 바꿈 생겨서 제거 필요
        const removeTags = (html) => {
          return html.replace(/<i>|<\/i>/g, ""); // <i> 태그를 빈 문자열로 교체
        };

        // <br> 태그 기준으로 나눔
        const originalLines = removeTags(original).split("<br>");        
        const translatedLines = removeTags(translated).split("<br>");

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
      } catch (error) {
        console.error("Lyrics API 호출 중 오류 발생:", error);
      }
    };

    if (songId) {
      fetchLyrics(songId);
    }
  }, [songId]);

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
        <div className="sub-logo"></div>
        <div className="miniLyrics">
          {/* 원문 가사와 번역 가사를 한 줄씩 번갈아 표시 */}
          {lyricsPairs.map((pair, index) => (
            <div key={index}>
              {/* 원문 가사 */}
              <div
                style={{ color: "white", marginBottom: "8px" }}
                dangerouslySetInnerHTML={{ __html: pair.original }}
              ></div>
              {/* 번역 가사 */}
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
