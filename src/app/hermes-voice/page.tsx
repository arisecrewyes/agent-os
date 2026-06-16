"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard, Target, BookOpen, Settings, Brain, Zap, Rocket,
  Database, Bot, FileText, Check, ChevronRight, ChevronDown, Copy,
  CheckCircle2, AlertCircle, Clock, Layers, RefreshCw, ArrowRight,
  Shield, Wrench, Star, Globe, Cpu, Users, Heart, Monitor, Mic,
  Phone, Terminal, ExternalLink, Lock, Volume2, Server, Code
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

const VOICE_TOOLS = [
  {
    name: "VoiceWave",
    url: "https://space.voicewave.ai/",
    tier: "Primary",
    color: "#6c5ce7",
    description: "AI voice generation platform. Create natural-sounding voiceovers and audio content.",
    apiAvailable: "Check platform for API access. May require custom integration.",
    features: ["AI voice generation", "Multiple voices", "Audio export"],
  },
  {
    name: "Pyxa",
    url: "https://pyxa.ai/",
    tier: "Secondary",
    color: "#0984e3",
    description: "AI-powered voice and audio generation tool.",
    apiAvailable: "Check platform for API access. May require custom integration.",
    features: ["Voice generation", "Audio processing"],
  },
  {
    name: "Magica",
    url: "https://magica.com/",
    tier: "Tertiary",
    color: "#00b894",
    description: "AI voice and audio creation platform.",
    apiAvailable: "Check platform for API access. May require custom integration.",
    features: ["Voice synthesis", "Audio tools"],
  },
  {
    name: "Dograh",
    url: "https://github.com/dograh-hq/dograh",
    tier: "Open Source",
    color: "#e056fd",
    description: "Open source voice AI platform. Self-hosted alternative to Vapi and Retell. BYOK across Speech-to-Speech or LLM/STT/TTS, with visual workflow builder, MCP native and telephony support.",
    apiAvailable: "Full API + MCP native. Self-hosted = full control.",
    features: ["Self-hosted", "MCP native", "Telephony support", "Visual workflow builder", "BYOK", "Speech-to-Speech", "LLM/STT/TTS"],
    appUrl: "https://app.dograh.com",
  },
  {
    name: "fal.ai",
    url: "https://fal.ai/",
    tier: "Cloud API",
    color: "#fdcb6e",
    description: "Fast AI inference APIs including voice generation models.",
    apiAvailable: "Full REST API with SDKs.",
    features: ["Fast inference", "REST API", "Multiple models", "Pay-per-use"],
  },
  {
    name: "ElevenLabs",
    url: "https://elevenlabs.io/",
    tier: "Paid (Original)",
    color: "#636e72",
    description: "Original guide used ElevenLabs. Listed here for reference, but alternatives above are preferred for cost reasons.",
    apiAvailable: "Full API. Paid tiers required for production use.",
    features: ["High quality voice", "Full API", "Conversational AI", "Phone integration"],
  },
];

const GITHUB_REPOS = [
  {
    name: "Dograh",
    url: "https://github.com/dograh-hq/dograh",
    appUrl: "https://app.dograh.com",
    description: "Open source voice AI platform. Self-hosted alternative to Vapi and Retell. On Prem, BYOK across Speech to Speech or LLM/STT/TTS, with a visual workflow builder, MCP native and telephony support.",
    features: ["Self-hosted", "MCP native", "Telephony", "Visual workflow builder", "BYOK"],
  },
  {
    name: "ColdContactXLSX",
    url: "https://github.com/aasthas2022/ColdContactXLSX",
    description: "Automates personalized cold email outreach for job seekers. Generates potential email addresses and provides customizable templates.",
    features: ["Cold email automation", "Email address generation", "Customizable templates", "Any ESP support"],
    espNote: "Connect with any Email Service Provider (Gmail, Outlook, SendGrid, Mailgun, etc.). If the Agent does not know how to connect your ESP, it will prompt you for additional details.",
  },
];

const SETUP_STEPS = [
  { num: 1, title: "Choose Your Voice Platform", detail: "Select from the voice tools below. Each has different setup requirements. Dograh (open source, self-hosted) or fal.ai (cloud API) are recommended for full control and low cost.", icon: <Volume2 size={16} />, color: "#6c5ce7" },
  { num: 2, title: "Get API Keys", detail: "Sign up for your chosen platform and get API keys. For Dograh, you can self-host or use app.dograh.com. For cloud platforms, get your API key from the dashboard.", icon: <Lock size={16} />, color: "#0984e3" },
  { num: 3, title: "Enable Hermes API Server", detail: "Find your active profile: cat ~/.hermes/active_profile. Then edit ~/.hermes/profiles/<profile>/.env and add API_SERVER_ENABLED=true, API_SERVER_PORT=8642, API_SERVER_KEY, and your voice platform API key.", icon: <Terminal size={16} />, color: "#00b894" },
  { num: 4, title: "Pick a Fast Model", detail: "Phone calls need quick replies. Set Hermes to a fast model — not a slow reasoning model, and not a free-tier one. Those stall mid-call.", icon: <Cpu size={16} />, color: "#e056fd" },
  { num: 5, title: "Start Gateway + Tunnel", detail: "Install cloudflared (brew install cloudflared). Start hermes gateway start. Then cloudflared tunnel --url http://localhost:8642. Copy the .trycloudflare.com URL.", icon: <Server size={16} />, color: "#fdcb6e" },
  { num: 6, title: "Configure Voice Agent", detail: "In your voice platform dashboard, create a conversational agent. Point it at your tunnel URL with /v1 appended. Set the API key. For Dograh, use native MCP integration.", icon: <Bot size={16} />, color: "#e17055" },
  { num: 7, title: "Connect Phone Number", detail: "In your voice platform, connect telephony (Twilio or built-in). Import your number and assign it to the agent. For Dograh, telephony is built-in.", icon: <Phone size={16} />, color: "#6c5ce7" },
  { num: 8, title: "Call It!", detail: "Dial your number. The agent picks up. Try What can you do? It runs tasks on your Mac and answers out loud.", icon: <Phone size={16} />, color: "#00b894" },
];

const SAFETY_TIPS = [
  "This number is a live line to an agent that can run commands on your Mac. Treat it like a key to your computer.",
  "Keep the number private. Do not read it out on a recording.",
  "Say draft not send until you trust it.",
  "Kill-switch: Stop the tunnel (Ctrl+C in cloudflared) and unassign the number. No tunnel = no line.",
];

export default function HermesVoicePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: <Phone size={16} /> },
    { id: "tools", label: "Voice Tools", icon: <Volume2 size={16} /> },
    { id: "setup", label: "Setup Guide", icon: <Terminal size={16} /> },
    { id: "github", label: "GitHub Repos", icon: <Code size={16} /> },
    { id: "safety", label: "Safety", icon: <Shield size={16} /> },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto p-6">
        <PageNav />
        <div className="mb-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium mb-4">
            <Phone size={14} /> Hermes Voice Agent
          </motion.div>
          <h1 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">Call Your Hermes Agent on the Phone</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-2">Connect voice generation tools to Hermes so you can call your AI agent from any phone. ~10 minutes to set up.</p>
          <p className="text-sm text-[var(--text-secondary)]">Supports multiple voice platforms \u2014 VoiceWave, Pyxa, Magica, Dograh, fal.ai, and more.</p>
        </div>
        <div className="flex gap-1 mb-6 bg-[var(--bg-secondary)] rounded-xl p-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id ? "bg-[var(--accent)] text-white" : "text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"}`}
            >{tab.icon}{tab.label}</button>
          ))}
        </div>
        <AnimatePresence mode="wait">

          {activeTab === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h2 className="text-lg font-semibold mb-3">What This Does</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">Set up a phone number you can ring to talk to your Hermes agent. A voice platform handles the voice, Hermes does the thinking on your Mac, and a tunnel connects the two.</p>
                <div className="flex items-center justify-center gap-3 flex-wrap text-sm">
                  {[{ l: "You Call", i: <Phone size={16} />, c: "#6c5ce7" }, { l: "\u2192", i: <ArrowRight size={16} />, c: "var(--text-secondary)" }, { l: "Voice Platform", i: <Volume2 size={16} />, c: "#0984e3" }, { l: "\u2192", i: <ArrowRight size={16} />, c: "var(--text-secondary)" }, { l: "Hermes Agent", i: <Bot size={16} />, c: "#00b894" }, { l: "\u2192", i: <ArrowRight size={16} />, c: "var(--text-secondary)" }, { l: "Your Mac", i: <Server size={16} />, c: "#e056fd" }].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      {i > 0 && <ArrowRight size={12} className="text-[var(--text-secondary)]" />}
                      <div className="flex flex-col items-center gap-1"><div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.c}20`, color: item.c }}>{item.i}</div><span className="text-[10px] text-[var(--text-secondary)]">{item.l}</span></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h2 className="text-lg font-semibold mb-3">What You Need</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[{ t: "Voice Platform Account", d: "VoiceWave, Pyxa, Magica, Dograh, fal.ai, or ElevenLabs. API key required." }, { t: "Hermes Agent", d: "Installed and signed into a model provider." }, { t: "Phone Number", d: "Twilio number (cheap) or built-in telephony (Dograh)." }, { t: "Tunnel Tool", d: "cloudflared (brew install cloudflared) to expose your local server." }].map((item) => (
                    <div key={item.t} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-primary)]"><CheckCircle2 size={16} className="text-[var(--green)] shrink-0 mt-0.5" /><div><div className="font-medium text-sm">{item.t}</div><p className="text-xs text-[var(--text-secondary)]">{item.d}</p></div></div>
                  ))}
                </div>
              </div>
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h2 className="text-lg font-semibold mb-3">Why Not Just ElevenLabs?</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">The original guide used ElevenLabs, but it costs money for production use. There are excellent alternatives:</p>
                <div className="space-y-2">
                  {VOICE_TOOLS.filter(t => t.tier !== "Paid (Original)").map((tool) => (
                    <div key={tool.name} className="flex items-center gap-3 p-2 rounded-lg bg-[var(--bg-primary)]">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tool.color }} />
                      <span className="font-medium text-sm" style={{ color: tool.color }}>{tool.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${tool.color}15`, color: tool.color }}>{tool.tier}</span>
                      <span className="text-xs text-[var(--text-secondary)] flex-1">{tool.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "tools" && (
            <motion.div key="tools" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">Voice Generation Tools</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4">Choose the platform that fits your needs and budget. Not all have native API integration \u2014 the Agent will guide you through custom setup when needed.</p>
              {VOICE_TOOLS.map((tool) => (
                <div key={tool.name} className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${tool.color}20`, color: tool.color }}><Volume2 size={20} /></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold" style={{ color: tool.color }}>{tool.name}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${tool.color}15`, color: tool.color }}>{tool.tier}</span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] mb-2">{tool.description}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {tool.features.map((f) => (
                          <span key={f} className="text-xs px-2 py-1 rounded-lg bg-[var(--bg-primary)] text-[var(--text-secondary)]">{f}</span>
                        ))}
                      </div>
                      <div className="bg-[var(--bg-primary)] rounded-lg p-2 mb-2">
                        <span className="text-xs font-medium text-[var(--text-secondary)]">API: </span>
                        <span className="text-xs text-[var(--text-secondary)]">{tool.apiAvailable}</span>
                      </div>
                      <div className="flex gap-2">
                        <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1"><ExternalLink size={10} /> Visit Platform</a>
                        {tool.appUrl && <a href={tool.appUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1"><ExternalLink size={10} /> App Dashboard</a>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="glow-border rounded-xl bg-[var(--yellow)]/5 border-[var(--yellow)]/20 p-5">
                <h3 className="font-semibold mb-2 flex items-center gap-2"><AlertCircle size={16} className="text-[var(--yellow)]" /> No Native API? No Problem.</h3>
                <p className="text-sm text-[var(--text-secondary)]">If your chosen voice platform does not have a native API, the Agent will prompt you to provide custom integration details (webhook URLs, authentication tokens, custom scripts). The Agent will guide you through the setup step by step.</p>
              </div>
            </motion.div>
          )}

          {activeTab === "setup" && (
            <motion.div key="setup" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">Setup Guide \u2014 8 Steps</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4">Follow each step in order. Commands are copy-paste ready.</p>
              {SETUP_STEPS.map((step) => (
                <div key={step.num} className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${step.color}20`, color: step.color }}>{step.icon}</div>
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
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                <h3 className="font-semibold mb-3">Key Commands Reference</h3>
                <div className="space-y-2">
                  {[
                    { cmd: "cat ~/.hermes/active_profile", desc: "Find active profile" },
                    { cmd: "API_SERVER_ENABLED=true\nAPI_SERVER_PORT=8642\nAPI_SERVER_KEY=<generate-with-openssl>\nVOICE_API_KEY=<your-key>", desc: "Add to ~/.hermes/profiles/<profile>/.env" },
                    { cmd: "openssl rand -hex 24", desc: "Generate API server key" },
                    { cmd: "brew install cloudflared", desc: "Install tunnel (once)" },
                    { cmd: "hermes gateway start", desc: "Start Hermes gateway" },
                    { cmd: "curl http://127.0.0.1:8642/health", desc: "Check gateway is up" },
                    { cmd: "cloudflared tunnel --url http://localhost:8642", desc: "Start tunnel (leave running)" },
                    { cmd: "pkill -f cloudflared", desc: "Kill tunnel (kill switch)" },
                  ].map((item) => (
                    <div key={item.cmd} className="flex items-center gap-2 bg-[var(--bg-primary)] rounded-lg p-2">
                      <code className="flex-1 text-xs font-mono text-[var(--accent)] overflow-x-auto">{item.cmd}</code>
                      <span className="text-xs text-[var(--text-secondary)] shrink-0 hidden sm:block">{item.desc}</span>
                      <button onClick={() => copyToClipboard(item.cmd)} className="shrink-0 p-1 text-[var(--text-secondary)] hover:text-[var(--accent)]">
                        {copiedCmd === item.cmd ? <Check size={12} className="text-[var(--green)]" /> : <Copy size={12} />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "github" && (
            <motion.div key="github" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">GitHub Repos</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4">Open source tools to enhance your voice agent setup.</p>
              {GITHUB_REPOS.map((repo) => (
                <div key={repo.name} className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[var(--accent)]/10 text-[var(--accent)]"><Code size={20} /></div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-1">{repo.name}</h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-3">{repo.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {repo.features.map((f) => (
                          <span key={f} className="text-xs px-2 py-1 rounded-lg bg-[var(--bg-primary)] text-[var(--text-secondary)]">{f}</span>
                        ))}
                      </div>
                      {repo.espNote && (
                        <div className="bg-[var(--blue)]/5 border border-[var(--blue)]/20 rounded-lg p-3 mb-3">
                          <p className="text-xs text-[var(--text-secondary)]">{repo.espNote}</p>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <a href={repo.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1"><ExternalLink size={10} /> GitHub Repo</a>
                        {"appUrl" in repo && repo.appUrl && <a href={repo.appUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1"><ExternalLink size={10} /> App Dashboard</a>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "safety" && (
            <motion.div key="safety" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">Safety & Kill Switch</h2>
              <div className="glow-border rounded-xl bg-red-500/5 border-red-500/20 p-5">
                <h3 className="font-semibold text-red-400 mb-3 flex items-center gap-2"><Lock size={16} /> This Is a Live Key to Your Computer</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">This phone number connects directly to an agent that can run commands on your Mac. Treat it with the same care as your computer password.</p>
                <div className="space-y-2">
                  {SAFETY_TIPS.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2"><AlertCircle size={14} className="text-red-400 shrink-0 mt-0.5" /><p className="text-sm text-[var(--text-secondary)]">{tip}</p></div>
                  ))}
                </div>
              </div>
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                <h3 className="font-semibold mb-3">How to Turn It Off (Kill Switch)</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center text-xs font-bold shrink-0">1</div>
                    <div><p className="text-sm font-medium">Stop the tunnel</p><p className="text-xs text-[var(--text-secondary)]">Press Ctrl+C in the cloudflared window, or run: <code className="text-[var(--accent)]">pkill -f cloudflared</code></p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center text-xs font-bold shrink-0">2</div>
                    <div><p className="text-sm font-medium">Unassign the number</p><p className="text-xs text-[var(--text-secondary)]">In your voice platform dashboard, unassign the phone number from the agent.</p></div>
                  </div>
                  <div className="bg-[var(--green)]/10 border border-[var(--green)]/20 rounded-lg p-3">
                    <p className="text-sm text-[var(--green)]">No tunnel = no line. That is your instant kill-switch. Anyone who had the number now reaches nothing. To turn it back on, start the tunnel again and re-assign the number.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
