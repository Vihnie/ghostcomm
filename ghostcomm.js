const readline = require("readline");
const io = require("socket.io-client");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter room code: ", (roomCode) => {
  rl.question("Are you the host? (y/n): ", (isHost) => {
    const socket = io("https://ghostcomm-server.glitch.me");

    socket.on("connect", () => {
      console.log("✅ Connected to GhostComm server");
      socket.emit("join-room", roomCode, isHost === "y");
    });

    socket.on("peer-connected", () => {
      console.log("👥 Peer connected. Start chatting.");
    });

    socket.on("message", (msg) => {
      console.log(`👻 Peer: ${msg}`);
    });

    rl.on("line", (input) => {
      socket.emit("message", input);
    });
  });
});

