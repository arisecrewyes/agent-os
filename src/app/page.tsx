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
import StatusBadge from "@/components/StatusBadge";

interface Agent {
  id: string;
  name: string;
  role: string;
  icon: string;
  status: "live" | "degraded" | "offline" | "busy";
  description: string;
  color: string;
}

const AGENTS: Agent[] = [
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
  const pathname = usePathname();

  // Reset active agent when navigating to a different page
  useEffect(() => {
    if (pathname !== "/") {
      setActiveAgent(null);
    }
  }, [pathname]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const agentMessages = messages.filter((m) => m.agentId === activeAgent);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        agents={AGENTS}
        activeAgent={activeAgent}
        onSelectAgent={setActiveAgent}
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
                  { label: "Active Agents", value: "3", icon: <Users size={20} />, color: "var(--green)" },
                  { label: "Sessions Today", value: "—", icon: <Activity size={20} />, color: "var(--blue)" },
                  { label: "Tasks Completed", value: "—", icon: <Zap size={20} />, color: "var(--yellow)" },
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

              {/* Agent Cards */}
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Bot size={20} className="text-[var(--accent)]" />
                AI Agents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {AGENTS.map((agent, i) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    index={i}
                    onClick={() => setActiveAgent(agent.id)}
                  />
                ))}
              </div>

              {/* Quick Actions */}
              <h2 className="text-xl font-semibold mt-8 mb-4 flex items-center gap-2">
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
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col"
            >
              <ChatPanel
                agent={AGENTS.find((a) => a.id === activeAgent)!}
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
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
