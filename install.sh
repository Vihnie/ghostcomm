#!/data/data/com.termux/files/usr/bin/bash

echo "[🔧] Updating Termux..."
pkg update -y && pkg upgrade -y

echo "[📦] Installing Node.js and Git..."
pkg install -y nodejs git

echo "[📁] Cloning GhostComm..."
git clone https://github.com/Vihnie/ghostcomm.git
cd ghostcomm || { echo "❌ Failed to enter ghostcomm directory"; exit 1; }

echo "[📦] Installing dependencies..."
npm install

echo "[🚀] Running GhostComm..."
node index.js
