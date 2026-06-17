#!/bin/bash
# Agent OS Bootstrap Script
# Run this on your VPS: bash <(curl -s URL) or paste the entire script

set -e

PROJECT_DIR="/root/agentos"
echo "=== Agent OS Bootstrap ==="
echo "Installing in: $PROJECT_DIR"

# Create project directory
mkdir -p "$PROJECT_DIR"
cd "$PROJECT_DIR"

# Check for required tools
command -v node >/dev/null 2>&1 || { echo "Node.js not found. Installing..."; apt update && apt install -y nodejs npm; }
command -v docker >/dev/null 2>&1 || { echo "Docker not found. Please install Docker first."; exit 1; }

echo "=== Creating project files ==="

# Create package.json
cat > package.json << 'PKGJSON'
{
  "name": "agentos",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "next": "15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^11.15.0",
    "lucide-react": "^0.468.0"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5",
    "tailwindcss": "^3.4.17",
    "postcss": "^8",
    "autoprefixer": "^10"
  }
}
PKGJSON

# Create next.config.mjs
cat > next.config.mjs << 'NEXTCONFIG'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
};
export default nextConfig;
NEXTCONFIG

# Create tsconfig.json
cat > tsconfig.json << 'TSCONFIG'
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
TSCONFIG

# Create postcss.config.mjs
cat > postcss.config.mjs << 'POSTCSS'
const config = { plugins: { tailwindcss: {}, autoprefixer: {} } };
export default config;
POSTCSS

# Create tailwind.config.ts
cat > tailwind.config.ts << 'TAILWIND'
import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: {} },
  plugins: [],
};
export default config;
TAILWIND

# Create next-env.d.ts
cat > next-env.d.ts << 'NEXTENV'
/// <reference types="next" />
/// <reference types="next/image-types/global" />
NEXTENV

echo "=== Creating source files ==="

# Create directory structure
mkdir -p src/app/api/chat
mkdir -p src/app/api/goals
mkdir -p src/app/api/journal
mkdir -p src/app/goals
mkdir -p src/app/journal
mkdir -p src/app/agents/\[id\]
mkdir -p src/components
mkdir -p src/lib
mkdir -p public

# globals.css
cat > src/app/globals.css << 'CSS'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --bg-card: #1a1a2e;
  --bg-card-hover: #22223a;
  --border: #2a2a4a;
  --text-primary: #e8e8f0;
  --text-secondary: #8888aa;
  --accent: #6c5ce7;
  --green: #00d68f;
  --yellow: #f5c842;
  --red: #ff6b6b;
  --blue: #4dabf7;
}

* { box-sizing: border-box; }

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  margin: 0; padding: 0; min-height: 100vh;
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg-primary); }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

.glow-border {
  border: 1px solid var(--border);
  box-shadow: 0 0 15px rgba(108, 92, 231, 0.1);
}
.glow-border:hover {
  box-shadow: 0 0 25px rgba(108, 92, 231, 0.2);
  border-color: var(--accent);
}

@keyframes pulse-glow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.grid-bg {
  background-image:
    linear-gradient(rgba(108, 92, 231, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(108, 92, 231, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}
CSS

# layout.tsx
cat > src/app/layout.tsx << 'LAYOUT'
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent OS — Mission Control",
  description: "Personal AI Operating System Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
LAYOUT

# StatusBadge component
cat > src/components/StatusBadge.tsx << 'STATUS'
"use client";
import { motion } from "framer-motion";

interface StatusBadgeProps {
  status: "live" | "degraded" | "offline" | "busy";
  size?: "sm" | "md";
}

const statusConfig = {
  live: { label: "LIVE", color: "#00d68f" },
  degraded: { label: "DEGRADED", color: "#f5c842" },
  offline: { label: "OFFLINE", color: "#ff6b6b" },
  busy: { label: "BUSY", color: "#4dabf7" },
};

export default function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1"}`}
      style={{ backgroundColor: `${config.color}15`, color: config.color }}
    >
      <motion.span
        className="rounded-full"
        style={{ width: size === "sm" ? 5 : 6, height: size === "sm" ? 5 : 6, backgroundColor: config.color }}
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ repeat: Infinity, duration: status === "busy" ? 1 : 2 }}
      />
      {config.label}
    </div>
  );
}
STATUS

# AgentCard component
cat > src/components/AgentCard.tsx << 'CARD'
"use client";
import { motion } from "framer-motion";
import StatusBadge from "./StatusBadge";

interface Agent {
  id: string; name: string; role: string; icon: string;
  status: "live" | "degraded" | "offline" | "busy";
  description: string; color: string;
}

interface AgentCardProps { agent: Agent; index: number; onClick: () => void; }

export default function AgentCard({ agent, index, onClick }: AgentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.08 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glow-border rounded-xl p-5 bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] transition-colors cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${agent.color}20` }}>
            {agent.icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{agent.name}</h3>
            <p className="text-sm text-[var(--text-secondary)]">{agent.role}</p>
          </div>
        </div>
        <StatusBadge status={agent.status} />
      </div>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{agent.description}</p>
      <div className="mt-4 flex items-center gap-2 text-xs text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Open chat</span>
        <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
      </div>
    </motion.div>
  );
}
CARD

# Sidebar component
cat > src/components/Sidebar.tsx << 'SIDEBAR'
"use client";
import { motion } from "framer-motion";
import { LayoutDashboard, Target, BookOpen, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import StatusBadge from "./StatusBadge";

interface Agent {
  id: string; name: string; role: string; icon: string;
  status: "live" | "degraded" | "offline" | "busy";
  description: string; color: string;
}

interface SidebarProps {
  agents: Agent[];
  activeAgent: string | null;
  onSelectAgent: (id: string | null) => void;
}

export default function Sidebar({ agents, activeAgent, onSelectAgent }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navItems = [
    { id: null, label: "Mission Control", icon: <LayoutDashboard size={20} /> },
    { id: "goals", label: "Goals", icon: <Target size={20} /> },
    { id: "journal", label: "Journal", icon: <BookOpen size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 260 }}
      transition={{ duration: 0.2 }}
      className="h-screen bg-[var(--bg-secondary)] border-r border-[var(--border)] flex flex-col shrink-0 overflow-hidden"
    >
      <div className="p-4 border-b border-[var(--border)] flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-lg font-bold shrink-0">A</div>
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="font-bold text-sm">Agent OS</div>
            <div className="text-xs text-[var(--text-secondary)]">Mission Control</div>
          </motion.div>
        )}
      </div>
      <nav className="p-2 space-y-1">
        {navItems.map((item) => (
          <button key={item.label} onClick={() => onSelectAgent(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${activeAgent === item.id ? "bg-[var(--accent)]/20 text-[var(--accent)]" : "text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"}`}>
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
      <div className="flex-1 overflow-y-auto p-2">
        {!collapsed && <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider px-3 py-2">Agents</div>}
        <div className="space-y-1">
          {agents.map((agent) => (
            <button key={agent.id} onClick={() => onSelectAgent(agent.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${activeAgent === agent.id ? "bg-[var(--accent)]/20 text-[var(--accent)]" : "text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"}`}>
              <span className="text-lg shrink-0">{agent.icon}</span>
              {!collapsed && (
                <div className="flex-1 text-left min-w-0">
                  <div className="font-medium truncate">{agent.name}</div>
                  <StatusBadge status={agent.status} size="sm" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      <button onClick={() => setCollapsed(!collapsed)} className="p-3 border-t border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </motion.aside>
  );
}
SIDEBAR

# ChatPanel component
cat > src/components/ChatPanel.tsx << 'CHAT'
"use client";
import { motion } from "framer-motion";
import { Mic, MicOff, Send, ArrowLeft, Loader2 } from "lucide-react";
import { RefObject } from "react";

interface Agent {
  id: string; name: string; role: string; icon: string;
  status: string; description: string; color: string;
}

interface ChatMessage {
  id: string; role: "user" | "assistant"; content: string; timestamp: number; agentId: string;
}

interface ChatPanelProps {
  agent: Agent; messages: ChatMessage[]; input: string; setInput: (v: string) => void;
  onSend: () => void; isListening: boolean; isSending: boolean;
  onStartListening: () => void; onStopListening: () => void;
  onBack: () => void; messagesEndRef: RefObject<HTMLDivElement | null>;
}

export default function ChatPanel({ agent, messages, input, setInput, onSend, isListening, isSending, onStartListening, onStopListening, onBack, messagesEndRef }: ChatPanelProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-[var(--border)] bg-[var(--bg-secondary)] flex items-center gap-3">
        <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-[var(--bg-card)] transition-colors text-[var(--text-secondary)]"><ArrowLeft size={18} /></button>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ backgroundColor: `${agent.color}20` }}>{agent.icon}</div>
        <div className="flex-1">
          <div className="font-semibold">{agent.name}</div>
          <div className="text-xs text-[var(--text-secondary)]">{agent.role}</div>
        </div>
        <div className={`text-xs font-medium px-2 py-1 rounded-full bg-[var(--bg-card)] ${agent.status === "live" ? "text-[var(--green)]" : agent.status === "busy" ? "text-[var(--blue)]" : "text-[var(--red)]"}`}>
          {agent.status.toUpperCase()}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-[var(--text-secondary)]">
            <div className="text-4xl mb-3">{agent.icon}</div>
            <p className="text-lg font-medium">Start a conversation with {agent.name}</p>
            <p className="text-sm mt-1">Ask anything — this agent has access to your full context.</p>
          </div>
        )}
        {messages.map((msg) => (
          <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === "user" ? "bg-[var(--accent)] text-white rounded-br-md" : "bg-[var(--bg-card)] border border-[var(--border)] rounded-bl-md"}`}>
              <div className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</div>
              <div className={`text-[10px] mt-1 ${msg.role === "user" ? "text-white/60" : "text-[var(--text-secondary)]"}`}>{new Date(msg.timestamp).toLocaleTimeString()}</div>
            </div>
          </motion.div>
        ))}
        {isSending && (
          <div className="flex justify-start">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
              <Loader2 size={14} className="animate-spin text-[var(--accent)]" />
              <span className="text-sm text-[var(--text-secondary)]">{agent.name} is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="flex items-center gap-2">
          <button onClick={isListening ? onStopListening : onStartListening} className={`p-2.5 rounded-xl transition-colors ${isListening ? "bg-red-500/20 text-red-400 animate-pulse" : "bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && onSend()} placeholder={isListening ? "Listening..." : `Message ${agent.name}...`}
            className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition-colors" />
          <button onClick={onSend} disabled={!input.trim() || isSending} className="p-2.5 rounded-xl bg-[var(--accent)] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--accent)]/80 transition-colors">
            <Send size={18} />
          </button>
        </div>
        {isListening && <div className="mt-2 text-xs text-red-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />Speech recognition active — speak now</div>}
      </div>
    </div>
  );
}
CHAT

# vault.ts lib
cat > src/lib/vault.ts << 'VAULT'
import fs from "fs/promises";
import path from "path";

export const VAULT_PATH = process.env.VAULT_PATH || "/data/agentos-vault";

export async function ensureVault() {
  await fs.mkdir(VAULT_PATH, { recursive: true });
}

export async function readJSON(file: string, fallback: any = []) {
  try {
    const data = await fs.readFile(path.join(VAULT_PATH, file), "utf-8");
    return JSON.parse(data);
  } catch { return fallback; }
}

export async function writeJSON(file: string, data: any) {
  await ensureVault();
  await fs.writeFile(path.join(VAULT_PATH, file), JSON.stringify(data, null, 2));
}
VAULT

# Chat API route
cat > src/app/api/chat/route.ts << 'CHATAPI'
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, agentId, history } = await req.json();
    const systemPrompt = `You are ${agentId === "openclaw" ? "OpenClaw" : agentId === "hermes" ? "Hermes" : "Claude"}, an AI agent in the Agent OS mission control system. You are helpful, concise, and capable. Respond naturally and helpfully.`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...(history || []).map((m: any) => ({ role: m.role, content: m.content })),
      { role: "user", content: message },
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
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
      return NextResponse.json({ response: `API error (${response.status}). Check your OpenRouter key.` }, { status: 200 });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response generated.";
    return NextResponse.json({ response: reply });
  } catch (error: any) {
    return NextResponse.json({ response: `Connection error: ${error.message}` }, { status: 200 });
  }
}
CHATAPI

# Goals API route
cat > src/app/api/goals/route.ts << 'GOALSAPI'
import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/vault";

export async function GET() {
  const goals = await readJSON("goals.json", []);
  return NextResponse.json({ goals });
}

export async function POST(req: NextRequest) {
  const { goals } = await req.json();
  await writeJSON("goals.json", goals);
  return NextResponse.json({ success: true });
}
GOALSAPI

# Journal API route
cat > src/app/api/journal/route.ts << 'JOURNALAPI'
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { VAULT_PATH, ensureVault } from "@/lib/vault";

export async function GET() {
  try {
    await ensureVault();
    const data = await fs.readFile(path.join(VAULT_PATH, "journal", "index.json"), "utf-8");
    return NextResponse.json({ entries: JSON.parse(data) });
  } catch { return NextResponse.json({ entries: [] }); }
}

export async function POST(req: NextRequest) {
  const { entries } = await req.json();
  await ensureVault();
  await fs.mkdir(path.join(VAULT_PATH, "journal"), { recursive: true });
  for (const entry of entries) {
    await fs.writeFile(path.join(VAULT_PATH, "journal", `${entry.date}.md`), `# ${entry.date}\n\n${entry.content}\n`);
  }
  await fs.writeFile(path.join(VAULT_PATH, "journal", "index.json"), JSON.stringify(entries, null, 2));
  return NextResponse.json({ success: true });
}
JOURNALAPI

# Goals page
cat > src/app/goals/page.tsx << 'GOALSPAGE'
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, Trash2, Target } from "lucide-react";

interface Goal { id: string; text: string; completed: boolean; createdAt: number; }

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchGoals(); }, []);

  const fetchGoals = async () => {
    try { const res = await fetch("/api/goals"); const data = await res.json(); setGoals(data.goals || []); } catch { setGoals([]); } finally { setLoading(false); }
  };

  const addGoal = async () => {
    if (!newGoal.trim()) return;
    const updated = [...goals, { id: Date.now().toString(), text: newGoal.trim(), completed: false, createdAt: Date.now() }];
    setGoals(updated); setNewGoal("");
    await fetch("/api/goals", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ goals: updated }) });
  };

  const toggleGoal = async (id: string) => {
    const updated = goals.map((g) => g.id === id ? { ...g, completed: !g.completed } : g);
    setGoals(updated);
    await fetch("/api/goals", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ goals: updated }) });
  };

  const deleteGoal = async (id: string) => {
    const updated = goals.filter((g) => g.id !== id);
    setGoals(updated);
    await fetch("/api/goals", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ goals: updated }) });
  };

  const completedCount = goals.filter((g) => g.completed).length;
  const progress = goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0;

  if (loading) return <div className="h-full flex items-center justify-center"><div className="text-[var(--text-secondary)]">Loading goals...</div></div>;

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3"><Target className="text-[var(--accent)]" size={28} />Goals</h1>
          <p className="text-[var(--text-secondary)]">Track your objectives. Synced to your vault.</p>
        </div>
        {goals.length > 0 && (
          <div className="glow-border rounded-xl p-4 bg-[var(--bg-card)] mb-6">
            <div className="flex justify-between text-sm mb-2"><span className="text-[var(--text-secondary)]">Progress</span><span className="font-semibold">{completedCount}/{goals.length} completed</span></div>
            <div className="h-2 bg-[var(--bg-primary)] rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
            </div>
            <div className="text-right text-xs text-[var(--text-secondary)] mt-1">{progress}%</div>
          </div>
        )}
        <div className="flex gap-2 mb-6">
          <input type="text" value={newGoal} onChange={(e) => setNewGoal(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addGoal()} placeholder="Add a new goal..." className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors" />
          <button onClick={addGoal} disabled={!newGoal.trim()} className="px-4 py-3 rounded-xl bg-[var(--accent)] text-white disabled:opacity-40 hover:bg-[var(--accent)]/80 transition-colors"><Plus size={18} /></button>
        </div>
        <div className="space-y-2">
          <AnimatePresence>
            {goals.length === 0 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 text-[var(--text-secondary)]"><Target size={40} className="mx-auto mb-3 opacity-30" /><p>No goals yet. Add your first one above.</p></motion.div>}
            {goals.map((goal) => (
              <motion.div key={goal.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className={`glow-border rounded-xl p-4 bg-[var(--bg-card)] flex items-center gap-3 group ${goal.completed ? "opacity-60" : ""}`}>
                <button onClick={() => toggleGoal(goal.id)} className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-colors ${goal.completed ? "bg-[var(--green)] border-[var(--green)]" : "border-[var(--border)] hover:border-[var(--accent)]"}`}>
                  {goal.completed && <Check size={14} className="text-white" />}
                </button>
                <span className={`flex-1 text-sm ${goal.completed ? "line-through" : ""}`}>{goal.text}</span>
                <button onClick={() => deleteGoal(goal.id)} className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 text-[var(--text-secondary)] hover:text-red-400 transition-all"><Trash2 size={14} /></button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
GOALSPAGE

# Journal page
cat > src/app/journal/page.tsx << 'JOURNALPAGE'
"use client";
import { useState, useEffect, useRef } from "react";
import { BookOpen, Save, Mic, MicOff, Clock } from "lucide-react";

interface JournalEntry { id: string; date: string; content: string; createdAt: number; }

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentContent, setCurrentContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => { fetchEntries(); }, []);

  const fetchEntries = async () => {
    try { const res = await fetch("/api/journal"); const data = await res.json(); setEntries(data.entries || []); } catch { setEntries([]); }
  };

  const saveEntry = async () => {
    if (!currentContent.trim()) return;
    setSaving(true);
    const existing = entries.find((e) => e.date === today);
    let updated: JournalEntry[];
    if (existing) {
      updated = entries.map((e) => e.date === today ? { ...e, content: currentContent.trim() } : e);
    } else {
      updated = [{ id: Date.now().toString(), date: today, content: currentContent.trim(), createdAt: Date.now() }, ...entries];
    }
    setEntries(updated);
    await fetch("/api/journal", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ entries: updated }) });
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const startListening = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR();
    r.continuous = true; r.interimResults = false; r.lang = "en-US";
    r.onresult = (event: any) => { setCurrentContent((prev) => prev + event.results[event.results.length - 1][0].transcript + " "); };
    r.onend = () => setIsListening(false);
    recognitionRef.current = r; r.start(); setIsListening(true);
  };

  const stopListening = () => { recognitionRef.current?.stop(); setIsListening(false); };

  return (
    <div className="h-full flex overflow-hidden">
      <div className="w-64 border-r border-[var(--border)] bg-[var(--bg-secondary)] overflow-y-auto shrink-0">
        <div className="p-4 border-b border-[var(--border)]"><h2 className="font-semibold text-sm flex items-center gap-2"><Clock size={14} />Past Entries</h2></div>
        <div className="p-2 space-y-1">
          {entries.length === 0 && <div className="text-xs text-[var(--text-secondary)] p-3 text-center">No entries yet</div>}
          {entries.map((entry) => (
            <button key={entry.id} onClick={() => { setCurrentContent(entry.content); textareaRef.current?.focus(); }}
              className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${entry.date === today ? "bg-[var(--accent)]/20 text-[var(--accent)]" : "hover:bg-[var(--bg-card)] text-[var(--text-secondary)]"}`}>
              <div className="font-medium">{entry.date}</div>
              <div className="text-xs truncate mt-0.5 opacity-60">{entry.content.substring(0, 50)}...</div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
          <div><h1 className="text-xl font-bold flex items-center gap-2"><BookOpen size={20} className="text-[var(--accent)]" />Daily Journal</h1><p className="text-xs text-[var(--text-secondary)] mt-0.5">{today}</p></div>
          <div className="flex items-center gap-2">
            <button onClick={isListening ? stopListening : startListening} className={`p-2 rounded-lg transition-colors ${isListening ? "bg-red-500/20 text-red-400" : "bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>{isListening ? <MicOff size={16} /> : <Mic size={16} /></button>
            <button onClick={saveEntry} disabled={!currentContent.trim() || saving} className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium disabled:opacity-40 hover:bg-[var(--accent)]/80 transition-colors flex items-center gap-2">
              {saving ? "Saving..." : saved ? <><Save size={14} /> Saved!</> : <><Save size={14} /> Save</>}
            </button>
          </div>
        </div>
        <div className="flex-1 p-4 overflow-hidden">
          <textarea ref={textareaRef} value={currentContent} onChange={(e) => setCurrentContent(e.target.value)} placeholder="Write about your day, thoughts, ideas, wins, challenges..." className="w-full h-full bg-transparent text-[var(--text-primary)] text-sm leading-relaxed resize-none focus:outline-none placeholder-[var(--text-secondary)]" />
        </div>
        {isListening && <div className="px-4 py-2 border-t border-[var(--border)] bg-[var(--bg-secondary)] text-xs text-red-400 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />Voice recording active</div>}
      </div>
    </div>
  );
}
JOURNALPAGE

# Agent detail page
cat > src/app/agents/[id]/page.tsx << 'AGENTPAGE'
"use client";
import { useParams } from "next/navigation";
export default function AgentPage() {
  const params = useParams();
  return (
    <div className="h-full flex items-center justify-center text-[var(--text-secondary)]">
      <div className="text-center"><p className="text-lg">Agent: {params.id as string}</p><p className="text-sm mt-2">Per-agent detail page — coming soon</p></div>
    </div>
  );
}
AGENTPAGE

# Main page (Mission Control)
cat > src/app/page.tsx << 'MAINPAGE'
"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Bot, Target, BookOpen, Settings, Mic, MicOff, Send, ChevronRight, Activity, Zap, Brain, Search, Shield, Plus, Check, X, MessageSquare, Clock, BarChart3, Users } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import AgentCard from "@/components/AgentCard";
import ChatPanel from "@/components/ChatPanel";

interface Agent {
  id: string; name: string; role: string; icon: string;
  status: "live" | "degraded" | "offline" | "busy";
  description: string; color: string;
}

const AGENTS: Agent[] = [
  { id: "openclaw", name: "OpenClaw", role: "Gateway Router", icon: "🦀", status: "live", description: "Multi-agent gateway & session router. Routes tasks between agents, manages sessions.", color: "#6c5ce7" },
  { id: "hermes", name: "Hermes", role: "Research & Execution", icon: "⚡", status: "live", description: "Tool calls, Kanban tasks, skills, competitor research, scheduled workflows.", color: "#f5c842" },
  { id: "claude", name: "Claude", role: "Intelligence Layer", icon: "🧠", status: "live", description: "Thinking layer — strategy, planning, code execution, file analysis.", color: "#ff6b6b" },
];

interface ChatMessage {
  id: string; role: "user" | "assistant"; content: string; timestamp: number; agentId: string;
}

export default function Home() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); };
  useEffect(() => { scrollToBottom(); }, [messages]);

  const startListening = useCallback(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR(); r.continuous = false; r.interimResults = false; r.lang = "en-US";
    r.onresult = (event: any) => { setInput((prev) => prev + event.results[0][0].transcript); };
    r.onend = () => setIsListening(false);
    recognitionRef.current = r; r.start(); setIsListening(true);
  }, []);

  const stopListening = useCallback(() => { recognitionRef.current?.stop(); setIsListening(false); }, []);

  const sendMessage = async () => {
    if (!input.trim() || !activeAgent || isSending) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", content: input.trim(), timestamp: Date.now(), agentId: activeAgent };
    setMessages((prev) => [...prev, userMsg]); setInput(""); setIsSending(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: userMsg.content, agentId: activeAgent, history: messages.slice(-10) }) });
      const data = await res.json();
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: data.response || "No response received.", timestamp: Date.now(), agentId: activeAgent }]);
    } catch {
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: "⚠️ Connection error. Is the agent gateway running?", timestamp: Date.now(), agentId: activeAgent }]);
    } finally { setIsSending(false); }
  };

  const agentMessages = messages.filter((m) => m.agentId === activeAgent);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar agents={AGENTS} activeAgent={activeAgent} onSelectAgent={setActiveAgent} />
      <main className="flex-1 overflow-hidden grid-bg">
        <AnimatePresence mode="wait">
          {!activeAgent ? (
            <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="h-full overflow-y-auto p-6">
              <div className="mb-8">
                <motion.h1 className="text-4xl font-bold mb-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Mission Control</span>
                </motion.h1>
                <p className="text-[var(--text-secondary)]">Agent OS — Your Personal AI Operating System</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Active Agents", value: "3", icon: <Users size={20} />, color: "#00d68f" },
                  { label: "Sessions Today", value: "—", icon: <Activity size={20} />, color: "#4dabf7" },
                  { label: "Tasks Completed", value: "—", icon: <Zap size={20} />, color: "#f5c842" },
                  { label: "Vault Entries", value: "—", icon: <Brain size={20} />, color: "#6c5ce7" },
                ].map((stat, i) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }} className="glow-border rounded-xl p-4 bg-[var(--bg-card)]">
                    <div className="flex items-center gap-2 mb-2" style={{ color: stat.color }}>{stat.icon}<span className="text-sm text-[var(--text-secondary)]">{stat.label}</span></div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </motion.div>
                ))}
              </div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Bot size={20} className="text-[var(--accent)]" />AI Agents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {AGENTS.map((agent, i) => <AgentCard key={agent.id} agent={agent} index={i} onClick={() => setActiveAgent(agent.id)} />)}
              </div>
              <h2 className="text-xl font-semibold mt-8 mb-4 flex items-center gap-2"><Zap size={20} className="text-[var(--yellow)]" />Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "New Research Task", icon: <Search size={18} />, agent: "hermes" },
                  { label: "Draft Strategy", icon: <Brain size={18} />, agent: "claude" },
                  { label: "Route Task", icon: <Shield size={18} />, agent: "openclaw" },
                ].map((action) => (
                  <motion.button key={action.label} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setActiveAgent(action.agent)} className="glow-border rounded-xl p-4 bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] transition-colors text-left flex items-center gap-3">
                    <div className="text-[var(--accent)]">{action.icon}</div><span>{action.label}</span><ChevronRight size={16} className="ml-auto text-[var(--text-secondary)]" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="h-full flex flex-col">
              <ChatPanel agent={AGENTS.find((a) => a.id === activeAgent)!} messages={agentMessages} input={input} setInput={setInput} onSend={sendMessage} isListening={isListening} isSending={isSending} onStartListening={startListening} onStopListening={stopListening} onBack={() => setActiveAgent(null)} messagesEndRef={messagesEndRef} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
MAINPAGE

# Dockerfile
cat > Dockerfile << 'DOCKERFILE'
FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --only=production 2>/dev/null || npm install
COPY . .
RUN npm run build
EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000
CMD ["npm", "start"]
DOCKERFILE

# docker-compose.yml
cat > docker-compose.yml << 'COMPOSE'
services:
  agent-os:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: agent-os
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - VAULT_PATH=/data/agentos-vault
      - NEXT_PUBLIC_APP_URL=http://31.220.62.81:3000
    volumes:
      - agentos-vault:/data/agentos-vault

volumes:
  agentos-vault:
COMPOSE

# .env.example
cat > .env.example << 'ENV'
OPENROUTER_API_KEY=sk-or-your-key-here
ENV

echo "=== All files created ==="
echo ""
echo "Next steps:"
echo "1. Create .env file with your OpenRouter API key:"
echo "   echo 'OPENROUTER_API_KEY=sk-or-your-key' > .env"
echo ""
echo "2. Build and start:"
echo "   docker compose up -d --build"
echo ""
echo "3. Check status:"
echo "   docker compose ps"
echo "   docker compose logs -f"
echo ""
echo "4. Access dashboard at: http://31.220.62.81:3000"
