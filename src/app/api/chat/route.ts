import { NextRequest, NextResponse } from "next/server";
import { VAULT_PATH, getAgentContext, saveChatLog, readJSON } from "@/lib/vault";

// Agent registry \u2014 maps agent IDs to their capabilities for inter-agent communication
const AGENT_REGISTRY: Record<string, { name: string; role: string; keywords: string[]; description: string }> = {
  "content-creator": {
    name: "Content Creator",
    role: "Video, Media & AI Generation",
    keywords: ["video", "media", "content creation", "edit", "download", "scrape", "social media", "image generation", "video generation", "reclip", "clypra", "osint", "sales", "outreach", "voice", "audio", "AI generate", "create content", "thumbnail", "youtube", "tiktok", "instagram"],
    description: "Specialized in content creation, video editing, media download, AI image/video generation, social media scraping, and sales outreach."
  },
  "memory-brain": {
    name: "Memory & Brain",
    role: "Knowledge & Memory Systems",
    keywords: ["memory", "knowledge", "vector", "search", "extract", "index", "brain", "remember", "recall", "document analysis", "collaboration", "agents collaborate", "share memory", "improve memory", "knowledge graph"],
    description: "Specialized in agent memory systems, knowledge extraction, vector search, agent collaboration, and brain-like capabilities."
  },
  "skill-master": {
    name: "Skill Master",
    role: "Agent Skills & Optimization",
    keywords: ["skill", "optimize", "improve", "capability", "humanize", "writing", "detect AI", "learn", "train", "enhance", "meta-skill", "skill conversion", "skill optimization"],
    description: "Specialized in agent skills, skill optimization, skill conversion, AI writing detection, and knowledge graphs."
  }
};

async function getAgentName(agentId: string): Promise<string> {
  const builtIn: Record<string, string> = {
    "agent-creator": "Agent Creator",
    openclaw: "OpenClaw",
    hermes: "Hermes",
    claude: "Claude",
    "content-creator": "Content Creator",
    "memory-engine": "Memory Engine",
    "infinite-context": "Infinite Context",
    "memory-brain": "Memory & Brain",
    "osint-specialist": "OSINT Specialist",
    "skill-master": "Skill Master",
    "hermes-automation": "Hermes Automation",
    "conductor-stack": "Conductor",
    "hermes-voice": "Hermes Voice",
    "bolt-diy": "Bolt DIY",
    "goldie-stack": "Goldie Stack",
    "minimax-hermes": "MiniMax M3 + Hermes",
    "odysseus-agent": "Odysseus",
    "second-brain": "Second Brain",
    "getting-started-agent": "Getting Started",
  };
  if (builtIn[agentId]) return builtIn[agentId];
  try {
    const agents = await readJSON("custom-agents.json", []);
    const agent = agents.find((a: any) => a.id === agentId);
    return agent?.name || agentId;
  } catch {
    return agentId;
  }
}

// Agent execution instructions \u2014 each Skool agent gets specific setup behavior
function getAgentSetupInstructions(agentId: string): string {
  const instructions: Record<string, string> = {
    "getting-started-agent": `You are the Getting Started agent. Your job is to install and set up the free AI stack on the user's system.
FIRST: Ask the user about their OS and device configuration (Windows/Mac/Linux, local/VPS/cloud, any specific hardware).
Then guide them through: 1) Create OpenRouter account + API key 2) Install Hermes Agent 3) Connect MiniMax M3 as brain 4) Test connection 5) Run first task.
Use option C: attempt to run commands directly when possible, guide when needed. Prompt for API keys. Troubleshoot until fully functional.`,
    "content-creator": `You are the Content Creator agent. Your job is to install and set up content creation tools on the user's system.
FIRST: Ask the user about their OS and device configuration.
Then install and configure: reclip (video download), Clypra (video editor), Hyperframes (HTML to video), Open-Generative-AI (image/video generation), Sherlock (social search), Pake (webpage to desktop app), social-media-scraping-apis, Nango (integrations), SalesGPT, leads-generator, ViMax, VibeVoice, wa-automate.
When a tool lacks native API, prompt user for tool link and create a workaround. Troubleshoot until fully functional.`,
    "memory-engine": `You are the Memory Engine agent. Your job is to set up the PARA-based second brain system.
FIRST: Ask the user about their OS and device configuration.
Then: 1) Download Obsidian, create vault 2) Create PARA folder structure 3) Install OMI for automatic capture 4) Connect OMI to Obsidian 5) Wire Claude to read/write vault 6) Set up graph view color coding.
Troubleshoot until fully functional.`,
    "infinite-context": `You are the Infinite Context agent. Your job is to implement the two-way context loop (vault feeds Claude, Claude improves vault).
FIRST: Ask the user about their OS and device configuration.
Then set up: OMI capture, Obsidian storage, Claude reading/writing, daily notes, personal context document, graph view, 30-day roadmap.
Troubleshoot until fully functional.`,
    "memory-brain": `You are the Memory & Brain agent. Your job is to install memory and brain improvement systems.
FIRST: Ask the user about their OS and device configuration.
Then install: memanto, quant-mind, turbovec, alook collaboration, deer-flow SuperAgent, open-code-review, project-nomad.
Troubleshoot until fully functional.`,
    "osint-specialist": `You are the OSINT Specialist agent. Your job is to install and configure OSINT tools.
FIRST: Ask the user about their OS and device configuration.
Then install: Sherlock (social media search), GITRECON (GitHub recon), google-dorking.
Troubleshoot until fully functional.`,
    "skill-master": `You are the Skill Master agent. Your job is to manage agent skills across the entire OS.
FIRST: Ask the user about their OS and device configuration.
Then install: harness (meta-skill), stop-slop, SkillOpt, book-to-skill, Skill_Seekers, humanizer.
Optimize agent performance. Troubleshoot until fully functional.`,
    "hermes-automation": `You are the Hermes Automation agent. Your job is to set up Hermes automation blueprints.
FIRST: Ask the user about their OS and device configuration.
Then: 1) Install Hermes Agent 2) Configure cron scheduler 3) Set up Telegram/Discord gateway 4) Create agent team profiles 5) Configure self-improving skills 6) Set up parallel subagents.
Prompt for API keys. Troubleshoot until fully functional.`,
    "conductor-stack": `You are the Conductor agent. Your job is to install and orchestrate browser agents.
FIRST: Ask the user about their OS and device configuration.
Then: 1) Install browse.sh CLI 2) Pick initial skills 3) Set up Agent OS (SOPs, memory, routing) 4) Write first SOPs 5) Schedule and connect 6) Document and expand.
Troubleshoot until fully functional.`,
    "hermes-voice": `You are the Hermes Voice agent. Your job is to set up phone calling to Hermes.
FIRST: Ask the user about their OS and device configuration AND which voice platform they want to use (VoiceWave, Pyxa, Magica, Dograh, fal.ai, ElevenLabs, or other).
If the chosen tool lacks native API, prompt user for the tool link and create a workaround.
Then: 1) Enable Hermes API server 2) Pick fast model 3) Start gateway + tunnel 4) Configure voice agent 5) Connect phone number 6) Test call.
Troubleshoot until fully functional.`,
    "bolt-diy": `You are the Bolt DIY agent. Your job is to set up free AI coding.
FIRST: Ask the user about their OS and device configuration.
Then: 1) Install Bolt DIY from GitHub 2) Connect Claude 3.7 Sonnet via OpenRouter 3) Set up free AI APIs 4) Build first project 5) Deploy to Netlify.
Troubleshoot until fully functional.`,
    "goldie-stack": `You are the Goldie Stack agent. Your job is to set up Hermes + Codex + MCP.
FIRST: Ask the user about their OS and device configuration.
Then: 1) Install Hermes MCP server 2) Install Codex 3) Configure MCP connection 4) Set up 10 MCP tools (conversations, messages, events, channels, permissions) 5) Test the stack.
Troubleshoot until fully functional.`,
    "odysseus-agent": `You are the Odysseus agent. Your job is to install and configure the Odysseus AI workspace.
FIRST: Ask the user about their OS and device configuration.
Then: 1) Install Odysseus from GitHub 2) Open at localhost:7000 3) Connect cloud brain via OpenRouter 4) Set up chat, operator, research, memory layers.
Troubleshoot until fully functional.`,
    "second-brain": `You are the Second Brain agent. Your job is to build the complete second brain system.
FIRST: Ask the user about their OS and device configuration.
Then follow the 30-day rollout: Week 1 Foundation, Week 2 Automate, Week 3 Scale, Week 4 Systematise.
Includes: Obsidian vault, PARA structure, auto-notes, voice training, 110+ prompts.
Troubleshoot until fully functional.`,
    "minimax-hermes": `You are the MiniMax M3 + Hermes agent. Your job is to set up the free AI agent stack.
FIRST: Ask the user about their OS and device configuration.
Then: 1) Install Hermes 2) Connect MiniMax M3 brain via Ollama/OpenRouter 3) Configure Agent OS Framework (Ears, Brain, Hands) 4) Set up free AI APIs.
Prompt for API keys. Troubleshoot until fully functional.`,
  };
  return instructions[agentId] || "";
}

export async function POST(req: NextRequest) {
  try {
    const { message, agentId, history } = await req.json();

    const builtInNames: Record<string, string> = {
      "agent-creator": "Agent Creator",
      openclaw: "OpenClaw",
      hermes: "Hermes",
      claude: "Claude",
    };
    let agentName = builtInNames[agentId] || agentId;
    if (!builtInNames[agentId]) {
      try {
        const agents = await readJSON("custom-agents.json", []);
        const agent = agents.find((a: any) => a.id === agentId);
        if (agent?.name) agentName = agent.name;
      } catch {}
    }

    // Get vault context for memory injection
    let vaultContext = "";
    try {
      vaultContext = await getAgentContext(agentId);
    } catch {}

    const contextSection = vaultContext
      ? `\n\n--- VAULT CONTEXT (use this to personalize your response) ---\n${vaultContext}\n--- END VAULT CONTEXT ---`
      : "";

    // Agent-to-Agent Communication:
    // Check if this message should be delegated to a specialist agent
    const lowerMessage = message.toLowerCase();
    let delegationNote = "";
    for (const [specialistId, specialist] of Object.entries(AGENT_REGISTRY)) {
      if (specialistId === agentId) continue;
      const matchedKeyword = specialist.keywords.some(kw => lowerMessage.includes(kw));
      if (matchedKeyword) {
        delegationNote += `\n\n--- AGENT COLLABORATION AVAILABLE ---\nThis task matches the ${specialist.name} agent (${specialist.role}).\n${specialist.description}\nYou can collaborate with this agent by acknowledging their expertise in your response.\n--- END COLLABORATION ---`;
      }
    }

    // Get agent-specific setup instructions
    const setupInstructions = getAgentSetupInstructions(agentId);
    const setupSection = setupInstructions ? `\n\n--- YOUR ROLE & SETUP INSTRUCTIONS ---\n${setupInstructions}\n--- END INSTRUCTIONS ---` : "";

    const systemPrompt = `You are ${agentName}, an AI agent in the Agent OS mission control system. You are helpful, concise, and capable.${contextSection}${delegationNote}${setupSection}`;

    const messages = [
      { role: "system" as const, content: systemPrompt },
      ...(history || []).map((m: any) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user" as const, content: message },
    ];

    // Load API key from vault (user-configured) or fall back to env
    let apiKey = process.env.OPENROUTER_API_KEY || "";
    if (!apiKey) {
      try {
        const globalConfigs = await readJSON("agent-configs.json", {});
        apiKey = globalConfigs?.global?.OPENROUTER_API_KEY || "";
      } catch {}
    }

    if (!apiKey) {
      return NextResponse.json(
        { response: "⚠️ OpenRouter API key not configured. Go to Settings → Global to add your API key." },
        { status: 200 }
      );
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "Agent OS",
      },
      body: JSON.stringify({
        model: "openrouter/owl-alpha",
        messages,
        max_tokens: 2048,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter error:", response.status, errorText);
      return NextResponse.json(
        { response: `⚠️ API error (${response.status}). Check your OpenRouter key and model.` },
        { status: 200 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response generated.";

    // Log chat to vault (fire and forget)
    try {
      const allMessages = [
        ...(history || []).map((m: any) => ({
          role: m.role,
          content: m.content,
          timestamp: m.timestamp || Date.now(),
        })),
        { role: "user", content: message, timestamp: Date.now() },
        { role: "assistant", content: reply, timestamp: Date.now() + 1 },
      ];
      await saveChatLog(agentId, agentName, allMessages);
    } catch (e) {
      console.error("Failed to save chat log:", e);
    }

    return NextResponse.json({ response: reply });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { response: `⚠️ Connection error: ${error.message}` },
      { status: 200 }
    );
  }
}
