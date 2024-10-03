// 음악 검색하고 song 세팅하는 메서드
export default async function searchMusicApi(artist,title) {
  try {
    const response = await fetch(
      `https://www.m-bridge.site/api/search/${artist}/${title}`, {mode:"no-cors"}
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // 반환값 - song: { title: String, artist: String, albumUrl: String, songId: String }

    if (data === "204") {
      console.error("검색 결과가 없습니다.");
    } else if (data && data.song) {
      return data.song;
    }
  } catch (error) {
    console.error("Error fetching song ID:", error);
  }
}
