import React, { useEffect, useState,useContext } from "react"; // useEffect 추가
import { requestImageGenerate, requestImageShare } from "./imageControlApi";
import SubLyricsDisplay from "../shared/subLyricsDisplay.jsx";
import "../../css/imagePage.css";
import "../../css/contentPage.css";
import "../../css/modal.css";
import { Modal } from "../shared/modal.jsx";
import { motion } from "framer-motion";
import { MyContext } from "../shared/myContext";

export default function ImageGeneratePage({
  leftSubPageVisible,
  leftButtonPosition,
  rightSubPageVisible,
  isImageButtonGroupVisible,
  songId,
  isInitialLoad,
  handleImageClick // 부모에서 전달받은 함수
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // imageUrl 상태 추가
  const [shouldAnimateSubPage, setShouldAnimateSubPage] = useState(false); // 서브 페이지 애니메이션 상태
  const [pinkMessage, setPinkMessage] = useState(""); // pinkMessage 상태 추가

  const {galleryImageUrl, setGalleryImageUrl} = useContext(MyContext)

  // 컴포넌트 마운트 시 이미지 생성
  useEffect(() => {
    const generateImage = async () => {
      try {
        const generatedImageUrl = await requestImageGenerate(); // 이미지 생성 요청
        setImageUrl(generatedImageUrl); // 생성된 이미지 URL 상태에 저장
      } catch (error) {
        console.error("이미지 생성 중 오류 발생:", error);
        setModalMessage("이미지 생성에 실패했습니다."); // 실패 메시지 설정
        setPinkMessage("재생성 재시도");
        setIsModalOpen(true); // 모달 열기
      }
    };

    // generateImage(); // 이미지 생성 함수 호출
    setImageUrl("https://i.postimg.cc/ZRpD2rGY/DALL-E-2024-10-11-08-36-24-A-dreamy-surreal-landscape-that-captures-the-essence-of-a-summer-night.webp")
  }, []); // 빈 배열을 의존성으로 주어 처음 마운트될 때만 실행

  const handleButtonClick = async (action, successMessage, errorMessage, retryMessage) => {
    try {
      // const result = await action(); // 설정된 작업 수행 (requestImageGenerate의 경우 반환값이 있음)
      if (action === requestImageGenerate) {
        // setImageUrl(result); // 재생성된 이미지 URL로 업데이트
      }
      else if(action === requestImageShare){
        setGalleryImageUrl("https://i.postimg.cc/ZRpD2rGY/DALL-E-2024-10-11-08-36-24-A-dreamy-surreal-landscape-that-captures-the-essence-of-a-summer-night.webp")
      }
      setModalMessage(successMessage); // 성공 메시지 설정
      setPinkMessage("닫기"); // 성공 시 닫기 버튼
    } catch (error) {
      console.error(error);
      setModalMessage(errorMessage); // 실패 메시지 설정
      setPinkMessage(retryMessage); // 실패 시 재시도 버튼
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
      setPinkMessage("닫기"); // 성공 시 닫기 버튼
    } catch (error) {
      console.error("이미지를 다운로드할 수 없습니다:", error);
      setModalMessage("이미지를 다운로드하는 데 실패했습니다."); // 실패 메시지
      setPinkMessage("저장 재시도"); // 실패 시 재시도 버튼
    } finally {
      setIsModalOpen(true); // 모달 열기
    }
  };

    // 사이드 페이지 애니메이션이 끝났을 때 서브 페이지 애니메이션 시작
    useEffect(() => {
      if (!isInitialLoad) {
        const timer = setTimeout(() => {
          setShouldAnimateSubPage(true); // 서브 페이지 애니메이션 시작
        },1000); // 0.3초 지연 후 서브 페이지 애니메이션 시작
  
        return () => clearTimeout(timer);
      }
    }, [isInitialLoad]);

  return (
    <>
      {/* 왼쪽 사이드 페이지 70% */}
      <motion.div
        className={`side-page left-side show ${rightSubPageVisible ? "fade-out" : "fade-in"}`}
        animate={
          !isInitialLoad
            ? { x: Math.min(leftButtonPosition - windowWidth * 0.7, 0) }
            : { x: 0 }
        } // leftButtonPosition에 따라 x 값 애니메이션
        transition={{ type: "spring", stiffness: 30 }} // 스프링 애니메이션 설정
        style={{
            opacity:
            rightSubPageVisible === false && leftButtonPosition >= 0
              ? 1
              : 0, // 두 조건 모두 만족할 때만 보이게 설정
        }}
      >
        <div className="gallery">
        <img 
            className="generatedImage"
            src={imageUrl} 
            style={{ opacity: `${leftSubPageVisible ? "1" : "0"}`, cursor: "pointer" }}
            alt="생성된 이미지"
            onClick={handleImageClick} // 이미지 클릭 시 부모 함수 호출
          />
        </div>
      </motion.div>

      {/* 서브 페이지 30% */}
      <motion.div
        className={`sub-page left-sub ${leftSubPageVisible ? "show" : ""}`}
        animate={
          shouldAnimateSubPage // 서브 페이지 애니메이션 상태 확인
            ? {
                x: -Math.min(
                  leftButtonPosition - windowWidth * 0.7 + windowWidth * 0.3,
                  0
                ),
              }
            : { x: 0 }
        } // leftButtonPosition에 따라 x 값 애니메이션
        transition={{ type: "spring", stiffness: 30 }} // 스프링 애니메이션 설정
      >
        <SubLyricsDisplay songId={songId} />
      </motion.div>

      <div
        className={`image-bt-group ${isImageButtonGroupVisible ? "show" : ""}`}
        style={{
          position: "absolute",
          left: `calc(${leftButtonPosition}px + 4vw)`,
        }}
      >
        <button
          className={`image-bt ${isImageButtonGroupVisible ? "show" : ""}`}
          style={{
            backgroundImage: `url("https://i.postimg.cc/9QhRH5Xd/Vector-1.png")`,
          }}
          title="이미지 재생성"
          // onClick={() => handleButtonClick(requestImageGenerate, "이미지를 재생성하였습니다.", "이미지 재생성에 실패하였습니다.", "재생성 재시도")}
          onClick={() => handleButtonClick(requestImageGenerate, "이미지를 재생성하였습니다.", "이미지를 재생성하였습니다.", "닫기")}

        ></button>
        <button
          className={`image-bt ${isImageButtonGroupVisible ? "show" : ""}`}
          style={{
            backgroundImage: `url("https://i.postimg.cc/CxsZFPdW/Vector-2.png")`,
            marginLeft: "4vw",
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
          // onClick={() => handleButtonClick(requestImageShare, "이미지를 업로드하였습니다.", "이미지 업로드에 실패하였습니다.", "업로드 재시도")}
          onClick={() => handleButtonClick(requestImageShare, "이미지를 업로드하였습니다.", "이미지를 업로드 하였습니다.", "닫기")}

        ></button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
        pinkMessage={pinkMessage} // pinkMessage 전달
      />
    </>
  );
}
