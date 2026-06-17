# Phase 3 — Main Category: Docker Compose YAML
# =============================================
#
# The Main category contains 3 "brain" agents:
#   1. Agent Creator  (🏗️) — AI-powered agent builder
#   2. OpenClaw       (🦀) — Gateway router & orchestrator
#   3. Claude          (🧠) — Intelligence layer
#
# These are pure AI agents — they run on OpenRouter's API, not external tools.
# Each is a single container. No external GitHub repos needed.
#
# DEPLOYMENT (3-step):
#   A) Deploy without SSL first (HTTP port access)
#   B) Connect to Agent OS dashboard and test
#   C) Add Traefik SSL labels after everything works
#
# APPROACH: These use Approach B (build our own) because they are custom
# services that need to connect to the Agent OS dashboard's chat API.
# =============================================


# =============================================
# PROJECT 1: Agent Creator (Main)
# =============================================
# Location: /root/agentos-projects/agent-creator/docker-compose.yml
# Dashboard Agent: 🏗️ Agent Creator
# What it does: Analyzes sources (URLs, repos, PDFs, eBooks) and builds
#               new AI agents. Has 5 API routes: analyze, chat, build,
#               plan, deploy-info.
# GitHub: Part of the agent-os repo (src/app/api/agent-creator/)
# Approach: B — Build from source (custom agent-os code)
# =============================================

# Save this as: /root/agentos-projects/agent-creator/docker-compose.yml

services:
  agent-creator:
    build:
      context: ./agent-creator
      dockerfile: Dockerfile
    container_name: agent-creator
    restart: unless-stopped
    expose:
      - "3001"
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - PORT=3001
    networks:
      - root_default
    # NO Traefik labels yet — add in Step C after testing

networks:
  root_default:
    external: true

# Save this as: /root/agentos-projects/agent-creator/agent-creator/Dockerfile

# ---- Dockerfile for agent-creator ----
# FROM node:22-alpine
# WORKDIR /app
# COPY package.json package-lock.json* ./
# RUN npm ci --only=production 2>/dev/null || npm install
# COPY . .
# RUN npm run build 2>/dev/null || true
# EXPOSE 3001
# CMD ["node", "server.js"]
# ---- End Dockerfile ----


# =============================================
# PROJECT 2: OpenClaw (Main)
# =============================================
# Location: /root/agentos-projects/openclaw/docker-compose.yml
# Dashboard Agent: 🦀 OpenClaw
# What it does: Multi-agent gateway & session router. Routes tasks between
#               all agents, manages sessions, coordinates inter-agent comms.
# GitHub: This IS the OpenClaw project — it's already running on this VPS
#         as the host for the Agent OS dashboard itself.
# Approach: This agent doesn't need a separate container — it's the VPS itself.
#           The Agent OS dashboard IS the OpenClaw interface.
#           We'll create a lightweight status/health container instead.
# =============================================

# Save this as: /root/agentos-projects/openclaw/docker-compose.yml

services:
  openclaw:
    image: ghcr.io/arisecrewyes/openclaw-gateway:latest
    container_name: openclaw
    restart: unless-stopped
    expose:
      - "8080"
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - PORT=8080
    networks:
      - root_default
    # NO Traefik labels yet — add in Step C after testing

networks:
  root_default:
    external: true

# NOTE: If ghcr.io/arisecrewyes/openclaw-gateway doesn't exist yet,
# use Approach B with this Dockerfile:

# ---- Dockerfile for openclaw ----
# FROM node:22-alpine
# WORKDIR /app
# COPY package.json package-lock.json* ./
# RUN npm ci --only=production 2>/dev/null || npm install
# COPY . .
# RUN npm run build 2>/dev/null || true
# EXPOSE 8080
# CMD ["node", "server.js"]
# ---- End Dockerfile ----


# =============================================
# PROJECT 3: Claude (Main)
# =============================================
# Location: /root/agentos-projects/claude/docker-compose.yml
# Dashboard Agent: 🧠 Claude
# What it does: Thinking layer — strategy, planning, code execution,
#               file analysis. Handles complex reasoning.
# GitHub: Uses Anthropic's Claude API via OpenRouter
# Approach: B — Build a custom gateway that connects to Claude API
# =============================================

# Save this as: /root/agentos-projects/claude/docker-compose.yml

services:
  claude:
    build:
      context: ./claude
      dockerfile: Dockerfile
    container_name: claude
    restart: unless-stopped
    expose:
      - "8081"
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY:-}
      - PORT=8081
    networks:
      - root_default
    # NO Traefik labels yet — add in Step C after testing

networks:
  root_default:
    external: true

# ---- Dockerfile for claude ----
# FROM node:22-alpine
# WORKDIR /app
# COPY package.json package-lock.json* ./
# RUN npm ci --only=production 2>/dev/null || npm install
# COPY . .
# RUN npm run build 2>/dev/null || true
# EXPOSE 8081
# CMD ["node", "server.js"]
# ---- End Dockerfile ----


# =============================================
# HOW TO DEPLOY (on Hostinger VPS)
# =============================================

# Step 1: Create project directories
#   mkdir -p /root/agentos-projects/agent-creator/agent-creator
#   mkdir -p /root/agentos-projects/openclaw
#   mkdir -p /root/agentos-projects/claude/claude

# Step 2: Copy docker-compose.yml to each directory
#   cp agent-creator-compose.yml /root/agentos-projects/agent-creator/docker-compose.yml
#   cp openclaw-compose.yml /root/agentos-projects/openclaw/docker-compose.yml
#   cp claude-compose.yml /root/agentos-projects/claude/docker-compose.yml

# Step 3: Create Dockerfiles (if using Approach B)
#   Each folder needs a Dockerfile (see above)

# Step 4: Create .env files with your API keys
#   echo 'OPENROUTER_API_KEY=your-key-here' > /root/agentos-projects/agent-creator/.env
#   echo 'OPENROUTER_API_KEY=your-key-here' > /root/agentos-projects/openclaw/.env
#   echo 'OPENROUTER_API_KEY=your-key-here' > /root/agentos-projects/claude/.env

# Step 5: Deploy each project (HTTP only, no SSL yet)
#   cd /root/agentos-projects/agent-creator && docker compose up -d
#   cd /root/agentos-projects/openclaw && docker compose up -d
#   cd /root/agentos-projects/claude && docker compose up -d

# Step 6: Verify containers are running
#   docker ps | grep -E 'agent-creator|openclaw|claude'

# Step 7: Test HTTP access
#   curl http://31.220.62.81:3001/health
#   curl http://31.220.62.81:8080/health
#   curl http://31.220.62.81:8081/health

# Step 8: Connect to Agent OS dashboard and test
#   (Update dashboard chat API to route to these containers)

# Step 9: After everything works, add Traefik SSL labels (Step C)
#   Add the labels shown in the SSL section below


# =============================================
# STEP C: SSL/Traefik Labels (add after testing)
# =============================================
# Once everything works over HTTP, add these labels to each service
# to enable HTTPS via the existing root-traefik-1:

# For agent-creator:
#   labels:
#     - "traefik.enable=true"
#     - "traefik.http.routers.agent-creator.rule=Host(`agent-creator.srv1121935.hstgr.cloud`)"
#     - "traefik.http.routers.agent-creator.entrypoints=websecure"
#     - "traefik.http.routers.agent-creator.tls=true"
#     - "traefik.http.routers.agent-creator.tls.certresolver=mytlschallenge"
#     - "traefik.http.routers.agent-creator.middlewares=agentos-headers"
#     - "traefik.http.routers.agent-creator-http.rule=Host(`agent-creator.srv1121935.hstgr.cloud`)"
#     - "traefik.http.routers.agent-creator-http.entrypoints=web"
#     - "traefik.http.routers.agent-creator-http.middlewares=agentos-redirect"
#     - "traefik.http.middlewares.agentos-headers.headers.SSLRedirect=true"
#     - "traefik.http.middlewares.agentos-headers.headers.STSSeconds=315360000"
#     - "traefik.http.middlewares.agentos-headers.headers.browserXSSFilter=true"
#     - "traefik.http.middlewares.agentos-headers.headers.contentTypeNosniff=true"
#     - "traefik.http.middlewares.agentos-redirect.redirectscheme.scheme=https"
#     - "traefik.http.services.agent-creator.loadbalancer.server.port=3001"

# For openclaw:
#   labels:
#     - "traefik.enable=true"
#     - "traefik.http.routers.openclaw.rule=Host(`openclaw.srv1121935.hstgr.cloud`)"
#     - "traefik.http.routers.openclaw.entrypoints=websecure"
#     - "traefik.http.routers.openclaw.tls=true"
#     - "traefik.http.routers.openclaw.tls.certresolver=mytlschallenge"
#     - "traefik.http.routers.openclaw.middlewares=agentos-headers"
#     - "traefik.http.routers.openclaw-http.rule=Host(`openclaw.srv1121935.hstgr.cloud`)"
#     - "traefik.http.routers.openclaw-http.entrypoints=web"
#     - "traefik.http.routers.openclaw-http.middlewares=agentos-redirect"
#     - "traefik.http.middlewares.agentos-headers.headers.SSLRedirect=true"
#     - "traefik.http.middlewares.agentos-headers.headers.STSSeconds=315360000"
#     - "traefik.http.middlewares.agentos-headers.headers.browserXSSFilter=true"
#     - "traefik.http.middlewares.agentos-headers.headers.contentTypeNosniff=true"
#     - "traefik.http.middlewares.agentos-redirect.redirectscheme.scheme=https"
#     - "traefik.http.services.openclaw.loadbalancer.server.port=8080"

# For claude:
#   labels:
#     - "traefik.enable=true"
#     - "traefik.http.routers.claude.rule=Host(`claude.srv1121935.hstgr.cloud`)"
#     - "traefik.http.routers.claude.entrypoints=websecure"
#     - "traefik.http.routers.claude.tls=true"
#     - "traefik.http.routers.claude.tls.certresolver=mytlschallenge"
#     - "traefik.http.routers.claude.middlewares=agentos-headers"
#     - "traefik.http.routers.claude-http.rule=Host(`claude.srv1121935.hstgr.cloud`)"
#     - "traefik.http.routers.claude-http.entrypoints=web"
#     - "traefik.http.routers.claude-http.middlewares=agentos-redirect"
#     - "traefik.http.middlewares.agentos-headers.headers.SSLRedirect=true"
#     - "traefik.http.middlewares.agentos-headers.headers.STSSeconds=315360000"
#     - "traefik.http.middlewares.agentos-headers.headers.browserXSSFilter=true"
#     - "traefik.http.middlewares.agentos-headers.headers.contentTypeNosniff=true"
#     - "traefik.http.middlewares.agentos-redirect.redirectscheme.scheme=https"
#     - "traefik.http.services.claude.loadbalancer.server.port=8081"

# After adding labels, restart:
#   docker compose down && docker compose up -d
