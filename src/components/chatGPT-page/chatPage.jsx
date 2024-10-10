import React, { useState } from "react";
import { fetchChatbotResponse } from "../chatGPT-page/chatApi.jsx";
import {Modal} from "../shared/modal.jsx";
import "../../css/chatPage.css"; 
import "../../css/contentPage.css";

export default function Chat() {
    const [messages, setMessages] = useState([
      { sender: "bot", text: "Hello! If you have any questions about the song, please ask." },
    ]);
    const [userInput, setUserInput] = useState("");
    const [conversationId, setConversationId] = useState(null); // 초기 id는 null로 설정
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
    const [modalMessage, setModalMessage] = useState(""); // 모달 메시지
  
    const sendMessage = async () => {
      if (userInput.trim() === "") return;
  
      const newMessages = [...messages, { sender: "user", text: userInput }];
      setMessages(newMessages);
  
      try {
        const data = await fetchChatbotResponse(conversationId, userInput); // API 호출
  
        // 응답 메시지 추가
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: data.response },
        ]);
  
        // 받은 id 저장
        setConversationId(data.id);
  
        setUserInput(""); // 입력 필드 초기화
  
      } catch (error) {
        console.error("Error sending message:", error);
        setModalMessage("Failed to fetch response. Please try again."); // 오류 메시지 설정
        setIsModalOpen(true); // 모달 열기
      }
    };
  
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
          sendMessage(); // Enter 누르면 메시지 전송
        }
      };

    return (
      <>
        {/* 오른쪽에 열리는 채팅 창 */}
        <div className="chat-box-wrapper">
          <div className="chat-box">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender}`}
                style={{
                    background: "rgba(255, 255, 255, 0.15)",
                    fontSize: "20px",
                }}
              >
                {message.text}
              </div>
            ))}
          </div>
        </div>
  
        {/* 오른쪽에서 드래그하여 열리는 서브 페이지 */}
        <div className="sub-chat-box">
            <div className="input-wrapper">
                <input
                    className="chat-input"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    style={{
                        background: "rgba(255, 255, 255, 0.15)",
                        fontSize: "25px",
                    }}
                />
                <button className="chat-button" onClick={sendMessage}>
                <img
                    src="https://i.postimg.cc/TYjjRkRs/image-32.png" // 버튼에 사용할 이미지
                    alt="Send"
                    className="send-icon"
                />
                </button>
          </div>
        </div>
  

  
        {/* 모달 */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          message={modalMessage}
          pinkMessage={"닫기"}
        />
      </>
    );
  }