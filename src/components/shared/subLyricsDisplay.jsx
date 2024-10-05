import React from "react";
import "../../css/contentPage.css";

export default function SubLyricsDisplay() {
  return (
    <div className="subLyricsDisplay">
      <div className="vector-image"></div>
      <div className="sub-logo"></div>
      {/* <p style={{marginTop: "30px"}}>ㅁㅇㄹㅁㅇㄹㅁㅇㄹ</p>
      <p style={{ color: "#FF00E5"}}>dfd</p> */}
      {/* <div className="lyrics">(Yeah, yeah, yeah, yeah) Fever dream high in the quiet of the night조용한 밤, 지독한 악몽을 꿔You know that I caught it (Oh yeah, you're right, I want it)너도 내가 거기에 사로잡힌 걸 알아 (네 말이 맞아, 내가 원한 거야)Bad, bad boy, shiny toy with a price넌 나쁜 남자야, 반짝이는 값을 해You know that I bought it (Oh yeah, you're right, I want it)그 값을 치른 걸 넌 알고 있어 (네 말이 맞아, 내가 원한 거야)Killing me slow, out the window창문 밖에서 날 천천히 죽여가I'm always waiting for you to be waiting below그 아래에서 네가 날 기다리길 언제나 바라고 있어Devils roll the dice, angels roll their eyes악마가 주사위를 던질 때, 천사는 눈을 굴려What doesn't kill me makes me want you more날 죽지 않게 하는 건 널 더 원하게 만들어</div> */}
      <div className="miniLyrics">
        <span>(Yeah, yeah, yeah, yeah)</span>
        <br />
        <span>Fever dream high in the quiet of the night</span>
        <br />
        <span style={{ color: "#FF6DCC" }}>조용한 밤, 지독한 악몽을 꿔</span>
        <br />
        <span>
          You know that I caught it (Oh yeah, you're right, I want it)
        </span>
        <br />
        <span style={{ color: "#FF6DCC" }}>
          너도 내가 거기에 사로잡힌 걸 알아 (네 말이 맞아, 내가 원한 거야)
        </span>
        <br />
        <span>Bad, bad boy, shiny toy with a price</span>
        <br />
        <span style={{ color: "#FF6DCC" }}>
          넌 나쁜 남자야, 반짝이는 값을 해
        </span>
        <br />
        <span>
          You know that I bought it (Oh yeah, you're right, I want it)
        </span>
        <br />
        <span style={{ color: "#FF6DCC" }}>
          그 값을 치른 걸 넌 알고 있어 (네 말이 맞아, 내가 원한 거야)
        </span>
        <br />
        <span>Killing me slow, out the window</span>
        <br />
        <span style={{ color: "#FF6DCC" }}>창문 밖에서 날 천천히 죽여가</span>
        <br />
        <span>I'm always waiting for you to be waiting below</span>
        <br />
        <span style={{ color: "#FF6DCC" }}>
          그 아래에서 네가 날 기다리길 언제나 바라고 있어
        </span>
        <br />
        <span>Devils roll the dice, angels roll their eyes</span>
        <br />
        <span style={{ color: "#FF6DCC" }}>
          악마가 주사위를 던질 때, 천사는 눈을 굴려
        </span>
        <br />
        <span>What doesn't kill me makes me want you more</span>
        <br />
        <span style={{ color: "#FF6DCC" }}>
          날 죽지 않게 하는 건 널 더 원하게 만들어
        </span>
      </div>
    </div>
  );
}
