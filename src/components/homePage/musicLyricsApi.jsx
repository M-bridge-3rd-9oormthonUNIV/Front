// 백엔드 async api 비동기 요청 (api 완성될 시 수정)
// 비디오ID 가져오기
export const requestVideoId = async (artist, song) => {

  try {
    const response = await fetch(
      `/api/youtube/video?artist=${encodeURIComponent(artist)}&song=${encodeURIComponent(
        song
      )}`
    );
    const data = await response.text();

    console.log("유튜브 : " + data);
    return data;

  } catch (error) {
    console.error("Error fetching video URL:", error);
  }
};

// 원문 가사
export const requestOriginalLyrics = async (songId) => {
  try {
    const response = await fetch(
      `/api/lyrics/original/${encodeURIComponent(songId)}`
    );
    // HTML을 텍스트로 가져오기
    const htmlText = await response.text();

    // HTML 파싱
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");

    // <body> 태그의 내용을 가져오기
    const bodyContent = doc.body.innerHTML; // <body> 안의 내용을 추출
    //  console.log("바디"+bodyContent);

    return bodyContent;

  } catch (error) {
    console.error();
  }
};

// 번역 가사
export const requestTranslateLyrics = async (songId, lang) => {
  try {
    const response = await fetch(
      `/api/lyrics/translate/${encodeURIComponent(songId)}/${encodeURIComponent(lang)}`,
      {
        method: 'POST', // POST 방식으로 변경
        headers: {
          'Content-Type': 'application/json', // JSON 형식으로 데이터 전송
        },
        body: JSON.stringify({
          songId: songId, // 전송할 데이터 (필요한 경우)
          lang: lang,
        }),
      }
    );

    // HTML을 텍스트로 가져오기
    const htmlText = await response.text();

    // HTML 파싱
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");

    // <body> 태그의 내용을 가져오기
    const bodyContent = doc.body.innerHTML; // <body> 안의 내용을 추출

    return bodyContent;

    // return ("데이터없음"); // -> 데이터 없음 return 할 시 가사 미제공 화면 노출

  } catch (error) {
    console.error("Error fetching translated lyrics:", error);
  }
};
