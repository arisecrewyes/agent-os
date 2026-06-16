"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard, Target, BookOpen, Settings, Brain, Zap, Rocket,
  Mic, FolderOpen, Bot, Check, ChevronRight, ChevronDown, Copy,
  CheckCircle2, AlertCircle, Clock, Layers, RefreshCw, ArrowRight,
  ExternalLink, Database, Eye, Sparkles, Shield, Play, TrendingUp,
  FileText, Users, Wrench, BookMarked, Lightbulb, Heart, Star, XCircle
} from "lucide-react";

/* ─── Page Nav ─── */
function PageNav() {
  const items = [
    { label: "Mission Control", icon: <LayoutDashboard size={14} />, href: "/" },
    { label: "Getting Started", icon: <Rocket size={14} />, href: "/getting-started" },
    { label: "Memory Engine", icon: <Brain size={14} />, href: "/memory-system" },
    { label: "Goldie Stack", icon: <Layers size={14} />, href: "/goldie-stack" },
    { label: "Automation", icon: <Zap size={14} />, href: "/automation" },
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

/* ─── 30-Day Roadmap Data ─── */
const ROADMAP = [
  {
    week: 1, title: "Foundation", color: "#6c5ce7",
    days: [
      "Download Obsidian. Create vault 'Second Brain.' Ask Claude to build PARA folder structure.",
      "Drop everything you know into the vault — emails, client notes, goals, projects. Ask Claude to organise into PARA.",
      "Install OMI. Let it capture your day. Export memories to Obsidian. Ask Claude to clean into structured daily log.",
      "Wire Claude to vault — Option A: paste context manually. Option B: install Obsidian MCP later.",
      "Set up graph view colour coding: People=Blue, Tools=Orange, Projects=Green, Archive=Red.",
      "Build personal context document: 20 questions about your business. Save as 'About Me.'",
      "First full automated daily note: OMI capture → Claude clean → Obsidian save. Zero manual work.",
    ],
  },
  {
    week: 2, title: "Automate", color: "#0984e3",
    days: [
      "Build project tracking system with template (goal, deadline, status, next action, linked notes).",
      "Build tool library — one note per tool with usage, prompts, alternatives, limitations.",
      "Build prompt library inside Obsidian — 20 high-value prompts personalised to your business.",
      "Automate weekly review: paste daily notes → Claude summarises wins, problems, lessons.",
      "Build people vault — contact template with role, preferences, last conversation, action items.",
      "Build SOP library — 10 most important SOPs. Build first three today.",
      "First full vault review: graph view audit. Ask Claude what's missing, what to connect.",
    ],
  },
  {
    week: 3, title: "Scale", color: "#00b894",
    days: [
      "Wire vault into every AI agent — paste About Me + project notes at start of every session.",
      "Build automated content idea system: 30 ideas based on your business, audience, projects.",
      "Build decision log template: date, decision, why, alternatives, expected outcome, 30-day review.",
      "Build constraint tracker — identify main constraint, log daily attacks, track resolution.",
      "Build automated morning briefing: 30 seconds of prompting → 100 minutes of clarity.",
      "Build client delivery system — client folders with onboarding, projects, communication, deliverables.",
      "Mid-point vault audit: 3 weeks in. Patterns, connections, isolation. Implement top 5 fixes.",
    ],
  },
  {
    week: 4, title: "Systematise", color: "#e056fd",
    days: [
      "Build automated vault maintenance: 10 min Sunday. OMI export → weekly review → archive.",
      "Plug vault into NotebookLM — upload notes as sources, have conversations with your brain.",
      "Build agent operating system — map which tasks go to which agent, which context each loads.",
      "Build knowledge compounding system — every article/video/conversation → extracted insights in vault.",
      "Build testimonial and win tracker — log every win, what led to it, replicability.",
      "Build audience intelligence layer — fears, goals, questions, beliefs, what they want to hear.",
      "Create compounding agent network — full agent OS blueprint. Document it. Implement it.",
      "Teach your vault — write 'Read Me First' for any new agent or team member.",
      "Run full second brain review. Ask Claude: highest leverage thing to build next?",
    ],
  },
];

/* ─── Limiting Beliefs ─── */
const BELIEFS = [
  { wrong: "AI gives generic answers and it's not that useful for my specific situation.", right: "AI quality is a direct function of context quality. Give your AI a second brain and it becomes a different category of tool.", icon: <Sparkles size={16} />, color: "#6c5ce7" },
  { wrong: "Setting up a second brain system is too complicated for me.", right: "Obsidian is folders and text files. OMI runs in background. Claude organises everything. Most technically difficult part: downloading two apps.", icon: <FolderOpen size={16} />, color: "#0984e3" },
  { wrong: "I don't have enough notes or content to make this worth it.", right: "You have more than you think. Emails, Slack, voice memos, SOPs in your head. OMI captures everything from day one. Even 10 well-written notes transforms Claude.", icon: <FileText size={16} />, color: "#00b894" },
  { wrong: "My AI memory will improve on its own so I don't need this.", right: "Even if Claude's memory improves, it's siloed to Claude. Obsidian belongs to you — every agent can read it. No platform can take it away.", icon: <Database size={16} />, color: "#e056fd" },
  { wrong: "I don't have time to maintain a second brain every day.", right: "OMI writes notes. Claude organises them. You just work. Maintenance: 10 minutes on Sunday. That's it.", icon: <Clock size={16} />, color: "#fdcb6e" },
  { wrong: "I'm not technical enough for this.", right: "You don't need to touch a single line of code. Obsidian is drag-and-drop. OMI is a mobile app. Claude reads text files. If you can organise a folder, you can build this.", icon: <Shield size={16} />, color: "#e17055" },
  { wrong: "This won't actually change how my AI performs.", right: "The difference is not incremental — it's categorical. Without context: smart stranger. With context: smart colleague who's worked with you for 6 months.", icon: <TrendingUp size={16} />, color: "#6c5ce7" },
  { wrong: "I'll lose everything if the app changes or shuts down.", right: "Obsidian stores everything as plain text files on your computer. Not on a server. If Obsidian disappeared tomorrow, all your files still exist. Plain text outlasts every platform.", icon: <CheckCircle2 size={16} />, color: "#00b894" },
];

/* ─── Old vs New ─── */
const OLD_VS_NEW = [
  { old: "Opening a new chat and retyping your whole situation every time", new: "Every AI conversation starts with full context loaded automatically" },
  { old: "Getting generic AI answers that could apply to anyone", new: "Answers specific to your business, your projects, your life" },
  { old: "AI doesn't know your clients, projects, goals", new: "One universal memory layer that every agent reads from" },
  { old: "Switching from Claude to Gemini to Hermes and losing all context", new: "Switch between any agent — same brain powers all of them" },
  { old: "Spending first 5 minutes of every session catching your AI up", new: "OMI captures your day while you work so nothing is lost" },
  { old: "Notes scattered across 7 different apps with no connection", new: "A beautiful interconnected knowledge graph that grows every day" },
  { old: "Great ideas lost because there's no system to capture them", new: "A second brain that compounds — the more you use it, the smarter it gets" },
  { old: "AI agents only as useful as your last prompt", new: "AI agents that understand you better after every single conversation" },
];

/* ─── Prompt Categories ─── */
const PROMPT_CATEGORIES = [
  { id: "vault", label: "Vault Setup", icon: <FolderOpen size={14} />, count: 10 },
  { id: "daily", label: "Daily Workflow", icon: <Clock size={14} />, count: 10 },
  { id: "content", label: "Content Creation", icon: <Sparkles size={14} />, count: 10 },
  { id: "agent", label: "Agent Operating System", icon: <Bot size={14} />, count: 10 },
  { id: "strategy", label: "Business Strategy", icon: <TrendingUp size={14} />, count: 10 },
  { id: "learning", label: "Knowledge & Learning", icon: <BookMarked size={14} />, count: 10 },
  { id: "productivity", label: "Productivity & Focus", icon: <Zap size={14} />, count: 10 },
  { id: "team", label: "Team & Clients", icon: <Users size={14} />, count: 10 },
  { id: "research", label: "Research & Analysis", icon: <Eye size={14} />, count: 10 },
  { id: "growth", label: "Growth & Scale", icon: <Rocket size={14} />, count: 10 },
  { id: "bonus", label: "Bonus Prompts", icon: <Star size={14} />, count: 10 },
];

/* ─── Main Component ─── */
export default function InfiniteContextPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "tools" | "para" | "loop" | "roadmap" | "prompts" | "beliefs" | "comparison">("overview");
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);
  const [selectedPromptCat, setSelectedPromptCat] = useState<string | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: <Brain size={16} /> },
    { id: "tools" as const, label: "3-Tool Stack", icon: <Layers size={16} /> },
    { id: "para" as const, label: "PARA Structure", icon: <FolderOpen size={16} /> },
    { id: "loop" as const, label: "Two-Way Loop", icon: <RefreshCw size={16} /> },
    { id: "roadmap" as const, label: "30-Day Plan", icon: <Clock size={16} /> },
    { id: "prompts" as const, label: "110+ Prompts", icon: <Sparkles size={16} /> },
    { id: "beliefs" as const, label: "Beliefs", icon: <Shield size={16} /> },
    { id: "comparison" as const, label: "Old vs New", icon: <ArrowRight size={16} /> },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto p-6">
        <PageNav />

        {/* Hero */}
        <div className="mb-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--green)]/10 text-[var(--green)] text-sm font-medium mb-4"
          >
            <Brain size={14} /> The Infinite Context Engine
          </motion.div>
          <h1 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
              Claude + Obsidian + OMI
            </span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-2">
            The AI Second Brain System That Makes Every Agent 100X Smarter
          </p>
          <p className="text-sm text-[var(--text-secondary)] italic max-w-xl mx-auto">
            &quot;Every AI agent you use is flying blind right now. Not because the model is weak — because it has no context. Today we fix that. For free.&quot;
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-[var(--bg-secondary)] rounded-xl p-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id ? "bg-[var(--accent)] text-white" : "text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
              }`}
            >
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ─── OVERVIEW TAB ─── */}
          {activeTab === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              {/* The Problem */}
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle size={18} className="text-red-400" />
                  The Problem: Every AI Agent Starts From Zero
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  Every time you open a new chat, your AI has <strong>no memory</strong>. It doesn&apos;t know your business, your goals, what you worked on yesterday, or the decisions you made last week. So it gives you <strong>generic answers</strong> — answers that could have been written for anyone on the planet.
                </p>
                <div className="bg-[var(--bg-primary)] rounded-lg p-4 border-l-4 border-[var(--accent)]">
                  <p className="text-sm font-medium italic">
                    &quot;Imagine hiring the smartest employee in the world — but every morning they have complete amnesia. You spend the first 30 minutes of every meeting just catching them up. That&apos;s exactly what you&apos;re doing with AI right now.&quot;
                  </p>
                </div>
              </div>

              {/* The Solution */}
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-[var(--green)]" />
                  The Solution: Three Free Tools Working Together
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: "OMI", role: "The Listener", icon: <Mic size={20} />, color: "#6c5ce7", desc: "Runs in the background. Listens to your day. Takes notes automatically. You don't do anything manually." },
                    { name: "Obsidian", role: "The Brain", icon: <FolderOpen size={20} />, color: "#0984e3", desc: "Stores everything as markdown files. Builds a knowledge graph. Every AI agent speaks markdown natively." },
                    { name: "Claude", role: "The Reader & Organiser", icon: <Bot size={20} />, color: "#00b894", desc: "Reads your vault before answering. Writes useful notes back. The vault grows smarter every day." },
                  ].map((tool) => (
                    <div key={tool.name} className="bg-[var(--bg-primary)] rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${tool.color}20`, color: tool.color }}>
                          {tool.icon}
                        </div>
                        <div>
                          <div className="font-bold text-sm">{tool.name}</div>
                          <div className="text-xs text-[var(--text-secondary)]">{tool.role}</div>
                        </div>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)]">{tool.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h2 className="text-lg font-semibold mb-3">What You&apos;ll Build</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Why every AI agent is only working at 10% power",
                    "The three free tools that fix this completely",
                    "A second brain that gets smarter every day automatically",
                    "How to wire this into every AI tool you already use",
                    "PARA structure for clean vault organisation",
                    "A two-way loop: vault feeds Claude, Claude improves vault",
                    "110+ prompts for every area of your business",
                    "A 30-day rollout plan — foundation to full system",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <CheckCircle2 size={14} className="text-[var(--green)] shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* The Story */}
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Heart size={18} className="text-[var(--pink)]" />
                  The Fighter With The Notebook
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                  There was a fighter who trained for years. Knew every technique. Showed up every day. But every time a new opponent appeared, he started from zero. Couldn&apos;t remember what worked last time. Couldn&apos;t remember what got him caught.
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                  One day his trainer pulled out a notebook. Every fight. Every technique that worked. Every mistake. Every opponent&apos;s pattern. The fighter read it before every session. Added to it after every fight.
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                  Within 6 months he wasn&apos;t just technically better — he was <strong>strategically</strong> better. He wasn&apos;t relearning. He was <strong>compounding</strong>.
                </p>
                <div className="bg-[var(--bg-primary)] rounded-lg p-4 border-l-4 border-[var(--accent)]">
                  <p className="text-sm font-medium italic">
                    &quot;The notebook has always been more powerful than the fighter. The question is whether you are keeping yours.&quot;
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── 3-TOOL STACK TAB ─── */}
          {activeTab === "tools" && (
            <motion.div key="tools" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              {[
                {
                  name: "OMI", url: "https://www.omi.me", color: "#6c5ce7", icon: <Mic size={24} />,
                  tagline: "The Capture Layer — Listens to your day. Takes notes automatically.",
                  what: "OMI is a free open-source app that runs in the background while you work. It listens, captures what you're doing every few minutes, and creates automatic notes on your conversations, decisions, and tasks.",
                  features: ["Screen recording", "Voice note logging", "Automatic task summaries", "Zero manual work — just run it"],
                  key: "You don't do anything manually. OMI watches your day so you don't have to write anything down.",
                },
                {
                  name: "Obsidian", url: "https://obsidian.md", color: "#0984e3", icon: <FolderOpen size={24} />,
                  tagline: "The Storage Layer — Organises everything into a beautiful knowledge vault.",
                  what: "Obsidian is a free note-taking app. But calling it a note-taking app is like calling a Ferrari a car. It stores everything as simple markdown files on your computer. When you link those files together, it builds a knowledge graph — a visual map of everything you know.",
                  features: ["Stores as plain markdown files", "Builds knowledge graph automatically", "Every AI agent reads markdown natively", "Universal memory layer for all agents"],
                  key: "Your Obsidian vault becomes a universal memory layer. Not just for Claude — for every single agent you ever use.",
                },
                {
                  name: "Claude", url: "https://claude.ai", color: "#00b894", icon: <Bot size={24} />,
                  tagline: "The Reader & Organiser — Reads the vault. Improves the vault. Powers every answer.",
                  what: "Claude does two things in this system: (1) It reads your vault before answering — pulling in your actual notes, projects, and context. (2) It organises your vault — after every conversation, it writes useful notes back. Decisions made. Action items. New resources.",
                  features: ["Reads vault before answering", "Writes notes back to vault", "Improves vault every conversation", "Powers every answer with real context"],
                  key: "The vault doesn't just stay the same. It grows. It improves. Every single day. Automatically.",
                },
              ].map((tool) => (
                <div key={tool.name} className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${tool.color}20`, color: tool.color }}>
                      {tool.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{tool.name}</h3>
                      <p className="text-sm" style={{ color: tool.color }}>{tool.tagline}</p>
                    </div>
                    <a href={tool.url} target="_blank" rel="noopener noreferrer" className="ml-auto text-xs hover:underline flex items-center gap-1" style={{ color: tool.color }}>
                      <ExternalLink size={12} /> Visit
                    </a>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">{tool.what}</p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {tool.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <CheckCircle2 size={12} style={{ color: tool.color }} className="shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="bg-[var(--bg-primary)] rounded-lg p-3">
                    <p className="text-xs font-medium" style={{ color: tool.color }}>💡 {tool.key}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* ─── PARA TAB ─── */}
          {activeTab === "para" && (
            <motion.div key="para" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <div className="text-center mb-4">
                <h2 className="text-lg font-semibold mb-2">The PARA Structure</h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  From Tiago Forte&apos;s second brain methodology. Claude already understands it — you don&apos;t need to explain anything.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { letter: "P", title: "Projects", color: "#6c5ce7", desc: "Active work you are doing right now.", examples: ["This quarter's goals", "Current campaigns", "Live projects"], icon: <Rocket size={18} /> },
                  { letter: "A", title: "Areas", color: "#0984e3", desc: "Ongoing responsibilities that need maintenance.", examples: ["Marketing", "Clients", "Team management"], icon: <Layers size={18} /> },
                  { letter: "R", title: "Resources", color: "#00b894", desc: "Reference material you want to keep.", examples: ["Books", "Frameworks", "Articles", "Tools"], icon: <BookMarked size={18} /> },
                  { letter: "A", title: "Archive", color: "#636e72", desc: "Everything that is no longer active.", examples: ["Old projects", "Outdated notes", "Still searchable, just out of the way"], icon: <Database size={18} /> },
                ].map((item) => (
                  <div key={item.title} className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-bold">{item.letter} = {item.title}</div>
                        <div className="text-xs text-[var(--text-secondary)]">{item.desc}</div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {item.examples.map((ex) => (
                        <div key={ex} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                          <ChevronRight size={12} style={{ color: item.color }} className="shrink-0" />
                          {ex}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                <h3 className="font-semibold mb-3">Quick Setup Prompt</h3>
                <div className="flex items-center gap-2 bg-[var(--bg-primary)] rounded-lg p-3">
                  <code className="text-xs font-mono text-[var(--accent)] flex-1 overflow-x-auto">
                    &quot;I just created an Obsidian vault. Help me create a PARA folder structure for a solopreneur who runs [describe your business]. Give me the exact folders to create and what goes in each one.&quot;
                  </code>
                  <button onClick={() => copyToClipboard("I just created an Obsidian vault. Help me create a PARA folder structure for a solopreneur who runs [describe your business]. Give me the exact folders to create and what goes in each one.", 999)}
                    className="shrink-0 p-1.5 text-[var(--text-secondary)] hover:text-[var(--accent)]"
                  >
                    {copiedIdx === 999 ? <Check size={14} className="text-[var(--green)]" /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-2">Claude will build your entire brain structure in about 10 seconds. Create those folders.</p>
              </div>
            </motion.div>
          )}

          {/* ─── TWO-WAY LOOP TAB ─── */}
          {activeTab === "loop" && (
            <motion.div key="loop" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <div className="text-center mb-4">
                <h2 className="text-lg font-semibold mb-2">The Two-Way Loop</h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  This is what makes the system different from everything else. It&apos;s not read-only.
                </p>
              </div>

              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <div className="flex items-center justify-center gap-4 flex-wrap mb-6">
                  {[
                    { label: "OMI Captures", icon: <Mic size={20} />, color: "#6c5ce7" },
                    { label: "→", icon: <ArrowRight size={20} />, color: "var(--text-secondary)" },
                    { label: "Obsidian Stores", icon: <FolderOpen size={20} />, color: "#0984e3" },
                    { label: "→", icon: <ArrowRight size={20} />, color: "var(--text-secondary)" },
                    { label: "Claude Reads", icon: <Bot size={20} />, color: "#00b894" },
                    { label: "→", icon: <ArrowRight size={20} />, color: "var(--text-secondary)" },
                    { label: "Claude Improves", icon: <Sparkles size={20} />, color: "#e056fd" },
                    { label: "→", icon: <ArrowRight size={20} />, color: "var(--text-secondary)" },
                    { label: "Vault Grows", icon: <TrendingUp size={20} />, color: "#fdcb6e" },
                  ].map((item, i) =>
                    item.label === "→" ? (
                      <ArrowRight key={i} size={16} className="text-[var(--text-secondary)] hidden md:block" />
                    ) : (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                          {item.icon}
                        </div>
                        <span className="text-[10px] text-[var(--text-secondary)]">{item.label}</span>
                      </div>
                    )
                  )}
                </div>

                <div className="space-y-4">
                  {[
                    { step: 1, title: "OMI captures what you worked on", color: "#6c5ce7", desc: "Runs in the background all day. Automatically takes notes on your conversations, decisions, and tasks." },
                    { step: 2, title: "Claude reads the vault and gives better answers", color: "#00b894", desc: "Instead of generic answers, it pulls in your actual notes, projects, and context. Then answers based on that." },
                    { step: 3, title: "Claude writes new notes back into the vault", color: "#e056fd", desc: "After every conversation: decisions made, action items, new resources, ideas worth keeping." },
                    { step: 4, title: "The vault grows smarter", color: "#fdcb6e", desc: "Tomorrow Claude has even more context. By month six, your second brain contains more useful information about your business than you can hold in your head." },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                        <span className="text-sm font-bold">{item.step}</span>
                      </div>
                      <div>
                        <div className="font-medium text-sm">{item.title}</div>
                        <p className="text-xs text-[var(--text-secondary)]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-[var(--accent)]/10 to-[var(--green)]/10 border border-[var(--accent)]/20 rounded-xl p-6 text-center">
                <h3 className="text-lg font-bold mb-2">The Compounding Effect</h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
                  Every conversation is better than the last. Every month the system knows you better. It literally never stops improving. That&apos;s why this is called the <strong>Infinite</strong> Context Engine.
                </p>
              </div>
            </motion.div>
          )}

          {/* ─── ROADMAP TAB ─── */}
          {activeTab === "roadmap" && (
            <motion.div key="roadmap" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">30-Day Infinite Context Engine Rollout</h2>

              {ROADMAP.map((week) => {
                const isExpanded = expandedWeek === week.week;
                return (
                  <div key={week.week} className="glow-border rounded-xl bg-[var(--bg-card)] overflow-hidden">
                    <button onClick={() => setExpandedWeek(isExpanded ? null : week.week)}
                      className="w-full flex items-center gap-3 p-4 text-left hover:bg-[var(--bg-card-hover)] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${week.color}20`, color: week.color }}>
                        <span className="text-sm font-bold">{week.week}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">Week {week.week}: {week.title}</div>
                        <div className="text-xs text-[var(--text-secondary)]">{week.days.length} days</div>
                      </div>
                      <ChevronDown size={16} className={`text-[var(--text-secondary)] transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="px-4 pb-4 space-y-2">
                            {week.days.map((day, i) => (
                              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-primary)] hover:bg-[var(--bg-card-hover)] transition-colors">
                                <span className="text-xs text-[var(--text-secondary)] w-6 shrink-0 mt-0.5">D{i + 1 + (week.week - 1) * 7}</span>
                                <p className="text-sm">{day}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* ─── PROMPTS TAB ─── */}
          {activeTab === "prompts" && (
            <motion.div key="prompts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">110+ Prompts for the Infinite Context Engine</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4">Use these with Claude + your Obsidian vault. Click a category to expand.</p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                {PROMPT_CATEGORIES.map((cat) => (
                  <button key={cat.id} onClick={() => setSelectedPromptCat(selectedPromptCat === cat.id ? null : cat.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-left ${
                      selectedPromptCat === cat.id ? "border-[var(--accent)] bg-[var(--accent)]/10" : "border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)]/50"
                    }`}
                  >
                    {cat.icon}
                    <div className="min-w-0">
                      <div className="text-xs font-medium truncate">{cat.label}</div>
                      <div className="text-[10px] text-[var(--text-secondary)]">{cat.count}</div>
                    </div>
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {selectedPromptCat && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                    className="glow-border rounded-xl bg-[var(--bg-card)] p-4 overflow-hidden"
                  >
                    <ICEPromptList categoryId={selectedPromptCat} onCopy={copyToClipboard} copiedIdx={copiedIdx} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ─── BELIEFS TAB ─── */}
          {activeTab === "beliefs" && (
            <motion.div key="beliefs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <div className="text-center mb-4">
                <h2 className="text-lg font-semibold mb-2">The New Empowering Beliefs</h2>
                <p className="text-sm text-[var(--text-secondary)]">Your beliefs are either your biggest asset or your biggest liability.</p>
              </div>

              {BELIEFS.map((item, i) => (
                <div key={i} className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertCircle size={14} className="text-red-400" />
                        <span className="text-xs font-medium text-red-400">OLD BELIEF</span>
                      </div>
                      <p className="text-sm text-red-400/80 line-through mb-3">{item.wrong}</p>
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 size={14} className="text-[var(--green)]" />
                        <span className="text-xs font-medium text-[var(--green)]">NEW BELIEF</span>
                      </div>
                      <p className="text-sm text-[var(--green)]">{item.right}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* ─── OLD VS NEW TAB ─── */}
          {activeTab === "comparison" && (
            <motion.div key="comparison" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-4 text-center">Old Way vs New Way</h2>

              {OLD_VS_NEW.map((item, i) => (
                <div key={i} className="glow-border rounded-xl bg-[var(--bg-card)] overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle size={14} className="text-red-400" />
                        <span className="text-xs font-medium text-red-400">OLD WAY ❌</span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)]">{item.old}</p>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 size={14} className="text-[var(--green)]" />
                        <span className="text-xs font-medium text-[var(--green)]">NEW WAY ✅</span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)]">{item.new}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── ICE Prompt List ─── */
function ICEPromptList({ categoryId, onCopy, copiedIdx }: { categoryId: string; onCopy: (text: string, idx: number) => void; copiedIdx: number | null }) {
  const prompts: Record<string, string[]> = {
    vault: [
      "Create a PARA folder structure for an Obsidian second brain for a solopreneur who runs [describe your business]. Give me every folder and subfolder in markdown format.",
      "Here are my raw business notes [paste them]. Organise these into a clean Obsidian second brain using PARA structure. Add relevant tags and wikilinks between related notes.",
      "Create a personal context document for my Obsidian vault. Ask me 20 questions about my business, goals, team, tools, and working style. Then write the document using my answers.",
      "Here are my daily OMI memory notes [paste them]. Clean these up into a structured Obsidian daily log with sections for: work done, decisions made, follow-up tasks, tools used, ideas worth keeping.",
      "Audit my Obsidian vault structure [describe it]. What is missing? What should be better connected? Give me specific improvements to make today.",
      "Create a 'Read Me First' document for my second brain. Any new AI agent or team member should read this to understand my business, my priorities, my working style, and the most important context about me.",
      "Here is my Obsidian vault [paste a sample]. Suggest 20 new wikilinks I should add between existing notes to strengthen the knowledge graph.",
      "Convert my brain dump [paste it] into structured Obsidian notes. Each note should have a clear title, relevant tags, and links to related notes.",
      "I want to colour code my Obsidian graph. Give me a list of tags to add to each type of note so that tools, people, projects, and resources display in different colours.",
      "Create a master index note for my Obsidian vault that links to every major section. This should be the starting point whenever I open the vault.",
    ],
    daily: [
      "Good morning. Here is my vault context [paste it]. Give me a morning briefing: my top priority today, open loops from yesterday, decisions to make, and the most important 90-minute focus block.",
      "Here are my OMI memories from today [paste them]. Create my daily log for Obsidian with sections: work done, decisions made, tasks to follow up, ideas worth keeping.",
      "End of day review. Here is what I worked on [paste notes]. Summarise my day into three wins, three things to improve, and tomorrow's most important first task.",
      "Based on my current project notes [paste them], what should I be working on right now? Rank by impact and urgency.",
      "Here is my weekly calendar [describe it]. Based on my vault context, am I spending time on the right things? What is misaligned with my goals?",
      "Create 5 high-leverage tasks for tomorrow based on my current projects and constraints [paste relevant notes].",
      "Flag any open loops in my vault [paste notes]. What has not been resolved? What decisions are still pending? What tasks have no next action?",
      "Based on my vault context, what is my single biggest constraint right now? What would eliminating it unlock?",
      "Write my end of week reflection for Obsidian. This week I [describe your week]. Format it with wins, lessons, and next week's intention.",
      "Review my decision log from the past month [paste it]. What patterns do you see? Which types of decisions led to the best outcomes?",
    ],
    content: [
      "Based on my audience intelligence document [paste it], generate 30 content ideas for this month. Each idea should include a title, core insight, hook, and which audience pain point it addresses.",
      "Using my personal context document [paste it], write a YouTube hook for a video about [topic]. The hook should feel like it was written by me, not by a generic AI.",
      "Here is my content idea [describe it]. Using my communication style and audience notes [paste them], write a full video script outline with hook, main sections, and call to action.",
      "Generate 10 contrarian angles on the topic of [topic] that would resonate specifically with solopreneurs who already use AI but feel stuck.",
      "Based on my vault context, what content topics am I most credible to talk about? Rank them by potential audience value and my unique angle.",
      "Write 5 different hook variations for this video topic [describe it]. Each hook should start with a specific claim or result, not a soft opener.",
      "Using my audience intelligence notes [paste them], write a belief-breaking opening for a video about [topic]. Break the most common limiting belief in the first 30 seconds.",
      "Create a 90-day content calendar for my business based on my current projects, audience, and goals [paste context]. Include video titles, post topics, and key messages.",
      "Here is a rough transcript of my video [paste it]. Edit it for clarity and punch. Keep my voice. Every sentence on its own line. Short. Direct.",
      "Create 10 YouTube thumbnail text options for a video about [topic]. Each should be under 5 words and create maximum curiosity.",
    ],
    agent: [
      "Based on my vault context [paste it], design an agent operating system for my business. What should Claude handle? What should a research agent handle? What should a content agent handle?",
      "Write a system prompt for a Claude agent that knows my business. Use my personal context document [paste it] as the base. The agent should understand my tone, priorities, and working style.",
      "Create a context loading prompt I can paste at the start of every AI conversation to give any agent full context on my business in under 200 words.",
      "Based on my SOPs [paste them], create a system prompt for an AI agent that can handle [specific task] for my business without asking clarifying questions.",
      "Design a morning agent routine. When I wake up and open Claude, what should happen automatically based on my vault? What should it surface? What should it prepare?",
      "Create a prompt chain for my content creation workflow: research, outline, draft, edit, repurpose. Each step should load the right vault context for that stage.",
      "Write a project kickoff prompt. When I start a new project, I want to paste this and have Claude immediately understand the project goals, constraints, and first steps based on my vault.",
      "Create a prompt for a client briefing agent. Before every client call I paste the client's vault note and this agent gives me a briefing on where we are and what to discuss.",
      "Design a delegation agent prompt. When I want to delegate a task, I paste this and the agent writes a clear brief for a team member using my communication style.",
      "Create a constraint-busting agent prompt. When I am stuck, I paste my current situation and this agent identifies the real bottleneck and gives me the three highest-leverage moves.",
    ],
    strategy: [
      "Based on my vault context [paste it], what are the three biggest opportunities I am currently underexploiting? Give me specific actions for each.",
      "Run a 90-day business audit based on my vault notes [paste them]. What is working? What is not? What should I stop, start, and continue?",
      "Based on my project notes and goals [paste them], am I working on the right things? What would a top-tier business advisor tell me to change?",
      "Create a prioritisation matrix for my current project list [paste it]. Rank by impact, urgency, and alignment with my 90-day goal.",
      "Here are my business goals for this quarter [paste them]. What is the single most important constraint standing between me and hitting them?",
      "Based on my vault, what decisions am I avoiding? What hard choices I am deferring that are costing me leverage?",
      "Design a 90-day sprint plan based on my current projects and goals [paste context]. What should I focus on in each month to build maximum momentum?",
      "Create a weekly operating rhythm for my business based on my working style and goals [paste vault context]. What should I do each day to make consistent progress?",
      "Analyse my delegation log [paste it]. What am I still doing myself that I should be delegating or automating? Give me specific tasks to remove from my plate.",
      "Based on my business context, what does my ideal day look like in 90 days if I implement everything we have discussed? Describe it hour by hour.",
    ],
    learning: [
      "I just read [describe a book or article]. Extract the 5 most useful insights for my specific business situation [paste context].",
      "Here are my notes from a podcast or conversation [paste them]. What are the key takeaways I should save in my Obsidian vault? Format them as clean notes.",
      "Create a book summary template for my Obsidian resources folder. Every book I read should have: core thesis, top 10 insights, how it applies to my business, and one action to take.",
      "Based on my learning notes from the past month [paste them], what themes keep appearing? What is my subconscious trying to tell me to focus on?",
      "I want to go deep on [topic]. Based on my current knowledge level [describe it], create a 30-day learning curriculum. Include free resources, key concepts to understand, and daily study tasks.",
      "Convert this dense article [paste it] into 5 clean Obsidian notes. Each note should be a standalone insight with a clear title and relevant tags.",
      "Create a mental model library entry for the concept of [concept]. Explain it simply, give an example from business, and show how I can use it when making decisions.",
      "Here is a framework I want to learn [describe it]. Create a personal implementation guide for my Obsidian vault showing exactly how I would apply this in my specific business.",
      "Based on my vault notes, what skills are most worth developing in the next 90 days to remove my biggest constraints? Rank them by leverage.",
      "Create a weekly learning review template for my Obsidian vault. Each week I should log: what I learned, how it changed my thinking, and what I plan to test based on it.",
    ],
    productivity: [
      "Based on my time tracking data [describe your patterns], where is my time best spent? Where am I losing the most leverage?",
      "Create a daily schedule template for my Obsidian vault based on my working style [describe it]. Include focus blocks, communication blocks, and recovery time.",
      "Design a distraction elimination plan for my work environment based on my goals and working style [paste context]. What should I cut, limit, or schedule?",
      "Based on my current projects [paste them], what is the single highest-leverage task I could do in the next 90 minutes? Justify your answer.",
      "Create a weekly planning template for my Obsidian vault. Every Sunday I should fill this in to set myself up for a focused, high-output week.",
      "Review my task list [paste it]. Which items are inputs I control? Which are outputs I am waiting for? Help me focus only on what I can move.",
      "Design a 'deep work' session template for my Obsidian vault. Before each deep work block I should paste this and Claude will help me focus on exactly the right thing.",
      "Based on my goals [paste them], create a not-to-do list. What are the 10 things I should say no to so I can protect my focus?",
      "Analyse my recent daily logs [paste them]. Am I getting to my most important work first? What patterns do you notice about when I am most productive?",
      "Create a meeting template for my Obsidian vault. Every meeting should have: agenda, key decisions to make, who needs to do what, and how long it should last.",
    ],
    team: [
      "Create an onboarding document for a new team member using my vault context [paste it]. They should understand my communication style, expectations, and how I like things done.",
      "Here are my notes on a team member [describe the situation]. Based on my management style [paste context], how should I approach giving them feedback?",
      "Create a client onboarding template for my Obsidian vault. When a new client starts, this should capture: goals, constraints, communication preferences, and first 30-day milestones.",
      "Based on my client notes [paste them], what patterns do you notice? What do my best clients have in common? What do my most difficult clients have in common?",
      "Write a delegation brief for this task [describe it] using my communication style [paste context]. Include the outcome expected, the constraints to work within, and how to report back.",
      "Create a performance review template for my Obsidian vault. For each team member I should review: what they committed to, what they delivered, what to improve, and what to recognise.",
      "Based on my client context [paste it], prepare a briefing for my next call with them. What are the three most important things to discuss? What decisions need to be made?",
      "Create a team accountability tracker template for my Obsidian vault. Every commitment made by a team member gets logged here with a due date and status.",
      "Based on my vault, what processes do I need to document as SOPs so that my team can operate independently without me involved?",
      "Write a client update email based on this project note [paste it]. Keep it clear, professional, and focused on progress and next steps. Use my communication style.",
    ],
    research: [
      "Research the tool [name it]. Based on my business context [paste it], is this worth adding to my stack? Give me a clear yes or no with specific reasons.",
      "Compare these two tools [name them] for my specific use case [describe it]. Give me a decision framework not just a feature list.",
      "Based on my vault context, what AI tools am I not currently using that would give me the highest leverage? Give me three specific recommendations with reasoning.",
      "Create a tool evaluation template for my Obsidian vault. Every new tool I try should be assessed on: what it does, how it fits my stack, the learning curve, and whether I should keep it.",
      "Here is a trend I noticed [describe it]. Based on my business context, is this relevant to me? Should I pay attention to it or ignore it?",
      "Create a competitive landscape note for my Obsidian vault about [your niche]. What are the main categories of tools? What is emerging? What is declining?",
      "Based on my audience intelligence notes [paste them], what questions is my audience asking right now that I am not yet answering with my content?",
      "Analyse this data [paste it]. Based on my business context, what does it mean? What action should I take based on what you see?",
      "Create a trend tracking template for my Obsidian vault. Every week I should log the most important AI and business trends relevant to my niche and how they affect my strategy.",
      "Based on my project notes [paste them], what risks am I not accounting for? What could go wrong that I have not prepared for?",
    ],
    growth: [
      "Based on my vault context [paste it], what is my current highest-leverage growth activity? What single action would create the most compounding effect?",
      "Create a 90-day growth sprint plan based on my goals and constraints [paste context]. Break it into weekly milestones with clear daily actions.",
      "Based on my content notes [paste them], what formats and topics have performed best? What should I do more of? What should I cut?",
      "Design a lead generation system for my business using only free tools. Base it on my audience context [paste it] and my current content strategy.",
      "Based on my vault, what would I do differently if I could only work 4 hours a day? What are the truly high-leverage activities vs the busy work?",
      "Create a monthly business review template for Obsidian. I should review: progress towards goals, what worked, what did not, what to focus on next month, and what to delegate or automate.",
      "Based on my audience intelligence [paste it], design a content funnel. What content brings people in? What converts them to leads? What turns leads into community members?",
      "Create a system for documenting winning formulas in my Obsidian vault. When something works, I want a template that captures exactly what I did so I can replicate it.",
      "Based on my vault context, what do I know that my audience does not? What unique knowledge do I have that would be most valuable to share?",
      "Design my ideal AI stack for 12 months from now based on my current situation [paste context]. What tools, systems, and processes would I have in place? Work backwards from that to give me my next 30 days.",
    ],
    bonus: [
      "Create a personal values statement for my Obsidian vault based on how I work, what I prioritise, and what I care about [describe yourself].",
      "Write my 1-year vision for my business in clear simple language. Base it on my current trajectory [paste context] but push me to think bigger.",
      "Based on my vault, what am I doing that is not aligned with my stated goals? Where is there a gap between what I say matters and how I spend my time?",
      "Create a mistakes log template for my Obsidian vault. Every mistake should capture: what happened, why it happened, what I learned, and what system change prevents it recurring.",
      "Design a morning routine checklist for my Obsidian vault based on my goals and working style [describe it]. What are the non-negotiable inputs every morning?",
      "Based on my vault context, write a simple explanation of what I do and why it matters. Something I could use to introduce myself to a new audience.",
      "Create a belief tracking note for my Obsidian vault. These are the beliefs about business and AI that I want to reinforce every day. Based on my goals and context [paste them], what should those beliefs be?",
      "Review my vault from the perspective of someone new to my business. What is confusing? What is missing? What does not make sense yet?",
      "Based on everything in my vault, what is the most important thing I know that I am not yet acting on? What is the gap between my insight and my behaviour?",
      "Create a legacy note for my Obsidian vault. In 5 years, when I look back at this season of my business, what do I want to have built? Write it as if it already happened.",
    ],
  };

  const items = prompts[categoryId] || [];
  const cat = PROMPT_CATEGORIES.find((c) => c.id === categoryId);

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-sm mb-3">{cat?.label} Prompts ({items.length})</h3>
      {items.map((prompt, i) => (
        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-primary)] hover:bg-[var(--bg-card-hover)] transition-colors group">
          <span className="text-xs text-[var(--text-secondary)] w-5 shrink-0 mt-0.5">{i + 1}.</span>
          <p className="text-sm flex-1 leading-relaxed">{prompt}</p>
          <button onClick={() => onCopy(prompt, i)}
            className="shrink-0 p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors opacity-0 group-hover:opacity-100"
            title="Copy prompt"
          >
            {copiedIdx === i ? <Check size={14} className="text-[var(--green)]" /> : <Copy size={14} />}
          </button>
        </div>
      ))}
    </div>
  );
}
