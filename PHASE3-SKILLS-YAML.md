# Phase 3C — Skills Category: Docker Compose YAML
# ======================================================
#
# Dashboard Agent: ⚡ Skill Master
#
# GitHub Repo Set #3 (11 repos):
#   harness, stop-slop, Understand-Anything, ECC,
#   train-llm-from-scratch, SkillOpt, book-to-skill,
#   Skill_Seekers, Hermes Skill Hub, humanizer
#
# VISION: This is not just a skill manager — it's a
# "Skill Creator" agent that:
#   1. Creates new skills for any agent
#   2. Finds, fixes, improves, optimizes existing skills
#   3. Acts as a Skill Library showing what each agent can do
#   4. Assigns skills universally or per-agent
#   5. Shows inter-agent skill interactions
#   6. Auto-triggered when an agent lacks a skill for a task
#
# APPROACH: B (build from source — these are custom tools
# that need to connect to the Agent OS dashboard)
#
# ======================================================


# =============================================
# PROJECT: skills
# Location: /root/agentos-projects/skills/docker-compose.yml
# =============================================

services:
  # ────────────────────────────────────────────
  # CONTAINER 1: Skill Master (orchestrator)
  # ────────────────────────────────────────────
  # The main container that coordinates all skill
  # operations. The dashboard chat API calls this
  # for any skill-related task.
  # ────────────────────────────────────────────
  skill-master:
    build:
      context: ./skill-master
      dockerfile: Dockerfile
    container_name: skill-master
    restart: unless-stopped
    expose:
      - "9100"
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      # Sub-tool URLs
      - HARNESS_URL=http://skills-harness:9101
      - SKILL_OPT_URL=http://skills-skillopt:9102
      - SKILL_SEEKERS_URL=http://skills-skillseekers:9103
      - BOOK_TO_SKILL_URL=http://books-to-skill:9104
      - HUMANIZER_URL=http://skills-humanizer:9105
      - STOP_SLOP_URL=http://skills-stop-slop:9106
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 2: harness
  # GitHub: https://github.com/revfactory/harness
  # Meta-skill for designing agent teams
  # ────────────────────────────────────────────
  skills-harness:
    build:
      context: ./harness
      dockerfile: Dockerfile
    container_name: skills-harness
    restart: unless-stopped
    expose:
      - "9101"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 3: SkillOpt
  # GitHub: https://github.com/microsoft/SkillOpt
  # Microsoft's skill optimizer for LLM agents
  # ────────────────────────────────────────────
  skills-skillopt:
    build:
      context: ./skillopt
      dockerfile: Dockerfile
    container_name: skills-skillopt
    restart: unless-stopped
    expose:
      - "9102"
    environment:
      - NODE_ENV=production
      - SKILL_OPTIMIZATION_KEY=${SKILL_OPTIMIZATION_KEY:-}
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 4: Skill_Seekers
  # GitHub: https://github.com/yusufkaraaslan/Skill_Seekers
  # Converts docs/repos into Claude AI skills
  # ────────────────────────────────────────────
  skills-skillseekers:
    build:
      context: ./skillseekers
      dockerfile: Dockerfile
    container_name: skills-skillseekers
    restart: unless-stopped
    expose:
      - "9103"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 5: book-to-skill
  # GitHub: https://github.com/virgiliojr94/book-to-skill
  # Turns technical books into Claude Code skills
  # ────────────────────────────────────────────
  book-to-skill:
    build:
      context: ./book-to-skill
      dockerfile: Dockerfile
    container_name: book-to-skill
    restart: unless-stopped
    expose:
      - "9104"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 6: humanizer
  # GitHub: https://github.com/blader/humanizer
  # Removes AI tells from writing
  # ────────────────────────────────────────────
  skills-humanizer:
    build:
      context: ./humanizer
      dockerfile: Dockerfile
    container_name: skills-humanizer
    restart: unless-stopped
    expose:
      - "9105"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

  # ────────────────────────────────────────────
  # CONTAINER 7: stop-slop
  # GitHub: https://github.com/hardikpandya/stop-slop
  # Removes AI tells from prose
  # ────────────────────────────────────────────
  skills-stop-slop:
    build:
      context: ./stop-slop
      dockerfile: Dockerfile
    container_name: skills-stop-slop
    restart: unless-stopped
    expose:
      - "9106"
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
# /root/agentos-projects/skills/
# ├── docker-compose.yml
# ├── skill-master/Dockerfile
# ├── harness/Dockerfile
# ├── skillopt/Dockerfile
# ├── skillseekers/Dockerfile
# ├── book-to-skill/Dockerfile
# ├── humanizer/Dockerfile
# └── stop-slop/Dockerfile
#
# ---- skill-master/Dockerfile ----
# FROM node:22-alpine
# WORKDIR /app
# COPY package.json package-lock.json* ./
# RUN npm ci --only=production 2>/dev/null || npm install
# COPY . .
# EXPOSE 9100
# CMD ["node", "server.js"]
#
# ---- harness/Dockerfile ----
# FROM node:22-alpine
# WORKDIR /app
# RUN git clone https://github.com/revfactory/harness.git .
# RUN npm ci --only=production 2>/dev/null || npm install
# EXPOSE 9101
# CMD ["node", "server.js"]
#
# ---- skillopt/Dockerfile ----
# FROM python:3.12-slim
# WORKDIR /app
# RUN git clone https://github.com/microsoft/SkillOpt.git .
# RUN pip install -r requirements.txt
# EXPOSE 9102
# CMD ["python", "main.py"]
#
# ---- skillseekers/Dockerfile ----
# FROM node:22-alpine
# WORKDIR /app
# RUN git clone https://github.com/yusufkaraaslan/Skill_Seekers.git .
# RUN npm ci --only=production 2>/dev/null || npm install
# EXPOSE 9103
# CMD ["node", "server.js"]
#
# ---- book-to-skill/Dockerfile ----
# FROM node:22-alpine
# WORKDIR /app
# RUN git clone https://github.com/virgiliojr94/book-to-skill.git .
# RUN npm ci --only=production 2>/dev/null || npm install
# EXPOSE 9104
# CMD ["node", "server.js"]
#
# ---- humanizer/Dockerfile ----
# FROM node:22-alpine
# WORKDIR /app
# RUN git clone https://github.com/blader/humanizer.git .
# RUN npm ci --only=production 2>/dev/null || npm install
# EXPOSE 9105
# CMD ["node", "server.js"]
#
# ---- stop-slop/Dockerfile ----
# FROM node:22-alpine
# WORKDIR /app
# RUN git clone https://github.com/hardikpandya/stop-slop.git .
# RUN npm ci --only=production 2>/dev/null || npm install
# EXPOSE 9106
# CMD ["node", "server.js"]
#
# ---- End Dockerfiles ----


# =============================================
# STEP C: SSL/Traefik Labels (add after testing)
# =============================================
# Add to skill-master service:
#
# labels:
#   - "traefik.enable=true"
#   - "traefik.http.routers.skills.rule=Host(`skills.srv1121935.hstgr.cloud`)"
#   - "traefik.http.routers.skills.entrypoints=websecure"
#   - "traefik.http.routers.skills.tls=true"
#   - "traefik.http.routers.skills.tls.certresolver=mytlschallenge"
#   - "traefik.http.routers.skills.middlewares=agentos-headers"
#   - "traefik.http.routers.skills-http.rule=Host(`skills.srv1121935.hstgr.cloud`)"
#   - "traefik.http.routers.skills-http.entrypoints=web"
#   - "traefik.http.routers.skills-http.middlewares=agentos-redirect"
#   - "traefik.http.middlewares.agentos-headers.headers.SSLRedirect=true"
#   - "traefik.http.middlewares.agentos-headers.headers.STSSeconds=315360000"
#   - "traefik.http.middlewares.agentos-headers.headers.browserXSSFilter=true"
#   - "traefik.http.middlewares.agentos-headers.headers.contentTypeNosniff=true"
#   - "traefik.http.middlewares.agentos-redirect.redirectscheme.scheme=https"
#   - "traefik.http.services.skills.loadbalancer.server.port=9100"


# =============================================
# HOW TO DEPLOY
# =============================================

# Step 1: Create project directory
#   mkdir -p /root/agentos-projects/skills
#   mkdir -p /root/agentos-projects/skills/{skill-master,harness,skillopt,skillseekers,book-to-skill,humanizer,stop-slop}

# Step 2: Copy docker-compose.yml and create Dockerfiles

# Step 3: Create .env file
#   cat > /root/agentos-projects/skills/.env << 'EOF'
#   OPENROUTER_API_KEY=***
#   SKILL_OPTIMIZATION_KEY=***    # Optional
#   EOF

# Step 4: Deploy (HTTP only)
#   cd /root/agentos-projects/skills && docker compose up -d

# Step 5: Verify
#   docker ps | grep skills
#   curl http://31.220.62.81:9100/health
