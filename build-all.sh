#!/bin/bash
# Agent OS — Master Build & Push Script
# Builds all Docker images and pushes to GHCR
#
# Prerequisites:
#   - Docker installed
#   - Logged in to GHCR: docker login ghcr.io -u arisecrewyes
#   - GitHub PAT with packages:write scope
#
# Usage:
#   chmod +x build-all.sh
#   ./build-all.sh              # Build all projects
#   ./build-all.sh memory-brain # Build specific project

set -e

REGISTRY="ghcr.io/arisecrewyes"
DOCKERFILES_DIR="$(dirname "$0")/dockerfiles"
LOG="/tmp/agentos-build-$(date +%Y%m%d-%H%M%S).log"

log()   { echo "[✓] $1" | tee -a "$LOG"; }
warn()  { echo "[!] $1" | tee -a "$LOG"; }
error() { echo "[✗] $1" | tee -a "$LOG"; }

command -v docker >/dev/null 2>&1 || { error "Docker not found"; exit 1; }
log "Docker available"

build_push() {
  local name="$1"
  local context="$2"
  log "Building ${name}..."
  if docker build -t "${REGISTRY}/${name}:latest" "${context}" 2>>"$LOG"; then
    log "Pushing ${name}..."
    docker push "${REGISTRY}/${name}:latest" 2>>"$LOG" && \
      log "✓ ${name} done" || warn "✗ ${name} push failed"
  else
    error "✗ ${name} build failed"
  fi
}

build_project() {
  local project="$1"
  local dir="${DOCKERFILES_DIR}/${project}"
  [ ! -d "$dir" ] && { warn "Dir not found: $dir"; return; }
  log "=== ${project} ==="
  case "$project" in
    memory-brain)
      build_push "memory-engine"  "${dir}/memory-engine"
      build_push "memanto"        "${dir}/memanto"
      build_push "quant-mind"     "${dir}/quant-mind"
      build_push "turbovec"       "${dir}/turbovec"
      build_push "alook"          "${dir}/alook"
      build_push "deer-flow"      "${dir}/deer-flow"
      ;;
    skills)
      build_push "skill-master"   "${dir}/skill-master"
      build_push "harness"        "${dir}/harness"
      build_push "skillopt"       "${dir}/skillopt"
      build_push "skillseekers"   "${dir}/skillseekers"
      build_push "book-to-skill"  "${dir}/book-to-skill"
      build_push "humanizer"      "${dir}/humanizer"
      build_push "stop-slop"      "${dir}/stop-slop"
      ;;
    content-creator)
      build_push "content-creator"    "${dir}/content-creator"
      build_push "reclip"             "${dir}/reclip"
      build_push "clypra"             "${dir}/clypra"
      build_push "hyperframes"        "${dir}/hyperframes"
      build_push "open-generative-ai" "${dir}/open-generative-ai"
      build_push "salesgpt"           "${dir}/salesgpt"
      build_push "leads-generator"    "${dir}/leads-generator"
      build_push "vimax"              "${dir}/vimax"
      build_push "vibevoice"          "${dir}/vibevoice"
      build_push "social-media-scraping" "${dir}/social-media-scraping"
      build_push "nango"              "${dir}/nango"
      build_push "video-use"          "${dir}/video-use"
      build_push "wa-automate"        "${dir}/wa-automate"
      ;;
    osint)
      build_push "sherlock"          "${dir}/sherlock"
      build_push "gitrecon"          "${dir}/gitrecon"
      build_push "google-dorking"    "${dir}/google-dorking"
      ;;
    ai-workspace)
      build_push "odysseus"          "${dir}/odysseus"
      build_push "minimax-hermes"    "${dir}/minimax-hermes"
      build_push "second-brain"      "${dir}/second-brain"
      ;;
    coding-dev)
      build_push "bolt-diy"          "${dir}/bolt-diy"
      build_push "codex"             "${dir}/codex"
      ;;
    automation)
      build_push "hermes-voice"      "${dir}/hermes-voice"
      ;;
  esac
}

echo "=========================================="
echo " Agent OS — Docker Build & Push"
echo " Registry: ${REGISTRY}"
echo " Dockerfiles: ${DOCKERFILES_DIR}"
echo " Log: ${LOG}"
echo "=========================================="

if [ -n "$1" ]; then
  build_project "$1"
else
  for p in memory-brain skills content-creator osint ai-workspace coding-dev automation; do
    build_project "$p"
    echo ""
  done
fi

echo ""
echo "=========================================="
echo " Build complete!"
echo " Log: ${LOG}"
echo "=========================================="
echo ""
echo "Next steps:"
echo "  1. Verify images: docker images | grep ghcr.io/arisecrewyes"
echo "  2. Deploy on Hostinger using DOCKER-DEPLOY.md"
echo "  3. Test each project"
