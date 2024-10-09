import React, { useEffect, useRef,useState } from "react";
import { requestVideoId } from "./musicLyricsApi";

/* 영상 컴포넌트 (영상 api 호출) */
export default function VideoPlayer({ artist, songId }) {
  const [videoId,setVideoId]=useState();
  const playerRef = useRef(null);

  useEffect(() => {
    const fetchVideoId = async (artist, songId) => {
      const data = await requestVideoId(artist, songId);
      if (data) {
        return data;
      }
      return null; // 비디오 ID가 없을 경우 null 반환
    };
  
    const getVideoId = async () => {
      const id = await fetchVideoId(artist, songId);
      setVideoId(id); // 비디오 ID 설정
    };
  
    // (cruel summer 비디오아이디)
    //  setVideoId("ic8j13piAhQ"); 

    getVideoId(); // 함수 호출
    
  }, [artist, songId]);


  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      if (!videoId) {
        console.error("비디오 ID가 유효하지 않습니다.");
        console.log("유효하지 않은 비디오 ID:", videoId);
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
          <div className="spinner" style={{ accentColor:"pink" }}></div>
          <p>영상 불러오는 중...</p>
        </div>
      )}
    </div>
  );
}
