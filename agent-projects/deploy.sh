#!/bin/bash
# ═══════════════════════════════════════════════════
# Agent OS — Master Deploy Script (v3)
# Run this on your VPS: ssh root@31.220.62.81
# ═══════════════════════════════════════════════════

set -e

echo "═══════════════════════════════════════════"
echo "  Agent OS — Phase 3 Deploy v3"
echo "═══════════════════════════════════════════"

# ── 1. PULL LATEST CODE ──
echo ""
echo "▶ [1/7] Pulling latest code..."
cd /root/agentos 2>/dev/null || { echo "ERROR: /root/agentos not found."; exit 1; }
git pull origin main

# ── 2. GHCR LOGIN ──
echo ""
echo "▶ [2/7] Authenticating to GHCR..."
if [ -f /root/.docker/config.json ]; then
    echo "  ✅ Already logged in to GHCR"
else
    echo "  Logging in to ghcr.io..."
    # Set GITHUB_PAT before running this script, or paste it below:
    # export GITHUB_PAT="github_pat_..."
    if [ -z "$GITHUB_PAT" ]; then
        echo "  ⚠️  GITHUB_PAT not set. Set it before running:"
        echo "  export GITHUB_PAT=github_pat_xxxxxxxxxxxx"
        echo "  Or: echo 'github_pat_xxx' | docker login ghcr.io -u arisecrewyes --password-stdin"
    else
        echo "$GITHUB_PAT" | docker login ghcr.io -u arisecrewyes --password-stdin 2>/dev/null && echo "  ✅ GHCR login OK" || echo "  ⚠️  GHCR login failed"
    fi
fi

# ── 3. CREATE PROJECT DIRECTORIES ──
echo ""
echo "▶ [3/7] Creating project directories..."
PROJECTS="hermes-agent odysseus bolt-diy content-creator memory-brain osint skills conductor hermes-voice goldie-stack minimax-hermes second-brain dograh coldcontactxlsx agent-connector"
for p in $PROJECTS; do
    mkdir -p /root/agentos-projects/$p
done
echo "  Created $(echo $PROJECTS | wc -w) project directories"

# ── 4. COPY COMPOSE FILES ──
echo ""
echo "▶ [4/7] Copying compose files..."
for p in $PROJECTS; do
    if [ -f "/root/agentos/agent-projects/compose/$p/docker-compose.yml" ]; then
        cp "/root/agentos/agent-projects/compose/$p/docker-compose.yml" "/root/agentos-projects/$p/docker-compose.yml"
        echo "  ✅ $p"
    else
        echo "  ⚠️  $p — compose file not found, skipping"
    fi
done

# ── 5. CREATE SHARED NETWORK ──
echo ""
echo "▶ [5/7] Setting up Docker network..."
docker network create root_default 2>/dev/null && echo "  ✅ root_default network created" || echo "  ✅ root_default already exists"

# ── 6. CREATE SHARED VOLUMES ──
echo ""
echo "▶ [6/7] Creating shared volumes..."
docker volume create agentos-data 2>/dev/null && echo "  ✅ agentos-data volume created" || echo "  ✅ agentos-data already exists"
docker volume create obsidian-vault 2>/dev/null && echo "  ✅ obsidian-vault volume created" || echo "  ✅ obsidian-vault already exists"

# ── 7. DEPLOY ALL PROJECTS ──
echo ""
echo "▶ [7/7] Deploying all projects..."
echo ""

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

echo "▶ Verifying containers..."
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | head -30

echo ""
echo "▶ Next steps:"
echo "  1. Check container health: docker ps"
echo "  2. View logs: docker compose -f /root/agentos-projects/<project>/docker-compose.yml logs"
echo "  3. Test connector: curl http://localhost:8888/health"
echo "  4. Set API keys in .env file"
echo ""
echo "═══════════════════════════════════════════"
