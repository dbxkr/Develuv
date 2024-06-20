import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./chat.css"; // CSS 파일 임포트
import Chat from "./Chat";
import styled from "styled-components";

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
  const [participants, setParticipants] = useState([]); // 같은 room_id에 있는 상대방 목록 상태
  const [roomId, setRoomId] = useState(null);
  const [oppoId, setOppoId] = useState(null);

  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const chatUrl = "http://localhost:8080/chatlists/";
  const participantUrl = "http://localhost:8080/chatlists/room/participants/";

  const chatRoomLoad = async () => {
    try {
      const res = await axios.get(chatUrl + "user/" + user.id);
      console.log("Rooms:", res.data); // 확인용 로그
      const rooms = res.data.map((item) => item.roomId);
      const participantsData = [];

      for (const roomId of rooms) {
        const res = await axios.get(participantUrl + roomId);
        console.log(`Participants for room ${roomId}:`, res.data); // 확인용 로그
        res.data.forEach((participant) => {
          // 데이터 구조를 확인하여 roomId와 userId를 설정
          if (participant.user_id !== user.id) {
            // 자신의 user_id가 아닌 경우에만 추가
            participantsData.push({
              roomId,
              userId: participant.user_id,
              name: participant.user_name,
            });
          }
        });
      }

      console.log("All Participants Data:", participantsData); // 확인용 로그
      setParticipants(participantsData);
    } catch (error) {
      console.error("채팅방 또는 참가자 데이터를 가져오는 중 오류 발생", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      chatRoomLoad();
    }
  }, [isLoggedIn]);

  function selectChat(chat) {
    setSelectedChat(chat);
  }

  return (
    <ChatComponents>
      <div className="main-chat">
        <div className="chat-container">
          {/* <button 
          onClick={chatRoomLoad}
          className="small-button"
          style={{ marginBottom: "10px" }} // 버튼 아래 여백 추가
        >
          채팅방 가져오기
        </button> */}
          <div className="chat-list">
            {participants.length > 0 ? (
              <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                {participants.map((participant, index) => (
                  <li
                    key={index}
                    className="chat-item"
                    onClick={() => {
                      if (roomId == null || roomId !== participant.roomId) {
                        setRoomId(participant.roomId);
                        setOppoId(participant.userId);
                      } else {
                        setRoomId(null);
                        setOppoId(null);
                      }
                    }}
                  >
                    <div className="chat-avatar">
                      <img
                        src={`https://via.placeholder.com/50`}
                        alt="avatar"
                      />
                    </div>
                    <div className="chat-info">
                      <p className="chat-name">{participant.name}</p>
                      <p className="chat-message">How are you today?</p>
                    </div>
                    <div className="chat-meta">
                      <div className="chat-time">2분전</div>
                      <div className="chat-notification">3</div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>참가자가 없습니다</p>
            )}
          </div>
        </div>
        {roomId ? (
          <Chat roomId={roomId} myId={user.id} oppoId={oppoId} />
        ) : null}
      </div>
      <div>
        {roomId ? (
          <Chat roomId={roomId} myId={user.id} oppoId={oppoId} />
        ) : null}
      </div>
    </ChatComponents>
  );
}

export default ChatList;

const ChatComponents = styled.div`
  display: flex;
`;
