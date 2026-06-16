"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard, Target, BookOpen, Settings, Brain, Zap, Rocket,
  Database, Bot, FileText, Check, ChevronRight, ChevronDown, Copy,
  CheckCircle2, AlertCircle, Clock, Layers, RefreshCw, ArrowRight,
  Shield, Wrench, Star, Mic, Eye, Sparkles, MessageSquare, TrendingUp,
  Users, Heart, Palette
} from "lucide-react";

function PageNav() {
  const items = [
    { label: "Mission Control", icon: <LayoutDashboard size={14} />, href: "/" },
    { label: "Getting Started", icon: <Rocket size={14} />, href: "/getting-started" },
    { label: "Memory Engine", icon: <Brain size={14} />, href: "/memory-system" },
    { label: "Infinite Context", icon: <Database size={14} />, href: "/infinite-context" },
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
  { week: 1, title: "Foundation", color: "#6c5ce7", icon: "\u{1F331}", days: ["Download Obsidian (free). Create vault My Second Brain.", "Make About Me note. Use Gemini: Ask me 10 simple questions about my business, then write a clean About Me note.", "Add Goals note. Prompt: Help me write my top 5 business goals for the next 90 days in simple bullet points.", "Map your audience. Make People folder. Prompt: Help me make a simple profile for my ideal customer.", "Pick your AI agent. Connect it to your vault: My notes are in this Obsidian folder. Use them for memory.", "Test the memory: Based on my notes, what do I do and who do I help? Watch it answer in YOUR voice.", "Reflect: Write one note about what surprised you this week."] },
  { week: 2, title: "Automate", color: "#0984e3", icon: "\u26A1", days: ["Turn on auto-notes. Set up a free note-taking tool that feeds your vault automatically.", "Build a content engine: Read my vault. Write me a week of short posts that sound like me.", "Make a visual dashboard: Build me a colorful single-page dashboard showing my goals, tasks, and notes.", "Auto-summarize your week: Read everything I added to my vault this week. Give me a 5-bullet summary.", "Train it on your voice: Drop 3 things you have written. Study how I write. Save a note describing my tone and style.", "Build a FAQ brain: Based on my notes, write answers to the 10 questions my customers ask most.", "Review: Ask your agent what it learned about you this week."] },
  { week: 3, title: "Scale", color: "#00b894", icon: "\u{1F680}", days: ["Connect a second agent. Point a different AI tool at the SAME vault. Now you have a shared brain.", "Test the handoff: Have one agent write a note. Ask the other to read it the next day. Watch them line up.", "Build a research note: Upload best content to NotebookLM. Pull out my key ideas and save them as a note.", "Make an idea generator: Based on everything in my vault, give me 10 new content ideas that fit my brand.", "Build a visual timeline: Make a bright, colorful timeline showing everything I built this month.", "Audit your edge: Based on my notes, what makes my business different from everyone else?", "Reflect and tidy: Ask your agent to clean and color-code your vault."] },
  { week: 4, title: "Systematise", color: "#e056fd", icon: "\u{1F3D7}\uFE0F", days: ["Build your daily start: Every morning, read my vault and give me 3 priorities for today.", "Build a weekly review: Each week, summarize what I did and suggest one thing to improve.", "Create automation ideas: Based on what I have been doing, what could I set up to save time?", "Build a welcome guide: Write a simple guide that explains my business to a new team member, using my vault.", "Make it pretty: Turn my mission control into something visually stunning.", "Test the full loop: Run a real task end to end. Watch the brain feed itself.", "Find your gaps: Look at my vault. What is missing that would make you smarter about my business?", "Document the system: Write one note that explains your whole setup.", "Look back: Read your Day 7 reflection. See how far the brain has come."] },
];

const BELIEFS = [
  { wrong: "I am not technical enough to set this up.", right: "Obsidian is just text files in folders. If you can save a note, you can build this. Simple beats complicated.", icon: <Shield size={16} />, color: "#6c5ce7" },
  { wrong: "Good AI memory must cost a lot.", right: "Obsidian, the agents, the note-takers \u2014 all free and open source. Being early matters more than spending big.", icon: <Star size={16} />, color: "#0984e3" },
  { wrong: "I do not have time to write all these notes.", right: "You do not write them. The AI writes the notes for you, automatically.", icon: <Clock size={16} />, color: "#00b894" },
  { wrong: "AI just gives generic answers \u2014 it will never sound like me.", right: "AI is only generic when it is starving. Feed it your real notes, goals, style \u2014 and it speaks in your voice.", icon: <MessageSquare size={16} />, color: "#e056fd" },
  { wrong: "My notes are too messy for this to work.", right: "Messy is a fine starting point. The AI cleans, tags, and color-codes it for you.", icon: <Wrench size={16} />, color: "#fdcb6e" },
  { wrong: "If I use lots of AI tools, they will just contradict each other.", right: "Point them all at one vault and they line up. One voice, one business, all yours.", icon: <Users size={16} />, color: "#e17055" },
  { wrong: "It is too late for me \u2014 everyone is already ahead.", right: "This setup is brand new. Most people have not even heard of it. You are not behind \u2014 you are early.", icon: <Rocket size={16} />, color: "#6c5ce7" },
  { wrong: "I have tried AI stuff before and quit. I will just quit again.", right: "This system gets BETTER the longer you use it. It rewards you for showing up. Consistency finally pays you back.", icon: <RefreshCw size={16} />, color: "#00b894" },
];

const OLD_VS_NEW = [
  { old: "Open your AI from a blank slate every morning.", new: "Your AI already knows you the second you open it." },
  { old: "Paste the same context paragraph over and over.", new: "One shared brain that every agent reads from." },
  { old: "Re-explain who you are and what you do.", new: "Answers that sound exactly like you." },
  { old: "Get generic, flat answers that sound like nobody.", new: "The AI writes and organizes the notes for you." },
  { old: "Your tools do not talk to each other.", new: "All your tools line up and speak in one voice." },
  { old: "You lose months of useful context.", new: "Every note you write becomes part of your edge." },
  { old: "Waste 30 seconds (and your energy) per chat.", new: "A teammate that gets sharper every single day." },
];

const PROMPT_CATEGORIES = [
  { id: "setup", label: "Second Brain Setup", icon: <Database size={14} />, count: 10 },
  { id: "connect", label: "Connecting Agents", icon: <Bot size={14} />, count: 10 },
  { id: "content", label: "Content In Your Voice", icon: <MessageSquare size={14} />, count: 10 },
  { id: "visual", label: "Visual & Dashboards", icon: <Palette size={14} />, count: 10 },
  { id: "organize", label: "Organizing Vault", icon: <FileText size={14} />, count: 10 },
  { id: "daily", label: "Daily & Weekly", icon: <Clock size={14} />, count: 10 },
  { id: "automate", label: "Finding Automation", icon: <Zap size={14} />, count: 10 },
  { id: "audience", label: "Audience & Growth", icon: <TrendingUp size={14} />, count: 10 },
  { id: "voice", label: "Voice & Style", icon: <Mic size={14} />, count: 10 },
  { id: "research", label: "Research & Ideas", icon: <Eye size={14} />, count: 10 },
  { id: "bonus", label: "Bonus Power Prompts", icon: <Star size={14} />, count: 5 },
];

export default function SecondBrainPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);
  const [selectedPromptCat, setSelectedPromptCat] = useState<string | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: <Brain size={16} /> },
    { id: "stack", label: "5-Layer Stack", icon: <Layers size={16} /> },
    { id: "howitworks", label: "How It Works", icon: <RefreshCw size={16} /> },
    { id: "roadmap", label: "30-Day Plan", icon: <Clock size={16} /> },
    { id: "prompts", label: "100+ Prompts", icon: <Sparkles size={16} /> },
    { id: "beliefs", label: "Beliefs", icon: <Shield size={16} /> },
    { id: "comparison", label: "Old vs New", icon: <ArrowRight size={16} /> },
    { id: "recap", label: "Recap", icon: <Star size={16} /> },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto p-6">
        <PageNav />
        <div className="mb-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--green)]/10 text-[var(--green)] text-sm font-medium mb-4">
            <Brain size={14} /> The Goldie Second Brain Stack
          </motion.div>
          <h1 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">Give Your AI a Permanent Memory</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-2">A shared brain that every agent reads from. One voice. One business. All yours.</p>
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
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2"><AlertCircle size={18} className="text-red-400" />Your AI Forgets You Every Time</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">Right now your AI forgets you the second you close the tab. You open it tomorrow \u2014 no idea who you are, what you sell, what you did yesterday. So you copy and paste the same context paragraph. Over and over. Every single day.</p>
                <div className="bg-[var(--bg-primary)] rounded-lg p-4 border-l-4 border-[var(--accent)]">
                  <p className="text-sm font-medium italic">Imagine hiring a brilliant assistant. But every morning they showed up with total amnesia. You would have to re-explain your whole business. Every. Single. Day. That is how most people use AI right now.</p>
                </div>
              </div>
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2"><CheckCircle2 size={18} className="text-[var(--green)]" />The Solution: A Shared Brain</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">A free tool that plugs into your AI and gives it a brain that <strong>NEVER forgets</strong>. Remembers your goals, clients, what you built last month. And you do not write the notes \u2014 <strong>the AI writes them for you</strong>. While you sleep.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[{ name: "Obsidian", role: "The Vault", icon: <Database size={20} />, color: "#0984e3", desc: "Free. Just text files and folders. All AI agents speak markdown." }, { name: "Your Agent", role: "The Reader", icon: <Bot size={20} />, color: "#6c5ce7", desc: "Reads the vault before every conversation. Already knows you." }, { name: "Auto-Notes", role: "The Writer", icon: <FileText size={20} />, color: "#00b894", desc: "AI writes notes automatically. Saves the important stuff." }].map((t) => (
                    <div key={t.name} className="bg-[var(--bg-primary)] rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${t.color}20`, color: t.color }}>{t.icon}</div><div><div className="font-bold text-sm">{t.name}</div><div className="text-xs text-[var(--text-secondary)]">{t.role}</div></div></div>
                      <p className="text-xs text-[var(--text-secondary)]">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2"><Heart size={18} className="text-[var(--pink)]" />Julian Story</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">For years Julian opened his AI and it knew nothing. Pasted in who he is, his goals, his team. Thirty seconds wasted every chat. Answers? Generic. Flat. Like talking to a stranger.</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">He runs 50+ at his SEO agency. Creates content reaching millions. And his AI could not remember a single thing about any of it.</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">Then he wired his agent into Obsidian. Asked: Tell me what I did last month. And it just... <strong>knew</strong>. Pulled a line from February and used it that day.</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">Then he connected a <strong>second agent</strong> to the same vault. They started speaking in one voice. Like two teammates who had worked with him for years.</p>
                <div className="bg-[var(--bg-primary)] rounded-lg p-4 border-l-4 border-[var(--accent)]">
                  <p className="text-sm font-medium italic">A friend said: Julian \u2014 you are the first person I have ever met who I think might already have a chip installed in his brain. I do not have a chip. I just gave my AI a memory.</p>
                </div>
              </div>
            </motion.div>
          )}
          {activeTab === "stack" && (
            <motion.div key="stack" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <div className="text-center mb-4"><h2 className="text-xl font-bold mb-2">The Goldie Second Brain Stack</h2><p className="text-sm text-[var(--text-secondary)]">Five layers that turn AI from a forgetful stranger into a teammate who knows everything.</p></div>
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <div className="flex flex-col items-center gap-3">
                  {[{ l: 5, t: "The Loop", s: "Compounding", d: "Every new note makes your AI smarter. The longer you use it, the sharper it gets.", i: "\u{1F504}", c: "#fdcb6e" }, { l: 4, t: "The Auto-Notes", s: "AI Writes For You", d: "You do not write the notes. The AI writes them automatically.", i: "\u270D\uFE0F", c: "#e056fd" }, { l: 3, t: "The Shared Brain", s: "One Voice", d: "Every agent reads the SAME vault. All speak in one voice about your business.", i: "\u{1F9E0}", c: "#00b894" }, { l: 2, t: "The Bridge", s: "Agent Reads Vault", d: "Tell it once: My notes live here. Done. Agent reads vault before every conversation.", i: "\u{1F309}", c: "#0984e3" }, { l: 1, t: "The Vault", s: "Obsidian", d: "Your notes become memory. Holds everything \u2014 who you are, your team, goals, clients.", i: "\u{1F5C4}\uFE0F", c: "#6c5ce7" }].map((item) => (
                    <motion.div key={item.l} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (5 - item.l) * 0.1 }} className="w-full max-w-md">
                      <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: `${item.c}10`, border: `1px solid ${item.c}20` }}>
                        <div className="text-2xl">{item.i}</div>
                        <div className="flex-1"><div className="flex items-center gap-2"><span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${item.c}20`, color: item.c }}>Layer {item.l}</span><span className="font-bold text-sm">{item.t}</span><span className="text-xs text-[var(--text-secondary)]"> \u2014 {item.s}</span></div><p className="text-xs text-[var(--text-secondary)] mt-0.5">{item.d}</p></div>
                      </div>
                      {item.l > 1 && <div className="flex justify-center py-1"><ArrowRight size={14} className="text-[var(--text-secondary)] rotate-90" /></div>}
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-r from-[var(--accent)]/10 to-[var(--green)]/10 border border-[var(--accent)]/20 rounded-xl p-6 text-center">
                <h3 className="text-lg font-bold mb-2">The Part Most People Miss</h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto">It is not just that <em>one</em> agent reads your vault. It is that <strong>every agent reads the SAME vault</strong>. Claude on Monday and Hermes on Tuesday speak in the exact same voice.</p>
              </div>
            </motion.div>
          )}
          {activeTab === "howitworks" && (
            <motion.div key="howitworks" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h2 className="text-lg font-semibold mb-4">How the Two-Way Loop Works</h2>
                <div className="flex items-center justify-center gap-2 flex-wrap mb-6">
                  {[{ l: "You Work", i: <Wrench size={16} />, c: "#6c5ce7" }, { l: "AI Captures", i: <Eye size={16} />, c: "#0984e3" }, { l: "Notes in Vault", i: <Database size={16} />, c: "#00b894" }, { l: "AI Reads", i: <Bot size={16} />, c: "#e056fd" }, { l: "Better Answers", i: <Sparkles size={16} />, c: "#fdcb6e" }].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      {i > 0 && <ArrowRight size={12} className="text-[var(--text-secondary)]" />}
                      <div className="flex flex-col items-center gap-1"><div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.c}20`, color: item.c }}>{item.i}</div><span className="text-[10px] text-[var(--text-secondary)]">{item.l}</span></div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[var(--text-secondary)] text-center">The vault feeds the AI. The AI improves the vault. Every conversation is better than the last.</p>
              </div>
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h2 className="text-lg font-semibold mb-4">Cool Stuff You Could Build</h2>
                <div className="space-y-4">
                  {[{ t: "\u{1F3A4} Brand Brain", d: "AI writes posts that sound exactly like you.", p: "Read my Obsidian vault. Based on my goals, my voice, and what I worked on this month, write me 5 short posts that sound exactly like me.", c: "#6c5ce7" }, { t: "\u{1F308} Mission Control", d: "One bright, colorful screen showing everything.", p: "Build me a clean, colorful mission control dashboard that shows all my agent tasks, my goals, and my recent notes in one single view.", c: "#0984e3" }, { t: "\u{1F9F9} Messy Notes Fixer", d: "Watch AI transform chaos into a beautiful organized system.", p: "Read all my notes in Obsidian. Reorganize them, tag them, color code them, and link related ideas together.", c: "#00b894" }].map((item) => (
                    <div key={item.t} className="bg-[var(--bg-primary)] rounded-lg p-4">
                      <h3 className="font-semibold text-sm mb-1">{item.t}</h3>
                      <p className="text-xs text-[var(--text-secondary)] mb-3">{item.d}</p>
                      <div className="flex items-center gap-2 bg-[var(--bg-secondary)] rounded-lg p-2">
                        <code className="text-xs font-mono text-[var(--accent)] flex-1 overflow-x-auto">{item.p}</code>
                        <button onClick={() => copyToClipboard(item.p, 999)} className="shrink-0 p-1 text-[var(--text-secondary)] hover:text-[var(--accent)]"><Copy size={12} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h2 className="text-lg font-semibold mb-3">The Shared Brain Trick</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">This is the part 99% of people miss. Every agent reads the <strong>same</strong> vault.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[{ a: "Claude", d: "Monday", w: "Reads vault, writes content in your voice" }, { a: "Hermes", d: "Tuesday", w: "Reads vault, researches who you are" }, { a: "OpenClaw", d: "Wednesday", w: "Reads vault, routes tasks from your goals" }].map((item) => (
                    <div key={item.a} className="bg-[var(--bg-primary)] rounded-lg p-3 text-center"><div className="font-bold text-sm">{item.a}</div><div className="text-xs text-[var(--text-secondary)]">{item.d}</div><div className="text-xs mt-1">{item.w}</div></div>
                  ))}
                </div>
                <p className="text-sm text-[var(--text-secondary)] mt-4 text-center">One set of facts. One business. All yours.</p>
              </div>
            </motion.div>
          )}
          {activeTab === "roadmap" && (
            <motion.div key="roadmap" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">30-Day Plan: From Zero to Second Brain</h2>
              {ROADMAP.map((week) => {
                const isExpanded = expandedWeek === week.week;
                return (
                  <div key={week.week} className="glow-border rounded-xl bg-[var(--bg-card)] overflow-hidden">
                    <button onClick={() => setExpandedWeek(isExpanded ? null : week.week)} className="w-full flex items-center gap-3 p-4 text-left hover:bg-[var(--bg-card-hover)] transition-colors">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xl" style={{ backgroundColor: `${week.color}15` }}>{week.icon}</div>
                      <div className="flex-1"><div className="font-medium text-sm">Week {week.week}: {week.title}</div><div className="text-xs text-[var(--text-secondary)]">{week.days.length} days</div></div>
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
              <h2 className="text-lg font-semibold mb-2">100+ Copy-Paste Prompts</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4">Use these with your agent + Obsidian vault. Click a category to expand.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                {PROMPT_CATEGORIES.map((cat) => (
                  <button key={cat.id} onClick={() => setSelectedPromptCat(selectedPromptCat === cat.id ? null : cat.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-left ${selectedPromptCat === cat.id ? "border-[var(--accent)] bg-[var(--accent)]/10" : "border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)]/50"}`}
                  >{cat.icon}<div className="min-w-0"><div className="text-xs font-medium truncate">{cat.label}</div><div className="text-[10px] text-[var(--text-secondary)]">{cat.count}</div></div></button>
                ))}
              </div>
              <AnimatePresence>{selectedPromptCat && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="glow-border rounded-xl bg-[var(--bg-card)] p-4 overflow-hidden">
                  <SBPromptList categoryId={selectedPromptCat} onCopy={copyToClipboard} copiedIdx={copiedIdx} />
                </motion.div>
              )}</AnimatePresence>
            </motion.div>
          )}
          {activeTab === "beliefs" && (
            <motion.div key="beliefs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <div className="text-center mb-4"><h2 className="text-lg font-semibold mb-2">The New Empowering Beliefs</h2><p className="text-sm text-[var(--text-secondary)]">Let me break down the stories playing in your head right now.</p></div>
              {BELIEFS.map((item, i) => (
                <div key={i} className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${item.color}20`, color: item.color }}>{item.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1"><AlertCircle size={14} className="text-red-400" /><span className="text-xs font-medium text-red-400">OLD BELIEF</span></div>
                      <p className="text-sm text-red-400/80 line-through mb-3">{item.wrong}</p>
                      <div className="flex items-center gap-2 mb-1"><CheckCircle2 size={14} className="text-[var(--green)]" /><span className="text-xs font-medium text-[var(--green)]">NEW BELIEF</span></div>
                      <p className="text-sm text-[var(--green)]">{item.right}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
          {activeTab === "comparison" && (
            <motion.div key="comparison" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-4 text-center">Old Way vs New Way</h2>
              {OLD_VS_NEW.map((item, i) => (
                <div key={i} className="glow-border rounded-xl bg-[var(--bg-card)] overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                    <div className="p-4"><div className="flex items-center gap-2 mb-2"><AlertCircle size={14} className="text-red-400" /><span className="text-xs font-medium text-red-400">OLD WAY</span></div><p className="text-sm text-[var(--text-secondary)]">{item.old}</p></div>
                    <div className="p-4"><div className="flex items-center gap-2 mb-2"><CheckCircle2 size={14} className="text-[var(--green)]" /><span className="text-xs font-medium text-[var(--green)]">NEW WAY</span></div><p className="text-sm text-[var(--text-secondary)]">{item.new}</p></div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
          {activeTab === "recap" && (
            <motion.div key="recap" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <h2 className="text-lg font-semibold text-center mb-4">Recap: Everything We Covered</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[{ i: "\u{1F9E0}", t: "AI forgets you" }, { i: "\u{1F4D3}", t: "Obsidian = permanent memory" }, { i: "\u{1F9F1}", t: "5-Layer Stack" }, { i: "\u{1F309}", t: "Connect once" }, { i: "\u{1F91D}", t: "Shared brain trick" }, { i: "\u270D\uFE0F", t: "AI writes the notes" }, { i: "\u{1F504}", t: "Compounding loop" }, { i: "\u{1F3A8}", t: "Visual dashboards" }, { i: "\u{1F4C5}", t: "30-day plan" }, { i: "\u2696\uFE0F", t: "8 beliefs broken" }].map((item) => (
                  <div key={item.t} className="glow-border rounded-xl bg-[var(--bg-card)] p-4 flex items-start gap-3"><div className="text-2xl">{item.i}</div><div className="font-bold text-sm">{item.t}</div></div>
                ))}
              </div>
              <div className="bg-gradient-to-r from-[var(--accent)]/10 to-[var(--green)]/10 border border-[var(--accent)]/20 rounded-xl p-6 text-center">
                <h3 className="text-lg font-bold mb-2">The Big Truth</h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto">You are not behind \u2014 you are <strong>early</strong>. Every note you write today becomes part of your edge tomorrow.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SBPromptList({ categoryId, onCopy, copiedIdx }: { categoryId: string; onCopy: (text: string, idx: number) => void; copiedIdx: number | null }) {
  const prompts = {
    setup: ["Ask me 10 simple questions about my business, then write a clean About Me note.", "Help me write my top 5 goals for the next 90 days in simple bullets.", "Create a simple profile of my ideal customer \u2014 who they are and what they want.", "Summarize what my business does in 3 short sentences.", "Write a note describing my team and what each person does.", "Make a note listing all my products and who they help.", "Help me write down my brand values in plain words.", "Create a note about my origin story in simple language.", "List the 10 questions my customers ask me most.", "Write a note about what makes my business different."],
    connect: ["My notes live in this Obsidian folder. Use them for memory from now on.", "Read my vault and tell me what I do and who I help.", "Based on my notes, what are my top 3 goals?", "What did I work on last month, based on my notes?", "Read my vault and describe my writing voice.", "What do you now know about my business?", "Tell me what is missing from my notes that would help you.", "Confirm you can read my vault by listing my goals.", "Pull one useful idea from an old note and apply it today.", "Based on my notes, what should I focus on this week?"],
    content: ["Read my vault and write 5 short posts that sound like me.", "Write a post about my main topic in my own voice.", "Turn my latest note into a simple how-to post.", "Write 10 content hooks based on my goals.", "Write a short script that explains what I do.", "Turn my customer FAQ into 10 short posts.", "Write a welcome message for new followers in my voice.", "Take my messiest note and turn it into a clean post.", "Write 5 questions I could ask my audience.", "Write a short story from my notes that teaches one lesson."],
    visual: ["Build a colorful single-page dashboard showing my goals and tasks.", "Make a bright timeline showing everything I built this month.", "Create a clean mission control view of all my notes.", "Design a fun visual map of my business goals.", "Build a simple dashboard that shows my top 3 priorities today.", "Make a colorful progress tracker for my 30-day plan.", "Create a visual chart of my content ideas.", "Design a clean weekly review board.", "Build a bright, simple homepage for my second brain.", "Make a fun visual showing my customer journey."],
    organize: ["Read all my notes, reorganize them, and tag them.", "Color code my notes by topic.", "Link related notes together.", "Find duplicate notes and merge them.", "Suggest a simple folder structure for my vault.", "Clean up my messiest note and make it readable.", "Add clear titles to all my untitled notes.", "Group my notes into 5 main themes.", "Find notes that contradict each other and flag them.", "Turn my long notes into short bullet summaries."],
    daily: ["Every morning, read my vault and give me 3 priorities.", "Summarize what I added to my vault this week.", "Suggest one thing to improve based on my week.", "Each Friday, review my goals and check my progress.", "Write a short daily plan based on my notes.", "Remind me what I said I would do this week.", "Give me a 5-bullet recap of my month.", "What did I finish this week, based on my notes?", "What did I plan but not finish?", "Suggest tomorrow top task from my vault."],
    automate: ["Based on my recent work, what could I automate to save time?", "What boring tasks show up most in my notes?", "Suggest 3 simple systems I could build this week.", "What is the biggest time-waster in my routine?", "Design a simple checklist for a task I do often.", "Turn my repeated task into a step-by-step guide.", "What is one thing I could hand off based on my notes?", "Suggest a daily routine that fits my goals.", "Find a task I keep redoing and propose a template.", "What small fix would save me the most time?"],
    audience: ["Based on my notes, who is my ideal customer?", "Write a simple guide to attract more of my best customers.", "What problem do my customers care about most?", "Write 5 ways to bring more people to what I offer.", "Create a simple lead magnet idea from my notes.", "Write a welcome guide for new community members.", "Suggest a free resource I could give away.", "What questions should I answer to build trust?", "Write a simple outreach message in my voice.", "Suggest a topic that would attract my dream customer."],
    voice: ["Study my writing and save a note on my tone.", "Rewrite this in my voice based on my notes.", "List 5 phrases I use a lot.", "Describe how I structure my sentences.", "Match this draft to my usual style.", "What is unique about how I explain things?", "Write a paragraph that sounds exactly like me.", "Compare a generic version vs my voice version.", "Save examples of my best writing as style references.", "Make my message simpler without losing my voice."],
    research: ["Pull my key ideas from my best content and save them.", "Based on my notes, give me 10 new content ideas.", "Find a gap in my content I have not covered.", "Turn my uploaded notes into a simple summary.", "What is a fresh angle on my main topic?", "Combine two of my old ideas into a new one.", "What questions am I uniquely able to answer?", "Find the most useful idea hiding in my old notes.", "Suggest a series I could build from my vault.", "What is one idea worth turning into a full guide?"],
    bonus: ["Based on everything you know about me, what is my biggest opportunity right now?", "What is the one note that would make you 10X more useful?", "Write a simple guide explaining my whole business to a new helper.", "Look at my vault and tell me what makes me different from everyone else.", "If you were my teammate, what would you suggest I do next?"],
  };
  const items = (prompts as Record<string, string[]>)[categoryId] || [];
  const cat = PROMPT_CATEGORIES.find((c) => c.id === categoryId);
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-sm mb-3">{cat ? cat.label : ""} Prompts ({items.length})</h3>
      {items.map((prompt: string, i: number) => (
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
