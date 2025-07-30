#!/data/data/com.termux/files/usr/bin/bash

echo "[🔧] Updating Termux..."
pkg update -y && pkg upgrade -y

echo "[📦] Installing Node.js and Git..."
pkg install -y nodejs git

echo "[📁] Cloning GhostComm..."
if [ -d "$HOME/ghostcomm" ]; then
  echo "⚠️ ghostcomm folder already exists. Removing..."
  rm -rf "$HOME/ghostcomm"
fi

git clone https://github.com/Vihnie/ghostcomm.git "$HOME/ghostcomm"
cd "$HOME/ghostcomm" || { echo "❌ Failed to enter ghostcomm directory"; exit 1; }

echo "[📦] Installing dependencies..."
npm install

echo "[📎] Creating GhostVin global command to launch UI..."
mkdir -p "$HOME/.local/bin"

cat << 'EOF' > "$HOME/.local/bin/GhostVin"
#!/data/data/com.termux/files/usr/bin/bash
cd $HOME/ghostcomm
node index.js
EOF

chmod +x "$HOME/.local/bin/GhostVin"

# Ensure ~/.local/bin is in PATH
if ! grep -q 'export PATH=$HOME/.local/bin:$PATH' "$HOME/.bashrc"; then
  echo 'export PATH=$HOME/.local/bin:$PATH' >> "$HOME/.bashrc"
fi

source "$HOME/.bashrc"

echo "[🚀] GhostComm is ready. Type 'GhostVin' to launch the UI!"
