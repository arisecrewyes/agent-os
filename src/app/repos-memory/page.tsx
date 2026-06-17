"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard, Target, BookOpen, Settings, Brain, Zap, Rocket,
  Database, Bot, FileText, Check, ChevronRight, ChevronDown,
  CheckCircle2, AlertCircle, Clock, Layers, RefreshCw, ArrowRight,
  Shield, Wrench, Star, Globe, Cpu, Users, Heart, Monitor, Code,
  Terminal, ExternalLink, Search, Server, FileSearch, Video
} from "lucide-react";

function PageNav() {
  const items = [
    { label: "Mission Control", icon: <LayoutDashboard size={14} />, href: "/" },
    { label: "Getting Started", icon: <Rocket size={14} />, href: "/getting-started" },
    { label: "Memory Engine", icon: <Brain size={14} />, href: "/memory-system" },
    { label: "Infinite Context", icon: <Database size={14} />, href: "/infinite-context" },
    { label: "Second Brain", icon: <Heart size={14} />, href: "/second-brain" },
    { label: "Goldie Stack", icon: <Layers size={14} />, href: "/goldie-stack" },
    { label: "Conductor", icon: <Users size={14} />, href: "/conductor-stack" },
    { label: "MiniMax M3", icon: <Cpu size={14} />, href: "/minimax-hermes" },
    { label: "Odysseus", icon: <Globe size={14} />, href: "/odysseus" },
    { label: "Hermes vs Odysseus", icon: <Monitor size={14} />, href: "/hermes-vs-odysseus" },
    { label: "Hermes Voice", icon: <FileSearch size={14} />, href: "/hermes-voice" },
    { label: "Bolt DIY", icon: <Code size={14} />, href: "/bolt-diy" },
    { label: "Automation", icon: <Zap size={14} />, href: "/automation" },
    { label: "Content Repos", icon: <Video size={14} />, href: "/repos-content" },
    { label: "Memory Repos", icon: <Brain size={14} />, href: "/repos-memory" },
    { label: "Skills Repos", icon: <Wrench size={14} />, href: "/repos-skills" },
    { label: "Goals", icon: <Target size={14} />, href: "/goals" },
    { label: "Journal", icon: <BookOpen size={14} />, href: "/journal" },
    { label: "Settings", icon: <Settings size={14} />, href: "/settings" },
  ];
  return (
    <div className="flex items-center gap-1 mb-6 flex-wrap">
      {items.map((item) => (
        <Link key={item.href} href={item.href}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] transition-colors"
        >
          {item.icon}<span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
}

const REPOS = [
  { name: "memanto", url: "https://github.com/moorcheh-ai/memanto", about: "Memory that AI Agents Love! Persistent, intelligent memory system designed for AI agents.", tags: ["memory", "ai-agents", "persistent"], appUrl: "https://memanto.ai" },
  { name: "quant-mind", url: "https://github.com/LLMQuant/quant-mind", about: "QuantMind is an intelligent knowledge extraction and retrieval framework for quantitative finance.", tags: ["knowledge", "extraction", "finance", "retrieval"], appUrl: "https://llmquantdata.com/" },
  { name: "turbovec", url: "https://github.com/RyanCodrai/turbovec", about: "A vector index built on TurboQuant, written in Rust with Python bindings. High-performance vector search.", tags: ["vector", "search", "rust", "python"], appUrl: "https://pypi.org/project/turbovec/" },
  { name: "Odysseus", url: "https://github.com/pewdiepie-archdaemon/odysseus", about: "Self-hosted AI workspace. Chat, research agent, email helper, notes, calendar, memory \u2014 all in one tidy place.", tags: ["ai-workspace", "self-hosted", "memory", "agent"], appUrl: "https://pewdiepie-archdaemon.github.io/odysseus/" },
  { name: "Pake", url: "https://github.com/tw93/Pake", about: "Turn any webpage into a desktop app with one command.", tags: ["desktop", "web", "app", "tauri"] },
  { name: "GITRECON", url: "https://github.com/techenthusiast167/GITRECON", about: "A powerful Python-based OSINT tool for comprehensive GitHub reconnaissance, security assessment, and digital footprint analysis.", tags: ["osint", "github", "security", "recon"] },
  { name: "alook", url: "https://github.com/alookai/alook", about: "The collaboration layer for your AI workforce. Run a team of AI agents that coordinate over email, share memory, and get better with every task.", tags: ["collaboration", "agents", "email", "memory"], appUrl: "https://alook.ai" },
  { name: "google-dorking", url: "https://github.com/commit-issues/google-dorking", about: "Dorking: how to find what Google easily showing you (plus Shodan, Yandex, Tor, and more).", tags: ["osint", "google", "search", "dorking"] },
  { name: "open-code-review", url: "https://github.com/alibaba/open-code-review", about: "Open-source & free \u2014 Battle-tested at Alibaba scale. Hybrid architecture code review tool: deterministic pipelines + LLM Agent, precise line-level comments, built-in fine-tuned ruleset.", tags: ["code-review", "llm", "alibaba", "security"], appUrl: "https://alibaba.github.io/open-code-review/" },
  { name: "project-nomad", url: "https://github.com/Crosstalk-Solutions/project-nomad", about: "Project N.O.M.A.D, is a self-contained, offline survival computer packed with critical tools, knowledge, and AI to keep you informed and empowered\u2014anytime, anywhere.", tags: ["offline", "survival", "ai", "self-contained"] },
  { name: "deer-flow", url: "https://github.com/bytedance/deer-flow", about: "An open-source long-horizon SuperAgent harness that researches, codes, and creates. With sandboxes, memories, tools, skill, subagents and message gateway.", tags: ["superagent", "research", "coding", "bytedance"], appUrl: "https://deerflow.tech" },
];

const TAG_COLORS: Record<string, string> = {
  "memory": "#6c5ce7", "ai-agents": "#0984e3", "persistent": "#00b894",
  "knowledge": "#e056fd", "extraction": "#fdcb6e", "finance": "#e17055", "retrieval": "#6c5ce7",
  "vector": "#0984e3", "search": "#00b894", "rust": "#e056fd", "python": "#fdcb6e",
  "ai-workspace": "#6c5ce7", "self-hosted": "#0984e3", "agent": "#00b894",
  "desktop": "#e17055", "web": "#fdcb6e", "app": "#6c5ce7", "tauri": "#0984e3",
  "osint": "#e056fd", "github": "#fdcb6e", "security": "#6c5ce7", "recon": "#0984e3",
  "collaboration": "#00b894", "email": "#e056fd",
  "google": "#fdcb6e", "dorking": "#6c5ce7",
  "code-review": "#0984e3", "llm": "#00b894", "alibaba": "#e056fd",
  "offline": "#fdcb6e", "survival": "#6c5ce7", "self-contained": "#0984e3",
  "superagent": "#e056fd", "research": "#fdcb6e", "coding": "#6c5ce7", "bytedance": "#0984e3",
};

export default function ReposMemoryPage() {
  const [filter, setFilter] = useState<string | null>(null);
  const allTags = [...new Set(REPOS.flatMap(r => r.tags))].sort();
  const filtered = filter ? REPOS.filter(r => r.tags.includes(filter)) : REPOS;

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto p-6">
        <PageNav />
        <div className="mb-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium mb-4">
            <Brain size={14} /> GitHub Repos \u2014 Memory & Brain
          </motion.div>
          <h1 className="text-3xl font-bold mb-3">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">Memory & Brain Repositories</span>
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">Open-source tools for improving memory, knowledge extraction, vector search, agent collaboration, and brain-like capabilities for the Agent OS Dashboard.</p>
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-sm font-medium text-[var(--text-secondary)]">Filter:</span>
            <button onClick={() => setFilter(null)} className={`text-xs px-2 py-1 rounded-lg transition-colors ${!filter ? "bg-[var(--accent)] text-white" : "bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]"}`}>All ({REPOS.length})</button>
            {allTags.map(tag => (
              <button key={tag} onClick={() => setFilter(filter === tag ? null : tag)} className={`text-xs px-2 py-1 rounded-lg transition-colors ${filter === tag ? "bg-[var(--accent)] text-white" : "bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]"}`}>{tag}</button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {filtered.map((repo) => (
            <div key={repo.name} className="glow-border rounded-xl bg-[var(--bg-card)] p-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[var(--accent)]/10 text-[var(--accent)]"><Brain size={20} /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-bold text-sm">{repo.name}</h3>
                    <div className="flex gap-1 flex-wrap">
                      {repo.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: `${TAG_COLORS[tag] || "#6c5ce7"}20`, color: TAG_COLORS[tag] || "#6c5ce7" }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">{repo.about}</p>
                  <div className="flex gap-2">
                    <a href={repo.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1"><ExternalLink size={10} /> GitHub</a>
                    {repo.appUrl && <a href={repo.appUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1"><ExternalLink size={10} /> App/Demo</a>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
