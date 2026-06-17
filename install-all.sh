#!/bin/bash
# Agent OS - Complete VPS Setup Script v2
# Each agent group is a Docker project with its own docker-compose.yml
# matching the Agent OS dashboard's agent categories.
#
# Usage (on VPS as root):
#   cd /root/agentos && git pull origin main && bash install-all.sh
#
# After running, start everything with:
#   bash start-all.sh

set -e

PROJECTS_DIR="/root/agentos-projects"
LOG_FILE="/tmp/agentos-install-$(date +%Y%m%d-%H%M%S).log"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log()   { echo -e "${GREEN}[✓]${NC} $1" | tee -a "$LOG_FILE"; }
warn()   { echo -e "${YELLOW}[!]${NC} $1" | tee -a "$LOG_FILE"; }
error()  { echo -e "${RED}[✗]${NC} $1" | tee -a "$LOG_FILE"; }
info()   { echo -e "${BLUE}[i]${NC} $1" | tee -a "$LOG_FILE"; }

# ============================================
# PHASE 0: Prerequisites
# ============================================
echo ""
echo "=========================================="
echo " Agent OS v2 — Complete VPS Setup"
echo " Projects dir: $PROJECTS_DIR"
echo " Log file: $LOG_FILE"
echo "=========================================="

mkdir -p "$PROJECTS_DIR"

# Load .env if present (for API keys, etc.)
if [ -f /root/agentos/.env ]; then
  source /root/agentos/.env
  log "Loaded .env from /root/agentos"
fi

# Ensure Docker is available
command -v docker >/dev/null 2>&1 || { error "Docker not found. Install Docker first."; exit 1; }
docker compose version >/dev/null 2>&1 || { error "Docker Compose v2 not found."; exit 1; }
log "Docker & Docker Compose available"

# Ensure the shared Traefik network exists
docker network ls | grep -q root_default || {
  docker network create root_default
  log "Created root_default network"
}

# System packages (only what's needed for Docker management)
apt-get update -qq
apt-get install -y -qq curl wget git jq unzip 2>/dev/null
log "System tools ready"

# ============================================
# Helper: create a docker-compose project
# Usage: create_project "name" "port" "image" [extra_env_vars...]
# ============================================
create_project() {
  local name="$1"
  local port="$2"
  local image="$3"
  shift 3
  local proj_dir="$PROJECTS_DIR/$name"

  mkdir -p "$proj_dir"

  # Build env section
  local env_section=""
  for env_var in "$@"; do
    env_section="${env_section}      - ${env_var}"$'\n'
  done

  cat > "$proj_dir/docker-compose.yml" << COMPOSE
services:
  ${name}:
    image: ${image}
    container_name: ${name}
    restart: unless-stopped
    expose:
      - "${port}"
${env_section}    networks:
      - root_default
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.${name}.rule=Host(\`${name}.srv1121935.hstgr.cloud\`)"
      - "traefik.http.routers.${name}.entrypoints=websecure"
      - "traefik.http.routers.${name}.tls=true"
      - "traefik.http.routers.${name}.tls.certresolver=mytlschallenge"
      - "traefik.http.routers.${name}.middlewares=agentos-headers"
      - "traefik.http.routers.${name}-http.rule=Host(\`${name}.srv1121935.hstgr.cloud\`)"
      - "traefik.http.routers.${name}-http.entrypoints=web"
      - "traefik.http.routers.${name}-http.middlewares=agentos-redirect"
      - "traefik.http.middlewares.agentos-headers.headers.SSLRedirect=true"
      - "traefik.http.middlewares.agentos-headers.headers.STSSeconds=315360000"
      - "traefik.http.middlewares.agentos-headers.headers.browserXSSFilter=true"
      - "traefik.http.middlewares.agentos-headers.headers.contentTypeNosniff=true"
      - "traefik.http.middlewares.agentos-redirect.redirectscheme.scheme=https"
      - "traefik.http.services.${name}.loadbalancer.server.port=${port}"

networks:
  root_default:
    external: true
COMPOSE

  log "Created project: $name (port $port)"
}

# ============================================
# PHASE 1: Main Agent (Agent Creator)
# ============================================
echo ""
echo "=== PHASE 1: Agent Creator ==="

create_project "agent-creator" "3001" "ghcr.io/arisecrewyes/agent-creator:latest" \
  "NODE_ENV=production" \
  "OPENROUTER_API_KEY=${OPENROUTER_API_KEY:-your-key-here}"

# ============================================
# PHASE 2: Hermes Agent (Automation)
# ============================================
echo ""
echo "=== PHASE 2: Hermes Agent ==="

# Hermes main agent
create_project "hermes" "8642" "ghcr.io/arisecrewyes/hermes-agent:latest" \
  "NODE_ENV=production" \
  "OPENROUTER_API_KEY=${OPENROUTER_API_KEY:-your-key-here}" \
  "API_SERVER_ENABLED=true" \
  "API_SERVER_PORT=8642"

# ============================================
# PHASE 3: Odysseus (AI Workspace)
# ============================================
echo ""
echo "=== PHASE 3: Odysseus ==="

create_project "odysseus" "7000" "ghcr.io/arisecrewyes/odysseus:latest" \
  "NODE_ENV=production" \
  "OPENROUTER_API_KEY=${OPENROUTER_API_KEY:-your-key-here}"

# ============================================
# PHASE 4: Bolt DIY (Coding & Development)
# ============================================
echo ""
echo "=== PHASE 4: Bolt DIY ==="

create_project "bolt-diy" "5173" "ghcr.io/arisecrewyes/bolt-diy:latest" \
  "NODE_ENV=production" \
  "OPENROUTER_API_KEY=${OPENROUTER_API_KEY:-your-key-here}"

# ============================================
# PHASE 5: Content Creation Stack
# ============================================
echo ""
echo "=== PHASE 5: Content Creation Stack ==="

# Content Creator orchestrator
create_project "content-creator" "8080" "ghcr.io/arisecrewyes/content-creator:latest" \
  "NODE_ENV=production" \
  "OPENROUTER_API_KEY=${OPENROUTER_API_KEY:-your-key-here}"

# Individual content tools (lightweight, no separate subdomain needed)
mkdir -p "$PROJECTS_DIR/content-tools"

cat > "$PROJECTS_DIR/content-tools/docker-compose.yml" << 'COMPOSE'
services:
  reclip:
    image: ghcr.io/arisecrewyes/reclip:latest
    container_name: content-reclip
    restart: unless-stopped
    expose:
      - "8081"
    networks:
      - root_default

  sherlock:
    image: ghcr.io/arisecrewyes/sherlock:latest
    container_name: content-sherlock
    restart: unless-stopped
    expose:
      - "8082"
    networks:
      - root_default

  pake:
    image: ghcr.io/arisecrewyes/pake:latest
    container_name: content-pake
    restart: unless-stopped
    expose:
      - "8083"
    networks:
      - root_default

  hyperframes:
    image: ghcr.io/arisecrewyes/hyperframes:latest
    container_name: content-hyperframes
    restart: unless-stopped
    expose:
      - "8084"
    networks:
      - root_default

networks:
  root_default:
    external: true
COMPOSE

log "Created content-tools project (reclip, sherlock, pake, hyperframes)"

# ============================================
# PHASE 6: Memory & Brain Stack
# ============================================
echo ""
echo "=== PHASE 6: Memory & Brain Stack ==="

# Memory Engine (Obsidian + OMI bridge)
create_project "memory-engine" "8090" "ghcr.io/arisecrewyes/memory-engine:latest" \
  "NODE_ENV=production" \
  "OPENROUTER_API_KEY=${OPENROUTER_API_KEY:-your-key-here}"

# Memory & Brain Systems
mkdir -p "$PROJECTS_DIR/memory-brain"

cat > "$PROJECTS_DIR/memory-brain/docker-compose.yml" << 'COMPOSE'
services:
  memanto:
    image: ghcr.io/arisecrewyes/memanto:latest
    container_name: mem-memanto
    restart: unless-stopped
    expose:
      - "8091"
    networks:
      - root_default

  quant-mind:
    image: ghcr.io/arisecrewyes/quant-mind:latest
    container_name: mem-quant-mind
    restart: unless-stopped
    expose:
      - "8092"
    networks:
      - root_default

  turbovec:
    image: ghcr.io/arisecrewyes/turbovec:latest
    container_name: mem-turbovec
    restart: unless-stopped
    expose:
      - "8093"
    networks:
      - root_default

  deer-flow:
    image: ghcr.io/arisecrewyes/deer-flow:latest
    container_name: mem-deer-flow
    restart: unless-stopped
    expose:
      - "8094"
    networks:
      - root_default

networks:
  root_default:
    external: true
COMPOSE

log "Created memory-brain project (memanto, quant-mind, turbovec, deer-flow)"

# ============================================
# PHASE 7: OSINT & Research
# ============================================
echo ""
echo "=== PHASE 7: OSINT & Research ==="

mkdir -p "$PROJECTS_DIR/osint"

cat > "$PROJECTS_DIR/osint/docker-compose.yml" << 'COMPOSE'
services:
  sherlock-osint:
    image: ghcr.io/arisecrewyes/sherlock:latest
    container_name: osint-sherlock
    restart: unless-stopped
    expose:
      - "9090"
    networks:
      - root_default

  gitrecon:
    image: ghcr.io/arisecrewyes/gitrecon:latest
    container_name: osint-gitrecon
    restart: unless-stopped
    expose:
      - "9091"
    networks:
      - root_default

  google-dorking:
    image: ghcr.io/arisecrewyes/google-dorking:latest
    container_name: osint-google-dorking
    restart: unless-stopped
    expose:
      - "9092"
    networks:
      - root_default

networks:
  root_default:
    external: true
COMPOSE

log "Created osint project (sherlock, gitrecon, google-dorking)"

# ============================================
# PHASE 8: Skills & Creation
# ============================================
echo ""
echo "=== PHASE 8: Skills & Creation ==="

mkdir -p "$PROJECTS_DIR/skills"

cat > "$PROJECTS_DIR/skills/docker-compose.yml" << 'COMPOSE'
services:
  harness:
    image: ghcr.io/arisecrewyes/harness:latest
    container_name: skills-harness
    restart: unless-stopped
    expose:
      - "9100"
    networks:
      - root_default

  stop-slop:
    image: ghcr.io/arisecrewyes/stop-slop:latest
    container_name: skills-stop-slop
    restart: unless-stopped
    expose:
      - "9101"
    networks:
      - root_default

  skillopt:
    image: ghcr.io/arisecrewyes/skillopt:latest
    container_name: skills-skillopt
    restart: unless-stopped
    expose:
      - "9102"
    networks:
      - root_default

  humanizer:
    image: ghcr.io/arisecrewyes/humanizer:latest
    container_name: skills-humanizer
    restart: unless-stopped
    expose:
      - "9103"
    networks:
      - root_default

networks:
  root_default:
    external: true
COMPOSE

log "Created skills project (harness, stop-slop, skillopt, humanizer)"

# ============================================
# PHASE 9: Conductor (Browser Agents)
# ============================================
echo ""
echo "=== PHASE 9: Conductor Stack ==="

create_project "conductor" "3002" "ghcr.io/arisecrewyes/conductor:latest" \
  "NODE_ENV=production" \
  "BROWSE_SH_API_KEY=${BROWSE_SH_API_KEY:-your-key-here}"

# ============================================
# PHASE 10: Hermes Voice (Voice AI)
# ============================================
echo ""
echo "=== PHASE 10: Hermes Voice ==="

create_project "hermes-voice" "8643" "ghcr.io/arisecrewyes/hermes-voice:latest" \
  "NODE_ENV=production" \
  "OPENROUTER_API_KEY=${OPENROUTER_API_KEY:-your-key-here}"

# ============================================
# PHASE 11: Goldie Stack (Hermes + Codex + MCP)
# ============================================
echo ""
echo "=== PHASE 11: Goldie Stack ==="

mkdir -p "$PROJECTS_DIR/goldie-stack"

cat > "$PROJECTS_DIR/goldie-stack/docker-compose.yml" << 'COMPOSE'
services:
  hermes-mcp:
    image: ghcr.io/arisecrewyes/hermes-agent:latest
    container_name: goldie-hermes-mcp
    restart: unless-stopped
    expose:
      - "8650"
    environment:
      - API_SERVER_ENABLED=true
      - API_SERVER_PORT=8650
    networks:
      - root_default

  codex:
    image: ghcr.io/arisecrewyes/codex:latest
    container_name: goldie-codex
    restart: unless-stopped
    expose:
      - "8651"
    networks:
      - root_default

networks:
  root_default:
    external: true
COMPOSE

log "Created goldie-stack project (hermes-mcp, codex)"

# ============================================
# PHASE 12: MiniMax M3 + Hermes
# ============================================
echo ""
echo "=== PHASE 12: MiniMax M3 + Hermes ==="

create_project "minimax-hermes" "8660" "ghcr.io/arisecrewyes/minimax-hermes:latest" \
  "NODE_ENV=production" \
  "OPENROUTER_API_KEY=${OPENROUTER_API_KEY:-your-key-here}" \
  "MINIMAX_API_KEY=${MINIMAX_API_KEY:-your-key-here}"

# ============================================
# PHASE 13: Second Brain
# ============================================
echo ""
echo "=== PHASE 13: Second Brain ==="

create_project "second-brain" "8095" "ghcr.io/arisecrewyes/second-brain:latest" \
  "NODE_ENV=production" \
  "OPENROUTER_API_KEY=${OPENROUTER_API_KEY:-your-key-here}"

# ============================================
# PHASE 14: Dograh (Voice AI)
# ============================================
echo ""
echo "=== PHASE 14: Dograh ==="

create_project "dograh" "8670" "ghcr.io/arisecrewyes/dograh:latest" \
  "NODE_ENV=production"

# ============================================
# PHASE 15: ColdContactXLSX (Email Outreach)
# ============================================
echo ""
echo "=== PHASE 15: ColdContactXLSX ==="

create_project "coldcontactxlsx" "8680" "ghcr.io/arisecrewyes/coldcontactxlsx:latest" \
  "NODE_ENV=production"

# ============================================
# PHASE 16: Obsidian (Second Brain Vault)
# ============================================
echo ""
echo "=== PHASE 16: Obsidian ==="

mkdir -p /root/obsidian-vault

# Obsidian is a desktop app — we install the CLI/server component
wget -q "https://github.com/obsidianmd/obsidian-releases/releases/download/v1.7.7/Obsidian-1.7.7.AppImage" \
  -O /usr/local/bin/obsidian 2>/dev/null || warn "Obsidian download may need manual steps"
chmod +x /usr/local/bin/obsidian 2>/dev/null || true
log "Obsidian installed at /usr/local/bin/obsidian"
log "Obsidian vault at /root/obsidian-vault"

# ============================================
# PHASE 17: cloudflared (Tunnel)
# ============================================
echo ""
echo "=== PHASE 17: cloudflared ==="

if ! command -v cloudflared &>/dev/null; then
  curl -fsSL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb -o /tmp/cloudflared.deb
  dpkg -i /tmp/cloudflared.deb 2>/dev/null || apt-get install -f -y 2>/dev/null
  rm -f /tmp/cloudflared.deb
  log "cloudflared installed"
else
  log "cloudflared already installed"
fi

# ============================================
# PHASE 18: Browse.sh (Browser Skills)
# ============================================
echo ""
echo "=== PHASE 18: Browse.sh ==="

if ! command -v browse &>/dev/null; then
  npm install -g @anthropic/browse 2>/dev/null || \
  npm install -g browse 2>/dev/null || \
  warn "browse.sh install may need manual steps"
  log "browse.sh installed"
else
  log "browse.sh already installed"
fi

# ============================================
# Create master start-all.sh
# ============================================
echo ""
echo "=== Creating start-all.sh ==="

cat > "$PROJECTS_DIR/start-all.sh" << 'STARTEOF'
#!/bin/bash
# Start all Agent OS projects
# Usage: bash /root/agentos-projects/start-all.sh

set -e

PROJECTS_DIR="/root/agentos-projects"
cd "$PROJECTS_DIR"

echo "=========================================="
echo " Starting all Agent OS projects..."
echo "=========================================="

# Start each project
for dir in */; do
  if [ -f "$dir/docker-compose.yml" ]; then
    echo ""
    echo "--- Starting ${dir%/} ---"
    cd "$dir"
    docker compose up -d 2>&1
    cd "$PROJECTS_DIR"
  fi
done

# Also start content-tools, memory-brain, osint, skills, goldie-stack
for subproject in content-tools memory-brain osint skills goldie-stack; do
  if [ -f "$subproject/docker-compose.yml" ]; then
    echo ""
    echo "--- Starting $subproject ---"
    cd "$subproject"
    docker compose up -d 2>&1
    cd "$PROJECTS_DIR"
  fi
done

echo ""
echo "=========================================="
echo " All projects started!"
echo "=========================================="
echo ""
echo "Running containers:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -v "traefik\|redis\|postgres" || true
echo ""
echo "Access your services at:"
echo "  Agent OS Dashboard:  https://agentos.srv1121935.hstgr.cloud"
echo "  Agent Creator:      https://agent-creator.srv1121935.hstgr.cloud"
echo "  Hermes:             https://hermes.srv1121935.hstgr.cloud"
echo "  Odysseus:           https://odysseus.srv1121935.hstgr.cloud"
echo "  Bolt DIY:           https://bolt-diy.srv1121935.hstgr.cloud"
echo "  Content Creator:    https://content-creator.srv1121935.hstgr.cloud"
echo "  Memory Engine:      https://memory-engine.srv1121935.hstgr.cloud"
echo "  Conductor:          https://conductor.srv1121935.hstgr.cloud"
echo "  Hermes Voice:       https://hermes-voice.srv1121935.hstgr.cloud"
echo "  Goldie Stack:       https://goldie-stack.srv1121935.hstgr.cloud"
echo "  MiniMax Hermes:     https://minimax-hermes.srv1121935.hstgr.cloud"
echo "  Second Brain:       https://second-brain.srv1121935.hstgr.cloud"
echo "  Dograh:             https://dograh.srv1121935.hstgr.cloud"
echo "  ColdContactXLSX:    https://coldcontactxlsx.srv1121935.hstgr.cloud"
echo ""
STARTEOF

chmod +x "$PROJECTS_DIR/start-all.sh"
log "Created start-all.sh"

# ============================================
# Create master stop-all.sh
# ============================================

cat > "$PROJECTS_DIR/stop-all.sh" << 'STOPEOF'
#!/bin/bash
# Stop all Agent OS projects
# Usage: bash /root/agentos-projects/stop-all.sh

PROJECTS_DIR="/root/agentos-projects"
cd "$PROJECTS_DIR"

echo "Stopping all Agent OS projects..."

for dir in */; do
  if [ -f "$dir/docker-compose.yml" ]; then
    cd "$dir"
    docker compose down 2>&1
    cd "$PROJECTS_DIR"
  fi
done

for subproject in content-tools memory-brain osint skills goldie-stack; do
  if [ -f "$subproject/docker-compose.yml" ]; then
    cd "$subproject"
    docker compose down 2>&1
    cd "$PROJECTS_DIR"
  fi
done

echo "All projects stopped."
STOPEOF

chmod +x "$PROJECTS_DIR/stop-all.sh"
log "Created stop-all.sh"

# ============================================
# SUMMARY
# ============================================
echo ""
echo "=========================================="
echo " Installation Complete!"
echo "=========================================="
echo ""
echo "Projects created in $PROJECTS_DIR:"
ls -1 "$PROJECTS_DIR" | while read p; do
  if [ -f "$PROJECTS_DIR/$p/docker-compose.yml" ] || [ -d "$PROJECTS_DIR/$p" ]; then
    echo "  📦 $p"
  fi
done
echo ""
echo "Dashboard agents → Docker projects mapping:"
echo "  🏗️  Agent Creator      → agent-creator"
echo "  🤖 Hermes Automation  → hermes"
echo "  🌐 Odysseus           → odysseus"
echo "  💻 Bolt DIY           → bolt-diy"
echo "  🎬 Content Creator    → content-creator + content-tools/"
echo "  📚 Memory Engine      → memory-engine + memory-brain/"
echo "  🔍 OSINT Specialist   → osint/"
echo "  ⚡ Skill Master        → skills/"
echo "  🎻 Conductor          → conductor"
echo "  📞 Hermes Voice       → hermes-voice"
echo "  🏗️  Goldie Stack        → goldie-stack/"
echo "  ⚙️  MiniMax M3         → minimax-hermes"
echo "  💾 Second Brain       → second-brain"
echo "  🗣️  Dograh             → dograh"
echo "  📧 ColdContactXLSX    → coldcontactxlsx"
echo ""
echo "Next steps:"
echo "  1. Edit /root/agentos/.env with your API keys"
echo "  2. Start everything: bash $PROJECTS_DIR/start-all.sh"
echo "  3. Check status: docker ps"
echo "  4. View logs: docker compose -f $PROJECTS_DIR/<project>/docker-compose.yml logs -f"
echo ""
echo "Log file: $LOG_FILE"
echo "=========================================="
