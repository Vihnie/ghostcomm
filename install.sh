#!/data/data/com.termux/files/usr/bin/bash

echo "[🔧] Updating Termux..."
pkg update -y && pkg upgrade -y

echo "[📦] Installing Node.js, Git, and Curl..."
pkg install -y nodejs git curl

echo "[📁] Cloning GhostComm..."
rm -rf ghostcomm  # Clean up any previous attempt
git clone https://github.com/Vihnie/ghostcomm.git
cd ghostcomm || { echo "❌ Failed to enter ghostcomm directory"; exit 1; }

echo "[📦] Installing dependencies..."
npm install

echo "[📎] Creating GhostVin global command to launch UI..."

# Create the GhostVin launcher script
cat > $PREFIX/bin/GhostVin << 'EOF'
#!/data/data/com.termux/files/usr/bin/bash
cd ~/ghostcomm
node index.js
EOF

chmod +x $PREFIX/bin/GhostVin

echo "[🚀] GhostComm is ready. Type 'GhostVin' to launch the UI!"
