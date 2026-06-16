"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard, Target, BookOpen, Settings, Search,
  FolderOpen, FileText, ChevronRight, ChevronDown, PenLine,
  Save, X, ArrowLeft, Brain, Clock, Sparkles, Plus, Trash2
} from "lucide-react";

interface VaultFile {
  name: string;
  path: string;
  isDir: boolean;
  size: number;
  mtime: number;
}

interface SearchResult {
  file: string;
  line: string;
  context: string;
}

function PageNav() {
  const items = [
    { label: "Mission Control", icon: <LayoutDashboard size={14} />, href: "/" },
    { label: "Goals", icon: <Target size={14} />, href: "/goals" },
    { label: "Journal", icon: <BookOpen size={14} />, href: "/journal" },
    { label: "Memory Engine", icon: <Brain size={14} />, href: "/memory-system" },
    { label: "Settings", icon: <Settings size={14} />, href: "/settings" },
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

export default function MemoryPage() {
  const [files, setFiles] = useState<VaultFile[]>([]);
  const [currentDir, setCurrentDir] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState("");
  const [editContent, setEditContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set());
  const [todayNote, setTodayNote] = useState("");
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadFiles = useCallback(async (dir: string = "") => {
    try {
      const res = await fetch(`/api/vault/files?dir=${encodeURIComponent(dir)}`);
      const data = await res.json();
      setFiles(data.files || []);
      setCurrentDir(dir);
    } catch {
      setFiles([]);
    }
  }, []);

  const loadFile = useCallback(async (filePath: string) => {
    try {
      const res = await fetch(`/api/vault/file?path=${encodeURIComponent(filePath)}`);
      const data = await res.json();
      setFileContent(data.content || "");
      setEditContent(data.content || "");
      setSelectedFile(filePath);
      setIsEditing(false);
    } catch {
      setFileContent("Error loading file.");
    }
  }, []);

  const loadTodayNote = useCallback(async () => {
    try {
      const res = await fetch("/api/vault/daily-note");
      const data = await res.json();
      setTodayNote(data.content || "");
    } catch {}
  }, []);

  useEffect(() => {
    loadFiles();
    loadTodayNote();
  }, [loadFiles, loadTodayNote]);

  const handleNavigate = (file: VaultFile) => {
    if (file.isDir) {
      const newDir = currentDir ? `${currentDir}/${file.name}` : file.name;
      setCurrentDir(newDir);
      setSelectedFile(null);
      setFileContent("");
      loadFiles(newDir);
    } else {
      loadFile(file.path);
    }
  };

  const handleGoUp = () => {
    if (!currentDir) return;
    const parts = currentDir.split("/");
    parts.pop();
    const parentDir = parts.join("/");
    setCurrentDir(parentDir);
    setSelectedFile(null);
    setFileContent("");
    loadFiles(parentDir);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const res = await fetch(`/api/vault/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch {
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSaveFile = async () => {
    if (!selectedFile) return;
    setSaving(true);
    try {
      await fetch("/api/vault/file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: selectedFile, content: editContent }),
      });
      setFileContent(editContent);
      setIsEditing(false);
    } catch {}
    setSaving(false);
  };

  const handleSaveTodayNote = async () => {
    setSaving(true);
    try {
      await fetch("/api/vault/daily-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: todayNote }),
      });
      setIsEditingNote(false);
    } catch {}
    setSaving(false);
  };

  const handleCreateNote = async () => {
    const name = prompt("Note name (without .md):");
    if (!name) return;
    const fileName = name.endsWith(".md") ? name : `${name}.md}`;
    const filePath = currentDir ? `${currentDir}/${fileName}` : fileName;
    const content = `# ${name.replace(".md", "")}\n\n`;
    try {
      await fetch("/api/vault/file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: filePath, content }),
      });
      loadFiles(currentDir);
    } catch {}
  };

  const handleDeleteFile = async (filePath: string) => {
    if (!confirm(`Delete ${filePath}?`)) return;
    try {
      await fetch(`/api/vault/file?path=${encodeURIComponent(filePath)}`, {
        method: "DELETE",
      });
      if (selectedFile === filePath) {
        setSelectedFile(null);
        setFileContent("");
      }
      loadFiles(currentDir);
    } catch {}
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
  };

  const formatDate = (mtime: number) => {
    return new Date(mtime).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="h-full flex overflow-hidden">
      {/* Left: File Tree */}
      <div className="w-72 border-r border-[var(--border)] bg-[var(--bg-secondary)] flex flex-col shrink-0">
        <div className="p-4 border-b border-[var(--border)]">
          <h2 className="font-bold flex items-center gap-2 mb-3">
            <Brain size={18} className="text-[var(--accent)]" />
            Vault
          </h2>
          {/* Search */}
          <div className="flex gap-1.5">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search vault..."
              className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="p-1.5 rounded-lg bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            >
              <Search size={14} />
            </button>
          </div>
        </div>

        {/* Search results */}
        {searchResults.length > 0 && (
          <div className="p-2 border-b border-[var(--border)]">
            <div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider px-2 py-1">
              {searchResults.length} results
            </div>
            <div className="space-y-0.5 max-h-48 overflow-y-auto">
              {searchResults.map((r, i) => (
                <button
                  key={i}
                  onClick={() => loadFile(r.file)}
                  className="w-full text-left p-2 rounded-lg hover:bg-[var(--bg-card)] transition-colors"
                >
                  <div className="text-xs font-medium text-[var(--accent)] truncate">{r.context}</div>
                  <div className="text-[10px] text-[var(--text-secondary)] truncate">{r.line}</div>
                </button>
              ))}
            </div>
            <button
              onClick={() => { setSearchResults([]); setSearchQuery(""); }}
              className="w-full text-center text-[10px] text-[var(--text-secondary)] py-1 hover:text-[var(--text-primary)]"
            >
              Clear results
            </button>
          </div>
        )}

        {/* File tree */}
        <div className="flex-1 overflow-y-auto p-2">
          {currentDir && (
            <button
              onClick={handleGoUp}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] transition-colors mb-1"
            >
              <ArrowLeft size={12} /> ..
            </button>
          )}

          {files.length === 0 && (
            <div className="text-center py-8 text-[var(--text-secondary)] text-xs">
              <FolderOpen size={24} className="mx-auto mb-2 opacity-30" />
              <p>No files yet</p>
            </div>
          )}

          {files.map((file) => (
            <div key={file.path} className="group/file">
              <button
                onClick={() => handleNavigate(file)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors ${
                  selectedFile === file.path
                    ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
                }`}
              >
                {file.isDir ? (
                  <FolderOpen size={14} className="shrink-0 text-[var(--yellow)]" />
                ) : (
                  <FileText size={14} className="shrink-0 text-[var(--text-secondary)]" />
                )}
                <span className="flex-1 text-left truncate">{file.name}</span>
                {!file.isDir && (
                  <span className="text-[9px] text-[var(--text-secondary)]/50">{formatSize(file.size)}</span>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="p-2 border-t border-[var(--border)]">
          <button
            onClick={handleCreateNote}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--accent)] transition-colors"
          >
            <Plus size={12} /> New Note
          </button>
        </div>
      </div>

      {/* Right: Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Today's Note (always visible at top) */}
        <div className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/50">
          <div className="px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <Clock size={12} />
              <span>Today&apos;s Note — {new Date().toISOString().split("T")[0]}</span>
            </div>
            <div className="flex items-center gap-1">
              {isEditingNote ? (
                <>
                  <button
                    onClick={handleSaveTodayNote}
                    disabled={saving}
                    className="flex items-center gap-1 px-2 py-1 rounded text-[10px] bg-[var(--accent)] text-white hover:bg-[var(--accent)]/80 transition-colors"
                  >
                    <Save size={10} /> {saving ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => setIsEditingNote(false)}
                    className="p-1 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <X size={12} />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditingNote(true)}
                  className="flex items-center gap-1 px-2 py-1 rounded text-[10px] text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--accent)] transition-colors"
                >
                  <PenLine size={10} /> Edit
                </button>
              )}
            </div>
          </div>
          {isEditingNote ? (
            <textarea
              value={todayNote}
              onChange={(e) => setTodayNote(e.target.value)}
              rows={4}
              className="w-full bg-transparent px-4 py-2 text-sm focus:outline-none resize-none border-none"
              placeholder="Write about your day, thoughts, ideas..."
            />
          ) : (
            <div
              className="px-4 py-2 text-sm text-[var(--text-secondary)] cursor-pointer hover:text-[var(--text-primary)] transition-colors min-h-[60px] max-h-[120px] overflow-y-auto"
              onClick={() => setIsEditingNote(true)}
            >
              {todayNote ? (
                <pre className="whitespace-pre-wrap font-sans text-xs">{todayNote.substring(0, 500)}{todayNote.length > 500 ? "..." : ""}</pre>
              ) : (
                <span className="text-xs opacity-50">Click to add today&apos;s note...</span>
              )}
            </div>
          )}
        </div>

        {/* File content */}
        <div className="flex-1 overflow-y-auto">
          {selectedFile ? (
            <div className="h-full flex flex-col">
              <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-[var(--accent)]" />
                  <span className="text-sm font-medium">{selectedFile}</span>
                </div>
                <div className="flex items-center gap-1">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSaveFile}
                        disabled={saving}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-[var(--accent)] text-white hover:bg-[var(--accent)]/80 transition-colors"
                      >
                        <Save size={12} /> {saving ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={() => { setIsEditing(false); setEditContent(fileContent); }}
                        className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--accent)] transition-colors"
                      >
                        <PenLine size={12} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteFile(selectedFile)}
                        className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-red-400 transition-colors"
                        title="Delete file"
                      >
                        <Trash2 size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
              {isEditing ? (
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="flex-1 w-full bg-transparent px-4 py-3 text-sm focus:outline-none resize-none font-mono"
                  placeholder="Start writing..."
                />
              ) : (
                <div className="px-4 py-3">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{fileContent}</pre>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-[var(--text-secondary)]">
              <div className="text-center">
                <Brain size={40} className="mx-auto mb-3 opacity-20" />
                <p className="text-sm mb-1">Select a file to view</p>
                <p className="text-xs opacity-60">Or search across your vault</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
