import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/vault";

const AUTH_FILE = "auth-config.json";

interface AuthConfig {
  username: string;
  passwordHash: string;
  twoFactorEnabled: boolean;
  twoFactorSecret: string;
  twoFactorBackupCodes: string[];
  twoFactorMethod: "app" | "email" | "sso" | "none";
  twoFactorEmail: string;
  sessionSecret: string;
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "-agent-os-salt");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const computed = await hashPassword(password);
  return computed === hash;
}

function generateTOTPSecret(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes).map(b => chars[b % 32]).join("");
}

function generateBackupCodes(count: number = 10): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const bytes = crypto.getRandomValues(new Uint8Array(4));
    codes.push(Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("").toUpperCase());
  }
  return codes;
}

function generateSessionToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function requireAuth(req: NextRequest): Promise<{ config: AuthConfig } | NextResponse> {
  const sessionToken = req.cookies.get("agent_os_session")?.value;
  const config = await readJSON(AUTH_FILE, null) as AuthConfig | null;
  if (!config || !sessionToken || sessionToken !== config.sessionSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return { config };
}

// GET — check auth status
export async function GET() {
  try {
    const config = await readJSON(AUTH_FILE, null) as AuthConfig | null;
    return NextResponse.json({
      configured: !!config,
      twoFactorEnabled: config?.twoFactorEnabled || false,
      twoFactorMethod: config?.twoFactorMethod || "none",
      username: config?.username || "",
    });
  } catch {
    return NextResponse.json({ configured: false, twoFactorEnabled: false, twoFactorMethod: "none" });
  }
}

// POST — all auth actions
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    // SETUP — initial auth configuration
    if (action === "setup") {
      const { username, password, enable2FA, twoFactorMethod } = body;

      if (!username || !password) {
        return NextResponse.json({ error: "Username and password required" }, { status: 400 });
      }
      if (password.length > 70) {
        return NextResponse.json({ error: "Password must be 70 characters or less" }, { status: 400 });
      }

      const passwordHash = await hashPassword(password);
      const twoFactorSecret = enable2FA && twoFactorMethod === "app" ? generateTOTPSecret() : "";
      const twoFactorBackupCodes = enable2FA && twoFactorMethod === "app" ? generateBackupCodes() : [];
      const sessionSecret = generateSessionToken();

      const config: AuthConfig = {
        username,
        passwordHash,
        twoFactorEnabled: !!enable2FA,
        twoFactorSecret,
        twoFactorBackupCodes,
        twoFactorMethod: enable2FA ? (twoFactorMethod || "app") : "none",
        twoFactorEmail: body.twoFactorEmail || "",
        sessionSecret,
      };

      await writeJSON(AUTH_FILE, config);

      return NextResponse.json({
        success: true,
        message: "Authentication configured successfully",
        twoFactorEnabled: !!enable2FA,
        twoFactorMethod: config.twoFactorMethod,
        twoFactorSecret: twoFactorSecret || null,
        backupCodes: twoFactorBackupCodes,
      });
    }

    // LOGIN
    if (action === "login") {
      const { username, password, totpCode } = body;

      const config = await readJSON(AUTH_FILE, null) as AuthConfig | null;
      if (!config) {
        return NextResponse.json({ error: "Auth not configured" }, { status: 400 });
      }
      if (username !== config.username) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }
      const validPassword = await verifyPassword(password, config.passwordHash);
      if (!validPassword) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }

      if (config.twoFactorEnabled) {
        if (!totpCode) {
          return NextResponse.json({ requires2FA: true, method: config.twoFactorMethod, message: "2FA code required" });
        }
        if (config.twoFactorMethod === "app") {
          const backupIndex = config.twoFactorBackupCodes.indexOf(totpCode.toUpperCase());
          if (backupIndex !== -1) {
            config.twoFactorBackupCodes.splice(backupIndex, 1);
            await writeJSON(AUTH_FILE, config);
          } else if (!/^\d{6}$/.test(totpCode)) {
            return NextResponse.json({ error: "Invalid 2FA code" }, { status: 401 });
          }
        }
      }

      const sessionToken = generateSessionToken();
      config.sessionSecret = sessionToken;
      await writeJSON(AUTH_FILE, config);

      const res = NextResponse.json({ success: true, message: "Login successful", sessionToken });
      res.cookies.set("agent_os_session", sessionToken, {
        httpOnly: true, secure: true, sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, path: "/",
      });
      return res;
    }

    // LOGOUT
    if (action === "logout") {
      const res = NextResponse.json({ success: true, message: "Logged out" });
      res.cookies.delete("agent_os_session");
      return res;
    }

    // VERIFY SESSION
    if (action === "verify") {
      const result = await requireAuth(req);
      if (result instanceof NextResponse) return result;
      return NextResponse.json({ valid: true, username: result.config.username });
    }

    // CHANGE PASSWORD — requires current password
    if (action === "changePassword") {
      const result = await requireAuth(req);
      if (result instanceof NextResponse) return result;
      const { currentPassword, newPassword } = body;

      if (!newPassword || newPassword.length > 70) {
        return NextResponse.json({ error: "New password must be 1-70 characters" }, { status: 400 });
      }
      if (!await verifyPassword(currentPassword, result.config.passwordHash)) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
      }

      result.config.passwordHash = await hashPassword(newPassword);
      result.config.sessionSecret = generateSessionToken();
      await writeJSON(AUTH_FILE, result.config);

      const res = NextResponse.json({ success: true, message: "Password changed successfully" });
      res.cookies.set("agent_os_session", result.config.sessionSecret, {
        httpOnly: true, secure: true, sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, path: "/",
      });
      return res;
    }

    // CHANGE USERNAME — requires password
    if (action === "changeUsername") {
      const result = await requireAuth(req);
      if (result instanceof NextResponse) return result;
      const { password, newUsername } = body;

      if (!newUsername || newUsername.length < 2) {
        return NextResponse.json({ error: "Username must be at least 2 characters" }, { status: 400 });
      }
      if (!await verifyPassword(password, result.config.passwordHash)) {
        return NextResponse.json({ error: "Password is incorrect" }, { status: 401 });
      }

      result.config.username = newUsername;
      await writeJSON(AUTH_FILE, result.config);
      return NextResponse.json({ success: true, message: "Username changed successfully" });
    }

    // CONFIGURE 2FA — enable/disable/change method
    if (action === "configure2FA") {
      const result = await requireAuth(req);
      if (result instanceof NextResponse) return result;
      const { password, enable, method, email } = body;

      if (!await verifyPassword(password, result.config.passwordHash)) {
        return NextResponse.json({ error: "Password is incorrect" }, { status: 401 });
      }

      if (enable) {
        result.config.twoFactorEnabled = true;
        result.config.twoFactorMethod = method || "app";
        if (method === "app" && !result.config.twoFactorSecret) {
          result.config.twoFactorSecret = generateTOTPSecret();
          result.config.twoFactorBackupCodes = generateBackupCodes();
        }
        if (method === "email") {
          result.config.twoFactorEmail = email || "";
        }
      } else {
        result.config.twoFactorEnabled = false;
        result.config.twoFactorMethod = "none";
        result.config.twoFactorSecret = "";
        result.config.twoFactorBackupCodes = [];
      }

      await writeJSON(AUTH_FILE, result.config);

      return NextResponse.json({
        success: true,
        message: enable ? "2FA enabled successfully" : "2FA disabled",
        twoFactorSecret: result.config.twoFactorSecret || null,
        backupCodes: result.config.twoFactorBackupCodes,
        method: result.config.twoFactorMethod,
      });
    }

    // REGENERATE BACKUP CODES
    if (action === "regenerateBackupCodes") {
      const result = await requireAuth(req);
      if (result instanceof NextResponse) return result;
      const { password } = body;

      if (!await verifyPassword(password, result.config.passwordHash)) {
        return NextResponse.json({ error: "Password is incorrect" }, { status: 401 });
      }

      result.config.twoFactorBackupCodes = generateBackupCodes();
      await writeJSON(AUTH_FILE, result.config);

      return NextResponse.json({
        success: true,
        message: "New backup codes generated",
        backupCodes: result.config.twoFactorBackupCodes,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
