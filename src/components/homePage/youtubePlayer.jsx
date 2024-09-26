// import React from "react";

// export default function YoutubePlayer({videoUrl}) {

//   return (
//     <>
//       <iframe
//         style={{ marginTop: "30px", width: "450px", height: "253px" }}
//         src={`${videoUrl}`}
//         title="YouTube video player"
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//         referrerPolicy="strict-origin-when-cross-origin"
//         allowFullScreen
//       ></iframe>
//     </>
//   );
// }

import React, { useEffect, useRef } from "react";

export default function YoutubePlayer({ videoUrl }) {
  const playerRef = useRef(null);

  useEffect(() => {
    // 유튜브 iframe API 로드
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    // API가 로드되면 실행될 함수
    window.onYouTubeIframeAPIReady = () => {
      const videoId = extractVideoId(videoUrl); // videoId 추출

      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: videoId, // 추출한 videoId 사용
        playerVars: {
          autoplay: 1, // 자동 재생
          loop: 1, // 반복 재생
          playlist: videoId, // 반복 재생을 위한 playlist
          controls: 0, // 컨트롤 숨기기
          mute: 0, // 음소거 (자동 재생을 위해 필요)
          rel: 0, // 관련 영상 숨기기
        },
        events: {
          onReady: (event) => {
            event.target.playVideo(); // 비디오 준비가 완료되면 재생
          },
        },
      });
    };

    // 컴포넌트 언마운트 시 API 제거
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoUrl]);

  // 비디오 ID를 추출하는 함수
  const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const matches = url.match(regex);
    return matches && matches[1] ? matches[1] : null;
  };

  return (
    <div>
      <div
        id="youtube-player"
        style={{ marginTop: "30px", width: "450px", height: "253px" }}
      ></div>
    </div>
  );
}
