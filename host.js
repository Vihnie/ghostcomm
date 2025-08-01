// host.js
const net = require('net');
const readline = require('readline');
const crypto = require('crypto');

const PORT = 4444;
const PASSPHRASE = 'ghostpass';

function encrypt(text) {
  const cipher = crypto.createCipher('aes-256-cbc', PASSPHRASE);
  return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
}

function decrypt(hex) {
  const decipher = crypto.createDecipher('aes-256-cbc', PASSPHRASE);
  return decipher.update(hex, 'hex', 'utf8') + decipher.final('utf8');
}

const server = net.createServer(socket => {
  console.log('📞 Peer connected:', socket.remoteAddress);

  socket.on('data', data => {
    try {
      const decrypted = decrypt(data.toString());
      console.log(`👤 Peer: ${decrypted}`);
    } catch (e) {
      console.log('⚠️ Could not decrypt message.');
    }
  });

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

server.listen(PORT, () => {
  console.log(`🟢 Waiting for peer... (Your IP: ${getLocalIp()})`);
  console.log(`Use: node join.js <your_ip> on peer device`);
});

function getLocalIp() {
  const { networkInterfaces } = require('os');
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
}
