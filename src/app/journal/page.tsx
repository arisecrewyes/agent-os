"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Save, Mic, MicOff, Clock } from "lucide-react";

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  createdAt: number;
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentContent, setCurrentContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await fetch("/api/journal");
      const data = await res.json();
      setEntries(data.entries || []);
    } catch {
      setEntries([]);
    }
  };

  const saveEntry = async () => {
    if (!currentContent.trim()) return;
    setSaving(true);

    const existing = entries.find((e) => e.date === today);
    let updated: JournalEntry[];

    if (existing) {
      updated = entries.map((e) =>
        e.date === today ? { ...e, content: currentContent.trim() } : e
      );
    } else {
      updated = [
        {
          id: Date.now().toString(),
          date: today,
          content: currentContent.trim(),
          createdAt: Date.now(),
        },
        ...entries,
      ];
    }

    setEntries(updated);
    await fetch("/api/journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entries: updated }),
    });

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setCurrentContent((prev) => prev + transcript + " ");
    };

    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const loadEntry = (content: string) => {
    setCurrentContent(content);
    textareaRef.current?.focus();
  };

  return (
    <div className="h-full flex overflow-hidden">
      {/* Sidebar — Past Entries */}
      <div className="w-64 border-r border-[var(--border)] bg-[var(--bg-secondary)] overflow-y-auto shrink-0">
        <div className="p-4 border-b border-[var(--border)]">
          <h2 className="font-semibold text-sm flex items-center gap-2">
            <Clock size={14} />
            Past Entries
          </h2>
        </div>
        <div className="p-2 space-y-1">
          {entries.length === 0 && (
            <div className="text-xs text-[var(--text-secondary)] p-3 text-center">
              No entries yet
            </div>
          )}
          {entries.map((entry) => (
            <button
              key={entry.id}
              onClick={() => loadEntry(entry.content)}
              className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                entry.date === today
                  ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                  : "hover:bg-[var(--bg-card)] text-[var(--text-secondary)]"
              }`}
            >
              <div className="font-medium">{entry.date}</div>
              <div className="text-xs truncate mt-0.5 opacity-60">
                {entry.content.substring(0, 50)}...
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <BookOpen size={20} className="text-[var(--accent)]" />
              Daily Journal
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">{today}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`p-2 rounded-lg transition-colors ${
                isListening
                  ? "bg-red-500/20 text-red-400"
                  : "bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>
            <button
              onClick={saveEntry}
              disabled={!currentContent.trim() || saving}
              className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium disabled:opacity-40 hover:bg-[var(--accent)]/80 transition-colors flex items-center gap-2"
            >
              {saving ? (
                <>Saving...</>
              ) : saved ? (
                <>
                  <Save size={14} /> Saved!
                </>
              ) : (
                <>
                  <Save size={14} /> Save
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-hidden">
          <textarea
            ref={textareaRef}
            value={currentContent}
            onChange={(e) => setCurrentContent(e.target.value)}
            placeholder="Write about your day, thoughts, ideas, wins, challenges..."
            className="w-full h-full bg-transparent text-[var(--text-primary)] text-sm leading-relaxed resize-none focus:outline-none placeholder-[var(--text-secondary)]"
          />
        </div>

        {isListening && (
          <div className="px-4 py-2 border-t border-[var(--border)] bg-[var(--bg-secondary)] text-xs text-red-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            Voice recording active — your words will appear in the editor
          </div>
        )}
      </div>
    </div>
  );
}
