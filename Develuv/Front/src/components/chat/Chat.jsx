import io from "socket.io-client";
import { useState } from "react";
import Chatroom from "./Chatroom";

const socket = io.connect("http://localhost:4000");

function Chat() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const joinRoom = (e) => {
    e.preventDefault();
    if (username !== "" && room !== "") {
      console.log(room, username);
      socket.emit("join_room", { room, username });
      setShowChat(true);
    }
  };

  return (
    <>
      <button onClick={joinRoom}>채팅룸입장</button>
      <input
        type="text"
        placeholder="사용할 이름을 입력해주세요"
        onChange={(e) => {
          setErrorMsg("");
          setUsername(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="입장할 방을 입력해주세요"
        onChange={(e) => {
          setErrorMsg("");
          setRoom(e.target.value);
        }}
      />
      {!showChat ? (
        console.log("채팅방 준비중...")
      ) : (
        <Chatroom socket={socket} username={username} room={room} />
      )}
    </>
  );
}

export default Chat;
