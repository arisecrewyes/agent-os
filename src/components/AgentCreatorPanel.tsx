"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Send, Loader2, Globe, Github, FileText, BookOpen,
  Plus, Sparkles, Check, ChevronRight, FolderOpen, Server,
  Globe2, Layers, MessageSquare, Wrench, X, Paperclip
} from "lucide-react";

interface AgentCreatorPanelProps {
  onBack: () => void;
  onAgentCreated: (agent: {
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

type Step = "source" | "analyzing" | "customize" | "deploy" | "creating" | "done";

interface SourceOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  placeholder: string;
}

const SOURCE_OPTIONS: SourceOption[] = [
  { id: "url", label: "Website URL", icon: <Globe size={16} />, placeholder: "https://example.com" },
  { id: "github", label: "GitHub Repo", icon: <Github size={16} />, placeholder: "https://github.com/owner/repo" },
  { id: "pdf", label: "PDF / Document", icon: <FileText size={16} />, placeholder: "Paste text content or describe the document..." },
  { id: "ebook", label: "eBook", icon: <BookOpen size={16} />, placeholder: "Paste eBook title, ISBN, or content summary..." },
  { id: "other", label: "Other / Custom", icon: <Plus size={16} />, placeholder: "Describe your source material..." },
];

const DEPLOY_OPTIONS = [
  { id: "hostinger", label: "Hostinger VPS", icon: <Server size={16} />, desc: "Deploy as a Docker container on your VPS" },
  { id: "gostackbase", label: "GoStackBase", icon: <Globe2 size={16} />, desc: "Deploy to your GoStackBase web builder" },
  { id: "github", label: "GitHub Repo", icon: <Github size={16} />, desc: "Push the project to a new GitHub repository" },
  { id: "local", label: "Local / Download", icon: <FolderOpen size={16} />, desc: "Generate files for local download" },
  { id: "agent-only", label: "Agent Only", icon: <Sparkles size={16} />, desc: "Just create the agent, no deployment" },
];

export default function AgentCreatorPanel({ onBack, onAgentCreated }: AgentCreatorPanelProps) {
  const [step, setStep] = useState<Step>("source");
  const [sourceType, setSourceType] = useState<string>("");
  const [sourceInput, setSourceInput] = useState("");
  const [sourceNote, setSourceNote] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [customFeatures, setCustomFeatures] = useState("");
  const [deployTarget, setDeployTarget] = useState("");
  const [deployNotes, setDeployNotes] = useState("");
  const [createdAgent, setCreatedAgent] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const addMessage = (role: "user" | "assistant", content: string) => {
    setChatMessages((prev) => [...prev, { role, content }]);
  };

  const handleSelectSource = (id: string) => {
    setSourceType(id);
    setSourceInput("");
    setSourceNote("");
    setShowNote(false);
  };

  const handleSubmitSource = async () => {
    if (!sourceInput.trim()) return;

    setIsProcessing(true);
    setStep("analyzing");

    const sourceLabel = SOURCE_OPTIONS.find((s) => s.id === sourceType)?.label || sourceType;
    addMessage("user", `${sourceLabel}: ${sourceInput}${sourceNote ? `\n\nNote: ${sourceNote}` : ""}`);

    try {
      const res = await fetch("/api/agent-creator/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceType,
          sourceInput,
          sourceNote,
        }),
      });
      const data = await res.json();

      setAnalysis(data.analysis || "Analysis complete.");
      addMessage("assistant", data.analysis || "I've analyzed your source. What custom features would you like to add?");
      setStep("customize");
    } catch {
      addMessage("assistant", "⚠️ Error analyzing source. Please try again or describe what you'd like to build.");
      setStep("source");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmitCustomFeatures = async () => {
    if (!customFeatures.trim()) return;

    setIsProcessing(true);
    addMessage("user", customFeatures);

    try {
      const res = await fetch("/api/agent-creator/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          analysis,
          customFeatures,
          sourceType,
          sourceInput,
        }),
      });
      const data = await res.json();

      addMessage("assistant", data.plan || "Got it! Where would you like to deploy this?");
      setStep("deploy");
    } catch {
      addMessage("assistant", "⚠️ Error creating plan. Let me know where you'd like to deploy.");
      setStep("deploy");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSelectDeploy = async (target: string) => {
    setDeployTarget(target);
    setIsProcessing(true);

    const deployLabel = DEPLOY_OPTIONS.find((d) => d.id === target)?.label || target;
    addMessage("user", `Deploy to: ${deployLabel}${deployNotes ? ` — ${deployNotes}` : ""}`);

    try {
      const res = await fetch("/api/agent-creator/deploy-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target,
          analysis,
          customFeatures,
          sourceType,
          sourceInput,
          deployNotes,
        }),
      });
      const data = await res.json();

      addMessage("assistant", data.message || "Ready to build! I'll create your agent and project now.");
      setStep("creating");

      // Actually create the agent
      const createRes = await fetch("/api/agent-creator/build", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target,
          analysis,
          customFeatures,
          sourceType,
          sourceInput,
          deployNotes,
        }),
      });
      const createData = await createRes.json();

      if (createData.agent) {
        setCreatedAgent(createData.agent);
        onAgentCreated(createData.agent);
        addMessage("assistant", `✅ **Agent Created: ${createData.agent.name}**\n\n${createData.agent.description}\n\nThe agent has been added to your sidebar. ${createData.deployResult ? `\n\n**Deployment:** ${createData.deployResult}` : "You can chat with it anytime to build more projects like this."}`);
        setStep("done");
      } else {
        addMessage("assistant", "⚠️ Agent was created but deployment needs manual setup. Check the Settings page for details.");
        setStep("done");
      }
    } catch {
      addMessage("assistant", "⚠️ Error during build. The agent may still have been created. Check your sidebar.");
      setStep("done");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFreeInput = async () => {
    if (!input.trim() || isProcessing) return;

    const userMsg = input.trim();
    setInput("");
    addMessage("user", userMsg);
    setIsProcessing(true);

    try {
      const res = await fetch("/api/agent-creator/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          step,
          analysis,
          customFeatures,
          sourceType,
          sourceInput,
          history: chatMessages.slice(-10),
        }),
      });
      const data = await res.json();
      addMessage("assistant", data.response || "I'm processing that...");
    } catch {
      addMessage("assistant", "⚠️ Connection error. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border)] bg-[var(--bg-secondary)] flex items-center gap-3 shrink-0">
        <button
          onClick={onBack}
          className="p-1.5 rounded-lg hover:bg-[var(--bg-card)] transition-colors text-[var(--text-secondary)]"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ backgroundColor: "#e056fd20" }}>
          🏗️
        </div>
        <div className="flex-1">
          <div className="font-semibold">Agent Creator</div>
          <div className="text-xs text-[var(--text-secondary)]">Build new agents from any source</div>
        </div>
        <div className="text-xs font-medium px-2 py-1 rounded-full bg-[var(--bg-card)] text-[var(--text-secondary)]">
          {step === "source" && "Step 1: Source"}
          {step === "analyzing" && "Analyzing..."}
          {step === "customize" && "Step 2: Customize"}
          {step === "deploy" && "Step 3: Deploy"}
          {step === "creating" && "Building..."}
          {step === "done" && "✅ Complete"}
        </div>
      </div>

      {/* Progress Steps */}
      <div className="px-4 py-2 border-b border-[var(--border)] bg-[var(--bg-secondary)]/50 flex items-center gap-2 shrink-0">
        {["source", "customize", "deploy", "done"].map((s, i) => (
          <div key={s} className="flex items-center gap-1.5">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              step === s ? "bg-[var(--accent)] text-white" :
              ["source", "customize", "deploy", "done"].indexOf(step) > i ? "bg-[var(--green)] text-white" :
              "bg-[var(--bg-card)] text-[var(--text-secondary)]
            `}>
              {["source", "customize", "deploy", "done"].indexOf(step) > i ? <Check size={10} /> : i + 1}
            </div>
            <span className={`text-[10px] ${
              step === s ? "text-[var(--accent)] font-medium" : "text-[var(--text-secondary)]
            }`}>
              {s === "source" ? "Source" : s === "customize" ? "Customize" : s === "deploy" ? "Deploy" : "Done"}
            </span>
            {i < 3 && <ChevronRight size={10} className="text-[var(--text-secondary)] ml-1" />}
          </div>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.length === 0 && step === "source" && (
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-6"
            >
              <div className="text-4xl mb-3">🏗️</div>
              <h2 className="text-xl font-bold mb-1">Agent Creator</h2>
              <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
                I can build a new agent from any source — a website, GitHub repo, PDF, eBook, or anything else.
                I'll analyze it, add your custom features, and deploy it for you.
              </p>
            </motion.div>

            <div className="max-w-lg mx-auto">
              <p className="text-sm font-medium mb-3 text-[var(--text-secondary)]">What type of source do you want to build from?</p>
              <div className="space-y-2">
                {SOURCE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectSource(opt.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                      sourceType === opt.id
                        ? "border-[var(--accent)] bg-[var(--accent)]/10"
                        : "border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)]/50"
                    }`}
                  >
                    <div className={`${sourceType === opt.id ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"}`}>
                      {opt.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{opt.label}</div>
                      <div className="text-xs text-[var(--text-secondary)]">{opt.placeholder}</div>
                    </div>
                    {sourceType === opt.id && <Check size={16} className="ml-auto text-[var(--accent)]" />}
                  </button>
                ))}
              </div>

              {sourceType && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 space-y-3"
                >
                  <textarea
                    value={sourceInput}
                    onChange={(e) => setSourceInput(e.target.value)}
                    placeholder={SOURCE_OPTIONS.find((s) => s.id === sourceType)?.placeholder}
                    rows={sourceType === "url" || sourceType === "github" ? 2 : 4}
                    className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                  />

                  {/* Add note toggle */}
                  {!showNote ? (
                    <button
                      onClick={() => setShowNote(true)}
                      className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                    >
                      <Paperclip size={12} /> Add a note (sections to ignore, specific focus, etc.)
                    </button>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                          <Paperclip size={12} /> Additional notes
                        </span>
                        <button onClick={() => { setShowNote(false); setSourceNote(""); }} className="text-[var(--text-secondary)] hover:text-red-400">
                          <X size={12} />
                        </button>
                      </div>
                      <textarea
                        value={sourceNote}
                        onChange={(e) => setSourceNote(e.target.value)}
                        placeholder="e.g., Ignore the pricing section, focus on the API docs, skip chapters 1-3..."
                        rows={2}
                        className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                      />
                    </div>
                  )}

                  <button
                    onClick={handleSubmitSource}
                    disabled={!sourceInput.trim() || isProcessing}
                    className="w-full py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-medium disabled:opacity-40 hover:bg-[var(--accent)]/80 transition-colors flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <><Loader2 size={14} className="animate-spin" /> Analyzing...</>
                    ) : (
                      <><Sparkles size={14} /> Analyze & Continue</>
                    )}
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {step === "customize" && chatMessages.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
            <Loader2 size={24} className="animate-spin mx-auto mb-3 text-[var(--accent)]" />
            <p className="text-sm text-[var(--text-secondary)]">Analyzing your source...</p>
          </motion.div>
        )}

        {/* Chat messages */}
        {chatMessages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-[var(--accent)] text-white rounded-br-md"
                  : "bg-[var(--bg-card)] border border-[var(--border)] rounded-bl-md"
              }`}
            >
              <div className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</div>
            </div>
          </motion.div>
        ))}

        {/* Deploy options */}
        {step === "deploy" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto space-y-2"
          >
            <p className="text-sm font-medium mb-3 text-[var(--text-secondary)]">Where should this be deployed?</p>
            {DEPLOY_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectDeploy(opt.id)}
                disabled={isProcessing}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)]/50 transition-all text-left disabled:opacity-50"
              >
                <div className="text-[var(--accent)]">{opt.icon}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{opt.label}</div>
                  <div className="text-xs text-[var(--text-secondary)]">{opt.desc}</div>
                </div>
                <ChevronRight size={14} className="text-[var(--text-secondary)]" />
              </button>
            ))}

            <div className="mt-3">
              <textarea
                value={deployNotes}
                onChange={(e) => setDeployNotes(e.target.value)}
                placeholder="Any specific deployment notes? (e.g., domain name, subfolder, specific requirements...)"
                rows={2}
                className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
              />
            </div>
          </motion.div>
        )}

        {/* Creating spinner */}
        {step === "creating" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
            <Loader2 size={32} className="animate-spin mx-auto mb-3 text-[var(--accent)]" />
            <p className="text-sm font-medium mb-1">Building your agent...</p>
            <p className="text-xs text-[var(--text-secondary)]">This may take a minute</p>
          </motion.div>
        )}

        {/* Done state */}
        {step === "done" && createdAgent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center py-6"
          >
            <div className="text-5xl mb-3">{createdAgent.icon}</div>
            <h3 className="text-lg font-bold mb-1">{createdAgent.name}</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">{createdAgent.description}</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--green)]/10 text-[var(--green)] text-sm font-medium">
              <Check size={16} /> Agent added to your sidebar
            </div>
          </motion.div>
        )}

        {isProcessing && step !== "creating" && step !== "analyzing" && (
          <div className="flex justify-start">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
              <Loader2 size={14} className="animate-spin text-[var(--accent)]" />
              <span className="text-sm text-[var(--text-secondary)]">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-[var(--border)] bg-[var(--bg-secondary)] shrink-0">
        {step === "customize" && (
          <div className="flex gap-2">
            <input
              type="text"
              value={customFeatures}
              onChange={(e) => setCustomFeatures(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmitCustomFeatures()}
              placeholder="Describe the custom features you want to add..."
              className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
            <button
              onClick={handleSubmitCustomFeatures}
              disabled={!customFeatures.trim() || isProcessing}
              className="p-2.5 rounded-xl bg-[var(--accent)] text-white disabled:opacity-40 hover:bg-[var(--accent)]/80 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        )}
        {(step === "done" || step === "deploy") && (
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleFreeInput()}
              placeholder={step === "done" ? "Ask about your new agent or start another project..." : "Add deployment notes or ask a question..."}
              className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
            <button
              onClick={handleFreeInput}
              disabled={!input.trim() || isProcessing}
              className="p-2.5 rounded-xl bg-[var(--accent)] text-white disabled:opacity-40 hover:bg-[var(--accent)]/80 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
