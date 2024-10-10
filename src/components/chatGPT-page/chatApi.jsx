export const fetchChatbotResponse = async (id, message) => {
  try {
    const response = await fetch("https://api.m-bridge.site/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id, // id를 전송 (초기 요청 시 null)
        message: message, // 사용자의 메시지
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response from the server.");
    }

    const data = await response.json();
    return data; // { id: String, response: String }
  } catch (error) {
    console.error("Error in fetchChatbotResponse:", error);
    throw error;
  }
};