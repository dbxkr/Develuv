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
    origin: "http://localhost:3500",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data.room_id);
    console.log(`${data.user_id}유저가 ${data.room_id}번 방에 입장했습니다`);

    // let noti = {
    //   message: `${data.user_id} 유저가 방에 입장했습니다`,
    //   author: "알림",
    // };
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

server.listen(port, () => console.log(`server running on port ${port}`));
