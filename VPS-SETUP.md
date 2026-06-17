# VPS Setup Guide — Agent OS Docker Projects

## Architecture Overview

```
[Agent OS Dashboard] ←→ [Hostinger VPS]
     (Monitor)            (PC Tower)
```

The Agent OS dashboard (port 3000) is the "monitor." Each AI Agent group is a Docker project on the VPS (the "PC tower"). The dashboard's chat API routes connect to these tools via HTTP calls to `http://<service-name>:<port>` on the shared `root_default` network.

### Key Principle: Shared Tools = Shared Containers

If multiple agents use the same tool (e.g., Sherlock is used by both Content Creator and OSINT Specialist), we deploy it **once** and let both agents reference it. No duplicates.

---

## Current VPS Docker Network

All projects share the `root_default` network (created by root-traefik-1). This means any container can reach any other container by its service name:
- Dashboard calls Hermes: `http://hermes:8642`
- Dashboard calls Odysseus: `http://odysseus:7000`
- Agent Creator calls Sherlock: `http://osint-sherlock:9090`

---

## MASTER docker-compose.yml (Reference)

Run this on your VPS at `/root/docker-compose.yml` (or use Hostinger's "Compose via URL" for each project individually).

### How to use this file:
1. Copy each project's YAML into its own directory on the VPS
2. Run `docker compose up -d` in each directory
3. Or combine them all into one file and run `docker compose up -d` once

---

## PROJECT 1: Agent Creator (Main)
**Dashboard Agent:** 🏗️ Agent Creator  
**Port:** 3001  
**GitHub:** https://github.com/arisecrewyes/agent-creator *(build & push to GHCR)*

```yaml
# /root/agentos-projects/agent-creator/docker-compose.yml
services:
  agent-creator:
    image: ghcr.io/arisecrewyes/agent-creator:latest
    container_name: agent-creator
    restart: unless-stopped
    expose:
      - "3001"
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - VAULT_PATH=/data/agentos-vault
    volumes:
      - agentos-data:/data
    networks:
      - root_default
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.agent-creator.rule=Host(`agent-creator.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.agent-creator.entrypoints=websecure"
      - "traefik.http.routers.agent-creator.tls=true"
      - "traefik.http.routers.agent-creator.tls.certresolver=mytlschallenge"
      - "traefik.http.routers.agent-creator.middlewares=agentos-headers"
      - "traefik.http.routers.agent-creator-http.rule=Host(`agent-creator.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.agent-creator-http.entrypoints=web"
      - "traefik.http.routers.agent-creator-http.middlewares=agentos-redirect"
      - "traefik.http.middlewares.agentos-headers.headers.SSLRedirect=true"
      - "traefik.http.middlewares.agentos-headers.headers.STSSeconds=315360000"
      - "traefik.http.middlewares.agentos-headers.headers.browserXSSFilter=true"
      - "traefik.http.middlewares.agentos-headers.headers.contentTypeNosniff=true"
      - "traefik.http.middlewares.agentos-redirect.redirectscheme.scheme=https"
      - "traefik.http.services.agent-creator.loadbalancer.server.port=3001"

volumes:
  agentos-data:
    external: true

networks:
  root_default:
    external: true
```

---

## PROJECT 2: Hermes Agent (Automation)
**Dashboard Agent:** 🤖 Hermes Automation  
**Port:** 8642  
**GitHub:** https://github.com/NousResearch/hermes-agent

```yaml
# /root/agentos-projects/hermes/docker-compose.yml
services:
  hermes:
    image: ghcr.io/arisecrewyes/hermes-agent:latest
    container_name: hermes
    restart: unless-stopped
    expose:
      - "8642"
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - API_SERVER_ENABLED=true
      - API_SERVER_PORT=8642
      - TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN:-}
      - DISCORD_BOT_TOKEN=${DISCORD_BOT_TOKEN:-}
      - SLACK_BOT_TOKEN=${SLACK_BOT_TOKEN:-}
    networks:
      - root_default
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.hermes.rule=Host(`hermes.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.hermes.entrypoints=websecure"
      - "traefik.http.routers.hermes.tls=true"
      - "traefik.http.routers.hermes.tls.certresolver=mytlschallenge"
      - "traefik.http.routers.hermes.middlewares=agentos-headers"
      - "traefik.http.routers.hermes-http.rule=Host(`hermes.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.hermes-http.entrypoints=web"
      - "traefik.http.routers.hermes-http.middlewares=agentos-redirect"
      - "traefik.http.middlewares.agentos-headers.headers.SSLRedirect=true"
      - "traefik.http.middlewares.agentos-headers.headers.STSSeconds=315360000"
      - "traefik.http.middlewares.agentos-headers.headers.browserXSSFilter=true"
      - "traefik.http.middlewares.agentos-headers.headers.contentTypeNosniff=true"
      - "traefik.http.middlewares.agentos-redirect.redirectscheme.scheme=https"
      - "traefik.http.services.hermes.loadbalancer.server.port=8642"

networks:
  root_default:
    external: true
```

---

## PROJECT 3: Odysseus (AI Workspace)
**Dashboard Agent:** 🌐 Odysseus  
**Port:** 7000  
**GitHub:** https://github.com/pewdiepie-archdaemon/odysseus

```yaml
# /root/agentos-projects/odysseus/docker-compose.yml
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
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.odysseus.rule=Host(`odysseus.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.odysseus.entrypoints=websecure"
      - "traefik.http.routers.odysseus.tls=true"
      - "traefik.http.routers.odysseus.tls.certresolver=mytlschallenge"
      - "traefik.http.routers.odysseus.middlewares=agentos-headers"
      - "traefik.http.routers.odysseus-http.rule=Host(`odysseus.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.odysseus-http.entrypoints=web"
      - "traefik.http.routers.odysseus-http.middlewares=agentos-redirect"
      - "traefik.http.middlewares.agentos-headers.headers.SSLRedirect=true"
      - "traefik.http.middlewares.agentos-headers.headers.STSSeconds=315360000"
      - "traefik.http.middlewares.agentos-headers.headers.browserXSSFilter=true"
      - "traefik.http.middlewares.agentos-headers.headers.contentTypeNosniff=true"
      - "traefik.http.middlewares.agentos-redirect.redirectscheme.scheme=https"
      - "traefik.http.services.odysseus.loadbalancer.server.port=7000"

networks:
  root_default:
    external: true
```

---

## PROJECT 4: Bolt DIY (Coding & Development)
**Dashboard Agent:** 💻 Bolt DIY  
**Port:** 5173  
**GitHub:** https://github.com/stackblitz-labs/bolt.diy

```yaml
# /root/agentos-projects/bolt-diy/docker-compose.yml
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
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.bolt-diy.rule=Host(`bolt-diy.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.bolt-diy.entrypoints=websecure"
      - "traefik.http.routers.bolt-diy.tls=true"
      - "traefik.http.routers.bolt-diy.tls.certresolver=mytlschallenge"
      - "traefik.http.routers.bolt-diy.middlewares=agentos-headers"
      - "traefik.http.routers.bolt-diy-http.rule=Host(`bolt-diy.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.bolt-diy-http.entrypoints=web"
      - "traefik.http.routers.bolt-diy-http.middlewares=agentos-redirect"
      - "traefik.http.middlewares.agentos-headers.headers.SSLRedirect=true"
      - "traefik.http.middlewares.agentos-headers.headers.STSSeconds=315360000"
      - "traefik.http.middlewares.agentos-headers.headers.browserXSSFilter=true"
      - "traefik.http.middlewares.agentos-headers.headers.contentTypeNosniff=true"
      - "traefik.http.middlewares.agentos-redirect.redirectscheme.scheme=https"
      - "traefik.http.services.bolt-diy.loadbalancer.server.port=5173"

networks:
  root_default:
    external: true
```

---

## PROJECT 5: Content Creation Stack
**Dashboard Agent:** 🎬 Content Creator  
**Ports:** 8080 (orchestrator), 8081-8084 (tools)  
**GitHub repos:** reclip, Clypra, Hyperframes, Pake, social-media-scraping-apis, Nango, SalesGPT, leads-generator, ViMax, VibeVoice, wa-automate, Open-Generative-AI

**Shared with OSINT:** Sherlock (deployed once in OSINT project)

```yaml
# /root/agentos-projects/content-creator/docker-compose.yml
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
      - ELEVENLABS_API_KEY=${ELEVENLABS_API_KEY:-}
      - VOICEWAVE_API_KEY=${VOICEWAVE_API_KEY:-}
      - PYXA_API_KEY=${PYXA_API_KEY:-}
      - MAGICA_API_KEY=${MAGICA_API_KEY:-}
      - FAL_AI_KEY=${FAL_AI_KEY:-}
      # Shared tools (reference other containers on root_default network)
      - SHERLOCK_URL=http://osint-sherlock:9090
      - PAKE_URL=http://content-pake:8083
      - HYPERFRAMES_URL=http://content-hyperframes:8084
    networks:
      - root_default
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.content-creator.rule=Host(`content-creator.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.content-creator.entrypoints=websecure"
      - "traefik.http.routers.content-creator.tls=true"
      - "traefik.http.routers.content-creator.tls.certresolver=mytlschallenge"
      - "traefik.http.routers.content-creator.middlewares=agentos-headers"
      - "traefik.http.routers.content-creator-http.rule=Host(`content-creator.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.content-creator-http.entrypoints=web"
      - "traefik.http.routers.content-creator-http.middlewares=agentos-redirect"
      - "traefik.http.middlewares.agentos-headers.headers.SSLRedirect=true"
      - "traefik.http.middlewares.agentos-headers.headers.STSSeconds=315360000"
      - "traefik.http.middlewares.agentos-headers.headers.browserXSSFilter=true"
      - "traefik.http.middlewares.agentos-headers.headers.contentTypeNosniff=true"
      - "traefik.http.middlewares.agentos-redirect.redirectscheme.scheme=https"
      - "traefik.http.services.content-creator.loadbalancer.server.port=8080"

  # Lightweight content tools (no separate subdomain needed)
  content-pake:
    image: ghcr.io/arisecrewyes/pake:latest
    container_name: content-pake
    restart: unless-stopped
    expose:
      - "8083"
    networks:
      - root_default

  content-hyperframes:
    image: ghcr.io/arisecrewyes/hyperframes:latest
    container_name: content-hyperframes
    restart: unless-stopped
    expose:
      - "8084"
    networks:
      - root_default

networks:
  root_default:
    external: true
```

---

## PROJECT 6: Memory & Brain Stack
**Dashboard Agents:** 📚 Memory Engine, 🔄 Infinite Context, 🧠 Memory & Brain Systems  
**Ports:** 8090 (orchestrator), 8091-8094 (tools)  
**GitHub repos:** memanto, quant-mind, turbovec, alook, deer-flow, OMI, Obsidian

**Note:** OMI is a mobile/desktop app — install on your local device, not the VPS. Obsidian vault lives on the VPS at `/root/obsidian-vault`.

```yaml
# /root/agentos-projects/memory-brain/docker-compose.yml
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
      - OMI_API_KEY=${OMI_API_KEY:-}
      - OBSIDIAN_VAULT_PATH=/data/obsidian-vault
    volumes:
      - obsidian-vault:/data/obsidian-vault
    networks:
      - root_default
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.memory-engine.rule=Host(`memory-engine.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.memory-engine.entrypoints=websecure"
      - "traefik.http.routers.memory-engine.tls=true"
      - "traefik.http.routers.memory-engine.tls.certresolver=mytlschallenge"
      - "traefik.http.routers.memory-engine.middlewares=agentos-headers"
      - "traefik.http.routers.memory-engine-http.rule=Host(`memory-engine.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.memory-engine-http.entrypoints=web"
      - "traefik.http.routers.memory-engine-http.middlewares=agentos-redirect"
      - "traefik.http.middlewares.agentos-headers.headers.SSLRedirect=true"
      - "traefik.http.middlewares.agentos-headers.headers.STSSeconds=315360000"
      - "traefik.http.middlewares.agentos-headers.headers.browserXSSFilter=true"
      - "traefik.http.middlewares.agentos-headers.headers.contentTypeNosniff=true"
      - "traefik.http.middlewares.agentos-redirect.redirectscheme.scheme=https"
      - "traefik.http.services.memory-engine.loadbalancer.server.port=8090"

  # Memory & Brain sub-tools
  mem-memanto:
    image: ghcr.io/arisecrewyes/memanto:latest
    container_name: mem-memanto
    restart: unless-stopped
    expose:
      - "8091"
    environment:
      - MEMANTO_API_KEY=${MEMANTO_API_KEY:-}
    networks:
      - root_default

  mem-quant-mind:
    image: ghcr.io/arisecrewyes/quant-mind:latest
    container_name: mem-quant-mind
    restart: unless-stopped
    expose:
      - "8092"
    networks:
      - root_default

  mem-turbovec:
    image: ghcr.io/arisecrewyes/turbovec:latest
    container_name: mem-turbovec
    restart: unless-stopped
    expose:
      - "8093"
    networks:
      - root_default

  mem-deer-flow:
    image: ghcr.io/arisecrewyes/deer-flow:latest
    container_name: mem-deer-flow
    restart: unless-stopped
    expose:
      - "8094"
    networks:
      - root_default

volumes:
  obsidian-vault:

networks:
  root_default:
    external: true
```

---

## PROJECT 7: OSINT & Research
**Dashboard Agent:** 🔍 OSINT Specialist  
**Ports:** 9090-9092  
**GitHub repos:** Sherlock, GITRECON, google-dorking

**Note:** Sherlock is shared with Content Creator. Deployed here; Content Creator references it via `http://osint-sherlock:9090`.

```yaml
# /root/agentos-projects/osint/docker-compose.yml
services:
  osint-sherlock:
    image: ghcr.io/arisecrewyes/sherlock:latest
    container_name: osint-sherlock
    restart: unless-stopped
    expose:
      - "9090"
    networks:
      - root_default
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.osint.rule=Host(`osint.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.osint.entrypoints=websecure"
      - "traefik.http.routers.osint.tls=true"
      - "traefik.http.routers.osint.tls.certresolver=mytlschallenge"
      - "traefik.http.routers.osint.middlewares=agentos-headers"
      - "traefik.http.routers.osint-http.rule=Host(`osint.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.osint-http.entrypoints=web"
      - "traefik.http.routers.osint-http.middlewares=agentos-redirect"
      - "traefik.http.middlewares.agentos-headers.headers.SSLRedirect=true"
      - "traefik.http.middlewares.agentos-headers.headers.STSSeconds=315360000"
      - "traefik.http.middlewares.agentos-headers.headers.browserXSSFilter=true"
      - "traefik.http.middlewares.agentos-headers.headers.contentTypeNosniff=true"
      - "traefik.http.middlewares.agentos-redirect.redirectscheme.scheme=https"
      - "traefik.http.services.osint.loadbalancer.server.port=9090"

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
```

---

## PROJECT 8: Skills & Creation
**Dashboard Agent:** ⚡ Skill Master  
**Ports:** 9100-9103  
**GitHub repos:** harness, stop-slop, SkillOpt, book-to-skill, Skill_Seekers, humanizer

```yaml
# /root/agentos-projects/skills/docker-compose.yml
services:
  skills-harness:
    image: ghcr.io/arisecrewyes/harness:latest
    container_name: skills-harness
    restart: unless-stopped
    expose:
      - "9100"
    networks:
      - root_default
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.skills.rule=Host(`skills.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.skills.entrypoints=websecure"
      - "traefik.http.routers.skills.tls=true"
      - "traefik.http.routers.skills.tls.certresolver=mytlschallenge"
      - "traefik.http.routers.skills.middlewares=agentos-headers"
      - "traefik.http.routers.skills-http.rule=Host(`skills.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.skills-http.entrypoints=web"
      - "traefik.http.routers.skills-http.middlewares=agentos-redirect"
      - "traefik.http.middlewares.agentos-headers.headers.SSLRedirect=true"
      - "traefik.http.middlewares.agentos-headers.headers.STSSeconds=315360000"
      - "traefik.http.middlewares.agentos-headers.headers.browserXSSFilter=true"
      - "traefik.http.middlewares.agentos-headers.headers.contentTypeNosniff=true"
      - "traefik.http.middlewares.agentos-redirect.redirectscheme.scheme=https"
      - "traefik.http.services.skills.loadbalancer.server.port=9100"

  skills-stop-slop:
    image: ghcr.io/arisecrewyes/stop-slop:latest
    container_name: skills-stop-slop
    restart: unless-stopped
    expose:
      - "9101"
    networks:
      - root_default

  skills-skillopt:
    image: ghcr.io/arisecrewyes/skillopt:latest
    container_name: skills-skillopt
    restart: unless-stopped
    expose:
      - "9102"
    environment:
      - SKILL_OPTIMIZATION_KEY=${SKILL_OPTIMIZATION_KEY:-}
    networks:
      - root_default

  skills-humanizer:
    image: ghcr.io/arisecrewyes/humanizer:latest
    container_name: skills-humanizer
    restart: unless-stopped
    expose:
      - "9103"
    networks:
      - root_default

networks:
  root_default:
    external: true
```

---

## PROJECT 9: Conductor (Browser Agents)
**Dashboard Agent:** 🎻 Conductor  
**Port:** 3002  
**GitHub:** https://github.com/browser-sh/browser-sh *(or browse.sh CLI)*

```yaml
# /root/agentos-projects/conductor/docker-compose.yml
services:
  conductor:
    image: ghcr.io/arisecrewyes/conductor:latest
    container_name: conductor
    restart: unless-stopped
    expose:
      - "3002"
    environment:
      - NODE_ENV=production
      - BROWSE_SH_API_KEY=${BROWSE_SH_API_KEY:-}
    networks:
      - root_default
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.conductor.rule=Host(`conductor.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.conductor.entrypoints=websecure"
      - "traefik.http.routers.conductor.tls=true"
      - "traefik.http.routers.conductor.tls.certresolver=mytlschallenge"
      - "traefik.http.routers.conductor.middlewares=agentos-headers"
      - "traefik.http.routers.conductor-http.rule=Host(`conductor.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.conductor-http.entrypoints=web"
      - "traefik.http.routers.conductor-http.middlewares=agentos-redirect"
      - "traefik.http.middlewares.agentos-headers.headers.SSLRedirect=true"
      - "traefik.http.middlewares.agentos-headers.headers.STSSeconds=315360000"
      - "traefik.http.middlewares.agentos-headers.headers.browserXSSFilter=true"
      - "traefik.http.middlewares.agentos-headers.headers.contentTypeNosniff=true"
      - "traefik.http.middlewares.agentos-redirect.redirectscheme.scheme=https"
      - "traefik.http.services.conductor.loadbalancer.server.port=3002"

networks:
  root_default:
    external: true
```

---

## PROJECT 10: Hermes Voice (Voice AI)
**Dashboard Agent:** 📞 Hermes Voice  
**Port:** 8643  
**GitHub repos:** Dograh, VoiceWave, Pyxa, Magica, fal.ai

**Note:** Hermes Voice shares the Hermes container from Project 2. This project adds voice-specific tools.

```yaml
# /root/agentos-projects/hermes-voice/docker-compose.yml
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
      # Shared Hermes agent
      - HERMES_URL=http://hermes:8642
    networks:
      - root_default
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.hermes-voice.rule=Host(`hermes-voice.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.hermes-voice.entrypoints=websecure"
      - "traefik.http.routers.hermes-voice.tls=true"
      - "traefik.http.routers.hermes-voice.tls.certresolver=mytlschallenge"
      - "traefik.http.routers.hermes-voice.middlewares=agentos-headers"
      - "traefik.http.routers.hermes-voice-http.rule=Host(`hermes-voice.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.hermes-voice-http.entrypoints=web"
      - "traefik.http.routers.hermes-voice-http.middlewares=agentos-redirect"
      - "traefik.http.middlewares.agentos-headers.headers.SSLRedirect=true"
      - "traefik.http.middlewares.agentos-headers.headers.STSSeconds=315360000"
      - "traefik.http.middlewares.agentos-headers.headers.browserXSSFilter=true"
      - "traefik.http.middlewares.agentos-headers.headers.contentTypeNosniff=true"
      - "traefik.http.middlewares.agentos-redirect.redirectscheme.scheme=https"
      - "traefik.http.services.hermes-voice.loadbalancer.server.port=8643"

networks:
  root_default:
    external: true
```

---

## PROJECT 11: Goldie Stack (Hermes + Codex + MCP)
**Dashboard Agent:** 🏗️ Goldie Stack  
**Ports:** 8650-8651  
**GitHub repos:** Hermes (MCP server), Codex

**Note:** Shares Hermes from Project 2. This project adds Codex + MCP tools.

```yaml
# /root/agentos-projects/goldie-stack/docker-compose.yml
services:
  goldie-hermes-mcp:
    image: ghcr.io/arisecrewyes/hermes-agent:latest
    container_name: goldie-hermes-mcp
    restart: unless-stopped
    expose:
      - "8650"
    environment:
      - API_SERVER_ENABLED=true
      - API_SERVER_PORT=8650
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
    networks:
      - root_default
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.goldie-stack.rule=Host(`goldie-stack.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.goldie-stack.entrypoints=websecure"
      - "traefik.http.routers.goldie-stack.tls=true"
      - "traefik.http.routers.goldie-stack.tls.certresolver=mytlschallenge"
      - "traefik.http.routers.goldie-stack.middlewares=agentos-headers"
      - "traefik.http.routers.goldie-stack-http.rule=Host(`goldie-stack.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.goldie-stack-http.entrypoints=web"
      - "traefik.http.routers.goldie-stack-http.middlewares=agentos-redirect"
      - "traefik.http.middlewares.agentos-headers.headers.SSLRedirect=true"
      - "traefik.http.middlewares.agentos-headers.headers.STSSeconds=315360000"
      - "traefik.http.middlewares.agentos-headers.headers.browserXSSFilter=true"
      - "traefik.http.middlewares.agentos-headers.headers.contentTypeNosniff=true"
      - "traefik.http.middlewares.agentos-redirect.redirectscheme.scheme=https"
      - "traefik.http.services.goldie-stack.loadbalancer.server.port=8650"

  goldie-codex:
    image: ghcr.io/arisecrewyes/codex:latest
    container_name: goldie-codex
    restart: unless-stopped
    expose:
      - "8651"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY:-}
      - GITHUB_TOKEN=${GITHUB_TOKEN:-}
      - HERMES_MCP_URL=http://goldie-hermes-mcp:8650
    networks:
      - root_default

networks:
  root_default:
    external: true
```

---

## PROJECT 12: MiniMax M3 + Hermes
**Dashboard Agent:** ⚙️ MiniMax M3 + Hermes  
**Port:** 8660  
**GitHub:** https://github.com/MiniMaxAI/MiniMax-M1-80k *(or Ollama for local)*

```yaml
# /root/agentos-projects/minimax-hermes/docker-compose.yml
services:
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
      # Shared Hermes
      - HERMES_URL=http://hermes:8642
    networks:
      - root_default
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.minimax-hermes.rule=Host(`minimax-hermes.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.minimax-hermes.entrypoints=websecure"
      - "traefik.http.routers.minimax-hermes.tls=true"
      - "traefik.http.routers.minimax-hermes.tls.certresolver=mytlschallenge"
      - "traefik.http.routers.minimax-hermes.middlewares=agentos-headers"
      - "traefik.http.routers.minimax-hermes-http.rule=Host(`minimax-hermes.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.minimax-hermes-http.entrypoints=web"
      - "traefik.http.routers.minimax-hermes-http.middlewares=agentos-redirect"
      - "traefik.http.middlewares.agentos-headers.headers.SSLRedirect=true"
      - "traefik.http.middlewares.agentos-headers.headers.STSSeconds=315360000"
      - "traefik.http.middlewares.agentos-headers.headers.browserXSSFilter=true"
      - "traefik.http.middlewares.agentos-headers.headers.contentTypeNosniff=true"
      - "traefik.http.middlewares.agentos-redirect.redirectscheme.scheme=https"
      - "traefik.http.services.minimax-hermes.loadbalancer.server.port=8660"

networks:
  root_default:
    external: true
```

---

## PROJECT 13: Second Brain
**Dashboard Agent:** 💾 Second Brain  
**Port:** 8095  
**GitHub repos:** Obsidian, OMI

**Note:** Shares Obsidian vault with Memory Engine (Project 6). OMI is a local device app.

```yaml
# /root/agentos-projects/second-brain/docker-compose.yml
services:
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
      # Shared with Memory Engine
      - MEMORY_ENGINE_URL=http://memory-engine:8090
    volumes:
      - obsidian-vault:/data/obsidian-vault
    networks:
      - root_default
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.second-brain.rule=Host(`second-brain.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.second-brain.entrypoints=websecure"
      - "traefik.http.routers.second-brain.tls=true"
      - "traefik.http.routers.second-brain.tls.certresolver=mytlschallenge"
      - "traefik.http.routers.second-brain.middlewares=agentos-headers"
      - "traefik.http.routers.second-brain-http.rule=Host(`second-brain.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.second-brain-http.entrypoints=web"
      - "traefik.http.routers.second-brain-http.middlewares=agentos-redirect"
      - "traefik.http.middlewares.agentos-headers.headers.SSLRedirect=true"
      - "traefik.http.middlewares.agentos-headers.headers.STSSeconds=315360000"
      - "traefik.http.middlewares.agentos-headers.headers.browserXSSFilter=true"
      - "traefik.http.middlewares.agentos-headers.headers.contentTypeNosniff=true"
      - "traefik.http.middlewares.agentos-redirect.redirectscheme.scheme=https"
      - "traefik.http.services.second-brain.loadbalancer.server.port=8095"

volumes:
  obsidian-vault:
    external: true

networks:
  root_default:
    external: true
```

---

## PROJECT 14: Dograh (Voice AI)
**Dashboard Agent:** 🗣️ Dograh  
**Port:** 8670  
**GitHub:** https://github.com/dograh-hq/dograh

```yaml
# /root/agentos-projects/dograh/docker-compose.yml
services:
  dograh:
    image: ghcr.io/arisecrewyes/dograh:latest
    container_name: dograh
    restart: unless-stopped
    expose:
      - "8670"
    environment:
      - NODE_ENV=production
      - DOGRAH_API_KEY=${DOGRAH_API_KEY:-}
    networks:
      - root_default
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.dograh.rule=Host(`dograh.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.dograh.entrypoints=websecure"
      - "traefik.http.routers.dograh.tls=true"
      - "traefik.http.routers.dograh.tls.certresolver=mytlschallenge"
      - "traefik.http.routers.dograh.middlewares=agentos-headers"
      - "traefik.http.routers.dograh-http.rule=Host(`dograh.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.dograh-http.entrypoints=web"
      - "traefik.http.routers.dograh-http.middlewares=agentos-redirect"
      - "traefik.http.middlewares.agentos-headers.headers.SSLRedirect=true"
      - "traefik.http.middlewares.agentos-headers.headers.STSSeconds=315360000"
      - "traefik.http.middlewares.agentos-headers.headers.browserXSSFilter=true"
      - "traefik.http.middlewares.agentos-headers.headers.contentTypeNosniff=true"
      - "traefik.http.middlewares.agentos-redirect.redirectscheme.scheme=https"
      - "traefik.http.services.dograh.loadbalancer.server.port=8670"

networks:
  root_default:
    external: true
```

---

## PROJECT 15: ColdContactXLSX (Email Outreach)
**Dashboard Agent:** 📧 ColdContactXLSX  
**Port:** 8680  
**GitHub:** https://github.com/aasthas2022/ColdContactXLSX

```yaml
# /root/agentos-projects/coldcontactxlsx/docker-compose.yml
services:
  coldcontactxlsx:
    image: ghcr.io/arisecrewyes/coldcontactxlsx:latest
    container_name: coldcontactxlsx
    restart: unless-stopped
    expose:
      - "8680"
    environment:
      - NODE_ENV=production
    networks:
      - root_default
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.coldcontactxlsx.rule=Host(`coldcontactxlsx.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.coldcontactxlsx.entrypoints=websecure"
      - "traefik.http.routers.coldcontactxlsx.tls=true"
      - "traefik.http.routers.coldcontactxlsx.tls.certresolver=mytlschallenge"
      - "traefik.http.routers.coldcontactxlsx.middlewares=agentos-headers"
      - "traefik.http.routers.coldcontactxlsx-http.rule=Host(`coldcontactxlsx.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.coldcontactxlsx-http.entrypoints=web"
      - "traefik.http.routers.coldcontactxlsx-http.middlewares=agentos-redirect"
      - "traefik.http.middlewares.agentos-headers.headers.SSLRedirect=true"
      - "traefik.http.middlewares.agentos-headers.headers.STSSeconds=315360000"
      - "traefik.http.middlewares.agentos-headers.headers.browserXSSFilter=true"
      - "traefik.http.middlewares.agentos-headers.headers.contentTypeNosniff=true"
      - "traefik.http.middlewares.agentos-redirect.redirectscheme.scheme=https"
      - "traefik.http.services.coldcontactxlsx.loadbalancer.server.port=8680"

networks:
  root_default:
    external: true
```

---

## Shared Infrastructure

### Obsidian Vault (shared between Memory Engine & Second Brain)
```bash
mkdir -p /root/obsidian-vault
# Obsidian AppImage
wget -q "https://github.com/obsidianmd/obsidian-releases/releases/download/v1.7.7/Obsidian-1.7.7.AppImage" -O /usr/local/bin/obsidian
chmod +x /usr/local/bin/obsidian
```

### cloudflared (Tunnel)
```bash
curl -fsSL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb -o /tmp/cloudflared.deb
dpkg -i /tmp/cloudflared.deb || apt-get install -f -y
rm /tmp/cloudflared.deb
```

### Browse.sh (Browser Skills)
```bash
npm install -g @anthropic/browse 2>/dev/null || npm install -g browse 2>/dev/null
```

---

## How the Dashboard Connects to These Tools

The Agent OS dashboard's chat API (`/api/chat/route.ts`) currently calls OpenRouter for all agents. To connect agents to their dedicated tools on the VPS, you'll update the chat route to proxy requests to the appropriate container:

```
User sends message to "Content Creator"
  → Dashboard chat API receives request
  → Detects agentId = "content-creator"
  → Routes to http://content-creator:8080/api/chat (or directly to tools)
  → Returns response to user
```

This is done by modifying `src/app/api/chat/route.ts` to add agent-specific routing based on `agentId`.

---

## Deployment Order

1. **Build & push Docker images** for each project to GHCR
2. **Create project directories** on VPS: `mkdir -p /root/agentos-projects/{agent-creator,hermes,odysseus,...}`
3. **Copy each `docker-compose.yml`** to its directory
4. **Create shared volumes:** `docker volume create agentos-data && docker volume create obsidian-vault`
5. **Start each project:** `cd /root/agentos-projects/<name> && docker compose up -d`
6. **Verify:** `docker ps` — should see all containers running
7. **Update dashboard chat API** to route to tool containers
8. **Test** each agent from the dashboard

---

## Environment Variables Reference

| Variable | Used By | Required |
|---|---|---|
| `OPENROUTER_API_KEY` | All agents using AI | ✅ Yes |
| `ELEVENLABS_API_KEY` | Content Creator | Optional |
| `VOICEWAVE_API_KEY` | Content Creator, Hermes Voice | Optional |
| `PYXA_API_KEY` | Content Creator | Optional |
| `MAGICA_API_KEY` | Content Creator | Optional |
| `FAL_AI_KEY` | Content Creator | Optional |
| `TELEGRAM_BOT_TOKEN` | Hermes Automation | Optional |
| `DISCORD_BOT_TOKEN` | Hermes Automation | Optional |
| `SLACK_BOT_TOKEN` | Hermes Automation | Optional |
| `TWILIO_ACCOUNT_SID` | Hermes Voice | Optional |
| `TWILIO_AUTH_TOKEN` | Hermes Voice | Optional |
| `TWILIO_PHONE_NUMBER` | Hermes Voice | Optional |
| `DOGRAH_API_KEY` | Hermes Voice, Dograh | Optional |
| `BROWSE_SH_API_KEY` | Conductor | Optional |
| `OMI_API_KEY` | Memory Engine | Optional |
| `MEMANTO_API_KEY` | Memory & Brain | Optional |
| `ALOOK_API_KEY` | Memory & Brain | Optional |
| `SKILL_OPTIMIZATION_KEY` | Skill Master | Optional |
| `OPENAI_API_KEY` | Goldie Stack (Codex) | Optional |
| `GITHUB_TOKEN` | Goldie Stack (MCP) | Optional |
| `NETLIFY_AUTH_TOKEN` | Bolt DIY | Optional |
| `NETLIFY_SITE_ID` | Bolt DIY | Optional |
| `MINIMAX_API_KEY` | MiniMax M3 | Optional |
| `OLLAMA_BASE_URL` | MiniMax M3 | Optional |
