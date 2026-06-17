"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Settings as SettingsIcon, Server, Key, FolderOpen,
  Globe, Shield, Bell, Palette, Check, X, Bot, Cpu,
  LayoutDashboard, Target, BookOpen, ChevronDown, ChevronRight,
  Eye, EyeOff, AlertCircle, Save
} from "lucide-react";

function PageNav() {
  const items = [
    { label: "Mission Control", icon: <LayoutDashboard size={14} />, href: "/" },
    { label: "Goals", icon: <Target size={14} />, href: "/goals" },
    { label: "Journal", icon: <BookOpen size={14} />, href: "/journal" },
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

interface AgentConfig {
  id: string;
  name: string;
  icon: string;
  color: string;
  category: string;
  envVars: { key: string; label: string; placeholder: string; secret?: boolean }[];
}

const AGENT_CONFIGS: AgentConfig[] = [
  {
    id: "global",
    name: "Global",
    icon: "🌐",
    color: "#6c5ce7",
    category: "Core",
    envVars: [
      { key: "OPENROUTER_API_KEY", label: "OpenRouter API Key", placeholder: "sk-or-v1-...", secret: true },
      { key: "NEXT_PUBLIC_APP_URL", label: "App URL", placeholder: "https://your-domain.com" },
      { key: "VAULT_PATH", label: "Vault Path", placeholder: "/data/agentos-vault" },
    ],
  },
  {
    id: "content-creator",
    name: "Content Creator",
    icon: "🎬",
    color: "#ff7417",
    category: "Content Creation",
    envVars: [
      { key: "ELEVENLABS_API_KEY", label: "ElevenLabs API Key (optional)", placeholder: "sk_...", secret: true },
      { key: "VOICEWAVE_API_KEY", label: "VoiceWave API Key (optional)", placeholder: "...", secret: true },
      { key: "PYXA_API_KEY", label: "Pyxa API Key (optional)", placeholder: "...", secret: true },
      { key: "MAGICA_API_KEY", label: "Magica API Key (optional)", placeholder: "...", secret: true },
      { key: "FAL_AI_KEY", label: "fal.ai API Key (optional)", placeholder: "...", secret: true },
    ],
  },
  {
    id: "hermes-automation",
    name: "Hermes Automation",
    icon: "🤖",
    color: "#f5c842",
    category: "Automation",
    envVars: [
      { key: "TELEGRAM_BOT_TOKEN", label: "Telegram Bot Token (optional)", placeholder: "123456:ABC-DEF...", secret: true },
      { key: "DISCORD_BOT_TOKEN", label: "Discord Bot Token (optional)", placeholder: "...", secret: true },
      { key: "SLACK_BOT_TOKEN", label: "Slack Bot Token (optional)", placeholder: "xoxb-...", secret: true },
    ],
  },
  {
    id: "hermes-voice",
    name: "Hermes Voice",
    icon: "📞",
    color: "#fdcb6e",
    category: "Automation",
    envVars: [
      { key: "TWILIO_ACCOUNT_SID", label: "Twilio Account SID (optional)", placeholder: "AC...", secret: true },
      { key: "TWILIO_AUTH_TOKEN", label: "Twilio Auth Token (optional)", placeholder: "...", secret: true },
      { key: "TWILIO_PHONE_NUMBER", label: "Twilio Phone Number (optional)", placeholder: "+1234567890" },
      { key: "DOGRAH_API_KEY", label: "Dograh API Key (optional)", placeholder: "...", secret: true },
    ],
  },
  {
    id: "conductor-stack",
    name: "Conductor",
    icon: "🎻",
    color: "#e17055",
    category: "Automation",
    envVars: [
      { key: "BROWSE_SH_API_KEY", label: "Browse.sh API Key (optional)", placeholder: "...", secret: true },
    ],
  },
  {
    id: "memory-engine",
    name: "Memory Engine",
    icon: "📚",
    color: "#fdcb6e",
    category: "Memory & Brain",
    envVars: [
      { key: "OMI_API_KEY", label: "OMI API Key (optional)", placeholder: "...", secret: true },
      { key: "OBSIDIAN_VAULT_PATH", label: "Obsidian Vault Path", placeholder: "/path/to/vault" },
    ],
  },
  {
    id: "memory-brain",
    name: "Memory & Brain Systems",
    icon: "🧠",
    color: "#6c5ce7",
    category: "Memory & Brain",
    envVars: [
      { key: "MEMANTO_API_KEY", label: "Memanto API Key (optional)", placeholder: "...", secret: true },
      { key: "ALOOK_API_KEY", label: "Alook API Key (optional)", placeholder: "...", secret: true },
    ],
  },
  {
    id: "skill-master",
    name: "Skill Master",
    icon: "⚡",
    color: "#00b894",
    category: "Skills & Creation",
    envVars: [
      { key: "SKILL_OPTIMIZATION_KEY", label: "SkillOpt API Key (optional)", placeholder: "...", secret: true },
    ],
  },
  {
    id: "goldie-stack",
    name: "Goldie Stack",
    icon: "🏗️",
    color: "#e056fd",
    category: "Coding & Development",
    envVars: [
      { key: "OPENAI_API_KEY", label: "OpenAI API Key (for Codex)", placeholder: "sk-...", secret: true },
      { key: "GITHUB_TOKEN", label: "GitHub Token (for MCP)", placeholder: "ghp_...", secret: true },
    ],
  },
  {
    id: "bolt-diy",
    name: "Bolt DIY",
    icon: "💻",
    color: "#6c5ce7",
    category: "Coding & Development",
    envVars: [
      { key: "NETLIFY_AUTH_TOKEN", label: "Netlify Auth Token (optional)", placeholder: "...", secret: true },
      { key: "NETLIFY_SITE_ID", label: "Netlify Site ID (optional)", placeholder: "..." },
    ],
  },
  {
    id: "minimax-hermes",
    name: "MiniMax M3 + Hermes",
    icon: "⚙️",
    color: "#0984e3",
    category: "AI Workspace",
    envVars: [
      { key: "OLLAMA_BASE_URL", label: "Ollama Base URL (optional)", placeholder: "http://localhost:11434" },
      { key: "MINIMAX_API_KEY", label: "MiniMax API Key (optional)", placeholder: "...", secret: true },
    ],
  },
  {
    id: "odysseus-agent",
    name: "Odysseus",
    icon: "🌐",
    color: "#00b894",
    category: "AI Workspace",
    envVars: [],
  },
  {
    id: "getting-started-agent",
    name: "Getting Started",
    icon: "🚀",
    color: "#ff6b6b",
    category: "Getting Started",
    envVars: [],
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("global");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [configs, setConfigs] = useState<Record<string, Record<string, string>>>({});
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [expandedAgent, setExpandedAgent] = useState<string | null>("global");

  const loadConfigs = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setConfigs(data.configs || {});
    } catch {
      // Use defaults
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadConfigs(); }, []);

  const handleSave = async () => {
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ configs }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateConfig = (agentId: string, key: string, value: string) => {
    setConfigs(prev => ({
      ...prev,
      [agentId]: { ...(prev[agentId] || {}), [key]: value },
    }));
  };

  const toggleSecret = (key: string) => {
    setShowSecrets(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const activeConfig = AGENT_CONFIGS.find(c => c.id === activeSection);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-[var(--text-secondary)]">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto p-6">
        <PageNav />
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <SettingsIcon className="text-[var(--accent)]" size={28} />
            Settings
          </h1>
          <p className="text-[var(--text-secondary)]">
            Configure API keys, credentials, and preferences for all AI Agents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Agent List */}
          <div className="md:col-span-1">
            <div className="glow-border rounded-xl bg-[var(--bg-card)] p-3 space-y-1">
              {AGENT_CONFIGS.map((config) => (
                <button
                  key={config.id}
                  onClick={() => { setActiveSection(config.id); setExpandedAgent(config.id); }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                    activeSection === config.id
                      ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <span className="text-base">{config.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-xs truncate">{config.name}</div>
                    <div className="text-[9px] text-[var(--text-secondary)]">{config.category}</div>
                  </div>
                  {config.envVars.length > 0 && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--bg-primary)] text-[var(--text-secondary)]">
                      {config.envVars.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Config Panel */}
          <div className="md:col-span-3">
            {activeConfig ? (
              <motion.div
                key={activeConfig.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glow-border rounded-xl bg-[var(--bg-card)] p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{activeConfig.icon}</span>
                  <div>
                    <h2 className="text-lg font-bold">{activeConfig.name}</h2>
                    <p className="text-xs text-[var(--text-secondary)]">{activeConfig.category}</p>
                  </div>
                </div>

                {activeConfig.envVars.length > 0 ? (
                  <div className="space-y-4">
                    {activeConfig.envVars.map((envVar) => (
                      <div key={envVar.key}>
                        <label className="text-sm text-[var(--text-secondary)] block mb-1">
                          {envVar.label}
                        </label>
                        <div className="flex gap-2">
                          <div className="flex-1 relative">
                            <input
                              type={envVar.secret && !showSecrets[envVar.key] ? "password" : "text"}
                              value={configs[activeConfig.id]?.[envVar.key] || ""}
                              onChange={(e) => updateConfig(activeConfig.id, envVar.key, e.target.value)}
                              placeholder={envVar.placeholder}
                              className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors pr-10"
                            />
                            {envVar.secret && (
                              <button
                                type="button"
                                onClick={() => toggleSecret(envVar.key)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                              >
                                {showSecrets[envVar.key] ? <EyeOff size={14} /> : <Eye size={14} />}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-[var(--text-secondary)]">
                    <Bot size={32} className="mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No API keys required for this agent.</p>
                    <p className="text-xs mt-1">Uses global configuration.</p>
                  </div>
                )}

                {activeConfig.id === "global" && (
                  <div className="mt-6 p-4 rounded-lg bg-[var(--yellow)]/5 border border-[var(--yellow)]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle size={14} className="text-[var(--yellow)]" />
                      <span className="text-sm font-medium text-[var(--yellow)]">Important</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">
                      The OpenRouter API Key is required for all chat functionality. Get your free key at{" "}
                      <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">openrouter.ai</a>.
                      All other keys are optional and only needed if you use the corresponding agent features.
                    </p>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6 text-center text-[var(--text-secondary)]">
                Select an agent to configure its settings.
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end mt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="px-6 py-2.5 rounded-xl bg-[var(--accent)] text-white font-medium flex items-center gap-2 hover:bg-[var(--accent)]/80 transition-colors"
              >
                {saved ? (
                  <><Check size={16} /> Saved!</>
                ) : (
                  <><Save size={16} /> Save Settings</>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
