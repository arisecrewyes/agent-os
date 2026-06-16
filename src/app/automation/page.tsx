"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard, Target, BookOpen, Settings, Brain,
  Zap, Clock, MessageSquare, Users, TrendingUp, Layers,
  Server, Copy, Check, ChevronRight, ChevronDown, Terminal,
  Bot, Shield, Play, Download, RefreshCw, AlertCircle,
  CheckCircle2, Circle, ExternalLink, Wrench
} from "lucide-react";

/* ─── Page Nav ─── */
function PageNav() {
  const items = [
    { label: "Mission Control", icon: <LayoutDashboard size={14} />, href: "/" },
    { label: "Memory Engine", icon: <Brain size={14} />, href: "/memory-system" },
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
interface Blueprint {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  steps: string[];
  commands: { cmd: string; desc: string }[];
  tips: string[];
}

/* ─── Blueprint Data ─── */
const BLUEPRINTS: Blueprint[] = [
  {
    id: "daily-report",
    number: 1,
    title: "Daily Report Bot",
    subtitle: "Scheduled cron jobs in plain English",
    icon: <Clock size={20} />,
    color: "#6c5ce7",
    description:
      "Hermes has a built-in cron scheduler. You write the schedule in plain English — it runs unattended and delivers to any platform (Telegram, Discord, Slack, WhatsApp).",
    steps: [
      "Tell Hermes what you want scheduled, in plain English",
      'Example: "Every morning at 7am, check my niche for news and send me a summary on Telegram"',
      "Hermes sets up the cron job automatically",
      "It runs unattended and delivers results to your chosen platform",
    ],
    commands: [
      { cmd: 'hermes cron "Every morning at 7am, check tech news and send me a summary on Telegram"', desc: "Daily news digest" },
      { cmd: 'hermes cron "Every Friday at 5pm, audit my project folder and send a weekly report"', desc: "Weekly project audit" },
      { cmd: 'hermes cron "Every night at midnight, back up my notes folder"', desc: "Nightly backup" },
    ],
    tips: [
      "Use natural language — Hermes understands scheduling in plain English",
      "Combine with the Memory Engine for personalized reports",
      "Reports can be delivered to any connected messaging platform",
    ],
  },
  {
    id: "telegram-assistant",
    number: 2,
    title: "Telegram Assistant",
    subtitle: "Run Hermes on a server, message it like a friend",
    icon: <MessageSquare size={20} />,
    color: "#0984e3",
    description:
      "Run Hermes on a server, then message it from anywhere. Works with Telegram, Discord, Slack, WhatsApp, and Signal. Send voice memos and it transcribes them.",
    steps: [
      "Run hermes gateway setup and add your Telegram bot token",
      "Run hermes gateway start to start the bot",
      "Message your bot from anywhere — your phone, desktop, etc.",
      "Hermes keeps working on the server while you're out",
    ],
    commands: [
      { cmd: "hermes gateway setup", desc: "Configure messaging platforms" },
      { cmd: "hermes gateway start", desc: "Start the gateway bot" },
      { cmd: "hermes gateway status", desc: "Check gateway status" },
    ],
    tips: [
      "Create a Telegram bot via @BotFather to get your bot token",
      "Works with Discord, Slack, WhatsApp, and Signal too",
      "Voice memos are automatically transcribed",
      "Your agent works 24/7 on the server even when your laptop is off",
    ],
  },
  {
    id: "agent-team",
    number: 3,
    title: "Agent Team (Profiles)",
    subtitle: "Multiple isolated agents on one machine",
    icon: <Users size={20} />,
    color: "#e056fd",
    description:
      "Run multiple separate agents on one machine. Each gets its own memory, personality, and settings. Each profile can even run its own bot.",
    steps: [
      "Create profiles for different roles: coder, research, assistant",
      "Each profile becomes its own command (coder chat, research chat)",
      "Give each one a personality by editing its SOUL.md file",
      "Each profile can run its own bot on different platforms",
    ],
    commands: [
      { cmd: "hermes profile create coder", desc: "Create coding agent profile" },
      { cmd: "hermes profile create research", desc: "Create research agent profile" },
      { cmd: "hermes profile create assistant", desc: "Create personal assistant profile" },
      { cmd: "coder chat", desc: "Chat with your coding agent" },
      { cmd: "research chat", desc: "Chat with your research agent" },
      { cmd: 'echo "You are a focused coding assistant." > ~/.hermes/profiles/coder/SOUL.md', desc: "Set agent personality" },
    ],
    tips: [
      "Each profile has isolated memory — the coder won't see research conversations",
      "You can have a coding bot on Discord AND a personal assistant on Telegram, both 24/7",
      "Edit SOUL.md to give each agent a distinct personality and expertise",
      "Great for separating work contexts (coding vs research vs personal)",
    ],
  },
  {
    id: "self-improving",
    number: 4,
    title: "Self-Improving Agent (Skills)",
    subtitle: "The learning loop — gets better the more you use it",
    icon: <TrendingUp size={20} />,
    color: "#00b894",
    description:
      "Hermes has a learning loop: it creates its own skills after complex tasks, improves them while using them, remembers things about you, and can search past conversations.",
    steps: [
      "Use Hermes normally — it learns from your workflows",
      "After complex tasks, it automatically creates reusable skills",
      "It improves those skills each time they're used",
      "Browse ready-made skills at the Skills Hub or type /skills",
    ],
    commands: [
      { cmd: "/skills", desc: "See installed skills" },
      { cmd: "/skills search [query]", desc: "Search for new skills" },
      { cmd: "/new", desc: "Start a fresh conversation" },
    ],
    tips: [
      "The more you use Hermes, the better it gets at YOUR specific workflows",
      "It can search its own past conversations for context",
      "Skills are auto-created after complex multi-step tasks",
      "Browse the Skills Hub for community-contributed skills",
    ],
  },
  {
    id: "parallel-worker",
    number: 5,
    title: "Parallel Worker (Subagents)",
    subtitle: "Spawn isolated subagents that work simultaneously",
    icon: <Layers size={20} />,
    color: "#fdcb6e",
    description:
      "For big jobs, Hermes can spawn isolated subagents that work in parallel. One researches, one writes, one reviews — all at the same time. Can also collapse 10-step processes into one.",
    steps: [
      "Give Hermes a complex task that can be broken into parallel subtasks",
      "It spawns isolated subagents for each subtask",
      "Subagents work simultaneously, then combine results",
      "Hermes can also write Python scripts to automate multi-step processes",
    ],
    commands: [
      { cmd: "hermes start", desc: "Start a chat session" },
      { cmd: "hermes model", desc: "Pick your AI model" },
    ],
    tips: [
      "Example: one subagent researches, one writes, one reviews — all at once",
      "Hermes can write Python scripts that call its own tools",
      "This collapses a 10-step manual process into a single command",
      "Subagents are isolated — they don't share context unless you want them to",
    ],
  },
  {
    id: "serverless",
    number: 0,
    title: "Bonus: Run It For Almost Free",
    subtitle: "Serverless backends — sleep when idle, wake when messaged",
    icon: <Server size={20} />,
    color: "#636e72",
    description:
      "Hermes supports serverless backends like Modal and Daytona. Your agent's environment goes to sleep when idle and wakes up when you message it. Costs nearly nothing between sessions.",
    steps: [
      "Set up a serverless backend (Modal or Daytona)",
      "Configure Hermes to use the serverless environment",
      "Agent sleeps when idle — near-zero cost",
      "Agent wakes instantly when you send a message",
    ],
    commands: [
      { cmd: "hermes setup --portal", desc: "Use Nous Portal for models (one subscription covers everything)" },
    ],
    tips: [
      "Modal and Daytona are the recommended serverless backends",
      "Costs nearly nothing between sessions since the environment sleeps",
      "Great for personal use — you only pay when the agent is actually working",
      "Nous Portal subscription covers models, web search, image generation and more",
    ],
  },
];

const CHEAT_SHEET = [
  { cmd: "hermes start", desc: "Start chatting" },
  { cmd: "hermes model", desc: "Pick your AI model" },
  { cmd: "hermes gateway start", desc: "Start the messaging bot" },
  { cmd: "hermes doctor", desc: "Fix problems" },
  { cmd: "hermes update", desc: "Get the latest version" },
  { cmd: "hermes setup", desc: "Initial setup wizard" },
  { cmd: "hermes setup --portal", desc: "Use Nous Portal (one subscription)" },
  { cmd: "hermes profile create [name]", desc: "Create a new agent profile" },
  { cmd: "hermes gateway setup", desc: "Configure messaging platforms" },
  { cmd: "hermes gateway status", desc: "Check gateway status" },
  { cmd: "hermes cron \"[schedule]\"", desc: "Schedule a recurring task" },
  { cmd: "/new", desc: "Fresh conversation" },
  { cmd: "/skills", desc: "See your skills" },
];

const INSTALL_COMMANDS = {
  mac_linux: "curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash",
  windows: "iex (irm https://hermes-agent.nousresearch.com/install.ps1)",
};

/* ─── Main Component ─── */
export default function AutomationPage() {
  const [activeBlueprint, setActiveBlueprint] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"blueprints" | "cheat-sheet" | "install">("blueprints");
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [hermesInstalled, setHermesInstalled] = useState<boolean | null>(null);
  const [gatewayRunning, setGatewayRunning] = useState<boolean | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const tabs = [
    { id: "blueprints" as const, label: "Blueprints", icon: <Zap size={16} /> },
    { id: "cheat-sheet" as const, label: "Command Cheat Sheet", icon: <Terminal size={16} /> },
    { id: "install" as const, label: "Install & Setup", icon: <Download size={16} /> },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto p-6">
        <PageNav />

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Zap className="text-[var(--yellow)]" size={28} />
            Automation Blueprints
          </h1>
          <p className="text-[var(--text-secondary)]">
            5 automation patterns for Hermes Agent — cron jobs, messaging bots, agent teams, self-improvement, and parallel workers.
          </p>
          <div className="flex items-center gap-3 mt-3">
            <a
              href="https://hermes-agent.nousresearch.com/docs/guides/automation-templates"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[var(--accent)] hover:underline"
            >
              <ExternalLink size={12} /> Hermes Automation Docs
            </a>
            <a
              href="https://github.com/NousResearch/hermes-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[var(--accent)] hover:underline"
            >
              <ExternalLink size={12} /> GitHub Repository
            </a>
          </div>
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
          {/* ─── BLUEPRINTS TAB ─── */}
          {activeTab === "blueprints" && (
            <motion.div
              key="blueprints"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {/* Blueprint Cards */}
              {BLUEPRINTS.map((bp) => {
                const isActive = activeBlueprint === bp.id;
                return (
                  <div
                    key={bp.id}
                    className="glow-border rounded-xl bg-[var(--bg-card)] overflow-hidden"
                  >
                    <button
                      onClick={() => setActiveBlueprint(isActive ? null : bp.id)}
                      className="w-full flex items-center gap-4 p-5 text-left hover:bg-[var(--bg-card-hover)] transition-colors"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${bp.color}20`, color: bp.color }}
                      >
                        {bp.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className="text-xs font-bold px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: `${bp.color}20`, color: bp.color }}
                          >
                            {bp.number === 0 ? "BONUS" : `BP #${bp.number}`}
                          </span>
                          <h3 className="font-semibold">{bp.title}</h3>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)]">{bp.subtitle}</p>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`text-[var(--text-secondary)] transition-transform shrink-0 ${isActive ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 space-y-5">
                            {/* Description */}
                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                              {bp.description}
                            </p>

                            {/* Steps */}
                            <div>
                              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                <Play size={14} className="text-[var(--accent)]" />
                                How to set up
                              </h4>
                              <div className="space-y-2">
                                {bp.steps.map((step, i) => (
                                  <div key={i} className="flex items-start gap-3">
                                    <div
                                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                                      style={{ backgroundColor: `${bp.color}20`, color: bp.color }}
                                    >
                                      {i + 1}
                                    </div>
                                    <p className="text-sm text-[var(--text-secondary)]">{step}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Commands */}
                            <div>
                              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                <Terminal size={14} className="text-[var(--yellow)]" />
                                Commands
                              </h4>
                              <div className="space-y-2">
                                {bp.commands.map((c, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center gap-2 bg-[var(--bg-primary)] rounded-lg p-3 group"
                                  >
                                    <code className="flex-1 text-sm font-mono text-[var(--accent)] overflow-x-auto">
                                      {c.cmd}
                                    </code>
                                    <span className="text-xs text-[var(--text-secondary)] shrink-0 hidden sm:block">
                                      {c.desc}
                                    </span>
                                    <button
                                      onClick={() => copyToClipboard(c.cmd)}
                                      className="shrink-0 p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors opacity-0 group-hover:opacity-100"
                                      title="Copy command"
                                    >
                                      {copiedCmd === c.cmd ? (
                                        <Check size={14} className="text-[var(--green)]" />
                                      ) : (
                                        <Copy size={14} />
                                      )}
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Tips */}
                            <div>
                              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                <Wrench size={14} className="text-[var(--green)]" />
                                Pro Tips
                              </h4>
                              <div className="space-y-1.5">
                                {bp.tips.map((tip, i) => (
                                  <div key={i} className="flex items-start gap-2">
                                    <CheckCircle2 size={14} className="text-[var(--green)] shrink-0 mt-0.5" />
                                    <p className="text-sm text-[var(--text-secondary)]">{tip}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* ─── CHEAT SHEET TAB ─── */}
          {activeTab === "cheat-sheet" && (
            <motion.div
              key="cheat-sheet"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Terminal size={18} className="text-[var(--yellow)]" />
                  Hermes Command Cheat Sheet
                </h2>
                <div className="space-y-2">
                  {CHEAT_SHEET.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-[var(--bg-primary)] rounded-lg p-3 group"
                    >
                      <code className="flex-1 text-sm font-mono text-[var(--accent)]">
                        {item.cmd}
                      </code>
                      <span className="text-xs text-[var(--text-secondary)] shrink-0 hidden sm:block">
                        {item.desc}
                      </span>
                      <button
                        onClick={() => copyToClipboard(item.cmd)}
                        className="shrink-0 p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors opacity-0 group-hover:opacity-100"
                        title="Copy command"
                      >
                        {copiedCmd === item.cmd ? (
                          <Check size={14} className="text-[var(--green)]" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Reference Card */}
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-5 mt-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Bot size={16} className="text-[var(--accent)]" />
                  Quick Reference
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[var(--bg-primary)] rounded-lg p-4">
                    <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                      Getting Started
                    </div>
                    <div className="space-y-1 text-sm">
                      <p><code className="text-[var(--accent)]">hermes setup</code> — Initial setup</p>
                      <p><code className="text-[var(--accent)]">hermes start</code> — Start chatting</p>
                      <p><code className="text-[var(--accent)]">hermes model</code> — Pick model</p>
                    </div>
                  </div>
                  <div className="bg-[var(--bg-primary)] rounded-lg p-4">
                    <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                      Messaging
                    </div>
                    <div className="space-y-1 text-sm">
                      <p><code className="text-[var(--accent)]">hermes gateway setup</code> — Configure</p>
                      <p><code className="text-[var(--accent)]">hermes gateway start</code> — Start bot</p>
                      <p><code className="text-[var(--accent)]">hermes gateway status</code> — Status</p>
                    </div>
                  </div>
                  <div className="bg-[var(--bg-primary)] rounded-lg p-4">
                    <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                      Automation
                    </div>
                    <div className="space-y-1 text-sm">
                      <p><code className="text-[var(--accent)]">hermes cron &quot;...&quot;</code> — Schedule</p>
                      <p><code className="text-[var(--accent)]">hermes profile create</code> — New agent</p>
                      <p><code className="text-[var(--accent)]">/skills</code> — List skills</p>
                    </div>
                  </div>
                  <div className="bg-[var(--bg-primary)] rounded-lg p-4">
                    <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                      Maintenance
                    </div>
                    <div className="space-y-1 text-sm">
                      <p><code className="text-[var(--accent)]">hermes doctor</code> — Fix issues</p>
                      <p><code className="text-[var(--accent)]">hermes update</code> — Update</p>
                      <p><code className="text-[var(--accent)]">/new</code> — Fresh chat</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── INSTALL TAB ─── */}
          {activeTab === "install" && (
            <motion.div
              key="install"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 max-w-3xl"
            >
              {/* Step 0: Install */}
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Download size={18} className="text-[var(--accent)]" />
                  Step 0: Install Hermes Agent
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Hermes is free and open source by Nous Research. Runs on Mac, Linux, or Windows (WSL2).
                </p>

                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium mb-1.5 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[var(--bg-primary)] text-xs">Mac / Linux / WSL2</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[var(--bg-primary)] rounded-lg p-3 group">
                      <code className="flex-1 text-sm font-mono text-[var(--accent)] overflow-x-auto">
                        {INSTALL_COMMANDS.mac_linux}
                      </code>
                      <button
                        onClick={() => copyToClipboard(INSTALL_COMMANDS.mac_linux)}
                        className="shrink-0 p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                      >
                        {copiedCmd === INSTALL_COMMANDS.mac_linux ? (
                          <Check size={14} className="text-[var(--green)]" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-1.5 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[var(--bg-primary)] text-xs">Windows (PowerShell)</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[var(--bg-primary)] rounded-lg p-3 group">
                      <code className="flex-1 text-sm font-mono text-[var(--accent)] overflow-x-auto">
                        {INSTALL_COMMANDS.windows}
                      </code>
                      <button
                        onClick={() => copyToClipboard(INSTALL_COMMANDS.windows)}
                        className="shrink-0 p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                      >
                        {copiedCmd === INSTALL_COMMANDS.windows ? (
                          <Check size={14} className="text-[var(--green)]" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Setup */}
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Wrench size={18} className="text-[var(--yellow)]" />
                  Initial Setup
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center text-xs font-bold shrink-0">1</div>
                    <div>
                      <p className="text-sm font-medium">Run the setup wizard</p>
                      <div className="flex items-center gap-2 bg-[var(--bg-primary)] rounded-lg p-2 mt-1">
                        <code className="text-sm font-mono text-[var(--accent)]">hermes setup</code>
                        <button onClick={() => copyToClipboard("hermes setup")} className="p-1 text-[var(--text-secondary)] hover:text-[var(--accent)]">
                          {copiedCmd === "hermes setup" ? <Check size={12} className="text-[var(--green)]" /> : <Copy size={12} />}
                        </button>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">Pick your model and add API keys</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center text-xs font-bold shrink-0">2</div>
                    <div>
                      <p className="text-sm font-medium">Or use Nous Portal (recommended)</p>
                      <div className="flex items-center gap-2 bg-[var(--bg-primary)] rounded-lg p-2 mt-1">
                        <code className="text-sm font-mono text-[var(--accent)]">hermes setup --portal</code>
                        <button onClick={() => copyToClipboard("hermes setup --portal")} className="p-1 text-[var(--text-secondary)] hover:text-[var(--accent)]">
                          {copiedCmd === "hermes setup --portal" ? <Check size={12} className="text-[var(--green)]" /> : <Copy size={12} />}
                        </button>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">One subscription covers models, web search, image generation, and more</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center text-xs font-bold shrink-0">3</div>
                    <div>
                      <p className="text-sm font-medium">Start chatting</p>
                      <div className="flex items-center gap-2 bg-[var(--bg-primary)] rounded-lg p-2 mt-1">
                        <code className="text-sm font-mono text-[var(--accent)]">hermes start</code>
                        <button onClick={() => copyToClipboard("hermes start")} className="p-1 text-[var(--text-secondary)] hover:text-[var(--accent)]">
                          {copiedCmd === "hermes start" ? <Check size={12} className="text-[var(--green)]" /> : <Copy size={12} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deployment Options */}
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Server size={18} className="text-[var(--green)]" />
                  Where to Run Hermes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    {
                      title: "Your Computer",
                      desc: "Free. Runs locally. Good for development and personal use.",
                      icon: <Terminal size={18} />,
                      color: "#6c5ce7",
                    },
                    {
                      title: "$5 VPS",
                      desc: "Cheap cloud server. Runs 24/7. Always available from anywhere.",
                      icon: <Server size={18} />,
                      color: "#0984e3",
                    },
                    {
                      title: "Serverless",
                      desc: "Modal/Daytona. Sleeps when idle. Near-zero cost between sessions.",
                      icon: <Layers size={18} />,
                      color: "#00b894",
                    },
                  ].map((opt) => (
                    <div key={opt.title} className="bg-[var(--bg-primary)] rounded-lg p-4">
                      <div className="mb-2" style={{ color: opt.color }}>{opt.icon}</div>
                      <div className="font-medium text-sm mb-1">{opt.title}</div>
                      <p className="text-xs text-[var(--text-secondary)]">{opt.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                <h2 className="text-lg font-semibold mb-3">Resources</h2>
                <div className="space-y-2">
                  <a
                    href="https://hermes-agent.nousresearch.com/docs/guides/automation-templates"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-primary)] hover:bg-[var(--bg-card-hover)] transition-colors"
                  >
                    <ExternalLink size={16} className="text-[var(--accent)]" />
                    <div>
                      <div className="text-sm font-medium">Hermes Automation Templates</div>
                      <div className="text-xs text-[var(--text-secondary)]">Official documentation</div>
                    </div>
                    <ChevronRight size={14} className="ml-auto text-[var(--text-secondary)]" />
                  </a>
                  <a
                    href="https://github.com/NousResearch/hermes-agent"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-primary)] hover:bg-[var(--bg-card-hover)] transition-colors"
                  >
                    <ExternalLink size={16} className="text-[var(--accent)]" />
                    <div>
                      <div className="text-sm font-medium">GitHub Repository</div>
                      <div className="text-xs text-[var(--text-secondary)]">Source code and issues</div>
                    </div>
                    <ChevronRight size={14} className="ml-auto text-[var(--text-secondary)]" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
