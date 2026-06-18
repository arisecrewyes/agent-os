# =============================================
# AGENT OS DOCKER DEPLOYMENT — COPY-PASTE READY
# =============================================
# Generated: June 18, 2026
# Total: 10 projects, 45 containers
#
# INSTRUCTIONS FOR HOSTINGER:
# 1. Create a new "Compose" project for each section below
# 2. Copy the YAML into the compose editor
# 3. Create the .env file with your API keys
# 4. Click Deploy
#
# Each project is self-contained and independent.
# Deploy in the order listed (Priority).
# =============================================


# =============================================
# PRIORITY 1: CONNECTOR (inside agentos project)
# =============================================
# This MODIFIES your existing agentos docker-compose.yml.
# Do NOT replace the file — APPEND the connector service.
#
# Location: /root/agentos/docker-compose.yml
# Action: Add the "connector" service below, and add
#         depends_on + CONNECTOR_URL to the agentos service.
# =============================================

# --- COPY BELOW INTO YOUR EXISTING agentos docker-compose.yml ---

# Add this as a NEW service (keep the existing agentos service unchanged):
#
#   connector:
#     build:
#       context: ./connector
#       dockerfile: Dockerfile
#     container_name: agentos-connector
#     restart: unless-stopped
#     expose:
#       - "8888"
#     environment:
#       - NODE_ENV=production
#       - PORT=8888
#     networks:
#       - root_default
#
# Then EDIT the existing agentos service to add:
#     depends_on:
#       - connector
#     environment:
#       - CONNECTOR_URL=http://agentos-connector:8888
#       (keep all existing environment variables)

# --- FILES TO CREATE inside /root/agentos/connector/ ---

# /root/agentos/connector/Dockerfile
# FROM node:22-alpine
# WORKDIR /app
# COPY package.json package-lock.json* ./
# RUN npm ci --only=production 2>/dev/null || npm install
# COPY . .
# EXPOSE 8888
# CMD ["node", "server.js"]

# /root/agentos/connector/package.json
# {
#   "name": "agent-os-connector",
#   "version": "1.0.0",
#   "private": true,
#   "scripts": { "start": "node server.js" },
#   "dependencies": { "express": "^4.21.0" }
# }

# /root/agentos/connector/server.js
# const express = require('express');
# const app = express();
# app.use(express.json());
#
# const TOOL_REGISTRY = {
#   openclaw: { name: "OpenClaw", containers: [{ url: "http://openclaw-oi15-openclaw-1", port: 51461 }] },
#   hermes: { name: "Hermes Agent", containers: [{ url: "http://hermes-agent-7llb-hermes-agent-1", port: 4860 }] },
#   "memory-engine": { name: "Memory Engine", containers: [{ url: "http://memory-engine", port: 8090 }] },
#   "infinite-context": { name: "Infinite Context", containers: [{ url: "http://memory-engine", port: 8090 }] },
#   "memory-brain": { name: "Memory & Brain", containers: [{ url: "http://mem-memanto", port: 8091 }] },
#   "skill-master": { name: "Skill Master", containers: [{ url: "http://skill-master", port: 9100 }] },
#   "content-creator": { name: "Content Creator", containers: [{ url: "http://content-creator", port: 8080 }] },
#   "osint-specialist": { name: "OSINT Specialist", containers: [{ url: "http://osint-sherlock", port: 9090 }] },
#   "hermes-automation": { name: "Hermes Automation", containers: [{ url: "http://hermes-agent-7llb-hermes-agent-1", port: 4860 }] },
#   "conductor-stack": { name: "Conductor", containers: [{ url: "http://conductor", port: 3002 }] },
#   "hermes-voice": { name: "Hermes Voice", containers: [{ url: "http://hermes-voice", port: 8643 }] },
#   "bolt-diy": { name: "Bolt DIY", containers: [{ url: "http://bolt-diy", port: 5173 }] },
#   "goldie-stack": { name: "Goldie Stack", containers: [{ url: "http://goldie-codex", port: 8651 }] },
#   "minimax-hermes": { name: "MiniMax M3", containers: [{ url: "http://minimax-hermes", port: 8660 }] },
#   "odysseus-agent": { name: "Odysseus", containers: [{ url: "http://odysseus", port: 7000 }] },
#   "second-brain": { name: "Second Brain", containers: [{ url: "http://second-brain", port: 8095 }] },
#   "getting-started-agent": { name: "Getting Started", containers: [] }
# };
#
# app.get('/health', (req, res) => res.json({ status: 'ok' }));
# app.get('/agents', (req, res) => res.json({ agents: Object.keys(TOOL_REGISTRY) }));
# app.post('/route', async (req, res) => {
#   const { agentId, message } = req.body;
#   const agent = TOOL_REGISTRY[agentId];
#   if (!agent) return res.status(404).json({ error: 'Not found' });
#   if (!agent.containers.length) return res.json({ response: `${agent.name} uses OpenRouter chat.` });
#   const t = agent.containers[0];
#   try {
#     const r = await fetch(`${t.url}:${t.port}/api/chat`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({message}) });
#     const d = await r.json();
#     res.json({ agent: agent.name, response: d });
#   } catch(e) { res.status(502).json({ error: e.message }); }
# });
# app.listen(8888, '0.0.0.0', () => console.log('Connector :8888'));


# =============================================
# PRIORITY 2: MEMORY & BRAIN
# =============================================
# Project name on Hostinger: memory-brain
# Location on VPS: /root/agentos-projects/memory-brain/
# =============================================

# --- COPY BELOW AS docker-compose.yml ---

services:
  memory-engine:
    image: ghcr.io/arisecrewyes/memory-engine:latest
    container_name: memory-engine
    restart: unless-stopped
    expose:
      - "8090"
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - OBSIDIAN_VAULT_PATH=/data/obsidian-vault
      - MEMANTO_URL=http://mem-memanto:8091
      - QUANT_MIND_URL=http://mem-quant-mind:8092
      - TURBOVEC_URL=http://mem-turbovec:8093
      - DEER_FLOW_URL=http://mem-deer-flow:8094
    volumes:
      - obsidian-vault:/data/obsidian-vault
    networks:
      - root_default

  mem-memanto:
    image: ghcr.io/arisecrewyes/memanto:latest
    container_name: mem-memanto
    restart: unless-stopped
    expose:
      - "8091"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

  mem-quant-mind:
    image: ghcr.io/arisecrewyes/quant-mind:latest
    container_name: mem-quant-mind
    restart: unless-stopped
    expose:
      - "8092"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

  mem-turbovec:
    image: ghcr.io/arisecrewyes/turbovec:latest
    container_name: mem-turbovec
    restart: unless-stopped
    expose:
      - "8093"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

  mem-deer-flow:
    image: ghcr.io/arisecrewyes/deer-flow:latest
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

# --- CREATE .env file ---
# OPENROUTER_API_KEY=your_key_here


# =============================================
# PRIORITY 3: SKILLS & CREATION
# =============================================
# Project name on Hostinger: skills
# Location on VPS: /root/agentos-projects/skills/
# =============================================

# --- COPY BELOW AS docker-compose.yml ---

services:
  skill-master:
    image: ghcr.io/arisecrewyes/skill-master:latest
    container_name: skill-master
    restart: unless-stopped
    expose:
      - "9100"
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
    networks:
      - root_default

  skills-harness:
    image: ghcr.io/arisecrewyes/harness:latest
    container_name: skills-harness
    restart: unless-stopped
    expose:
      - "9101"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

  skills-skillopt:
    image: ghcr.io/arisecrewyes/skillopt:latest
    container_name: skills-skillopt
    restart: unless-stopped
    expose:
      - "9102"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

  skills-skillseekers:
    image: ghcr.io/arisecrewyes/skillseekers:latest
    container_name: skills-skillseekers
    restart: unless-stopped
    expose:
      - "9103"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

  book-to-skill:
    image: ghcr.io/arisecrewyes/book-to-skill:latest
    container_name: book-to-skill
    restart: unless-stopped
    expose:
      - "9104"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

  skills-humanizer:
    image: ghcr.io/arisecrewyes/humanizer:latest
    container_name: skills-humanizer
    restart: unless-stopped
    expose:
      - "9105"
    environment:
      - NODE_ENV=production
    networks:
      - root_default

  skills-stop-slop:
    image: ghcr.io/arisecrewyes/stop-slop:latest
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

# --- CREATE .env file ---
# OPENROUTER_API_KEY=your_key_here


# =============================================
# PRIORITY 4: CONTENT CREATION
# =============================================
# Project name on Hostinger: content-creator
# Location on VPS: /root/agentos-projects/content-creator/
# =============================================

# --- COPY BELOW AS docker-compose.yml ---

services:
  content-creator:
    image: ghcr.io/arisecrewyes/content-creator:latest
    container_name: content-creator
    restart: unless-stopped
    expose:
      - "8080"
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - SHERLOCK_URL=http://osint-sherlock:9090
      - HUMANIZER_URL=http://skills-humanizer:9105
      - GITRECON_URL=http://osint-gitrecon:9091
    networks:
      - root_default

  cc-reclip:
    image: ghcr.io/arisecrewyes/reclip:latest
    container_name: cc-reclip
    restart: unless-stopped
    expose:
      - "8081"
    networks:
      - root_default

  cc-clypra:
    image: ghcr.io/arisecrewyes/clypra:latest
    container_name: cc-clypra
    restart: unless-stopped
    expose:
      - "8082"
    networks:
      - root_default

  cc-hyperframes:
    image: ghcr.io/arisecrewyes/hyperframes:latest
    container_name: cc-hyperframes
    restart: unless-stopped
    expose:
      - "8084"
    networks:
      - root_default

  cc-open-gen-ai:
    image: ghcr.io/arisecrewyes/open-generative-ai:latest
    container_name: cc-open-gen-ai
    restart: unless-stopped
    expose:
      - "8085"
    networks:
      - root_default

  cc-salesgpt:
    image: ghcr.io/arisecrewyes/salesgpt:latest
    container_name: cc-salesgpt
    restart: unless-stopped
    expose:
      - "8086"
    environment:
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
    networks:
      - root_default

  cc-leads:
    image: ghcr.io/arisecrewyes/leads-generator:latest
    container_name: cc-leads
    restart: unless-stopped
    expose:
      - "8087"
    networks:
      - root_default

  cc-vimax:
    image: ghcr.io/arisecrewyes/vimax:latest
    container_name: cc-vimax
    restart: unless-stopped
    expose:
      - "8088"
    environment:
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
    networks:
      - root_default

  cc-vibevoice:
    image: ghcr.io/arisecrewyes/vibevoice:latest
    container_name: cc-vibevoice
    restart: unless-stopped
    expose:
      - "8089"
    networks:
      - root_default

  cc-social-scrape:
    image: ghcr.io/arisecrewyes/social-media-scraping:latest
    container_name: cc-social-scrape
    restart: unless-stopped
    expose:
      - "8090"
    networks:
      - root_default

  cc-nango:
    image: ghcr.io/arisecrewyes/nango:latest
    container_name: cc-nango
    restart: unless-stopped
    expose:
      - "8091"
    networks:
      - root_default

  cc-video-use:
    image: ghcr.io/arisecrewyes/video-use:latest
    container_name: cc-video-use
    restart: unless-stopped
    expose:
      - "8092"
    networks:
      - root_default

  cc-wa-automate:
    image: ghcr.io/arisecrewyes/wa-automate:latest
    container_name: cc-wa-automate
    restart: unless-stopped
    expose:
      - "8093"
    networks:
      - root_default

networks:
  root_default:
    external: true

# --- CREATE .env file ---
# OPENROUTER_API_KEY=your_key_here


# =============================================
# PRIORITY 5: OSINT & RESEARCH
# =============================================
# Project name on Hostinger: osint
# Location on VPS: /root/agentos-projects/osint/
# =============================================

# --- COPY BELOW AS docker-compose.yml ---

services:
  osint-sherlock:
    image: ghcr.io/arisecrewyes/sherlock:latest
    container_name: osint-sherlock
    restart: unless-stopped
    expose:
      - "9090"
    networks:
      - root_default

  osint-gitrecon:
    image: ghcr.io/arisecrewyes/gitrecon:latest
    container_name: osint-gitrecon
    restart: unless-stopped
    expose:
      - "9091"
    networks:
      - root_default

  osint-google-dorking:
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

# --- CREATE .env file ---
# (No API keys needed for OSINT tools)


# =============================================
# PRIORITY 6: AI WORKSPACE
# =============================================
# Project name on Hostinger: ai-workspace
# Location on VPS: /root/agentos-projects/ai-workspace/
# =============================================

# --- COPY BELOW AS docker-compose.yml ---

services:
  odysseus:
    image: ghcr.io/arisecrewyes/odysseus:latest
    container_name: odysseus
    restart: unless-stopped
    expose:
      - "7000"
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
    networks:
      - root_default

  minimax-hermes:
    image: ghcr.io/arisecrewyes/minimax-hermes:latest
    container_name: minimax-hermes
    restart: unless-stopped
    expose:
      - "8660"
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - OLLAMA_BASE_URL=${OLLAMA_BASE_URL:-http://localhost:11434}
      - MINIMAX_API_KEY=${MINIMAX_API_KEY:-}
    networks:
      - root_default

  second-brain:
    image: ghcr.io/arisecrewyes/second-brain:latest
    container_name: second-brain
    restart: unless-stopped
    expose:
      - "8095"
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - OBSIDIAN_VAULT_PATH=/data/obsidian-vault
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

# --- CREATE .env file ---
# OPENROUTER_API_KEY=your_key_here
# OLLAMA_BASE_URL=http://localhost:11434
# MINIMAX_API_KEY=your_key_here


# =============================================
# PRIORITY 7: CODING & DEVELOPMENT
# =============================================
# Project name on Hostinger: coding-dev
# Location on VPS: /root/agentos-projects/coding-dev/
# =============================================

# --- COPY BELOW AS docker-compose.yml ---

services:
  bolt-diy:
    image: ghcr.io/arisecrewyes/bolt-diy:latest
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

  goldie-codex:
    image: ghcr.io/arisecrewyes/codex:latest
    container_name: goldie-codex
    restart: unless-stopped
    expose:
      - "8651"
    environment:
      - NODE_ENV=production
      - OPENAI_API_KEY=${OPENAI_API_KEY:-}
      - GITHUB_TOKEN=${GITHUB_TOKEN:-}
    networks:
      - root_default

networks:
  root_default:
    external: true

# --- CREATE .env file ---
# OPENROUTER_API_KEY=your_key_here
# NETLIFY_AUTH_TOKEN=your_token_here
# NETLIFY_SITE_ID=your_site_id
# OPENAI_API_KEY=your_key_here
# GITHUB_TOKEN=your_token_here


# =============================================
# PRIORITY 8: AUTOMATION
# =============================================
# Project name on Hostinger: automation
# Location on VPS: /root/agentos-projects/automation/
# =============================================

# --- COPY BELOW AS docker-compose.yml ---

services:
  hermes-voice:
    image: ghcr.io/arisecrewyes/hermes-voice:latest
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
    networks:
      - root_default

networks:
  root_default:
    external: true

# --- CREATE .env file ---
# OPENROUTER_API_KEY=your_key_here
# TWILIO_ACCOUNT_SID=your_sid
# TWILIO_AUTH_TOKEN=your_token
# TWILIO_PHONE_NUMBER=your_number
# DOGRAH_API_KEY=your_key_here

# NOTE: Hermes Automation uses the existing hermes-agent-7llb project.
# No new container needed for it.
# NOTE: Conductor uses browse.sh CLI. Install on VPS: npm install -g browse


# =============================================
# DEPLOYMENT CHECKLIST
# =============================================
#
# For each project:
#   1. Create project on Hostinger (Docker → Compose → New)
#   2. Paste the YAML
#   3. Create .env with your API keys
#   4. Deploy
#   5. Check container status: docker ps | grep <project>
#   6. Test: curl http://31.220.62.81:<port>/health
#
# After ALL projects are deployed:
#   7. Update connector with all agent routes
#   8. Test each agent from the dashboard
#   9. Add Traefik SSL labels (Step C)
#
# =============================================
