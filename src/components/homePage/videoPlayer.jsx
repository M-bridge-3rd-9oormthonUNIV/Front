import React, { useEffect, useRef, useState } from "react";
import { requestVideoId } from "./musicLyricsApi";

/* 영상 컴포넌트 (영상 api 호출) */
export default function VideoPlayer({ artist, song }) {
  const [videoId, setVideoId] = useState(null);
  const playerRef = useRef(null);

  // videoId 가져오는 부분
  useEffect(() => {
    const fetchVideoId = async () => {
      console.log("비디오 아티스트, 노래:"+ artist, song)
      const data = await requestVideoId(artist, song);
      setVideoId(data || null);  // 비디오 ID 설정
    };

    fetchVideoId();  // 함수 호출
  }, [artist, song]);

  // YouTube IFrame API 로드 및 비디오 플레이어 초기화
  useEffect(() => {
    const loadYouTubeIframeAPI = () => {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    };

    // API가 이미 로드되었는지 확인하고, 안 됐으면 로드
    if (!window.YT) {
      loadYouTubeIframeAPI();
    } else if (videoId) {
      // videoId가 준비되면 플레이어 생성
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
    }

    // API 로드 후 호출되는 함수 설정
    window.onYouTubeIframeAPIReady = () => {
      if (videoId) {
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
      }
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  return (
    <div>
      {videoId ? (
        <div
          id="youtube-player"
          style={{ marginTop: "30px", width: "450px", height: "253px" }}
        ></div>
      ) : (
        <div className="loading-container">
          <div className="spinner" style={{ accentColor: "pink" }}></div>
          <p>영상 불러오는 중...</p>
        </div>
      )}
    </div>
  );
}
