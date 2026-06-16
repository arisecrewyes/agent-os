"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard, Target, BookOpen, Settings, Brain, Zap, Rocket,
  Database, Bot, FileText, Check, ChevronRight, ChevronDown, Copy,
  CheckCircle2, AlertCircle, Clock, Layers, RefreshCw, ArrowRight,
  Shield, Wrench, Star, Search, Mail, Calendar, Cpu, Code, Lightbulb,
  TrendingUp, Heart, Users, Mic, Eye, Sparkles, Terminal, Globe, MessageSquare
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
  { week: 1, title: "Foundation", color: "#6c5ce7", icon: "\u{1F3D7}\uFE0F", days: ["Get the app. Go to https://pewdiepie-archdaemon.github.io/odysseus/ Read the description. Do not install yet. Just look.", "The no-stress install. Go to GitHub: https://github.com/pewdiepie-archdaemon/odysseus Copy the link. Paste into Claude Code or Hermes: Here is a GitHub project: [link]. Walk me through installing it step by step like I have never used a command line.", "Open the door. Once running, open http://localhost:7000 Create your admin account. Log in. You are inside.", "Add a brain. Get a free key from https://openrouter.ai Paste into Odysseus under settings. Type: Say hello and tell me one thing you can help me with.", "The safety check. Before letting Operator touch files, check what it is allowed to do. Toggle off anything you do not understand. Five minutes here saves a headache later.", "Meet the Chatter. Go to https://trends.google.com/trends/ Find one topic blowing up. Ask Odysseus: Explain why [topic] is trending right now in simple terms, and give me 3 angles.", "Rest and review. You installed a real AI workspace. That alone puts you ahead of most people."] },
  { week: 2, title: "Automate", color: "#0984e3", icon: "\u{1F916}", days: ["Your first Operator task. Switch to agent mode. Type: Research the 3 newest free AI tools launched this week and write me a short, fun summary with emojis. Watch it work by itself.", "Schedule it. Use the schedule tasks feature. Set a research task to run every morning. Now it works while you sleep.", "The visual wow build. Open https://codepen.io Ask Odysseus: Write me the code for a single colorful web page with a glowing neon dashboard, big bold numbers, and a dark background that looks like a sci-fi movie screen. Paste into CodePen.", "Feed it your brain. Drop a few of your own documents into the library section. Type: Read my documents and tell me the 3 main themes in my own words. This is the Memory layer waking up.", "The research engine. Use deep research. Type: Do deep research on what beginners struggle with when learning [your topic], and list the top 5 frustrations. That list is gold for content.", "Compare two brains. Use the compare feature. Ask the same question to two different models side by side. Notice which one you like better.", "Review. You now have an Operator running tasks on a schedule. Take a slow breath. You are doing great."] },
  { week: 3, title: "Scale", color: "#00b894", icon: "\u{1F4C8}", days: ["Content factory. Type: Take my top frustration list and turn each one into a short, punchy social post. One task. Five posts.", "The avatar video idea. Open https://www.heygen.com Take one of your posts. Turn it into a short talking-avatar video to share.", "The audio brain. Open https://notebooklm.google.com Upload your best document. Generate a clean summary you can use anywhere.", "The repeatable prompt. Save your best prompts inside the Odysseus skills section. Now you press one button instead of typing it all again.", "The bright dashboard, part two. Back to https://codepen.io Ask for: An animated page with floating bubbles in bright pink, blue, and orange that pop when I click them. Pure dopamine.", "Email triage. Connect the email helper. Ask it: Summarize my unread emails into a simple list of who needs what.", "Review. You have gone from one task to a small system. That is scaling."] },
  { week: 4, title: "Systematise", color: "#e056fd", icon: "\u2699\uFE0F", days: ["Write your own playbook. Open https://docs.google.com Write down every Operator task you have built and what it does. This is your operating manual.", "The morning briefing. Combine your scheduled tasks into one tidy morning report. News + ideas + email summary, all in one.", "The explain it to a friend test. Type: Explain my whole setup to a beginner in 5 simple sentences. If the AI can explain it simply, you truly understand it.", "Back it up. Because it is all on your computer, copy your important files somewhere safe. You are the admin now, remember.", "The fun finale build. One last CodePen creation https://codepen.io Ask for: A retro arcade-style score screen with glowing letters that says MY AI SYSTEM IS LIVE. Screenshot it. Be proud.", "Teach one thing. Post what you built inside a community. Teaching locks the learning in.", "Plan the next 30. Write down the next three tasks you want to automate.", "Reflect. Look at how far you have come from Day 1. A month ago you had never heard of this.", "Show off. You now own an AI workspace on your own computer that researches, writes, and works while you sleep. Most business owners still do not know this exists. You are early."] },
];

const BELIEFS = [
  { wrong: "I am not technical enough to run AI on my own computer.", right: "You do not need to be technical. You just need to find the next stone. Paste the link into an AI and let it walk you through. That is the whole skill.", icon: <Shield size={16} />, color: "#6c5ce7" },
  { wrong: "I need an expensive monster computer to run AI locally.", right: "The app itself is light as a feather. Plug in a free cloud brain instead. Your old laptop runs it just fine.", icon: <Cpu size={16} />, color: "#0984e3" },
  { wrong: "Open-source means it is dodgy and unsafe.", right: "Open-source means everyone can see exactly how it is built. Nothing is hidden. Check what the Operator can touch before you let it loose. Five-minute habit, not a scary risk.", icon: <CheckCircle2 size={16} />, color: "#00b894" },
  { wrong: "There is no point, the big companies will always be better.", right: "This is not about having the smartest AI. It is about owning your setup and your data. Owning your own AI setup matters more than renting the fanciest one.", icon: <Star size={16} />, color: "#e056fd" },
  { wrong: "I have missed the boat, everyone is already ahead of me.", right: "This tool launched days ago. Days. Nobody has years of experience with it. The one with the longest timeline wins. You are not late \u2014 you are early.", icon: <Rocket size={16} />, color: "#fdcb6e" },
  { wrong: "Even if I set it up, I will not know what to do with it.", right: "You do not have a what do I do problem. You have a where do I start problem. Every single day has one tiny task. You just need to do Day 1. Then Day 2.", icon: <Lightbulb size={16} />, color: "#e17055" },
  { wrong: "I will set it up, get excited, and then quit in a week.", right: "You quit alone. You do not quit when other people are doing it next to you. You do not need more willpower \u2014 you need people building alongside you.", icon: <Users size={16} />, color: "#6c5ce7" },
];

const OLD_VS_NEW = [
  { old: "Rent your AI from a giant company every month.", new: "Own a free AI workspace that lives on your computer." },
  { old: "Your private data sits on someone else server.", new: "Your data stays with you." },
  { old: "You do your morning research by hand, every single day.", new: "An Operator does it while you sleep." },
  { old: "Learn AI alone, get lost, give up.", new: "Learn it with a clear plan and people doing it alongside you." },
];

const PROMPT_CATEGORIES = [
  { id: "setup", label: "Setup & Brain", icon: <Terminal size={14} />, count: 10 },
  { id: "chatter", label: "Daily Chatter", icon: <MessageSquare size={14} />, count: 10 },
  { id: "operator", label: "Operator Tasks", icon: <Bot size={14} />, count: 10 },
  { id: "schedule", label: "Scheduled Tasks", icon: <Calendar size={14} />, count: 10 },
  { id: "memory", label: "Memory & Documents", icon: <Database size={14} />, count: 10 },
  { id: "visual", label: "Visual Builds", icon: <Sparkles size={14} />, count: 15 },
  { id: "content", label: "Content Creation", icon: <FileText size={14} />, count: 10 },
  { id: "research", label: "Research Engine", icon: <Search size={14} />, count: 10 },
  { id: "system", label: "Systematise", icon: <Wrench size={14} />, count: 10 },
  { id: "mindset", label: "Mindset & Momentum", icon: <TrendingUp size={14} />, count: 10 },
  { id: "bonus", label: "Bonus Power Prompts", icon: <Star size={14} />, count: 5 },
];

export default function OdysseusPage() {
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
    { id: "overview", label: "Overview", icon: <Globe size={16} /> },
    { id: "framework", label: "Operator System", icon: <Layers size={16} /> },
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium mb-4">
            <Globe size={14} /> The Odysseus Operator System
          </motion.div>
          <h1 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">PewDiePie Free AI Workspace</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-2">A 24-year-old gamer declared war on Big Tech \u2014 and handed you a free AI workspace that runs on YOUR computer.</p>
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
                <h2 className="text-lg font-semibold mb-3">What Is Odysseus?</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">You know ChatGPT. You go to a website, you type, the AI answers. That AI lives on someone else computer far away. Odysseus is the same idea \u2014 but it lives on YOUR computer. One app with chat, a research agent, email helper, notes, calendar, and memory. All in one tidy place. Your data stays with you. No monthly fee.</p>
                <div className="bg-[var(--bg-primary)] rounded-lg p-4 border-l-4 border-[var(--accent)]">
                  <p className="text-sm font-medium">PewDiePie built it and gave it away. It hit 30,000 stars on GitHub in two days. Almost nobody in the solopreneur world is talking about how to actually USE it.</p>
                </div>
              </div>
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h2 className="text-lg font-semibold mb-3">Why This Is Different</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">Almost every AI tool you use today is renting. You rent the brain, the storage, the whole thing, every month, forever. The day you stop paying, it all disappears. Odysseus is owning. The app is yours. The data is yours. It sits on your machine like a notebook in your drawer.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                    <h3 className="font-semibold text-red-400 mb-2">Old Way: Renting</h3>
                    <ul className="space-y-1 text-sm text-[var(--text-secondary)]">
                      <li>Pay every month, forever</li>
                      <li>Data lives on someone else server</li>
                      <li>Stop paying = it all disappears</li>
                    </ul>
                  </div>
                  <div className="bg-[var(--green)]/5 border border-[var(--green)]/20 rounded-lg p-4">
                    <h3 className="font-semibold text-[var(--green)] mb-2">New Way: Owning</h3>
                    <ul className="space-y-1 text-sm text-[var(--text-secondary)]">
                      <li>Free. Open-source. Yours.</li>
                      <li>Data stays on your computer</li>
                      <li>Works even if the internet does not</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h2 className="text-lg font-semibold mb-3">The Story</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">For years Julian believed that to use serious AI, you had to rent it. Log in, pay every month, your stuff lives on a giant company computer. Then a 24-year-old gamer changed the rules. He spent months building his own AI workspace. And instead of selling it, he gave it away for free.</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">When Julian first set up Odysseus, the old I am not technical enough fear crept in. The setup looked scary. Command lines and weird words. But he pasted the instructions into an AI and let it walk him through. A few minutes later, there it was. His own AI workspace. On his own computer.</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">Then he gave the Operator a task: research the newest AI news. It planned. It worked. It came back with a tidy answer. He sat there with his iced black coffee and just watched a free app do his morning research.</p>
                <div className="bg-[var(--bg-primary)] rounded-lg p-4 border-l-4 border-[var(--accent)]">
                  <p className="text-sm font-medium italic">This tool came out only days ago. Neither has anyone else. That is exactly why this is the moment. For once, you are not behind. You are early.</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "framework" && (
            <motion.div key="framework" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <div className="text-center mb-4"><h2 className="text-xl font-bold mb-2">The Odysseus Operator System</h2><p className="text-sm text-[var(--text-secondary)]">Four workers inside one app. You are the boss.</p></div>
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <div className="flex flex-col items-center gap-4">
                  {[{ l: 4, t: "MEMORY", s: "Remembers everything", d: "Notes, documents, past chats. So you do not have to explain yourself over and over.", icon: <Database size={20} />, color: "#fdcb6e" }, { l: 3, t: "OPERATOR", s: "Does tasks by itself", d: "You give it a job. It plans the steps. It does them. It comes back with the result. This is where the real leverage is.", icon: <Bot size={20} />, color: "#00b894" }, { l: 2, t: "CHATTER", s: "Everyday helper", d: "Ask questions. Get it to write things. Just like ChatGPT, but private. Your data stays on your machine.", icon: <MessageSquare size={20} />, color: "#0984e3" }, { l: 1, t: "BRAIN", s: "The thinking engine", d: "You choose it. Free model on your computer or plug in a cloud brain through a free key. Swap anytime \u2014 no code changes, no lock-in.", icon: <Brain size={20} />, color: "#6c5ce7" }].map((item) => (
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
                <p className="text-sm font-medium italic">Brain. Chatter. Operator. Memory. Once you see it that way, the messy-looking app suddenly makes sense.</p>
              </div>
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h3 className="font-semibold mb-3">Cool Stuff You Can Build</h3>
                <div className="space-y-3">
                  {[{ t: "\u{1F3A4} Morning Research Operator", d: "Wakes at 6am, checks newest AI tool launches, writes a one-page summary for your community post." }, { t: "\u{1F50D} Research Engine", d: "Takes a topic and pulls together the questions real people are asking. Becomes a blog post outline." }, { t: "\u{1F308} Visual Dashboard", d: "Point chatter at a free brain. Have it design a wild, colorful one-page dashboard. Bright colors, big bold numbers." }].map((item) => (
                    <div key={item.t} className="bg-[var(--bg-primary)] rounded-lg p-3"><div className="font-medium text-sm">{item.t}</div><p className="text-xs text-[var(--text-secondary)]">{item.d}</p></div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "roadmap" && (
            <motion.div key="roadmap" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">30-Day Odysseus Operator Plan</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4">Every day has a free tool, a link, and an exact thing to type.</p>
              <div className="flex gap-2 mb-4 flex-wrap">
                {[{ w: "Week 1", t: "Foundation", c: "#6c5ce7" }, { w: "Week 2", t: "Automate", c: "#0984e3" }, { w: "Week 3", t: "Scale", c: "#00b894" }, { w: "Week 4", t: "Systematise", c: "#e056fd" }].map((item) => (
                  <span key={item.w} className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: `${item.c}15`, color: item.c, border: `1px solid ${item.c}30` }}>{item.w}: {item.t}</span>
                ))}
              </div>
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                {PROMPT_CATEGORIES.map((cat) => (
                  <button key={cat.id} onClick={() => setSelectedPromptCat(selectedPromptCat === cat.id ? null : cat.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-left ${selectedPromptCat === cat.id ? "border-[var(--accent)] bg-[var(--accent)]/10" : "border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)]/50"}`}
                  >{cat.icon}<div className="min-w-0"><div className="text-xs font-medium truncate">{cat.label}</div><div className="text-[10px] text-[var(--text-secondary)]">{cat.count}</div></div></button>
                ))}
              </div>
              <AnimatePresence>{selectedPromptCat && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="glow-border rounded-xl bg-[var(--bg-card)] p-4 overflow-hidden">
                  <OdyPromptList categoryId={selectedPromptCat} onCopy={copyToClipboard} copiedIdx={copiedIdx} />
                </motion.div>
              )}</AnimatePresence>
            </motion.div>
          )}

          {activeTab === "beliefs" && (
            <motion.div key="beliefs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <div className="text-center mb-4"><h2 className="text-lg font-semibold mb-2">The New Empowering Beliefs</h2></div>
              {BELIEFS.map((item, i) => (
                <div key={i} className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${item.color}20`, color: item.color }}>{item.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1"><AlertCircle size={14} className="text-red-400" /><span className="text-xs font-medium text-red-400">OLD BELIEF #{i + 1}</span></div>
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
              <h2 className="text-lg font-semibold text-center mb-4">Full Recap</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[{ i: "\u{1F414}", t: "Odysseus", d: "Free, open-source AI workspace. PewDiePie launched May 31st 2026." }, { i: "\u{1F9E0}", t: "4 Layers", d: "Brain, Chatter, Operator, Memory." }, { i: "\u{1F6E1}\uFE0F", t: "Safety habit", d: "Check what Operator can touch before you let it work." }, { i: "\u{1F4C5}", t: "30-day plan", d: "Foundation, Automate, Scale, Systematise." }, { i: "\u{1F3A8}", t: "Visual builds", d: "Wild, colorful, dopamine-packed CodePen creations." }, { i: "\u{1F4A1}", t: "7 beliefs broken", d: "Not technical, too late, too expensive \u2014 all false." }, { i: "\u{1F31F}", t: "105 prompts", d: "Setup, chatter, operator, schedule, memory, visual, content, research, system, mindset." }].map((item) => (
                  <div key={item.t} className="glow-border rounded-xl bg-[var(--bg-card)] p-4 flex items-start gap-3"><div className="text-2xl">{item.i}</div><div><div className="font-bold text-sm">{item.t}</div><p className="text-xs text-[var(--text-secondary)]">{item.d}</p></div></div>
                ))}
              </div>
              <div className="bg-gradient-to-r from-[var(--accent)]/10 to-[var(--green)]/10 border border-[var(--accent)]/20 rounded-xl p-6 text-center">
                <h3 className="text-lg font-bold mb-2">You are not late. You are early.</h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto">A month ago you had never heard of this. Thirty days from now you could own an AI workspace that works while you sleep.</p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

function OdyPromptList({ categoryId, onCopy, copiedIdx }: { categoryId: string; onCopy: (text: string, idx: number) => void; copiedIdx: number | null }) {
  const allPrompts: Record<string, string[]> = {
    setup: ["Here is a GitHub project: [link]. Walk me through installing it step by step like I have never used a command line.", "Explain what a self-hosted AI workspace is in 3 simple sentences.", "What is the difference between a local brain and a cloud brain? Explain it like I am 10.", "Help me pick the easiest brain to start with as a total beginner.", "Walk me through getting a free OpenRouter key step by step.", "My install failed. Here is the error: [paste]. Explain what it means in plain English.", "What does each tool in this app do? List them simply.", "Which tools should a beginner turn OFF for safety? Explain why.", "Explain open-source to me like I have never heard the word.", "Give me a 5-step checklist to make sure my setup is safe before I start."],
    chatter: ["Explain [topic] in simple terms with one real-life example.", "Give me 3 fresh angles to talk about [topic].", "Turn this messy idea into 3 clear sentences: [idea].", "Summarize this long text into 5 bullet points: [paste].", "What questions would a beginner have about [topic]?", "Rewrite this so a 10-year-old understands it: [paste].", "Give me a punchy one-line hook about [topic].", "What is the most surprising fact about [topic]?", "Turn this boring sentence into something exciting: [paste].", "Give me 5 simple analogies to explain [topic]."],
    operator: ["Research the 3 newest free AI tools this week and summarize them with emojis.", "Find the top 5 questions people ask about [topic] and list them.", "Research what beginners struggle with when learning [topic].", "Find 3 trending topics in [your industry] right now.", "Research [competitor area] and tell me what is missing.", "Make me a short morning briefing of today [industry] news.", "Find 5 fun facts about [topic] I can use in content.", "Research [topic] and give me a beginner getting-started guide.", "Find 3 common myths about [topic] and bust them.", "Pull together a simple pros-and-cons list for [topic]."],
    schedule: ["Every morning at 6am, find the newest AI tool launches and summarize them.", "Every day, check trending topics in [industry] and list 3.", "Each morning, summarize my unread emails into a simple list.", "Weekly, research what is new in [topic] and write a recap.", "Daily, give me one fresh content idea based on trending news.", "Every Monday, list the top 5 questions people asked online about [topic].", "Each evening, summarize what I worked on today from my notes.", "Weekly, find 3 free tools I should try in [niche].", "Daily, give me one motivational quote about hard work and discipline.", "Every morning, suggest my top 3 priorities for the day."],
    memory: ["Read my documents and tell me the 3 main themes.", "What is the one big idea across all my notes?", "Summarize this document in 5 simple sentences: [file].", "Find the gaps in my notes about [topic].", "Turn my document into a simple FAQ.", "What questions does my document leave unanswered?", "Pull out every action item from my notes.", "Compare these two documents and tell me what is different.", "Turn my messy notes into a clean outline.", "Based on my notes, what should I learn next?"],
    visual: ["Write code for a glowing neon dashboard with big bold numbers on a dark background.", "Make a colorful page with floating bubbles that pop when clicked.", "Build a retro arcade score screen with glowing letters.", "Create an animated starfield that looks like flying through space.", "Make a bright sunrise gradient that slowly shifts colors.", "Build a page with confetti that bursts when I click a button.", "Create a glowing progress bar that fills up with rainbow colors.", "Make a fun loading screen with bouncing dots.", "Build a card that flips over with a cool 3D effect.", "Create a big animated emoji that wiggles when I hover over it.", "Make a neon clock that glows and ticks.", "Build a colorful weather card with a moving sun and clouds.", "Create a typing-text effect that types out a welcome message.", "Make a glassy frosted card with soft glowing edges.", "Build a button that ripples like water when clicked."],
    content: ["Turn this frustration into a punchy social post: [frustration].", "Write 5 short posts from this one idea: [idea].", "Turn this list into a step-by-step guide.", "Write a beginner-friendly intro paragraph about [topic].", "Make this sound more exciting and human: [paste].", "Write 3 hooks that grab attention about [topic].", "Turn this into a simple email I can send: [paste].", "Write a short script for a 60-second video about [topic].", "Make a simple checklist people can follow for [task].", "Turn this into a myth vs truth post: [topic]."],
    research: ["Do deep research on the history of [topic] in simple terms.", "Find the most common beginner mistakes in [field].", "Research the best free tools for [task].", "Find what experts agree on about [topic].", "Research both sides of the debate on [topic].", "Find 5 real-world examples of [concept].", "Research what has changed about [topic] in the last year.", "Find the simplest way to explain [hard concept].", "Research what people wish they knew before starting [activity].", "Find 3 surprising uses for [tool]."],
    system: ["Turn this task I do often into a simple repeatable checklist.", "Write step-by-step instructions a beginner could follow for [task].", "Explain my whole setup to a beginner in 5 sentences.", "What parts of this task could a worker do without me?", "Turn my process into a clean one-page playbook.", "List the 3 tasks I should automate first and why.", "Help me write a simple guide for handing this off.", "What is the boring part of my work I should automate?", "Break this big project into tiny daily steps.", "Help me plan tomorrows top 3 priorities tonight."],
    mindset: ["Give me one tiny step to start [scary task] today.", "Remind me why showing up daily beats being perfect.", "What is one limiting belief about AI I should drop?", "Turn my excuse into an action step: [excuse].", "Give me a 5-minute task that moves me forward right now.", "Help me reflect on what I learned this week.", "What is one thing I can teach someone else about [topic]?", "Give me a simple way to track my progress this month.", "Help me write down 3 wins from today, no matter how small.", "What should I focus on next to keep my momentum going?"],
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
