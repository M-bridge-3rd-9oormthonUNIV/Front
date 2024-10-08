import React, { useEffect, useState } from "react";
import "../../css/contentPage.css";
import "../../components/homePage/musicLyricsApi";
import { requestOriginalLyrics, requestTranslateLyrics } from "../../components/homePage/musicLyricsApi";

export default function SubLyricsDisplay({ songId }) {
  const [lyrics, setLyrics] = useState("");

  useEffect(() => {
    const fetchLyrics = async (songId) => {
      try {
        const [original] = await Promise.all([requestOriginalLyrics(songId)]);

        console.log("원문가사 : " + original);

        // <i> 태그 제거하기 - 줄 바꿈 생겨서 제거 필요
        const removeItalicTags = (html) => {
          return html.replace(/<i>|<\/i>/g, ""); // <i> 태그를 빈 문자열로 교체
        };

        setLyrics(removeItalicTags(original));
      } catch (error) {
        console.error("Lyrics API 호출 중 오류 발생:", error);
      }
    };

    if (songId) {
      fetchLyrics(songId);
    }
  }, [songId]);

  // 가사가 없을 때
  if (lyrics === "undefined") {
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
  } // 가사 있을 때
  else
    return (
      <div className="subLyricsDisplay">
        <div className="vector-image"></div>
        <div className="sub-logo"></div>
        <div
          className="miniLyrics"
          dangerouslySetInnerHTML={{ __html: lyrics }}
        >

        </div>
      </div>
    );
}
