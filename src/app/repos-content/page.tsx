"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard, Target, BookOpen, Settings, Brain, Zap, Rocket,
  Database, Bot, FileText, Check, ChevronRight, ChevronDown, Copy,
  CheckCircle2, AlertCircle, Clock, Layers, RefreshCw, ArrowRight,
  Shield, Wrench, Star, Globe, Cpu, Users, Heart, Monitor, Code,
  Terminal, ExternalLink, Download, Cloud, Play, Lightbulb, Video,
  Image, Search, Link2, Mic, FileSearch
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
  { name: "reclip", url: "https://github.com/averygan/reclip", about: "Download videos from almost any website. Lightweight, self-hosted media downloader with a clean web UI.", tags: ["video", "download", "self-hosted", "media"] },
  { name: "Clypra", url: "https://github.com/AIEraDev/Clypra", about: "A modern video editor built with Tauri, React, and TypeScript. Focus on building free capabilities of premium CapCut functionalities.", tags: ["video", "editor", "tauri", "react"], appUrl: "https://clypra.abdulkabirmusa.com" },
  { name: "Odysseus", url: "https://github.com/pewdiepie-archdaemon/odysseus", about: "Self-hosted AI workspace. Chat, research agent, email helper, notes, calendar, memory \u2014 all in one tidy place.", tags: ["ai-workspace", "self-hosted", "chat", "agent"], appUrl: "https://pewdiepie-archdaemon.github.io/odysseus/" },
  { name: "Hyperframes", url: "https://github.com/heygen-com/hyperframes", about: "Write HTML. Render video. Built for agents.", tags: ["video", "html", "agent", "render"] },
  { name: "Pake", url: "https://github.com/tw93/Pake", about: "Turn any webpage into a desktop app with one command.", tags: ["desktop", "web", "app", "tauri"] },
  { name: "social-media-scraping-apis", url: "https://github.com/cporter202/social-media-scraping-apis", about: "A curated collection of social media scraping APIs and tools for Instagram, LinkedIn, Twitter/X, TikTok, YouTube, Facebook, and more.", tags: ["social-media", "scraping", "api", "data"], appUrl: "https://www.skool.com/vibe-coding-with-chris-7196/about" },
  { name: "GITRECON", url: "https://github.com/techenthusiast167/GITRECON", about: "A powerful Python-based OSINT tool for comprehensive GitHub reconnaissance, security assessment, and digital footprint analysis.", tags: ["osint", "github", "security", "recon"] },
  { name: "Nango", url: "https://github.com/NangoHQ/nango", about: "Build product integrations with AI.", tags: ["integrations", "api", "ai"], appUrl: "https://nango.dev" },
  { name: "video-use", url: "https://github.com/browser-use/video-use", about: "Edit videos with coding agents.", tags: ["video", "agent", "coding", "edit"] },
  { name: "sherlock", url: "https://github.com/sherlock-project/sherlock", about: "Hunt down social media accounts by username across social networks.", tags: ["osint", "social", "username", "search"], appUrl: "https://sherlockproject.xyz" },
  { name: "Open-Generative-AI", url: "https://github.com/Anil-matcha/Open-Generative-AI", about: "Open-source alternative to AI video platforms \u2014 Free AI image & video generation studio with 200+ models (Flux, Midjourney, Kling, Sora, Veo). No content filters. Self-hosted, MIT licensed.", tags: ["image", "video", "generation", "ai", "self-hosted"], appUrl: "https://muapi.ai/open-generative-ai" },
  { name: "humanizer", url: "https://github.com/blader/humanizer", about: "Claude Code skill that removes signs of AI-generated writing from text.", tags: ["ai", "writing", "claude", "skill"] },
  { name: "SalesGPT", url: "https://github.com/filip-michalsky/SalesGPT", about: "Context-aware AI Sales Agent to automate sales outreach.", tags: ["sales", "ai", "agent", "outreach"], appUrl: "https://salesgpt.vercel.app" },
  { name: "leads-generator-app", url: "https://github.com/Geolavor/leads-generator-app", about: "Prospects AI browser. Unique AI tool to extract contact details from all over the Internet in real time. Better alternative to Hunter.io and Snov.io.", tags: ["leads", "prospects", "ai", "scraping"], appUrl: "https://www.leadbrowser.co/" },
  { name: "ViMax", url: "https://github.com/HKUDS/ViMax", about: "ViMax: Agentic Video Generation (Director, Screenwriter, Producer, and Video Generator All-in-One).", tags: ["video", "generation", "ai", "agent"], appUrl: "https://arxiv.org/abs/2606.07649" },
  { name: "VibeVoice", url: "https://github.com/microsoft/VibeVoice", about: "Open-Source Frontier Voice AI from Microsoft.", tags: ["voice", "ai", "microsoft", "open-source"], appUrl: "https://microsoft.github.io/VibeVoice/" },
  { name: "wa-automate-nodejs", url: "https://github.com/open-wa/wa-automate-nodejs", about: "The most reliable tool for chatbots with advanced features.", tags: ["whatsapp", "chatbot", "automation", "node"], appUrl: "https://openwa.dev/" },
  { name: "awesome-generative-ai-guide", url: "https://github.com/aishwaryanr/awesome-generative-ai-guide", about: "A one stop repository for generative AI research updates, interview resources, notebooks and much more!", tags: ["ai", "generative", "research", "guide"], appUrl: "https://www.linkedin.com/in/areganti/" },
];

const TAG_COLORS: Record<string, string> = {
  "video": "#6c57e7", "download": "#098433", "self-hosted": "#e056fd", "media": "#fdcb6e",
  "editor": "#6c5ce7", "tauri": "#00b894", "react": "#0984e3", "ai-workspace": "#e056fd",
  "chat": "#fdcb6e", "agent": "#6c5ce7", "html": "#0984e3", "render": "#00b894",
  "desktop": "#e17055", "web": "#fdcb6e", "app": "#6c5ce7",
  "social-media": "#e056fd", "scraping": "#0984e3", "api": "#00b894", "data": "#fdcb6e",
  "osint": "#e17055", "github": "#6c5ce7", "security": "#fdcb6e", "recon": "#0984e3",
  "integrations": "#00b894", "coding": "#6c5ce7", "edit": "#e056fd",
  "social": "#fdcb6e", "username": "#0984e3", "search": "#6c5ce7",
  "image": "#e056fd", "generation": "#00b894", "ai": "#6c5ce7",
  "writing": "#fdcb6e", "claude": "#0984e3", "skill": "#e056fd",
  "sales": "#6c5ce7", "outreach": "#fdcb6e",
  "leads": "#0984e3", "prospects": "#00b894",
  "voice": "#e056fd", "microsoft": "#6c5ce7", "open-source": "#fdcb6e",
  "whatsapp": "#00b894", "chatbot": "#6c5ce7", "automation": "#e056fd", "node": "#0984e3",
  "generative": "#fdcb6e", "research": "#6c5ce7", "guide": "#0984e3",
};

export default function ReposContentPage() {
  const [filter, setFilter] = useState<string | null>(null);

  const allTags = [...new Set(REPOS.flatMap(r => r.tags))].sort();
  const filtered = filter ? REPOS.filter(r => r.tags.includes(filter)) : REPOS;

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto p-6">
        <PageNav />
        <div className="mb-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium mb-4">
            <Video size={14} /> GitHub Repos \u2014 Content Creation
          </motion.div>
          <h1 className="text-3xl font-bold mb-3">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">Content Creation Repositories</span>
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">Open-source tools for video, media, social scraping, AI generation, sales, and more. Any agent with content tasks can access and utilize these repos.</p>
        </div>

        {/* Filter Tags */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium text-[var(--text-secondary)]">Filter by tag:</span>
            <button onClick={() => setFilter(null)} className={`text-xs px-2 py-1 rounded-lg transition-colors ${!filter ? "bg-[var(--accent)] text-white" : "bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]"}`}>All ({REPOS.length})</button>
            {allTags.map(tag => (
              <button key={tag} onClick={() => setFilter(filter === tag ? null : tag)} className={`text-xs px-2 py-1 rounded-lg transition-colors ${filter === tag ? "bg-[var(--accent)] text-white" : "bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]"}`}>{tag}</button>
            ))}
          </div>
        </div>

        {/* Repo Cards */}
        <div className="space-y-3">
          {filtered.map((repo) => (
            <div key={repo.name} className="glow-border rounded-xl bg-[var(--bg-card)] p-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[var(--accent)]/10 text-[var(--accent)]">
                  <Code size={20} />
                </div>
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

        {filtered.length === 0 && (
          <div className="text-center py-12 text-[var(--text-secondary)]">
            <p>No repos match this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
