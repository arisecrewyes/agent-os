"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard, Target, BookOpen, Settings, Brain, Zap,
  Rocket, Check, ChevronRight, ChevronDown, Copy, Clock,
  Bot, Globe, Cpu, Shield, Sparkles, AlertCircle, CheckCircle2,
  Play, Download, Terminal, ExternalLink, Users, TrendingUp,
  Layers, FolderOpen, Wrench, ArrowRight, Star
} from "lucide-react";

/* ─── Page Nav ─── */
function PageNav() {
  const items = [
    { label: "Mission Control", icon: <LayoutDashboard size={14} />, href: "/" },
    { label: "Memory Engine", icon: <Brain size={14} />, href: "/memory-system" },
    { label: "Automation", icon: <Zap size={14} />, href: "/automation" },
    { label: "Goals", icon: <Target size={14} />, href: "/goals" },
    { label: "Journal", icon: <BookOpen size={14} />, href: "/journal" },
    { label: "Settings", icon: <Settings size={14} />, href: "/settings" },
  ];
  return (
    <div className="flex items-center gap-1 mb-6 flex-wrap">
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

/* ─── SOP Steps ─── */
const SOP_STEPS: SetupStep[] = [
  { id: "s1", label: "Go to openrouter.ai", detail: "Click 'Sign Up' in the top right corner.", phase: 1 },
  { id: "s2", label: "Create your free account", detail: "Sign up using Google or email.", phase: 1 },
  { id: "s3", label: "Go to API Keys", detail: "Click your profile icon → 'API Keys' → 'Create Key'.", phase: 1 },
  { id: "s4", label: "Name it 'Hermes Agent Key'", detail: "Copy the key and save it somewhere safe.", phase: 1 },
  { id: "s5", label: "Search 'Owl Alpha' on OpenRouter", detail: "Confirm it shows $0/M input and $0/M output tokens.", phase: 1 },
  { id: "s6", label: "Note the model string", detail: "openrouter/owl-alpha — you'll need this for Hermes setup.", phase: 1 },
  { id: "s7", label: "Go to Hermes Agent website", detail: "Download from Nous Research (hermes-agent.nousresearch.com).", phase: 2 },
  { id: "s8", label: "Install Hermes Agent", detail: "Follow installation instructions for your OS (Mac, Windows, or Linux).", phase: 2 },
  { id: "s9", label: "Open Hermes → Settings", detail: "Go to Settings or Model Configuration.", phase: 2 },
  { id: "s10", label: "Select OpenRouter as provider", detail: "Paste your OpenRouter API key.", phase: 2 },
  { id: "s11", label: "Set model to openrouter/owl-alpha", detail: "Type or paste the model string.", phase: 2 },
  { id: "s12", label: "Test the connection", detail: "Send a test message. Confirm the response comes through.", phase: 2 },
  { id: "s13", label: "Identify a weekly task", detail: "Pick one task you do every week that takes 30+ minutes.", phase: 3 },
  { id: "s14", label: "Run it in plain English", detail: "Type your task into Hermes using one of the prompts from this guide.", phase: 3 },
  { id: "s15", label: "Review and refine", detail: "Watch the agent work. Refine the prompt and run again if needed.", phase: 3 },
  { id: "s16", label: "Save as reusable template", detail: "Once happy, save the prompt for future use.", phase: 3 },
  { id: "s17", label: "Pick a multi-step process", detail: "Example: research → write → publish.", phase: 4 },
  { id: "s18", label: "Break into individual steps", detail: "Create a separate prompt for each step.", phase: 4 },
  { id: "s19", label: "Chain the steps together", detail: "Feed output of Step 1 into Step 2, and so on.", phase: 4 },
  { id: "s20", label: "Save as scheduled workflow", detail: "Save the full workflow and schedule it to run automatically.", phase: 4 },
  { id: "s21", label: "Add one workflow per week", detail: "Document what works and what doesn't.", phase: 5 },
  { id: "s22", label: "Stack workflows together", detail: "Make agents feed each other's outputs.", phase: 5 },
  { id: "s23", label: "Monthly audit", detail: "Every 30 days, review and remove what isn't working.", phase: 5 },
];

const SOP_PHASES = [
  { num: 1, label: "Set Up OpenRouter", icon: <Globe size={16} />, color: "#0984e3", time: "10 min" },
  { num: 2, label: "Install Hermes Agent", icon: <Bot size={16} />, color: "#6c5ce7", time: "15 min" },
  { num: 3, label: "Run First Task", icon: <Play size={16} />, color: "#00b894", time: "10 min" },
  { num: 4, label: "Build First Workflow", icon: <Layers size={16} />, color: "#e056fd", time: "30 min" },
  { num: 5, label: "Scale", icon: <TrendingUp size={16} />, color: "#fdcb6e", time: "Ongoing" },
];

function generateRoadmap(): RoadmapDay[] {
  const tasks: string[] = [
    // Week 1
    "Create free OpenRouter account. Get API key. Confirm Owl Alpha shows $0.",
    "Install Hermes Agent. Connect to OpenRouter with Owl Alpha. Send test message.",
    "Run your first content task using a prompt from this guide.",
    "Pick one real business task. Have Hermes do it. Review output.",
    "Refine your prompt. Run again. Save the improved prompt.",
    "Explore Hermes's 40+ built-in tools. Enable web search. Run a research task.",
    "Weekly review. What worked? What to automate next?",
    // Week 2
    "Pick a multi-step process (research → write → format). Map it out.",
    "Build Step 1 of your workflow. Test and refine.",
    "Build Step 2. Feed Step 1 output into Step 2.",
    "Build Step 3 if needed. Connect the sequence.",
    "Run the full workflow end to end. Note what breaks.",
    "Fix the breaks. Run again.",
    "Save the full workflow. Schedule it to run automatically once per week.",
    // Week 3
    "Pick a second business task to automate. Build the prompt.",
    "Connect this new task to an output from your Week 2 workflow.",
    "Explore Hermes sub-agents. Have one agent delegate to another.",
    "Build morning briefing automation.",
    "Build competitor monitoring workflow.",
    "Stack content research agent into content writing agent.",
    "Weekly review. How many hours did agents save you?",
    // Week 4
    "Document every workflow. Create an SOP for each.",
    "Build a sales or lead generation agent.",
    "Add analytics monitoring to your agent stack.",
    "Review entire agent stack. Remove what isn't working.",
    "Build one more workflow for your biggest remaining time drain.",
    "Run the full Goldie Infinite Agent Loop™ review. Score yourself.",
    "Calculate time saved this month. Calculate value at your hourly rate.",
    "Set 30-day targets for Month 2.",
  ];
  return tasks.map((task, i) => ({
    day: i + 1,
    task,
    week: Math.floor(i / 7) + 1,
    completed: false,
  }));
}

/* ─── The 3 Tools ─── */
const THREE_TOOLS = [
  {
    name: "Hermes Agent",
    by: "Nous Research",
    tagline: "The engine that does the work",
    desc: "Open-source AI agent that runs persistently — keeps going, remembering, and learning. 40+ built-in tools.",
    features: ["Web search", "Browser automation", "Vision (sees your screen)", "Scheduled automations", "Sub-agents", "Self-improving skills"],
    color: "#6c5ce7",
    url: "https://hermes-agent.nousresearch.com",
    icon: <Bot size={24} />,
  },
  {
    name: "OpenRouter",
    by: "OpenRouter",
    tagline: "The highway that connects everything",
    desc: "One API key to access dozens of AI models. Instead of paying for ChatGPT + Claude + Gemini separately.",
    features: ["One API key for all models", "Some models are completely free", "Easy provider switching", "Transparent pricing"],
    color: "#0984e3",
    url: "https://openrouter.ai",
    icon: <Globe size={24} />,
  },
  {
    name: "Owl Alpha",
    by: "OpenRouter",
    tagline: "Enterprise-grade AI at $0",
    desc: "Released April 28, 2026. High-performance foundation model built specifically for agents.",
    features: ["Natively supports tool use", "1M+ token context", "Strong at code generation", "Built for workflows", "Currently $0/token"],
    color: "#00b894",
    url: "https://openrouter.ai/models/openrouter/owl-alpha",
    icon: <Cpu size={24} />,
  },
];

/* ─── Limiting Beliefs ─── */
const BELIEFS = [
  { wrong: "Free tools are always low quality.", right: "Owl Alpha is engineered for agent workflows and used by Hermes + OpenClaw at billions of tokens/month." },
  { wrong: "I need to be a developer to use AI agents.", right: "Hermes has a UI anyone can use. Type plain English. The agent does the rest." },
  { wrong: "AI agents make mistakes and can't be trusted.", right: "AI agents make mistakes — just like humans. You train them, give processes, and review work." },
  { wrong: "I don't have time to learn new tools.", right: "Hermes saves more time in week one than it takes to set up. Average member saves 10-30 hrs/week." },
  { wrong: "This is just another shiny object — irrelevant in 3 months.", right: "Agent-based AI is foundational infrastructure. This is the new operating system for business." },
  { wrong: "My business is different — AI agents won't work for me.", right: "Members across e-commerce, coaching, agencies, real estate, SaaS, and legal all found tasks to automate." },
  { wrong: "I need a big team or money to benefit.", right: "Solo operators benefit most. Every hour saved is a bigger % of total capacity." },
  { wrong: "Big companies already have a head start I can't catch.", right: "Big companies move slowly — stuck in procurement and legacy systems. You can move today." },
  { wrong: "Owl Alpha being free means it will charge later — I'll wait.", right: "Build workflows NOW while free. When pricing comes, you'll have working systems that pay for themselves." },
  { wrong: "I tried AI before and it didn't work.", right: "You tried an early version of the wrong tool. Hermes + Owl Alpha is a completely different category." },
];

/* ─── Prompt Categories ─── */
const PROMPT_CATEGORIES = [
  { id: "content", label: "Content Creation", icon: <Sparkles size={14} />, count: 10 },
  { id: "email", label: "Email Marketing", icon: <Sparkles size={14} />, count: 10 },
  { id: "seo", label: "SEO & Research", icon: <Sparkles size={14} />, count: 10 },
  { id: "business", label: "Business Automation", icon: <Sparkles size={14} />, count: 10 },
  { id: "social", label: "Social Media", icon: <Sparkles size={14} />, count: 10 },
  { id: "sales", label: "Sales & Conversion", icon: <Sparkles size={14} />, count: 10 },
  { id: "ai-agent", label: "AI Agent Workflows", icon: <Sparkles size={14} />, count: 10 },
  { id: "strategy", label: "Strategy & Planning", icon: <Sparkles size={14} />, count: 10 },
  { id: "data", label: "Data & Analytics", icon: <Sparkles size={14} />, count: 5 },
  { id: "education", label: "Education & Courses", icon: <Sparkles size={14} />, count: 5 },
  { id: "productivity", label: "Productivity", icon: <Sparkles size={14} />, count: 5 },
  { id: "international", label: "International", icon: <Sparkles size={14} />, count: 3 },
  { id: "link-building", label: "Link Building", icon: <Sparkles size={14} />, count: 5 },
  { id: "podcast", label: "Podcast & Video", icon: <Sparkles size={14} />, count: 4 },
  { id: "monetization", label: "Monetization", icon: <Sparkles size={14} />, count: 3 },
];

/* ─── Main Component ─── */
export default function GettingStartedPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "sop" | "loop" | "prompts" | "roadmap" | "beliefs">("overview");
  const [sopSteps, setSopSteps] = useState<SetupStep[]>(SOP_STEPS);
  const [roadmap, setRoadmap] = useState<RoadmapDay[]>(generateRoadmap);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);
  const [selectedPromptCat, setSelectedPromptCat] = useState<string | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const toggleSopStep = (id: string) => {
    setSopSteps((prev) => prev.map((s) => (s.id === id ? { ...s, completed: !(s as any).completed } : s)));
  };

  const toggleRoadmapDay = (day: number) => {
    setRoadmap((prev) => prev.map((d) => (d.day === day ? { ...d, completed: !d.completed } : d)));
  };

  const copyPrompt = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const sopProgress = sopSteps.filter((s: any) => s.completed).length;
  const roadmapProgress = roadmap.filter((d) => d.completed).length;

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: <Rocket size={16} /> },
    { id: "sop" as const, label: "Setup SOP", icon: <Play size={16} /> },
    { id: "loop" as const, label: "Agent Loop™", icon: <Layers size={16} /> },
    { id: "prompts" as const, label: "110+ Prompts", icon: <Sparkles size={16} /> },
    { id: "roadmap" as const, label: "30-Day Plan", icon: <Clock size={16} /> },
    { id: "beliefs" as const, label: "Mindset", icon: <Shield size={16} /> },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto p-6">
        <PageNav />

        {/* Hero */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--green)]/10 text-[var(--green)] text-sm font-medium mb-4"
          >
            <Star size={14} /> Free Forever — $0 Cost
          </motion.div>
          <h1 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
              Free AI Agents Forever
            </span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-2">
            Hermes Agent + Owl Alpha + OpenRouter = Unlimited AI Power at $0
          </p>
          <p className="text-sm text-[var(--text-secondary)] italic max-w-xl mx-auto">
            &quot;The biggest advantage you can have right now is running AI agents for free while your competitors are paying hundreds of dollars a month. That window won&apos;t stay open forever.&quot;
          </p>
          <p className="text-xs text-[var(--text-secondary)] mt-1">— Julian Goldie, AI Profit Boardroom</p>
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
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              {/* The 3 Tools */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {THREE_TOOLS.map((tool) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glow-border rounded-xl bg-[var(--bg-card)] p-5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${tool.color}20`, color: tool.color }}>
                        {tool.icon}
                      </div>
                      <div>
                        <div className="font-bold">{tool.name}</div>
                        <div className="text-xs text-[var(--text-secondary)]">by {tool.by}</div>
                      </div>
                    </div>
                    <p className="text-sm font-medium mb-2" style={{ color: tool.color }}>{tool.tagline}</p>
                    <p className="text-sm text-[var(--text-secondary)] mb-3">{tool.desc}</p>
                    <div className="space-y-1.5">
                      {tool.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                          <CheckCircle2 size={12} className="text-[var(--green)] shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs mt-3 hover:underline"
                      style={{ color: tool.color }}
                    >
                      <ExternalLink size={12} /> Visit {tool.name}
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Why This Combo */}
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp size={18} className="text-[var(--green)]" />
                  Why This Combination Is A Big Deal
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold mb-2 text-red-400">❌ What most people pay:</h3>
                    <div className="space-y-2">
                      {[
                        "$20–$200/month for Claude or GPT-4 API",
                        "$30–$100/month for agent software",
                        "$50–$300/month for automation tools",
                        "$100–$600/month total",
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                          <AlertCircle size={14} className="text-red-400 shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-2 text-[var(--green)]">✅ What you pay:</h3>
                    <div className="bg-[var(--green)]/10 border border-[var(--green)]/20 rounded-lg p-4">
                      <div className="text-3xl font-bold text-[var(--green)] mb-1">$0</div>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Not $1. Not &quot;almost free.&quot; Zero dollars.
                      </p>
                      <p className="text-xs text-[var(--text-secondary)] mt-2">
                        Owl Alpha is built for agentic workloads — performs better at agent tasks than many paid models.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What Is An AI Agent */}
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Bot size={18} className="text-[var(--accent)]" />
                  What Even Is An AI Agent? (Simple Version)
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Imagine you had a really smart intern who <strong>never sleeps</strong>, <strong>never complains</strong>, and can do <strong>50 tasks at once</strong>.
                  Now imagine that intern <strong>remembers everything</strong> you&apos;ve ever told them.
                  Now imagine they can <strong>search the internet</strong>, <strong>send emails</strong>, <strong>write documents</strong>, and <strong>run your software</strong> — all on their own.
                  That&apos;s an AI agent. It&apos;s not just a chatbot. It <strong>takes action</strong>. It <strong>gets things done</strong>. It <strong>works in the background</strong> while you do other stuff.
                </p>
              </div>

              {/* Quick Start CTA */}
              <div className="bg-gradient-to-r from-[var(--accent)]/10 to-[var(--green)]/10 border border-[var(--accent)]/20 rounded-xl p-6 text-center">
                <h3 className="text-lg font-bold mb-2">Ready to get started?</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Follow the step-by-step SOP to set up your free AI stack in under an hour.
                </p>
                <button
                  onClick={() => setActiveTab("sop")}
                  className="px-6 py-2.5 rounded-xl bg-[var(--accent)] text-white font-medium inline-flex items-center gap-2 hover:bg-[var(--accent)]/80 transition-colors"
                >
                  <Play size={16} /> Start the Setup SOP
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SOP TAB ─── */}
          {activeTab === "sop" && (
            <motion.div key="sop" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">Complete Setup SOP — 5 Phases</h2>
                <div className="text-sm text-[var(--text-secondary)]">{sopProgress}/{sopSteps.length} complete</div>
              </div>
              <div className="w-full h-2 bg-[var(--bg-card)] rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--green)]"
                  animate={{ width: `${(sopProgress / sopSteps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {SOP_PHASES.map((phase) => {
                const phaseSteps = sopSteps.filter((s) => s.phase === phase.num);
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
                        style={{ backgroundColor: phaseComplete ? "var(--green)" : `${phase.color}20`, color: phaseComplete ? "white" : phase.color }}
                      >
                        {phaseComplete ? <Check size={16} /> : phase.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          Phase {phase.num}: {phase.label} <span className="text-xs text-[var(--text-secondary)]">({phase.time})</span>
                        </div>
                        <div className="text-xs text-[var(--text-secondary)]">
                          {phaseSteps.filter((s: any) => s.completed).length}/{phaseSteps.length} steps
                        </div>
                      </div>
                      <ChevronDown size={16} className={`text-[var(--text-secondary)] transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="px-4 pb-4 space-y-2">
                            {phaseSteps.map((step, i) => {
                              const completed = (step as any).completed;
                              return (
                                <button
                                  key={step.id}
                                  onClick={() => toggleSopStep(step.id)}
                                  className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                                    completed ? "bg-[var(--green)]/10 border border-[var(--green)]/20" : "bg-[var(--bg-primary)] hover:bg-[var(--bg-card-hover)] border border-transparent"
                                  }`}
                                >
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${completed ? "bg-[var(--green)] text-white" : "bg-[var(--bg-card)] text-[var(--text-secondary)]"}`}>
                                    {completed ? <Check size={12} /> : <span className="text-[10px]">{i + 1}</span>}
                                  </div>
                                  <div>
                                    <div className={`text-sm font-medium ${completed ? "text-[var(--green)] line-through" : ""}`}>{step.label}</div>
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

          {/* ─── AGENT LOOP TAB ─── */}
          {activeTab === "loop" && (
            <motion.div key="loop" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">The Goldie Infinite Agent Loop™</h2>
                <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
                  A framework for turning free AI into unstoppable business growth. Not just using AI — building a self-improving system.
                </p>
              </div>

              {/* Old vs New Thinking */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glow-border rounded-xl bg-red-500/5 border-red-500/20 p-5">
                  <h3 className="font-semibold text-red-400 mb-3">❌ Old Thinking</h3>
                  <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <span>👤 Human</span>
                    <ArrowRight size={14} />
                    <span>prompt</span>
                    <ArrowRight size={14} />
                    <span>AI</span>
                    <ArrowRight size={14} />
                    <span>output</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-2">Still YOU doing most of the work.</p>
                </div>
                <div className="glow-border rounded-xl bg-[var(--green)]/5 border-[var(--green)]/20 p-5">
                  <h3 className="font-semibold text-[var(--green)] mb-3">✅ The Loop</h3>
                  <div className="flex items-center gap-1 text-sm text-[var(--text-secondary)] flex-wrap">
                    <span>🎯 Capture</span>
                    <ArrowRight size={12} />
                    <span>🔌 Connect</span>
                    <ArrowRight size={12} />
                    <span>🎛️ Calibrate</span>
                    <ArrowRight size={12} />
                    <span>📋 Clone</span>
                    <ArrowRight size={12} />
                    <span>📈 Compound</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-2">A self-improving system that gets better every week.</p>
                </div>
              </div>

              {/* 5 Stages */}
              <div className="space-y-4">
                {[
                  {
                    stage: 1,
                    title: "Capture",
                    icon: "🎯",
                    color: "#6c5ce7",
                    desc: "Identify one repetitive task in your business that costs you time every week.",
                    details: ["Content research", "Lead research", "Email writing", "Competitor monitoring"],
                    action: "Pick ONE thing. Don't automate everything at once.",
                  },
                  {
                    stage: 2,
                    title: "Connect",
                    icon: "🔌",
                    color: "#0984e3",
                    desc: "Connect Hermes Agent to Owl Alpha via OpenRouter. Give it access to the tools it needs.",
                    details: ["Set up OpenRouter API key", "Install Hermes Agent", "Configure Owl Alpha model", "Test connection"],
                    action: "Run it once, manually, watching what it does.",
                  },
                  {
                    stage: 3,
                    title: "Calibrate",
                    icon: "🎛️",
                    color: "#e056fd",
                    desc: "Run the task 3–5 times. Each time refine the prompt. Each time the agent gets better.",
                    details: ["Run task → review output", "Refine prompt based on gaps", "Run again → compare", "Repeat 3-5 times"],
                    action: "You're not coding. You're training — like training a new hire.",
                  },
                  {
                    stage: 4,
                    title: "Clone",
                    icon: "📋",
                    color: "#00b894",
                    desc: "Save the working workflow as a reusable skill. Now you have a permanent asset.",
                    details: ["Save as Hermes skill", "Document the SOP", "Create a template", "Duplicate for new tasks"],
                    action: "Clone this agent, give it a new task, and repeat.",
                  },
                  {
                    stage: 5,
                    title: "Compound",
                    icon: "📈",
                    color: "#fdcb6e",
                    desc: "Stack multiple agents so they feed each other. Every week the system gets smarter.",
                    details: [
                      "Research agent → Writing agent",
                      "Writing agent → Publishing agent",
                      "Publishing agent → Analytics agent",
                      "All feeding each other automatically",
                    ],
                    action: "Every week you do less work. Every week you produce more output.",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.stage}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: item.stage * 0.1 }}
                    className="glow-border rounded-xl bg-[var(--bg-card)] p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                        style={{ backgroundColor: `${item.color}15` }}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                            Stage {item.stage}
                          </span>
                          <h3 className="font-semibold">{item.title}</h3>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] mb-3">{item.desc}</p>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          {item.details.map((d) => (
                            <div key={d} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                              <CheckCircle2 size={12} style={{ color: item.color }} className="shrink-0" />
                              {d}
                            </div>
                          ))}
                        </div>
                        <div className="bg-[var(--bg-primary)] rounded-lg p-3">
                          <p className="text-xs font-medium" style={{ color: item.color }}>
                            💡 {item.action}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <div className="bg-[var(--bg-card)] border-l-4 border-[var(--accent)] rounded-xl p-5">
                <p className="text-sm font-medium italic">
                  &quot;You don&apos;t just want to use AI. You want to BUILD an AI-powered system that runs itself. That&apos;s the difference between a user and an owner.&quot;
                </p>
                <p className="text-xs text-[var(--text-secondary)] mt-2">— Julian Goldie</p>
              </div>
            </motion.div>
          )}

          {/* ─── PROMPTS TAB ─── */}
          {activeTab === "prompts" && (
            <motion.div key="prompts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">110+ Prompts — Copy, Paste, and Profit</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Use these inside Hermes Agent + Owl Alpha. Click a category to expand, then copy any prompt.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                {PROMPT_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedPromptCat(selectedPromptCat === cat.id ? null : cat.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-left ${
                      selectedPromptCat === cat.id
                        ? "border-[var(--accent)] bg-[var(--accent)]/10"
                        : "border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)]/50"
                    }`}
                  >
                    <Sparkles size={14} className="text-[var(--accent)] shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-medium truncate">{cat.label}</div>
                      <div className="text-[10px] text-[var(--text-secondary)]">{cat.count} prompts</div>
                    </div>
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {selectedPromptCat && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="glow-border rounded-xl bg-[var(--bg-card)] p-4 overflow-hidden"
                  >
                    <PromptList categoryId={selectedPromptCat} onCopy={copyPrompt} copiedIdx={copiedIdx} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ─── ROADMAP TAB ─── */}
          {activeTab === "roadmap" && (
            <motion.div key="roadmap" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">30-Day Roadmap — Zero to Running Agents</h2>
                <div className="text-sm text-[var(--text-secondary)]">{roadmapProgress}/{roadmap.length} complete</div>
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
                const weekLabels = ["Set Up & First Win", "Build Your First Workflow", "Stack Agents", "Scale & Compound"];
                const weekComplete = weekDays.every((d) => d.completed);

                return (
                  <div key={week} className="glow-border rounded-xl bg-[var(--bg-card)] p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${weekComplete ? "bg-[var(--green)] text-white" : "bg-[var(--bg-primary)] text-[var(--text-secondary)]"}`}>
                        {weekComplete ? <Check size={12} /> : week}
                      </div>
                      <div>
                        <div className="font-medium text-sm">Week {week}: {weekLabels[week - 1]}</div>
                        <div className="text-xs text-[var(--text-secondary)]">{weekDays.filter((d) => d.completed).length}/{weekDays.length} complete</div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {weekDays.map((day) => (
                        <button
                          key={day.day}
                          onClick={() => toggleRoadmapDay(day.day)}
                          className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors ${day.completed ? "bg-[var(--green)]/10" : "hover:bg-[var(--bg-primary)]"}`}
                        >
                          {day.completed ? (
                            <CheckCircle2 size={16} className="text-[var(--green)] shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-[var(--text-secondary)]/30 shrink-0" />
                          )}
                          <span className="text-xs text-[var(--text-secondary)] w-6 shrink-0">D{day.day}</span>
                          <span className={`text-sm ${day.completed ? "text-[var(--green)] line-through" : ""}`}>{day.task}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* ─── BELIEFS TAB ─── */}
          {activeTab === "beliefs" && (
            <motion.div key="beliefs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <div className="text-center mb-4">
                <h2 className="text-lg font-semibold mb-2">Breaking Your Limiting Beliefs</h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  &quot;Most people don&apos;t fail because of lack of tools. They fail because of wrong beliefs. Let&apos;s fix yours right now.&quot;
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

/* ─── Prompt List Component ─── */
function PromptList({ categoryId, onCopy, copiedIdx }: { categoryId: string; onCopy: (text: string, idx: number) => void; copiedIdx: number | null }) {
  const prompts: Record<string, string[]> = {
    content: [
      "Research the top 10 trending topics in [your niche] this week and write a 500-word blog post about the most interesting one. Include a catchy headline and 3 key takeaways.",
      "Write 7 YouTube video titles for the topic [topic] that use curiosity, a free tool angle, and a vs/destroys format. Make each title under 50 characters.",
      "Rewrite this blog post [paste post] as a LinkedIn post. Keep it under 300 words, add a hook in the first line, and end with a question.",
      "Create 30 tweet ideas about [topic] using real data and contrarian opinions. Each tweet should be under 240 characters.",
      "Write a 1,000-word beginner guide to [topic]. Use simple language a 12-year-old could understand. Break it into 5 sections with subheadings.",
      "Generate 10 YouTube thumbnail text ideas for a video about [topic]. Each should be 3–6 words, ALL CAPS, and designed to create curiosity.",
      "Research and summarise the top 5 articles published in the last 7 days about [topic]. Pull out the 3 most surprising facts from each.",
      "Write a YouTube description for a video about [topic]. Include: 2-sentence hook, what viewers will learn, 5 key timestamps, and call to action.",
      "Write a 10-tweet thread breaking down how [tool/concept] works, from zero to advanced. End with a CTA to follow for more.",
      "Create a content calendar for the next 30 days about [niche]. Include 1 YouTube video idea, 1 blog post idea, and 3 tweet ideas per week.",
    ],
    email: [
      "Write a 5-email welcome sequence for someone who just joined [community/product]. Tone: warm, educational, personal. Each email under 300 words.",
      "Write a promotional email for a free strategy call. Subject line should create urgency. Body should focus on ONE transformation.",
      "Rewrite this email [paste email] to be more conversational, shorter, and have a stronger call to action.",
      "Write 10 email subject lines for a campaign about [topic]. Mix curiosity, numbers, and personal questions.",
      "Create a re-engagement email for subscribers who haven't opened in 60 days. Be honest and direct. Offer them a reason to stay.",
      "Write a follow-up email sequence for someone who visited my sales page but didn't buy. 3 emails, spaced 24 hours apart.",
      "Analyse this email list segment [describe segment] and suggest 5 personalised email campaigns based on their behaviour.",
      "Write a broadcast email announcing a new YouTube video about [topic]. Keep it under 150 words. Link to the video at the end.",
      "Create a 7-day email challenge sequence about [topic]. Each day teaches one skill and builds on the previous day.",
      "Write a flash sale email for [product] with 48-hour urgency. Include a P.S. that reinforces the deadline.",
    ],
    seo: [
      "Search the web for the top 20 SEO keywords people are searching right now about [topic]. List them with estimated search volume and intent.",
      "Analyse the top 3 Google search results for [keyword] and summarise what they cover. Then identify gaps I could target.",
      "Research [competitor website] and list their top 10 performing pages based on estimated traffic. Suggest 3 angles I could beat them on.",
      "Write an SEO-optimised blog post for the keyword [keyword]. Include the keyword in the title, first paragraph, 2 subheadings, and conclusion.",
      "Build me a list of 50 long-tail keyword variations of [seed keyword] sorted from lowest to highest difficulty.",
      "Find the top 20 websites that publish content about [niche] and rank them by domain authority. List their contact emails where possible.",
      "Summarise the most important Google algorithm updates from the last 12 months and explain how each one affects content strategy.",
      "Audit this URL [URL] for on-page SEO issues. List problems in order of priority and suggest fixes.",
      "Research the backlink profile of [competitor domain] and find 10 link-building opportunities I could target.",
      "Create a full internal linking strategy for a website about [topic]. List which pages should link to which and why.",
    ],
    business: [
      "Review my weekly task list [paste list] and identify which tasks could be automated using AI agents. Rank by time saved.",
      "Build a daily reporting template that pulls together my key business metrics. List what data to include and how to present it.",
      "Create an SOP for onboarding a new virtual assistant. Include steps, tools, and a checklist for week 1.",
      "Research the top 5 CRMs for small businesses in 2026. Compare features, pricing, and integration with AI tools.",
      "Write a project brief template for client work. Include: objectives, deliverables, timeline, success metrics, and revision policy.",
      "Create a weekly review template I can use every Friday to track progress on my goals. Keep it simple — 10 questions max.",
      "Analyse this sales call transcript [paste transcript] and pull out: objections raised, questions asked, and key decision moments.",
      "Write a client proposal for [service] targeting [type of client]. Include problem, solution, investment, and guarantee.",
      "Build a 90-day growth plan for [type of business]. Include weekly milestones, KPIs, and specific actions.",
      "Create a hiring checklist for bringing on a new [role]. Include job description, interview questions, and onboarding tasks.",
    ],
    social: [
      "Write 30 Instagram captions for a page about [niche]. Mix educational, inspirational, and promotional. Each under 150 words.",
      "Create a TikTok script for a 60-second video about [topic]. Include hook (first 3 seconds), body, and CTA.",
      "Write 10 LinkedIn posts for someone in [industry]. Mix personal story, industry insight, and practical tip formats.",
      "Generate 20 short-form video hooks about [topic] that could work for TikTok, Instagram Reels, and YouTube Shorts.",
      "Research what's trending on [platform] right now in [niche] and suggest 5 content ideas I could create this week.",
      "Write replies to these 10 comments [paste comments] in a way that's engaging, authentic, and builds community.",
      "Create a 90-day social media growth strategy for [platform]. Include posting frequency, content mix, and engagement tactics.",
      "Write a YouTube community post announcing [news/update]. Keep it conversational, under 200 words, and include a poll question.",
      "Analyse these 5 competitor accounts [list them] and summarise their best-performing content types and posting patterns.",
      "Generate 15 story ideas for Instagram that drive people from stories to my link in bio.",
    ],
    sales: [
      "Rewrite this sales page [paste copy] to be clearer, more benefit-focused, and drive more conversions.",
      "Write 5 versions of a headline for [product/offer]. Test: curiosity, benefit, fear, social proof, and bold claim styles.",
      "Create a VSL (video sales letter) script for [product]. Include hook, problem, agitation, solution, proof, offer, and CTA.",
      "Write 10 objection-handling scripts for common sales objections about [product]. Include reframe, proof, and next step.",
      "Analyse this checkout flow [describe it] and suggest 5 improvements to reduce cart abandonment.",
      "Write a case study about a client result [describe result]. Include problem, solution, result, and quote.",
      "Create a webinar outline for a 60-minute presentation selling [product]. Include slide structure and talking points.",
      "Write 3 different versions of an Instagram DM opener for reaching out to potential clients about [service].",
      "Build a lead magnet outline for [target audience]. The lead magnet should solve one specific problem in 10–15 minutes.",
      "Write a sales script for a 30-minute discovery call for [service]. Include qualifying questions and a soft close.",
    ],
    "ai-agent": [
      "Build me a morning briefing. Search the web for the top 5 news stories in [niche] from the last 24 hours. Summarise each in 3 sentences.",
      "Monitor [competitor website] for any new blog posts published in the last 7 days. List titles, URLs, and main topics.",
      "Search for all mentions of [brand/keyword] on social media in the last 48 hours. Categorise as positive, negative, or neutral.",
      "Research 20 potential podcast guests for a show about [topic]. Include their name, why they're relevant, and contact info.",
      "Browse the web and compile a list of the top 10 tools in the [category] space. Include pricing, features, and user ratings.",
      "Search for all job listings for [role] posted in the last 30 days. List company, location, salary range, and requirements.",
      "Monitor [keyword] across Reddit and Twitter for the last 7 days. What questions are people asking? What problems do they have?",
      "Search for affiliate programmes in [niche]. List commission rates, cookie duration, and average order values.",
      "Research the top 10 bestselling books in [category] on Amazon. Summarise each in 3 bullet points.",
      "Browse [website] and extract all contact information, social media links, and team member names.",
    ],
    strategy: [
      "Act as a business strategist. Analyse my current offer [describe it] and suggest 3 ways to increase its perceived value without changing the price.",
      "Build a competitive analysis for [your product] vs [competitor]. Compare pricing, positioning, features, and target audience.",
      "Create a customer avatar for [product/service]. Include: demographics, goals, fears, objections, and buying triggers.",
      "Audit my current content strategy [describe it] and identify the 3 biggest gaps causing me to miss growth.",
      "Write a SWOT analysis for [business/idea]. Be brutal and honest. End with 3 actionable next steps.",
      "Build a pricing strategy for [service]. Include: anchor pricing, upsell stack, and positioning rationale.",
      "Research the market size for [niche]. Include total addressable market, typical customer spend, and growth rate.",
      "Create a partnership outreach strategy for finding 10 JV partners in [niche]. Include how to qualify, approach, and structure the deal.",
      "Map out a 12-month product roadmap for [business]. Include: launch dates, revenue targets, and team requirements.",
      "Write an investor pitch deck outline for [business]. Include: problem, solution, market, traction, team, and ask.",
    ],
    data: [
      "Analyse these YouTube analytics [paste data]. Tell me which videos performed best and why. Suggest 3 content strategy changes.",
      "Review my email open rate data [paste data] and identify which subject line patterns get the best results.",
      "Look at this sales data [paste data]. Find the patterns — best day to sell, best price point, best traffic source.",
      "Build a monthly KPI dashboard template for [type of business]. Include the 10 most important metrics to track.",
      "Analyse my traffic sources [describe them] and tell me where to focus my marketing effort for maximum ROI.",
    ],
    education: [
      "Build a full course outline for a beginner course on [topic]. Include 5 modules with 3 lessons each.",
      "Write lesson notes for a 20-minute video about [topic]. Include key concepts, examples, and a quiz at the end.",
      "Create a community challenge for [platform] about [topic]. Include: daily tasks, prizes, and engagement prompts.",
      "Write a FAQ document for [product/course] answering the 20 most common questions customers ask before buying.",
      "Design an onboarding sequence for new students of [course]. Include: welcome message, Day 1–7 tasks, and success milestones.",
    ],
    productivity: [
      "I have 4 hours today. Here are my tasks [paste list]. Prioritise them using the Eisenhower Matrix and tell me what to do in what order.",
      "Write a standard operating procedure for [task I do weekly]. Break it into numbered steps with decision points.",
      "Summarise this document [paste doc] in under 200 words. Pull out the 5 most important points.",
      "Read this meeting transcript [paste it] and write: action items, decisions made, and owners for each task.",
      "Review my morning routine [describe it] and suggest 3 changes that would improve my focus and energy.",
    ],
    international: [
      "Translate this blog post [paste it] into Spanish. Maintain the tone and style of the original.",
      "Adapt this marketing copy [paste it] for a European audience. Change cultural references, units, and idioms as needed.",
      "Research the top 5 markets outside the US for [product type]. Include market size, competition level, and entry strategy.",
    ],
    "link-building": [
      "Find 20 websites in [niche] that accept guest posts. Include domain authority, contact form URL, and submission guidelines.",
      "Research broken links on [topic] niche websites and suggest 10 pieces of content I could create to replace them.",
      "Find all websites that have linked to [competitor] but not to me. List them with their domain authority and the page they linked from.",
      "Write 5 outreach email templates for link building in [niche]. Each should feel personalised and not spammy.",
      "Create a 90-day link building campaign plan for [website]. Include strategies, targets, and weekly milestones.",
    ],
    podcast: [
      "Write a podcast episode outline for a 45-minute episode about [topic]. Include intro, 5 main points, and outro.",
      "Create 10 interview questions for a podcast guest who is an expert in [topic].",
      "Write a YouTube video script for [topic] that's 8–10 minutes long. Include a hook, main content, and CTA.",
      "Transcribe and summarise this video [paste transcript]. Turn it into a blog post under 800 words.",
    ],
    monetization: [
      "List 10 ways someone with an audience in [niche] could monetise it. Rank by: revenue potential, time to set up, and difficulty.",
      "Design a membership programme for [topic]. Include: tiers, pricing, what's included at each level, and retention tactics.",
      "Write a sponsorship deck for [content channel]. Include: audience stats, reach, formats, and pricing options.",
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
          <button
            onClick={() => onCopy(prompt, i)}
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
