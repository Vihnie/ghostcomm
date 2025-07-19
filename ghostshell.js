const readline = require("readline-sync");
const io = require("socket.io")(3000, {
  cors: {
    origin: "*"
  }
});
const { io: Client } = require("socket.io-client");
const os = require("os");
const colors = require("colors");

// Function to get device IP
function getIP() {
  const interfaces = os.networkInterfaces();
  for (let iface in interfaces) {
    for (let i of interfaces[iface]) {
      if (i.family === "IPv4" && !i.internal) {
        return i.address;
      }
    }
  }
  return "127.0.0.1";
}

// Function to handle chat
function chat(socket) {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  process.stdin.on("data", (data) => {
    socket.emit("message", data.trim());
  });

  socket.on("message", (msg) => {
    console.log(`\n👤 Peer: ${msg}`);
    process.stdout.write("You: ");
  });

  process.stdout.write("You: ");
}

// App start
console.log("👻 Welcome to GhostComm Shell");
const roomCode = readline.question("Enter room code: ");
const isHost = readline.question("Are you the host? (y/n): ").toLowerCase() === 'y';

if (isHost) {
  // HOST MODE
  console.log("✅ GhostShell booted");
  console.log("📡 Your IP address:", getIP());
  console.log("⏳ Waiting for peer to join...");

  io.on("connection", (socket) => {
    socket.on("join-room", (data) => {
      if (data.room === roomCode) {
        socket.emit("connected", { message: "Connected to host!" });
        console.log("✅ Peer connected!");
        chat(socket);
      } else {
        socket.disconnect(true);
      }
    });
  });

} else {
  // PEER MODE
  const hostIP = readline.question("Enter host IP address: ");
  const socket = Client(`http://${hostIP}:3000`);

  socket.emit("join-room", { room: roomCode });

  socket.on("connected", () => {
    console.log("✅ Connected to peer!");
    chat(socket);
  });

  socket.on("connect_error", () => {
    console.log("❌ Failed to connect. Check IP and Wi-Fi.");
    process.exit();
  });
}
