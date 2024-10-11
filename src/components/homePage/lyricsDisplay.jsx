import React, { useState, useEffect, useContext } from "react";
import {
  requestTranslateLyrics,
  requestOriginalLyrics,
} from "./musicLyricsApi";
import "../../css/homePage.css";
import "../../css/musicLyricsPage.css"; // CSS 스타일
import "../../css/contentPage.css";
import "../../css/loading.css";

import {MyContext} from "../shared/myContext"


export default function LyricsDisplay({ songId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ko"); // 변경된 부분
  const languages = [
    { label: "Korean", value: "ko" },
    { label: "Japanese", value: "ja" },
    { label: "Chinese", value: "zh" },
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "Spanish", value: "es" },
    { label: "Norwegian", value: "no" },
    { label: "Russian", value: "ru" },
    { label: "Hindi", value: "hi" },
  ];

  const { originalLyrics,setOriginalLyrics,translatedLyrics,setTranslatedLyrics } = useContext(MyContext);


  // const [originalLyrics, setOriginalLyrics] = useState();
  // const [translatedLyrics, setTranslatedLyrics] = useState();
  const [originalLoading, setOriginalLoading] = useState(true); // 로딩 상태 추가
  const [translatedLoading, setTranslatedLoading] = useState(true); // 로딩 상태 추가

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    console.log("드롭다운 토글됨: ", !isOpen); // 드롭다운 상태 확인
  };

  const handleLanguageClick = (language, event) => {
    event.stopPropagation(); // 이벤트 전파 방지
    console.log("선택된 언어:", language.label); // 선택된 옵션 로그
    setSelectedLanguage(language.value); // 언어 코드 사용
    setIsOpen(false);
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".dropdown")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // 원문 가사 가져오기
  useEffect(() => {
    const fetchOriginalLyrics = async (songId) => {
      setOriginalLoading(true); // 데이터 요청 시작 시 로딩 상태 변경
      try {
        const original = await requestOriginalLyrics(songId);

        const removeItalicTags = (html) => {
          return html.replace(/<i>|<\/i>/g, "");
        };

        console.log("원문 가사 : " + original);
        setOriginalLyrics(removeItalicTags(original));
      } catch (error) {
        console.error("원본 가사 API 호출 중 오류 발생:", error);
      } finally {
        setOriginalLoading(false); // 데이터 요청 완료 후 로딩 상태 변경
      }
    };

    if (songId) {
      fetchOriginalLyrics(songId);
    }
  }, [songId]);

  // 번역 가사 가져오기
  useEffect(() => {
    const fetchTranslatedLyrics = async (songId, lang) => {
      setTranslatedLoading(true); // 데이터 요청 시작 시 로딩 상태 변경
      try {
        const translated = await requestTranslateLyrics(songId, lang);

        const removeItalicTags = (html) => {
          return html.replace(/<i>|<\/i>/g, "");
        };

        console.log("번역가사 : " + translated);
        setTranslatedLyrics(removeItalicTags(translated));
      } catch (error) {
        console.error("번역 가사 API 호출 중 오류 발생:", error);
      } finally {
        setTranslatedLoading(false); // 데이터 요청 완료 후 로딩 상태 변경
      }
    };

    if (songId) {
      fetchTranslatedLyrics(songId, selectedLanguage);
    }
  }, [songId, selectedLanguage]);

  // 둘 다 로딩 중일 때
  if (translatedLoading && originalLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>가사 불러오는 중...</p>
      </div>
    );
  }

  if (originalLyrics === "Could not fetch lyrics.") {
    return (
      <div className="allLyricsBox">
        <div className="lyricsBox">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "50px",
              marginBottom: "90px",
              alignItems: "center",
              textAlign: "center",
              color: "#FF00E5",
            }}
          >
            <div className="face"></div>
            <p>
              Sorry, We don't have lyrics
              <br />
              가사가 제공되지 않는 음원입니다
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="allLyricsBox">
        <div className="lyricsBox">
          {originalLoading ? ( // originalLoading 상태에 따라 조건부 렌더링
            <div className="loading-container">
              <div className="spinner"></div>
              <p>원본 가사 불러오는 중...</p>
            </div>
          ) : (
            <>
              <div className="lyricsIcon">original</div>
              <div
                className="lyrics"
                dangerouslySetInnerHTML={{ __html: originalLyrics }}
              />
            </>
          )}
        </div>

        <div className="line"></div>

        <div className="lyricsBox">
          {translatedLoading ? ( // translatedLoading 상태에 따라 조건부 렌더링
            <div className="loading-container">
              <div className="spinner"></div>
              <p>번역 가사 불러오는 중...</p>
            </div>
          ) : (
            <>
              <div className="dropdown">
                <button onClick={toggleDropdown} className="dropdown">
                  <span className="arrow">⌄</span>
                  <span
                    style={{ paddingLeft: "7px" }}
                  >{`${languages.find((lang) => lang.value === selectedLanguage)?.label}`}</span>
                </button>

                {isOpen && (
                  <div className="dropdown-menu">
                    {languages.map((language) => (
                      <div
                        key={language.value}
                        className="dropdown-item"
                        onClick={(event) => handleLanguageClick(language, event)} // 이벤트 전달
                      >
                        {language.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div
                className="lyrics"
                dangerouslySetInnerHTML={{ __html: translatedLyrics }}
              />
            </>
          )}
        </div>
      </div>
    );
  }
}
