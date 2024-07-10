const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const axios = require("axios");
const { type } = require("os");

const server = http.createServer(app);

const port = 4000;

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // 모든 채팅방 리스트 가져오기
  socket.on("request_chatlists", (data) => {
    console.log("뭘 받고있는거임..?", data);
    axios
      .get("http://localhost:8080/chatlists/user/" + data)
      .then((res) => {
        console.log("받아온 데이터:", res.data);
        socket.emit("receive_chatlists", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // 채팅방의 참가자 정보 가져오기
  socket.on("request_participants", (data) => {
    console.log("자 뭘 가져왔니?", data);
    axios
      .get(
        "http://localhost:8080/chatlists/room/participants/" +
          data.roomId +
          "?myId=" +
          data.userId
      )
      .then((res) => {
        console.log(res.data);
        socket.emit("receive_participants", res.data);
      });
  });

  // 방 상태 가져오기 (안읽은 채팅 수, 제일 최근에 받은 채팅)
  socket.on("request_chatStatus", (data) => {
    axios
      .get("http://localhost:8080/chatlists/room/chatstatus", {
        params: {
          room_id: data.roomId,
          user_id: data.userId,
        },
      })
      .then((res) => {
        console.log(res.data);
        socket.emit("receive_chatStatus", res.data);
      });
  });

  // 모든 대화기록 가져오기
  socket.on("join_room", (data) => {
    socket.join(data.room_id);
    console.log(`${data.user_id}유저가 ${data.room_id}번 방에 입장했습니다`);
    axios
      .post("http://localhost:8080/chat/join", {
        room_id: data.room_id,
        user_id: data.user_id,
      })
      .then(function (response) {
        let allMessages = response.data;
        console.log("대화기록 로드 완료");
        socket.emit("receive_message", allMessages);
      })
      .catch(function (error) {
        console.error(error);
      });
  });

  // 메시지 보내기
  socket.on("send_message", (data) => {
    console.log("받은 메세지", data);
    socket.to(data.room_id).emit("receive_message", data);
    axios
      .post("http://localhost:8080/chat/send", {
        room_id: data.room_id,
        user_id: data.user_id,
        message_content: data.message_content,
      })
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  });

  socket.on("disconnect", () => {
    // axios
    //   .post("http://localhost:8080/chat/send", {
    //     key1: "disconnect임",
    //     key2: socket.id + "가 나갔나봄 ㅇㅇ",
    //   })
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
    console.log(`${socket.id}가 접속을 끊었습니다`);
  });
});

server.listen(port, "0.0.0.0", () =>
  console.log(`server running on port ${port}`)
);
