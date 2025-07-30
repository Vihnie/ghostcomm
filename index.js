const io = require("socket.io")(3000);
const blessed = require("blessed");

const screen = blessed.screen({
  smartCSR: true,
  title: "GhostComm Terminal"
});

const logBox = blessed.log({
  top: 'center',
  left: 'center',
  width: '90%',
  height: '90%',
  border: { type: 'line' },
  style: {
    border: { fg: 'green' }
  }
});

screen.append(logBox);
screen.render();

io.on("connection", socket => {
  logBox.log(`[+] User connected: ${socket.id}`);
  socket.on("message", msg => {
    logBox.log(`[MSG] ${socket.id}: ${msg}`);
    socket.broadcast.emit("message", msg);
  });

  socket.on("disconnect", () => {
    logBox.log(`[-] Disconnected: ${socket.id}`);
  });
});

screen.key(['escape', 'q', 'C-c'], () => process.exit(0));
