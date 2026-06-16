"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard, Target, BookOpen, Settings, Brain, Zap, Rocket,
  Bot, Cpu, Link2, TrendingUp, Check, ChevronRight, ChevronDown,
  Copy, Terminal, AlertCircle, CheckCircle2, Shield, Play, Layers,
  MessageSquare, Clock, Wrench, ArrowRight, ExternalLink, Server,
  Code, Eye, FileText, Bell, Users, RefreshCw, AlertTriangle, XCircle
} from "lucide-react";

/* ─── Page Nav ─── */
function PageNav() {
  const items = [
    { label: "Mission Control", icon: <LayoutDashboard size={14} />, href: "/" },
    { label: "Getting Started", icon: <Rocket size={14} />, href: "/getting-started" },
    { label: "Memory Engine", icon: <Brain size={14} />, href: "/memory-system" },
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

/* ─── MCP Tools Data ─── */
const MCP_TOOLS = [
  {
    id: "conversations_list",
    name: "conversations_list",
    desc: "Lists all active messaging conversations across connected platforms.",
    icon: <MessageSquare size={16} />,
    color: "#6c5ce7",
    example: "List all active Telegram conversations from the last 7 days.",
    features: ["Filter by platform (Telegram, Discord, Slack)", "Search by conversation name", "Shows all active sessions"],
  },
  {
    id: "conversation_get",
    name: "conversation_get",
    desc: "Gets detailed information about one specific conversation.",
    icon: <FileText size={16} />,
    color: "#0984e3",
    example: "Get full details on the conversation with session key [key].",
    features: ["Returns full conversation metadata", "Session key lookup", "Complete context for a single conversation"],
  },
  {
    id: "messages_read",
    name: "messages_read",
    desc: "Reads recent message history for any conversation.",
    icon: <Eye size={16} />,
    color: "#00b894",
    example: "Read the last 50 messages from my #dev channel in Discord.",
    features: ["Configurable message count", "Works across all platforms", "Returns full message content"],
  },
  {
    id: "attachments_fetch",
    name: "attachments_fetch",
    desc: "Extracts images, files, and media from specific messages.",
    icon: <FileText size={16} />,
    color: "#e056fd",
    example: "Fetch all image attachments from the last 20 messages in my design channel.",
    features: ["Pulls images and files", "Works with any media type", "Batch extraction from message ranges"],
  },
  {
    id: "events_poll",
    name: "events_poll",
    desc: "Polls for new conversation events since a specific point in time.",
    icon: <RefreshCw size={16} />,
    color: "#fdcb6e",
    example: "Poll for all new events across my channels since cursor position 0.",
    features: ["Non-blocking check", "Cursor-based pagination", "Near-real-time event awareness"],
  },
  {
    id: "events_wait",
    name: "events_wait",
    desc: "Waits until a new event arrives — like a live listener.",
    icon: <Bell size={16} />,
    color: "#e17055",
    example: "Wait for the next incoming message on any of my platforms.",
    features: ["Blocking wait for new events", "Live monitoring capability", "Reports immediately on arrival"],
  },
  {
    id: "messages_send",
    name: "messages_send",
    desc: "Sends a message through any connected platform.",
    icon: <MessageSquare size={16} />,
    color: "#6c5ce7",
    example: "Send this status update to telegram:123456: 'Build complete. All tests passed.'",
    features: ["Multi-platform delivery", "Specify platform and target", "Hermes handles the routing"],
  },
  {
    id: "channels_list",
    name: "channels_list",
    desc: "Lists every available messaging target across all platforms.",
    icon: <Users size={16} />,
    color: "#0984e3",
    example: "List all available channels across Telegram, Discord, and Slack.",
    features: ["All platforms in one view", "Shows sendable targets", "Useful for discovering channels"],
  },
  {
    id: "permissions_list_open",
    name: "permissions_list_open",
    desc: "Lists pending approval requests observed during the bridge session.",
    icon: <Shield size={16} />,
    color: "#00b894",
    example: "Show me all pending approval requests that need action.",
    features: ["Human-in-the-loop workflows", "Pending request overview", "Requires manual sign-off"],
  },
  {
    id: "permissions_respond",
    name: "permissions_respond",
    desc: "Allows or denies a pending approval request.",
    icon: <CheckCircle2 size={16} />,
    color: "#e056fd",
    example: "Approve the pending request ID #4421.",
    features: ["Approve or deny requests", "Granular permission control", "Gates sensitive actions"],
  },
];

/* ─── Use Cases ─── */
const USE_CASES = [
  {
    title: "Automated Dev Notifications",
    desc: "Codex finishes writing a feature → automatically sends Slack #dev notification: 'Feature complete. Ready for review.'",
    icon: <Bell size={18} />,
    color: "#6c5ce7",
    tools: ["messages_send", "channels_list"],
  },
  {
    title: "Client Communication Monitoring",
    desc: "Codex monitors Telegram for client messages containing 'urgent' → fires an alert automatically.",
    icon: <Eye size={18} />,
    color: "#0984e3",
    tools: ["events_wait", "messages_read", "messages_send"],
  },
  {
    title: "Automated Status Reports",
    desc: "Every morning, Codex reads 24h of activity → compiles summary → sends to your personal Telegram.",
    icon: <FileText size={18} />,
    color: "#00b894",
    tools: ["messages_read", "conversations_list", "messages_send"],
  },
  {
    title: "Cross-Platform Broadcasting",
    desc: "Type once into Codex → sends to Telegram, Discord, and Slack simultaneously through Hermes.",
    icon: <MessageSquare size={18} />,
    color: "#e056fd",
    tools: ["messages_send", "channels_list"],
  },
  {
    title: "Real-Time Event Monitoring",
    desc: "Product launch: Codex monitors all channels for product mentions → logs and sends hourly summaries.",
    icon: <TrendingUp size={18} />,
    color: "#fdcb6e",
    tools: ["events_poll", "messages_read", "messages_send"],
  },
];

/* ─── SOP Steps ─── */
const SOP_PHASES = [
  {
    num: 1,
    label: "Preparation",
    time: "Once",
    color: "#6c5ce7",
    steps: [
      { label: "Confirm Hermes Agent is installed", cmd: "hermes --version", detail: "If error: reinstall using the official install script." },
      { label: "Install MCP dependencies", cmd: "cd ~/.hermes/hermes-agent && uv pip install -e \".[mcp]\"", detail: "Wait for it to complete." },
      { label: "Confirm Node.js is installed", cmd: "node --version", detail: "Must show v18 or higher." },
      { label: "Confirm npx is available", cmd: "npx --version", detail: "Must return a version number." },
      { label: "Confirm Codex is installed and working", cmd: "", detail: "Open Codex and run a simple task to verify." },
    ],
  },
  {
    num: 2,
    label: "Configuration",
    time: "Once",
    color: "#0984e3",
    steps: [
      { label: "Find Codex's MCP config file location", cmd: "", detail: "Check Codex docs for the exact path on your OS. Usually ~/.codex/config.json." },
      { label: "Open the config file in a text editor", cmd: "", detail: "Make a backup copy before editing." },
      { label: "Add the Hermes MCP server block", cmd: JSON.stringify({ hermes: { command: "hermes", args: ["mcp", "serve"] } }, null, 2), detail: 'Paste into the mcpServers section. Save.' },
      { label: "Restart Codex", cmd: "", detail: "Fully quit and reopen." },
    ],
  },
  {
    num: 3,
    label: "Verification",
    time: "After setup",
    color: "#00b894",
    steps: [
      { label: "Test the connection", cmd: '"List my active Hermes messaging conversations."', detail: "If it returns data — setup is complete. ✅" },
      { label: "Test message sending (optional)", cmd: '"Send a test message to [your channel] saying Hermes MCP test successful."', detail: "Check your platform to confirm receipt." },
      { label: "Document your setup", cmd: "", detail: "Write down config file location and custom paths for future reference." },
    ],
  },
  {
    num: 4,
    label: "Ongoing Use",
    time: "Ongoing",
    color: "#e056fd",
    steps: [
      { label: "Daily: Hermes gateway runs automatically", cmd: "", detail: "Codex starts Hermes as MCP server in the background. No manual action." },
      { label: "Weekly: Reload MCP if config changed", cmd: "/reload-mcp", detail: "Run inside Hermes if you update the config." },
      { label: "Monthly: Check for Hermes updates", cmd: "", detail: "Check GitHub for new versions." },
      { label: "As needed: Add new MCP servers", cmd: "", detail: "Expand capabilities by adding more MCP servers to Hermes config." },
    ],
  },
];

/* ─── Troubleshooting ─── */
const TROUBLESHOOTING = [
  {
    problem: "Codex Can't Find Hermes",
    checks: [
      "Is the hermes command available globally? Run hermes --version",
      "Did you save the config file after adding the mcpServers block?",
      "Did you restart Codex after editing the config?",
    ],
  },
  {
    problem: "Hermes Connects But Shows No Conversations",
    checks: [
      "Has Hermes been used as a messaging gateway before? No connected platforms = no conversations.",
      "Are the sessions files in the right place? Run: ls ~/.hermes/sessions/",
      "If the folder is empty, set up your platform connections first.",
    ],
  },
  {
    problem: "Messages Fail To Send",
    checks: [
      "Is the Hermes gateway actively running?",
      "Reading conversations does NOT require the gateway.",
      "Sending messages DOES require the gateway.",
      "Open a separate terminal and run hermes chat to start the gateway.",
    ],
  },
  {
    problem: "MCP Tools Not Appearing In Codex",
    checks: [
      'Run uv pip install -e ".[mcp]" in the Hermes directory to confirm MCP deps.',
      "Verify node --version and npx --version both return version numbers.",
      "Restart Codex completely — fully quit and reopen, not just close the window.",
    ],
  },
];

/* ─── Limiting Beliefs ─── */
const BELIEFS = [
  { wrong: "I'm not a coder. This is too technical for me.", right: "If you can copy and paste text, you can set this up. One config file, a few lines, no coding required." },
  { wrong: "AI agents are for big companies with big budgets.", right: "The smallest businesses benefit the MOST — because they can't afford big teams. One agent stack replaces hours of manual work daily." },
  { wrong: "I'll set this up later when I have more time.", right: "Every day you wait is a day your competitors pull further ahead. Six months in AI is like 5 years in any other space." },
  { wrong: "Hermes Agent is just another chatbot.", right: "A chatbot answers questions. Hermes sends messages, reads files, writes code, queries databases, and connects to dozens of tools. It's a digital employee." },
  { wrong: "I already use ChatGPT, I don't need another tool.", right: "ChatGPT talks. Hermes + Codex actually does things. That's the difference between a consultant and a full-time employee." },
  { wrong: "MCP sounds complicated and confusing.", right: "MCP is just a list of tools you want your AI to use. Add 4 lines to a config file. Now your AI can use GitHub. That's it." },
  { wrong: "I need to hire a developer to build this.", right: "This guide is everything you need. Every command is copy-paste ready. If you can follow a recipe, you can build this." },
  { wrong: "AI tools are unreliable and break all the time.", right: "Hermes has built-in fallbacks, rate limiting, timeout controls, and error handling. Built for production use in real businesses." },
  { wrong: "I don't have anything to automate.", right: "Every business has repetitive tasks. Research, outreach, code reviews, content summaries, file management — all automatable." },
  { wrong: "The results people share online are fake or cherry-picked.", right: "155+ pages of documented, real results from real members — teachers, agency owners, freelancers, ecommerce sellers.", },
];

/* ─── Prompt Categories ─── */
const PROMPT_CATEGORIES = [
  { id: "messaging", label: "Messaging & Communication", icon: <MessageSquare size={14} />, count: 15 },
  { id: "events", label: "Event Monitoring", icon: <Bell size={14} />, count: 10 },
  { id: "development", label: "Development & Code", icon: <Code size={14} />, count: 10 },
  { id: "reporting", label: "Reporting & Summaries", icon: <FileText size={14} />, count: 10 },
  { id: "approvals", label: "Approvals & Permissions", icon: <Shield size={14} />, count: 10 },
  { id: "automation", label: "Automation Workflows", icon: <Zap size={14} />, count: 10 },
  { id: "files", label: "Files & Resources", icon: <FileText size={14} />, count: 5 },
  { id: "multiplatform", label: "Multi-Platform", icon: <Users size={14} />, count: 10 },
  { id: "security", label: "Security & Control", icon: <Shield size={14} />, count: 5 },
  { id: "maintenance", label: "Maintenance & Setup", icon: <Wrench size={14} />, count: 10 },
  { id: "creative", label: "Creative Business", icon: <TrendingUp size={14} />, count: 15 },
];

/* ─── Main Component ─── */
export default function GoldieStackPage() {
  const [activeTab, setActiveTab] = useState<"framework" | "setup" | "tools" | "usecases" | "prompts" | "roadmap" | "troubleshooting" | "beliefs">("framework");
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);
  const [selectedPromptCat, setSelectedPromptCat] = useState<string | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyToClipboard = (text: string, idx?: number) => {
    navigator.clipboard.writeText(text);
    if (idx !== undefined) setCopiedIdx(idx);
    else setCopiedCmd(text);
    setTimeout(() => { setCopiedIdx(null); setCopiedCmd(null); }, 2000);
  };

  const tabs = [
    { id: "framework" as const, label: "Framework", icon: <Layers size={16} /> },
    { id: "setup" as const, label: "Setup Guide", icon: <Play size={16} /> },
    { id: "tools" as const, label: "10 MCP Tools", icon: <Wrench size={16} /> },
    { id: "usecases" as const, label: "Use Cases", icon: <TrendingUp size={16} /> },
    { id: "prompts" as const, label: "110+ Prompts", icon: <MessageSquare size={16} /> },
    { id: "roadmap" as const, label: "30-Day Plan", icon: <Clock size={16} /> },
    { id: "troubleshooting" as const, label: "Troubleshooting", icon: <AlertTriangle size={16} /> },
    { id: "beliefs" as const, label: "Mindset", icon: <Shield size={16} /> },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto p-6">
        <PageNav />

        {/* Hero */}
        <div className="mb-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium mb-4"
          >
            <Layers size={14} /> The Goldie Stack Framework™
          </motion.div>
          <h1 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Hermes + Codex + MCP
            </span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-2">
            The Complete AI Power Stack Guide — Connect everything. Automate the boring stuff. Build once, profit forever.
          </p>
          <p className="text-sm text-[var(--text-secondary)] italic max-w-xl mx-auto">
            &quot;The people who win in the next 5 years won&apos;t be the ones who work harder. They&apos;ll be the ones who figured out how to make AI agents do the work for them.&quot;
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

          {/* ─── FRAMEWORK TAB ─── */}
          {activeTab === "framework" && (
            <motion.div key="framework" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              {/* 4 Layers */}
              <h2 className="text-xl font-bold text-center mb-2">The 4-Layer System</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { layer: 1, title: "The Brain", sub: "Hermes Agent", icon: <Bot size={24} />, color: "#6c5ce7", desc: "The smart brain in the middle of everything. Talks to other tools, reads files, writes code, sends messages, takes actions. Not just answering questions — actually DOING things.", emoji: "🧠" },
                  { layer: 2, title: "The Hands", sub: "MCP", icon: <Link2 size={24} />, color: "#0984e3", desc: "Model Context Protocol — gives your AI brain a pair of hands. Without MCP, AI can think but can't touch anything. With MCP, AI reaches into GitHub, Stripe, databases, and hundreds of tools.", emoji: "🤝" },
                  { layer: 3, title: "The Builder", sub: "Codex", icon: <Code size={24} />, color: "#00b894", desc: "OpenAI's coding agent. Reads, writes, and fixes code automatically. Connected to Hermes via MCP, it gets superpowers — messaging, conversation history, platform interaction.", emoji: "🔨" },
                  { layer: 4, title: "The Output", sub: "Business Automation", icon: <TrendingUp size={24} />, color: "#fdcb6e", desc: "When all 3 layers work together: SEO done automatically, content researched automatically, outreach sent automatically, code written and fixed automatically.", emoji: "💰" },
                ].map((item) => (
                  <motion.div key={item.layer} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: item.layer * 0.1 }}
                    className="glow-border rounded-xl bg-[var(--bg-card)] p-5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-3xl">{item.emoji}</div>
                      <div>
                        <div className="text-xs font-bold" style={{ color: item.color }}>Layer {item.layer}</div>
                        <div className="font-bold text-lg">{item.title}</div>
                        <div className="text-xs text-[var(--text-secondary)]">{item.sub}</div>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* 5 Principles */}
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h2 className="text-lg font-bold mb-4 text-center">The 5 Principles</h2>
                <div className="space-y-4">
                  {[
                    { num: 1, title: "Connect Everything", desc: "Old way: one tool at a time, copy-paste manually. Goldie Stack: all tools talk to each other automatically. Hermes + MCP + Codex is the foundation.", icon: <Link2 size={16} />, color: "#6c5ce7" },
                    { num: 2, title: "Automate the Boring Stuff First", desc: "Old way: 80% of time on tasks that don't grow your business. Goldie Stack: automate 80% in week one, focus 100% on growth.", icon: <Zap size={16} />, color: "#0984e3" },
                    { num: 3, title: "Agents Compound", desc: "Old way: one human, one task, one result. Goldie Stack: one agent triggers another, which triggers another — full workflow, zero manual input.", icon: <Layers size={16} />, color: "#00b894" },
                    { num: 4, title: "Build Once, Profit Forever", desc: "Old way: do the work manually every day. Goldie Stack: set up once, let it run forever. MCP config takes 30 minutes.", icon: <CheckCircle2 size={16} />, color: "#e056fd" },
                    { num: 5, title: "Stay In the Loop, Get Out of the Way", desc: "Old way: micromanage every task. Goldie Stack: set guardrails, let agents work, review outputs. You stay in control without the manual labour.", icon: <Shield size={16} />, color: "#fdcb6e" },
                  ].map((p) => (
                    <div key={p.num} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${p.color}20`, color: p.color }}>
                        {p.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-sm flex items-center gap-2">
                          <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${p.color}20`, color: p.color }}>P{p.num}</span>
                          {p.title}
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] mt-0.5">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What Each Tool Is */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "Hermes Agent", by: "Nous Research", desc: "AI assistant that does things — not just answers questions. Reads files, sends messages, writes code, connects to GitHub, Stripe, databases.", color: "#6c5ce7", url: "https://hermes-agent.nousresearch.com" },
                  { name: "Codex", by: "OpenAI", desc: "Coding agent that reads, writes, finds bugs, fixes bugs, runs tests. Understands dozens of programming languages. On its own: only coding. With Hermes: full communication agent.", color: "#00b894", url: "https://openai.com/codex" },
                  { name: "MCP", by: "Standard Protocol", desc: "Model Context Protocol — universal plug socket for AI. Your AI is the device, tools are power sources, MCP is the socket. Without it: isolated. With it: connected to everything.", color: "#0984e3", url: "https://modelcontextprotocol.io" },
                ].map((tool) => (
                  <div key={tool.name} className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                    <div className="font-bold mb-1" style={{ color: tool.color }}>{tool.name}</div>
                    <div className="text-xs text-[var(--text-secondary)] mb-2">by {tool.by}</div>
                    <p className="text-sm text-[var(--text-secondary)] mb-3">{tool.desc}</p>
                    <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline flex items-center gap-1" style={{ color: tool.color }}>
                      <ExternalLink size={12} /> Learn more
                    </a>
                  </div>
                ))}
              </div>

              {/* The Magic */}
              <div className="bg-gradient-to-r from-[var(--accent)]/10 to-[var(--green)]/10 border border-[var(--accent)]/20 rounded-xl p-6 text-center">
                <h3 className="text-lg font-bold mb-2">✨ What Happens When You Connect Them</h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto mb-4">
                  Codex can suddenly list all your messaging conversations, read message history from any platform, send messages through Telegram/Discord/Slack, and monitor live events. You now have a coding agent that is also a <strong>communication agent</strong>.
                </p>
                <div className="flex items-center justify-center gap-2 flex-wrap text-sm">
                  <span className="px-3 py-1 rounded-lg bg-[var(--purple)]/10 text-[var(--purple)]">Hermes</span>
                  <span>+</span>
                  <span className="px-3 py-1 rounded-lg bg-[var(--blue)]/10 text-[var(--blue)]">MCP</span>
                  <span>+</span>
                  <span className="px-3 py-1 rounded-lg bg-[var(--green)]/10 text-[var(--green)]">Codex</span>
                  <ArrowRight size={16} />
                  <span className="px-3 py-1 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] font-bold">Full AI Power Stack</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── SETUP GUIDE TAB ─── */}
          {activeTab === "setup" && (
            <motion.div key="setup" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">Complete Setup SOP — Hermes + Codex MCP Integration</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4">Time required: 30-45 minutes for initial setup. Follow each phase in order.</p>

              {SOP_PHASES.map((phase) => {
                const isExpanded = expandedPhase === phase.num;
                return (
                  <div key={phase.num} className="glow-border rounded-xl bg-[var(--bg-card)] overflow-hidden">
                    <button onClick={() => setExpandedPhase(isExpanded ? null : phase.num)}
                      className="w-full flex items-center gap-3 p-4 text-left hover:bg-[var(--bg-card-hover)] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${phase.color}20`, color: phase.color }}>
                        <span className="text-sm font-bold">{phase.num}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">Phase {phase.num}: {phase.label} <span className="text-xs text-[var(--text-secondary)]">({phase.time})</span></div>
                        <div className="text-xs text-[var(--text-secondary)]">{phase.steps.length} steps</div>
                      </div>
                      <ChevronDown size={16} className={`text-[var(--text-secondary)] transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="px-4 pb-4 space-y-3">
                            {phase.steps.map((step, i) => (
                              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-primary)]">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5" style={{ backgroundColor: `${phase.color}20`, color: phase.color }}>
                                  {i + 1}
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-medium">{step.label}</div>
                                  {step.cmd && (
                                    <div className="flex items-center gap-2 mt-1 bg-[var(--bg-secondary)] rounded-lg p-2">
                                      <code className="text-xs font-mono text-[var(--accent)] flex-1 overflow-x-auto">{step.cmd}</code>
                                      <button onClick={() => copyToClipboard(step.cmd)} className="shrink-0 p-1 text-[var(--text-secondary)] hover:text-[var(--accent)]">
                                        {copiedCmd === step.cmd ? <Check size={12} className="text-[var(--green)]" /> : <Copy size={12} />}
                                      </button>
                                    </div>
                                  )}
                                  <div className="text-xs text-[var(--text-secondary)] mt-1">{step.detail}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Prerequisites */}
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                <h3 className="font-semibold mb-3">✅ Prerequisites Checklist</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    "Hermes Agent installed",
                    "Node.js v18+ installed",
                    "npm or npx available",
                    "Codex set up and working",
                    "Python and uv package manager",
                    "Text editor (even Notepad works)",
                    "30-60 minutes uninterrupted time",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <CheckCircle2 size={14} className="text-[var(--green)] shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── 10 MCP TOOLS TAB ─── */}
          {activeTab === "tools" && (
            <motion.div key="tools" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">The 10 Tools Codex Unlocks Through Hermes</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4">Each tool becomes available in Codex once Hermes is connected as an MCP server.</p>

              {MCP_TOOLS.map((tool) => (
                <div key={tool.id} className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${tool.color}20`, color: tool.color }}>
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="text-sm font-bold" style={{ color: tool.color }}>{tool.name}</code>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] mb-3">{tool.desc}</p>
                      <div className="bg-[var(--bg-primary)] rounded-lg p-3 mb-3">
                        <div className="text-xs text-[var(--text-secondary)] mb-1">Example prompt:</div>
                        <code className="text-sm text-[var(--accent)]">&quot;{tool.example}&quot;</code>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tool.features.map((f) => (
                          <span key={f} className="text-xs px-2 py-1 rounded-full bg-[var(--bg-primary)] text-[var(--text-secondary)]">{f}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* ─── USE CASES TAB ─── */}
          {activeTab === "usecases" && (
            <motion.div key="usecases" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">Real Business Use Cases</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4">Practical examples of Hermes + Codex working together in real businesses.</p>

              {USE_CASES.map((uc) => (
                <div key={uc.title} className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${uc.color}20`, color: uc.color }}>
                      {uc.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{uc.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-3">{uc.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {uc.tools.map((t) => {
                          const tool = MCP_TOOLS.find((mt) => mt.id === t);
                          return (
                            <span key={t} className="text-xs px-2 py-1 rounded-full bg-[var(--bg-primary)] text-[var(--text-secondary)] flex items-center gap-1">
                              <Wrench size={10} /> {tool?.name || t}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Business Case */}
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h3 className="font-semibold mb-3">💰 The Business Case</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "Agency Owners", desc: "Team gets automatic updates the moment code changes happen. No manual checking.", icon: <Users size={18} />, color: "#6c5ce7" },
                    { title: "Content Creators", desc: "Content workflows trigger cross-platform notifications automatically.", icon: <FileText size={18} />, color: "#0984e3" },
                    { title: "Solo Operators", desc: "Power of a full team without the payroll. One person, full automation.", icon: <TrendingUp size={18} />, color: "#00b894" },
                  ].map((item) => (
                    <div key={item.title} className="bg-[var(--bg-primary)] rounded-lg p-4">
                      <div className="mb-2" style={{ color: item.color }}>{item.icon}</div>
                      <div className="font-medium text-sm mb-1">{item.title}</div>
                      <p className="text-xs text-[var(--text-secondary)]">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Numbers */}
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                <h3 className="font-semibold mb-3">📊 The Numbers Don&apos;t Lie</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { stat: "60-70%", label: "Time saved on repetitive tasks", source: "McKinsey" },
                    { stat: "3x", label: "Faster turnaround on content & dev", source: "AI agent businesses" },
                    { stat: "37%", label: "Annual AI market growth rate", source: "Industry data" },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div className="text-2xl font-bold text-[var(--accent)]">{item.stat}</div>
                      <div className="text-sm text-[var(--text-secondary)]">{item.label}</div>
                      <div className="text-xs text-[var(--text-secondary)] opacity-60">{item.source}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── PROMPTS TAB ─── */}
          {activeTab === "prompts" && (
            <motion.div key="prompts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">110+ Prompts for Hermes + Codex</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4">Use these inside Codex once Hermes is connected via MCP. Click a category to expand.</p>

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
                    <HermesCodexPromptList categoryId={selectedPromptCat} onCopy={copyToClipboard} copiedIdx={copiedIdx} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/*          {/* ─── ROADMAP TAB ─── */}
          {activeTab === "roadmap" && (
            <motion.div key="roadmap" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">30-Day Roadmap: Hermes + Codex in Your Business</h2>

              {[
                { week: 1, title: "Foundation", color: "#6c5ce7", days: [
                  "Install Hermes Agent using the official install script.",
                  "Install Node.js if not already installed. Verify with hermes chat test.",
                  "Connect Hermes to your first platform (Telegram, Discord, or Slack).",
                  "Install MCP support. Verify it completed without errors.",
                  "Add Hermes to Codex config. Restart Codex.",
                  "Test: Ask Codex to list conversations and read messages.",
                  "Test message sending. Celebrate. 🎉 Document your setup.",
                ]},
                { week: 2, title: "First Automations", color: "#0984e3", days: [
                  "Map your repetitive tasks. Highlight messaging, code, and file tasks.",
                  "Build first automated notification (e.g., GitHub issue → Telegram).",
                  "Set up conversation monitoring with events_wait for keywords.",
                  "Build a morning briefing prompt (24h summary → Telegram).",
                  "Add a second MCP server (e.g., GitHub) to Hermes config.",
                  "Connect GitHub + messaging: open issues → Slack summary.",
                  "Review Week 2 results. Post in community.",
                ]},
                { week: 3, title: "Scale Workflows", color: "#00b894", days: [
                  "Add filesystem MCP server. Test reading project files via Codex.",
                  "Build code review + notification workflow.",
                  "Set up cross-platform broadcasting (one message → all platforms).",
                  "Filter MCP tools — remove unused ones for faster AI responses.",
                  "Set up sampling for a custom MCP server if applicable.",
                  "Build client communication tracker (flag urgent/bug keywords).",
                  "Week 3 review: hours saved, biggest impact workflows.",
                ]},
                { week: 4, title: "Profit From Your Stack", color: "#e056fd", days: [
                  "Audit all workflows. Rate: High / Medium / Low impact. Cut low.",
                  "Build your first agent chain (trigger → action → log → summary).",
                  "Document everything for your team (even if solo — future you will thank you).",
                  "Add security controls: disable dangerous tools, add exclude lists.",
                  "Test fallbacks: disable one MCP server, verify Hermes handles it.",
                  "Measure ROI: hours saved × hourly rate = weekly ROI.",
                  "Teach someone else. Plan your next expansion. Set 30-day targets.",
                ]},
              ].map((week) => (
                <div key={week.week} className="glow-border rounded-xl bg-[var(--bg-card)] p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: `${week.color}20`, color: week.color }}>
                      {week.week}
                    </div>
                    <div className="font-medium text-sm">Week {week.week}: {week.title}</div>
                  </div>
                  <div className="space-y-1.5">
                    {week.days.map((day, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 rounded-lg hover:bg-[var(--bg-primary)] transition-colors">
                        <span className="text-xs text-[var(--text-secondary)] w-6 shrink-0">D{i + 1 + (week.week - 1) * 7}</span>
                        <span className="text-sm">{day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* ─── TROUBLESHOOTING TAB ─── */}
          {activeTab === "troubleshooting" && (
            <motion.div key="troubleshooting" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">Troubleshooting Guide</h2>

              {TROUBLESHOOTING.map((item) => (
                <div key={item.problem} className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <XCircle size={16} className="text-red-400" />
                    {item.problem}
                  </h3>
                  <div className="space-y-2">
                    {item.checks.map((check, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <ChevronRight size={14} className="text-[var(--yellow)] shrink-0 mt-0.5" />
                        <p className="text-sm text-[var(--text-secondary)]">{check}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Advanced Config */}
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Wrench size={16} className="text-[var(--accent)]" />
                  Advanced Configuration
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium mb-1">Verbose Mode</div>
                    <div className="flex items-center gap-2 bg-[var(--bg-primary)] rounded-lg p-2">
                      <code className="text-xs font-mono text-[var(--accent)] flex-1">hermes mcp serve --verbose</code>
                      <button onClick={() => copyToClipboard("hermes mcp serve --verbose")} className="p-1 text-[var(--text-secondary)] hover:text-[var(--accent)]">
                        {copiedCmd === "hermes mcp serve --verbose" ? <Check size={12} className="text-[var(--green)]" /> : <Copy size={12} />}
                      </button>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">Outputs debug info to terminal. Useful for troubleshooting.</p>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">How the Event System Works</div>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Hermes maintains a live event bridge. It polls the sessions database every 200ms, maintains an in-memory event queue. Codex gets near-real-time awareness. Read operations don&apos;t need the gateway. Send operations DO need it.
                    </p>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">What Hermes Reads</div>
                    <div className="space-y-1">
                      <code className="text-xs font-mono text-[var(--accent)] block">~/.hermes/sessions/sessions.json</code>
                      <code className="text-xs font-mono text-[var(--accent)] block">~/.hermes/ (SQLite database)</code>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">If either is missing or corrupted, Hermes won&apos;t have data. Always back up your sessions folder.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── BELIEFS TAB ─── */}
          {activeTab === "beliefs" && (
            <motion.div key="beliefs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <div className="text-center mb-4">
                <h2 className="text-lg font-semibold mb-2">Breaking Your Limiting Beliefs</h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  &quot;Your beliefs are either your biggest asset or your biggest liability. Let&apos;s fix that right now.&quot;
                </p>
              </div>

              {BELIEFS.map((item, i) => (
                <div key={i} className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-red-400">{i + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertCircle size={14} className="text-red-400" />
                        <span className="text-xs font-medium text-red-400">WRONG BELIEF</span>
                      </div>
                      <p className="text-sm text-red-400/80 line-through mb-3">{item.wrong}</p>
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 size={14} className="text-[var(--green)]" />
                        <span className="text-xs font-medium text-[var(--green)]">RIGHT BELIEF</span>
                      </div>
                      <p className="text-sm text-[var(--green)]">{item.right}</p>
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

/* ─── Hermes + Codex Prompt List ─── */
function HermesCodexPromptList({ categoryId, onCopy, copiedIdx }: { categoryId: string; onCopy: (text: string, idx: number) => void; copiedIdx: number | null }) {
  const prompts: Record<string, string[]> = {
    messaging: [
      "List all active conversations across my connected platforms.",
      "Show me all conversations that have had a message in the last 24 hours.",
      "Read the last 20 messages from my #general Discord channel.",
      "Read the last 50 messages from my main Telegram group.",
      "Send a message to telegram:123456 saying 'System check complete — all green.'",
      "Send the same message to all my Discord channels simultaneously.",
      "List all available messaging channels I can send to.",
      "Find any conversations that mention the word 'urgent' in the last 48 hours.",
      "Summarise all messages from the last 7 days in my #dev channel.",
      "Find all messages from user [name] in the last 30 days.",
      "List all conversations that have unread messages.",
      "Send a broadcast announcement to Telegram, Discord, and Slack at once.",
      "Read message history from my private DM channel with [contact name].",
      "Find all messages that contain a link or URL from the last week.",
      "Draft and send a weekly update to my team channel with a summary of this week's progress.",
    ],
    events: [
      "Poll for all new events across my platforms since the last check.",
      "Wait for the next incoming message on any of my channels.",
      "Monitor my #support channel and alert me when someone asks a question.",
      "Set up a listener for messages containing the keyword 'bug report'.",
      "Wait for the next approval request and notify me when it arrives.",
      "Poll for new events every 5 minutes and log any that mention my product name.",
      "Monitor my Telegram group for new members joining and log their usernames.",
      "Wait for any message in #dev that contains the word 'error' and send me an alert.",
      "Poll for all events in the last hour and give me a summary.",
      "Monitor all channels simultaneously and flag any messages marked as high priority.",
    ],
    development: [
      "After fixing this bug, send a summary to my #dev Slack channel.",
      "When you complete a code review, send the results to telegram:123456.",
      "Read the last 10 messages from #dev to understand the current issue before starting.",
      "After writing the new feature, announce it in the #releases Discord channel.",
      "Pull the conversation history from #dev to see what the team discussed about this function.",
      "Send a message to #testing when the unit tests pass.",
      "If tests fail, send a detailed error report to my private Telegram.",
      "Read the #bugs channel, list all reported issues, and create a priority-ranked fix list.",
      "After completing the deployment, broadcast a status update to all channels.",
      "Read the last 30 messages from #code-review and summarise all feedback given.",
    ],
    reporting: [
      "Give me a full summary of all conversations from the last 24 hours.",
      "Create a morning briefing from all overnight messages across my platforms.",
      "Summarise the top 5 most active conversations from this week.",
      "Generate a weekly communication report showing message volume per channel.",
      "Identify the most frequently asked questions across all my support channels this month.",
      "Summarise all decisions made in my #team channel over the last 7 days.",
      "Create an end-of-day report covering all messages received and sent today.",
      "Identify which channels had the highest engagement this week.",
      "Summarise all feedback received across all platforms in the last 30 days.",
      "Create a client communication summary for [client name] covering the last 90 days.",
    ],
    approvals: [
      "List all pending approval requests waiting for my review.",
      "Approve all pending requests from trusted users.",
      "Deny any pending requests that involve deleting data.",
      "Show me the details of approval request #ID before I respond.",
      "Set up a workflow where any send action requires my approval first.",
      "List all approval requests from the last 7 days and their current status.",
      "Approve the request to send a message to channel #announcements.",
      "Deny any approval requests that involve external platforms I haven't whitelisted.",
      "Send me a notification every time a new approval request comes in.",
      "Review and respond to all pending approvals at once.",
    ],
    automation: [
      "When a new GitHub issue is created, send a summary to my #dev Telegram channel.",
      "Every morning at 8am, send me a briefing of overnight messages.",
      "When someone messages me on Telegram, log it to my tracking file.",
      "If a message contains 'payment failed', immediately alert me on my personal Telegram.",
      "Monitor my support channel and auto-respond to FAQs using my knowledge base.",
      "When a new file is added to my project folder, send a notification to #updates.",
      "Create a daily digest of all unread messages and send it to my Telegram at 6pm.",
      "When Codex completes a task, automatically send a completion notice to my team.",
      "If any message mentions my competitor's name, alert me immediately.",
      "At the end of each week, send a summary of all completed tasks to my Slack.",
    ],
    files: [
      "Fetch all image attachments from the last 50 messages in #design.",
      "Extract all document attachments shared in #resources this month.",
      "List all media files sent in #marketing over the last 30 days.",
      "Download all attachments from my conversation with [client name].",
      "Find all messages that contain PDF attachments and list them.",
    ],
    multiplatform: [
      "Show me a complete view of all platforms Hermes is connected to.",
      "Compare message volume across Telegram vs Discord vs Slack this week.",
      "Identify which platform has the most active conversations.",
      "Send a test message to every connected platform simultaneously.",
      "List every available messaging target across all platforms.",
      "Find conversations that are active on multiple platforms about the same topic.",
      "Create a unified inbox summary across all platforms.",
      "Which platform had the most messages yesterday?",
      "Identify any conversations on one platform that should be mirrored to another.",
      "Send my weekly newsletter update to all connected platforms at once.",
    ],
    security: [
      "List all MCP tools currently available to Codex through Hermes.",
      "Disable the delete_customer tool on my Stripe MCP server.",
      "Review which tools are enabled and flag any that seem risky.",
      "Show me all environment variables being passed to my MCP servers.",
      "Test the connection to each MCP server and report status.",
    ],
    maintenance: [
      "Reload all MCP servers from the current config.",
      "Test the Hermes MCP connection and report any issues.",
      "Show me the current status of all connected MCP servers.",
      "List all registered MCP tools from all connected servers.",
      "Run a health check on all platform connections.",
      "Verify the filesystem MCP server is working by listing the /tmp directory.",
      "Check the GitHub MCP server can list issues correctly.",
      "Test the Stripe MCP server by looking up the last 3 transactions.",
      "Verify that Hermes can send messages on all connected platforms.",
      "Confirm that event polling is working and returning live data.",
    ],
    creative: [
      "Monitor my client channels for any messages that sound frustrated or negative.",
      "Track all mentions of pricing or payment in my conversations this week.",
      "Find the last time each of my clients sent me a message and flag anyone overdue.",
      "Create a lead follow-up message and send it to every contact who hasn't replied in 7 days.",
      "Scan my #feedback channel and extract all product improvement suggestions.",
      "Send a personalised check-in message to each of my top 10 clients.",
      "Monitor my #sales channel and notify me every time a deal is mentioned.",
      "Summarise all objections raised in sales conversations this month.",
      "Read all conversations tagged as 'onboarding' and identify common questions.",
      "Create a customer satisfaction summary from all support conversations this quarter.",
      "Set up an automatic welcome message for every new person who joins my Discord.",
      "Track all action items mentioned in team conversations and compile a master to-do list.",
      "Find all unanswered questions in my support channels and prioritise them.",
      "Monitor competitor mentions across all my channels and log them weekly.",
      "Send an automated thank you message to every client who closed a deal this month.",
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
