export const fetchChatbotResponse = async (id, message) => {
  try {
    const response = await fetch('https://www.m-bridge.site/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, message }),
    });

    const data = await response.json();
    return data.response; // 응답 메시지 반환
  } catch (error) {
    console.error('Error fetching chatbot response:', error);
    return 'Sorry, something went wrong. Please try again later.';
  }
};