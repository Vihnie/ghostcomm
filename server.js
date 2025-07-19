// server.js
const { Server } = require("socket.io");
const io = new Server(3000, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("👤 A user connected");

  socket.on("message", (data) => {
    socket.broadcast.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ A user disconnected");
  });
});
console.log("🚀 GhostComm server started on port 3000");
