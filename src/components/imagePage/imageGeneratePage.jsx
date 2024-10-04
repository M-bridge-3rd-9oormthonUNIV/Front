import React, { useState } from "react";
import { requestImageGenerate, requestImageShare } from "./imageControlApi";
import SubLyricsDisplay from "../shared/subLyricsDisplay.jsx";
import "../../css/imagePage.css";
import "../../css/contentPage.css";
import "../../css/modal.css";
import Modal from "../shared/modal.jsx";

const imageUrls = [
  "https://i.ibb.co/RC5zFFY/cruel-summer.jpg",
  "https://i.ibb.co/NF5nxqm/dangerously.webp",
  "https://i.ibb.co/cTnjKcg/idontthinkthatilikeher.jpg",
];

const imageUrl = "https://i.ibb.co/RC5zFFY/cruel-summer.jpg"

export default function ImageGeneratePage({
  leftSubPageVisible,
  leftButtonPosition,
  rightSubPageVisible,
  handleDragStart,
  isImageButtonGroupVisible,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const [modalMessage, setModalMessage] = useState(""); // 모달 메시지

  const handleButtonClick = (message, action) => {
    action(); // 설정된 작업 수행
    setModalMessage(message); // 메시지 설정
    setIsModalOpen(true); // 모달 열기
  };

  const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl, { mode: 'cors' });
      const blob = await response.blob();
      const link = document.createElement("a");
      const objectURL = URL.createObjectURL(blob);

      const fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);

      link.href = objectURL;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectURL);

      // 이미지 저장 완료 메시지
      setModalMessage("이미지를 저장하였습니다."); // 저장 메시지
      setIsModalOpen(true); // 모달 열기
    } catch (error) {
      console.error("이미지를 다운로드할 수 없습니다:", error);
      setModalMessage("이미지를 다운로드하는 데 실패했습니다."); // 실패 메시지
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div
        className={`side-page left-side show`}
        style={{
          transform: `translateX(${Math.min(
            leftButtonPosition - window.innerWidth * 0.7,
            0
          )}px)`,
          opacity: Math.min((leftButtonPosition / (window.innerWidth * 0.7)), 1),
          visibility:
            rightSubPageVisible === false && leftButtonPosition >= 0
              ? "visible"
              : "hidden",
        }}
      >
        <div className="gallery">
          <img
            className="generatedImage"
            src={imageUrl}
            style={{ opacity: `${leftSubPageVisible ? "1" : "0"}` }}
          />
        </div>
      </div>

      <div className={`sub-page left-sub ${leftSubPageVisible ? "show" : ""}`}>
        <SubLyricsDisplay />
      </div>

      <div
        className={`image-bt-group ${isImageButtonGroupVisible ? "show" : ""}`}
        style={{
          position: "absolute",
          left: `${leftButtonPosition + 52}px`,
        }}
      >
        <button
          className={`image-bt ${isImageButtonGroupVisible ? "show" : ""}`}
          style={{
            backgroundImage: `url("https://i.postimg.cc/9QhRH5Xd/Vector-1.png")`,
          }}
          title="이미지 재생성"
          onClick={() => requestImageGenerate()}
        ></button>
        <button
          className={`image-bt ${isImageButtonGroupVisible ? "show" : ""}`}
          style={{
            backgroundImage: `url("https://i.postimg.cc/CxsZFPdW/Vector-2.png")`,
            marginLeft: "54px",
          }}
          title="이미지 저장"
          onClick={() => handleDownload(imageUrl)} // 바로 다운로드 함수 호출
        ></button>
        <button
          className={`image-bt ${isImageButtonGroupVisible ? "show" : ""}`}
          style={{
            backgroundImage: `url("https://i.postimg.cc/B6XtBJN0/Vector-3.png")`,
          }}
          title="이미지 업로드"
          onClick={() => handleButtonClick("이미지를 업로드하였습니다", requestImageShare)}
        ></button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
    </>
  );
}
