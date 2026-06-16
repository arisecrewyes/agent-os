"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard, Target, BookOpen, Settings, Brain, Zap, Rocket,
  Layers, Database, Bot, Globe, FileText, Check, ChevronRight,
  ChevronDown, Copy, CheckCircle2, AlertCircle, Clock, Play,
  Terminal, ArrowRight, Users, Shield, Wrench, Star, Mic, Code,
  RefreshCw, TrendingUp, ExternalLink
} from "lucide-react";

/* ─── Page Nav ─── */
function PageNav() {
  const items = [
    { label: "Mission Control", icon: <LayoutDashboard size={14} />, href: "/" },
    { label: "Getting Started", icon: <Rocket size={14} />, href: "/getting-started" },
    { label: "Memory Engine", icon: <Brain size={14} />, href: "/memory-system" },
    { label: "Infinite Context", icon: <Database size={14} />, href: "/infinite-context" },
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

/* ─── 30-Day Roadmap ─── */
const ROADMAP = [
  {
    week: 1, title: "Foundation", color: "#6c5ce7", icon: "🏗️",
    goal: "By Day 7, you can type one sentence and get one result back from an agent.",
    days: [
      "Install Hermes on your machine (your baton — the single chat window).",
      "Install the browse.sh CLI: npm install -g browse (your orchestra — 250+ skills).",
      "Set up your Agent OS workspace (the home base for everything).",
      "Add your first 3 skills: browse skills add [domain].",
      "Run one simple test command. Verify it works end-to-end.",
      "Read through the browse.sh catalog. Identify 10 skills relevant to your business.",
      "Celebrate — you just ran your first browser agent. 🎉",
    ],
  },
  {
    week: 2, title: "Your First SOPs", color: "#0984e3", icon: "📜",
    goal: "By Day 14, three of your weekly tasks now have an agent assigned to them.",
    days: [
      "Write your first plain-English SOP: 'Every Monday at 9 AM, check top 5 competitors on LinkedIn and summarise their new posts.'",
      "Write a second SOP for lead scraping or market price checks.",
      "Write a third SOP for content idea hunting or weekly reports.",
      "Save each SOP inside Agent OS.",
      "Run each SOP manually at least twice.",
      "Refine the instructions based on what came back.",
      "Review: Which SOP produced the most useful output? Why?",
    ],
  },
  {
    week: 3, title: "Orchestration", color: "#00b894", icon: "🎻",
    goal: "By Day 21, your agents work without you triggering them.",
    days: [
      "Expand your skill catalog from 3 to 10 skills.",
      "Connect agents that talk to each other: one finds the lead, another enriches it, another writes the outreach.",
      "Set up scheduling so SOPs run automatically (daily, weekly, hourly).",
      "Add memory rules so agents remember context across sessions.",
      "Test a full agent chain end-to-end. Watch the compounding.",
      "Set up output routing: results → inbox, Google Doc, Slack, or database.",
      "Review: Your agents now run without you. The orchestra plays itself.",
    ],
  },
  {
    week: 4, title: "Compound and Scale", color: "#e056fd", icon: "🚀",
    goal: "By Day 30, your agent system runs on its own and gives back at least 10 hours of your week.",
    days: [
      "Audit every SOP — kill the ones that didn't work.",
      "Double down on the ones that produced results.",
      "Add 10 more skills based on the wins.",
      "Document your entire stack: skills inventory, SOP library, agent map.",
      "Hand off documentation to a virtual assistant or teammate.",
      "Calculate time saved this month. Multiply by your hourly rate. That's your ROI.",
      "Plan Month 2: What's the next 10 skills? What's the next agent chain?",
    ],
  },
];

/* ─── SOP Steps ─── */
const SOP_STEPS = [
  { num: 1, title: "Install Hermes (your baton)", detail: "Open your terminal. Run the Hermes install command. Hermes is the single chat window that listens to your plain-English instructions.", icon: <Bot size={16} />, color: "#6c5ce7" },
  { num: 2, title: "Install browse.sh catalog (your orchestra)", detail: "Run npm install -g browse. You now have access to 250+ pre-built browser skills covering Amazon, Zillow, LinkedIn, USPS, Airbnb, Google Flights, and hundreds more.", icon: <Globe size={16} />, color: "#0984e3" },
  { num: 3, title: "Pick your first three skills", detail: "Do not install 50 at once. Pick three that match your real business: one research skill, one e-commerce or lead skill, one logistics or productivity skill.", icon: <Star size={16} />, color: "#00b894" },
  { num: 4, title: "Set up Agent OS (your score)", detail: "This is your central nervous system. It stores your SOPs, agent memory, and routing rules. Every agent reports here. You manage everything from one screen.", icon: <FileText size={16} />, color: "#e056fd" },
  { num: 5, title: "Write your first SOP in plain English", detail: "Example: 'Every Monday at 9 AM, check the top 5 competitors on LinkedIn and summarise their new posts.' Save it in Agent OS. The system handles the schedule.", icon: <Wrench size={16} />, color: "#fdcb6e" },
  { num: 6, title: "Run a test job", detail: "Trigger one of your SOPs manually. Watch what the agent does. Read the result. Tweak the instructions if needed. This is the rehearsal before the live show.", icon: <Play size={16} />, color: "#e17055" },
  { num: 7, title: "Schedule and connect", detail: "Set the SOP to run on a schedule. Connect the output to where it needs to go — your inbox, a Google Doc, a Slack channel, a database. The orchestra now plays without you.", icon: <Clock size={16} />, color: "#6c5ce7" },
  { num: 8, title: "Document and expand", detail: "Keep a running skills inventory. Every new skill gets a row. Every new SOP gets a folder. After 30 days, you have a private agent stack no one can copy.", icon: <TrendingUp size={16} />, color: "#0984e3" },
];

/* ─── Beliefs ─── */
const BELIEFS = [
  { wrong: "I have to be a coder to set up AI agents.", right: "Hermes installs in 60 seconds. You type in plain English. If you can text a friend, you can run an agent." },
  { wrong: "I will end up with 10 different apps and 50 browser tabs.", right: "Agent OS gives you ONE command tower. Every agent reports to one screen. One inbox. One log." },
  { wrong: "Web automation is fragile — it always breaks when a site updates.", right: "browse.sh is a public catalog — when a site changes, the skill is updated by the community and your agent just keeps working." },
  { wrong: "Only big tech teams can run agents 24/7.", right: "A solo operator with a laptop now runs more agents in a day than a 50-person team did in 2020." },
  { wrong: "AI tools just write text — they cannot actually DO things.", right: "Browser agents book flights, track packages, scrape competitors, post content, audit websites, pull data, and fill forms. They ACT, not just talk." },
  { wrong: "If I learn this now, it will be outdated in a month.", right: "The orchestra changes — the conductor skill compounds. Learning to conduct agents is the leverage skill of this decade." },
];

/* ─── Example Commands ─── */
const EXAMPLE_COMMANDS = [
  { cmd: "npm install -g browse", desc: "Install the browser skill catalog (once)" },
  { cmd: "browse skills add alltrails.com", desc: "Add AllTrails skill" },
  { cmd: "browse skills add recreation.gov", desc: "Add Recreation.gov skill" },
  { cmd: "browse skills add airbnb.com", desc: "Add Airbnb skill" },
  { cmd: "browse skills add linkedin.com", desc: "Add LinkedIn skill" },
  { cmd: 'hermes "Plan a Utah road trip with EV charging stops and Airbnb stays under $200/night."', desc: "Full plan from one sentence" },
];

/* ─── Main Component ─── */
export default function ConductorStackPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "framework" | "howitworks" | "sop" | "roadmap" | "beliefs" | "recap">("overview");
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: <Rocket size={16} /> },
    { id: "framework" as const, label: "5-Layer Framework", icon: <Layers size={16} /> },
    { id: "howitworks" as const, label: "How It Works", icon: <Play size={16} /> },
    { id: "sop" as const, label: "8-Step SOP", icon: <FileText size={16} /> },
    { id: "roadmap" as const, label: "30-Day Plan", icon: <Clock size={16} /> },
    { id: "beliefs" as const, label: "Beliefs", icon: <Shield size={16} /> },
    { id: "recap" as const, label: "Recap", icon: <Star size={16} /> },
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
            <Layers size={14} /> The Goldie Conductor Stack™
          </motion.div>
          <h1 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Command an Army of AI Browser Agents
            </span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-2">
            One screen. One command line. Agents that go and DO things on the internet for you.
          </p>
          <p className="text-sm text-[var(--text-secondary)] italic max-w-xl mx-auto">
            &quot;Most people use AI like a calculator. A small group has learned to use AI like a workforce. The Conductor Stack is how you cross that gap.&quot;
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
              {/* What is a browser agent */}
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h2 className="text-lg font-semibold mb-3">What Is a Browser Agent?</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  Imagine you had a tiny robot that could open a web browser and do work for you. It could check flights, track packages, scrape leads, fill forms, post content, hunt deals, and pull data — all by itself.
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  Now imagine you had <strong>fifty</strong> tiny robots, all doing different jobs at the same time. That sounds great — but it would also be chaos. You&apos;d lose track of who was doing what. Fifty browser tabs. No idea what was happening.
                </p>
                <div className="bg-[var(--bg-primary)] rounded-lg p-4 border-l-4 border-[var(--accent)]">
                  <p className="text-sm font-medium">
                    That&apos;s where <strong>Agent OS</strong> comes in. It&apos;s like a control tower for all your robots. One screen. One command line. Every agent reports to you in one place.
                  </p>
                </div>
              </div>

              {/* The Three Pieces */}
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h2 className="text-lg font-semibold mb-4">The Three Pieces</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: "Hermes", role: "The Baton", desc: "A chat window that controls AI agents. You type in plain English. Hermes turns your words into agent instructions and calls the right skill.", icon: <Bot size={20} />, color: "#6c5ce7" },
                    { name: "browse.sh", role: "The Orchestra", desc: "A free library of 250+ pre-built browser skills. Amazon, Airbnb, LinkedIn, USPS, Zillow, IRS, Google Flights, and more.", icon: <Globe size={20} />, color: "#0984e3" },
                    { name: "Agent OS", role: "The Score", desc: "The system that ties everything together. SOPs, memory, routing, and workflows. Manage everything from one home base.", icon: <FileText size={20} />, color: "#00b894" },
                  ].map((item) => (
                    <div key={item.name} className="bg-[var(--bg-primary)] rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                          {item.icon}
                        </div>
                        <div>
                          <div className="font-bold text-sm">{item.name}</div>
                          <div className="text-xs text-[var(--text-secondary)]">{item.role}</div>
                        </div>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)]">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compounding Effect */}
              <div className="bg-gradient-to-r from-[var(--accent)]/10 to-[var(--green)]/10 border border-[var(--accent)]/20 rounded-xl p-6 text-center">
                <h3 className="text-lg font-bold mb-2">The Conductor Compounding Effect</h3>
                <div className="flex items-center justify-center gap-4 flex-wrap text-sm">
                  <span className="px-3 py-1.5 rounded-lg bg-[var(--bg-card)]">1st agent → saves 1 hour</span>
                  <ArrowRight size={16} />
                  <span className="px-3 py-1.5 rounded-lg bg-[var(--bg-card)]">10th agent → saves 1 week</span>
                  <ArrowRight size={16} />
                  <span className="px-3 py-1.5 rounded-lg bg-[var(--accent)]/20 text-[var(--accent)] font-bold">50th agent → gives you a life</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── FRAMEWORK TAB ─── */}
          {activeTab === "framework" && (
            <motion.div key="framework" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold mb-2">The Goldie Conductor Stack™</h2>
                <p className="text-sm text-[var(--text-secondary)]">Think of yourself as the conductor of an orchestra. You don&apos;t play the violin. You raise your baton, and the musicians play.</p>
              </div>

              {/* Visual Diagram */}
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <div className="flex flex-col items-center gap-3">
                  {[
                    { layer: 5, title: "ENCORE", sub: "Compound Output", desc: "Reports written. Leads researched. Content goes out. You wake up and the orchestra performed all night.", icon: "🚀", color: "#fdcb6e" },
                    { layer: 4, title: "SCORE", sub: "Agent OS", desc: "SOPs, memory, routing, and workflows. Tells every agent what order to play in.", icon: "📜", color: "#e056fd" },
                    { layer: 3, title: "ORCHESTRA", sub: "Browser Skills", desc: "250+ pre-built skills. Amazon, Airbnb, LinkedIn, Zillow, Google Flights.", icon: "🎻", color: "#00b894" },
                    { layer: 2, title: "BATON", sub: "Hermes Agent", desc: "Single command window. Plain English. Calls the right skill.", icon: "🪄", color: "#0984e3" },
                    { layer: 1, title: "CONDUCTOR", sub: "You", desc: "Set the vision and the rules. Decide what gets done. Never touch a violin.", icon: "🎩", color: "#6c5ce7" },
                  ].map((item) => (
                    <motion.div key={item.layer} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (5 - item.layer) * 0.1 }}
                      className="w-full max-w-md"
                    >
                      <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: `${item.color}10`, border: `1px solid ${item.color}20` }}>
                        <div className="text-2xl">{item.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${item.color}20`, color: item.color }}>Layer {item.layer}</span>
                            <span className="font-bold text-sm">{item.title}</span>
                            <span className="text-xs text-[var(--text-secondary)]">— {item.sub}</span>
                          </div>
                          <p className="text-xs text-[var(--text-secondary)] mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                      {item.layer > 1 && (
                        <div className="flex justify-center py-1">
                          <ArrowRight size={14} className="text-[var(--text-secondary)] rotate-90" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Why this matters */}
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h3 className="font-semibold mb-3">Why This Framework Matters</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Most people stop at Layer 2. They use one chat window, one tool, one tab at a time. The Conductor Stack adds Layers 3, 4, and 5 — <strong>that&apos;s where the compounding lives</strong>. One agent is a toy. A conducted orchestra of agents is a business.
                </p>
              </div>

              {/* Quote */}
              <div className="bg-[var(--bg-card)] border-l-4 border-[var(--accent)] rounded-xl p-5">
                <p className="text-sm font-medium italic">
                  &quot;The people who win the next ten years are not the ones who write the best prompts. They are the ones who build the best systems for their agents to run inside.&quot;
                </p>
                <p className="text-xs text-[var(--text-secondary)] mt-2">— Julian Goldie, on the Conductor Stack</p>
              </div>
            </motion.div>
          )}

          {/* ─── HOW IT WORKS TAB ─── */}
          {activeTab === "howitworks" && (
            <motion.div key="howitworks" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              {/* Flow Diagram */}
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h2 className="text-lg font-semibold mb-4">How the Three Pieces Fit Together</h2>
                <div className="flex flex-col items-center gap-3">
                  <div className="px-4 py-2 rounded-xl bg-[var(--purple)]/10 border border-[var(--purple)]/20 text-center">
                    <div className="text-lg">🎩</div>
                    <div className="font-bold text-sm">YOU</div>
                    <div className="text-xs text-[var(--text-secondary)]">Set vision & rules</div>
                  </div>
                  <ArrowRight size={16} className="text-[var(--text-secondary)] rotate-90" />
                  <div className="px-4 py-2 rounded-xl bg-[var(--blue)]/10 border border-[var(--blue)]/20 text-center">
                    <div className="text-lg">🪄</div>
                    <div className="font-bold text-sm">HERMES</div>
                    <div className="text-xs text-[var(--text-secondary)]">Plain English → agent instructions</div>
                  </div>
                  <ArrowRight size={16} className="text-[var(--text-secondary)] rotate-90" />
                  <div className="px-4 py-2 rounded-xl bg-[var(--green)]/10 border border-[var(--green)]/20 text-center max-w-xs">
                    <div className="text-lg">🎻</div>
                    <div className="font-bold text-sm">browse.sh — 250+ Skills</div>
                    <div className="text-xs text-[var(--text-secondary)]">Amazon · Airbnb · Zillow · LinkedIn · USPS · Google Flights…</div>
                  </div>
                  <ArrowRight size={16} className="text-[var(--text-secondary)] rotate-90" />
                  <div className="px-4 py-2 rounded-xl bg-[var(--pink)]/10 border border-[var(--pink)]/20 text-center">
                    <div className="text-lg">🚀</div>
                    <div className="font-bold text-sm">RESULT</div>
                    <div className="text-xs text-[var(--text-secondary)]">Back to your one screen</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-xs text-[var(--text-secondary)]">📜 Agent OS — the score that conducts every step</span>
                </div>
              </div>

              {/* What you actually type */}
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h2 className="text-lg font-semibold mb-4">What You Actually Type</h2>
                <p className="text-sm text-[var(--text-secondary)] mb-4">Here&apos;s what a real session looks like. You open your terminal. You type one line. The agent does the rest.</p>

                <div className="space-y-2 mb-4">
                  {EXAMPLE_COMMANDS.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-[var(--bg-primary)] rounded-lg p-3 group">
                      <code className="flex-1 text-sm font-mono text-[var(--accent)] overflow-x-auto">{item.cmd}</code>
                      <span className="text-xs text-[var(--text-secondary)] shrink-0 hidden sm:block">{item.desc}</span>
                      <button onClick={() => copyToClipboard(item.cmd)} className="shrink-0 p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                        {copiedCmd === item.cmd ? <Check size={14} className="text-[var(--green)]" /> : <Copy size={14} />}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-[var(--green)]/10 border border-[var(--green)]/20 rounded-lg p-4">
                  <p className="text-sm text-[var(--green)]">
                    <strong>That&apos;s the whole experience.</strong> One line in. A full plan out. No tabs. No copy-paste. No prompt engineering tricks.
                  </p>
                </div>
              </div>

              {/* Skill Categories */}
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h2 className="text-lg font-semibold mb-4">browse.sh Skill Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { cat: "Travel", examples: "Google Flights, Airbnb, AllTrails, Recreation.gov" },
                    { cat: "Real Estate", examples: "Zillow, Redfin, Realtor.com" },
                    { cat: "E-Commerce", examples: "Amazon, eBay, Etsy, Walmart" },
                    { cat: "Professional", examples: "LinkedIn, Indeed, Glassdoor" },
                    { cat: "Logistics", examples: "USPS, FedEx, UPS tracking" },
                    { cat: "Research", examples: "Google Scholar, Wikipedia, IRS" },
                    { cat: "Lifestyle", examples: "Yelp, TripAdvisor, PlugShare" },
                    { cat: "Finance", examples: "Banking, crypto, stock tracking" },
                    { cat: "Content", examples: "YouTube, Reddit, news sites" },
                  ].map((item) => (
                    <div key={item.cat} className="bg-[var(--bg-primary)] rounded-lg p-3">
                      <div className="font-medium text-sm mb-1">{item.cat}</div>
                      <div className="text-xs text-[var(--text-secondary)]">{item.examples}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── SOP TAB ─── */}
          {activeTab === "sop" && (
            <motion.div key="sop" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">The 8-Step SOP</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4">Follow this once and you have a working system for life.</p>

              {SOP_STEPS.map((step) => (
                <div key={step.num} className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${step.color}20`, color: step.color }}>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${step.color}20`, color: step.color }}>Step {step.num}</span>
                        <h3 className="font-semibold text-sm">{step.title}</h3>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)]">{step.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* ─── ROADMAP TAB ─── */}
          {activeTab === "roadmap" && (
            <motion.div key="roadmap" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">30-Day Implementation Roadmap</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4">Do not skip ahead. Each week builds on the last.</p>

              {ROADMAP.map((week) => {
                const isExpanded = expandedWeek === week.week;
                return (
                  <div key={week.week} className="glow-border rounded-xl bg-[var(--bg-card)] overflow-hidden">
                    <button onClick={() => setExpandedWeek(isExpanded ? null : week.week)}
                      className="w-full flex items-center gap-3 p-4 text-left hover:bg-[var(--bg-card-hover)] transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xl" style={{ backgroundColor: `${week.color}15` }}>
                        {week.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">Days {(week.week - 1) * 7 + 1}-{week.week * 7} — Week {week.week}: {week.title}</div>
                        <div className="text-xs text-[var(--text-secondary)]">{week.goal}</div>
                      </div>
                      <ChevronDown size={16} className={`text-[var(--text-secondary)] transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="px-4 pb-4 space-y-2">
                            {week.days.map((day, i) => (
                              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-primary)] hover:bg-[var(--bg-card-hover)] transition-colors">
                                <span className="text-xs font-bold w-6 shrink-0 mt-0.5" style={{ color: week.color }}>D{i + 1 + (week.week - 1) * 7}</span>
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

          {/* ─── BELIEFS TAB ─── */}
          {activeTab === "beliefs" && (
            <motion.div key="beliefs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <div className="text-center mb-4">
                <h2 className="text-lg font-semibold mb-2">Breaking the 6 Biggest Myths</h2>
                <p className="text-sm text-[var(--text-secondary)]">Most people never start because they believe the wrong thing.</p>
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

          {/* ─── RECAP TAB ─── */}
          {activeTab === "recap" && (
            <motion.div key="recap" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <h2 className="text-lg font-semibold text-center mb-4">The Recap — In One Glance</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: "🎩", title: "You are the Conductor", desc: "Set the vision. Agents do the playing.", color: "#6c5ce7" },
                  { icon: "🪄", title: "Hermes is the Baton", desc: "One chat window. Plain English. Calls the right skill.", color: "#0984e3" },
                  { icon: "🎻", title: "browse.sh is the Orchestra", desc: "250+ ready-made browser skills. One CLI command to install.", color: "#00b894" },
                  { icon: "📜", title: "Agent OS is the Score", desc: "SOPs, memory, schedules, routing — all in one home base.", color: "#e056fd" },
                  { icon: "🚀", title: "Compound Output", desc: "Agents work while you sleep. Results keep arriving.", color: "#fdcb6e" },
                  { icon: "🧨", title: "Beliefs Broken", desc: "No code. No chaos. No fragility. The orchestra is real.", color: "#e17055" },
                ].map((item) => (
                  <div key={item.title} className="glow-border rounded-xl bg-[var(--bg-card)] p-4 flex items-start gap-3">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <div className="font-bold text-sm">{item.title}</div>
                      <p className="text-xs text-[var(--text-secondary)]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* SOP Summary */}
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h3 className="font-semibold mb-3">📋 8-Step SOP Summary</h3>
                <div className="flex flex-wrap gap-2">
                  {SOP_STEPS.map((step) => (
                    <div key={step.num} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-primary)] text-xs">
                      <span className="font-bold" style={{ color: step.color }}>{step.num}.</span>
                      {step.title}
                    </div>
                  ))}
                </div>
              </div>

              {/* 30-Day Summary */}
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h3 className="font-semibold mb-3">🗓️ 30-Day Plan Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {ROADMAP.map((week) => (
                    <div key={week.week} className="text-center p-3 rounded-lg" style={{ backgroundColor: `${week.color}10`, border: `1px solid ${week.color}20` }}>
                      <div className="text-xl mb-1">{week.icon}</div>
                      <div className="font-bold text-sm" style={{ color: week.color }}>Week {week.week}</div>
                      <div className="text-xs text-[var(--text-secondary)]">{week.title}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Line */}
              <div className="bg-gradient-to-r from-[var(--accent)]/10 to-[var(--green)]/10 border border-[var(--accent)]/20 rounded-xl p-6 text-center">
                <h3 className="text-lg font-bold mb-2">The Bottom Line</h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
                  Simple on the surface. Compounding underneath. The first agent saves you an hour. The tenth agent saves you a week. The fiftieth agent gives you a life.
                </p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
