"use client";

import { motion } from "framer-motion";
import { Mic, MicOff, Send, ArrowLeft, Loader2 } from "lucide-react";
import { RefObject } from "react";

interface Agent {
  id: string;
  name: string;
  role: string;
  icon: string;
  status: string;
  description: string;
  color: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  agentId: string;
}

interface ChatPanelProps {
  agent: Agent;
  messages: ChatMessage[];
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
  isListening: boolean;
  isSending: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onBack: () => void;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

export default function ChatPanel({
  agent,
  messages,
  input,
  setInput,
  onSend,
  isListening,
  isSending,
  onStartListening,
  onStopListening,
  onBack,
  messagesEndRef,
}: ChatPanelProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-[var(--border)] bg-[var(--bg-secondary)] flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-1.5 rounded-lg hover:bg-[var(--bg-card)] transition-colors text-[var(--text-secondary)]"
        >
          <ArrowLeft size={18} />
        </button>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
          style={{ backgroundColor: `${agent.color}20` }}
        >
          {agent.icon}
        </div>
        <div className="flex-1">
          <div className="font-semibold">{agent.name}</div>
          <div className="text-xs text-[var(--text-secondary)]">{agent.role}</div>
        </div>
        <div className={`status-${agent.status} text-xs font-medium px-2 py-1 rounded-full bg-[var(--bg-card)]`}>
          {agent.status.toUpperCase()}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-[var(--text-secondary)]">
            <div className="text-4xl mb-3">{agent.icon}</div>
            <p className="text-lg font-medium">Start a conversation with {agent.name}</p>
            <p className="text-sm mt-1">Ask anything — this agent has access to your full context.</p>
          </div>
        )}

        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-[var(--accent)] text-white rounded-br-md"
                  : "bg-[var(--bg-card)] border border-[var(--border)] rounded-bl-md"
              }`}
            >
              <div className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</div>
              <div className={`text-[10px] mt-1 ${msg.role === "user" ? "text-white/60" : "text-[var(--text-secondary)]"}`}>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </motion.div>
        ))}

        {isSending && (
          <div className="flex justify-start">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
              <Loader2 size={14} className="animate-spin text-[var(--accent)]" />
              <span className="text-sm text-[var(--text-secondary)]">{agent.name} is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="flex items-center gap-2">
          <button
            onClick={isListening ? onStopListening : onStartListening}
            className={`p-2.5 rounded-xl transition-colors ${
              isListening
                ? "bg-red-500/20 text-red-400 animate-pulse"
                : "bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
            title={isListening ? "Stop recording" : "Voice input"}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && onSend()}
            placeholder={isListening ? "Listening..." : `Message ${agent.name}...`}
            className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />

          <button
            onClick={onSend}
            disabled={!input.trim() || isSending}
            className="p-2.5 rounded-xl bg-[var(--accent)] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--accent)]/80 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        {isListening && (
          <div className="mt-2 text-xs text-red-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            Speech recognition active — speak now
          </div>
        )}
      </div>
    </div>
  );
}
