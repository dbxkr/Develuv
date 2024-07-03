import io from "socket.io-client";
import { useRef, useState, useEffect } from "react";
import Message from "./Message";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid"; // uuid 모듈 가져오기
import axios from "axios";
import { useAuth } from "../../AuthProvider";

// const socket = io.connect("http://localhost:4000");
const socket = io.connect("http://175.209.41.173:4000");

function ChatCmd({ setDInfo, dInfo }) {
  const urlParams = new URLSearchParams(window.location.search);
  const { user, isLoggedIn } = useAuth();
  const roomId = urlParams.get("roomId");
  const userId = user.user_id;

  const chatUrl = "http://localhost:8080/chatlists/";
  const participantUrl = "http://localhost:8080/chatlists/room/participants/";
  const chatStatusUrl = "http://localhost:8080/chatlists/room/chatstatus";

  const inputRef = useRef();
  const [messageList, setMessageList] = useState([]);
  const [oppo, setOppo] = useState({ userId: urlParams.get("oppoId") });
  const messageBottomRef = useRef(null);

  const loadRoomInfo = async () => {
    const res = await axios.get(participantUrl + roomId + "?myId=" + userId);
    console.log(`Participants for room ${roomId}:`, res.data); // 확인용 로그

    //방별 상태 가져오기 (로그인한 유저를 기준으로 안읽은 채팅 수 = unread, 제일 최근에 받은 채팅 = recentMsg)
    const chatStatus = await axios.get(chatStatusUrl, {
      params: {
        room_id: roomId,
        user_id: userId,
      },
    });
    console.log(res);

    // 자신의 user_id가 아닌 경우에만 추가
    setOppo({
      roomId,
      userId: res.data.user_id,
      name: res.data.user_name,
      profile: res.data.user_profile,
      blur: res.data.blur,
      unread: chatStatus.data.unreadCnt,
      recentMsg: chatStatus.data.message_content,
      recentTime: chatStatus.data.message_time,
    });
  };

  // 유저가 채팅을 보낼 때 로직
  const sendMessage = async () => {
    const currentMsg = inputRef.current.value;
    if (currentMsg !== "") {
      let now = new Date();
      now.setHours(now.getHours() + 9);
      const messageData = {
        room_id: roomId,
        user_id: userId,
        message_content: currentMsg,
        message_time: now.toISOString().slice(0, 19).replace("T", " "),
      };
      console.log("messageData", messageData);
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      inputRef.current.value = "";
    }
  };

  //메시지 입력하는 동안 받은 메시지의 읽음 처리
  useEffect(() => {
    readMsg();
    console.log("oppo", oppo);
  }, [messageList, oppo]);

  useEffect(() => {
    if (isLoggedIn) {
      loadRoomInfo();
    }
  }, []);

  const readMsgURL = "http://localhost:8080/chatlists/room/readmessage";
  const readMsg = async () => {
    console.log("메시지 읽음 처리 !! ");
    try {
      const response = await axios.post(readMsgURL, {
        room_id: roomId,
        user_id: userId,
      });
    } catch (error) {
      console.error("오류 발생:", error);
      // 오류 처리
    }
  };
  const scrollToBottom = () => {
    messageBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messageList]);

  useEffect(() => {
    const receiveMessageHandler = (data) => {
      console.log("받은채팅", data);
      console.log("받음ㅇㅇ", Array.isArray(data));

      if (Array.isArray(data)) {
        if (data[0] != null && data[0].room_id == roomId) {
          setMessageList((list) => [...list, ...data]);
        }
      } else {
        if (data.room_id != null && data.room_id == roomId) {
          setMessageList((list) => [...list, data]);
        }
      }
    };
    socket.on("receive_message", receiveMessageHandler);
    return () => {
      socket.off("receive_message", receiveMessageHandler);
    };
  }, [socket]);
  // messageList.find((msg) => msg.user_id !== user_id)?.user_id || "상대방";

  // 방 나가기 (디비에서 삭제)
  const removeUrl = "http://localhost:8080/chatlists/exit";
  function removeRoom() {
    if (window.confirm("해당 대화방을 나가고 대화기록을 삭제하시겠습니까?")) {
      axios.post(removeUrl, { room_id: roomId });
      console.log(`${roomId} 번 방 삭제 완료`);
      window.location.reload();
    }
  }

  // 채팅창 띄울때 자동으로 맨 아래로 내려버림
  useEffect(() => {
    messageBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  if (oppo == null) {
    return <div>loading</div>;
  }

  return (
    <PageContainer>
      <RoomContainer>
        <RoomHeader>
          <RoomTitle>
            {oppo.user_name} <button onClick={removeRoom}> X </button>
          </RoomTitle>
        </RoomHeader>
        <RoomBody>
          <MessageBox>
            {messageList &&
              messageList.map((el) => (
                <Message
                  oneMessage={el}
                  user_id={userId}
                  key={uuidv4()}
                  oppoProfile={oppo.profile}
                  oppoName={oppo.name}
                  blur={oppo.blur}
                  setDInfo={setDInfo}
                  dInfo={dInfo}
                />
              ))}
            <div ref={messageBottomRef}></div>
          </MessageBox>
        </RoomBody>
        <ChatInputBox>
          <ChatInput
            ref={inputRef}
            type="text"
            placeholder="메세지를 입력해주세요"
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
              // window.scrollTo(0, 0);
            }}
          />
          <ChatButton onClick={sendMessage}>▹</ChatButton>
          <ChatButton onClick={readMsg}>🔺</ChatButton>
        </ChatInputBox>
      </RoomContainer>
    </PageContainer>
  );
}

export default ChatCmd;

const PageContainer = styled.div`
  background-color: #f7f7f7; /* 웹페이지 전체 배경색 */
  // display: flex;
  // justify-content: center;
  // align-items: center;
  position: relative;
`;

const RoomContainer = styled.div`
  width: 450px; /* 채팅방 너비 */
  max-height: 1200px; /* 채팅방 높이 */
  min-height: 500px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const RoomHeader = styled.div`
  height: 50px;
  border-radius: 6px 6px 0 0;
  background: #ffffff;
  position: relative;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 사방으로 그림자 효과 추가 */
  border-bottom: 1px solid #eeefee;
`;

const RoomTitle = styled.p`
  margin: 0;
  display: block;
  padding: 0 1em;
  color: #000000;
  font-weight: 700;
  line-height: 50px;
`;

const RoomBody = styled.div`
  flex: 1;
  border: 1px solid #ffffff;
  background: #ffffff;
  position: relative;
  overflow-y: auto;
  max-height: 70vh;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MessageBox = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-top: 5px;
`;

const ChatInputBox = styled.div`
  height: 50px;
  border-top: 1px solid #eeefee;
  display: flex;
  align-items: center; /* 내부 요소들을 세로 가운데 정렬 */
  border-radius: 0 0 6px 6px;
  background-color: #ffffff;
  position: relative;
  padding: 0 10px; /* 좌우 padding 추가 */
`;

const ChatInput = styled.input`
  flex: 1; /* 남은 공간을 모두 차지하도록 설정 */
  border: 0;
  padding: 0 0.7em;
  font-size: 1em;
  border-right: 1px solid #eeefee;
  outline: none;
  background: transparent;
`;

const ChatButton = styled.button`
  border: 0;
  display: grid;
  place-items: center;
  cursor: pointer;
  height: 100%;
  padding: 0 10px; /* 좌우 padding 추가 */
  background: transparent;
  outline: none;
  font-size: 20px;
  transition: all 0.5s;
  color: lightgray;
  opacity: 0.5;
  position: absolute;
  top: -40%;
  right: 2%;
  &:hover {
    background: #3d4a79;
    transition: all 0.5s;
  }
  &:active {
    background: darkblue;
    font-size: 0.5rem;
  }
`;
