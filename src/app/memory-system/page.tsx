"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard, Target, BookOpen, Settings, Brain,
  Mic, Monitor, FolderOpen, Bot, Check, ChevronRight,
  ChevronDown, Sparkles, Clock, Zap, Shield, ArrowRight,
  Download, Link2, Play, BookMarked, Lightbulb, Rocket, Search,
  RefreshCw, AlertCircle, CheckCircle2, Circle
} from "lucide-react";

/* ─── Page Nav ─── */
function PageNav() {
  const items = [
    { label: "Mission Control", icon: <LayoutDashboard size={14} />, href: "/" },
    { label: "Automation", icon: <Zap size={14} />, href: "/automation" },
    { label: "Goals", icon: <Target size={14} />, href: "/goals" },
    { label: "Journal", icon: <BookOpen size={14} />, href: "/journal" },
    { label: "Settings", icon: <Settings size={14} />, href: "/settings" },
  ];
  return (
    <div className="flex items-center gap-1 mb-6">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] transition-colors"
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
}

/* ─── Types ─── */
interface SetupStep {
  id: string;
  label: string;
  detail: string;
  phase: number;
}

interface RoadmapDay {
  day: number;
  task: string;
  week: number;
  completed: boolean;
}

/* ─── Setup SOP Steps ─── */
const SETUP_STEPS: SetupStep[] = [
  { id: "omi-download", label: "Download OMI", detail: "Go to omi.me and download the app for your device.", phase: 1 },
  { id: "omi-account", label: "Create free account", detail: "Open OMI and create a free account.", phase: 1 },
  { id: "omi-mic", label: "Grant microphone access", detail: "Allow OMI to access your microphone.", phase: 1 },
  { id: "omi-screen", label: "Enable screen recording", detail: "Grant screen recording permission in system settings.", phase: 1 },
  { id: "omi-run", label: "Let OMI run for a full day", detail: "Let it capture at least one full working day before proceeding.", phase: 1 },
  { id: "obsidian-download", label: "Download Obsidian", detail: "Go to obsidian.md and download Obsidian for free.", phase: 2 },
  { id: "obsidian-vault", label: "Create a new vault", detail: 'Name it something clear, e.g. "My AI Memory Vault".', phase: 2 },
  { id: "obsidian-path", label: "Note the vault folder path", detail: "You'll need this file path for the next steps.", phase: 2 },
  { id: "omi-export", label: "Connect OMI → Obsidian", detail: "In OMI Memories section, select Obsidian as export destination and point to your vault folder.", phase: 3 },
  { id: "omi-first-export", label: "Run first export", detail: "Hit export and verify memories appear in your Obsidian vault.", phase: 3 },
  { id: "file-path", label: "Copy the memory file path", detail: "Right-click the memories file → Get Info/Properties → copy full path.", phase: 4 },
  { id: "hermes-connect", label: "Connect Hermes Agent", detail: 'Open Hermes and tell it: "Use this file path for your memory and context: [PATH]"', phase: 5 },
  { id: "hermes-test", label: "Test the memory", detail: "Ask Hermes something specific about you — verify it answers from memory.", phase: 5 },
  { id: "other-tools", label: "Connect other AI tools", detail: "Give the same file path to OpenClaw, Claude Code, or any local AI tool.", phase: 6 },
  { id: "weekly-refresh", label: "Set weekly refresh reminder", detail: "Once a week, export fresh memories from OMI to Obsidian.", phase: 7 },
];

const PHASES = [
  { num: 1, label: "Set Up OMI", icon: <Mic size={16} />, color: "#6c5ce7" },
  { num: 2, label: "Set Up Obsidian", icon: <FolderOpen size={16} />, color: "#e056fd" },
  { num: 3, label: "Connect OMI → Obsidian", icon: <Link2 size={16} />, color: "#00b894" },
  { num: 4, label: "Get File Path", icon: <FolderOpen size={16} />, color: "#fdcb6e" },
  { num: 5, label: "Connect Hermes", icon: <Bot size={16} />, color: "#e17055" },
  { num: 6, label: "Connect Other Tools", icon: <Zap size={16} />, color: "#0984e3" },
  { num: 7, label: "Maintain", icon: <RefreshCw size={16} />, color: "#636e72" },
];

/* ─── 30-Day Roadmap ─── */
function generateRoadmap(): RoadmapDay[] {
  const tasks: string[] = [
    // Week 1
    "Download OMI and grant mic + screen access",
    "Download Obsidian and create your memory vault",
    "Connect OMI to Obsidian and run first export",
    "Locate your file path and paste into Hermes Agent",
    "Test memory by asking Hermes 10 questions about your business",
    "Do the same with OpenClaw and any other AI tool",
    "Review your memory file — add extra business notes manually",
    // Week 2
    "Add a section about your top 3 business goals",
    "Add a section about your ideal client and their problems",
    "Add a section about your team structure and roles",
    "Add a section about your content strategy and brand voice",
    "Ask Hermes to write content — see how much better it is",
    "Ask Hermes to suggest automation ideas for your business",
    "Review Week 2 — what's working, what needs improving?",
    // Week 3
    "Use Hermes + memory to build your first automated workflow",
    "Connect memory to your email drafting process",
    "Connect memory to your content creation process",
    "Set up a weekly reminder to refresh your vault",
    "Use memory to personalise outreach messages",
    "Use memory to build an SOP with Hermes",
    "Review what you've automated — track time saved",
    // Week 4
    "Share the file path setup with your team",
    "Create a team memory file with company context + brand guidelines",
    "Connect team memory to your agency's AI tools",
    "Use Hermes + memory to produce a full week of content in one session",
    "Use memory to build a client onboarding workflow",
    "Use memory to write a full email sequence",
    "Review results — calculate time saved this month",
    "Add biggest lessons to your memory vault",
    "Share your results and get feedback from the community",
  ];
  return tasks.map((task, i) => ({
    day: i + 1,
    task,
    week: Math.floor(i / 7) + 1,
    completed: false,
  }));
}

/* ─── Power Prompts by Category ─── */
const PROMPT_CATEGORIES = [
  { id: "personalize", label: "Personalize Your AI", icon: <Sparkles size={14} />, count: 10 },
  { id: "content", label: "Content Creation", icon: <BookMarked size={14} />, count: 15 },
  { id: "business", label: "Business", icon: <Rocket size={14} />, count: 15 },
  { id: "seo", label: "SEO & Agency", icon: <Search size={14} />, count: 10 },
  { id: "automation", label: "AI Agent Automation", icon: <Zap size={14} />, count: 10 },
  { id: "community", label: "Community", icon: <Bot size={14} />, count: 10 },
  { id: "analysis", label: "Analysis & Research", icon: <Lightbulb size={14} />, count: 10 },
  { id: "strategy", label: "Strategy", icon: <Target size={14} />, count: 10 },
  { id: "creativity", label: "Creativity & Ideation", icon: <Lightbulb size={14} />, count: 15 },
];

/* ─── Main Component ─── */
export default function MemorySystemPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "setup" | "roadmap" | "prompts" | "config">("overview");
  const [setupSteps, setSetupSteps] = useState<SetupStep[]>(SETUP_STEPS);
  const [roadmap, setRoadmap] = useState<RoadmapDay[]>(generateRoadmap);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);
  const [selectedPromptCategory, setSelectedPromptCategory] = useState<string | null>(null);
  const [configSaved, setConfigSaved] = useState(false);

  // Config state
  const [vaultPath, setVaultPath] = useState("");
  const [memoryFilePath, setMemoryFilePath] = useState("");
  const [omiEnabled, setOmiEnabled] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [syncInterval, setSyncInterval] = useState("weekly");

  useEffect(() => {
    fetch("/api/memory-system/config")
      .then((res) => res.json())
      .then((data) => {
        setVaultPath(data.vaultPath || "");
        setMemoryFilePath(data.memoryFilePath || "");
        setOmiEnabled(data.omiEnabled ?? true);
        setAutoSync(data.autoSync ?? true);
        setSyncInterval(data.syncInterval || "weekly");
      })
      .catch(() => {});
  }, []);

  const toggleSetupStep = (id: string) => {
    setSetupSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !(s as any).completed } : s))
    );
  };

  const toggleRoadmapDay = (day: number) => {
    setRoadmap((prev) =>
      prev.map((d) => (d.day === day ? { ...d, completed: !d.completed } : d))
    );
  };

  const handleSaveConfig = async () => {
    await fetch("/api/memory-system/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vaultPath,
        memoryFilePath,
        omiEnabled,
        autoSync,
        syncInterval,
      }),
    });
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 2000);
  };

  const setupProgress = setupSteps.filter((s: any) => s.completed).length;
  const roadmapProgress = roadmap.filter((d) => d.completed).length;

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: <Brain size={16} /> },
    { id: "setup" as const, label: "Setup SOP", icon: <Play size={16} /> },
    { id: "roadmap" as const, label: "30-Day Roadmap", icon: <Rocket size={16} /> },
    { id: "prompts" as const, label: "Power Prompts", icon: <Sparkles size={16} /> },
    { id: "config" as const, label: "Configuration", icon: <Settings size={16} /> },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto p-6">
        <PageNav />

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Brain className="text-[var(--accent)]" size={28} />
            Infinite Context Engine™
          </h1>
          <p className="text-[var(--text-secondary)]">
            Give your AI agents a memory that never forgets. OMI captures → Obsidian stores → Agents deploy.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-[var(--bg-secondary)] rounded-xl p-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ─── OVERVIEW TAB ─── */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* The Big Idea */}
              <div className="glow-border rounded-xl p-6 bg-[var(--bg-card)]">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Lightbulb size={18} className="text-[var(--yellow)]" />
                  The Big Idea
                </h2>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
                  Your AI is only as good as the context it has. The Infinite Context Engine gives your agents
                  a perfect memory — they know your goals, schedule, preferences, and business every single session.
                  No more repeating yourself. No more starting from scratch.
                </p>
                <div className="bg-[var(--bg-primary)] rounded-lg p-4 border-l-4 border-[var(--accent)]">
                  <p className="text-sm font-medium italic">
                    "The most powerful AI agent isn&apos;t the smartest one. It&apos;s the one that knows YOU the best."
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">— Julian Goldie</p>
                </div>
              </div>

              {/* 4-Layer Framework */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    layer: 1,
                    title: "Capture",
                    desc: "OMI records everything you say, do, and think throughout the day. Mic + screen, silently.",
                    icon: <Mic size={20} />,
                    color: "#6c5ce7",
                    detail: "No effort required. Runs in the background 24/7.",
                  },
                  {
                    layer: 2,
                    title: "Organise",
                    desc: "OMI processes raw recordings into clean, structured memory notes.",
                    icon: <RefreshCw size={20} />,
                    color: "#e056fd",
                    detail: "Goals, preferences, schedules, clients, projects, habits.",
                  },
                  {
                    layer: 3,
                    title: "Store",
                    desc: "Obsidian holds your memory vault locally. Safe, private, yours.",
                    icon: <FolderOpen size={20} />,
                    color: "#00b894",
                    detail: "No cloud dependency. No subscription. A living knowledge base.",
                  },
                  {
                    layer: 4,
                    title: "Deploy",
                    desc: "AI agents read the vault and begin every conversation already knowing you.",
                    icon: <Rocket size={20} />,
                    color: "#fdcb6e",
                    detail: "Hermes, OpenClaw, Claude Code — one file path, full context.",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.layer}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: item.layer * 0.1 }}
                    className="glow-border rounded-xl p-5 bg-[var(--bg-card)]"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${item.color}20`, color: item.color }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs font-medium" style={{ color: item.color }}>
                          Layer {item.layer}
                        </div>
                        <div className="font-semibold">{item.title}</div>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] mb-2">{item.desc}</p>
                    <p className="text-xs text-[var(--text-secondary)] opacity-70">{item.detail}</p>
                  </motion.div>
                ))}
              </div>

              {/* The Three Tools */}
              <div className="glow-border rounded-xl p-6 bg-[var(--bg-card)]">
                <h2 className="text-lg font-semibold mb-4">The Three Tools (All Free)</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      name: "OMI",
                      role: "Background Memory Capture",
                      desc: "Listens through your mic, watches your screen, takes notes on everything automatically.",
                      color: "#6c5ce7",
                      url: "omi.me",
                    },
                    {
                      name: "Obsidian",
                      role: "Local Memory Vault",
                      desc: "Free note-taking app. Stores all your memories as markdown files on your machine.",
                      color: "#e056fd",
                      url: "obsidian.md",
                    },
                    {
                      name: "Hermes Agent",
                      role: "AI Agent with Memory",
                      desc: "Reads your Obsidian vault so it knows you every session. No re-explaining needed.",
                      color: "#00b894",
                      url: "github.com/NousResearch/hermes-agent",
                    },
                  ].map((tool) => (
                    <div key={tool.name} className="bg-[var(--bg-primary)] rounded-lg p-4">
                      <div className="font-bold text-lg mb-1" style={{ color: tool.color }}>
                        {tool.name}
                      </div>
                      <div className="text-xs text-[var(--text-secondary)] mb-2">{tool.role}</div>
                      <p className="text-sm text-[var(--text-secondary)] mb-3">{tool.desc}</p>
                      <a
                        href={`https://${tool.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1"
                      >
                        <Download size={12} /> {tool.url}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Limiting Beliefs */}
              <div className="glow-border rounded-xl p-6 bg-[var(--bg-card)]">
                <h2 className="text-lg font-semibold mb-4">Breaking Limiting Beliefs</h2>
                <div className="space-y-3">
                  {[
                    { wrong: "AI memory tools are complicated and technical.", right: "If you can click a button and drag a folder, you can do this." },
                    { wrong: "I'll have to update memory manually every day.", right: "The system updates itself automatically — you do nothing." },
                    { wrong: "This probably costs a lot of money.", right: "The entire system is free. OMI + Obsidian + Hermes = $0." },
                    { wrong: "I can just explain things to my AI each time.", right: "Every minute re-explaining yourself is a minute you could spend making money." },
                    { wrong: "This only works with Hermes Agent.", right: "Works with OpenClaw, Claude Code, and any AI that reads local files." },
                    { wrong: "I need to be a tech expert.", right: "You need curiosity and a willingness to follow steps. That's it." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="mt-0.5">
                        <div className="flex items-center gap-1 text-red-400 text-xs font-medium">
                          <AlertCircle size={12} /> ❌
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-red-400/80 line-through">{item.wrong}</p>
                        <p className="text-sm text-[var(--green)] flex items-center gap-1 mt-0.5">
                          <CheckCircle2 size={12} /> {item.right}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flow Diagram */}
              <div className="glow-border rounded-xl p-6 bg-[var(--bg-card)] text-center">
                <h2 className="text-lg font-semibold mb-4">How It All Connects</h2>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {[
                    { label: "OMI", sub: "Capture", color: "#6c5ce7" },
                    { label: "→", sub: "", color: "var(--text-secondary)" },
                    { label: "OMI", sub: "Organise", color: "#e056fd" },
                    { label: "→", sub: "", color: "var(--text-secondary)" },
                    { label: "Obsidian", sub: "Store", color: "#00b894" },
                    { label: "→", sub: "", color: "var(--text-secondary)" },
                    { label: "Agents", sub: "Deploy", color: "#fdcb6e" },
                  ].map((item, i) =>
                    item.label === "→" ? (
                      <ArrowRight key={i} size={20} className="text-[var(--text-secondary)]" />
                    ) : (
                      <div
                        key={i}
                        className="px-4 py-2 rounded-lg text-center"
                        style={{ backgroundColor: `${item.color}15`, border: `1px solid ${item.color}30` }}
                      >
                        <div className="font-bold text-sm" style={{ color: item.color }}>{item.label}</div>
                        <div className="text-[10px] text-[var(--text-secondary)]">{item.sub}</div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── SETUP SOP TAB ─── */}
          {activeTab === "setup" && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">Setup SOP — 30 Steps</h2>
                <div className="text-sm text-[var(--text-secondary)]">
                  {setupProgress}/{setupSteps.length} complete
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-[var(--bg-card)] rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--green)]"
                  animate={{ width: `${(setupProgress / setupSteps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {PHASES.map((phase) => {
                const phaseSteps = setupSteps.filter((s) => s.phase === phase.num);
                const phaseComplete = phaseSteps.every((s: any) => s.completed);
                const isExpanded = expandedPhase === phase.num;

                return (
                  <div key={phase.num} className="glow-border rounded-xl bg-[var(--bg-card)] overflow-hidden">
                    <button
                      onClick={() => setExpandedPhase(isExpanded ? null : phase.num)}
                      className="w-full flex items-center gap-3 p-4 text-left hover:bg-[var(--bg-card-hover)] transition-colors"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: phaseComplete ? "var(--green)" : `${phase.color}20`,
                          color: phaseComplete ? "white" : phase.color,
                        }}
                      >
                        {phaseComplete ? <Check size={16} /> : phase.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          Phase {phase.num}: {phase.label}
                        </div>
                        <div className="text-xs text-[var(--text-secondary)]">
                          {phaseSteps.filter((s: any) => s.completed).length}/{phaseSteps.length} steps
                        </div>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`text-[var(--text-secondary)] transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 space-y-2">
                            {phaseSteps.map((step, i) => {
                              const completed = (step as any).completed;
                              return (
                                <button
                                  key={step.id}
                                  onClick={() => toggleSetupStep(step.id)}
                                  className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                                    completed
                                      ? "bg-[var(--green)]/10 border border-[var(--green)]/20"
                                      : "bg-[var(--bg-primary)] hover:bg-[var(--bg-card-hover)] border border-transparent"
                                  }`}
                                >
                                  <div
                                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                      completed ? "bg-[var(--green)] text-white" : "bg-[var(--bg-card)] text-[var(--text-secondary)]"
                                    }`}
                                  >
                                    {completed ? <Check size={12} /> : <span className="text-[10px]">{i + 1}</span>}
                                  </div>
                                  <div>
                                    <div className={`text-sm font-medium ${completed ? "text-[var(--green)] line-through" : ""}`}>
                                      {step.label}
                                    </div>
                                    <div className="text-xs text-[var(--text-secondary)]">{step.detail}</div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* ─── ROADMAP TAB ─── */}
          {activeTab === "roadmap" && (
            <motion.div
              key="roadmap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">30-Day Roadmap</h2>
                <div className="text-sm text-[var(--text-secondary)]">
                  {roadmapProgress}/{roadmap.length} complete
                </div>
              </div>

              <div className="w-full h-2 bg-[var(--bg-card)] rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--green)]"
                  animate={{ width: `${(roadmapProgress / roadmap.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {[1, 2, 3, 4].map((week) => {
                const weekDays = roadmap.filter((d) => d.week === week);
                const weekLabels = ["Install & Capture", "Personalise", "Automate", "Scale"];
                const weekComplete = weekDays.every((d) => d.completed);

                return (
                  <div key={week} className="glow-border rounded-xl bg-[var(--bg-card)] p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          weekComplete ? "bg-[var(--green)] text-white" : "bg-[var(--bg-primary)] text-[var(--text-secondary)]"
                        }`}
                      >
                        {weekComplete ? <Check size={12} /> : week}
                      </div>
                      <div>
                        <div className="font-medium text-sm">Week {week}: {weekLabels[week - 1]}</div>
                        <div className="text-xs text-[var(--text-secondary)]">
                          {weekDays.filter((d) => d.completed).length}/{weekDays.length} complete
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {weekDays.map((day) => (
                        <button
                          key={day.day}
                          onClick={() => toggleRoadmapDay(day.day)}
                          className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors ${
                            day.completed
                              ? "bg-[var(--green)]/10"
                              : "hover:bg-[var(--bg-primary)]"
                          }`}
                        >
                          {day.completed ? (
                            <CheckCircle2 size={16} className="text-[var(--green)] shrink-0" />
                          ) : (
                            <Circle size={16} className="text-[var(--text-secondary)]/30 shrink-0" />
                          )}
                          <span className="text-xs text-[var(--text-secondary)] w-6 shrink-0">D{day.day}</span>
                          <span className={`text-sm ${day.completed ? "text-[var(--green)] line-through" : ""}`}>
                            {day.task}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* ─── POWER PROMPTS TAB ─── */}
          {activeTab === "prompts" && (
            <motion.div
              key="prompts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <h2 className="text-lg font-semibold mb-2">100+ Power Prompts</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Use these inside your AI agents once your memory system is connected. Click a category to expand.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                {PROMPT_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedPromptCategory(selectedPromptCategory === cat.id ? null : cat.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                      selectedPromptCategory === cat.id
                        ? "border-[var(--accent)] bg-[var(--accent)]/10"
                        : "border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)]/50"
                    }`}
                  >
                    <div className="text-[var(--accent)]">{cat.icon}</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{cat.label}</div>
                      <div className="text-xs text-[var(--text-secondary)]">{cat.count} prompts</div>
                    </div>
                    <ChevronRight size={14} className={`text-[var(--text-secondary)] transition-transform ${selectedPromptCategory === cat.id ? "rotate-90" : ""}`} />
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {selectedPromptCategory && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="glow-border rounded-xl bg-[var(--bg-card)] p-4 overflow-hidden"
                  >
                    <PromptCategory categoryId={selectedPromptCategory} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ─── CONFIG TAB ─── */}
          {activeTab === "config" && (
            <motion.div
              key="config"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 max-w-2xl"
            >
              <h2 className="text-lg font-semibold mb-2">Memory System Configuration</h2>

              <div className="glow-border rounded-xl p-5 bg-[var(--bg-card)]">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <FolderOpen size={16} className="text-[var(--accent)]" />
                  Vault & Memory File
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-[var(--text-secondary)] block mb-1">
                      Obsidian Vault Path
                    </label>
                    <input
                      type="text"
                      value={vaultPath}
                      onChange={(e) => setVaultPath(e.target.value)}
                      placeholder="/Users/yourname/Documents/ObsidianVault"
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      The folder path to your Obsidian vault.
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-[var(--text-secondary)] block mb-1">
                      Memory File Path
                    </label>
                    <input
                      type="text"
                      value={memoryFilePath}
                      onChange={(e) => setMemoryFilePath(e.target.value)}
                      placeholder="/Users/yourname/Documents/ObsidianVault/OMI_Memories.md"
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      The full path to your OMI memory file (usually OMI_Memories.md in your vault).
                    </p>
                  </div>
                </div>
              </div>

              <div className="glow-border rounded-xl p-5 bg-[var(--bg-card)]">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Mic size={16} className="text-[var(--purple)]" />
                  OMI Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">OMI Integration</div>
                      <div className="text-xs text-[var(--text-secondary)]">
                        Enable OMI memory capture and auto-sync
                      </div>
                    </div>
                    <button
                      onClick={() => setOmiEnabled(!omiEnabled)}
                      className={`w-11 h-6 rounded-full transition-colors relative ${
                        omiEnabled ? "bg-[var(--accent)]" : "bg-[var(--border)]"
                      }`}
                    >
                      <motion.div
                        className="w-5 h-5 rounded-full bg-white absolute top-0.5"
                        animate={{ left: omiEnabled ? 22 : 2 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Auto-Sync</div>
                      <div className="text-xs text-[var(--text-secondary)]">
                        Automatically refresh memory context for agents
                      </div>
                    </div>
                    <button
                      onClick={() => setAutoSync(!autoSync)}
                      className={`w-11 h-6 rounded-full transition-colors relative ${
                        autoSync ? "bg-[var(--accent)]" : "bg-[var(--border)]"
                      }`}
                    >
                      <motion.div
                        className="w-5 h-5 rounded-full bg-white absolute top-0.5"
                        animate={{ left: autoSync ? 22 : 2 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                  <div>
                    <label className="text-sm text-[var(--text-secondary)] block mb-1">
                      Sync Frequency
                    </label>
                    <select
                      value={syncInterval}
                      onChange={(e) => setSyncInterval(e.target.value)}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="manual">Manual Only</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveConfig}
                  className="px-6 py-2.5 rounded-xl bg-[var(--accent)] text-white font-medium flex items-center gap-2 hover:bg-[var(--accent)]/80 transition-colors"
                >
                  {configSaved ? (
                    <><Check size={16} /> Saved!</>
                  ) : (
                    "Save Configuration"
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Prompt Category Component ─── */
function PromptCategory({ categoryId }: { categoryId: string }) {
  const prompts: Record<string, string[]> = {
    personalize: [
      "Use my Obsidian memory file and tell me what you know about my business.",
      "Based on my memory file, what are my three biggest priorities right now?",
      "What do you know about my work schedule and timezone?",
      "Based on my memory, what is my main source of income?",
      "What do you know about my team structure?",
      "What content topics do I care about most based on my memory?",
      "What are my current business goals based on what you know about me?",
      "What is my brand tone of voice based on my memory file?",
      "Who are my ideal clients based on what you know about me?",
      "Based on my memory, what is the biggest bottleneck in my business right now?",
    ],
    content: [
      "Write a YouTube title for a video about Hermes Agent memory tools in my voice.",
      "Write 10 YouTube title ideas for my channel based on what you know about my audience.",
      "Write a YouTube description for today's video — use my brand tone.",
      "Write a 3-minute script for a YouTube video about OMI and Obsidian for AI agents.",
      "Create 5 hook ideas for a short-form video about AI memory tools.",
      "Write a Twitter/X thread about the Infinite Context Engine in my voice.",
      "Write a LinkedIn post about AI agent memory using my tone of voice.",
      "Write a blog post outline about giving AI agents perfect memory.",
      "Create an email subject line for a campaign about this video.",
      "Write the first 30 seconds of a YouTube video script in my style.",
      "Write 5 thumbnail text ideas for a video called 'FREE Memory Tool DESTROYS ChatGPT?'",
      "Give me 10 power hooks I can use for YouTube shorts about AI tools.",
      "Write a pinned comment for this YouTube video that drives people to the community.",
      "Write a YouTube community post about the OMI + Obsidian memory system.",
      "Create a 7-day content calendar about AI agent memory tools.",
    ],
    business: [
      "Based on my memory, write a list of automations I should build next.",
      "What SOPs could I automate for my agency based on what you know about my business?",
      "Write an onboarding checklist for a new SEO client at my agency.",
      "Draft a follow-up email to a potential client in my voice.",
      "Write a sales page headline for an AI community.",
      "Create a 5-email welcome sequence for new community members.",
      "Write a retention email for members who haven't engaged recently.",
      "Draft a flash sale post for the community.",
      "Write a referral message asking existing members to share the community.",
      "Create a list of 10 objections prospects have before joining and write rebuttals.",
      "Write a sales call script for closing a new member.",
      "Create a 30-day member success roadmap.",
      "Draft an email for people who clicked but didn't buy.",
      "Write a cold outreach message for a potential SEO agency client.",
      "Create a proposal template for a link building campaign.",
    ],
    seo: [
      "Write a meta description for a blog post about AI SEO tools.",
      "Create an outreach email template for link building campaigns.",
      "Write 10 blog post title ideas targeting SEO agency owners.",
      "Create a content brief for a keyword cluster around 'AI SEO automation.'",
      "Write a case study outline for an SEO client result.",
      "Draft a monthly report template for SEO clients.",
      "Write a pitch deck outline for selling link building to a new client.",
      "Create an upsell script for an existing SEO client.",
      "Build a 90-day SEO content plan based on my agency's niche.",
      "Write a LinkedIn message to a CMO introducing my agency.",
    ],
    automation: [
      "Build me a workflow for automating my YouTube upload process using Hermes Agent.",
      "Create an agent workflow for onboarding a new member automatically.",
      "Design a Hermes Agent workflow for weekly content production.",
      "Write a Hermes Agent prompt for automatically researching YouTube video topics.",
      "Build an email marketing automation workflow using Hermes Agent.",
      "Create a Hermes Agent task list for managing my link building pipeline.",
      "Design an agent workflow that checks my Obsidian vault and creates my daily task list.",
      "Write a Hermes Agent system prompt that uses my full memory file as context.",
      "Build a Hermes Agent workflow for client reporting.",
      "Create an agent workflow for repurposing YouTube content into short-form clips.",
    ],
    community: [
      "Write a welcome post for a new community member.",
      "Create 10 engagement prompts I can post in the community.",
      "Write a post celebrating a member win in the community.",
      "Draft a reply to a member who is struggling with Hermes Agent setup.",
      "Write a weekly check-in post for the community.",
      "Create a challenge post that gets members to share their AI results.",
      "Write a re-engagement post for members who haven't logged in for 2 weeks.",
      "Draft a post announcing a new course inside the community.",
      "Write a post building anticipation for a live coaching call.",
      "Create a pinned post explaining what the community is for new members.",
    ],
    analysis: [
      "Analyse my YouTube channel data and tell me what content is performing best.",
      "Based on my memory, what should my next three YouTube videos be about?",
      "Review my AI agent setup and suggest what I should automate next.",
      "What are the top three bottlenecks in a typical SEO agency workflow?",
      "Research the latest updates to Hermes Agent and summarise them for me.",
      "Compare OMI to other AI memory tools on the market.",
      "What are the best free tools for AI agent memory in 2025?",
      "Analyse this YouTube title and tell me if it will get high CTR.",
      "Review this email subject line and suggest 3 improvements.",
      "What are the top performing YouTube video formats for AI tool tutorials?",
    ],
    strategy: [
      "Based on my business goals, what should my content strategy be for the next 90 days?",
      "What is the fastest path to growing my community to 1,000 members?",
      "What AI tools should I be covering on my YouTube channel right now?",
      "Create a 90-day growth plan for my YouTube channel.",
      "What upsells and downsells should I have for my community?",
      "How should I structure my email funnel for YouTube subscribers?",
      "What retention tactics work best for paid membership communities?",
      "Build a partnership strategy for growing through collaborations.",
      "What metrics should I track weekly for my SEO agency?",
      "Create a hiring plan for scaling my content team.",
    ],
    creativity: [
      "Give me 20 YouTube video ideas for my channel this month.",
      "Come up with 10 new course ideas for my community.",
      "Suggest 5 new Hermes Agent use cases I haven't covered yet on my channel.",
      "Brainstorm 10 ways to make my community more engaging.",
      "Give me 5 viral video concept ideas based on my top performing content.",
      "Suggest 10 collaboration ideas with other AI YouTubers.",
      "Come up with 5 lead magnet ideas for growing my email list.",
      "Brainstorm 10 ways to monetise my YouTube audience beyond membership.",
      "Give me 5 content series ideas I could launch on my channel.",
      "Suggest 10 ways to use OMI + Obsidian + Hermes Agent that I haven't covered yet.",
      "Create 5 thumbnail concept ideas for a video about AI memory tools.",
      "Brainstorm 10 headline formulas I could test for my landing page.",
      "Give me 5 ideas for using AI agents to automate my client reporting.",
      "Suggest 10 ways to use Hermes Agent for link building automation.",
      "Come up with 5 new frameworks I could teach inside my community.",
    ],
  };

  const items = prompts[categoryId] || [];
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copyPrompt = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-sm mb-3">
        {PROMPT_CATEGORIES.find((c) => c.id === categoryId)?.label} Prompts
      </h3>
      {items.map((prompt, i) => (
        <div
          key={i}
          className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-primary)] hover:bg-[var(--bg-card-hover)] transition-colors group"
        >
          <span className="text-xs text-[var(--text-secondary)] w-5 shrink-0 mt-0.5">{i + 1}.</span>
          <p className="text-sm flex-1">{prompt}</p>
          <button
            onClick={() => copyPrompt(prompt, i)}
            className="shrink-0 p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors opacity-0 group-hover:opacity-100"
            title="Copy prompt"
          >
            {copiedIdx === i ? <Check size={14} className="text-[var(--green)]" /> : <Sparkles size={14} />}
          </button>
        </div>
      ))}
    </div>
  );
}
