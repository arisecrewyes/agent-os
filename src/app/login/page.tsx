"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Key, User, Shield, Eye, EyeOff, AlertCircle, Check } from "lucide-react";

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [isSetup, setIsSetup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [requires2FA, setRequires2FA] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [twoFactorSecret, setTwoFactorSecret] = useState("");
  const [enable2FA, setEnable2FA] = useState(true);

  useEffect(() => {
    // Check if auth is already configured
    fetch("/api/auth", { method: "GET" })
      .then(res => res.json())
      .then(data => {
        if (data.configured) {
          setIsSetup(true);
        }
      })
      .catch(() => {});
  }, []);

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "setup", username, password, enable2FA }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Setup failed");
        return;
      }

      setSetupComplete(true);
      if (data.backupCodes) setBackupCodes(data.backupCodes);
      if (data.twoFactorSecret) setTwoFactorSecret(data.twoFactorSecret);
    } catch {
      setError("Connection error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", username, password, totpCode }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.requires2FA) {
          setRequires2FA(true);
          setLoading(false);
          return;
        }
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      router.push(redirect);
    } catch {
      setError("Connection error");
    } finally {
      setLoading(false);
    }
  };

  // Setup complete screen
  if (setupComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glow-border rounded-2xl bg-[var(--bg-card)] p-8 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">✅</div>
            <h1 className="text-2xl font-bold mb-2">Setup Complete!</h1>
            <p className="text-sm text-[var(--text-secondary)]">Your Agent OS dashboard is now secured.</p>
          </div>

          {twoFactorSecret && (
            <div className="mb-4 p-4 rounded-lg bg-[var(--yellow)]/5 border border-[var(--yellow)]/20">
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Shield size={14} className="text-[var(--yellow)]" />
                Two-Factor Authentication
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mb-2">
                Scan this secret in your authenticator app (Proton Pass):
              </p>
              <code className="block bg-[var(--bg-primary)] rounded-lg p-2 text-xs font-mono break-all">
                {twoFactorSecret}
              </code>
            </div>
          )}

          {backupCodes.length > 0 && (
            <div className="mb-4 p-4 rounded-lg bg-[var(--red)]/5 border border-[var(--red)]/20">
              <h3 className="font-semibold text-sm mb-2 text-red-400">Backup Codes — Save These!</h3>
              <p className="text-xs text-[var(--text-secondary)] mb-2">
                Use these if you lose access to your authenticator. Each code works once.
              </p>
              <div className="grid grid-cols-2 gap-1">
                {backupCodes.map((code, i) => (
                  <code key={i} className="bg-[var(--bg-primary)] rounded px-2 py-1 text-xs font-mono">
                    {code}
                  </code>
                ))}
              </div>
            </div>
          )}

          <button onClick={() => router.push("/")}
            className="w-full py-3 rounded-xl bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent)]/80 transition-colors">
            Go to Dashboard →
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glow-border rounded-2xl bg-[var(--bg-card)] p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">🔐</div>
          <h1 className="text-2xl font-bold mb-2">
            {isSetup ? "Sign In" : "Secure Your Dashboard"}
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            {isSetup ? "Enter your credentials to access Agent OS" : "Set up username, password, and 2FA to protect your dashboard"}
          </p>
        </div>

        <form onSubmit={isSetup ? handleLogin : handleSetup} className="space-y-4">
          <div>
            <label className="text-sm text-[var(--text-secondary)] block mb-1">Username</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
              <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                placeholder="Enter username" required
                className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors" />
            </div>
          </div>

          <div>
            <label className="text-sm text-[var(--text-secondary)] block mb-1">Password (max 70 characters)</label>
            <div className="relative">
              <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
              <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Enter password" required maxLength={70}
                className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {requires2FA && (
            <div>
              <label className="text-sm text-[var(--text-secondary)] block mb-1">2FA Code</label>
              <div className="relative">
                <Shield size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
                <input type="text" value={totpCode} onChange={e => setTotpCode(e.target.value)}
                  placeholder="Enter 6-digit code from Proton Pass" maxLength={6}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors" />
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Open Proton Pass → find your Agent OS entry → enter the 6-digit code
              </p>
            </div>
          )}

          {!isSetup && (
            <div className="flex items-center gap-2">
              <input type="checkbox" id="enable2fa" checked={enable2FA} onChange={e => setEnable2FA(e.target.checked)}
                className="rounded border-[var(--border)] bg-[var(--bg-primary)]" />
              <label htmlFor="enable2fa" className="text-sm text-[var(--text-secondary)]">
                Enable 2FA (Proton Pass recommended)
              </label>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertCircle size={14} className="text-red-400 shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-xl bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent)]/80 transition-colors disabled:opacity-50">
            {loading ? "Please wait..." : isSetup ? "Sign In" : "Set Up & Continue"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}


export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="text-[var(--text-secondary)]">Loading...</div>
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}
