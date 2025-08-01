
#!/data/data/com.termux/files/usr/bin/bash

echo "[🔧] Updating Termux..."
pkg update -y && pkg upgrade -y

echo "[📦] Installing Node.js and Git..."
pkg install -y nodejs git -y

echo "[📁] Cloning GhostComm..."
git clone https://github.com/Vihnie/ghostcomm.git
cd ghostcomm || { echo "❌ Failed to enter ghostcomm directory"; exit 1; }

echo "[📦] Installing dependencies..."
npm install

echo "[📎] Creating GhostVin global command to launch UI..."

cat << 'EOF' > /data/data/com.termux/files/usr/bin/GhostVin
#!/data/data/com.termux/files/usr/bin/bash
cd ~/ghostcomm || exit
script -q -c "node index.js" /dev/null
EOF

chmod +x /data/data/com.termux/files/usr/bin/GhostVin

echo "[🚀] GhostComm is ready. Type 'GhostVin' to launch the UI!"
