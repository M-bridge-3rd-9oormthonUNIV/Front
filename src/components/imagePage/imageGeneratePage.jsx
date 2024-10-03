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
  const [confirmAction, setConfirmAction] = useState(() => () => {}); // 확인할 작업

  const handleButtonClick = (message, action) => {
    setModalMessage(message); // 메시지 설정
    setConfirmAction(() => action); // 작업 설정
    setIsModalOpen(true); // 모달 열기
  };

  const handleConfirm = () => {
    confirmAction(); // 설정된 작업 수행
    setIsModalOpen(false); // 모달 닫기
  };

  const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl, { mode: 'cors' });
      const blob = await response.blob();
      const link = document.createElement("a");
      const objectURL = URL.createObjectURL(blob);

      // URL에서 마지막 '/' 다음에 있는 파일 이름을 추출
      const fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);

      link.href = objectURL;
      link.download = fileName; // 추출한 파일 이름으로 다운로드
      document.body.appendChild(link);
      link.click(); // 링크 클릭으로 다운로드 실행
      document.body.removeChild(link); // 다운로드 후 링크 제거
      URL.revokeObjectURL(objectURL); // 메모리 해제
    } catch (error) {
      console.error("이미지를 다운로드할 수 없습니다:", error);
    }
  };

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
          opacity: Math.min((leftButtonPosition / (window.innerWidth * 0.7)), 1),
        // opacity: 1,

          visibility:
            rightSubPageVisible === false && leftButtonPosition >= 0
              ? "visible"
              : "hidden", // 두 조건 모두 만족할 때만 보이게 설정
        }}
      >
        {/* 갤러리 구현 */}
        <div className="gallery">
          <img
            className="generatedImage"
            src={"https://i.ibb.co/RC5zFFY/cruel-summer.jpg"}
            style={{ opacity: `${leftSubPageVisible ? "1" : "0"}` }}
          ></img>
        </div>
      </div>

      {/* 서브 페이지 30% */}
      <div className={`sub-page left-sub ${leftSubPageVisible ? "show" : ""}`}>
        <SubLyricsDisplay></SubLyricsDisplay>
      </div>

      {/* 이미지 버튼 그룹 */}
      <div
        className={`image-bt-group ${isImageButtonGroupVisible ? "show" : ""}`} // 버튼 그룹 보이기
        style={{
          position: "absolute",
          left: `${leftButtonPosition + 52}px`, // 라운드 버튼의 오른쪽에 위치
        }}
      >
        <button
          className={`image-bt ${isImageButtonGroupVisible ? "show" : ""}`}
          style={{
            backgroundImage: `url("https://i.postimg.cc/9QhRH5Xd/Vector-1.png")`,
          }}
          title="이미지 재생성"
          onClick={() =>
            handleButtonClick(
              "이미지를 재생성하시겠습니까?",
              requestImageGenerate
            )
          }
        ></button>
        <button
          className={`image-bt ${isImageButtonGroupVisible ? "show" : ""}`}
          style={{
            backgroundImage: `url("https://i.postimg.cc/CxsZFPdW/Vector-2.png")`,
            marginLeft: "54px",
          }}
          title="이미지 저장"
          onClick={() =>
            handleButtonClick("이미지를 저장하시겠습니까?", handleDownload(imageUrl))
          }
          // onClick하면 저장시켜야함
        ></button>
        <button
          className={`image-bt ${isImageButtonGroupVisible ? "show" : ""}`}
          style={{
            backgroundImage: `url("https://i.postimg.cc/B6XtBJN0/Vector-3.png")`,
          }}
          title="이미지 업로드"
          onClick={() =>
            handleButtonClick("이미지를 업로드하시겠습니까?", requestImageShare)
          }
        ></button>
        {/* 모달 컴포넌트 */}
      </div>
      {/* 메세지 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
        onConfirm={handleConfirm}
      />
    </>
  );
}
