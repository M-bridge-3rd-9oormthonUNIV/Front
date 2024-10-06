import React from "react";
import { requestImageGenerate, requestImageShare } from "./imageControlApi";
import SubSearchDisplay from "../shared/subSearchDisplay";
import "../../css/imagePage.css";
import "../../css/contentPage.css";

const imageUrls = [
  "https://i.ibb.co/RC5zFFY/cruel-summer.jpg",
  "https://i.ibb.co/NF5nxqm/dangerously.webp",
  "https://i.ibb.co/cTnjKcg/idontthinkthatilikeher.jpg",
];

export default function GalleryPage({
  leftSubPageVisible,
  leftButtonPosition,
  rightSubPageVisible,
  handleDragStart,
  isImageButtonGroupVisible,
}) {



  return (
    <>
      {/* 왼쪽 사이드 페이지 70% */}
      <div
        className={`side-page left-side show`}
        style={{
          transform: `translateX(${Math.min(
            leftButtonPosition - window.innerWidth * 0.7,
            0
          )}px)`,
          opacity: Math.min(leftButtonPosition / (window.innerWidth * 0.7), 1),
          visibility:
            rightSubPageVisible === false && leftButtonPosition >= 0
              ? "visible"
              : "hidden", // 두 조건 모두 만족할 때만 보이게 설정
        }}
      >
        {/* 갤러리 구현 */}
        <div className="gallery">
          {imageUrls.map((url, index) => (
            <img
              key={index}
              alt={`Image ${index}`}
              src={url}
              className="image"
            />
          ))}
        </div>
      </div>

      {/* 서브 페이지 30% */}
      <div className={`sub-page left-sub ${leftSubPageVisible ? "show" : ""}`}>
        {/* <SubLyricsDisplay></SubLyricsDisplay> */}
        <SubSearchDisplay></SubSearchDisplay>

        {/* 이미지 버튼 그룹 */}
      </div>
    </>
  );
}
