import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // React dev server
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let activeSessions = 0;

io.on("connection", (socket) => {
  activeSessions++;
  console.log("New connection. Active sessions:", activeSessions);

  io.emit("activeSessions", activeSessions);

  socket.on("disconnect", () => {
    activeSessions--;
    console.log("Disconnected. Active sessions:", activeSessions);
    io.emit("activeSessions", activeSessions);
  });
});

server.listen(3000, () => {
  console.log("✅ Server started on port 3000");
});
