// 가수 - 제목 나눠서 검색
export default function searchMusicApi({ query }) {
  const dummy = { trackId: "sdfsdf", lang: "sdfsdf" };

//   try {
    // 가수, 노래 정보 먼저 백엔드에 주고나서 영상 요청
    // 그냥 유튜브 영상 api param에다가 가수, 노래 정보 요청하는 게 나을 것 같기도 ..
    // const response = await fetch(`https:// ? /api/search/${query}`);
    // const data = await response.json();
    // 반환값 - songs: [{ title: String, artist: String, albumUrl: String, songId: String }]
    // return(songs.songId) - lang도 필요한데 ..

//     return dummy;
//   } catch (error) {
//     console.error("Error fetching video URL:", error);
//   }

return {trackId: "test", lang:"korean"};
};
