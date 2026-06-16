"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard, Target, BookOpen, Settings, Brain, Zap, Rocket,
  Database, Bot, FileText, Check, CheckCircle2, ChevronRight, XCircle, ArrowRight,
  Shield, Wrench, Star, Globe, Cpu, Users, Heart, Layers, RefreshCw,
  Monitor, Cloud, Lock, Palette, Clock, TrendingUp
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

const COMPARISON = [
  { category: "App Philosophy", odysseus: "A polished workspace with an AI model underneath. Built to be used alone.", hermes: "A component built to be molded, orchestrated, and plugged into a wider system.", winner: "hermes" },
  { category: "UI & Workflow", odysseus: "Click email = pop-up. Click another tool = another pop-up. Multiple windows stack up. Gets clunky.", hermes: "Stays clean whether you are in the terminal or the agent OS. No pop-up chaos.", winner: "hermes" },
  { category: "Memory & Skills", odysseus: "Brain is baked into the app. Manually add memories, import from Obsidian. Not living memory shared across agents.", hermes: "Memory is optional and configurable. Plug in whatever system you want. Share across multiple agents.", winner: "hermes" },
  { category: "Local vs Cloud Models", odysseus: "Built for local models. Cookbook grades which models perform best on your setup. Nudges toward local-only.", hermes: "Optimized for both. Easy onboarding across cloud and local models.", winner: "hermes" },
  { category: "Performance", odysseus: "Roughly the same for day-to-day tasks with the same model (tested with Gemma 4).", hermes: "Slightly more in-depth responses. No dramatic difference in general responses.", winner: "tie" },
  { category: "Customization", odysseus: "What you see is what you get. Self-contained box.", hermes: "Built to be molded. Run as hands doing work while customizing everything on top.", winner: "hermes" },
  { category: "24/7 Operation", odysseus: "Designed as an app you open and use.", hermes: "Built to run 24/7 in the background. Always on.", winner: "hermes" },
  { category: "Multi-Agent", odysseus: "Single agent. Standalone.", hermes: "Multiple agents working together. Orchestrated.", winner: "hermes" },
  { category: "Future-Proofing", odysseus: "When something better drops, the whole thing gets replaced.", hermes: "Swap and change components without throwing everything out. Plug in new models within hours.", winner: "hermes" },
];

const WHO_ODYSSEUS = [
  "Just getting into AI agents and want to test something simple",
  "Want one tidy app with built-in email and calendar",
  "Prefer running local models to keep everything private",
  "Like self-hosting and are happy with a single AI agent",
];

const WHO_HERMES = [
  "Want it working 24/7 in the background",
  "Want multiple agents working together",
  "Want to mold and customize the system around how you work",
  "Care about building something that lasts",
];

export default function HermesVsOdysseusPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: <Monitor size={16} /> },
    { id: "comparison", label: "Side-by-Side", icon: <ArrowRight size={16} /> },
    { id: "who", label: "Who Should Use", icon: <Users size={16} /> },
    { id: "future", label: "Future-Proofing", icon: <TrendingUp size={16} /> },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto p-6">
        <PageNav />
        <div className="mb-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium mb-4">
            <Monitor size={14} /> Odysseus vs Hermes
          </motion.div>
          <h1 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">Which AI Agent Should You Actually Use?</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-2">Two open-source AI agents. Two very different philosophies.</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--green)]/10 text-[var(--green)] text-sm font-bold mt-2">
            <Check size={16} /> Quick Verdict: Hermes wins for long-term control and future-proofing
          </div>
        </div>
        <div className="flex gap-1 mb-6 bg-[var(--bg-secondary)] rounded-xl p-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id ? "bg-[var(--accent)] text-white" : "text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"}`}
            >{tab.icon}{tab.label}</button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#0984e3]/10 text-[#0984e3]"><Globe size={24} /></div>
                  <div><h3 className="font-bold text-lg">Odysseus</h3><p className="text-xs text-[var(--text-secondary)]">by PewDiePie</p></div>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-4">A polished, all-in-one app you run and manage yourself. Great for getting started and running local/private models.</p>
                <div className="space-y-2">
                  {["One tidy app with everything built-in", "Built-in email and calendar", "Local model optimized", "Simple setup for beginners", "30,000 GitHub stars in 2 days"].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"><CheckCircle2 size={12} className="text-[#0984e3] shrink-0" />{f}</div>
                  ))}
                </div>
              </div>
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#6c5ce7]/10 text-[#6c5ce7]"><Bot size={24} /></div>
                  <div><h3 className="font-bold text-lg">Hermes Agent</h3><p className="text-xs text-[var(--text-secondary)]">by Nous Research</p></div>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-4">A flexible agent you build into your own system, run 24/7, and orchestrate with other agents. Built to be molded.</p>
                <div className="space-y-2">
                  {["Run 24/7 in the background", "Multi-agent orchestration", "Cloud + local optimized", "Fully customizable and moldable", "Built-in learning loop + memory"].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"><CheckCircle2 size={12} className="text-[#6c5ce7] shrink-0" />{f}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[var(--accent)]/10 to-[var(--green)]/10 border border-[var(--accent)]/20 rounded-xl p-6 text-center">
              <h3 className="text-lg font-bold mb-2">The Quick Verdict</h3>
              <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto"><strong>Odysseus</strong> = one tidy app, great for getting started and running local/private models.<br/><strong>Hermes</strong> = a flexible agent you build into your own system, run 24/7, and orchestrate with other agents.<br/><br/>If you want long-term control and future-proofing, <strong>Hermes wins</strong>.</p>
            </div>
          </div>
        )}

        {activeTab === "comparison" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-2">Side-by-Side Comparison</h2>
            <div className="glow-border rounded-xl overflow-hidden">
              <div className="grid grid-cols-3 bg-[var(--bg-secondary)]">
                <div className="p-3 text-sm font-bold text-[var(--text-secondary)]">Category</div>
                <div className="p-3 text-sm font-bold text-[#0984e3] flex items-center gap-2"><Globe size={14} /> Odysseus</div>
                <div className="p-3 text-sm font-bold text-[#6c5ce7] flex items-center gap-2"><Bot size={14} /> Hermes</div>
              </div>
              {COMPARISON.map((row, i) => (
                <div key={i} className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-[var(--bg-card)]" : "bg-[var(--bg-primary)]"}`}>
                  <div className="p-3 text-sm font-medium">{row.category}</div>
                  <div className="p-3 text-sm text-[var(--text-secondary)]">{row.odysseus}</div>
                  <div className="p-3 text-sm text-[var(--text-secondary)]">{row.hermes}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "who" && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold mb-2">Who Should Use Each One</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#0984e3]"><Globe size={20} /> Choose Odysseus If You:</h3>
                <div className="space-y-3">
                  {WHO_ODYSSEUS.map((item) => (
                    <div key={item} className="flex items-start gap-3"><CheckCircle2 size={16} className="text-[#0984e3] shrink-0 mt-0.5" /><p className="text-sm">{item}</p></div>
                  ))}
                </div>
              </div>
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#6c5ce7]"><Bot size={20} /> Choose Hermes If You:</h3>
                <div className="space-y-3">
                  {WHO_HERMES.map((item) => (
                    <div key={item} className="flex items-start gap-3"><CheckCircle2 size={16} className="text-[#6c5ce7] shrink-0 mt-0.5" /><p className="text-sm">{item}</p></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "future" && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold mb-2">The Bigger Principle: Future-Proofing</h2>
            <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">The AI agents we use today are completely different from six months ago. The industry moves that fast.</p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4"><strong>Odysseus</strong> is a cool, capable app, but it is a self-contained box. When something better drops in six months, the whole thing gets replaced.</p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4"><strong>A system you build yourself</strong> works differently. When the next big model lands (say a new release with a built-in voice agent), you can plug it in within hours — swap and change components without throwing everything out.</p>
              <div className="bg-[var(--bg-primary)] rounded-lg p-4 border-l-4 border-[var(--accent)]">
                <p className="text-sm font-medium">Standalone apps do not give you that. If you cannot customize it, you cannot improve it. If you cannot build systems around it, you stay stuck with whatever the makers shipped.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glow-border rounded-xl bg-red-500/5 border-red-500/20 p-5">
                <h3 className="font-semibold text-red-400 mb-3">Odysseus: The Box</h3>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li className="flex items-start gap-2"><XCircle size={14} className="text-red-400 shrink-0 mt-0.5" />Self-contained app</li>
                  <li className="flex items-start gap-2"><XCircle size={14} className="text-red-400 shrink-0 mt-0.5" />Hard to customize</li>
                  <li className="flex items-start gap-2"><XCircle size={14} className="text-red-400 shrink-0 mt-0.5" />Whole thing gets replaced</li>
                  <li className="flex items-start gap-2"><XCircle size={14} className="text-red-400 shrink-0 mt-0.5" />Single agent only</li>
                </ul>
              </div>
              <div className="glow-border rounded-xl bg-[var(--green)]/5 border-[var(--green)]/20 p-5">
                <h3 className="font-semibold text-[var(--green)] mb-3">Hermes: The System</h3>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li className="flex items-start gap-2"><Check size={14} className="text-[var(--green)] shrink-0 mt-0.5" />Modular components</li>
                  <li className="flex items-start gap-2"><Check size={14} className="text-[var(--green)] shrink-0 mt-0.5" />Fully customizable</li>
                  <li className="flex items-start gap-2"><Check size={14} className="text-[var(--green)] shrink-0 mt-0.5" />Swap models in hours</li>
                  <li className="flex items-start gap-2"><Check size={14} className="text-[var(--green)] shrink-0 mt-0.5" />Multi-agent orchestration</li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[var(--accent)]/10 to-[var(--green)]/10 border border-[var(--accent)]/20 rounded-xl p-6 text-center">
              <h3 className="text-lg font-bold mb-2">Bottom Line</h3>
              <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto">Both being open source is great for innovation. Odysseus is worth trying \u2014 especially for local-first beginners. But for control, customization, and staying ahead of how fast this space moves, <strong>Hermes is the pick</strong>.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
