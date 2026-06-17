"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Bot, Target, BookOpen, Settings,
  Mic, MicOff, Send, ChevronRight, Activity,
  Zap, Brain, Search, Shield, Plus, Check, X,
  MessageSquare, Clock, BarChart3, Users
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
}

const BUILT_IN_AGENTS: Agent[] = [
  {
    id: "agent-creator",
    name: "Agent Creator",
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

              {/* Built-in Agents */}
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Bot size={20} className="text-[var(--accent)]" />
                Core Agents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {BUILT_IN_AGENTS.map((agent, i) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    index={i}
                    onClick={() => setActiveAgent(agent.id)}
                  />
                ))}
              </div>

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
                  { label: "New Research Task", icon: <Search size={18} />, agent: "hermes" },
                  { label: "Draft Strategy", icon: <Brain size={18} />, agent: "claude" },
                  { label: "Route Task", icon: <Shield size={18} />, agent: "openclaw" },
                ].map((action) => (
                  <motion.button
                    key={action.label}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveAgent(action.agent)}
                    className="glow-border rounded-xl p-4 bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] transition-colors text-left flex items-center gap-3"
                  >
                    <div className="text-[var(--accent)]">{action.icon}</div>
                    <span>{action.label}</span>
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
