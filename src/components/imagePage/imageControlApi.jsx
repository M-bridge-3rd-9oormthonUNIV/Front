import React from "react";

// 백엔드 api 비동기 요청 (api 완성될 시 수정)
// 이미지 생성
// 이미지 서버에 올리기 (업로드)
export const requestImageGenerate = async ({ songId, lyrics }) => {
  try {
    const response = await fetch(
        `https://api.m-bridge.site/api/image/generate/${encodeURIComponent(songId)}`,
      {
        method: "POST", // POST 요청임을 명시
        headers: {
          "Content-Type": "application/json", // 요청 본문 데이터가 JSON임을 명시
        },
        body: JSON.stringify({
          // 요청 본문에 전송할 데이터를 JSON 형태로 변환
          lyrics: lyrics,
        }),
      }
    );

    // 요청에 대한 응답이 성공적이지 않을 경우 에러 처리
    if (!response.ok) {
      throw new Error("이미지 생성 요청 실패");
    }

    // 응답 데이터를 JSON 형식으로 변환
    const data = await response.json();
    return data.imageUrl; // 응답에서 imageUrl 반환

  } catch (error) {
    console.error("Error generating image:", error);
  }
};

// 이미지 서버에 올리기
export const requestImageShare = async ({songId, imageUrl}) => {
  try {
    const response = await fetch(`/api/image/share`, {
      method: "POST", // POST 요청임을 명시
      headers: {
        "Content-Type": "application/json", // 요청 데이터 타입을 JSON으로 설정
      },
      body: JSON.stringify({
        // 전송할 데이터를 JSON 형태로 변환
        imageUrl: imageUrl,
        songId: songId,
      }),
    });

    if (!response.ok) {
      throw new Error("이미지 공유 요청 실패");
    }

    const data = await response.json(); // 서버 응답 데이터를 JSON 형태로 파싱
    return data.success; // 성공 여부 반환
  } catch (error) {
    console.error("Error sharing image:", error);
  }
};
