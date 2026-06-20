"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard, Target, BookOpen, Settings, Brain, Zap, Rocket,
  Database, Bot, FileText, Check, ChevronRight, ChevronDown,
  CheckCircle2, AlertCircle, Clock, Layers, RefreshCw, ArrowRight,
  Shield, Wrench, Star, Globe, Cpu, Users, Heart, Monitor, Code,
  Terminal, ExternalLink, Search, FileSearch, Video, Lock
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
    { label: "Hermes vs Odysseus", icon: <Monitor size={14} />, href: "/hermes-vs-odysseus" },
    { label: "Hermes Voice", icon: <FileSearch size={14} />, href: "/hermes-voice" },
    { label: "Bolt DIY", icon: <Code size={14} />, href: "/bolt-diy" },
    { label: "Automation", icon: <Zap size={14} />, href: "/automation" },
    { label: "Content Repos", icon: <Video size={14} />, href: "/repos-content" },
    { label: "Memory Repos", icon: <Brain size={14} />, href: "/repos-memory" },
    { label: "Skills Repos", icon: <Wrench size={14} />, href: "/repos-skills" },
    { label: "Security & OSINT", icon: <Lock size={14} />, href: "/repos-security" },
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

const REPOS = [
  { name: "harness", url: "https://github.com/revfactory/harness", about: "A meta-skill that designs domain-specific agent teams, defines specialized agents, and generates the skills they use.", tags: ["meta-skill", "agent-teams", "skills"], appUrl: "https://revfactory.github.io/harness/" },
  { name: "stop-slop", url: "https://github.com/hardikpandya/stop-slop", about: "A skill file for removing AI tells from prose.", tags: ["writing", "ai-detection", "skill"] },
  { name: "Understand-Anything", url: "https://github.com/Egonex-AI/Understand-Anything", about: "Graphs that teach > graphs that impress. Turn any code into an interactive knowledge graph you can explore, search, and ask questions about.", tags: ["knowledge-graph", "code", "visualization"], appUrl: "https://understand-anything.com" },
  { name: "Pake", url: "https://github.com/tw93/Pake", about: "Turn any webpage into a desktop app with one command.", tags: ["desktop", "web", "app"] },
  { name: "ECC", url: "https://github.com/affaan-m/ECC", about: "The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond.", tags: ["optimization", "skills", "memory", "security"], appUrl: "https://ecc.tools" },
  { name: "train-llm-from-scratch", url: "https://github.com/FareedKhan-dev/train-llm-from-scratch", about: "A straightforward method for training your LLM, from downloading data to generating text.", tags: ["llm", "training", "from-scratch"], appUrl: "https://fareedkhan-dev.github.io/train-llm-from-scratch/" },
  { name: "SkillOpt", url: "https://github.com/microsoft/SkillOpt", about: "SkillOpt is a text-space optimizer that trains reusable natural-language skills for frozen LLM agents through trajectory-driven edits, validation-gated updates, and deployable best_skill.md artifacts.", tags: ["skill-optimization", "llm", "microsoft"], appUrl: "https://aka.ms/skillopt" },
  { name: "book-to-skill", url: "https://github.com/virgiliojr94/book-to-skill", about: "Turn any technical book PDF into a Claude Code skill \u2014 ready to study, reference, and use while you work.", tags: ["books", "claude", "skill", "pdf"] },
  { name: "Skill_Seekers", url: "https://github.com/yusufkaraaslan/Skill_Seekers", about: "Convert documentation websites, GitHub repositories, and PDFs into Claude AI skills with automatic conflict detection.", tags: ["skills", "conversion", "documentation"], appUrl: "https://skillseekersweb.com/" },
  { name: "Hermes Skill Hub", url: "https://hermes-agent.nousresearch.com/docs/skills/", about: "Hermes Agent Skill Hub \u2014 official skills directory for Hermes Agent.", tags: ["hermes", "skills", "official"] },
  { name: "humanizer", url: "https://github.com/blader/humanizer", about: "Claude Code skill that removes signs of AI-generated writing from text.", tags: ["writing", "ai-detection", "claude", "skill"] },
  { name: "Minimalist Entrepreneur Skills", url: "https://github.com/slavingia/skills", about: "Claude Code skills based on The Minimalist Entrepreneur. 10 skills covering community, validation, MVP, processize, first customers, pricing, marketing plan, sustainable growth, and company values.", tags: ["claude", "skill", "business", "entrepreneur"] },
  { name: "governor", url: "https://github.com/0xhimanshu/governor", about: "Claude Code usage governor: compact professional output, context slimming, tool-output filtering, telemetry, and drift guardrails. Keeps long sessions efficient without making the model dumber.", tags: ["claude", "context", "optimization", "plugin"] },
  { name: "claude-smart", url: "https://github.com/ReflexioAI/claude-smart", about: "A Claude Code plugin that makes Claude Code self-improve \u2014 learning from your corrections, not just remembering them. ~3x better at turning corrections into rules.", tags: ["claude", "plugin", "self-improve", "learning"] },
  { name: "geo-seo-claude", url: "https://github.com/zubair-trabzada/geo-seo-claude", about: "GEO-first SEO skill for Claude Code. AI search optimization with citability scoring, AI crawler analysis, brand authority, schema markup, platform-specific optimization, and PDF reports.", tags: ["seo", "claude", "skill", "ai-search", "marketing"] },
  { name: "awesome-llm-apps", url: "https://github.com/Shubhamsaboo/awesome-llm-apps", about: "100+ AI Agent & RAG apps you can actually run \u2014 clone, customize, ship. Covers multi-agent teams, MCP agents, voice agents, agent skills, and fine-tuning. Works with Claude, Gemini, OpenAI, xAI, Qwen, Llama.", tags: ["llm", "agents", "rag", "templates", "cookbook"], appUrl: "https://www.theunwindai.com" },
  { name: "hetty", url: "https://github.com/dstotijn/hetty", about: "An HTTP toolkit for security research. Open-source alternative to Burp Suite Pro with MITM proxy, HTTP client, intercept, scope support, and web-based admin interface.", tags: ["security", "http", "proxy", "research", "pentest"], appUrl: "https://hetty.xyz" },
  { name: "OpenAlice", url: "https://github.com/TraderAlice/OpenAlice", about: "Your one-person Wall Street. An AI trading agent covering equities, crypto, commodities, forex, and macro \u2014 from research through position entry, ongoing management, to exit. Full-control with Trading-as-Git.", tags: ["trading", "ai", "agent", "finance", "crypto"], appUrl: "https://openalice.ai" },
];

const TAG_COLORS: Record<string, string> = {
  "meta-skill": "#6c5ce7", "agent-teams": "#0984e3", "skills": "#00b894",
  "writing": "#e056fd", "ai-detection": "#fdcb6e",
  "knowledge-graph": "#6c5ce7", "code": "#0984e3", "visualization": "#00b894",
  "desktop": "#e17055", "web": "#fdcb6e", "app": "#6c5ce7",
  "optimization": "#0984e3", "memory": "#00b894", "security": "#e056fd",
  "llm": "#fdcb6e", "training": "#6c5ce7", "from-scratch": "#0984e3",
  "skill-optimization": "#00b894", "microsoft": "#e056fd",
  "books": "#fdcb6e", "claude": "#6c5ce7", "pdf": "#0984e3",
  "conversion": "#00b894", "documentation": "#e056fd",
  "hermes": "#6c5ce7", "official": "#0984e3",
  "business": "#fdcb6e", "entrepreneur": "#e17055",
  "context": "#0984e3", "plugin": "#6c5ce7",
  "self-improve": "#e056fd", "learning": "#fdcb6e",
  "seo": "#00b894", "ai-search": "#6c5ce7", "marketing": "#e056fd",
  "agents": "#0984e3", "rag": "#fdcb6e", "templates": "#6c5ce7", "cookbook": "#e17055",
  "http": "#0984e3", "proxy": "#fdcb6e", "research": "#6c5ce7", "pentest": "#e056fd",
  "trading": "#fdcb6e", "ai": "#6c5ce7", "finance": "#0984e3", "crypto": "#e056fd",
};

export default function ReposSkillsPage() {
  const [filter, setFilter] = useState<string | null>(null);
  const allTags = [...new Set(REPOS.flatMap(r => r.tags))].sort();
  const filtered = filter ? REPOS.filter(r => r.tags.includes(filter)) : REPOS;

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto p-6">
        <PageNav />
        <div className="mb-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium mb-4">
            <Wrench size={14} /> GitHub Repos \u2014 Agent Skills
          </motion.div>
          <h1 className="text-3xl font-bold mb-3">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">Agent Skills Repositories</span>
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">Open-source tools for improving skills for all agents currently in the Agent OS Dashboard and all future created agents.</p>
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-sm font-medium text-[var(--text-secondary)]">Filter:</span>
            <button onClick={() => setFilter(null)} className={`text-xs px-2 py-1 rounded-lg transition-colors ${!filter ? "bg-[var(--accent)] text-white" : "bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]"}`}>All ({REPOS.length})</button>
            {allTags.map(tag => (
              <button key={tag} onClick={() => setFilter(filter === tag ? null : tag)} className={`text-xs px-2 py-1 rounded-lg transition-colors ${filter === tag ? "bg-[var(--accent)] text-white" : "bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]"}`}>{tag}</button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {filtered.map((repo) => (
            <div key={repo.name} className="glow-border rounded-xl bg-[var(--bg-card)] p-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[var(--accent)]/10 text-[var(--accent)]"><Wrench size={20} /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-bold text-sm">{repo.name}</h3>
                    <div className="flex gap-1 flex-wrap">
                      {repo.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: `${TAG_COLORS[tag] || "#6c5ce7"}20`, color: TAG_COLORS[tag] || "#6c5ce7" }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">{repo.about}</p>
                  <div className="flex gap-2">
                    <a href={repo.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1"><ExternalLink size={10} /> GitHub</a>
                    {repo.appUrl && <a href={repo.appUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1"><ExternalLink size={10} /> App/Demo</a>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
