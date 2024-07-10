import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./MainChat.css"; // CSS 파일 임포트
import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    overflow: "scroll",
  },
};

Modal.setAppElement("#root");

function MainChat() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null); // 선택된 채팅방 상태
  const [chat1, setChat1] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/chatlists/room/1")
      .then((response) => {
        console.log(response.data); // 응답 데이터 확인
        setChat1(response.data); // 채팅 데이터 설정
      })
      .catch((error) => {
        console.error("Error fetching chat lists:", error);
        setErrorMessage("Error fetching chat lists."); // 오류 발생 시 메시지 설정
      });
  }, []);
  
  const chats = [
    { id: 1, name: '전유탁', message: '오늘 저녁 먹고 뭐해?', time: '2 min ago' },
    { id: 2, name: '서창호', message: '오늘 뭐해?', time: '2 min ago' },
    { id: 3, name: '홍화연', message: '내일 오후에 시간 있어?', time: '2 min ago' },
    { id: 4, name: '예세림', message: '이번 주말에 뭐 할거야?', time: '2 min ago' },
    { id: 5, name: '유가영', message: '안녕! 잘 지내고 있어?', time: '2 min ago' },
  ];

  const messages = selectedChat ? [
    { from: selectedChat.name, text: '안녕? 잘 지내고 있어? 요즘 어떻게 지내니?', time: '09:31 AM' },
    { from: selectedChat.name, text: '집 언제 가니? 점심 먹자!', time: '09:32 AM' },
    { from: 'Me', text: '몰라!!', time: '09:32 AM' },
  ] : [];

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function selectChat(chat) {
    setSelectedChat(chat);
  }

  return (
    <div className="main-chat">
      <header className="header">
        <div className="logo">DeveLuv</div>
        <div className="mypage-button">
          <button className="loginBtn" onClick={openModal}>MyPage</button>
        </div>
      </header>
      <div className="chat-container">
        <div className="chat-list">
          {chats.map((chat) => (
            <div key={chat.id} className="chat-item" onClick={() => selectChat(chat)}>
              <div className="chat-avatar"></div>
              <div className="chat-info">
                <div className="chat-name">{chat.name}</div>
                <div className="chat-message">{chat.message}</div>
                <div className="chat-time">{chat.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-window">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.from === 'Me' ? 'me' : 'other'}`}>
                <div className="message-text">{message.text}</div>
                <div className="message-time">{message.time}</div>
              </div>
            ))
          ) : (
            <div>채팅방을 선택하세요</div>
          )}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Login Modal"
      >
        <h2>로그인</h2>
        <button onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
}

export default MainChat;
