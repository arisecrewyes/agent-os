"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Bot, Target, BookOpen, Settings,
  ChevronLeft, ChevronRight, Plus, Trash2, Pin, PinOff,
  ChevronUp, ChevronDown, GripVertical, Brain, Zap, Rocket, Layers, Database, Users, Heart, Cpu, Sparkles, MessageSquare, Globe, Monitor, Phone, Volume2, Code, Video, Wrench
} from "lucide-react";
import { useState } from "react";
import StatusBadge from "./StatusBadge";
import AddAgentModal from "./AddAgentModal";

interface Agent {
  id: string;
  name: string;
  role: string;
  icon: string;
  status: "live" | "degraded" | "offline" | "busy";
  description: string;
  color: string;
  repoUrl?: string;
  pinned?: boolean;
  order?: number;
  category?: string;
}

interface SidebarProps {
  agents: Agent[];
  activeAgent: string | null;
  onSelectAgent: (id: string | null) => void;
  onAddAgent?: (agent: Agent) => void;
  onRemoveAgent?: (id: string) => void;
  builtInIds?: string[];
  onReorderAgents?: (agents: Agent[]) => void;
  onTogglePin?: (id: string) => void;
}

export default function Sidebar({
  agents,
  activeAgent,
  onSelectAgent,
  onAddAgent,
  onRemoveAgent,
  builtInIds = [],
  onReorderAgents,
  onTogglePin,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
  const [walkthroughsOpen, setWalkthroughsOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  const walkthroughItems = [
    { label: "Getting Started", icon: <Rocket size={16} />, href: "/getting-started" },
    { label: "Memory Engine", icon: <Brain size={16} />, href: "/memory-system" },
    { label: "Infinite Context", icon: <Database size={16} />, href: "/infinite-context" },
    { label: "Second Brain", icon: <Heart size={16} />, href: "/second-brain" },
    { label: "MiniMax M3", icon: <Cpu size={16} />, href: "/minimax-hermes" },
    { label: "Odysseus", icon: <Globe size={16} />, href: "/odysseus" },
    { label: "Hermes vs Odysseus", icon: <Monitor size={16} />, href: "/hermes-vs-odysseus" },
    { label: "Hermes Voice", icon: <Phone size={16} />, href: "/hermes-voice" },
    { label: "Bolt DIY", icon: <Code size={16} />, href: "/bolt-diy" },
    { label: "Conductor Stack", icon: <Users size={16} />, href: "/conductor-stack" },
    { label: "Automation", icon: <Zap size={16} />, href: "/automation" },
    { label: "Goldie Stack", icon: <Layers size={16} />, href: "/goldie-stack" },
  ];

  const navItems = [
    { label: "Mission Control", icon: <LayoutDashboard size={20} />, href: "/" },
    { label: "Walkthroughs", icon: <BookOpen size={20} />, href: null, isWalkthroughs: true },
    { label: "Goals", icon: <Target size={20} />, href: "/goals" },
    { label: "Journal", icon: <BookOpen size={20} />, href: "/journal" },
    { label: "Settings", icon: <Settings size={20} />, href: "/settings" },
  ];

  // Split agents into built-in and custom
  const builtIn = agents.filter((a) => builtInIds.includes(a.id));
  const custom = agents.filter((a) => !builtInIds.includes(a.id));
  // Sort custom: pinned first, then by order
  const sortedCustom = [...custom].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return (a.order ?? 999) - (b.order ?? 999);
  });

  const handleAddAgent = (agent: Agent) => {
    onAddAgent?.(agent);
  };

  const moveAgent = (id: string, direction: "up" | "down") => {
    const idx = sortedCustom.findIndex((a) => a.id === id);
    if (idx === -1) return;

    const newAgents = [...sortedCustom];
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= newAgents.length) return;

    // Swap orders
    const tempOrder = newAgents[idx].order ?? idx;
    newAgents[idx] = { ...newAgents[idx], order: newAgents[swapIdx].order ?? swapIdx };
    newAgents[swapIdx] = { ...newAgents[swapIdx], order: tempOrder };

    // Build full agent list: built-in (unchanged) + reordered custom
    onReorderAgents?.([...builtIn, ...newAgents]);
  };

  const handleTogglePin = (id: string) => {
    onTogglePin?.(id);
  };

  const renderAgentButton = (agent: Agent, idx: number, isBuiltIn: boolean) => {
    const isRemovable = !isBuiltIn && onRemoveAgent;
    const showPinToggle = !isBuiltIn && onTogglePin;
    const showReorder = !isBuiltIn && onReorderAgents && sortedCustom.length > 1;

    return (
      <div
        key={agent.id}
        className="relative group/agent"
        onMouseEnter={() => setHoveredAgent(agent.id)}
        onMouseLeave={() => setHoveredAgent(null)}
      >
        <button
          onClick={() => onSelectAgent(agent.id)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
            activeAgent === agent.id
              ? "bg-[var(--accent)]/20 text-[var(--accent)]"
              : "text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
          }`}
        >
          {showReorder && !collapsed && (
            <GripVertical size={12} className="text-[var(--text-secondary)]/30 shrink-0 cursor-grab" />
          )}
          <span className="text-lg shrink-0">{agent.icon}</span>
          {!collapsed && (
            <div className="flex-1 text-left min-w-0">
              <div className="font-medium truncate flex items-center gap-1.5">
                {agent.name}
                {agent.pinned && (
                  <Pin size={10} className="text-[var(--yellow)] shrink-0" />
                )}
              </div>
              <StatusBadge status={agent.status} size="sm" />
            </div>
          )}
        </button>

        {/* Hover actions */}
        {!collapsed && hoveredAgent === agent.id && (
          <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5 z-10">
            {showPinToggle && (
              <button
                onClick={(e) => { e.stopPropagation(); handleTogglePin(agent.id); }}
                className="p-1 rounded bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--yellow)] transition-colors"
                title={agent.pinned ? "Unpin" : "Pin to top"}
              >
                {agent.pinned ? <PinOff size={10} /> : <Pin size={10} />}
              </button>
            )}
            {showReorder && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); moveAgent(agent.id, "up"); }}
                  disabled={idx === 0}
                  className="p-1 rounded bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 transition-colors"
                  title="Move up"
                >
                  <ChevronUp size={10} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); moveAgent(agent.id, "down"); }}
                  disabled={idx === sortedCustom.length - 1}
                  className="p-1 rounded bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 transition-colors"
                  title="Move down"
                >
                  <ChevronDown size={10} />
                </button>
              </>
            )}
            {isRemovable && (
              <button
                onClick={(e) => { e.stopPropagation(); onRemoveAgent(agent.id); }}
                className="p-1 rounded bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                title="Remove agent"
              >
                <Trash2 size={10} />
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
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
          {navItems.map((item) => {
            const isActive = item.href === "/" ? isHome && !activeAgent : item.href ? pathname.startsWith(item.href) : false;

            // Walkthroughs dropdown
            if ((item as any).isWalkthroughs) {
              const wtActive = walkthroughItems.some((w: any) => pathname.startsWith(w.href));
              return (
                <div key={item.label}>
                  <button
                    onClick={() => setWalkthroughsOpen(!walkthroughsOpen)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
                      wtActive ? "bg-[var(--accent)]/20 text-[var(--accent)]" : "text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {item.icon}
                    {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
                    {!collapsed && <ChevronDown size={14} className={`transition-transform ${walkthroughsOpen ? "rotate-180" : ""}`} />}
                  </button>
                  <AnimatePresence>
                    {walkthroughsOpen && !collapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-4 space-y-0.5 mt-0.5"
                      >
                        {walkthroughItems.map((wt: any) => (
                          <Link
                            key={wt.label}
                            href={wt.href}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                              pathname.startsWith(wt.href)
                                ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                                : "text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
                            }`}
                          >
                            {wt.icon}
                            <span className="text-xs">{wt.label}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            if (item.href === "/") {
              return (
                <button key={item.label} onClick={() => onSelectAgent(null)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${isActive ? "bg-[var(--accent)]/20 text-[var(--accent)]" : "text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"}`}
                >
                  {item.icon}{!collapsed && <span>{item.label}</span>}
                </button>
              );
            }

            return (
              <Link key={item.label} href={item.href!}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${isActive ? "bg-[var(--accent)]/20 text-[var(--accent)]" : "text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"}`}
              >
                {item.icon}{!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Agents Section */}
        <div className="flex-1 overflow-y-auto p-2">
          {!collapsed && (
            <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider px-3 py-2 flex items-center justify-between">
              <span>Agents</span>
              <span className="text-[10px] font-normal normal-case tracking-normal bg-[var(--bg-card)] px-1.5 py-0.5 rounded">
                {agents.length}
              </span>
            </div>
          )}

          <div className="space-y-1">
            {/* Built-in agents grouped by category */}
            {(() => {
              const categories = [...new Set(builtIn.map(a => a.category || "Main"))];
              const elements: React.JSX.Element[] = [];
              let globalIdx = 0;
              categories.forEach((cat, catIdx) => {
                const catAgents = builtIn.filter(a => (a.category || "Main") === cat);
                // Category header
                if (!collapsed) {
                  elements.push(
                    <div key={`cat-${cat}`} className="flex items-center gap-2 px-3 py-1.5 mt-2 first:mt-0">
                      <span className="text-[9px] text-[var(--text-secondary)] uppercase tracking-wider font-semibold">{cat}</span>
                      <div className="flex-1 h-px bg-[var(--border)]" />
                    </div>
                  );
                }
                catAgents.forEach((agent) => {
                  elements.push(renderAgentButton(agent, globalIdx, true));
                  globalIdx++;
                });
                // Separator between categories
                if (catIdx < categories.length - 1 && !collapsed) {
                  elements.push(
                    <div key={`sep-${cat}`} className="h-px bg-[var(--border)]/30 mx-3" />
                  );
                }
              });
              return elements;
            })()}

            {/* Separator between built-in and custom */}
            {sortedCustom.length > 0 && !collapsed && (
              <div className="flex items-center gap-2 px-3 py-1.5">
                <div className="flex-1 h-px bg-[var(--border)]" />
                <span className="text-[9px] text-[var(--text-secondary)] uppercase tracking-wider">Custom</span>
                <div className="flex-1 h-px bg-[var(--border)]" />
              </div>
            )}

            {/* Custom agents (reorderable) */}
            {sortedCustom.map((agent, i) => renderAgentButton(agent, i, false))}

            {/* Add Agent Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm border border-dashed border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)]/50 hover:text-[var(--accent)] hover:bg-[var(--accent)]/5 mt-1"
            >
              <Plus size={18} className="shrink-0" />
              {!collapsed && <span className="font-medium">Add Agent</span>}
            </button>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "logout" }) })
              .then(() => window.location.href = "/login");
          }}
          className="p-3 border-t border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-red-400 transition-colors"
          title="Sign out"
        >
          <span className="text-sm">🚪 Sign Out</span>
        </button>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-3 border-t border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </motion.aside>

      <AddAgentModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddAgent}
      />
    </>
  );
}
