// 음악 검색하고 song 세팅하는 메서드
export default async function searchMusicApi({ artist, title }) {
  try {
    const response = await fetch(
      `https://www.m-bridge.site/api/search/${artist}/${title}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // 반환값 - song: { title: String, artist: String, albumUrl: String, songId: String }
    if (data && data.song) {
      // * (1) 여기서 전역변수 song 세팅 or (2) song 리턴 -> 리턴값으로 값 설정

    } else {
      console.error("No songs found");
    }
  } catch (error) {
    console.error("Error fetching song ID:", error);
  }

  return "zz";
}
