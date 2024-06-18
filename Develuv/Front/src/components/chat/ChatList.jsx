import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./chat.css"; // CSS 파일 임포트
import { useAuth } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";

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

function ChatList() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null); // 선택된 채팅방 상태
  const [chatList, setChatList] = useState(null);
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const chats = [
    {
      id: 1,
      name: "전유탁",
      message: "철 없을적 내 기억 속에",
      time: "2 min ago",
      profile:
        "https://drive.google.com/thumbnail?id=1U3nZx1FZgRsL1GiydBx02NTAM4-vVeLG&sz=s4000",
    },
    {
      id: 2,
      name: "서창호",
      message: "비행기 타고 가요~ Let's go",
      time: "2 min ago",
      profile:
        "https://drive.google.com/thumbnail?id=1U3nZx1FZgRsL1GiydBx02NTAM4-vVeLG&sz=s4000",
    },
    {
      id: 3,
      name: "홍화연",
      message: "파란 하늘 위를 훨훨 날아 가겠죠.",
      time: "2 min ago",
      profile:
        "https://drive.google.com/thumbnail?id=1U3nZx1FZgRsL1GiydBx02NTAM4-vVeLG&sz=s4000",
    },
    {
      id: 4,
      name: "예세림",
      message: "어려서 꿈꾸었던 비행기 타고 기다리는 동안 아무 말도 못해요",
      time: "2 min ago",
      profile:
        "https://drive.google.com/thumbnail?id=1U3nZx1FZgRsL1GiydBx02NTAM4-vVeLG&sz=s4000",
    },
    {
      id: 5,
      name: "유가영",
      message: "내 생각 말할 수 없어요.",
      time: "2 min ago",
      profile:
        "https://drive.google.com/thumbnail?id=1U3nZx1FZgRsL1GiydBx02NTAM4-vVeLG&sz=s4000",
    },
    {
      id: 6,
      name: "유가영",
      message: "이제 준비 다 끝났어",
      time: "2 min ago",
      profile:
        "https://drive.google.com/thumbnail?id=1U3nZx1FZgRsL1GiydBx02NTAM4-vVeLG&sz=s4000",
    },
    {
      id: 7,
      name: "유가영",
      message: "곱게 차려입고 나서",
      time: "2 min ago",
      profile:
        "https://drive.google.com/thumbnail?id=1U3nZx1FZgRsL1GiydBx02NTAM4-vVeLG&sz=s4000",
    },
    {
      id: 8,
      name: "유가영",
      message: "바깥 풍경마저 들뜬 기분",
      time: "2 min ago",
      profile:
        "https://drive.google.com/thumbnail?id=1U3nZx1FZgRsL1GiydBx02NTAM4-vVeLG&sz=s4000",
    },
  ];

  const messages = selectedChat
    ? [
        {
          from: selectedChat.name,
          text: "안녕? 잘 지내고 있어? 요즘 어떻게 지내니?",
          time: "09:31 AM",
        },
        {
          from: selectedChat.name,
          text: "집 언제 가니? 점심 먹자!",
          time: "09:32 AM",
        },
        { from: "Me", text: "몰라!!", time: "09:32 AM" },
      ]
    : [];

  function selectChat(chat) {
    setSelectedChat(chat);
  }
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      console.log(user);
      alert("로긴해");
      navigate("/");
    }
  }, []);

  return (
    <div className="main-chat">
      <div className="chat-container">
        <div className="chat-list">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="chat-item"
              onClick={() => selectChat(chat)}
            >
              <div className="chat-avatar">
                <img
                  src="https://drive.google.com/thumbnail?id=1U3nZx1FZgRsL1GiydBx02NTAM4-vVeLG&sz=s4000"
                  alt=""
                  style={{ width: "200%", borderRadius: "5em" }}
                />
              </div>
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
              <div
                key={index}
                className={`chat-message ${
                  message.from === "Me" ? "me" : "other"
                }`}
              >
                <div className="message-text">{message.text}</div>
                <div className="message-time">{message.time}</div>
              </div>
            ))
          ) : (
            <div>채팅방을 선택하세요</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatList;
