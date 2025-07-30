#!/data/data/com.termux/files/usr/bin/bash

echo "[🔧] Updating Termux..."
pkg update -y && pkg upgrade -y

echo "[📦] Installing Node.js and Git..."
pkg install -y nodejs git

echo "[📁] Setting up GhostComm directory..."
rm -rf ghostcomm  # prevent nested ghostcomm/ghostcomm
git clone https://github.com/Vihnie/ghostcomm.git
cd ghostcomm || { echo "❌ Failed to enter ghostcomm directory"; exit 1; }

echo "[📦] Installing dependencies..."
npm install

echo "[⚙️] Creating GhostComm shortcut command..."
if ! grep -q "ghostcomm" ~/.bashrc; then
  echo "alias ghostcomm='node ~/ghostcomm/index.js'" >> ~/.bashrc
  source ~/.bashrc
  echo "[✅] You can now run GhostComm anytime by typing: ghostcomm"
else
  echo "[ℹ️] GhostComm alias already exists."
fi

echo "[🚀] Running GhostComm now..."
node index.js
