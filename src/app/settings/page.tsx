"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Settings as SettingsIcon, Server, Key, FolderOpen,
  Globe, Shield, Bell, Palette, Check, X, Bot, Cpu,
  LayoutDashboard, Target, BookOpen, ChevronDown, ChevronRight,
  Eye, EyeOff, AlertCircle, Save, User, Lock, Mail, Smartphone, KeyRound, RefreshCw
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
  const [activeUserTab, setActiveUserTab] = useState("profile");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [passwordForUsername, setPasswordForUsername] = useState("");
  const [twoFAMethod, setTwoFAMethod] = useState<"app" | "email" | "sso">("app");
  const [twoFAEmail, setTwoFAEmail] = useState("");
  const [twoFAPassword, setTwoFAPassword] = useState("");
  const [userSaved, setUserSaved] = useState(false);
  const [userError, setUserError] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newBackupCodes, setNewBackupCodes] = useState<string[]>([]);
  const [newTOTPSecret, setNewTOTPSecret] = useState("");
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

            {/* User Management Section */}
            <div className="mt-8 pt-8 border-t border-[var(--border)]">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <User size={18} className="text-[var(--accent)]" />
                User Management
              </h2>

              {/* User Tabs */}
              <div className="flex gap-2 mb-6">
                {[
                  { id: "profile", label: "Profile", icon: <User size={14} /> },
                  { id: "password", label: "Password", icon: <Lock size={14} /> },
                  { id: "2fa", label: "Two-Factor Auth", icon: <Shield size={14} /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveUserTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeUserTab === tab.id
                        ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                        : "bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {/* Profile Tab */}
                {activeUserTab === "profile" && (
                  <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                    <h3 className="font-semibold mb-4">Change Username</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-[var(--text-secondary)] block mb-1">New Username</label>
                        <input type="text" value={newUsername} onChange={e => setNewUsername(e.target.value)}
                          placeholder="Enter new username" minLength={2}
                          className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors" />
                      </div>
                      <div>
                        <label className="text-sm text-[var(--text-secondary)] block mb-1">Current Password (for verification)</label>
                        <div className="relative">
                          <input type={showCurrentPassword ? "text" : "password"} value={passwordForUsername}
                            onChange={e => setPasswordForUsername(e.target.value)}
                            placeholder="Enter current password"
                            className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors" />
                          <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                            {showCurrentPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        </div>
                      </div>
                      <button onClick={async () => {
                        setUserError(""); setUserSaved(false);
                        if (!newUsername || !passwordForUsername) { setUserError("All fields required"); return; }
                        const res = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ action: "changeUsername", password: passwordForUsername, newUsername }) });
                        const data = await res.json();
                        if (!res.ok) { setUserError(data.error); return; }
                        setUserSaved(true); setNewUsername(""); setPasswordForUsername("");
                        setTimeout(() => setUserSaved(false), 2000);
                      }} className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent)]/80 transition-colors">
                        {userSaved ? <><Check size={14} className="inline mr-1" /> Updated!</> : "Change Username"}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Password Tab */}
                {activeUserTab === "password" && (
                  <motion.div key="password" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                    <h3 className="font-semibold mb-4">Change Password</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-[var(--text-secondary)] block mb-1">Current Password</label>
                        <div className="relative">
                          <input type={showCurrentPassword ? "text" : "password"} value={currentPassword}
                            onChange={e => setCurrentPassword(e.target.value)}
                            placeholder="Enter current password"
                            className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors" />
                          <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                            {showCurrentPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-[var(--text-secondary)] block mb-1">New Password (max 70 characters)</label>
                        <div className="relative">
                          <input type={showNewPassword ? "text" : "password"} value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            placeholder="Enter new password" maxLength={70}
                            className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors" />
                          <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                            {showNewPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-[var(--text-secondary)] block mb-1">Confirm New Password</label>
                        <input type="password" value={confirmPassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password" maxLength={70}
                          className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors" />
                      </div>
                      <button onClick={async () => {
                        setUserError(""); setUserSaved(false);
                        if (!currentPassword || !newPassword || !confirmPassword) { setUserError("All fields required"); return; }
                        if (newPassword !== confirmPassword) { setUserError("New passwords do not match"); return; }
                        if (newPassword.length > 70) { setUserError("Password must be 70 characters or less"); return; }
                        const res = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ action: "changePassword", currentPassword, newPassword }) });
                        const data = await res.json();
                        if (!res.ok) { setUserError(data.error); return; }
                        setUserSaved(true); setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
                        setTimeout(() => setUserSaved(false), 2000);
                      }} className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent)]/80 transition-colors">
                        {userSaved ? <><Check size={14} className="inline mr-1" /> Changed!</> : "Change Password"}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 2FA Tab */}
                {activeUserTab === "2fa" && (
                  <motion.div key="2fa" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                    <h3 className="font-semibold mb-4">Two-Factor Authentication</h3>

                    {/* 2FA Method Selection */}
                    <div className="space-y-3 mb-6">
                      <p className="text-sm text-[var(--text-secondary)]">Choose your 2FA method:</p>
                      {[
                        { id: "app", label: "Authenticator App", desc: "Proton Pass, Google Authenticator, Authy, etc.", icon: <Smartphone size={16} /> },
                        { id: "email", label: "Email", desc: "Receive codes via email", icon: <Mail size={16} /> },
                        { id: "sso", label: "Single Sign-On (SSO)", desc: "Use your existing SSO provider", icon: <KeyRound size={16} /> },
                      ].map((method) => (
                        <button key={method.id} onClick={() => setTwoFAMethod(method.id as any)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                            twoFAMethod === method.id
                              ? "bg-[var(--accent)]/10 border border-[var(--accent)]/30"
                              : "bg-[var(--bg-primary)] border border-[var(--border)] hover:border-[var(--accent)]/30"
                          }`}>
                          <div className={twoFAMethod === method.id ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"}>{method.icon}</div>
                          <div>
                            <div className="text-sm font-medium">{method.label}</div>
                            <div className="text-xs text-[var(--text-secondary)]">{method.desc}</div>
                          </div>
                          {twoFAMethod === method.id && <Check size={14} className="ml-auto text-[var(--accent)]" />}
                        </button>
                      ))}
                    </div>

                    {/* Email field for email method */}
                    {twoFAMethod === "email" && (
                      <div className="mb-4">
                        <label className="text-sm text-[var(--text-secondary)] block mb-1">Email Address for 2FA Codes</label>
                        <input type="email" value={twoFAEmail} onChange={e => setTwoFAEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors" />
                      </div>
                    )}

                    {/* Password verification */}
                    <div className="mb-4">
                      <label className="text-sm text-[var(--text-secondary)] block mb-1">Current Password (for verification)</label>
                      <input type="password" value={twoFAPassword}
                        onChange={e => setTwoFAPassword(e.target.value)}
                        placeholder="Enter current password"
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors" />
                    </div>

                    <button onClick={async () => {
                      setUserError(""); setUserSaved(false); setNewBackupCodes([]); setNewTOTPSecret("");
                      if (!twoFAPassword) { setUserError("Password required"); return; }
                      const res = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ action: "configure2FA", password: twoFAPassword, enable: true, method: twoFAMethod, email: twoFAEmail }) });
                      const data = await res.json();
                      if (!res.ok) { setUserError(data.error); return; }
                      setUserSaved(true); setTwoFAPassword("");
                      if (data.backupCodes) setNewBackupCodes(data.backupCodes);
                      if (data.twoFactorSecret) setNewTOTPSecret(data.twoFactorSecret);
                      setTimeout(() => setUserSaved(false), 3000);
                    }} className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent)]/80 transition-colors mr-2">
                      Enable 2FA
                    </button>

                    <button onClick={async () => {
                      setUserError(""); setUserSaved(false);
                      if (!twoFAPassword) { setUserError("Password required"); return; }
                      const res = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ action: "configure2FA", password: twoFAPassword, enable: false }) });
                      const data = await res.json();
                      if (!res.ok) { setUserError(data.error); return; }
                      setUserSaved(true); setTwoFAPassword(""); setNewBackupCodes([]); setNewTOTPSecret("");
                    }} className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors">
                      Disable 2FA
                    </button>

                    {/* TOTP Secret Display */}
                    {newTOTPSecret && (
                      <div className="mt-4 p-4 rounded-lg bg-[var(--yellow)]/5 border border-[var(--yellow)]/20">
                        <h4 className="font-semibold text-sm mb-2 text-[var(--yellow)]">Scan this secret in your authenticator app:</h4>
                        <code className="block bg-[var(--bg-primary)] rounded-lg p-2 text-xs font-mono break-all">{newTOTPSecret}</code>
                      </div>
                    )}

                    {/* Backup Codes Display */}
                    {newBackupCodes.length > 0 && (
                      <div className="mt-4 p-4 rounded-lg bg-[var(--red)]/5 border border-[var(--red)]/20">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm text-red-400">Backup Codes — Save These!</h4>
                          <button onClick={async () => {
                            const res = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ action: "regenerateBackupCodes", password: twoFAPassword }) });
                            const data = await res.json();
                            if (data.backupCodes) setNewBackupCodes(data.backupCodes);
                          }} className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1">
                            <RefreshCw size={10} /> Regenerate
                          </button>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] mb-2">Use these if you lose access to your 2FA method. Each code works once.</p>
                        <div className="grid grid-cols-2 gap-1">
                          {newBackupCodes.map((code, i) => (
                            <code key={i} className="bg-[var(--bg-primary)] rounded px-2 py-1 text-xs font-mono">{code}</code>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* User Error/Success Messages */}
              {userError && (
                <div className="mt-4 flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <AlertCircle size={14} className="text-red-400 shrink-0" />
                  <p className="text-sm text-red-400">{userError}</p>
                </div>
              )}
            </div>

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

