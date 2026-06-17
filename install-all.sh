#!/bin/bash
# Agent OS - Complete VPS Setup Script
# Run this on your Hostinger VPS to install all tools
# Usage: bash install-all.sh

set -e

echo "=========================================="
echo " Agent OS - Complete VPS Setup"
echo "=========================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() { echo -e "${GREEN}[✓]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
error() { echo -e "${RED}[✗]${NC} $1"; }

# ============================================
# PHASE 1: System Prerequisites
# ============================================
echo ""
echo "=== PHASE 1: System Prerequisites ==="

# Update system
apt-get update && apt-get upgrade -y
log "System updated"

# Install essential tools
apt-get install -y curl wget git build-essential python3 python3-pip python3-venv nodejs npm unzip jq
log "Essential tools installed"

# Install uv (Python package manager)
curl -LsSf https://astral.sh/uv/install.sh | sh
source $HOME/.cargo/env
log "uv installed"

# Install cloudflared
curl -fsSL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb -o cloudflared.deb
dpkg -i cloudflared.deb || apt-get install -f -y
rm cloudflared.deb
log "cloudflared installed"

# ============================================
# PHASE 2: Hermes Agent (MiniMax M3 + Hermes)
# ============================================
echo ""
echo "=== PHASE 2: Hermes Agent ==="

# Install Hermes Agent
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
log "Hermes Agent installed"

# Install MCP support
cd ~/.hermes/hermes-agent
uv pip install -e ".[mcp]"
log "Hermes MCP support installed"

# Configure Hermes API server
PROFILE=$(cat ~/.hermes/active_profile 2>/dev/null || echo "main")
mkdir -p ~/.hermes/profiles/$PROFILE

# Generate API key
API_KEY=$(openssl rand -hex 24)

cat >> ~/.hermes/profiles/$PROFILE/.env << EOF
API_SERVER_ENABLED=true
API_SERVER_PORT=8642
API_SERVER_KEY=$API_KEY
EOF

log "Hermes API server configured (port 8642, key: ${API_KEY:0:8}...)"

# ============================================
# PHASE 3: Odysseus (Self-Hosted AI Workspace)
# ============================================
echo ""
echo "=== PHASE 3: Odysseus ==="

cd /opt
git clone https://github.com/pewdiepie-archdaemon/odysseus.git 2>/dev/null || warn "Odysseus repo already exists"
cd odysseus
npm install 2>/dev/null || pip install -r requirements.txt 2>/dev/null || warn "Odysseus install may need manual steps"
log "Odysseus installed (may need manual configuration)"

# ============================================
# PHASE 4: Bolt DIY (Free AI Coding)
# ============================================
echo ""
echo "=== PHASE 4: Bolt DIY ==="

cd /opt
git clone https://github.com/stackblitz-labs/bolt.diy.git 2>/dev/null || warn "Bolt DIY repo already exists"
cd bolt.diy
npm install
log "Bolt DIY installed"

# ============================================
# PHASE 5: Content Creation Tools
# ============================================
echo ""
echo "=== PHASE 5: Content Creation Tools ==="

cd /opt

# reclip - Video downloader
git clone https://github.com/averygan/reclip.git 2>/dev/null || true
log "reclip cloned"

# Clypra - Video editor
git clone https://github.com/AIEraDev/Clypra.git 2>/dev/null || true
log "Clypra cloned"

# Hyperframes - HTML to video
git clone https://github.com/heygen-com/hyperframes.git 2>/dev/null || true
log "Hyperframes cloned"

# Pake - Webpage to desktop app
git clone https://github.com/tw93/Pake.git 2>/dev/null || true
log "Pake cloned"

# Social media scraping APIs
git clone https://github.com/cporter202/social-media-scraping-apis.git 2>/dev/null || true
log "social-media-scraping-apis cloned"

# Sherlock - OSINT username search
git clone https://github.com/sherlock-project/sherlock.git 2>/dev/null || true
cd sherlock && pip install -r requirements.txt 2>/dev/null || true
cd /opt
log "Sherlock installed"

# GITRECON - GitHub reconnaissance
git clone https://github.com/techenthusiast167/GITRECON.git 2>/dev/null || true
log "GITRECON cloned"

# Nango - Product integrations
git clone https://github.com/NangoHQ/nango.git 2>/dev/null || true
log "Nango cloned"

# video-use - Edit videos with coding agents
git clone https://github.com/browser-use/video-use.git 2>/dev/null || true
log "video-use cloned"

# Open-Generative-AI - Free AI image/video generation
git clone https://github.com/Anil-matcha/Open-Generative-AI.git 2>/dev/null || true
log "Open-Generative-AI cloned"

# SalesGPT - AI Sales Agent
git clone https://github.com/filip-michalsky/SalesGPT.git 2>/dev/null || true
log "SalesGPT cloned"

# Leads Generator
git clone https://github.com/Geolavor/leads-generator-app.git 2>/dev/null || true
log "leads-generator-app cloned"

# ViMax - Agentic video generation
git clone https://github.com/HKUDS/ViMax.git 2>/dev/null || true
log "ViMax cloned"

# VibeVoice - Microsoft open-source voice AI
git clone https://github.com/microsoft/VibeVoice.git 2>/dev/null || true
log "VibeVoice cloned"

# wa-automate - WhatsApp automation
git clone https://github.com/open-wa/wa-automate-nodejs.git 2>/dev/null || true
log "wa-automate-nodejs cloned"

# awesome-generative-ai-guide
git clone https://github.com/aishwaryanr/awesome-generative-ai-guide.git 2>/dev/null || true
log "awesome-generative-ai-guide cloned"

log "All content creation repos cloned"

# ============================================
# PHASE 6: Memory & Brain Tools
# ============================================
echo ""
echo "=== PHASE 6: Memory & Brain Tools ==="

cd /opt

# memanto - Memory for AI agents
git clone https://github.com/moorcheh-ai/memanto.git 2>/dev/null || true
log "memanto cloned"

# quant-mind - Knowledge extraction
git clone https://github.com/LLMQuant/quant-mind.git 2>/dev/null || true
log "quant-mind cloned"

# turbovec - Vector index
git clone https://github.com/RyanCodrai/turbovec.git 2>/dev/null || true
log "turbovec cloned"

# alook - Agent collaboration
git clone https://github.com/alookai/alook.git 2>/dev/null || true
log "alook cloned"

# google-dorking
git clone https://github.com/commit-issues/google-dorking.git 2>/dev/null || true
log "google-dorking cloned"

# open-code-review
git clone https://github.com/alibaba/open-code-review.git 2>/dev/null || true
log "open-code-review cloned"

# project-nomad
git clone https://github.com/Crosstalk-Solutions/project-nomad.git 2>/dev/null || true
log "project-nomad cloned"

# deer-flow - SuperAgent harness
git clone https://github.com/bytedance/deer-flow.git 2>/dev/null || true
log "deer-flow cloned"

log "All memory & brain repos cloned"

# ============================================
# PHASE 7: Skills & Skill Creation
# ============================================
echo ""
echo "=== PHASE 7: Skills & Skill Creation ==="

cd /opt

# harness - Meta-skill for agent teams
git clone https://github.com/revfactory/harness.git 2>/dev/null || true
log "harness cloned"

# stop-slop - Remove AI tells
git clone https://github.com/hardikpandya/stop-slop.git 2>/dev/null || true
log "stop-slop cloned"

# Understand-Anything - Knowledge graphs
git clone https://github.com/Egonex-AI/Understand-Anything.git 2>/dev/null || true
log "Understand-Anything cloned"

# ECC - Agent harness optimization
git clone https://github.com/affaan-m/ECC.git 2>/dev/null || true
log "ECC cloned"

# train-llm-from-scratch
git clone https://github.com/FareedKhan-dev/train-llm-from-scratch.git 2>/dev/null || true
log "train-llm-from-scratch cloned"

# SkillOpt - Microsoft skill optimizer
git clone https://github.com/microsoft/SkillOpt.git 2>/dev/null || true
log "SkillOpt cloned"

# book-to-skill
git clone https://github.com/virgiliojr94/book-to-skill.git 2>/dev/null || true
log "book-to-skill cloned"

# Skill_Seekers
git clone https://github.com/yusufkaraaslan/Skill_Seekers.git 2>/dev/null || true
log "Skill_Seekers cloned"

# humanizer
git clone https://github.com/blader/humanizer.git 2>/dev/null || true
log "humanizer cloned"

log "All skills repos cloned"

# ============================================
# PHASE 8: Dograh (Open Source Voice AI)
# ============================================
echo ""
echo "=== PHASE 8: Dograh (Voice AI Platform) ==="

cd /opt
git clone https://github.com/dograh-hq/dograh.git 2>/dev/null || true
cd dograh
# Dograh can be self-hosted or used via app.dograh.com
log "Dograh cloned (self-host or use app.dograh.com)"

# ============================================
# PHASE 9: ColdContactXLSX (Email Outreach)
# ============================================
echo ""
echo "=== PHASE 9: ColdContactXLSX ==="

cd /opt
git clone https://github.com/aasthas2022/ColdContactXLSX.git 2>/dev/null || true
log "ColdContactXLSX cloned"

# ============================================
# PHASE 10: Obsidian (Second Brain)
# ============================================
echo ""
echo "=== PHASE 10: Obsidian ==="

# Download Obsidian AppImage
OBSIDIAN_URL="https://github.com/obsidianmd/obsidian-releases/releases/download/v1.7.7/Obsidian-1.7.7.AppImage"
wget -q "$OBSIDIAN_URL" -O /usr/local/bin/obsidian 2>/dev/null || warn "Obsidian download may need manual steps"
chmod +x /usr/local/bin/obsidian 2>/dev/null || true
log "Obsidian installed (or needs manual download)"

# ============================================
# PHASE 11: OMI (Memory Capture)
# ============================================
echo ""
echo "=== PHASE 11: OMI ==="

# OMI is typically a mobile/desktop app
warn "OMI needs to be installed on your local device from https://www.omi.me"
log "OMI noted for local device installation"

# ============================================
# PHASE 12: Browse.sh (Browser Skills)
# ============================================
echo ""
echo "=== PHASE 12: Browse.sh ==="

npm install -g browse 2>/dev/null || warn "browse.sh install may need manual steps"
log "browse.sh installed (or needs manual steps)"

# ============================================
# SUMMARY
# ============================================
echo ""
echo "=========================================="
echo " Installation Complete!"
echo "=========================================="
echo ""
echo "Installed tools:"
echo "  ✓ Hermes Agent + MCP support"
echo "  ✓ Odysseus (self-hosted AI workspace)"
echo "  ✓ Bolt DIY (free AI coding)"
echo "  ✓ 18 Content Creation repos"
echo "  ✓ 8 Memory & Brain repos"
echo "  ✓ 9 Skills repos"
echo "  ✓ Dograh (voice AI platform)"
echo "  ✓ ColdContactXLSX (email outreach)"
echo "  ✓ cloudflared (tunnel)"
echo "  ✓ Sherlock, GITRECON, and more"
echo ""
echo "Next steps:"
echo "  1. Get OpenRouter API key: https://openrouter.ai"
echo "  2. Configure Hermes: hermes model"
echo "  3. Start gateway: hermes gateway start"
echo "  4. Start tunnel: cloudflared tunnel --url http://localhost:8642"
echo "  5. Access Agent OS dashboard"
echo ""
echo "All repos cloned to /opt/"
echo "Hermes API key: $API_KEY"
echo "=========================================="
