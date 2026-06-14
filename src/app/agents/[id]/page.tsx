"use client";

import { useParams } from "next/navigation";

export default function AgentPage() {
  const params = useParams();
  const agentId = params.id as string;

  return (
    <div className="h-full flex items-center justify-center text-[var(--text-secondary)]">
      <div className="text-center">
        <p className="text-lg">Agent: {agentId}</p>
        <p className="text-sm mt-2">Per-agent detail page — coming soon</p>
      </div>
    </div>
  );
}
