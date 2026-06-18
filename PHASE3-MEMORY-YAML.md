# Phase 3B — Memory & Brain Category: Docker Compose YAML
# ======================================================
#
# This category has 3 dashboard agents:
#   1. Memory Engine     (📚) — PARA & second brain setup
#   2. Infinite Context  (🔄) — Claude + Obsidian + OMI loop
#   3. Memory & Brain    (🧠) — Knowledge & vector search
#
# GitHub Repo Set #2 (11 repos):
#   memanto, quant-mind, turbovec, alook, deer-flow,
#   open-code-review, project-nomad, Odysseus, Pake,
#   GITRECON, google-dorking
#
# EXISTING tools already on VPS:
#   - OMI (mobile app — local device, not VPS)
#   - Obsidian (desktop app — vault on VPS at /root/obsidian-vault)
#   - Hermes Agent (already running as hermes-agent-7llb)
#
# APPROACH:
#   - Repos with Docker images → Approach A (pre-built)
#   - Repos without images → Approach B (build from source)
#   - OMI → Local device only (not a VPS container)
#   - Obsidian → Vault directory on VPS (not a container)
#
# ======================================================


# =============================================
# PROJECT: memory-brain
# Location: /root/agentos-projects/memory-brain/docker-compose.yml
# =============================================
#
# This is ONE Docker project with MULTIPLE containers.
# Each GitHub repo gets its own container.
# The 3 dashboard agents (Memory Engine, Infinite Context,
# Memory & Brain) all route to this project.
#
# =============================================

services:
  # ────────────────────────────────────────────
  # CONTAINER 1: Memory Engine (orchestrator)
  # ────────────────────────────────────────────
  # This is the main container that the dashboard
  # chat API calls for memory-related tasks.
  # It coordinates the sub-tools below.
  # ────────────────────────────────────────────
  memory-engine:
    build:
      context: ./memory-engine
      dockerfile: Dockerfile
    container_name: memory-engine
    restart: unless-stopped
    expose:
      - "8090"
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - OBSIDIAN_VAULT_PATH=/data/obsidian-vault
      - OMI_API_KEY=${OMI_API_KEY:-}
      # Sub-tool URLs (same network)
      - MEMANTO_URL=http://mem-memanto:8091
      - QUANT_MIND_URL=http://mem-quant-mind:8092
      - TURBOVEC_URL=http://mem-turbovec:8093
      - DEER_FLOW_URL=http://mem-deer-flow:8094
      - ALOOK_URL=http://mem-alook:8095
    volumes:
      - obsidian-vault:/data/obsidian-vault
    networks:
      - root_default
    # NO Traefik labels yet — add in Step C

  # ────────────────────────────────────────────
  # CONTAINER 2: memanto
  # GitHub: https://github.com/moorcheh-ai/memanto
  # Approach: B (build from source — no pre-built image)
  # ────────────────────────────────────────────
  mem-memanto:
    build:
      context: ./memanto
      dockerfile: Dockerfile
    container_name: mem-memanto
    restart: unless-stopped
    expose:
      - "8091"
    environment:
      - NODE_ENV=production
      - MEMANTO_API_KEY=${MEMANTO_API_KEY:-}
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 3: quant-mind
  # GitHub: https://github.com/LLMQuant/quant-mind
  # Approach: B (build from source)
  # ────────────────────────────────────────────
  mem-quant-mind:
    build:
      context: ./quant-mind
      dockerfile: Dockerfile
    container_name: mem-quant-mind
    restart: unless-stopped
    expose:
      - "8092"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 4: turbovec
  # GitHub: https://github.com/RyanCodrai/turbovec
  # Approach: B (Rust + Python, build from source)
  # ────────────────────────────────────────────
  mem-turbovec:
    build:
      context: ./turbovec
      dockerfile: Dockerfile
    container_name: mem-turbovec
    restart: unless-stopped
    expose:
      - "8093"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 5: alook
  # GitHub: https://github.com/alookai/alook
  # Approach: B (build from source)
  # ────────────────────────────────────────────
  mem-alook:
    build:
      context: ./alook
      dockerfile: Dockerfile
    container_name: mem-alook
    restart: unless-stopped
    expose:
      - "8095"
    environment:
      - NODE_ENV=production
      - ALOOK_API_KEY=${ALOOK_API_KEY:-}
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 6: deer-flow
  # GitHub: https://github.com/bytedance/deer-flow
  # Approach: B (build from source — SuperAgent harness)
  # ────────────────────────────────────────────
  mem-deer-flow:
    build:
      context: ./deer-flow
      dockerfile: Dockerfile
    container_name: mem-deer-flow
    restart: unless-stopped
    expose:
      - "8094"
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
    networks:
      - root_default

volumes:
  obsidian-vault:

networks:
  root_default:
    external: true


# =============================================
# DOCKERFILES FOR EACH CONTAINER
# =============================================
#
# Each container needs a Dockerfile. Create these files
# in the matching subdirectories.
#
# /root/agentos-projects/memory-brain/
# ├── docker-compose.yml          ← This file
# ├── memory-engine/
# │   └── Dockerfile              ← Orchestrator
# ├── memanto/
# │   └── Dockerfile
# ├── quant-mind/
# │   └── Dockerfile
# ├── turbovec/
# │   └── Dockerfile
# ├── alook/
# │   └── Dockerfile
# └── deer-flow/
#     └── Dockerfile
#
# ---- memory-engine/Dockerfile ----
# FROM node:22-alpine
# WORKDIR /app
# COPY package.json package-lock.json* ./
# RUN npm ci --only=production 2>/dev/null || npm install
# COPY . .
# EXPOSE 8090
# CMD ["node", "server.js"]
#
# ---- memanto/Dockerfile ----
# FROM node:22-alpine
# WORKDIR /app
# RUN git clone https://github.com/moorcheh-ai/memanto.git .
# RUN npm ci --only=production 2>/dev/null || npm install
# EXPOSE 8091
# CMD ["node", "server.js"]
#
# ---- quant-mind/Dockerfile ----
# FROM python:3.12-slim
# WORKDIR /app
# RUN git clone https://github.com/LLMQuant/quant-mind.git .
# RUN pip install -r requirements.txt
# EXPOSE 8092
# CMD ["python", "main.py"]
#
# ---- turbovec/Dockerfile ----
# FROM rust:1.75-slim as builder
# WORKDIR /app
# RUN git clone https://github.com/RyanCodrai/turbovec.git .
# RUN cargo build --release
# FROM debian:bookworm-slim
# COPY --from=builder /app/target/release/turbovec /usr/local/bin/
# EXPOSE 8093
# CMD ["turbovec"]
#
# ---- alook/Dockerfile ----
# FROM node:22-alpine
# WORKDIR /app
# RUN git clone https://github.com/alookai/alook.git .
# RUN npm ci --only=production 2>/dev/null || npm install
# EXPOSE 8095
# CMD ["node", "server.js"]
#
# ---- deer-flow/Dockerfile ----
# FROM node:22-alpine
# WORKDIR /app
# RUN git clone https://github.com/bytedance/deer-flow.git .
# RUN npm ci --only=production 2>/dev/null || npm install
# EXPOSE 8094
# CMD ["node", "server.js"]
#
# ---- End Dockerfiles ----


# =============================================
# STEP C: SSL/Traefik Labels (add after testing)
# =============================================
# Once everything works over HTTP, add these labels to
# the memory-engine service to enable HTTPS:
#
# labels:
#   - "traefik.enable=true"
#   - "traefik.http.routers.memory-engine.rule=Host(`memory-engine.srv1121935.hstgr.cloud`)"
#   - "traefik.http.routers.memory-engine.entrypoints=websecure"
#   - "traefik.http.routers.memory-engine.tls=true"
#   - "traefik.http.routers.memory-engine.tls.certresolver=mytlschallenge"
#   - "traefik.http.routers.memory-engine.middlewares=agentos-headers"
#   - "traefik.http.routers.memory-engine-http.rule=Host(`memory-engine.srv1121935.hstgr.cloud`)"
#   - "traefik.http.routers.memory-engine-http.entrypoints=web"
#   - "traefik.http.routers.memory-engine-http.middlewares=agentos-redirect"
#   - "traefik.http.middlewares.agentos-headers.headers.SSLRedirect=true"
#   - "traefik.http.middlewares.agentos-headers.headers.STSSeconds=315360000"
#   - "traefik.http.middlewares.agentos-headers.headers.browserXSSFilter=true"
#   - "traefik.http.middlewares.agentos-headers.headers.contentTypeNosniff=true"
#   - "traefik.http.middlewares.agentos-redirect.redirectscheme.scheme=https"
#   - "traefik.http.services.memory-engine.loadbalancer.server.port=8090"


# =============================================
# HOW TO DEPLOY
# =============================================

# Step 1: Create project directory
#   mkdir -p /root/agentos-projects/memory-brain
#   mkdir -p /root/agentos-projects/memory-brain/{memory-engine,memanto,quant-mind,turbovec,alook,deer-flow}

# Step 2: Copy docker-compose.yml
#   cp memory-brain-compose.yml /root/agentos-projects/memory-brain/docker-compose.yml

# Step 3: Create Dockerfiles (see above) in each subdirectory

# Step 4: Create .env file
#   cat > /root/agentos-projects/memory-brain/.env << 'EOF'
#   OPENROUTER_API_KEY=***
#   OMI_API_KEY=***           # Optional — only if you use OMI
#   MEMANTO_API_KEY=***       # Optional
#   ALOOK_API_KEY=***        # Optional
#   EOF

# Step 5: Deploy (HTTP only, no SSL yet)
#   cd /root/agentos-projects/memory-brain && docker compose up -d

# Step 6: Verify
#   docker ps | grep mem
#   curl http://31.220.62.81:8090/health

# Step 7: Connect to Agent OS dashboard
#   (Update connector to route memory-engine, infinite-context,
#    memory-brain to this project)

# Step 8: After testing, add Traefik SSL labels (Step C)


# =============================================
# AGENT ROUTING REFERENCE
# =============================================
# Which dashboard agents route to which containers:
#
# 📚 Memory Engine → memory-engine:8090 (orchestrator)
#                      ↓ coordinates:
#                      ├── mem-memanto:8091
#                      ├── mem-quant-mind:8092
#                      ├── mem-turbovec:8093
#                      ├── mem-deer-flow:8094
#                      └── mem-alook:8095
#
# 🔄 Infinite Context → memory-engine:8090 (same orchestrator)
#                        (uses Obsidian vault + OMI for context loop)
#
# 🧠 Memory & Brain → memory-engine:8090 (same orchestrator)
#                     (uses memanto, quant-mind, turbovec, deer-flow)
#
# All 3 agents share the same project and containers.
# The memory-engine orchestrator routes to sub-tools based on
# the task type.
