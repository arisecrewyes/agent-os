const express = require('express');
const app = express();
app.use(express.json());

// ═══════════════════════════════════════════════════
// TOOL REGISTRY — "The Vending Machine Inventory"
// Each agent's tools are listed with their container addresses.
// ═══════════════════════════════════════════════════
const TOOL_REGISTRY = {
  openclaw: {
    name: "OpenClaw",
    description: "Gateway router & orchestrator",
    containers: [{ name: "openclaw-gateway", url: "http://openclaw-oi15-openclaw-1", port: 51461 }]
  },
  hermes: {
    name: "Hermes Agent",
    description: "Automation & task execution",
    containers: [{ name: "hermes-agent", url: "http://hermes", port: 8642 }]
  },
  "memory-engine": {
    name: "Memory Engine",
    description: "PARA & second brain setup",
    containers: [
      { name: "memory-engine", url: "http://memory-engine", port: 8090 },
      { name: "mem-memanto", url: "http://mem-memanto", port: 8091 },
      { name: "mem-quant-mind", url: "http://mem-quant-mind", port: 8092 },
      { name: "mem-turbovec", url: "http://mem-turbovec", port: 8093 },
      { name: "mem-deer-flow", url: "http://mem-deer-flow", port: 8094 }
    ]
  },
  "skill-master": {
    name: "Skill Master",
    description: "Agent skills & optimization",
    containers: [
      { name: "skills-harness", url: "http://skills-harness", port: 9100 },
      { name: "skills-stop-slop", url: "http://skills-stop-slop", port: 9101 },
      { name: "skills-skillopt", url: "http://skills-skillopt", port: 9102 },
      { name: "skills-humanizer", url: "http://skills-humanizer", port: 9103 }
    ]
  },
  "content-creator": {
    name: "Content Creator",
    description: "Video, media & AI generation",
    containers: [
      { name: "content-creator", url: "http://content-creator", port: 8080 },
      { name: "content-pake", url: "http://content-pake", port: 8083 },
      { name: "content-hyperframes", url: "http://content-hyperframes", port: 8084 },
      { name: "osint-sherlock", url: "http://osint-sherlock", port: 9090 }
    ]
  },
  "osint-specialist": {
    name: "OSINT Specialist",
    description: "Research & intelligence",
    containers: [
      { name: "osint-sherlock", url: "http://osint-sherlock", port: 9090 },
      { name: "osint-gitrecon", url: "http://osint-gitrecon", port: 9091 },
      { name: "osint-google-dorking", url: "http://osint-google-dorking", port: 9092 }
    ]
  },
  "hermes-automation": {
    name: "Hermes Automation",
    description: "Cron, gateway & agent teams",
    containers: [{ name: "hermes-agent", url: "http://hermes", port: 8642 }]
  },
  "conductor-stack": {
    name: "Conductor",
    description: "Browser agent orchestration",
    containers: [{ name: "conductor", url: "http://conductor", port: 3002 }]
  },
  "hermes-voice": {
    name: "Hermes Voice",
    description: "Phone integration & voice AI",
    containers: [{ name: "hermes-voice", url: "http://hermes-voice", port: 8643 }]
  },
  "bolt-diy": {
    name: "Bolt DIY",
    description: "Free AI coding & development",
    containers: [{ name: "bolt-diy", url: "http://bolt-diy", port: 5173 }]
  },
  "goldie-stack": {
    name: "Goldie Stack",
    description: "Hermes + Codex + MCP",
    containers: [
      { name: "goldie-hermes-mcp", url: "http://goldie-hermes-mcp", port: 8650 },
      { name: "goldie-codex", url: "http://goldie-codex", port: 8651 }
    ]
  },
  "minimax-hermes": {
    name: "MiniMax M3 + Hermes",
    description: "Free AI agent stack",
    containers: [{ name: "minimax-hermes", url: "http://minimax-hermes", port: 8660 }]
  },
  odysseus: {
    name: "Odysseus",
    description: "Self-hosted AI workspace",
    containers: [{ name: "odysseus", url: "http://odysseus", port: 7000 }]
  },
  "second-brain": {
    name: "Second Brain",
    description: "Voice training & knowledge compounding",
    containers: [{ name: "second-brain", url: "http://second-brain", port: 8095 }]
  },
  dograh: {
    name: "Dograh",
    description: "Voice AI platform",
    containers: [{ name: "dograh", url: "http://dograh", port: 8670 }]
  },
  coldcontactxlsx: {
    name: "ColdContactXLSX",
    description: "Cold email outreach",
    containers: [{ name: "coldcontactxlsx", url: "http://coldcontactxlsx", port: 8680 }]
  }
};

// ═══════════════════════════════════════════════════
// API ENDPOINTS
// ═══════════════════════════════════════════════════

app.get('/health', (req, res) => {
  res.json({ status: 'ok', registry: Object.keys(TOOL_REGISTRY).length, uptime: process.uptime() });
});

app.get('/agents', (req, res) => {
  const agents = Object.entries(TOOL_REGISTRY).map(([id, info]) => ({
    id, name: info.name, description: info.description,
    containers: info.containers.map(c => ({ name: c.name, port: c.port }))
  }));
  res.json({ agents });
});

app.post('/route', async (req, res) => {
  const { agentId, message, action } = req.body;

  if (!agentId || !message) {
    return res.status(400).json({ error: 'agentId and message required' });
  }

  const agent = TOOL_REGISTRY[agentId];
  if (!agent) {
    return res.status(404).json({ error: `Agent '${agentId}' not found in registry` });
  }

  if (agent.containers.length === 0) {
    return res.json({ response: `${agent.name} has no external tools. Use OpenRouter chat.` });
  }

  const target = agent.containers[0];

  try {
    const toolResponse = await fetch(`${target.url}:${target.port}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, action })
    });
    const data = await toolResponse.json();
    res.json({ agent: agent.name, tool: target.name, response: data });
  } catch (err) {
    res.status(502).json({ error: `Failed to reach ${target.name}: ${err.message}` });
  }
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Agent OS Connector running on port ${PORT}`);
  console.log(`Registry: ${Object.keys(TOOL_REGISTRY).length} agents`);
});
