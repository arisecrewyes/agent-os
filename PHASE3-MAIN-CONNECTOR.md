# Phase 3 — Main Category: Connector + Agent Creator
# ====================================================
#
# KEY INSIGHT: The Agent Creator is NOT a separate container.
# It's already built into the Agent OS dashboard (src/app/api/agent-creator/).
# The dashboard IS the Agent Creator.
#
# What we need:
# 1. Agent Creator Dockerfile → NOT NEEDED (already in dashboard)
# 2. Connector layer → A lightweight service that routes dashboard
#    chat requests to external tool containers on the VPS
#
# The connector runs INSIDE the agentos project as a second container.
# It's the "vending machine" that knows where every tool lives.
#
# ====================================================


# =============================================
# CONNECTOR LAYER — "The Vending Machine"
# =============================================
# This runs inside the agentos project alongside the dashboard.
# The dashboard's chat API calls this connector to route messages
# to external tool containers.
#
# Location: /root/agentos/connector/
# This gets added to the existing agentos docker-compose.yml
# =============================================

# Save this as: /root/agentos/connector/Dockerfile

# ---- Dockerfile ----
# FROM node:22-alpine
# WORKDIR /app
# COPY package.json package-lock.json* ./
# RUN npm ci --only=production 2>/dev/null || npm install
# COPY . .
# EXPOSE 8888
# CMD ["node", "server.js"]
# ---- End Dockerfile ----

# Save this as: /root/agentos/connector/server.js

# ---- server.js ----
# const http = require('http');
# const express = require('express');
# const app = express();
# app.use(express.json());
#
# // ============================================
# // TOOL REGISTRY — "The Vending Machine Inventory"
# // ============================================
# // Each agent's tools are listed here with their container addresses.
# // When the dashboard needs to use a tool, it asks the connector.
# // The connector routes to the right container.
# //
# // Format: agentId → { name, containers: [{ name, url, port }] }
# // ============================================
#
# const TOOL_REGISTRY = {
#   // ── MAIN AGENTS ──────────────────────────
#   openclaw: {
#     name: "OpenClaw",
#     description: "Gateway router & orchestrator",
#     containers: [
#       { name: "openclaw-gateway", url: "http://openclaw-oi15-openclaw-1", port: 51461 }
#     ]
#   },
#   hermes: {
#     name: "Hermes Agent",
#     description: "Automation & task execution",
#     containers: [
#       { name: "hermes-agent", url: "http://hermes-agent-7llb-hermes-agent-1", port: 4860 }
#     ]
#   },
#
#   // ── MEMORY & BRAIN (Phase 3B) ────────────
#   "memory-engine": {
#     name: "Memory Engine",
#     description: "PARA & second brain setup",
#     containers: [
#       { name: "memory-engine", url: "http://memory-engine", port: 8090 },
#       { name: "mem-memanto", url: "http://mem-memanto", port: 8091 },
#       { name: "mem-quant-mind", url: "http://mem-quant-mind", port: 8092 },
#       { name: "mem-turbovec", url: "http://mem-turbovec", port: 8093 },
#       { name: "mem-deer-flow", url: "http://mem-deer-flow", port: 8094 }
#     ]
#   },
#   "infinite-context": {
#     name: "Infinite Context",
#     description: "Claude + Obsidian + OMI loop",
#     containers: [
#       { name: "memory-engine", url: "http://memory-engine", port: 8090 }
#     ]
#   },
#   "memory-brain": {
#     name: "Memory & Brain Systems",
#     description: "Knowledge & vector search",
#     containers: [
#       { name: "mem-memanto", url: "http://mem-memanto", port: 8091 },
#       { name: "mem-quant-mind", url: "http://mem-quant-mind", port: 8092 },
#       { name: "mem-turbovec", url: "http://mem-turbovec", port: 8093 },
#       { name: "mem-deer-flow", url: "http://mem-deer-flow", port: 8094 }
#     ]
#   },
#
#   // ── SKILLS (Phase 3C) ────────────────────
#   "skill-master": {
#     name: "Skill Master",
#     description: "Agent skills & optimization",
#     containers: [
#       { name: "skills-harness", url: "http://skills-harness", port: 9100 },
#       { name: "skills-stop-slop", url: "http://skills-stop-slop", port: 9101 },
#       { name: "skills-skillopt", url: "http://skills-skillopt", port: 9102 },
#       { name: "skills-humanizer", url: "http://skills-humanizer", port: 9103 }
#     ]
#   },
#
#   // ── CONTENT CREATION (Phase 3D) ──────────
#   "content-creator": {
#     name: "Content Creator",
#     description: "Video, media & AI generation",
#     containers: [
#       { name: "content-creator", url: "http://content-creator", port: 8080 },
#       { name: "content-pake", url: "http://content-pake", port: 8083 },
#       { name: "content-hyperframes", url: "http://content-hyperframes", port: 8084 },
#       { name: "osint-sherlock", url: "http://osint-sherlock", port: 9090 }
#     ]
#   },
#
#   // ── OSINT & RESEARCH ─────────────────────
#   "osint-specialist": {
#     name: "OSINT Specialist",
#     description: "Research & intelligence",
#     containers: [
#       { name: "osint-sherlock", url: "http://osint-sherlock", port: 9090 },
#       { name: "osint-gitrecon", url: "http://osint-gitrecon", port: 9091 },
#       { name: "osint-google-dorking", url: "http://osint-google-dorking", port: 9092 }
#     ]
#   },
#
#   // ── AUTOMATION ───────────────────────────
#   "hermes-automation": {
#     name: "Hermes Automation",
#     description: "Cron, gateway & agent teams",
#     containers: [
#       { name: "hermes-agent", url: "http://hermes-agent-7llb-hermes-agent-1", port: 4860 }
#     ]
#   },
#   "conductor-stack": {
#     name: "Conductor",
#     description: "Browser agent orchestration",
#     containers: [
#       { name: "conductor", url: "http://conductor", port: 3002 }
#     ]
#   },
#   "hermes-voice": {
#     name: "Hermes Voice",
#     description: "Phone integration & voice AI",
#     containers: [
#       { name: "hermes-voice", url: "http://hermes-voice", port: 8643 }
#     ]
#   },
#
#   // ── CODING & DEVELOPMENT ─────────────────
#   "bolt-diy": {
#     name: "Bolt DIY",
#     description: "Free AI coding & development",
#     containers: [
#       { name: "bolt-diy", url: "http://bolt-diy", port: 5173 }
#     ]
#   },
#   "goldie-stack": {
#     name: "Goldie Stack",
#     description: "Hermes + Codex + MCP",
#     containers: [
#       { name: "goldie-hermes-mcp", url: "http://goldie-hermes-mcp", port: 8650 },
#       { name: "goldie-codex", url: "http://goldie-codex", port: 8651 }
#     ]
#   },
#
#   // ── AI WORKSPACE ─────────────────────────
#   "minimax-hermes": {
#     name: "MiniMax M3 + Hermes",
#     description: "Free AI agent stack",
#     containers: [
#       { name: "minimax-hermes", url: "http://minimax-hermes", port: 8660 }
#     ]
#   },
#   "odysseus-agent": {
#     name: "Odysseus",
#     description: "Self-hosted AI workspace",
#     containers: [
#       { name: "odysseus", url: "http://odysseus", port: 7000 }
#     ]
#   },
#   "second-brain": {
#     name: "Second Brain",
#     description: "Voice training & knowledge compounding",
#     containers: [
#       { name: "second-brain", url: "http://second-brain", port: 8095 }
#     ]
#   },
#
#   // ── GETTING STARTED ──────────────────────
#   "getting-started-agent": {
#     name: "Getting Started",
#     description: "Free AI stack guide & installer",
#     containers: []
#   }
# };
#
# // ============================================
# // API ENDPOINTS
# // ============================================
#
# // Health check
# app.get('/health', (req, res) => {
#   res.json({ status: 'ok', registry: Object.keys(TOOL_REGISTRY).length });
# });
//
# // List all registered agents
# app.get('/agents', (req, res) => {
#   const agents = Object.entries(TOOL_REGISTRY).map(([id, info]) => ({
#     id, name: info.name, description: info.description,
#     containers: info.containers.map(c => ({ name: c.name, port: c.port }))
#   }));
#   res.json({ agents });
# });
//
# // Route a message to an agent's tool container
# app.post('/route', async (req, res) => {
#   const { agentId, message, action } = req.body;
#
#   if (!agentId || !message) {
#     return res.status(400).json({ error: 'agentId and message required' });
#   }
#
#   const agent = TOOL_REGISTRY[agentId];
#   if (!agent) {
#     return res.status(404).json({ error: `Agent '${agentId}' not found in registry` });
#   }
#
#   if (agent.containers.length === 0) {
#     return res.json({ response: `${agent.name} has no external tools. Use OpenRouter chat.` });
#   }
//
#   // For agents with one container, route directly
#   // For agents with multiple containers, use the first (orchestrator) container
#   const target = agent.containers[0];
#
#   try {
#     // Forward the request to the tool container
#     const toolResponse = await fetch(`${target.url}:${target.port}/api/chat`, {
#       method: 'POST',
#       headers: { 'Content-Type': 'application/json' },
#       body: JSON.stringify({ message, action })
#     });
#
#     const data = await toolResponse.json();
#     res.json({ agent: agent.name, tool: target.name, response: data });
#   } catch (err) {
#     res.status(502).json({ error: `Failed to reach ${target.name}: ${err.message}` });
#   }
# });
//
# const PORT = process.env.PORT || 8888;
# app.listen(PORT, '0.0.0.0', () => {
#   console.log(`Agent OS Connector running on port ${PORT}`);
#   console.log(`Registry: ${Object.keys(TOOL_REGISTRY).length} agents`);
# });
# ---- End server.js ----

# Save this as: /root/agentos/connector/package.json

# ---- package.json ----
# {
#   "name": "agent-os-connector",
#   "version": "1.0.0",
#   "private": true,
#   "scripts": {
#     "start": "node server.js"
#   },
#   "dependencies": {
#     "express": "^4.21.0"
#   }
# }
# ---- End package.json ----


# =============================================
# UPDATED agentos docker-compose.yml
# =============================================
# Add the connector to your EXISTING agentos project.
# This goes in the SAME docker-compose.yml as the dashboard.
#
# Location: /root/agentos/docker-compose.yml (EDIT existing file)
# =============================================

# Add this as a second service in your agentos docker-compose.yml:

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
#     # NO external ports — only the dashboard talks to it internally
#
# Then update the agentos service to add:
#     depends_on:
#       - connector
#     environment:
#       - CONNECTOR_URL=http://agentos-connector:8888


# =============================================
# HOW TO DEPLOY
# =============================================

# Step 1: Create the connector directory inside the agentos project
#   mkdir -p /root/agentos/connector

# Step 2: Copy the 3 files into it
#   cp Dockerfile /root/agentos/connector/
#   cp server.js /root/agentos/connector/
#   cp package.json /root/agentos/connector/

# Step 3: Edit /root/agentos/docker-compose.yml
#   Add the connector service (see above)
#   Add depends_on + CONNECTOR_URL to the agentos service

# Step 4: Rebuild and restart
#   cd /root/agentos && docker compose down && docker compose up -d --build

# Step 5: Test
#   curl http://localhost:8888/health
#   curl http://localhost:8888/agents

# Step 6: Test from inside the dashboard container
#   docker exec agentos curl http://agentos-connector:8888/health
