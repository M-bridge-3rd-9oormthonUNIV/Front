import React, { useEffect, useState } from "react";
import "../../css/homePage.css";
import "../../css/musicLyricsPage.css";

/* 가사가 있을 때, 없을 때 구분할 수 있어야 함 */
export default function Lyrics() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("korean");
  const options = ["korean", "english"];

  // 언어 변경 토글
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // 옵션 클릭
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // 선택 후 드롭다운 닫기
  };

  //   useEffect(() => {
  //     // 원문 가사 api 요청 코드 (비동기 async)
  //     const requestOriginalLyrics = async () => {
  //       const response = await fetch("https://mbridge/api/lyrics/original");
  //       const data = await response.json();
  //       data.lyrics;
  //     };

  //     // 번역 가사 api 요청 코드 (비동기 async)
  //     const requestTranslateLyrics = async () => {
  //       const response = await fetch("https://mbridge/api/lyrics/translated");
  //       const data = await response.json();
  //       data.translatedLyrics;
  //     };

  //     requestOriginalLyrics();
  //     requestTranslateLyrics();
  //   }, [selectedOption]);

  return (
    <div className="allLyricsBox">
      {/* 화면 1 */}
      <div className="lyricsBox">
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "center",
          }}
        >
          {/* 원문 가사  */}
          <div className="lyricsIcon">
            <p style={{ fontSize: "16px" }}>original</p>
          </div>
        </div>

        <div className="lyrics">
          (Yeah, yeah, yeah, yeah)
          <br />
          Fever dream high in the quiet of the night
          <br />
          You know that I caught it (Oh yeah, you're right, I want it)
          <br />
          Bad, bad boy, shiny toy with a price
          <br />
          You know that I bought it (Oh yeah, you're right, I want it)
          <br />
          Killing me slow, out the window
          <br />
          I'm always waiting for you to be waiting below
          <br />
          Devils roll the dice, angels roll their eyes
          <br />
          What doesn't kill me makes me want you more
          <br />
          And it's new, the shape of your body
          <br />
          It's blue, the feeling I've got
          <br />
          And it's ooh, whoa oh
          <br />
          It's a cruel summer
          <br />
          It's cool, that's what I tell 'em
          <br />
          No rules in breakable heaven
          <br />
          But ooh, whoa oh
          <br />
          It's a cruel summer
          <br />
          With you
          <br />
          <br />
          Hang your head low in the glow of the vending machine
          <br />
          I'm not dying (Oh yeah, you're right, I want it)
          <br />
          We say that we'll just screw it up in these trying times
          <br />
          We're not trying (Oh yeah, you're right, I want it)
          <br />
          So cut the headlights, summer's a knife
          <br />
          I'm always waiting for you just to cut to the bone
          <br />
          Devils roll the dice, angels roll their eyes
          <br />
          And if I bleed, you'll be the last to know
          <br />
          Oh, it's new, the shape of your body
          <br />
          It's blue, the feeling I've got
          <br />
          And it's ooh, whoa oh
          <br />
          It's a cruel summer
          <br />
          It's cool, that's what I tell 'em
          <br />
          No rules in breakable heaven
          <br />
          But ooh, whoa oh
          <br />
          It's a cruel summer
          <br />
          With you
          <br />
          <br />
          I'm drunk in the back of the car
          <br />
          And I cried like a baby coming home from the bar (Oh)
          <br />
          Said, "I'm fine," but it wasn't true
          <br />
          I don't wanna keep secrets just to keep you
          <br />
          And I snuck in through the garden gate
          <br />
          Every night that summer just to seal my fate (Oh)
          <br />
          And I scream, "For whatever it's worth
          <br />
          I love you, ain't that the worst thing you ever heard?"
          <br />
          He looks up, grinning like a devil
          <br />
          It's new, the shape of your body
          <br />
          It's blue, the feeling I've got
          <br />
          And it's ooh, whoa oh
          <br />
          It's a cruel summer
          <br />
          It's cool, that's what I tell 'em
          <br />
          No rules in breakable heaven
          <br />
          But ooh, whoa oh
          <br />
          It's a cruel summer
          <br />
          With you
          <br />
          <br />
          I'm drunk in the back of the car
          <br />
          And I cried like a baby coming home from the bar (Oh)
          <br />
          Said, "I'm fine," but it wasn't true
          <br />
          I don't wanna keep secrets just to keep you
          <br />
          And I snuck in through the garden gate
          <br />
          Every night that summer just to seal my fate (Oh)
          <br />
          And I scream, "For whatever it's worth
          <br />
          I love you, ain't that the worst thing you ever heard?"
          <br />
          (Yeah, yeah, yeah, yeah) 접기
        </div>
      </div>

      {/* 가운데 라인 */}
      <div className="line"></div>

      {/* 번역 가사 */}
      <div className="lyricsBox">
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <div className="dropdown">
            <button
              onClick={toggleDropdown}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "transparent",
                outline: "none",
                border: "none",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              {selectedOption}
            </button>
            {isOpen && (
              <div className="dropdown-menu">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="lyrics">
          (네, 네, 네, 네)
          <br />
          고요한 밤에 꿈을 꿉니다
          <br />
          내가 잡았다는 걸 알겠죠 (아, 맞아요, 난 원해요)
          <br />
          나쁜 나쁜 남자, 값비싼 반짝이는 장난감
          <br />
          내가 샀다는 걸 알겠죠 (아, 맞아요, 난 원해요)
          <br />
          나를 천천히 죽여, 창밖으로
          <br />
          난 항상 네가 아래서 기다리길 기다려
          <br />
          악마는 주사위를 굴리고, 천사는 눈을 굴려
          <br />
          나를 죽이지 않는 것은 더 원하게 해<br />
          그리고 새롭습니다, 너의 몸의 형태
          <br />
          파랗고, 내가 느끼는 감정
          <br />
          그리고 오, 와우 오<br />
          잔혹한 여름입니다
          <br />
          괜찮아요, 그렇게 말해요
          <br />
          부서지기 쉬운 천국에 규칙은 없어
          <br />
          하지만 오, 와우 오<br />
          잔혹한 여름입니다
          <br />
          너와 함께
          <br />
          <br />
          자판기 불빛 아래 머리를 숙여
          <br />
          난 죽지 않아요 (아, 맞아요, 난 원해요)
          <br />
          우리는 이 힘든 시간에 실수할 것이라 말해요
          <br />
          우리는 노력하지 않아요 (아, 맞아요, 난 원해요)
          <br />
          그러니 헤드라이트를 끊어, 여름은 칼이에요
          <br />
          난 항상 네가 본질을 잘라주길 기다려
          <br />
          악마는 주사위를 굴리고, 천사는 눈을 굴려
          <br />
          내가 피를 흘리면, 넌 마지막으로 알게 될 거야
          <br />
          오, 새롭습니다, 너의 몸의 형태
          <br />
          파랗고, 내가 느끼는 감정
          <br />
          그리고 오, 와우 오<br />
          잔혹한 여름입니다
          <br />
          괜찮아요, 그렇게 말해요
          <br />
          부서지기 쉬운 천국에 규칙은 없어
          <br />
          하지만 오, 와우 오<br />
          잔혹한 여름입니다
          <br />
          너와 함께
          <br />
          <br />
          난 차 뒤에서 취해 있습니다
          <br />
          바에서 집으로 오는 길에 아기처럼 울었죠 (아)
          <br />
          "괜찮아,"라고 말했지만 사실은 그렇지 않았어요
          <br />
          너를 지키기 위해 비밀을 간직하고 싶지 않아
          <br />
          그리고 나는 정원 문을 통해 몰래 들어갔어요
          <br />
          매일 여름마다 내 운명을 봉인하기 위해 (아)
          <br />
          그리고 나는 소리쳤습니다, "무엇이든 중요하든
          <br />
          사랑해, 네가 지금까지 들은 최악의 말이 아니야?"
          <br />
          그는 위를 쳐다보며 악마처럼 웃습니다
          <br />
          새롭습니다, 너의 몸의 형태
          <br />
          파랗고, 내가 느끼는 감정
          <br />
          그리고 오, 와우 오<br />
          잔혹한 여름입니다
          <br />
          괜찮아요, 그렇게 말해요
          <br />
          부서지기 쉬운 천국에 규칙은 없어
          <br />
          하지만 오, 와우 오<br />
          잔혹한 여름입니다
          <br />
          너와 함께
          <br />
          <br />
          난 차 뒤에서 취해 있습니다
          <br />
          바에서 집으로 오는 길에 아기처럼 울었죠 (아)
          <br />
          "괜찮아,"라고 말했지만 사실은 그렇지 않았어요
          <br />
          너를 지키기 위해 비밀을 간직하고 싶지 않아
          <br />
          그리고 나는 정원 문을 통해 몰래 들어갔어요
          <br />
          매일 여름마다 내 운명을 봉인하기 위해 (아)
          <br />
          그리고 나는 소리쳤습니다, "무엇이든 중요하든
          <br />
          사랑해, 네가 지금까지 들은 최악의 말이 아니야?"
          <br />
          (네, 네, 네, 네)
        </div>
      </div>

      {/* 화면 2 (가사미제공) */}

      {/* <div className="lyricsBox">
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            border: "none",
            outline: "none",
            color: "transparent",
            backgroundColor: "transparent",
          }}
        >
          <div className="face"></div>
        </div>
        <p
          style={{
            color: "#FF00E5",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            textAlign: "center",
          }}
        >
          Sorry, We don't have lyrics<br></br>가사가 제공되지 않는 음원입니다
        </p>
      </div> */}
    </div>
  );
}
