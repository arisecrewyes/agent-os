"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Settings as SettingsIcon, Server, Key, FolderOpen,
  Globe, Shield, Bell, Palette, Check, X,
  LayoutDashboard, Target, BookOpen
} from "lucide-react";

function PageNav() {
  const items = [
    { label: "Mission Control", icon: <LayoutDashboard size={14} />, href: "/" },
    { label: "Goals", icon: <Target size={14} />, href: "/goals" },
    { label: "Journal", icon: <BookOpen size={14} />, href: "/journal" },
  ];
  return (
    <div className="flex items-center gap-1 mb-6">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] transition-colors"
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
}

interface SettingsState {
  vaultPath: string;
  appUrl: string;
  openrouterKey: string;
  notifications: boolean;
  theme: "dark" | "light";
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState>({
    vaultPath: "/data/agentos-vault",
    appUrl: "https://agentos.srv1121935.hstgr.cloud",
    openrouterKey: "",
    notifications: true,
    theme: "dark",
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load current env info from the API
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings((prev) => ({ ...prev, ...data }));
      })
      .catch(() => {
        // Use defaults
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-[var(--text-secondary)]">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto">
        <PageNav />
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <SettingsIcon className="text-[var(--accent)]" size={28} />
            Settings
          </h1>
          <p className="text-[var(--text-secondary)]">
            Configure your Agent OS instance.
          </p>
        </div>

        {/* Vault Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glow-border rounded-xl p-5 bg-[var(--bg-card)] mb-4"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FolderOpen size={18} className="text-[var(--accent)]" />
            Vault
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-[var(--text-secondary)] block mb-1">
                Vault Path
              </label>
              <input
                type="text"
                value={settings.vaultPath}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, vaultPath: e.target.value }))
                }
                className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Where goals, journal, and agent data are stored.
              </p>
            </div>
          </div>
        </motion.div>

        {/* API Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="glow-border rounded-xl p-5 bg-[var(--bg-card)] mb-4"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Key size={18} className="text-[var(--yellow)]" />
            API
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-[var(--text-secondary)] block mb-1">
                OpenRouter API Key
              </label>
              <input
                type="password"
                value={settings.openrouterKey}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, openrouterKey: e.target.value }))
                }
                placeholder="sk-or-..."
                className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Required for chat. Get your key at openrouter.ai
              </p>
            </div>
            <div>
              <label className="text-sm text-[var(--text-secondary)] block mb-1">
                App URL
              </label>
              <input
                type="text"
                value={settings.appUrl}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, appUrl: e.target.value }))
                }
                className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Used as the referrer for OpenRouter requests.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glow-border rounded-xl p-5 bg-[var(--bg-card)] mb-4"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Palette size={18} className="text-[var(--blue)]" />
            Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Notifications</div>
                <div className="text-xs text-[var(--text-secondary)]">
                  Show browser notifications for agent events
                </div>
              </div>
              <button
                onClick={() =>
                  setSettings((s) => ({ ...s, notifications: !s.notifications }))
                }
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  settings.notifications ? "bg-[var(--accent)]" : "bg-[var(--border)]"
                }`}
              >
                <motion.div
                  className="w-5 h-5 rounded-full bg-white absolute top-0.5"
                  animate={{ left: settings.notifications ? 22 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Theme</div>
                <div className="text-xs text-[var(--text-secondary)]">
                  Dark mode is recommended for Agent OS
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSettings((s) => ({ ...s, theme: "dark" }))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    settings.theme === "dark"
                      ? "bg-[var(--accent)] text-white"
                      : "bg-[var(--bg-primary)] text-[var(--text-secondary)]"
                  }`}
                >
                  Dark
                </button>
                <button
                  onClick={() => setSettings((s) => ({ ...s, theme: "light" }))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    settings.theme === "light"
                      ? "bg-[var(--accent)] text-white"
                      : "bg-[var(--bg-primary)] text-[var(--text-secondary)]"
                  }`}
                >
                  Light
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* System Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glow-border rounded-xl p-5 bg-[var(--bg-card)] mb-6"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Server size={18} className="text-[var(--green)]" />
            System
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Version</span>
              <span>0.1.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Environment</span>
              <span>production</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Framework</span>
              <span>Next.js 16</span>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-[var(--accent)] text-white font-medium flex items-center gap-2 hover:bg-[var(--accent)]/80 transition-colors"
          >
            {saved ? (
              <>
                <Check size={16} /> Saved!
              </>
            ) : (
              "Save Settings"
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
