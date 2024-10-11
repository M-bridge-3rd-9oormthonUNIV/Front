import React, { useEffect, useState, useContext } from "react";
import "../../css/contentPage.css";
import "../../components/homePage/musicLyricsApi";
import { MyContext } from "../shared/myContext";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위해 사용

export default function SubLyricsDisplay({ songId }) {
  const [lyricsPairs, setLyricsPairs] = useState([]);
  const {
    originalLyrics,
    setOriginalLyrics,
    translatedLyrics,
    setTranslatedLyrics,
  } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLyrics = () => {
      console.log("원문가사 : " + originalLyrics);
      console.log("번역가사 : " + translatedLyrics);

      // <i> 태그 제거하기 - 줄 바꿈 생겨서 제거 필요
      const removeTags = (text) => {
        if (typeof text !== "string") {
          console.error("removeTags: Expected a string but received:", text);
          return ""; // 또는 기본값을 반환
        }
        return text.replace(/<[^>]*>/g, ""); // HTML 태그 제거
      };

      // <br> 태그 기준으로 나눔
      const originalLines = removeTags(originalLyrics).split("<br>");
      const translatedLines = removeTags(translatedLyrics).split("<br>");

      // 줄 수 맞추기 (짧은 쪽에 빈 문자열 추가)
      const maxLength = Math.max(originalLines.length, translatedLines.length);
      while (originalLines.length < maxLength) {
        originalLines.push("");
      }
      while (translatedLines.length < maxLength) {
        translatedLines.push("");
      }

      // 원문과 번역 한 줄씩 묶어서 배열로 만듦
      const pairedLyrics = originalLines.map((line, index) => ({
        original: line,
        translated: translatedLines[index],
      }));

      // setLyricsPairs(pairedLyrics);
      setLyricsPairs(`Fever dream high in the quiet of the night<br>
      한밤중에 뜨거운 꿈을 꿔<br>
      You know that I caught it (Oh yeah, you're right, I want it)<br>
      넌 내가 그걸 잡을걸 알지(맞아, 난 그걸 원해)<br>
      Bad, bad boy, shiny toy with a price<br>
      나쁜, 나쁜 남자, 값비싼 반짝이 장난감 같아<br>
      You know that I bought it (Oh yeah, you're right, I want it)<br>
      넌 내가 그걸 산 거 알잖아 (맞아, 난 그걸 원해)<br>
      Killing me slow, out the window<br>
      천천히 죽어가, 창문 밖엔<br>
      I'm always waiting for you to be waiting below<br>
      네가 아래에서 기다리고 있길 기다려<br>
      Devils roll the dice, angels roll their eyes<br>
      악마들은 주사위를 굴리고 천사들은 눈을 굴려<br>
      What doesn't kill me makes me want you more<br>
      죽을 수 없기에 널 더 원하는 거 같아<br>
      And it's new, the shape of your body<br>
      새로워 너의 몸매도<br>
      It's blue, the feeling I've got<br>
      우울해, 내가 느끼는 이 감정이<br>
      And it's ooh, whoa oh<br>
      그리고 이건<br>
      It's a cruel summer<br>
      잔인한 여름이야<br>
      It's cool, that's what I tell 'em<br>
      너무 잘생겼어, 내가 하는 말이야<br>
      No rules in breakable heaven<br>
      깨질 수 있는 천국에는 규칙이 없어<br>
      But ooh, whoa oh<br>
      하지만<br>
      It's a cruel summer<br>
      잔인한 여름이야<br>
      With you<br>
      너와 함께라서<br>
      Hang your head low in the glow of the vending machine<br>
      넌 자판기 빛을 피해 고개를 돌려<br>
      I'm not dying (Oh yeah, you're right, I want it)<br>
      난 죽지 않아 (맞아, 난 그걸 원해)<br>
      We say that we'll just screw it up in these trying times<br>
      우리는 이 가능성의 시기에도 망치겠다고 말해<br>
      We're not trying (Oh yeah, you're right, I want it)<br>
      우린 노력 따위 안 해 (맞아, 난 그걸 원해)<br>
      So cut the headlights, summer's a knife<br>
      그러니 헤드라이트를 부숴버려 여름은 날카로워<br>
      I'm always waiting for you just to cut to the bone<br>
      항상 네가 뼛속까지 찌르길 기다려왔어<br>
      Devils roll the dice, angels roll their eyes<br>
      악마들은 주사위를 굴리고 천사들은 눈을 굴려<br>
      And if I bleed, you'll be the last to know<br>
      그리고 내가 피를 흘리면, 넌 마지막에 알게 될 거야<br>
      Oh, it's new, the shape of your body<br>
      새로워 너의 몸매도<br>
      It's blue, the feeling I've got<br>
      우울해, 내가 느끼는 이 감정<br>
      And it's ooh, whoa oh<br>
      그리고 이건<br>
      It's a cruel summer<br>
      잔인한 여름이야<br>
      It's cool, that's what I tell 'em<br>
      너무 잘생겼어, 내가 하는 말이야<br>
      No rules in breakable heaven<br>
      깨질 수 있는 천국에는 규칙이 없어<br>
      But ooh, whoa oh<br>
      하지만<br>
      It's a cruel summer<br>
      잔인한 여름이야<br>
      With you<br>
      너와 함께라서<br>
      
      I'm drunk in the back of the car<br>
      차 뒷좌석에 취한 상태로<br>
      And I cried like a baby coming home from the bar (Oh)<br>
      술집에서 집으로 돌아갈 때 아이처럼 울었어<br>
      Said, "I'm fine," but it wasn't true<br>
      "괜찮아"라고 말했지만 사실 아니었어<br>
      I don't wanna keep secrets just to keep you<br>
      널 지키기 위해 비밀을 지키고 싶지 않아<br>
      And I snuck in through the garden gate<br>
      그리고 난 정원 문을 몰래 통과해<br>
      Every night that summer just to seal my fate<br>
      그 해 여름 매일 밤 내 운명을 봉인하기 위해<br>
      And I scream, "For whatever it's worth<br>
      그리고 난 소리쳐 "어쨌든<br>
      I love you, ain't that the worst thing you ever heard?"<br>
      널 좋아해, 네가 들었던 말 중에 제일 최악이지?"<br>
      He looks up, grinning like a devil<br>
      그는 악마처럼 히죽 웃으며 바라봐<br>
      It's new, the shape of your body<br>
      새로워 너의 몸매도<br>
      It's blue, the feeling I've got<br>
      우울해, 내가 느끼는 이 감정<br>
      And it's ooh, whoa oh<br>
      그리고 이건<br>
      It's a cruel summer<br>
      잔인한 여름이야<br>
      It's cool, that's what I tell 'em<br>
      너무 잘생겼어, 내가 하는 말이야<br>
      No rules in breakable heaven<br>
      깨질 수 있는 천국에는 규칙이 없어<br>
      But ooh, whoa oh<br>
      하지만<br>
      It's a cruel summer<br>
      잔인한 여름이야<br>
      With you<br>
      너와 함께라서<br>
      I'm drunk in the back of the car<br>
      차 뒷좌석에 취한 상태로<br>
      And I cried like a baby coming home from the bar<br>
      술집에서 집으로 돌아갈 때 아이처럼 울었어<br>
      Said, "I'm fine," but it wasn't true<br>
      "괜찮아"라고 말했지만 사실 아니었어<br>
      I don't wanna keep secrets just to keep you<br>
      널 지키기 위해 비밀을 지키고 싶지 않아<br>
      And I snuck in through the garden gate<br>
      그리고 난 정원 문을 몰래 통과해<br>
      Every night that summer just to seal my fate<br>
      그 해 여름 매일 밤 내 운명을 봉인하기 위해<br>
      And I scream, "For whatever it's worth<br>
      그리고 난 소리쳐 "어쨌든<br>
      I love you, ain't that the worst thing you ever heard?"<br>
      널 좋아해, 네가 들었던 말 중에 제일 최악이지?<br>
      `);
    };

    // // 둘 다 변경될 때만 fetchLyrics 호출
    if (songId && originalLyrics && translatedLyrics) {
      fetchLyrics();
    }
  }, [songId, originalLyrics, translatedLyrics]); // 의존성 배열에 originalLyrics와 translatedLyrics 추가

  // 가사가 없을 때
  if (lyricsPairs.length === 0) {
    return (
      <div className="subLyricsDisplay">
        <div className="vector-image"></div>
        <div className="sub-logo"></div>
        <div className="miniLyrics">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "50%",
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
      <div className="subLyricsDisplay">
        <div className="vector-image"></div>
        <div className="sub-logo" onClick={() => navigate("/")}></div>
        <div className="miniLyrics">
          {/* 원문 가사와 번역 가사를 한 줄씩 번갈아 표시 */}
          {/* {lyricsPairs.map((pair, index) => (
            <div key={index}>
              <div
                style={{ color: "white", marginBottom: "8px" }}
                dangerouslySetInnerHTML={{ __html: pair.original }}
              ></div>
              <div
                style={{ color: "#FF6DCC", marginBottom: "8px" }}
                dangerouslySetInnerHTML={{ __html: pair.translated }}
              ></div>
            </div>
          ))
          } */}
          {lyricsPairs.split("<br>").map((line, index) => (
            <div key={index}>
              <div
                style={{
                  color: index % 2 === 0 ? "white" : "#FF6DCC", // 짝수 줄은 핑크색, 홀수 줄은 검정색
                  marginBottom: "8px",
                }}
                dangerouslySetInnerHTML={{ __html: line }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
