import io from "socket.io-client";
import { useRef, useState, useEffect } from "react";
import Message from "./Message";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid"; // uuid 모듈 가져오기
import axios from "axios";
import { useAuth } from "../../AuthProvider";

// const socket = io.connect("http://localhost:4000");
const socket = io.connect("http://175.209.41.173:4000");

function Chat({
  myId,
  oppoName,
  roomId,
  oppoProfile,
  blur,
  setDInfo,
  dInfo,
  oppoId,
}) {
  const [isRoomDeleted, setIsRoomDeleted] = useState();
  const user_id = myId; // 테스트용 사용자 이름
  const room_id = roomId; // 테스트용 방 이름
  const { user } = useAuth();

  const inputRef = useRef();
  const [messageList, setMessageList] = useState([]);
  const messageBottomRef = useRef(null);

  // 소켓 연결
  const joinRoom = (e) => {
    e.preventDefault();
    if (user_id !== "" && room_id !== "") {
      socket.emit("join_room", { room_id, user_id });
    } else {
      console.log("소켓연결실패");
    }
  };

  // 소켓이 연결되거나 유저가 채팅을 보낼 때 messageList 에 반영
  // socket.on("start_message", (data) => {
  //   setMessageList((list) => [...list, data[0]]);
  // });
  // socket.on("receive_message", (data) => {
  //   setMessageList((list) => [...list, data[0]]);
  // });

  // 유저가 채팅을 보낼 때 로직
  const sendMessage = async () => {
    const currentMsg = inputRef.current.value;
    if (currentMsg !== "") {
      let now = new Date();
      now.setHours(now.getHours() + 9);
      const messageData = {
        room_id: room_id,
        user_id: user_id,
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
  }, [messageList]);

  const readMsgURL = "http://localhost:8080/chatlists/room/readmessage";
  const readMsg = async () => {
    console.log("메시지 읽음 처리 !! ");
    try {
      const response = await axios.post(readMsgURL, {
        room_id: roomId,
        user_id: user_id,
      });
    } catch (error) {
      console.error("오류 발생:", error);
      // 오류 처리
    }
  };
  const scrollToBottom = () => {
    messageBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const openSingleChat = () => {
    const newWindow = window.open(
      `http://localhost:3500/singlechat?roomId=${roomId}&oppoId=${oppoId}`,
      "_blank",
      "resizable=no"
    );
    if (newWindow) newWindow.opener = null;
  };

  useEffect(scrollToBottom, [messageList]);

  // useEffect(() => {
  //   messageBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  //   console.log("mgslist", messageList);
  // }, [messageList]);

  useEffect(() => {
    if (user_id !== "" && room_id !== "") {
      socket.emit("join_room", { room_id, user_id });
    } else {
      console.log("소켓연결실패");
    }
  }, []);

  useEffect(() => {
    const receiveMessageHandler = (data) => {
      console.log("받은채팅", data);
      console.log("받음ㅇㅇ", Array.isArray(data));

      if (Array.isArray(data)) {
        if (data[0].room_id != null && data[0].room_id == roomId) {
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
  }, [socket, oppoName]);
  const otherUser = oppoName;
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
    const scrollToBottom = () => {
      messageBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // 약간의 지연을 두고 스크롤 실행
    const timeoutId = setTimeout(scrollToBottom, 100);

    return () => clearTimeout(timeoutId); // cleanup function
  }, [messageList]);

  return (
    <PageContainer>
      <RoomContainer>
        <RoomHeader>
          <RoomTitle>
            {otherUser}
            <img
              onClick={removeRoom}
              src="./src/assets/box-arrow-left.svg"
            ></img>
          </RoomTitle>
        </RoomHeader>
        <RoomBody>
          <MessageBox ref={scroll}>
            {messageList &&
              messageList.map((el) => (
                <Message
                  oneMessage={el}
                  user_id={user_id}
                  key={uuidv4()}
                  oppoProfile={oppoProfile}
                  oppoName={oppoName}
                  blur={blur}
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
          <ChatButton onClick={openSingleChat}></ChatButton>
        </ChatInputBox>
      </RoomContainer>
    </PageContainer>
  );
}

export default Chat;

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
  overflow: scroll;
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
