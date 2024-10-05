import React from "react";

// 백엔드 api 비동기 요청 (api 완성될 시 수정)
// 비디오
export const requestVideoUrl = async (songId) => {
  try {
    // const response = await fetch(`https://www.m-bridge.site/api/youtube/video/${songId}`);
    // const data = await response.json();

    // return(data.videoUrl);

    return "https://youtu.be/ic8j13piAhQ?si=Cqq5qJd-ygbJ34DG";
    // https://youtu.be/ic8j13piAhQ?si=Cqq5qJd-ygbJ34DG (테일러 스위프트)
  } catch (error) {
    console.error("Error fetching video URL:", error);
  }
};

// 원문 가사
export const requestOriginalLyrics = async (songId) => {
  try {
    // const response = await fetch(`https://www.m-bridge.site/api/lyrics/original/${songId}`);
    // const data = await response.json();

    // return(data.lyrics);
    return (
      <>
        <p>
          Fever dream high in the quiet of the night
          <br />
          You know that I caught it
          <br />
          Bad, bad boy
          <br />
          Shiny toy with a price
          <br />
          You know that I bought it
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
          And it's ooh, whoa, oh
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
          Hang your head low
          <br />
          In the glow of the vending machine
          <br />
          I'm not dying
          <br />
          You say that we'll just screw it up in these trying times
          <br />
          We're not trying
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
          And it's ooh, whoa, oh
          <br />
          It's a cruel summer
          <br />
          It's cool, that's what I tell 'em
          <br />
          No rules in breakable heaven
          <br />
          But ooh, whoa, oh
          <br />
          It's a cruel summer
          <br />
          With you
          <br />
          I'm drunk in the back of the car
          <br />
          And I cried like a baby coming home from the bar (oh)
          <br />
          Said, "I'm fine," but it wasn't true
          <br />
          I don't wanna keep secrets just to keep you
          <br />
          And I snuck in through the garden gate
          <br />
          Every night that summer just to seal my fate (oh)
          <br />
          And I screamed for whatever it's worth
          <br />
          "I love you," ain't that the worst thing you ever heard?
          <br />
          He looks up grinning like a devil
          <br />
          It's new, the shape of your body
          <br />
          It's blue, the feeling I've got
          <br />
          And it's ooh, whoa, oh
          <br />
          It's a cruel summer
          <br />
          It's cool, that's what I tell 'em
          <br />
          No rules, in breakable heaven
          <br />
          But ooh, whoa, oh
          <br />
          It's a cruel summer
          <br />
          With you
          <br />
          I'm drunk in the back of the car
          <br />
          And I cried like a baby coming home from the bar (oh)
          <br />
          Said, "I'm fine," but it wasn't true
          <br />
          I don't wanna keep secrets just to keep you
          <br />
          And I snuck in through the garden gate
          <br />
          Every night that summer just to seal my fate (oh)
          <br />
          And I screamed for whatever it's worth
          <br />
          "I love you," ain't that the worst thing you ever heard?
          <br />
          (Yeah, yeah, yeah, yeah)
        </p>
      </>
    );
  } catch (error) {
    console.error();
  }
};

// 번역 가사
export const requestTranslateLyrics = async (songId, lang) => {
  try {
    // const response = await fetch(`https://www.m-bridge.site/api/lyrics/original/${songId}/${lang}`);
    // const data = await response.json();

    // return(data.translatedLyrics);

    // return ("데이터없음"); // -> 데이터 없음 return 할 시 가사 미제공 화면 노출

    return (
      <div>
        <p>
          고요한 밤, 열병 같은 꿈에 빠져
          <br />
          괴로워할 날 알고 있었잖아
          <br />
          나쁜 남자는
          <br />
          대가가 따르는, 반짝이는 장난감
          <br />
          그걸 사버린 날 알잖아
          <br />
          날 서서히 죽여와
          <br />
          창문 밖을 보며
          <br />
          그 밑에 네가 항상 기다려주길 바라
          <br />
          악마는 주사위를 굴리고, 천사들은 눈을 굴리지
          <br />
          날 죽이지 않는 것이 널 더 원하게 만들어
          <br />
          새로워
          <br />
          네 몸의 형상이
          <br />
          우울해
          <br />
          내가 느끼는 기분은
          <br />
          그리고, 이건
          <br />
          잔인한 여름이야
          <br />
          멋지네
          <br />
          내가 항상 말했지
          <br />
          깨지기 쉬운 천국에 규칙은 없어
          <br />
          하지만, 이건
          <br />
          잔인한 여름이야
          <br />
          너와 함께한
          <br />
          자판기 불빛
          <br />
          그 아래로 고개를 숙이는 너<br />
          난 죽지 못해
          <br />
          힘든 시간엔 모든 걸 망칠 거라고
          <br />
          우린 그렇게 말했지
          <br />
          시도조차 하지 않았는걸
          <br />
          그러니 헤드라이트를 꺼<br />
          여름은 칼과도 같아
          <br />
          언제나 그 칼로 날 열어주길 기다리지
          <br />
          악마는 주사위를 굴리고, 천사들은 눈을 굴려
          <br />
          피 흘리는 나를, 넌 가장 마지막에 알게 될 거야
          <br />
          새로워
          <br />
          네 몸의 형상이
          <br />
          우울해
          <br />
          내가 느끼는 기분은
          <br />
          그리고, 이건
          <br />
          잔인한 여름이야
          <br />
          멋있네
          <br />
          내가 항상 말했지
          <br />
          깨지기 쉬운 천국에 규칙은 없어
          <br />
          하지만, 이건
          <br />
          잔인한 여름이야
          <br />
          너와 함께한
          <br />
          난 술에 취한 채 자동차 뒷좌석에 앉았고
          <br />
          바에서 집으로 오는 내내 아이처럼 울었어
          <br />
          괜찮다고 했지만, 사실 아니었어
          <br />
          더 이상 비밀로 하고 싶지 않아
          <br />
          널 지킨다는 이유로
          <br />
          그 여름, 매일 밤 정원의 문으로 몰래 들어갔지
          <br />
          그저 내 운명을 정하기 위해서
          <br />
          그리고 난 소리쳐,
          <br />
          이게 무슨 의미가 있겠어,
          <br />
          그런데도 널 사랑해,
          <br />
          네가 들어본 말들 중 최악이지 않아?
          <br />
          그는 악마처럼 웃으며 날 바라봐
          <br />
          새로워
          <br />
          네 몸의 형상이
          <br />
          우울해
          <br />
          내가 느끼는 기분은
          <br />
          그리고, 이건
          <br />
          잔인한 여름이야
          <br />
          멋있네
          <br />
          내가 항상 말했지
          <br />
          깨지기 쉬운 천국에 규칙은 없어
          <br />
          하지만, 이건
          <br />
          잔인한 여름이야
          <br />
          너와 함께한
          <br />
          난 술에 취한 채 자동차 뒷좌석에 앉았고
          <br />
          바에서 집으로 오는 내내 아이처럼 울었어
          <br />
          괜찮다고 했지만, 사실 아니었어
          <br />
          더 이상 비밀로 하고 싶지 않아
          <br />
          널 지킨다는 이유로
          <br />
          그 여름, 매일 밤 정원의 문으로 몰래 들어갔지
          <br />
          그저 내 운명을 정하기 위해서
          <br />
          그리고 난 소리쳐,
          <br />
          이게 무슨 의미가 있겠어,
          <br />
          그런데도 널 사랑해,
          <br />
          네가 들어본 말들 중 최악이지 않아?
          <br />
        </p>
      </div>
    );
  } catch (error) {
    console.error();
  }
};
