import React, { useState, useEffect, useContext } from "react";
import {
  requestTranslateLyrics,
  requestOriginalLyrics,
} from "./musicLyricsApi";
import "../../css/homePage.css";
import "../../css/musicLyricsPage.css"; // CSS 스타일
import "../../css/contentPage.css";
import "../../css/loading.css";

import { MyContext } from "../shared/myContext";

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

  const {
    originalLyrics,
    setOriginalLyrics,
    translatedLyrics,
    setTranslatedLyrics,
  } = useContext(MyContext);

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
      // fetchOriginalLyrics(songId);

      setOriginalLyrics(`
      Fever dream high in the quiet of the night<br>
You know that I caught it (Oh yeah, you're right, I want it)<br>
Bad, bad boy, shiny toy with a price<br>
You know that I bought it (Oh yeah, you're right, I want it)<br>
Killing me slow, out the window<br>
I'm always waiting for you to be waiting below<br>
Devils roll the dice, angels roll their eyes<br>
What doesn't kill me makes me want you more<br>
And it's new, the shape of your body<br>
It's blue, the feeling I've got<br>
And it's ooh, whoa oh<br>
It's a cruel summer<br>
It's cool, that's what I tell 'em<br>
No rules in breakable heaven<br>
But ooh, whoa oh<br>
It's a cruel summer<br>
With you<br>
Hang your head low in the glow of the vending machine<br>
I'm not dying (Oh yeah, you're right, I want it)<br>
We say that we'll just screw it up in these trying times<br>
We're not trying (Oh yeah, you're right, I want it)<br>
So cut the headlights, summer's a knife<br>
I'm always waiting for you just to cut to the bone<br>
Devils roll the dice, angels roll their eyes<br>
And if I bleed, you'll be the last to know<br>
Oh, it's new, the shape of your body<br>
It's blue, the feeling I've got<br>
And it's ooh, whoa oh<br>
It's a cruel summer<br>
It's cool, that's what I tell 'em<br>
No rules in breakable heaven<br>
But ooh, whoa oh<br>
It's a cruel summer<br>
With you<br>
I'm drunk in the back of the car<br>
And I cried like a baby coming home from the bar (Oh)<br>
Said, "I'm fine," but it wasn't true<br>
I don't wanna keep secrets just to keep you<br>
And I snuck in through the garden gate<br>
Every night that summer just to seal my fate<br>
And I scream, "For whatever it's worth<br>
I love you, ain't that the worst thing you ever heard?"<br>
He looks up, grinning like a devil<br>
It's new, the shape of your body<br>
It's blue, the feeling I've got<br>
And it's ooh, whoa oh<br>
It's a cruel summer<br>
It's cool, that's what I tell 'em<br>
No rules in breakable heaven<br>
But ooh, whoa oh<br>
It's a cruel summer<br>
With you<br>
I'm drunk in the back of the car<br>
And I cried like a baby coming home from the bar<br>
Said, "I'm fine," but it wasn't true<br>
I don't wanna keep secrets just to keep you<br>
And I snuck in through the garden gate<br>
Every night that summer just to seal my fate<br>
And I scream, "For whatever it's worth<br>
I love you, ain't that the worst thing you ever heard?"<br>`);

setOriginalLoading(false); // 데이터 요청 완료 후 로딩 상태 변경

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
      // fetchTranslatedLyrics(songId, selectedLanguage);

      setTranslatedLyrics(`한밤중에 뜨거운 꿈을 꿔<br>
넌 내가 그걸 잡을걸 알지(맞아, 난 그걸 원해)<br>
나쁜, 나쁜 남자, 값비싼 반짝이 장난감 같아<br>
넌 내가 그걸 산 거 알잖아 (맞아, 난 그걸 원해)<br>
천천히 죽어가, 창문 밖엔<br>
네가 아래에서 기다리고 있길 기다려<br>
악마들은 주사위를 굴리고 천사들은 눈을 굴려<br>
죽을 수 없기에 널 더 원하는 거 같아<br>
새로워 너의 몸매도<br>
우울해, 내가 느끼는 이 감정이<br>
그리고 이건<br>
잔인한 여름이야<br>
너무 잘생겼어, 내가 하는 말이야<br>
깨질 수 있는 천국에는 규칙이 없어<br>
하지만<br>
잔인한 여름이야<br>
너와 함께라서<br>
넌 자판기 빛을 피해 고개를 돌려<br>
난 죽지 않아 (맞아, 난 그걸 원해)<br>
우리는 이 가능성의 시기에도 망치겠다고 말해<br>
우린 노력 따위 안 해 (맞아, 난 그걸 원해)<br>
그러니 헤드라이트를 부숴버려 여름은 날카로워<br>
항상 네가 뼛속까지 찌르길 기다려왔어<br>
악마들은 주사위를 굴리고 천사들은 눈을 굴려<br>
그리고 내가 피를 흘리면, 넌 마지막에 알게 될 거야<br>
새로워 너의 몸매도<br>
우울해, 내가 느끼는 이 감정<br>
그리고 이건<br>
잔인한 여름이야<br>
너무 잘생겼어, 내가 하는 말이야<br>
깨질 수 있는 천국에는 규칙이 없어<br>
하지만<br>
잔인한 여름이야<br>
너와 함께라서<br>
차 뒷좌석에 취한 상태로<br>
술집에서 집으로 돌아갈 때 아이처럼 울었어<br>
널 지키기 위해 비밀을 지키고 싶지 않아<br>
"괜찮아"라고 말했지만 사실 아니었어<br>
그리고 난 정원 문을 몰래 통과해<br>
그 해 여름 매일 밤 내 운명을 봉인하기 위해<br>
그리고 난 소리쳐 "어쨌든<br>
널 좋아해, 네가 들었던 말 중에 제일 최악이지?"<br>
그는 악마처럼 히죽 웃으며 바라봐<br>
새로워 너의 몸매도<br>
우울해, 내가 느끼는 이 감정<br>
그리고 이건<br>
잔인한 여름이야<br>
너무 잘생겼어, 내가 하는 말이야<br>
깨질 수 있는 천국에는 규칙이 없어<br>
하지만<br>
잔인한 여름이야<br>
너와 함께라서<br>
차 뒷좌석에 취한 상태로<br>
술집에서 집으로 돌아갈 때 아이처럼 울었어<br>
"괜찮아"라고 말했지만 사실 아니었어<br>
널 지키기 위해 비밀을 지키고 싶지 않아<br>
그리고 난 정원 문을 몰래 통과해<br>
그 해 여름 매일 밤 내 운명을 봉인하기 위해<br>
그리고 난 소리쳐 "어쨌든<br>
널 좋아해, 네가 들었던 말 중에 제일 최악이지?<br>
  `);

  setTranslatedLoading(false); // 데이터 요청 완료 후 로딩 상태 변경

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
                  <span style={{ paddingLeft: "7px" }}>{`${
                    languages.find((lang) => lang.value === selectedLanguage)
                      ?.label
                  }`}</span>
                </button>

                {isOpen && (
                  <div className="dropdown-menu">
                    {languages.map((language) => (
                      <div
                        key={language.value}
                        className="dropdown-item"
                        onClick={(event) =>
                          handleLanguageClick(language, event)
                        } // 이벤트 전달
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
