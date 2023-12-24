const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: ["http://localhost:3000"] },
});

const PORT = 5000;

// clientと通信
io.on("connection", (socket) => {
  console.log(`connected to client`);

  // client(StartScreen.js)から受信
  socket.on("任意の名前(AccessFromAdministrator)", (data) => {
    console.log(`管理者からのアクセスを検知しました!${data}`);
  });

  socket.on("Apply", (data) => {
    console.log(`管理者より開始ボタンが押されました!${data}`);
    io.emit("Allow");
  });

  socket.on("disconnect", () => {
    console.log(`disconnected`);
  });
});

server.listen(PORT, () => console.log(`server is running on ${PORT}`));
