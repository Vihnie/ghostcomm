const blessed = require('blessed');
const io = require('socket.io-client');
const socket = io('http://192.168.1.120:3000');
// Terminal screen
const screen = blessed.screen({
  smartCSR: true,
  title: 'GhostComm Terminal 👻'
});

// Header
const header = blessed.box({
  top: 0,
  width: '100%',
  height: 1,
  content: '👻 GhostComm Secure Chat',
  style: { fg: 'white', bg: 'blue' }
});

// Chat messages area
const chatBox = blessed.box({
  top: 1,
  left: 0,
  width: '100%',
  height: '90%-3',
  tags: true,
  scrollable: true,
  alwaysScroll: true,
  border: 'line',
  style: {
    fg: 'green',
    border: { fg: 'white' }
  }
});

// Input box
const input = blessed.textbox({
  bottom: 0,
  height: 3,
  width: '100%',
  inputOnFocus: true,
  border: 'line',
  style: {
    fg: 'cyan',
    border: { fg: 'white' }
  }
});

// Add components to screen
screen.append(header);
screen.append(chatBox);
screen.append(input);
input.focus();

// Send message
input.key('enter', () => {
  const msg = input.getValue().trim();
  if (msg) {
    chatBox.pushLine(`{bold}You:{/bold} ${msg}`);
    socket.emit('message', msg); // 🔁 Send to server
    input.clearValue();
    screen.render();
  }
});

// Receive message
socket.on('message', (msg) => {
  chatBox.pushLine(`{bold}Peer:{/bold} ${msg}`);
  screen.render();
});

// Exit with Ctrl+C
screen.key(['C-c'], () => process.exit(0));

screen.render();
