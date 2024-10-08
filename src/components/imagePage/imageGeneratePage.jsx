import React, { useState } from "react";
import { requestImageGenerate, requestImageShare } from "./imageControlApi";
import SubLyricsDisplay from "../shared/subLyricsDisplay.jsx";
import "../../css/imagePage.css";
import "../../css/contentPage.css";
import "../../css/modal.css";
import Modal from "../shared/modal.jsx";

const imageUrl = "https://i.ibb.co/RC5zFFY/cruel-summer.jpg"

export default function ImageGeneratePage({
  leftSubPageVisible,
  leftButtonPosition,
  rightSubPageVisible,
  handleDragStart,
  isImageButtonGroupVisible,
  songId
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleButtonClick = async (message, action, successMessage, errorMessage) => {
    try {
      await action(); // 설정된 작업 수행
      setModalMessage(successMessage); // 성공 메시지 설정
    } catch (error) {
      console.error(error);
      setModalMessage(errorMessage); // 실패 메시지 설정
    } finally {
      setIsModalOpen(true); // 모달 열기
    }
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

      setModalMessage("이미지를 저장하였습니다."); // 성공 메시지
    } catch (error) {
      console.error("이미지를 다운로드할 수 없습니다:", error);
      setModalMessage("이미지를 다운로드하는 데 실패했습니다."); // 실패 메시지
    } finally {
      setIsModalOpen(true); // 모달 열기
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
            alt="생성된 이미지"
          />
        </div>
      </div>

      <div className={`sub-page left-sub ${leftSubPageVisible ? "show" : ""}`}>
        <SubLyricsDisplay songId={songId} />
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
          onClick={() => handleButtonClick("이미지를 재생성하였습니다.", requestImageGenerate, "이미지를 재생성하였습니다.", "이미지 재생성에 실패하였습니다.")}
        ></button>
        <button
          className={`image-bt ${isImageButtonGroupVisible ? "show" : ""}`}
          style={{
            backgroundImage: `url("https://i.postimg.cc/CxsZFPdW/Vector-2.png")`,
            marginLeft: "56px",
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
          onClick={() => handleButtonClick("이미지를 업로드하였습니다.", requestImageShare, "이미지를 업로드하였습니다.", "이미지 업로드에 실패하였습니다.")}
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
