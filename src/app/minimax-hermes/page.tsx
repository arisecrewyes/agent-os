"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard, Target, BookOpen, Settings, Brain, Zap, Rocket,
  Database, Bot, FileText, Check, ChevronRight, ChevronDown, Copy,
  CheckCircle2, AlertCircle, Clock, Layers, RefreshCw, ArrowRight,
  Shield, Wrench, Star, Terminal, Search, Mail, Calendar, Cpu,
  Globe, Users, Code, Lightbulb, TrendingUp, Heart, Sparkles, MessageSquare
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

const ROADMAP = [
  { week: 1, title: "Foundation", color: "#6c5ce7", icon: "\u2705", days: ["Install Hermes Agent (one line, Mac/Linux/Windows).", "Connect MiniMax M3 as your brain (hermes model).", "Turn on web search and file tools (hermes tools).", "Have one full conversation. Learn the commands.", "Connect to Telegram. Text your agent from anywhere.", "Give it your first real task.", "Review the week. Note what worked."] },
  { week: 2, title: "Real Tasks", color: "#0984e3", icon: "\u2705", days: ["Use it to write one piece of content.", "Have it research a competitor.", "Let it draft 3 emails.", "Save your first custom skill.", "Set up your first scheduled task (cron).", "Test it on a task you usually hate doing.", "Review \u2014 what saved you the most time?"] },
  { week: 3, title: "Automation", color: "#00b894", icon: "\u2705", days: ["Build a daily report automation.", "Build a nightly backup automation.", "Connect a second platform (Discord or Slack).", "Spawn a subagent for a parallel task.", "Refine your top 3 skills.", "Document your workflows.", "Review \u2014 what can run without you now?"] },
  { week: 4, title: "Scale", color: "#e056fd", icon: "\u2705", days: ["Automate one full business process end-to-end.", "Teach a team member to use it.", "Test a different brain model.", "Build a weekly audit automation.", "Clean up unused skills.", "Map out your next 5 automations.", "Calculate hours saved this month.", "Share a win in the community.", "Plan month two."] },
];

const SOP_DAILY = [
  "Open your messaging app (Telegram, Discord, etc.)",
  "Send your agent your top task for the day",
  "Be specific \u2014 tell it the goal, not the steps",
  "Let it work, then review the output",
  "Correct it once if needed (it learns from this)",
  "Save any winning result as a skill",
];

const SOP_WEEKLY = [
  "Run hermes update to get the newest version",
  "Check /insights to see what your agent learned",
  "Review your scheduled cron tasks",
  "Add one new automation you do by hand",
  "Back up your memory files",
];

const SOP_MONTHLY = [
  "Review every skill your agent created",
  "Delete skills you do not use",
  "Try swapping in a new brain model and compare",
  "Document your best 3 workflows",
  "Teach one to a team member",
];

const BELIEFS = [
  { wrong: "I need to know how to code.", right: "You talk to it in plain English. The installer handles everything: uv, Python 3.11, Node.js, ripgrep, ffmpeg. You copy one line. Done.", icon: <Code size={16} />, color: "#6c5ce7" },
  { wrong: "This must cost a fortune.", right: "Model is open-weights (free). Agent is open-source (free). Server is $5/month. That is the entire setup.", icon: <Star size={16} />, color: "#0984e3" },
  { wrong: "AI tools forget everything, so they are useless for real work.", right: "Hermes has a closed learning loop. Agent-curated memory with periodic nudges. Autonomous skill creation after complex tasks. It builds a model of you over time.", icon: <Brain size={16} />, color: "#00b894" },
  { wrong: "I am too late. The smart people already figured this out.", right: "MiniMax M3 dropped today. You are reading this on day one. You are not late. You are early.", icon: <Rocket size={16} />, color: "#e056fd" },
  { wrong: "I would need to figure this all out alone.", right: "Inside the AI Profit Boardroom, you are never alone. 155+ pages of member testimonials prove real people are doing this.", icon: <Users size={16} />, color: "#fdcb6e" },
];

const SETUP_STEPS = [
  { num: 1, title: "Install Hermes Agent", mac_cmd: "curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash", win_cmd: "iex (irm https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.ps1)", detail: "Wait for it to finish. It installs everything for you." },
  { num: 2, title: "Reload And Start", cmd: "source ~/.bashrc && hermes", detail: "You are now chatting with your agent." },
  { num: 3, title: "Set MiniMax M3 As Your Brain", cmd: "hermes model", detail: "Pick MiniMax M3 from the list. To test directly: ollama run minimax-m3:cloud" },
  { num: 4, title: "Give It Hands (Tools)", cmd: "hermes tools", detail: "Turn on web search, file creation, and so on." },
  { num: 5, title: "Let It Live On Your Phone", cmd: "hermes gateway", detail: "Connect Telegram or your favorite app. Text your agent from anywhere." },
];

const PROMPT_CATEGORIES = [
  { id: "content", label: "Content Creation", icon: <FileText size={14} />, count: 15 },
  { id: "research", label: "Research", icon: <Search size={14} />, count: 15 },
  { id: "email", label: "Email & Outreach", icon: <Mail size={14} />, count: 10 },
  { id: "automation", label: "Automation & Scheduling", icon: <Calendar size={14} />, count: 10 },
  { id: "skill", label: "Skill & Memory", icon: <Brain size={14} />, count: 10 },
  { id: "business", label: "Business & Strategy", icon: <TrendingUp size={14} />, count: 10 },
  { id: "agent", label: "Agent Management", icon: <Bot size={14} />, count: 10 },
  { id: "creative", label: "YouTube & Creator", icon: <Lightbulb size={14} />, count: 10 },
  { id: "problem", label: "Problem Solving", icon: <Wrench size={14} />, count: 10 },
  { id: "bonus", label: "Bonus Power Prompts", icon: <Star size={14} />, count: 5 },
];

export default function MiniMaxHermesPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);
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
    { id: "overview", label: "Overview", icon: <Cpu size={16} /> },
    { id: "framework", label: "Agent OS Framework", icon: <Layers size={16} /> },
    { id: "setup", label: "Setup Guide", icon: <Terminal size={16} /> },
    { id: "sop", label: "SOP", icon: <FileText size={16} /> },
    { id: "roadmap", label: "30-Day Plan", icon: <Clock size={16} /> },
    { id: "prompts", label: "100+ Prompts", icon: <Sparkles size={16} /> },
    { id: "beliefs", label: "Beliefs", icon: <Shield size={16} /> },
    { id: "recap", label: "Recap", icon: <Star size={16} /> },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto p-6">
        <PageNav />
        <div className="mb-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium mb-4">
            <Cpu size={14} /> MiniMax M3 + Hermes Agent
          </motion.div>
          <h1 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">FREE Self-Improving AI Agent</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-2">The complete beginner guide to building your own AI agent for $0.</p>
          <p className="text-sm text-[var(--text-secondary)]">Tools change. Frameworks do not.</p>
        </div>
        <div className="flex gap-1 mb-6 bg-[var(--bg-secondary)] rounded-xl p-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id ? "bg-[var(--accent)] text-white" : "text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"}`}
            >{tab.icon}{tab.label}</button>
          ))}
        </div>
        <AnimatePresence mode="wait">

          {activeTab === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h2 className="text-lg font-semibold mb-3">Wait... What Is This?</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">Imagine a robot helper that lives on the internet. You text it from your phone. It writes things, searches the web, sends emails, and teaches itself new skills. And it costs almost nothing to run.</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">We are putting two free tools together: <strong>MiniMax M3</strong> (the brain) and <strong>Hermes Agent</strong> (the body). Even if you have never written a line of code.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#6c5ce720] text-[#6c5ce7]"><Cpu size={20} /></div>
                    <div><div className="font-bold">MiniMax M3</div><div className="text-xs text-[var(--text-secondary)]">The Brain</div></div>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">Brand new open-weights AI model. First to combine three frontier capabilities. 59.0% on SWE-Bench Pro. 66.0% on Terminal Bench 2.1. 1M token context via Sparse Attention.</p>
                  <div className="space-y-1.5">
                    {["Open-weights (free to use)", "1M token context window", "US-based, zero data retention", "Runs on Ollama Cloud"].map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"><CheckCircle2 size={12} className="text-[var(--green)] shrink-0" />{f}</div>
                    ))}
                  </div>
                  <div className="mt-3 bg-[var(--bg-primary)] rounded-lg p-3"><p className="text-xs font-medium">Zero data retention means they do not keep your stuff. Big deal for privacy.</p></div>
                </div>
                <div className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#00b89420] text-[#00b894]"><Bot size={20} /></div>
                    <div><div className="font-bold">Hermes Agent</div><div className="text-xs text-[var(--text-secondary)]">The Body</div></div>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">Built by Nous Research. The only agent with a built-in learning loop. Creates skills from experience. Improves them during use. Remembers across sessions.</p>
                  <div className="space-y-1.5">
                    {["Telegram, Discord, Slack, WhatsApp, Signal", "40+ built-in tools", "Serverless: costs nearly nothing when idle", "Run on a $5 VPS"].map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"><CheckCircle2 size={12} className="text-[var(--green)] shrink-0" />{f}</div>
                    ))}
                  </div>
                  <div className="mt-3 bg-[var(--bg-primary)] rounded-lg p-3"><p className="text-xs font-medium">Most AI tools forget everything. Hermes remembers. Gets better the more you use it.</p></div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-[var(--accent)]/10 to-[var(--green)]/10 border border-[var(--accent)]/20 rounded-xl p-6 text-center">
                <h3 className="text-lg font-bold mb-2">Why This Combo Is INSANE</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">Both tools are free. Stick them together and you get a smart helper that writes content, searches the web, sends emails, runs tasks while you sleep, and learns your business over time.</p>
                <div className="flex items-center justify-center gap-2 flex-wrap text-sm">
                  <span className="px-3 py-1 rounded-lg bg-[var(--purple)]/10 text-[var(--purple)]">MiniMax M3 (free)</span><span>+</span>
                  <span className="px-3 py-1 rounded-lg bg-[var(--blue)]/10 text-[var(--blue)]">Hermes Agent (free)</span>
                  <ArrowRight size={16} /><span className="px-3 py-1 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] font-bold">Self-improving AI for $0</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "framework" && (
            <motion.div key="framework" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <div className="text-center mb-4"><h2 className="text-xl font-bold mb-2">The Agent OS Framework\u2122</h2><p className="text-sm text-[var(--text-secondary)]">3 layers. Understand these and you understand every AI agent on earth. Forever.</p></div>
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <div className="flex flex-col items-center gap-4">
                  {[{ l: 3, t: "HANDS", s: "Tools that do work", d: "Web search, email, file creation, scheduled tasks. 40+ tools, toolset system, terminal backends.", icon: <Wrench size={20} />, color: "#fdcb6e" }, { l: 2, t: "BRAIN", s: "Thinking part", d: "The model that decides what to do. Today it is MiniMax M3. You can swap the brain anytime \u2014 no code changes, no lock-in.", icon: <Brain size={20} />, color: "#6c5ce7" }, { l: 1, t: "EARS", s: "How agent hears you", d: "Input layer. Telegram, Discord, WhatsApp, or terminal. You talk. It listens.", icon: <MessageSquare size={20} />, color: "#0984e3" }].map((item) => (
                    <div key={item.l} className="w-full max-w-md">
                      <div className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: `${item.color}10`, border: `1px solid ${item.color}20` }}>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}20`, color: item.color }}>{item.icon}</div>
                        <div><div className="flex items-center gap-2"><span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${item.color}20`, color: item.color }}>Layer {item.l}</span><span className="font-bold">{item.t}</span></div><div className="text-xs text-[var(--text-secondary)]">{item.s}</div><p className="text-xs text-[var(--text-secondary)] mt-1">{item.d}</p></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[var(--bg-card)] border-l-4 border-[var(--accent)] rounded-xl p-5">
                <p className="text-sm font-medium italic">Ears hear you. Brain decides. Hands do the work. Master these 3 layers and no tool update will ever scare you again.</p>
                <p className="text-xs text-[var(--text-secondary)] mt-2">Tools change. Frameworks do not.</p>
              </div>
            </motion.div>
          )}

          {activeTab === "setup" && (
            <motion.div key="setup" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">Setup Guide \u2014 5 Steps</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4">Do not skim. Follow line by line.</p>
              {SETUP_STEPS.map((step) => (
                <div key={step.num} className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center font-bold text-sm shrink-0">{step.num}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-2">{step.title}</h3>
                      {step.mac_cmd && (
                        <div className="mb-2">
                          <div className="text-xs text-[var(--text-secondary)] mb-1">Mac / Linux / WSL:</div>
                          <div className="flex items-center gap-2 bg-[var(--bg-primary)] rounded-lg p-2">
                            <code className="text-xs font-mono text-[var(--accent)] flex-1 overflow-x-auto">{step.mac_cmd}</code>
                            <button onClick={() => copyToClipboard(step.mac_cmd!)} className="shrink-0 p-1 text-[var(--text-secondary)] hover:text-[var(--accent)]">{copiedCmd === step.mac_cmd ? <Check size={12} className="text-[var(--green)]" /> : <Copy size={12} />}</button>
                          </div>
                        </div>
                      )}
                      {step.win_cmd && (
                        <div className="mb-2">
                          <div className="text-xs text-[var(--text-secondary)] mb-1">Windows PowerShell:</div>
                          <div className="flex items-center gap-2 bg-[var(--bg-primary)] rounded-lg p-2">
                            <code className="text-xs font-mono text-[var(--accent)] flex-1 overflow-x-auto">{step.win_cmd}</code>
                            <button onClick={() => copyToClipboard(step.win_cmd!)} className="shrink-0 p-1 text-[var(--text-secondary)] hover:text-[var(--accent)]">{copiedCmd === step.win_cmd ? <Check size={12} className="text-[var(--green)]" /> : <Copy size={12} />}</button>
                          </div>
                        </div>
                      )}
                      {step.cmd && !step.mac_cmd && (
                        <div className="mb-2">
                          <div className="flex items-center gap-2 bg-[var(--bg-primary)] rounded-lg p-2">
                            <code className="text-xs font-mono text-[var(--accent)] flex-1 overflow-x-auto">{step.cmd}</code>
                            <button onClick={() => copyToClipboard(step.cmd!)} className="shrink-0 p-1 text-[var(--text-secondary)] hover:text-[var(--accent)]">{copiedCmd === step.cmd ? <Check size={12} className="text-[var(--green)]" /> : <Copy size={12} />}</button>
                          </div>
                        </div>
                      )}
                      <p className="text-xs text-[var(--text-secondary)]">{step.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "sop" && (
            <motion.div key="sop" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">Standard Operating Procedure</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4">Print this. Pin it. Follow it. A weak system used daily beats a perfect system used never.</p>
              {[{ title: "Daily SOP", icon: <Clock size={18} />, color: "#6c5ce7", steps: SOP_DAILY }, { title: "Weekly SOP", icon: <Calendar size={18} />, color: "#0984e3", steps: SOP_WEEKLY }, { title: "Monthly SOP", icon: <FileText size={18} />, color: "#00b894", steps: SOP_MONTHLY }].map((sop) => (
                <div key={sop.title} className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                  <h3 className="font-semibold mb-3 flex items-center gap-2"><div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${sop.color}20`, color: sop.color }}>{sop.icon}</div>{sop.title}</h3>
                  <div className="space-y-2">{sop.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3 p-2 rounded-lg bg-[var(--bg-primary)]"><span className="text-xs font-bold w-5 shrink-0 mt-0.5" style={{ color: sop.color }}>{i + 1}.</span><p className="text-sm">{step}</p></div>
                  ))}</div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "roadmap" && (
            <motion.div key="roadmap" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">30-Day Roadmap</h2>
              <div className="flex gap-2 mb-4 flex-wrap">
                {[{ w: "Week 1", t: "Foundation", c: "#6c5ce7" }, { w: "Week 2", t: "Real Tasks", c: "#0984e3" }, { w: "Week 3", t: "Automation", c: "#00b894" }, { w: "Week 4", t: "Scale", c: "#e056fd" }].map((item) => (
                  <span key={item.w} className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: `${item.c}15`, color: item.c, border: `1px solid ${item.c}30` }}>{item.w}: {item.t}</span>
                ))}
              </div>
              {ROADMAP.map((week) => {
                const isExpanded = expandedWeek === week.week;
                return (
                  <div key={week.week} className="glow-border rounded-xl bg-[var(--bg-card)] overflow-hidden">
                    <button onClick={() => setExpandedWeek(isExpanded ? null : week.week)} className="w-full flex items-center gap-3 p-4 text-left hover:bg-[var(--bg-card-hover)] transition-colors">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ backgroundColor: `${week.color}15` }}>{week.icon}</div>
                      <div className="flex-1"><div className="font-medium text-sm">{week.week}: {week.title}</div><div className="text-xs text-[var(--text-secondary)]">{week.days.length} days</div></div>
                      <ChevronDown size={16} className={`text-[var(--text-secondary)] transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>{isExpanded && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="px-4 pb-4 space-y-2">{week.days.map((day, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-primary)]"><span className="text-xs font-bold w-6 shrink-0 mt-0.5" style={{ color: week.color }}>D{i + 1 + (week.week - 1) * 7}</span><p className="text-sm">{day}</p></div>
                        ))}</div>
                      </motion.div>
                    )}</AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          )}

          {activeTab === "prompts" && (
            <motion.div key="prompts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">100+ Prompts</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4">Copy. Paste. Tweak. Win.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                {PROMPT_CATEGORIES.map((cat) => (
                  <button key={cat.id} onClick={() => setSelectedPromptCat(selectedPromptCat === cat.id ? null : cat.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-left ${selectedPromptCat === cat.id ? "border-[var(--accent)] bg-[var(--accent)]/10" : "border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)]/50"}`}
                  >{cat.icon}<div className="min-w-0"><div className="text-xs font-medium truncate">{cat.label}</div><div className="text-[10px] text-[var(--text-secondary)]">{cat.count}</div></div></button>
                ))}
              </div>
              <AnimatePresence>{selectedPromptCat && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="glow-border rounded-xl bg-[var(--bg-card)] p-4 overflow-hidden">
                  <MHPromptList categoryId={selectedPromptCat} onCopy={copyToClipboard} copiedIdx={copiedIdx} />
                </motion.div>
              )}</AnimatePresence>
            </motion.div>
          )}

          {activeTab === "beliefs" && (
            <motion.div key="beliefs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <div className="text-center mb-4"><h2 className="text-lg font-semibold mb-2">Breaking Your Limiting Beliefs</h2></div>
              {BELIEFS.map((item, i) => (
                <div key={i} className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${item.color}20`, color: item.color }}>{item.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1"><AlertCircle size={14} className="text-red-400" /><span className="text-xs font-medium text-red-400">WRONG BELIEF #{i + 1}</span></div>
                      <p className="text-sm text-red-400/80 line-through mb-3">{item.wrong}</p>
                      <div className="flex items-center gap-2 mb-1"><CheckCircle2 size={14} className="text-[var(--green)]" /><span className="text-xs font-medium text-[var(--green)]">RIGHT BELIEF</span></div>
                      <p className="text-sm text-[var(--green)]">{item.right}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "recap" && (
            <motion.div key="recap" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <h2 className="text-lg font-semibold text-center mb-4">Recap: Everything In 60 Seconds</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[{ i: "\u{1F9E0}", t: "MiniMax M3 = Brain", d: "Free, open-weights. 1M context. 59% SWE-Bench." }, { i: "\u2624", t: "Hermes Agent = Body", d: "Free, open-source. Self-improving learning loop." }, { i: "\u{1F399}\uFE0F", t: "Ears", d: "Telegram, Discord, WhatsApp \u2014 how your agent hears you." }, { i: "\u{1F9E0}", t: "Brain", d: "MiniMax M3 (swappable). Decides what to do." }, { i: "\u270A", t: "Hands", d: "40+ tools. Gets things done in the real world." }, { i: "\u2705", t: "5 beliefs broken", d: "No code needed. $5/month. You are early." }, { i: "\u{1F4CB}", t: "8-step setup", d: "One install line. Connect model. Done." }, { i: "\u{1F4C5}", t: "30-day roadmap", d: "Foundation \u2192 Real Tasks \u2192 Automation \u2192 Scale." }].map((item) => (
                  <div key={item.t} className="glow-border rounded-xl bg-[var(--bg-card)] p-4 flex items-start gap-3"><div className="text-2xl">{item.i}</div><div><div className="font-bold text-sm">{item.t}</div><p className="text-xs text-[var(--text-secondary)]">{item.d}</p></div></div>
                ))}
              </div>
              <div className="bg-gradient-to-r from-[var(--accent)]/10 to-[var(--green)]/10 border border-[var(--accent)]/20 rounded-xl p-6 text-center">
                <h3 className="text-lg font-bold mb-2">Tools change. Frameworks do not.</h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto">Your self-improving agent is one line away. Let us go.</p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

function MHPromptList({ categoryId, onCopy, copiedIdx }: { categoryId: string; onCopy: (text: string, idx: number) => void; copiedIdx: number | null }) {
  const allPrompts: Record<string, string[]> = {
    content: ["Write a YouTube title for a video about [topic] in my voice.", "Draft a 60-second script hook about [topic].", "Turn this transcript into a blog post: [paste].", "Write 10 tweet ideas about [topic].", "Rewrite this paragraph at a 3rd-grade reading level: [paste].", "Create a LinkedIn post from this idea: [idea].", "Write an email subject line for [offer].", "Give me 5 hooks for a short-form video on [topic].", "Summarize this article in 5 bullet points: [link].", "Write a product description for [product].", "Create an outline for a guide about [topic].", "Write a call-to-action for joining a community.", "Turn these notes into a clean newsletter: [notes].", "Write 3 versions of this headline: [headline].", "Draft a thread about [topic] with 7 tweets."],
    research: ["Search the web for the latest news on [topic].", "Find 5 competitors in the [niche] space.", "Summarize what people are saying about [tool].", "Find the top 3 articles about [topic] this week.", "Compare [tool A] and [tool B] for me.", "Find statistics about [topic] from 2026.", "Research my audience biggest pain points around [topic].", "Find trending topics in [niche] right now.", "Look up pricing for [product/service].", "Find quotes from experts on [topic].", "Research the best practices for [task].", "Find case studies about [result].", "Summarize this long PDF for me: [file].", "Find the most asked questions about [topic].", "Check if [claim] is actually true."],
    email: ["Draft a cold outreach email to [type of person].", "Write a follow-up email after no reply.", "Reply to this email politely declining: [paste].", "Write a thank-you email to a new customer.", "Draft an email announcing [news].", "Write a re-engagement email to old leads.", "Make this email shorter and friendlier: [paste].", "Write 3 subject lines and pick the best.", "Draft an apology email for [situation].", "Write a welcome email for new members."],
    automation: ["Send me a daily news summary every morning at 8am.", "Back up my files every night.", "Send me a weekly report every Friday.", "Remind me to review my goals every Monday.", "Check this website daily and tell me if it changes.", "Run a monthly audit of my tasks.", "Alert me when [condition] happens.", "Schedule a daily motivation message.", "Summarize my week every Sunday night.", "Track my progress on [goal] weekly."],
    skill: ["Save this process as a skill I can reuse.", "What have you learned about my business?", "Remember that my brand voice is [description].", "Create a skill for writing my video titles.", "What skills do you have right now?", "Improve the skill you used last time.", "Search our past conversations about [topic].", "Remember my top 3 goals this month.", "Build a skill for my weekly reporting.", "Forget the old instructions about [thing]."],
    business: ["Help me plan my content for next week.", "Brainstorm 10 offers I could create.", "Analyze my biggest time-wasters and suggest fixes.", "Build me a simple 90-day plan for [goal].", "What is one task I should automate first?", "Help me write a job description for [role].", "Create an onboarding checklist for new hires.", "Suggest 5 ways to improve customer retention.", "Draft a simple sales script for [offer].", "Help me prioritize this to-do list: [list]."],
    agent: ["What tools do you currently have enabled?", "Switch your brain to a different model.", "Show me my recent scheduled tasks.", "Compress this conversation to save space.", "Show me my usage this week.", "Spawn a subagent to research [topic] separately.", "What can you do that I am not using yet?", "Walk me through your available commands.", "Set a personality that is direct and friendly.", "Start a fresh conversation."],
    creative: ["Give me 10 video title ideas for [topic].", "Write a hook for the first 5 seconds of my video.", "Turn this video into 3 short clips with captions.", "Write a description for my video on [topic].", "Suggest thumbnail text for [video idea].", "Find trending AI tools to make a video about.", "Write a script outline for a tool review.", "Give me 5 video ideas based on [trending topic].", "Write community post ideas for my channel.", "Summarize the comments on this video: [link]."],
    problem: ["I am stuck on [problem], walk me through it step by step.", "Explain [concept] like I am in 3rd grade.", "What am I missing about [situation]?", "Give me 3 ways to solve [problem].", "Debug this error message for me: [paste].", "What is the simplest version of [complex task]?", "Help me make a decision between [A] and [B].", "What questions should I be asking about [topic]?", "Break this big goal into tiny steps: [goal].", "What is the 80/20 of [task]?"],
    bonus: ["Act as my chief of staff and plan my day.", "Review everything I did today and suggest improvements.", "Build me a custom workflow for [recurring task].", "Be brutally honest \u2014 what is holding my business back?", "Teach me one new thing about AI agents today."],
  };
  const items = allPrompts[categoryId] || [];
  const cat = PROMPT_CATEGORIES.find((c) => c.id === categoryId);
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-sm mb-3">{cat ? cat.label : ""} Prompts ({items.length})</h3>
      {items.map((prompt, i) => (
        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-primary)] hover:bg-[var(--bg-card-hover)] transition-colors group">
          <span className="text-xs text-[var(--text-secondary)] w-5 shrink-0 mt-0.5">{i + 1}.</span>
          <p className="text-sm flex-1 leading-relaxed">{prompt}</p>
          <button onClick={() => onCopy(prompt, i)} className="shrink-0 p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors opacity-0 group-hover:opacity-100" title="Copy prompt">
            {copiedIdx === i ? <Check size={14} className="text-[var(--green)]" /> : <Copy size={14} />}
          </button>
        </div>
      ))}
    </div>
  );
}
