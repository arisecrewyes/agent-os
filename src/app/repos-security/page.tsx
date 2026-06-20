"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard, Target, BookOpen, Settings, Brain, Zap, Rocket,
  Database, Bot, FileText, Check, ChevronRight, ChevronDown,
  CheckCircle2, AlertCircle, Clock, Layers, RefreshCw, ArrowRight,
  Shield, Wrench, Star, Globe, Cpu, Users, Heart, Monitor, Code,
  Terminal, ExternalLink, Search, FileSearch, Video, Lock,
  Eye, Bug, Server, Radar, AlertTriangle, Cloud
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
  {
    name: "System Informer",
    url: "https://github.com/winsiderss/systeminformer",
    about: "A free, powerful, multi-purpose tool that helps you monitor system resources, debug software and detect malware. Detailed system activity overview, graphs, stack traces, service control, and real-time disk/network monitoring. 100% free, MIT licensed.",
    tags: ["system", "monitor", "debug", "malware", "windows", "free"],
    appUrl: "https://systeminformer.com",
    icon: <Monitor size={20} />,
  },
  {
    name: "flock-down",
    url: "https://github.com/nsm-barii/flock-down",
    about: "Android car head unit app that maps Flock Safety ALPR cameras and alerts you in real time when you drive past one. 101,085 ALPR cameras mapped, two-tier beep warning system, offline tile caching, 100% offline camera data bundled in APK.",
    tags: ["privacy", "alpr", "mapping", "android", "offline", "safety"],
    appUrl: "https://deflock.org",
    icon: <Eye size={20} />,
  },
  {
    name: "Awesome CloudSec Labs",
    url: "https://github.com/iknowjason/Awesome-CloudSec-Labs",
    about: "Awesome free cloud native security learning labs. Includes CTF challenges, self-hosted workshops, guided vulnerability labs, and research labs for AWS, Azure, and GCP. Curated by industry experts.",
    tags: ["cloud", "security", "labs", "ctf", "aws", "learning"],
    appUrl: "https://github.com/iknowjason/Awesome-CloudSec-Labs",
    icon: <Server size={20} />,
  },
  {
    name: "Awesome Honeypots",
    url: "https://github.com/paralax/awesome-honeypots",
    about: "A curated list of awesome honeypot resources \u2014 web, services, database, and network honeypots. Plus related components for network and artifact analysis, data tools, and guides. Focus on free and open source projects.",
    tags: ["honeypots", "security", "network", "deception", "open-source"],
    appUrl: "https://github.com/paralax/awesome-honeypots",
    icon: <Bug size={20} />,
  },
  {
    name: "Hayabusa",
    url: "https://github.com/Yamato-Security/hayabusa",
    about: "Hayabusa (\u92c6) is a sigma-based threat hunting and fast forensics timeline generator for Windows event logs. Written in memory-safe Rust with multi-threading. Full support for Sigma v2 correlation rules. Featured at Black Hat, CodeBlue, SECON, and SANS.",
    tags: ["threat-hunting", "forensics", "windows", "sigma", "rust", "security"],
    appUrl: "https://yamatosecurity.connpass.com",
    icon: <Shield size={20} />,
  },
];

const TAG_COLORS: Record<string, string> = {
  "system": "#6c5ce7", "monitor": "#0984e3", "debug": "#00b894", "malware": "#e056fd", "windows": "#fdcb6e", "free": "#e17055",
  "privacy": "#6c5ce7", "alpr": "#0984e3", "mapping": "#00b894", "android": "#e056fd", "offline": "#fdcb6e", "safety": "#e17055",
  "cloud": "#6c5ce7", "security": "#0984e3", "labs": "#00b894", "ctf": "#e056fd", "aws": "#fdcb6e", "learning": "#e17055",
  "honeypots": "#6c5ce7", "network": "#0984e3", "deception": "#00b894", "open-source": "#e056fd",
  "threat-hunting": "#fdcb6e", "forensics": "#6c5ce7", "sigma": "#0984e3", "rust": "#00b894",
};

export default function ReposSecurityPage() {
  const [filter, setFilter] = useState<string | null>(null);
  const allTags = [...new Set(REPOS.flatMap(r => r.tags))].sort();
  const filtered = filter ? REPOS.filter(r => r.tags.includes(filter)) : REPOS;

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto p-6">
        <PageNav />
        <div className="mb-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium mb-4">
            <Lock size={14} /> GitHub Repos \u2014 Security & OSINT
          </motion.div>
          <h1 className="text-3xl font-bold mb-3">
            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">Security & OSINT Repositories</span>
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">Open-source security tools for system monitoring, threat hunting, cloud security labs, honeypots, privacy protection, and OSINT reconnaissance.</p>
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
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[var(--accent)]/10 text-[var(--accent)]">{repo.icon}</div>
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
                    {repo.appUrl && <a href={repo.appUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1"><ExternalLink size={10} /> Website</a>}
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
