"use client";

import { motion } from "framer-motion";
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

interface AgentCardProps {
  agent: Agent;
  index: number;
  onClick: () => void;
}

export default function AgentCard({ agent, index, onClick }: AgentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.08 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glow-border rounded-xl p-5 bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] transition-colors cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${agent.color}20` }}
          >
            {agent.icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{agent.name}</h3>
            <p className="text-sm text-[var(--text-secondary)]">{agent.role}</p>
          </div>
        </div>
        <StatusBadge status={agent.status} />
      </div>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
        {agent.description}
      </p>
      <div className="mt-4 flex items-center gap-2 text-xs text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Open chat</span>
        <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          →
        </motion.span>
      </div>
    </motion.div>
  );
}
