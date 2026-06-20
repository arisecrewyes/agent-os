#!/bin/bash
# ═══════════════════════════════════════════════════
# Agent OS — Master Deploy Script
# Run this on your VPS: ssh root@31.220.62.81
# ═══════════════════════════════════════════════════

set -e

echo "═══════════════════════════════════════════"
echo "  Agent OS — Phase 3 Deploy"
echo "═══════════════════════════════════════════"

# ── 1. PULL LATEST CODE ──
echo ""
echo "▶ [1/6] Pulling latest code..."
cd /root/agentos 2>/dev/null || { echo "ERROR: /root/agentos not found. Clone first:"; echo "  git clone https://github.com/arisecrewyes/agent-os.git /root/agentos"; exit 1; }
git pull origin main

# ── 2. CREATE PROJECT DIRECTORIES ──
echo ""
echo "▶ [2/6] Creating project directories..."
PROJECTS="hermes-agent odysseus bolt-diy content-creator memory-brain osint skills conductor hermes-voice goldie-stack minimax-hermes second-brain dograh coldcontactxlsx agent-connector"
for p in $PROJECTS; do
    mkdir -p /root/agentos-projects/$p
done
echo "  Created $(echo $PROJECTS | wc -w) project directories"

# ── 3. COPY COMPOSE FILES ──
echo ""
echo "▶ [3/6] Copying compose files..."
for p in $PROJECTS; do
    if [ -f "/root/agentos/agent-projects/compose/$p/docker-compose.yml" ]; then
        cp "/root/agentos/agent-projects/compose/$p/docker-compose.yml" "/root/agentos-projects/$p/docker-compose.yml"
        echo "  ✅ $p"
    else
        echo "  ⚠️  $p — compose file not found, skipping"
    fi
done

# ── 4. CREATE SHARED NETWORK ──
echo ""
echo "▶ [4/6] Setting up Docker network..."
docker network create root_default 2>/dev/null && echo "  ✅ root_default network created" || echo "  ✅ root_default already exists"

# ── 5. CREATE SHARED VOLUMES ──
echo ""
echo "▶ [5/6] Creating shared volumes..."
docker volume create agentos-data 2>/dev/null && echo "  ✅ agentos-data volume created" || echo "  ✅ agentos-data already exists"
docker volume create obsidian-vault 2>/dev/null && echo "  ✅ obsidian-vault volume created" || echo "  ✅ obsidian-vault already exists"

# ── 6. DEPLOY ALL PROJECTS ──
echo ""
echo "▶ [6/6] Deploying all projects..."
echo ""

# Check for .env file
if [ ! -f /root/agentos/.env ]; then
    echo "  ⚠️  No .env file found. Copy from .env.example:"
    echo "  cp /root/agentos/.env.example /root/agentos/.env"
    echo "  nano /root/agentos/.env  # fill in your API keys"
    echo ""
fi

DEPLOYED=0
FAILED=0

for p in $PROJECTS; do
    COMPOSE_FILE="/root/agentos-projects/$p/docker-compose.yml"
    if [ ! -f "$COMPOSE_FILE" ]; then
        echo "  ⏭️  $p — no compose file, skipping"
        continue
    fi
    
    echo "  ▶ Starting $p..."
    if (cd "/root/agentos-projects/$p" && docker compose up -d 2>&1); then
        echo "  ✅ $p deployed"
        DEPLOYED=$((DEPLOYED + 1))
    else
        echo "  ❌ $p failed (check logs with: cd /root/agentos-projects/$p && docker compose logs)"
        FAILED=$((FAILED + 1))
    fi
done

# ── SUMMARY ──
echo ""
echo "═══════════════════════════════════════════"
echo "  Deploy Complete"
echo "═══════════════════════════════════════════"
echo "  Deployed: $DEPLOYED"
echo "  Failed:   $FAILED"
echo ""

# ── VERIFY ──
echo "▶ Verifying containers..."
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | head -30

echo ""
echo "▶ Next steps:"
echo "  1. Check container health: docker ps"
echo "  2. View logs for any container: docker compose -f /root/agentos-projects/<project>/docker-compose.yml logs"
echo "  3. Test connector: curl http://localhost:8888/health"
echo "  4. Update dashboard chat API to route to tool containers"
echo ""
echo "═══════════════════════════════════════════"
