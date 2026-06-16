"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Sparkles, FolderGit2, Wrench, Brain, Search, Shield, Zap, Globe, Code, Star } from "lucide-react";

interface AddAgentModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (agent: {
    id: string;
    name: string;
    role: string;
    icon: string;
    status: "live" | "degraded" | "offline" | "busy";
    description: string;
    color: string;
    repoUrl?: string;
  }) => void;
}

const EMOJI_OPTIONS = ["🦀", "⚡", "🧠", "🔍", "🛡️", "💀", "🌐", "🔧", "⭐", "🎯", "📡", "🤖", "🐍", "☠️", "🔮", "💡", "🚀", "🎨", "📊", "🔑"];

const COLOR_OPTIONS = [
  "#6c5ce7", "#f5c842", "#ff6b6b", "#00d68f", "#4dabf7",
  "#e056fd", "#fd79a8", "#00cec9", "#fdcb6e", "#e17055",
  "#6c5ce7", "#a29bfe", "#74b9ff", "#55efc4", "#ffeaa7",
];

const PRESET_AGENTS = [
  { name: "OSINT Hunter", role: "Recon & Discovery", icon: "🔍", description: "Automated OSINT reconnaissance — subdomain enumeration, dorking, social media scraping, digital footprint analysis.", color: "#4dabf7", category: "OSINT" },
  { name: "Pentest Agent", role: "Offensive Security", icon: "🛡️", description: "AI-guided penetration testing — vulnerability scanning, exploit discovery, payload generation, remediation.", color: "#ff6b6b", category: "Pentest" },
  { name: "Scraping Engine", role: "Data Gathering", icon: "📡", description: "Large-scale web scraping with anti-bot bypass, LLM-powered extraction, and structured data pipelines.", color: "#f5c842", category: "Scraping" },
  { name: "Skill Forge", role: "Skill Builder", icon: "⚡", description: "Converts repos, books, PDFs, and links into executable AI agent skills. Self-improving skill factory.", color: "#e056fd", category: "Builder" },
  { name: "Deep Researcher", role: "Research", icon: "🧠", description: "Deep research agent — multi-source synthesis, competitive intelligence, market analysis, content creation.", color: "#6c5ce7", category: "Research" },
  { name: "Privacy Ops", role: "Privacy & OPSEC", icon: "☠️", description: "Digital footprint erasure, privacy hardening, de-backgrounding, alias management, encryption.", color: "#00d68f", category: "Privacy" },
  { name: "Lead Generator", role: "Lead Gen & Sales", icon: "🎯", description: "Automated lead generation, enrichment, cold outreach, CRM management, and affiliate funnel building.", color: "#fd79a8", category: "Sales" },
  { name: "Content Forge", role: "Content Creation", icon: "🎨", description: "AI-powered content engine — video editing, image generation, PDF resumes, dynamic presentations, social content.", color: "#fdcb6e", category: "Content" },
  { name: "Vault Keeper", role: "Memory & Vault", icon: "🔑", description: "Persistent agent memory — knowledge graph, vector search, skill indexing, vault management.", color: "#00cec9", category: "Memory" },
  { name: "DevOps Engineer", role: "Infrastructure", icon: "🔧", description: "Docker management, CI/CD, server provisioning, monitoring, backups, network security.", color: "#e17055", category: "DevOps" },
];

export default function AddAgentModal({ open, onClose, onAdd }: AddAgentModalProps) {
  const [tab, setTab] = useState<"preset" | "custom">("preset");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("🤖");
  const [color, setColor] = useState("#6c5ce7");
  const [repoUrl, setRepoUrl] = useState("");

  const reset = () => {
    setName("");
    setRole("");
    setDescription("");
    setIcon("🤖");
    setColor("#6c5ce7");
    setRepoUrl("");
    setTab("preset");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleAddPreset = (preset: typeof PRESET_AGENTS[0]) => {
    onAdd({
      id: `custom-${Date.now()}`,
      name: preset.name,
      role: preset.role,
      icon: preset.icon,
      status: "live" as const,
      description: preset.description,
      color: preset.color,
    });
    handleClose();
  };

  const handleAddCustom = () => {
    if (!name.trim() || !role.trim()) return;
    onAdd({
      id: `custom-${Date.now()}`,
      name: name.trim(),
      role: role.trim(),
      icon,
      status: "live" as const,
      description: description.trim() || `${role} agent.`,
      color,
      repoUrl: repoUrl.trim() || undefined,
    });
    handleClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-lg max-h-[85vh] bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 border-b border-[var(--border)] flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Plus size={18} className="text-[var(--accent)]" />
                  Add New Agent
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Create a custom agent or pick from presets
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-[var(--bg-card)] transition-colors text-[var(--text-secondary)]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tabs */}
            <div className="px-5 pt-3 flex gap-2 shrink-0">
              <button
                onClick={() => setTab("preset")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  tab === "preset"
                    ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-card)]"
                }`}
              >
                <Sparkles size={12} /> Presets
              </button>
              <button
                onClick={() => setTab("custom")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  tab === "custom"
                    ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-card)]"
                }`}
              >
                <Wrench size={12} /> Custom
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {tab === "preset" ? (
                <div className="space-y-2">
                  {PRESET_AGENTS.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => handleAddPreset(preset)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border)] hover:border-[var(--accent)]/50 transition-all text-left group"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0"
                        style={{ backgroundColor: `${preset.color}20` }}
                      >
                        {preset.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{preset.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--bg-primary)] text-[var(--text-secondary)]">
                            {preset.category}
                          </span>
                        </div>
                        <div className="text-xs text-[var(--text-secondary)] truncate">{preset.role} — {preset.description.substring(0, 60)}...</div>
                      </div>
                      <Plus size={16} className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors shrink-0" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="text-sm font-medium block mb-1">Agent Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., OSINT Hunter"
                      className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="text-sm font-medium block mb-1">Role *</label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g., Reconnaissance & OSINT"
                      className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-sm font-medium block mb-1">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="What does this agent do? What tools/skills does it have?"
                      rows={3}
                      className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                    />
                  </div>

                  {/* Icon Picker */}
                  <div>
                    <label className="text-sm font-medium block mb-1">Icon</label>
                    <div className="flex flex-wrap gap-1.5">
                      {EMOJI_OPTIONS.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => setIcon(emoji)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-base transition-all ${
                            icon === emoji
                              ? "bg-[var(--accent)]/20 border-2 border-[var(--accent)] scale-110"
                              : "bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent)]/50"
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Picker */}
                  <div>
                    <label className="text-sm font-medium block mb-1">Color</label>
                    <div className="flex flex-wrap gap-1.5">
                      {COLOR_OPTIONS.map((c) => (
                        <button
                          key={c}
                          onClick={() => setColor(c)}
                          className={`w-7 h-7 rounded-lg transition-all ${
                            color === c ? "ring-2 ring-white ring-offset-2 ring-offset-[var(--bg-secondary)] scale-110" : "hover:scale-110"
                          }`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Repo URL (optional) */}
                  <div>
                    <label className="text-sm font-medium block mb-1 flex items-center gap-1.5">
                      <FolderGit2 size={12} /> GitHub Repo URL (optional)
                    </label>
                    <input
                      type="url"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      placeholder="https://github.com/owner/repo"
                      className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                    <p className="text-[10px] text-[var(--text-secondary)] mt-1">
                      Link a GitHub repo to auto-populate agent skills from the README.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[var(--border)] flex justify-end gap-2 shrink-0">
              {tab === "custom" && (
                <button
                  onClick={handleAddCustom}
                  disabled={!name.trim() || !role.trim()}
                  className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium disabled:opacity-40 hover:bg-[var(--accent)]/80 transition-colors flex items-center gap-2"
                >
                  <Plus size={14} /> Create Agent
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
