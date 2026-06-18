# Phase 3D — Content Creator Category: Docker Compose YAML
# ======================================================
#
# Dashboard Agent: 🎬 Content Creator
#
# GitHub Repo Set #1 (18 repos):
#   reclip, Clypra, Hyperframes, Pake,
#   social-media-scraping-apis, Nango, video-use,
#   sherlock, Open-Generative-AI, humanizer,
#   SalesGPT, leads-generator-app, ViMax,
#   VibeVoice, wa-automate-nodejs,
#   awesome-generative-ai-guide, GITRECON, Odysseus
#
# VISION: A dedicated agent/app where every GitHub repo
# is a fully functional feature. Users can use tools
# manually or chat with the agent's sub-dashboard.
#
# SHARED TOOLS (already deployed in other projects):
#   - Sherlock → deployed in osint project (http://osint-sherlock:9090)
#   - humanizer → deployed in skills project (http://skills-humanizer:9105)
#   - GITRECON → deployed in osint project (http://osint-gitrecon:9091)
#   - Pake → also in skills project
#
# APPROACH: B (build from source — these need to connect
# to the Agent OS dashboard as a unified content creation hub)
#
# ======================================================


# =============================================
# PROJECT: content-creator
# Location: /root/agentos-projects/content-creator/docker-compose.yml
# =============================================

services:
  # ────────────────────────────────────────────
  # CONTAINER 1: Content Creator (orchestrator)
  # ────────────────────────────────────────────
  # The main container that coordinates all content
  # creation tools. Has a sub-dashboard UI.
  # ────────────────────────────────────────────
  content-creator:
    build:
      context: ./content-creator
      dockerfile: Dockerfile
    container_name: content-creator
    restart: unless-stopped
    expose:
      - "8080"
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - ELEVENLABS_API_KEY=${ELEVENLABS_API_KEY:-}
      - VOICEWAVE_API_KEY=${VOICEWAVE_API_KEY:-}
      - PYXA_API_KEY=${PYXA_API_KEY:-}
      - MAGICA_API_KEY=${MAGICA_API_KEY:-}
      - FAL_AI_KEY=${FAL_AI_KEY:-}
      # Shared tools from other projects
      - SHERLOCK_URL=http://osint-sherlock:9090
      - HUMANIZER_URL=http://skills-humanizer:9105
      - GITRECON_URL=http://osint-gitrecon:9091
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 2: reclip
  # GitHub: https://github.com/averygan/reclip
  # Video downloader
  # ────────────────────────────────────────────
  cc-reclip:
    build:
      context: ./reclip
      dockerfile: Dockerfile
    container_name: cc-reclip
    restart: unless-stopped
    expose:
      - "8081"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 3: Clypra
  # GitHub: https://github.com/AIEraDev/Clypra
  # Video editor (Tauri + React)
  # ────────────────────────────────────────────
  cc-clypra:
    build:
      context: ./clypra
      dockerfile: Dockerfile
    container_name: cc-clypra
    restart: unless-stopped
    expose:
      - "8082"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 4: Hyperframes
  # GitHub: https://github.com/heygen-com/hyperframes
  # HTML → Video for agents
  # ────────────────────────────────────────────
  cc-hyperframes:
    build:
      context: ./hyperframes
      dockerfile: Dockerfile
    container_name: cc-hyperframes
    restart: unless-stopped
    expose:
      - "8084"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 5: Open-Generative-AI
  # GitHub: https://github.com/Anil-matcha/Open-Generative-AI
  # AI image & video generation (200+ models)
  # ────────────────────────────────────────────
  cc-open-gen-ai:
    build:
      context: ./open-generative-ai
      dockerfile: Dockerfile
    container_name: cc-open-gen-ai
    restart: unless-stopped
    expose:
      - "8085"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 6: SalesGPT
  # GitHub: https://github.com/filip-michalsky/SalesGPT
  # AI Sales Agent
  # ────────────────────────────────────────────
  cc-salesgpt:
    build:
      context: ./salesgpt
      dockerfile: Dockerfile
    container_name: cc-salesgpt
    restart: unless-stopped
    expose:
      - "8086"
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 7: leads-generator
  # GitHub: https://github.com/Geolavor/leads-generator-app
  # AI lead generation
  # ────────────────────────────────────────────
  cc-leads:
    build:
      context: ./leads-generator
      dockerfile: Dockerfile
    container_name: cc-leads
    restart: unless-stopped
    expose:
      - "8087"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 8: ViMax
  # GitHub: https://github.com/HKUDS/ViMax
  # Agentic video generation
  # ────────────────────────────────────────────
  cc-vimax:
    build:
      context: ./vimax
      dockerfile: Dockerfile
    container_name: cc-vimax
    restart: unless-stopped
    expose:
      - "8088"
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 9: VibeVoice
  # GitHub: https://github.com/microsoft/VibeVoice
  # Microsoft open-source voice AI
  # ────────────────────────────────────────────
  cc-vibevoice:
    build:
      context: ./vibevoice
      dockerfile: Dockerfile
    container_name: cc-vibevoice
    restart: unless-stopped
    expose:
      - "8089"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 10: social-media-scraping-apis
  # GitHub: https://github.com/cporter202/social-media-scraping-apis
  # Social media scraping
  # ────────────────────────────────────────────
  cc-social-scrape:
    build:
      context: ./social-media-scraping
      dockerfile: Dockerfile
    container_name: cc-social-scrape
    restart: unless-stopped
    expose:
      - "8090"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 11: Nango
  # GitHub: https://github.com/NangoHQ/nango
  # Product integrations with AI
  # ────────────────────────────────────────────
  cc-nango:
    build:
      context: ./nango
      dockerfile: Dockerfile
    container_name: cc-nango
    restart: unless-stopped
    expose:
      - "8091"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 12: video-use
  # GitHub: https://github.com/browser-use/video-use
  # Edit videos with coding agents
  # ────────────────────────────────────────────
  cc-video-use:
    build:
      context: ./video-use
      dockerfile: Dockerfile
    container_name: cc-video-use
    restart: unless-stopped
    expose:
      - "8092"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 13: wa-automate
  # GitHub: https://github.com/open-wa/wa-automate-nodejs
  # WhatsApp automation
  # ────────────────────────────────────────────
  cc-wa-automate:
    build:
      context: ./wa-automate
      dockerfile: Dockerfile
    container_name: cc-wa-automate
    restart: unless-stopped
    expose:
      - "8093"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

networks:
  root_default:
    external: true


# =============================================
# DOCKERFILES
# =============================================
#
# /root/agentos-projects/content-creator/
# ├── docker-compose.yml
# ├── content-creator/Dockerfile    (orchestrator + sub-dashboard)
# ├── reclip/Dockerfile
# ├── clypra/Dockerfile
# ├── hyperframes/Dockerfile
# ├── open-generative-ai/Dockerfile
# ├── salesgpt/Dockerfile
# ├── leads-generator/Dockerfile
# ├── vimax/Dockerfile
# ├── vibevoice/Dockerfile
# ├── social-media-scraping/Dockerfile
# ├── nango/Dockerfile
# ├── video-use/Dockerfile
# └── wa-automate/Dockerfile
#
# Pattern for each:
# ---- <tool>/Dockerfile ----
# FROM node:22-alpine        (or python:3.12-slim for Python tools)
# WORKDIR /app
# RUN git clone https://github.com/<user>/<repo> .
# RUN npm ci --only=production 2>/dev/null || npm install
#                              (or pip install -r requirements.txt)
# EXPOSE <port>
# CMD ["node", "server.js"]  (or ["python", "main.py"])
#
# ---- End Dockerfiles ----


# =============================================
# STEP C: SSL/Traefik Labels (add after testing)
# =============================================
# Add to content-creator service:
#
# labels:
#   - "traefik.enable=true"
#   - "traefik.http.routers.content-creator.rule=Host(`content-creator.srv1121935.hstgr.cloud`)"
#   - "traefik.http.routers.content-creator.entrypoints=websecure"
#   - "traefik.http.routers.content-creator.tls=true"
#   - "traefik.http.routers.content-creator.tls.certresolver=mytlschallenge"
#   - "traefik.http.routers.content-creator.middlewares=agentos-headers"
#   - "traefik.http.routers.content-creator-http.rule=Host(`content-creator.srv1121935.hstgr.cloud`)"
#   - "traefik.http.routers.content-creator-http.entrypoints=web"
#   - "traefik.http.routers.content-creator-http.middlewares=agentos-redirect"
#   - "traefik.http.middlewares.agentos-headers.headers.SSLRedirect=true"
#   - "traefik.http.middlewares.agentos-headers.headers.STSSeconds=315360000"
#   - "traefik.http.middlewares.agentos-headers.headers.browserXSSFilter=true"
#   - "traefik.http.middlewares.agentos-headers.headers.contentTypeNosniff=true"
#   - "traefik.http.middlewares.agentos-redirect.redirectscheme.scheme=https"
#   - "traefik.http.services.content-creator.loadbalancer.server.port=8080"


# =============================================
# HOW TO DEPLOY
# =============================================

# Step 1: Create project directory
#   mkdir -p /root/agentos-projects/content-creator
#   mkdir -p /root/agentos-projects/content-creator/{content-creator,reclip,clypra,hyperframes,open-generative-ai,salesgpt,leads-generator,vimax,vibevoice,social-media-scraping,nango,video-use,wa-automate}

# Step 2: Copy docker-compose.yml and create Dockerfiles

# Step 3: Create .env file
#   cat > /root/agentos-projects/content-creator/.env << 'EOF'
#   OPENROUTER_API_KEY=***
#   ELEVENLABS_API_KEY=***         # Optional
#   VOICEWAVE_API_KEY=***         # Optional
#   PYXA_API_KEY=***              # Optional
#   MAGICA_API_KEY=***            # Optional
#   FAL_AI_KEY=***                # Optional
#   EOF

# Step 4: Deploy (HTTP only)
#   cd /root/agentos-projects/content-creator && docker compose up -d

# Step 5: Verify
#   docker ps | grep cc-
#   curl http://31.220.62.81:8080/health
