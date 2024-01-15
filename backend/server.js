const { v4: uuidv4 } = require("uuid");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: ["http://localhost:3000"] },
});

const PORT = 5000;
const rooms = {}; // 各roomと各メンバーを格納するオブジェクト

// 参加者数を更新して管理者に通知する関数
function updateParticipantCount(roomName) {
  const count = rooms[roomName]?.length || 0;
  io.to(roomName).emit("participantCountUpdate", { count });
}

io.on("connection", (socket) => {
  console.log(`client connected to server`);

  socket.on("joinRoom", (usersInfo) => {
    socket.join(usersInfo.roomName); // ユーザーを指定の部屋に追加する
    const user = {
      id: socket.id,
      adminName: usersInfo.adminName, //管理者
      userName: usersInfo.userName, //参加者
      roomName: usersInfo.roomName,
    };
    if (!rooms[usersInfo.roomName]) {
      rooms[usersInfo.roomName] = []; // 新しい部屋を作成
    }
    rooms[usersInfo.roomName].push(user); // 部屋のメンバーリストに追加
    // 参加者数を更新して管理者に通知
    updateParticipantCount(usersInfo.roomName);

    console.log(usersInfo);

    io.to(usersInfo.roomName).emit("ParticipantInfo", user); // 部屋の全員に参加者情報を送信
  });

  socket.on("任意の名前(AccessFromAdministrator)", (data) => {
    console.log(`管理者からのアクセスを検知しました!${data}`);
  });

  socket.on("adminStart", (roomName) => {
    console.log(`管理者より開始ボタンが押されました!`);
    io.to(roomName).emit("adminAllow");
    // io.emit("adminAllow");
  });

  socket.on("disconnect", () => {
    Object.keys(rooms).forEach((room) => {
      rooms[room] = rooms[room].filter((user) => {
        if (user.id === socket.id) {
          updateParticipantCount(room); // ユーザーが退出した部屋の参加者数を更新して管理者に通知
          return false; // フィルタリングで除外するためにfalseを返す
        }
        return true;
      });
    });
  });
});

server.listen(PORT, () => console.log(`server is running on ${PORT}`));
