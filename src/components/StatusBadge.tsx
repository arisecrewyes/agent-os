"use client";

import { motion } from "framer-motion";

interface StatusBadgeProps {
  status: "live" | "degraded" | "offline" | "busy";
  size?: "sm" | "md";
}

const statusConfig = {
  live: { label: "LIVE", color: "var(--green)" },
  degraded: { label: "DEGRADED", color: "var(--yellow)" },
  offline: { label: "OFFLINE", color: "var(--red)" },
  busy: { label: "BUSY", color: "var(--blue)" },
};

export default function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${
        size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1"
      }`}
      style={{
        backgroundColor: `${config.color}15`,
        color: config.color,
      }}
    >
      <motion.span
        className="rounded-full"
        style={{
          width: size === "sm" ? 5 : 6,
          height: size === "sm" ? 5 : 6,
          backgroundColor: config.color,
        }}
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ repeat: Infinity, duration: status === "busy" ? 1 : 2 }}
      />
      {config.label}
    </div>
  );
}
