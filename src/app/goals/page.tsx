"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, Trash2, Target } from "lucide-react";

interface Goal {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await fetch("/api/goals");
      const data = await res.json();
      setGoals(data.goals || []);
    } catch {
      setGoals([]);
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async () => {
    if (!newGoal.trim()) return;
    const goal: Goal = {
      id: Date.now().toString(),
      text: newGoal.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    const updated = [...goals, goal];
    setGoals(updated);
    setNewGoal("");
    await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goals: updated }),
    });
  };

  const toggleGoal = async (id: string) => {
    const updated = goals.map((g) =>
      g.id === id ? { ...g, completed: !g.completed } : g
    );
    setGoals(updated);
    await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goals: updated }),
    });
  };

  const deleteGoal = async (id: string) => {
    const updated = goals.filter((g) => g.id !== id);
    setGoals(updated);
    await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goals: updated }),
    });
  };

  const completedCount = goals.filter((g) => g.completed).length;
  const progress = goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0;

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-[var(--text-secondary)]">Loading goals...</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Target className="text-[var(--accent)]" size={28} />
            Goals
          </h1>
          <p className="text-[var(--text-secondary)]">Track your objectives. Synced to your vault.</p>
        </div>

        {/* Progress */}
        {goals.length > 0 && (
          <div className="glow-border rounded-xl p-4 bg-[var(--bg-card)] mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[var(--text-secondary)]">Progress</span>
              <span className="font-semibold">{completedCount}/{goals.length} completed</span>
            </div>
            <div className="h-2 bg-[var(--bg-primary)] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-right text-xs text-[var(--text-secondary)] mt-1">{progress}%</div>
          </div>
        )}

        {/* Add Goal */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addGoal()}
            placeholder="Add a new goal..."
            className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
          <button
            onClick={addGoal}
            disabled={!newGoal.trim()}
            className="px-4 py-3 rounded-xl bg-[var(--accent)] text-white disabled:opacity-40 hover:bg-[var(--accent)]/80 transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Goals List */}
        <div className="space-y-2">
          <AnimatePresence>
            {goals.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-[var(--text-secondary)]"
              >
                <Target size={40} className="mx-auto mb-3 opacity-30" />
                <p>No goals yet. Add your first one above.</p>
              </motion.div>
            )}
            {goals.map((goal) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`glow-border rounded-xl p-4 bg-[var(--bg-card)] flex items-center gap-3 group ${
                  goal.completed ? "opacity-60" : ""
                }`}
              >
                <button
                  onClick={() => toggleGoal(goal.id)}
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-colors ${
                    goal.completed
                      ? "bg-[var(--green)] border-[var(--green)]"
                      : "border-[var(--border)] hover:border-[var(--accent)]"
                  }`}
                >
                  {goal.completed && <Check size={14} className="text-white" />}
                </button>
                <span className={`flex-1 text-sm ${goal.completed ? "line-through" : ""}`}>
                  {goal.text}
                </span>
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 text-[var(--text-secondary)] hover:text-red-400 transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
