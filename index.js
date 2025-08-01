#!/usr/bin/env node
const blessed = require('blessed');

// Create a screen object
const screen = blessed.screen({
  smartCSR: true,
  title: 'GhostComm Chat'
});

// Create a box for messages
const chatBox = blessed.box({
  top: 0,
  left: 0,
  width: '100%',
  height: '90%',
  label: '🧊 GhostComm Chat',
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'black',
    border: {
      fg: 'green'
    }
  },
  scrollable: true,
  alwaysScroll: true,
  scrollbar: {
    ch: ' ',
    inverse: true
  }
});

// Create an input box
const input = blessed.textbox({
  bottom: 0,
  height: '10%',
  width: '100%',
  inputOnFocus: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'green',
    border: {
      fg: 'red'
    }
  }
});

// Append boxes to the screen
screen.append(chatBox);
screen.append(input);

// Focus on input
input.focus();

// Handle input submission
input.on('submit', function(text) {
  if (text.trim().length > 0) {
    chatBox.pushLine(`🧠 You: ${text}`);
    chatBox.setScrollPerc(100); // Scroll to bottom
  }
  input.clearValue();
  screen.render();
  input.focus();
});

// Quit with Esc, q, or Ctrl+C
screen.key(['escape', 'q', 'C-c'], function() {
  return process.exit(0);
});

screen.render();


