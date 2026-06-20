#!/bin/bash
# ═══════════════════════════════════════════
# Agent OS — Clean Redeploy Script
# Stops old containers, removes old images,
# pulls fresh ones, and redeploys.
# ═══════════════════════════════════════════

set -e

cd /root/agentos

PROJECTS="hermes-agent odysseus bolt-diy content-creator memory-brain osint skills conductor hermes-voice goldie-stack minimax-hermes second-brain dograh coldcontactxlsx agent-connector"

echo "▶ Stopping and removing old containers..."
for p in $PROJECTS; do
  docker stop $(docker ps -q --filter "name=$(echo $p | tr '-' '_')") 2>/dev/null || true
  docker compose -f /root/agentos-projects/$p/docker-compose.yml down 2>/dev/null || true
done
echo "  ✅ Done"

echo ""
echo "▶ Removing old images..."
for p in $PROJECTS; do
  docker rmi ghcr.io/arisecrewyes/$p:latest 2>/dev/null || true
done
echo "  ✅ Done"

echo ""
echo "▶ Pulling fresh images..."
for p in $PROJECTS; do
  echo "  Pulling $p..."
  docker pull ghcr.io/arisecrewyes/$p:latest 2>&1 | tail -1
done
echo "  ✅ Done"

echo ""
echo "▶ Deploying all projects..."
DEPLOYED=0
FAILED=0
for p in $PROJECTS; do
  echo "  ▶ $p..."
  if (cd /root/agentos-projects/$p && docker compose up -d 2>&1 | tail -1); then
    echo "  ✅ $p"
    DEPLOYED=$((DEPLOYED + 1))
  else
    echo "  ❌ $p FAILED"
    FAILED=$((FAILED + 1))
  fi
done

echo ""
echo "═══════════════════════════════════════════"
echo "  Deployed: $DEPLOYED | Failed: $FAILED"
echo "═══════════════════════════════════════════"

sleep 5

echo ""
echo "▶ Container status..."
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -E "(hermes|odysseus|bolt|content|memory|osint|skills|conductor|goldie|minimax|second|dograh|coldcontact|agent-connector|agent-os)"
