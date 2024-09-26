import React, { useEffect, useState } from "react";
import "../../css/homePage.css";
import "../../css/musicLyricsPage.css";
import Lyrics from "./lyrics";
import YoutubePlayer from "./youtubePlayer";

export default function MusicLyricsPage() {
  const [videoUrl, setVideoUrl] = useState(
    
    "https://youtu.be/ic8j13piAhQ?si=1JGufA9Iwe_7MDY3"
  );

  //"https://www.youtube.com/embed/ic8j13piAhQ?si=vSAWBI7rAZKOHhMK"

  // 유튜브 api 요청 코드 (/api/youtube/video)
  // useEffect를 사용해 컴포넌트가 마운트될 때 유튜브 영상 URL을 받아옴
  //   useEffect(() => {
  //     const requestYoutubeUrl = async () => {
  //       try {
  //         const response = await fetch("https://mbridge/api/youtube/video");
  //         const data = await response.json();
  //         /* 수정 */
  //         setVideoUrl(data.videoUrl);
  //       } catch (error) {
  //         console.error("Error fetching video URL:", error);
  //       }
  //     };

  //     requestYoutubeUrl(); // 컴포넌트가 렌더링되면 요청 시작
  //   }, []); // 빈 배열을 넣어 처음 마운트될 때만 실행

  return (
    <div className="main-container">
      <div className="main-page">
        {/* 수정 */}
        <button className="vector-image" alt="Vector"></button>

        {/* 뒷배경 */}
        <img className="background-image"></img>

        <div style={{display:"flex", marginTop:"30px",flexDirection:"column",justifyItems:"center", alignItems:"center"}}>
          {/* 검색창 */}
          <form className="search-box">
            <input
              className="search"
              // 수정
              placeholder="Taylor Swift - cruel summer"
              style={{ fontWeight: "700", fontSize: "15px" }}
            ></input>

            {/* api 요청 */}
            <button className="search-bt" ></button>
          </form>

          {/* 유튜브 영상 */}
          {videoUrl ? <YoutubePlayer videoUrl={videoUrl} /> : <p>Loading</p>}
        </div>

        {/* 가사 (원문, 번역) */}
        <Lyrics />
      </div>
    </div>
  );
}
