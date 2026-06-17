"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Bot, Target, BookOpen, Settings,
  Mic, MicOff, Send, ChevronRight, Activity,
  Zap, Brain, Search, Shield, Plus, Check, X,
  MessageSquare, Clock, BarChart3, Users, Wrench, RefreshCw, Code, Globe, Rocket
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import AgentCard from "@/components/AgentCard";
import ChatPanel from "@/components/ChatPanel";
import AgentCreatorPanel from "@/components/AgentCreatorPanel";
import StatusBadge from "@/components/StatusBadge";

interface Agent {
  id: string;
  name: string;
  role: string;
  icon: string;
  status: "live" | "degraded" | "offline" | "busy";
  description: string;
  color: string;
  repoUrl?: string;
  pinned?: boolean;
  order?: number;
  category?: string;
}

const BUILT_IN_AGENTS: Agent[] = [
  // ==================== MAIN AGENTS ====================
  {
    id: "agent-creator",
    name: "Agent Creator",
    role: "Build & Deploy Custom Agents",
    icon: "🏗️",
    status: "live",
    description: "AI-powered agent builder. Feed it a URL, repo, PDF, or eBook. Asks about your OS/device setup, then builds and installs a new agent + deployable project. Troubleshoots until fully functional.",
    color: "#e056fd",
    category: "Main",
  },
  {
    id: "openclaw",
    name: "OpenClaw",
    role: "Gateway Router & Orchestrator",
    icon: "🦀",
    status: "live",
    description: "Multi-agent gateway & session router. Routes tasks between all agents, manages sessions, coordinates inter-agent communication. The central nervous system of Agent OS.",
    color: "#6c5ce7",
    category: "Main",
  },
  {
    id: "claude",
    name: "Claude",
    role: "Intelligence Layer",
    icon: "🧠",
    status: "live",
    description: "Thinking layer — strategy, planning, code execution, file analysis. Handles complex reasoning and coordinates with specialist agents.",
    color: "#ff6b6b",
    category: "Main",
  },

  // ==================== CONTENT CREATION ====================
  {
    id: "content-creator",
    name: "Content Creator",
    role: "Video, Media & AI Generation",
    icon: "🎬",
    status: "live",
    description: "Executes content creation setup. Installs reclip, Clypra, Hyperframes, Open-Generative-AI, Sherlock, Pake, social-media-scraping-apis, Nango, SalesGPT, leads-generator, ViMax, VibeVoice, wa-automate. Manages 18+ repos. Asks OS/device config, prompts for API keys, troubleshoots until fully functional.",
    color: "#ff7417",
    category: "Content Creation",
  },

  // ==================== MEMORY & BRAIN ====================
  {
    id: "memory-engine",
    name: "Memory Engine",
    role: "PARA & Second Brain Setup",
    icon: "📚",
    status: "live",
    description: "Sets up the complete Memory Engine. Installs OMI, creates PARA folder structure, connects Obsidian vault, wires Claude for context injection. Asks OS/device config first, then builds your second brain that compounds daily.",
    color: "#fdcb6e",
    category: "Memory & Brain",
  },
  {
    id: "infinite-context",
    name: "Infinite Context",
    role: "Claude + Obsidian + OMI Loop",
    icon: "🔄",
    status: "live",
    description: "Implements the two-way context loop. Sets up OMI capture, Obsidian storage, Claude reading/writing. Manages daily notes, personal context document, graph view. Compounds your AI context over time.",
    color: "#e056fd",
    category: "Memory & Brain",
  },
  {
    id: "memory-brain",
    name: "Memory & Brain Systems",
    role: "Knowledge & Vector Search",
    icon: "🧠",
    status: "live",
    description: "Installs memory and brain improvement systems. Sets up memanto, quant-mind, turbovec, alook collaboration, deer-flow SuperAgent. Manages 11+ repos for knowledge extraction and agent memory.",
    color: "#6c5ce7",
    category: "Memory & Brain",
  },

  // ==================== OSINT & RESEARCH ====================
  {
    id: "osint-specialist",
    name: "OSINT Specialist",
    role: "Research & Intelligence",
    icon: "🔍",
    status: "live",
    description: "Executes OSINT and research setup. Installs Sherlock, GITRECON, google-dorking. Performs social media reconnaissance, GitHub footprint analysis, and advanced search techniques.",
    color: "#0984e3",
    category: "OSINT & Research",
  },

  // ==================== SKILLS & CREATION ====================
  {
    id: "skill-master",
    name: "Skill Master",
    role: "Agent Skills & Optimization",
    icon: "⚡",
    status: "live",
    description: "Manages agent skills. Installs harness meta-skill, stop-slop, SkillOpt, book-to-skill, Skill_Seekers, humanizer. Converts documentation into Claude Code skills. Optimizes agent performance across the entire OS.",
    color: "#00b894",
    category: "Skills & Creation",
  },

  // ==================== AUTOMATION ====================
  {
    id: "hermes-automation",
    name: "Hermes Automation",
    role: "Cron, Gateway & Agent Teams",
    icon: "🤖",
    status: "live",
    description: "Sets up Hermes automation blueprints. Installs Hermes, configures cron scheduler, Telegram/Discord gateway, agent teams (profiles), self-improving skills, parallel subagents. Asks OS/device config, prompts for API keys.",
    color: "#f5c842",
    category: "Automation",
  },
  {
    id: "conductor-stack",
    name: "Conductor",
    role: "Browser Agent Orchestration",
    icon: "🎻",
    status: "live",
    description: "Installs and orchestrates browser agents. Sets up browse.sh catalog (250+ skills), creates SOPs, schedules agent chains, manages cross-platform deployment. Your control tower for an army of AI browser agents.",
    color: "#e17055",
    category: "Automation",
  },
  {
    id: "hermes-voice",
    name: "Hermes Voice",
    role: "Phone Integration & Voice AI",
    icon: "📞",
    status: "live",
    description: "Sets up phone calling to your Hermes agent. Installs voice platform integration (VoiceWave/Pyxa/Magica/Dograh/fal.ai), configures cloudflared tunnel, connects telephony. Asks OS/device config, prompts for API keys and tool links.",
    color: "#fdcb6e",
    category: "Automation",
  },

  // ==================== CODING & DEVELOPMENT ====================
  {
    id: "bolt-diy",
    name: "Bolt DIY",
    role: "Free AI Coding & Development",
    icon: "💻",
    status: "live",
    description: "Executes Bolt DIY setup. Installs from GitHub, connects Claude 3.7 Sonnet via OpenRouter, sets up free AI APIs (Google Flash 2.0, Misra, DeepSeek), deploys to Netlify. Builds web apps, games, tools with AI.",
    color: "#6c5ce7",
    category: "Coding & Development",
  },
  {
    id: "goldie-stack",
    name: "Goldie Stack",
    role: "Hermes + Codex + MCP",
    icon: "🏗️",
    status: "live",
    description: "Sets up the Goldie Stack Framework. Installs Hermes as MCP server, connects Codex via MCP, configures 10 MCP tools. Implements the 4-layer Brain/Hands/Builder/Output system.",
    color: "#e056fd",
    category: "Coding & Development",
  },

  // ==================== AI WORKSPACE ====================
  {
    id: "minimax-hermes",
    name: "MiniMax M3 + Hermes",
    role: "Free AI Agent Stack",
    icon: "⚙️",
    status: "live",
    description: "Sets up MiniMax M3 + Hermes Agent. Installs Hermes, connects MiniMax M3 brain via Ollama/OpenRouter, configures fast model. Implements the Agent OS Framework (Ears, Brain, Hands).",
    color: "#0984e3",
    category: "AI Workspace",
  },
  {
    id: "odysseus-agent",
    name: "Odysseus",
    role: "Self-Hosted AI Workspace",
    icon: "🌐",
    status: "live",
    description: "Installs and configures Odysseus AI workspace. Sets up local/cloud models, chat, operator agent, research helper, memory. Implements the Odysseus Operator System (Brain, Chatter, Operator, Memory layers).",
    color: "#00b894",
    category: "AI Workspace",
  },
  {
    id: "second-brain",
    name: "Second Brain",
    role: "Voice Training & Knowledge Compounding",
    icon: "💾",
    status: "live",
    description: "Builds your complete second brain. Sets up Obsidian vault, PARA structure, auto-notes, voice training, content-in-your-voice system. Implements 30-day rollout plan with 110+ prompts.",
    color: "#fdcb6e",
    category: "AI Workspace",
  },

  // ==================== GETTING STARTED ====================
  {
    id: "getting-started-agent",
    name: "Getting Started",
    role: "Free AI Stack Guide & Installer",
    icon: "🚀",
    status: "live",
    description: "Walks through the complete free AI stack setup. Hermes + OpenRouter + Owl Alpha + Python. Installs everything step by step with 5-phase SOP. Asks OS/device config, prompts for API keys, troubleshoots until fully functional.",
    color: "#ff6b6b",
    category: "Getting Started",
  },
];

// Keep the old agent-creator reference for backward compat
const LEGACY_AGENTS = [
  {
    id: "agent-creator-legacy",
    name: "Agent Creator (Legacy)",
    role: "Build & Deploy Agents",
    icon: "🏗️",
    status: "live",
    description: "AI-powered agent builder. Feed it a URL, repo, PDF, or eBook — it analyzes the source, asks about custom features, and builds a new agent + deployable project for you.",
    color: "#e056fd",
  },
  {
    id: "openclaw",
    name: "OpenClaw",
    role: "Gateway Router",
    icon: "🦀",
    status: "live",
    description: "Multi-agent gateway & session router. Routes tasks between agents, manages sessions.",
    color: "#6c5ce7",
  },
  {
    id: "hermes",
    name: "Hermes",
    role: "Research & Execution",
    icon: "⚡",
    status: "live",
    description: "Tool calls, Kanban tasks, skills, competitor research, scheduled workflows.",
    color: "#f5c842",
  },
  {
    id: "claude",
    name: "Claude",
    role: "Intelligence Layer",
    icon: "🧠",
    status: "live",
    description: "Thinking layer — strategy, planning, code execution, file analysis.",
    color: "#ff6b6b",
  },
  {
    id: "content-creator",
    name: "Content Creator",
    role: "Video, Media & AI Generation",
    icon: "🎬",
    status: "live",
    description: "Specialized agent for content creation. Accesses 18+ open-source repos for video editing (Clypra), media download (reclip), AI image/video generation (Open-Generative-AI), social scraping, OSINT, sales outreach, and more. Collaborates with other agents when content tasks arise.",
    color: "#ff7417",
    repoUrl: "https://github.com/arisecrewyes/agent-os/tree/main/src/app/repos-content",
  },
  {
    id: "memory-brain",
    name: "Memory & Brain",
    role: "Knowledge & Memory Systems",
    icon: "🧠",
    status: "live",
    description: "Specialized agent for memory and brain improvements. Accesses 11+ open-source repos for agent memory (memanto), knowledge extraction (quant-mind), vector search (turbovec), agent collaboration (alook, deer-flow), and OSINT. Collaborates with other agents to enhance their memory and knowledge capabilities.",
    color: "#6c5ce7",
    repoUrl: "https://github.com/arisecrewyes/agent-os/tree/main/src/app/repos-memory",
  },
  {
    id: "skill-master",
    name: "Skill Master",
    role: "Agent Skills & Optimization",
    icon: "⚡",
    status: "live",
    description: "Specialized agent for agent skills. Accesses 11+ open-source repos for meta-skills (harness), skill optimization (SkillOpt), skill conversion (book-to-skill, Skill_Seekers), AI writing (humanizer), and knowledge graphs. Collaborates with other agents to improve their skills and capabilities.",
    color: "#00b894",
    repoUrl: "https://github.com/arisecrewyes/agent-os/tree/main/src/app/repos-skills",
  },
];

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  agentId: string;
}

export default function Home() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [customAgents, setCustomAgents] = useState<Agent[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [agentsLoaded, setAgentsLoaded] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const allAgents = [...BUILT_IN_AGENTS, ...customAgents];

  // Reset active agent when navigating away from home
  useEffect(() => {
    if (pathname !== "/") {
      setActiveAgent(null);
    }
  }, [pathname]);

  // Load custom agents from vault
  useEffect(() => {
    fetch("/api/agents")
      .then((res) => res.json())
      .then((data) => {
        setCustomAgents(data.agents || []);
      })
      .catch(() => {
        setCustomAgents([]);
      })
      .finally(() => setAgentsLoaded(true));
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startListening = useCallback(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !activeAgent || isSending) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: Date.now(),
      agentId: activeAgent,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.content,
          agentId: activeAgent,
          history: messages.slice(-10),
        }),
      });

      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "No response received.",
        timestamp: Date.now(),
        agentId: activeAgent,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "⚠️ Connection error. Is the agent gateway running?",
          timestamp: Date.now(),
          agentId: activeAgent,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const persistAgents = async (agents: Agent[]) => {
    await fetch("/api/agents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agents }),
    });
  };

  const handleAddAgent = async (agent: Agent) => {
    const newAgent: Agent = { ...agent, status: "live", order: customAgents.length };
    const updated = [...customAgents, newAgent];
    setCustomAgents(updated);
    await persistAgents(updated);
  };

  const handleReorderAgents = async (allAgents: Agent[]) => {
    const custom = allAgents.filter((a) => !BUILT_IN_AGENTS.find((b) => b.id === a.id));
    setCustomAgents(custom);
    await persistAgents(custom);
  };

  const handleTogglePin = async (id: string) => {
    const updated = customAgents.map((a) =>
      a.id === id ? { ...a, pinned: !a.pinned } : a
    );
    setCustomAgents(updated);
    await persistAgents(updated);
  };

  const handleRemoveAgent = async (id: string) => {
    const updated = customAgents.filter((a) => a.id !== id);
    setCustomAgents(updated);

    // If the removed agent was active, go back to home
    if (activeAgent === id) {
      setActiveAgent(null);
    }

    // Persist to vault
    await fetch("/api/agents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agents: updated }),
    });
  };

  const agentMessages = messages.filter((m) => m.agentId === activeAgent);
  const currentAgent = allAgents.find((a) => a.id === activeAgent);

  if (!agentsLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-[var(--text-secondary)]">Loading agents...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        agents={allAgents}
        activeAgent={activeAgent}
        onSelectAgent={setActiveAgent}
        onAddAgent={handleAddAgent}
        onRemoveAgent={handleRemoveAgent}
        onReorderAgents={handleReorderAgents}
        onTogglePin={handleTogglePin}
        builtInIds={BUILT_IN_AGENTS.map((a) => a.id)}
      />

      <main className="flex-1 overflow-hidden grid-bg">
        <AnimatePresence mode="wait">
          {!activeAgent ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full overflow-y-auto p-6"
            >
              {/* Header */}
              <div className="mb-8">
                <motion.h1
                  className="text-4xl font-bold mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    Mission Control
                  </span>
                </motion.h1>
                <p className="text-[var(--text-secondary)]">
                  Agent OS — Your Personal AI Operating System
                </p>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Active Agents", value: String(allAgents.length), icon: <Users size={20} />, color: "var(--green)" },
                  { label: "Custom Agents", value: String(customAgents.length), icon: <Zap size={20} />, color: "var(--yellow)" },
                  { label: "Built-in Agents", value: String(BUILT_IN_AGENTS.length), icon: <Bot size={20} />, color: "var(--blue)" },
                  { label: "Vault Entries", value: "—", icon: <Brain size={20} />, color: "var(--accent)" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                    className="glow-border rounded-xl p-4 bg-[var(--bg-card)]"
                  >
                    <div className="flex items-center gap-2 mb-2" style={{ color: stat.color }}>
                      {stat.icon}
                      <span className="text-sm text-[var(--text-secondary)]">{stat.label}</span>
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </motion.div>
                ))}
              </div>

              {/* Built-in Agents by Category */}
              {(() => {
                const categories = [...new Set(BUILT_IN_AGENTS.map(a => a.category || "Main"))];
                const categoryIcons: Record<string, any> = {
                  "Main": Bot,
                  "Content Creation": Zap,
                  "Memory & Brain": Brain,
                  "OSINT & Research": Search,
                  "Skills & Creation": Wrench,
                  "Automation": RefreshCw,
                  "Coding & Development": Code,
                  "AI Workspace": Globe,
                  "Getting Started": Rocket,
                };
                const categoryColors: Record<string, string> = {
                  "Main": "#6c5ce7",
                  "Content Creation": "#ff7417",
                  "Memory & Brain": "#fdcb6e",
                  "OSINT & Research": "#0984e3",
                  "Skills & Creation": "#00b894",
                  "Automation": "#f5c842",
                  "Coding & Development": "#e056fd",
                  "AI Workspace": "#0984e3",
                  "Getting Started": "#ff6b6b",
                };
                return categories.map(cat => {
                  const catAgents = BUILT_IN_AGENTS.filter(a => (a.category || "Main") === cat);
                  const Icon = categoryIcons[cat] || Bot;
                  const color = categoryColors[cat] || "#6c5ce7";
                  return (
                    <div key={cat} className="mb-8">
                      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Icon size={20} style={{ color }} />
                        {cat}
                        <span className="text-xs text-[var(--text-secondary)] font-normal">({catAgents.length})</span>
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {catAgents.map((agent, i) => (
                          <AgentCard
                            key={agent.id}
                            agent={agent}
                            index={i}
                            onClick={() => setActiveAgent(agent.id)}
                          />
                        ))}
                      </div>
                    </div>
                  );
                });
              })()}

              {/* Custom Agents */}
              {customAgents.length > 0 && (
                <>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Zap size={20} className="text-[var(--yellow)]" />
                    Custom Agents
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {customAgents.map((agent, i) => (
                      <AgentCard
                        key={agent.id}
                        agent={agent}
                        index={i}
                        onClick={() => setActiveAgent(agent.id)}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Empty state for custom agents */}
              {customAgents.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border border-dashed border-[var(--border)] rounded-xl p-8 text-center mb-8"
                >
                  <Plus size={32} className="mx-auto mb-3 text-[var(--text-secondary)] opacity-40" />
                  <p className="text-[var(--text-secondary)] text-sm mb-1">No custom agents yet</p>
                  <p className="text-xs text-[var(--text-secondary)] opacity-60">
                    Click "Add Agent" in the sidebar or use the 🏗️ Agent Creator to build one from a URL, repo, PDF, or eBook.
                  </p>
                </motion.div>
              )}

              {/* Quick Actions */}
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Zap size={20} className="text-[var(--yellow)]" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "New Research Task", icon: <Search size={18} />, agent: "osint-specialist", desc: "OSINT, social recon, competitor research" },
                  { label: "Draft Strategy", icon: <Brain size={18} />, agent: "claude", desc: "Planning, analysis, content strategy" },
                  { label: "Route Task", icon: <Shield size={18} />, agent: "openclaw", desc: "Multi-agent orchestration" },
                ].map((action) => (
                  <motion.button
                    key={action.label}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setActiveAgent(action.agent);
                      // Set context-specific initial messages
                      if (action.agent === "osint-specialist") {
                        setInput("I'm your OSINT & Research specialist. I can help with:\n• Social media reconnaissance (Sherlock)\n• GitHub footprint analysis (GITRECON)\n• Advanced search techniques (Google dorking)\n• Competitor research\n\nWhat would you like me to investigate?");
                      } else if (action.agent === "claude") {
                        setInput("I'm your Intelligence Layer. I can help with:\n• Strategy & planning\n• Code execution\n• File analysis\n• Complex reasoning\n\nWhat would you like me to work on?");
                      } else if (action.agent === "openclaw") {
                        setInput("I'm your Gateway Router. I can help with:\n• Multi-agent orchestration\n• Task routing between agents\n• Session management\n• Agent coordination\n\nWhat task should I route?");
                      }
                    }}
                    className="glow-border rounded-xl p-4 bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] transition-colors text-left flex items-center gap-3"
                  >
                    <div className="text-[var(--accent)]">{action.icon}</div>
                    <div className="flex-1">
                      <span className="block">{action.label}</span>
                      <span className="text-xs text-[var(--text-secondary)]">{action.desc}</span>
                    </div>
                    <ChevronRight size={16} className="ml-auto text-[var(--text-secondary)]" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : activeAgent === "agent-creator" ? (
            <motion.div
              key="agent-creator"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col"
            >
              <AgentCreatorPanel
                onBack={() => setActiveAgent(null)}
                onAgentCreated={handleAddAgent}
              />
            </motion.div>
          ) : currentAgent ? (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col"
            >
              <ChatPanel
                agent={currentAgent}
                messages={agentMessages}
                input={input}
                setInput={setInput}
                onSend={sendMessage}
                isListening={isListening}
                isSending={isSending}
                onStartListening={startListening}
                onStopListening={stopListening}
                onBack={() => setActiveAgent(null)}
                messagesEndRef={messagesEndRef}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
    </div>
  );
}
