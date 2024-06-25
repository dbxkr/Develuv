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
  const [oppoProfile, setOppoProfile] = useState(null);

  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const chatUrl = "http://localhost:8080/chatlists/";
  const participantUrl = "http://localhost:8080/chatlists/room/participants/";
  const chatStatusUrl = "http://localhost:8080/chatlists/room/chatstatus";

  const chatRoomLoad = async () => {
    try {
      //채팅방 리스트 가져오기
      const res = await axios.get(chatUrl + "user/" + user.user_id);
      console.log("Rooms:", res.data); // 확인용 로그
      const rooms = res.data.map((item) => item.roomId);
      const participantsData = [];

      for (const roomId of rooms) {
        //방별로 참가자 정보(user_id, user_name)를 가져옴
        const res = await axios.get(participantUrl + roomId);
        console.log(`Participants for room ${roomId}:`, res.data); // 확인용 로그

        //방별 상태 가져오기 (로그인한 유저를 기준으로 안읽은 채팅 수 = unread, 제일 최근에 받은 채팅 = recentMsg)
        const chatStatus = await axios.get(chatStatusUrl, {
          params: {
            room_id: roomId,
            user_id: user.user_id,
          },
        });

        res.data.forEach((participant) => {
          // 데이터 구조를 확인하여 roomId와 userId를 설정
          if (participant.user_id !== user.user_id) {
            // 자신의 user_id가 아닌 경우에만 추가
            participantsData.push({
              roomId,
              userId: participant.user_id,
              name: participant.user_name,
              profile: participant.user_profile,
              unread: chatStatus.data.unreadCnt,
              recentMsg: chatStatus.data.message_content,
              recentTime: chatStatus.data.message_time,
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

  // 채팅방을 클릭하면 쌓여있는 알림을 읽도록 한다.
  const readMsgURL = "http://localhost:8080/chatlists/room/readmessage";
  const readMsg = async () => {
    console.log("채팅방 클릭했어?", roomId, oppoId);
    try {
      const response = await axios.post(readMsgURL, {
        room_id: roomId,
        user_id: user.user_id,
      });

      // participants 상태 업데이트
      setParticipants((prevParticipants) => {
        return prevParticipants.map((participant) => {
          if (participant.roomId === roomId) {
            return {
              ...participant,
              unread: 0, // 해당 roomId의 unread를 0으로 설정
            };
          }
          return participant;
        });
      });

      console.log(response.data); // 성공적으로 응답을 받았을 때의 처리 (옵션)
    } catch (error) {
      console.error("오류 발생:", error);
      // 오류 처리
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      chatRoomLoad();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    readMsg();
  }, [roomId, oppoId]);

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
            {participants.length > 0 ? ( //paritipants : roomId, userId, name 값 갖고 있음
              <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                {participants.map((participant, index) => (
                  <li
                    key={index}
                    className="chat-item"
                    onClick={() => {
                      if (roomId == null || roomId !== participant.roomId) {
                        setRoomId(participant.roomId);
                        setOppoId(participant.name);
                        setOppoProfile(participant.profile);
                      } else {
                        setRoomId(null);
                        setOppoId(null);
                        setOppoProfile(null);
                      }
                    }}
                  >
                    <div className="chat-avatar">
                      <img src={participant.profile} alt="avatar" />
                    </div>
                    <div className="chat-info">
                      <p className="chat-name">{participant.name}</p>
                      <p className="chat-message">{participant.recentMsg}</p>
                    </div>
                    <div className="chat-meta">
                      <div className="chat-time">{participant.recentTime}</div>
                      <div className="chat-notification">
                        {participant.unread}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>대화방이 없습니다</p>
            )}
          </div>
        </div>
      </div>
      <div>
        {roomId ? (
          <Chat
            roomId={roomId}
            myId={user.user_id}
            oppoId={oppoId}
            oppoProfile={oppoProfile}
          />
        ) : null}
      </div>
    </ChatComponents>
  );
}

export default ChatList;

const ChatComponents = styled.div`
  display: flex;
  position: fixed;
  top: 115px;
  left: 5%;
  align-items: flex-start;
`;
