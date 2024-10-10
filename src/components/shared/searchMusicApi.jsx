// 음악 검색
export default async function searchMusicApi( artist, song ) {
  try {
    const response = await fetch(
      `https://api.m-bridge.site/api/search?artist=${encodeURIComponent(artist)}&song=${encodeURIComponent(song)}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // 반환값 - song: { title: String, artist: String, albumUrl: String, songId: String }
    if (data[0]) {
      // * (1) 여기서 전역변수 song 세팅 or (2) song 리턴 -> 리턴값으로 값 설정
      return data[0];

    } else {
      console.error("No songs found");
    }
  } catch (error) {
    console.error("Error fetching song ID:", error);
  }
}
