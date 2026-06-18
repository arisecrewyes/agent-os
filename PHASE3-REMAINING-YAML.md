# Phase 3 — Remaining Categories: Docker Compose YAML
# ======================================================
#
# These are the remaining 5 categories that need Docker projects:
#
# 1. Automation (Hermes Automation, Conductor, Hermes Voice)
# 2. Coding & Development (Bolt DIY, Goldie Stack)
# 3. AI Workspace (MiniMax M3, Odysseus, Second Brain)
# 4. OSINT & Research (OSINT Specialist)
# 5. Getting Started (Getting Started)
#
# IMPORTANT: Some of these agents have NO external GitHub repos.
# They are pure AI agents that run on OpenRouter's API.
# For these, we only need a connector entry — no Docker project.
#
# ======================================================


# =============================================
# CATEGORY 1: AUTOMATION
# =============================================
#
# Agents: Hermes Automation, Conductor, Hermes Voice
#
# EXISTING on VPS:
#   - Hermes Agent (hermes-agent-7llb) — already running
#
# GitHub repos:
#   - Hermes Agent: https://github.com/NousResearch/hermes-agent (already on VPS)
#   - Conductor: Uses browse.sh (npm package, not a container)
#   - Hermes Voice: Dograh (https://github.com/dograh-hq/dograh)
#                + VoiceWave, Pyxa, Magica, fal.ai (API-based, no containers)
#
# PROJECT: automation
# Location: /root/agentos-projects/automation/docker-compose.yml
# =============================================

services:
  # ────────────────────────────────────────────
  # CONTAINER 1: Hermes Voice
  # GitHub: https://github.com/dograh-hq/dograh
  # The only Automation tool that needs its own container.
  # VoiceWave, Pyxa, Magica, fal.ai are API-based.
  # ────────────────────────────────────────────
  hermes-voice:
    build:
      context: ./hermes-voice
      dockerfile: Dockerfile
    container_name: hermes-voice
    restart: unless-stopped
    expose:
      - "8643"
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - TWILIO_ACCOUNT_SID=${TWILIO_ACCOUNT_SID:-}
      - TWILIO_AUTH_TOKEN=${TWILIO_AUTH_TOKEN:-}
      - TWILIO_PHONE_NUMBER=${TWILIO_PHONE_NUMBER:-}
      - DOGRAH_API_KEY=${DOGRAH_API_KEY:-}
      # Shared Hermes agent
      - HERMES_URL=http://hermes-agent-7llb-hermes-agent-1:4860
    networks:
      - root_default

networks:
  root_default:
    external: true

# ---- hermes-voice/Dockerfile ----
# FROM node:22-alpine
# WORKDIR /app
# RUN git clone https://github.com/dograh-hq/dograh.git .
# RUN npm ci --only=production 2>/dev/null || npm install
# EXPOSE 8643
# CMD ["node", "server.js"]
# ---- End Dockerfile ----

# NOTE: Hermes Automation uses the existing hermes-agent-7llb project.
# No new container needed — just a connector entry.
#
# NOTE: Conductor uses browse.sh (npm install -g @anthropic/browse).
# This is a CLI tool, not a container. Install on VPS directly:
#   npm install -g @anthropic/browse 2>/dev/null || npm install -g browse


# =============================================
# CATEGORY 2: CODING & DEVELOPMENT
# =============================================
#
# Agents: Bolt DIY, Goldie Stack
#
# GitHub repos:
#   - Bolt DIY: https://github.com/stackblitz-labs/bolt.diy
#   - Goldie Stack: Hermes (MCP server) + Codex
#     Hermes already on VPS, Codex needs container
#
# PROJECT: coding-dev
# Location: /root/agentos-projects/coding-dev/docker-compose.yml
# =============================================

services:
  # ────────────────────────────────────────────
  # CONTAINER 1: Bolt DIY
  # GitHub: https://github.com/stackblitz-labs/bolt.diy
  # ────────────────────────────────────────────
  bolt-diy:
    build:
      context: ./bolt-diy
      dockerfile: Dockerfile
    container_name: bolt-diy
    restart: unless-stopped
    expose:
      - "5173"
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - NETLIFY_AUTH_TOKEN=${NETLIFY_AUTH_TOKEN:-}
      - NETLIFY_SITE_ID=${NETLIFY_SITE_ID:-}
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 2: Codex (for Goldie Stack)
  # Part of the Goldie Stack framework.
  # ────────────────────────────────────────────
  goldie-codex:
    build:
      context: ./codex
      dockerfile: Dockerfile
    container_name: goldie-codex
    restart: unless-stopped
    expose:
      - "8651"
    environment:
      - NODE_ENV=production
      - OPENAI_API_KEY=${OPENAI_API_KEY:-}
      - GITHUB_TOKEN=${GITHUB_TOKEN:-}
      # Shared Hermes MCP
      - HERMES_URL=http://hermes-agent-7llb-hermes-agent-1:4860
    networks:
      - root_default

networks:
  root_default:
    external: true

# ---- bolt-diy/Dockerfile ----
# FROM node:22-alpine
# WORKDIR /app
# RUN git clone https://github.com/stackblitz-labs/bolt.diy.git .
# RUN npm ci --only=production 2>/dev/null || npm install
# EXPOSE 5173
# CMD ["node", "server.js"]
# ---- End Dockerfile ----

# ---- codex/Dockerfile ----
# FROM node:22-alpine
# WORKDIR /app
# COPY package.json package-lock.json* ./
# RUN npm ci --only=production 2>/dev/null || npm install
# COPY . .
# EXPOSE 8651
# CMD ["node", "server.js"]
# ---- End Dockerfile ----

# NOTE: Goldie Stack's Hermes MCP uses the existing hermes-agent-7llb.
# No separate Hermes container needed for Goldie Stack.


# =============================================
# CATEGORY 3: AI WORKSPACE
# =============================================
#
# Agents: MiniMax M3 + Hermes, Odysseus, Second Brain
#
# GitHub repos:
#   - Odysseus: https://github.com/pewdiepie-archdaemon/odysseus
#   - MiniMax M3: https://github.com/MiniMaxAI/MiniMax-M1-80k (or Ollama)
#   - Second Brain: Obsidian vault (already on VPS)
#
# PROJECT: ai-workspace
# Location: /root/agentos-projects/ai-workspace/docker-compose.yml
# =============================================

services:
  # ────────────────────────────────────────────
  # CONTAINER 1: Odysseus
  # GitHub: https://github.com/pewdiepie-archdaemon/odysseus
  # ────────────────────────────────────────────
  odysseus:
    build:
      context: ./odysseus
      dockerfile: Dockerfile
    container_name: odysseus
    restart: unless-stopped
    expose:
      - "7000"
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 2: MiniMax M3 + Hermes
  # GitHub: https://github.com/MiniMaxAI/MiniMax-M1-80k
  # Uses Ollama or OpenRouter for the brain
  # ────────────────────────────────────────────
  minimax-hermes:
    build:
      context: ./minimax-hermes
      dockerfile: Dockerfile
    container_name: minimax-hermes
    restart: unless-stopped
    expose:
      - "8660"
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - OLLAMA_BASE_URL=${OLLAMA_BASE_URL:-http://localhost:11434}
      - MINIMAX_API_KEY=${MINIMAX_API_KEY:-}
      # Shared Hermes
      - HERMES_URL=http://hermes-agent-7llb-hermes-agent-1:4860
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 3: Second Brain
  # Uses Obsidian vault (shared with Memory project)
  # ────────────────────────────────────────────
  second-brain:
    build:
      context: ./second-brain
      dockerfile: Dockerfile
    container_name: second-brain
    restart: unless-stopped
    expose:
      - "8095"
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - OBSIDIAN_VAULT_PATH=/data/obsidian-vault
      # Shared with Memory project
      - MEMORY_ENGINE_URL=http://memory-engine:8090
    volumes:
      - obsidian-vault:/data/obsidian-vault
    networks:
      - root_default

volumes:
  obsidian-vault:
    external: true

networks:
  root_default:
    external: true

# ---- odysseus/Dockerfile ----
# FROM node:22-alpine
# WORKDIR /app
# RUN git clone https://github.com/pewdiepie-archdaemon/odysseus.git .
# RUN npm ci --only=production 2>/dev/null || npm install
# EXPOSE 7000
# CMD ["node", "server.js"]
# ---- End Dockerfile ----

# ---- minimax-hermes/Dockerfile ----
# FROM node:22-alpine
# WORKDIR /app
# COPY package.json package-lock.json* ./
# RUN npm ci --only=production 2>/dev/null || npm install
# COPY . .
# EXPOSE 8660
# CMD ["node", "server.js"]
# ---- End Dockerfile ----

# ---- second-brain/Dockerfile ----
# FROM node:22-alpine
# WORKDIR /app
# COPY package.json package-lock.json* ./
# RUN npm ci --only=production 2>/dev/null || npm install
# COPY . .
# EXPOSE 8095
# CMD ["node", "server.js"]
# ---- End Dockerfile ----


# =============================================
# CATEGORY 4: OSINT & RESEARCH
# =============================================
#
# Agent: OSINT Specialist
#
# GitHub repos:
#   - Sherlock: https://github.com/sherlock-project/sherlock
#   - GITRECON: https://github.com/techenthusiast167/GITRECON
#   - google-dorking: https://github.com/commit-issues/google-dorking
#
# NOTE: These repos are ALSO in the Content Creator page.
# They are shared tools — deployed once, referenced by both.
#
# PROJECT: osint
# Location: /root/agentos-projects/osint/docker-compose.yml
# =============================================

services:
  # ────────────────────────────────────────────
  # CONTAINER 1: Sherlock
  # GitHub: https://github.com/sherlock-project/sherlock
  # SHARED with Content Creator
  # ────────────────────────────────────────────
  osint-sherlock:
    build:
      context: ./sherlock
      dockerfile: Dockerfile
    container_name: osint-sherlock
    restart: unless-stopped
    expose:
      - "9090"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 2: GITRECON
  # GitHub: https://github.com/techenthusiast167/GITRECON
  # SHARED with Content Creator
  # ────────────────────────────────────────────
  osint-gitrecon:
    build:
      context: ./gitrecon
      dockerfile: Dockerfile
    container_name: osint-gitrecon
    restart: unless-stopped
    expose:
      - "9091"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 3: google-dorking
  # GitHub: https://github.com/commit-issues/google-dorking
  # ────────────────────────────────────────────
  osint-google-dorking:
    build:
      context: ./google-dorking
      dockerfile: Dockerfile
    container_name: osint-google-dorking
    restart: unless-stopped
    expose:
      - "9092"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

networks:
  root_default:
    external: true

# ---- sherlock/Dockerfile ----
# FROM python:3.12-slim
# WORKDIR /app
# RUN git clone https://github.com/sherlock-project/sherlock.git .
# RUN pip install -r requirements.txt
# EXPOSE 9090
# CMD ["python", "sherlock.py"]
# ---- End Dockerfile ----

# ---- gitrecon/Dockerfile ----
# FROM python:3.12-slim
# WORKDIR /app
# RUN git clone https://github.com/techenthusiast167/GITRECON.git .
# RUN pip install -r requirements.txt
# EXPOSE 9091
# CMD ["python", "main.py"]
# ---- End Dockerfile ----

# ---- google-dorking/Dockerfile ----
# FROM python:3.12-slim
# WORKDIR /app
# RUN git clone https://github.com/commit-issues/google-dorking.git .
# RUN pip install -r requirements.txt
# EXPOSE 9092
# CMD ["python", "main.py"]
# ---- End Dockerfile ----


# =============================================
# CATEGORY 5: GETTING STARTED
# =============================================
#
# Agent: Getting Started
#
# This is a pure informational/walkthrough agent.
# It has NO external GitHub repos or tools.
# It runs entirely on OpenRouter's API.
#
# NO Docker project needed.
# Just a connector entry pointing to OpenRouter.
# =============================================

# No containers needed for this category.
# The Getting Started agent uses the dashboard's built-in chat API
# which routes to OpenRouter's API.


# =============================================
# SUMMARY: ALL DOCKER PROJECTS
# =============================================
#
# Project                | Category           | Containers | Ports
# -----------------------|--------------------|------------|-------
# memory-brain           | Memory & Brain     | 6          | 8090-8095
# skills                 | Skills & Creation  | 7          | 9100-9106
# content-creator        | Content Creation   | 13         | 8080-8093
# automation             | Automation         | 1          | 8643
# coding-dev             | Coding & Dev       | 2          | 5173, 8651
# ai-workspace           | AI Workspace       | 3          | 7000, 8660, 8095
# osint                  | OSINT & Research   | 3          | 9090-9092
# (none)                 | Getting Started    | 0          | N/A
#
# Total: 7 projects, 35 containers
#
# SHARED TOOLS (no duplicates):
#   Sherlock    → osint project (referenced by content-creator)
#   GITRECON    → osint project (referenced by content-creator)
#   humanizer   → skills project (referenced by content-creator)
#   Hermes      → hermes-agent-7llb (referenced by automation, coding, ai-workspace)
#   Obsidian    → volume (shared by memory-brain, ai-workspace/second-brain)
#
# EXISTING VPS PROJECTS (no new containers needed):
#   hermes-agent-7llb  → Hermes Automation
#   openclaw-oi15      → OpenClaw (this is where I live!)
#   agentos            → Agent OS Dashboard (this is where the dashboard lives)
#
# =============================================
# HOW TO DEPLOY (on Hostinger VPS)
# =============================================

# Step 1: Pull latest code
#   cd /root/agentos && git pull origin main

# Step 2: Create project directories
#   mkdir -p /root/agentos-projects/{automation/hermes-voice,coding-dev/{bolt-diy,codex},ai-workspace/{odysseus,minimax-hermes,second-brain},osint/{sherlock,gitrecon,google-dorking}}

# Step 3: Copy docker-compose.yml to each project directory
#   (Use the YAML from this file)

# Step 4: Create Dockerfiles in each subdirectory
#   (See individual Dockerfiles above)

# Step 5: Create .env files with API keys
#   (Each project needs its own .env)

# Step 6: Deploy each project (HTTP only, no SSL yet)
#   cd /root/agentos-projects/automation && docker compose up -d
#   cd /root/agentos-projects/coding-dev && docker compose up -d
#   cd /root/agentos-projects/ai-workspace && docker compose up -d
#   cd /root/agentos-projects/osint && docker compose up -d

# Step 7: Verify
#   docker ps | grep -E 'hermes-voice|bolt-diy|codex|odysseus|minimax|second-brain|osint'

# Step 8: Test HTTP access
#   curl http://31.220.62.81:8643/health
#   curl http://31.220.62.81:5173/health
#   curl http://31.220.62.81:7000/health
#   curl http://31.220.62.81:9090/health

# Step 9: Connect to Agent OS dashboard
#   (Update connector with all new agent routes)

# Step 10: After testing, add Traefik SSL labels (Step C)
