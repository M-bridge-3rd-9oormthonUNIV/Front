import React from "react";

// 백엔드 api 비동기 요청 (api 완성될 시 수정)
// 비디오
export const requestImages = async () => {
  try {
    const response = await fetch(`https://www.m-bridge.site/api/images`);
    const data = await response.json();

    // data => { images: [{ url: String, songId: String  }] }
    return(data.images);

  } catch (error) {
    console.error("Error fetching video URL:", error);
  }
};