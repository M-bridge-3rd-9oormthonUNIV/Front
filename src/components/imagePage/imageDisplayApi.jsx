// 백엔드 api 비동기 요청 (api 완성될 시 수정)
// 갤러리에서 이미지 가져올때
export const requestImages = async () => {
  try {
    const response = await fetch(`/api/images`);
    const data = await response.json();

    return(data.images);

  } catch (error) {
    console.error("Error fetching video URL:", error);
  }
};