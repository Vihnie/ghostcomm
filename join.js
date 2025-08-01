// join.js
const net = require('net');
const readline = require('readline');
const crypto = require('crypto');

const PORT = 4444;
const PASSPHRASE = 'ghostpass';

const ip = process.argv[2];
if (!ip) {
  console.log('❌ Usage: node join.js <host-ip>');
  process.exit(1);
}

function encrypt(text) {
  const cipher = crypto.createCipher('aes-256-cbc', PASSPHRASE);
  return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
}

function decrypt(hex) {
  const decipher = crypto.createDecipher('aes-256-cbc', PASSPHRASE);
  return decipher.update(hex, 'hex', 'utf8') + decipher.final('utf8');
}

const socket = net.createConnection(PORT, ip, () => {
  console.log(`✅ Connected to host ${ip}`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'You > '
  });

  rl.prompt();
  rl.on('line', line => {
    const encrypted = encrypt(line.trim());
    socket.write(encrypted);
    rl.prompt();
  });
});

socket.on('data', data => {
  try {
    const decrypted = decrypt(data.toString());
    console.log(`👤 Peer: ${decrypted}`);
  } catch (e) {
    console.log('⚠️ Could not decrypt message.');
  }
});

socket.on('error', err => {
  console.error('❌ Connection error:', err.message);
});
