import React, { useEffect, useRef } from "react";

/* 영상 컴포넌트 (영상 api 호출) */
export default function YoutubePlayer({ videoUrl }) {
  const playerRef = useRef(null);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      const videoId = extractVideoId(videoUrl);

      if (!videoId) {
        console.error("비디오 ID가 유효하지 않습니다.");
        return;
      }

      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: videoId,
          controls: 0,
          mute: 0,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
          },
          onError: (event) => {
            console.error("유튜브 플레이어 오류:", event.data);
          },
        },
      });
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoUrl]);

  // 비디오 ID를 추출하는 함수
  const extractVideoId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const matches = url.match(regex);
    return matches && matches[1] ? matches[1] : null;
  };

  return (
    <div>
      {videoUrl ? (
        <div
          id="youtube-player"
          style={{ marginTop: "30px", width: "450px", height: "253px" }}
        ></div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
