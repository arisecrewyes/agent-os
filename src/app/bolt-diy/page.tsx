"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard, Target, BookOpen, Settings, Brain, Zap, Rocket,
  Database, Bot, FileText, Check, ChevronRight, ChevronDown, Copy,
  CheckCircle2, AlertCircle, Clock, Layers, RefreshCw, ArrowRight,
  Shield, Wrench, Star, Globe, Cpu, Users, Heart, Monitor, Code,
  Terminal, ExternalLink, Download, Cloud, Play, Lightbulb, Phone, TrendingUp
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
    { label: "Hermes Voice", icon: <Phone size={14} />, href: "/hermes-voice" },
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

const SETUP_STEPS = [
  { num: 1, title: "Install Bolt DIY from GitHub", cmd: "Go to https://github.com/stackblitz-labs/bolt.diy and follow the installation instructions.", detail: "Open your terminal. Copy and paste the installation commands one by one, pressing Enter after each.", icon: <Code size={16} />, color: "#6c5ce7" },
  { num: 2, title: "Run Bolt DIY Locally", cmd: "npm run dev", detail: "This generates a local address. Copy it and open in your browser. You are now set up to build apps for free!", icon: <Play size={16} />, color: "#0984e3" },
  { num: 3, title: "Connect AI API (Claude 3.7 Sonnet)", cmd: "Select Anthropic (Claude 3.7 Sonnet) under OpenRouter in the API dropdown.", detail: "Get a free API key from https://openrouter.ai and paste it into Bolt DIY.", icon: <Brain size={16} />, color: "#00b894" },
  { num: 4, title: "Start Coding with AI", cmd: "Use Prompt Forge inside Bolt DIY to generate optimized prompts.", detail: "Enter your project idea, paste the generated prompt, and let the AI start coding.", icon: <Terminal size={16} />, color: "#e056fd" },
  { num: 5, title: "Use Free AI APIs", cmd: "Google Flash 2.0, Misra AI, DeepSeek Light / DeepSeek Go", detail: "No token limits, unlimited free coding!", icon: <Zap size={16} />, color: "#fdcb6e" },
  { num: 6, title: "Run Multiple Projects", cmd: "Open multiple tabs in Bolt DIY with different AI models.", detail: "Switch between thinking mode and normal mode for efficiency.", icon: <Layers size={16} />, color: "#e17055" },
  { num: 7, title: "Deploy Your Project (Netlify)", cmd: "Download Code (ZIP) → Upload to Netlify.com → Get free test domain!", detail: "Click Add Domain in Netlify for a custom domain.", icon: <Cloud size={16} />, color: "#6c5ce7" },
  { num: 8, title: "Track API Usage & Costs", cmd: "Go to Activity in Bolt DIY to check API usage and costs.", detail: "Most projects cost just a few cents. Use free APIs to avoid any costs.", icon: <TrendingUp size={16} />, color: "#0984e3" },
];

const FREE_APIS = [
  { name: "Google Flash 2.0 (Experimental)", desc: "Fast, experimental model from Google. Good for quick prototyping.", color: "#6c5ce7" },
  { name: "Misra AI", desc: "Free AI model option for unlimited coding.", color: "#0984e3" },
  { name: "DeepSeek Light / DeepSeek Go", desc: "Lightweight DeepSeek models. Fast and free.", color: "#00b894" },
];

const BONUS_FEATURES = [
  { feature: "Export & Save Projects", desc: "Download code anytime as ZIP.", icon: <Download size={14} /> },
  { feature: "Connect to GitHub", desc: "Auto-publish projects to your GitHub.", icon: <Code size={14} /> },
  { feature: "Prompt Library", desc: "Get optimized AI prompts for different tasks.", icon: <Lightbulb size={14} /> },
  { feature: "Switch AI Models", desc: "Use the best model for each project.", icon: <RefreshCw size={14} /> },
];

const EXAMPLE_PROMPTS = [
  { title: "SEO Quiz Game", prompt: "Create a fun SEO quiz game using HTML, CSS, and JavaScript. Users answer multiple-choice SEO-related questions, and the game keeps score. Include a timer for each question and display the correct answer after each attempt. Style it with an engaging UI and light animations." },
  { title: "SEO Pricing Calculator", prompt: "Develop a simple pricing calculator for SEO freelancers. Users enter project details (e.g., number of pages, keyword research, link building), and JavaScript calculates an estimated project cost based on predefined pricing logic. Use clean UI design with interactive sliders and checkboxes." },
  { title: "Job Board Website", prompt: "Create a job board website using HTML, CSS, and JavaScript where businesses can post SEO-related jobs, and freelancers can apply. The site should have job categories (e.g., Link Building, Technical SEO, Local SEO), a search filter, and an application form. Jobs should be stored in local storage or a JSON file for simplicity. Use a sleek, minimal design that aligns with Goldie Agency branding (gold, black, and white color scheme)." },
  { title: "SEO Simulation Game", prompt: "Develop a JavaScript-based simulation game where players start with a basic website and earn points by building backlinks, creating content, and optimizing on-page SEO. The game should include different backlink sources (guest posts, HARO, niche edits) with varying effects. Use CSS for engaging animations and a leaderboard tracking the best SEO players." },
  { title: "SEO Audit Checklist", prompt: "Develop an interactive SEO audit checklist where users check off completed tasks, such as optimizing title tags, fixing broken links, and improving page speed. The tool should save progress using local storage and feature a Download Report button. Use HTML, CSS, and JavaScript for a clean, responsive design." },
  { title: "SEO Title Generator", prompt: "Build a lightweight, browser-based SEO title and meta description generator. Users enter their keyword, and the tool generates optimized titles and meta descriptions based on best practices. Add a Copy to Clipboard button for easy use. Keep the design sleek, minimalist, and in Goldie Agency signature colors. Orange #ff7417 Darker #cf5a00 Yellowish #ffb40c" },
  { title: "SEO Assessment Quiz", prompt: "Develop an SEO assessment quiz where users answer 10 questions, and at the end, they receive a personalized score (Beginner, Intermediate, SEO Pro). Offer a free SEO consultation for those who sign up. Use JavaScript for real-time scoring and CSS for a polished, professional look." },
  { title: "SEO Case Studies Landing Page", prompt: "Build an SEO case studies landing page where Goldie Agency showcases past client success stories. Use interactive elements (before/after ranking charts, testimonial sliders) and a CTA encouraging potential clients to book a free consultation. Design should be sleek, fast, and conversion-optimized." },
];

export default function BoltDIYPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: <Rocket size={16} /> },
    { id: "setup", label: "Setup Guide", icon: <Terminal size={16} /> },
    { id: "apis", label: "Free AI APIs", icon: <Zap size={16} /> },
    { id: "prompts", label: "Example Prompts", icon: <Lightbulb size={16} /> },
    { id: "bonus", label: "Bonus Features", icon: <Star size={16} /> },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto p-6">
        <PageNav />
        <div className="mb-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium mb-4">
            <Code size={14} /> Bolt DIY + Claude 3.7 Sonnet
          </motion.div>
          <h1 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">Free AI Coding & Development</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-2">Build web apps, games, tools, and more with AI — all for free. No paid APIs required.</p>
          <div className="flex items-center justify-center gap-3 mt-3">
            <a href="https://github.com/stackblitz-labs/bolt.diy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-[var(--accent)] hover:underline"><ExternalLink size={12} /> Bolt DIY GitHub</a>
            <a href="https://openrouter.ai/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-[var(--accent)] hover:underline"><ExternalLink size={12} /> OpenRouter</a>
          </div>
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
                <h2 className="text-lg font-semibold mb-3">What Is Bolt DIY?</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">Bolt DIY is a free, open-source alternative to Bolt New. Combined with Claude 3.7 Sonnet (via OpenRouter), it becomes one of the most powerful AI development setups available — completely free. Build web apps, games, tools, and more with minimal effort.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[{ t: "Free", desc: "No paid APIs required. Use free models or bring your own key.", icon: <Star size={18} />, color: "#6c5ce7" }, { t: "Fast", desc: "Build and deploy in minutes, not days.", icon: <Zap size={18} />, color: "#0984e3" }, { t: "Powerful", desc: "Claude 3.7 Sonnet thinking mode for complex projects.", icon: <Brain size={18} />, color: "#00b894" }].map((item) => (
                    <div key={item.t} className="bg-[var(--bg-primary)] rounded-lg p-4 text-center">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: `${item.color}20`, color: item.color }}>{item.icon}</div>
                      <div className="font-bold text-sm">{item.t}</div>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <h2 className="text-lg font-semibold mb-3">Claude 3.7 Sonnet Modes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[var(--bg-primary)] rounded-lg p-4">
                    <div className="font-bold text-sm mb-1 flex items-center gap-2"><Brain size={14} className="text-[var(--purple)]" /> Thinking Mode</div>
                    <p className="text-xs text-[var(--text-secondary)]">More advanced responses. Better quality for complex reasoning, planning, and multi-step tasks. Slower but more thorough.</p>
                  </div>
                  <div className="bg-[var(--bg-primary)] rounded-lg p-4">
                    <div className="font-bold text-sm mb-1 flex items-center gap-2"><Zap size={14} className="text-[var(--blue)]" /> Normal Mode</div>
                    <p className="text-xs text-[var(--text-secondary)]">Faster responses. Less reasoning overhead. Best for quick tasks, simple code generation, and rapid prototyping.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "setup" && (
            <motion.div key="setup" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">Setup Guide \u2014 8 Steps</h2>
              {SETUP_STEPS.map((step) => (
                <div key={step.num} className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${step.color}20`, color: step.color }}>{step.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${step.color}20`, color: step.color }}>Step {step.num}</span>
                        <h3 className="font-semibold text-sm">{step.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 bg-[var(--bg-primary)] rounded-lg p-2 mb-1">
                          <code className="text-xs font-mono text-[var(--accent)] flex-1 overflow-x-auto">{step.cmd}</code>
                        </div>
                      <p className="text-xs text-[var(--text-secondary)]">{step.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "apis" && (
            <motion.div key="apis" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">Free AI APIs for Unlimited Usage</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4">Avoid paid APIs entirely with these free options. No token limits, unlimited free coding.</p>
              <div className="space-y-3">
                {FREE_APIS.map((api) => (
                  <div key={api.name} className="glow-border rounded-xl bg-[var(--bg-card)] p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${api.color}20`, color: api.color }}><Zap size={20} /></div>
                    <div><div className="font-bold text-sm" style={{ color: api.color }}>{api.name}</div><p className="text-xs text-[var(--text-secondary)]">{api.desc}</p></div>
                  </div>
                ))}
              </div>
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-5">
                <h3 className="font-semibold mb-2">How to Switch Models in Bolt DIY</h3>
                <p className="text-sm text-[var(--text-secondary)]">Inside Bolt DIY, go to the API selection dropdown. Select any model from the OpenRouter list. Free models are marked with a "Free" tag. You can run different models in different tabs simultaneously.</p>
              </div>
            </motion.div>
          )}

          {activeTab === "prompts" && (
            <motion.div key="prompts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">Example Prompts</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4">Copy these prompts into Bolt DIY to build real projects. Customize for your needs.</p>
              {EXAMPLE_PROMPTS.map((item, i) => (
                <div key={i} className="glow-border rounded-xl bg-[var(--bg-card)] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <button onClick={() => copyToClipboard(item.prompt, i)} className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors">
                      {copiedIdx === i ? <><Check size={12} className="text-[var(--green)]" /> Copied!</> : <><Copy size={12} /> Copy</>}
                    </button>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.prompt}</p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "bonus" && (
            <motion.div key="bonus" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">Bonus Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BONUS_FEATURES.map((item) => (
                  <div key={item.feature} className="glow-border rounded-xl bg-[var(--bg-card)] p-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[var(--accent)]/10 text-[var(--accent)]">{item.icon}</div>
                    <div><div className="font-bold text-sm">{item.feature}</div><p className="text-xs text-[var(--text-secondary)]">{item.desc}</p></div>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-r from-[var(--accent)]/10 to-[var(--green)]/10 border border-[var(--accent)]/20 rounded-xl p-6 text-center">
                <h3 className="text-lg font-bold mb-2">Final Thoughts</h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto">Bolt DIY + Claude 3.7 Sonnet is one of the most powerful AI development setups. It is free, fast, and highly effective for building web apps, games, tools, and more with minimal effort.</p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}


