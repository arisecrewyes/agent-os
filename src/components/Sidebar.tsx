"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard, Bot, Target, BookOpen, Settings,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { useState } from "react";
import StatusBadge from "./StatusBadge";

interface Agent {
  id: string;
  name: string;
  role: string;
  icon: string;
  status: "live" | "degraded" | "offline" | "busy";
  description: string;
  color: string;
}

interface SidebarProps {
  agents: Agent[];
  activeAgent: string | null;
  onSelectAgent: (id: string | null) => void;
}

export default function Sidebar({ agents, activeAgent, onSelectAgent }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { id: null, label: "Mission Control", icon: <LayoutDashboard size={20} /> },
    { id: "goals", label: "Goals", icon: <Target size={20} /> },
    { id: "journal", label: "Journal", icon: <BookOpen size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 260 }}
      transition={{ duration: 0.2 }}
      className="h-screen bg-[var(--bg-secondary)] border-r border-[var(--border)] flex flex-col shrink-0 overflow-hidden"
    >
      {/* Logo */}
      <div className="p-4 border-b border-[var(--border)] flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-lg font-bold shrink-0">
          A
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="font-bold text-sm">Agent OS</div>
            <div className="text-xs text-[var(--text-secondary)]">Mission Control</div>
          </motion.div>
        )}
      </div>

      {/* Main Nav */}
      <nav className="p-2 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onSelectAgent(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
              activeAgent === item.id
                ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
            }`}
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Agents Section */}
      <div className="flex-1 overflow-y-auto p-2">
        {!collapsed && (
          <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider px-3 py-2">
            Agents
          </div>
        )}
        <div className="space-y-1">
          {agents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => onSelectAgent(agent.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
                activeAgent === agent.id
                  ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
              }`}
            >
              <span className="text-lg shrink-0">{agent.icon}</span>
              {!collapsed && (
                <div className="flex-1 text-left min-w-0">
                  <div className="font-medium truncate">{agent.name}</div>
                  <StatusBadge status={agent.status} size="sm" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-3 border-t border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </motion.aside>
  );
}
