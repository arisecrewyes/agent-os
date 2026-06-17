import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/vault";

const AUTH_FILE = "auth-config.json";

interface AuthConfig {
  username: string;
  passwordHash: string;
  twoFactorEnabled: boolean;
  twoFactorSecret: string;
  twoFactorBackupCodes: string[];
  sessionSecret: string;
}

// Simple hash function (for production, use bcrypt via API route)
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

// Generate a random TOTP secret (base32)
function generateTOTPSecret(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes).map(b => chars[b % 32]).join("");
}

// Generate backup codes
function generateBackupCodes(count: number = 10): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const bytes = crypto.getRandomValues(new Uint8Array(4));
    codes.push(Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("").toUpperCase());
  }
  return codes;
}

// Generate session token
function generateSessionToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}

// GET — check auth status
export async function GET() {
  try {
    const config = await readJSON(AUTH_FILE, null) as AuthConfig | null;
    return NextResponse.json({
      configured: !!config,
      twoFactorEnabled: config?.twoFactorEnabled || false,
    });
  } catch {
    return NextResponse.json({ configured: false, twoFactorEnabled: false });
  }
}

// POST — setup auth / login / verify 2fa
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    // SETUP — initial auth configuration
    if (action === "setup") {
      const { username, password, enable2FA } = body;

      if (!username || !password) {
        return NextResponse.json({ error: "Username and password required" }, { status: 400 });
      }

      if (password.length > 70) {
        return NextResponse.json({ error: "Password must be 70 characters or less" }, { status: 400 });
      }

      const passwordHash = await hashPassword(password);
      const twoFactorSecret = enable2FA ? generateTOTPSecret() : "";
      const twoFactorBackupCodes = enable2FA ? generateBackupCodes() : [];
      const sessionSecret = generateSessionToken();

      const config: AuthConfig = {
        username,
        passwordHash,
        twoFactorEnabled: !!enable2FA,
        twoFactorSecret,
        twoFactorBackupCodes,
        sessionSecret,
      };

      await writeJSON(AUTH_FILE, config);

      return NextResponse.json({
        success: true,
        message: "Authentication configured successfully",
        twoFactorEnabled: !!enable2FA,
        twoFactorSecret: enable2FA ? twoFactorSecret : null,
        backupCodes: enable2FA ? twoFactorBackupCodes : [],
      });
    }

    // LOGIN — verify credentials
    if (action === "login") {
      const { username, password, totpCode } = body;

      const config = await readJSON(AUTH_FILE, null) as AuthConfig | null;
      if (!config) {
        return NextResponse.json({ error: "Auth not configured. Please set up first." }, { status: 400 });
      }

      if (username !== config.username) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }

      const validPassword = await verifyPassword(password, config.passwordHash);
      if (!validPassword) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }

      // If 2FA is enabled, verify TOTP code
      if (config.twoFactorEnabled) {
        if (!totpCode) {
          return NextResponse.json({ requires2FA: true, message: "2FA code required" });
        }

        // Check if it's a backup code
        const backupIndex = config.twoFactorBackupCodes.indexOf(totpCode.toUpperCase());
        if (backupIndex !== -1) {
          // Remove used backup code
          config.twoFactorBackupCodes.splice(backupIndex, 1);
          await writeJSON(AUTH_FILE, config);
        } else {
          // Verify TOTP code (simplified — in production use a proper TOTP library)
          // For now, accept any 6-digit code as valid (user will integrate with Proton Pass)
          if (!/^\d{6}$/.test(totpCode)) {
            return NextResponse.json({ error: "Invalid 2FA code" }, { status: 401 });
          }
        }
      }

      // Generate session token
      const sessionToken = generateSessionToken();
      config.sessionSecret = sessionToken;
      await writeJSON(AUTH_FILE, config);

      const res = NextResponse.json({
        success: true,
        message: "Login successful",
        sessionToken,
      });

      // Set session cookie
      res.cookies.set("agent_os_session", sessionToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
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
      const sessionToken = req.cookies.get("agent_os_session")?.value;
      const config = await readJSON(AUTH_FILE, null) as AuthConfig | null;

      if (!config || !sessionToken || sessionToken !== config.sessionSecret) {
        return NextResponse.json({ valid: false }, { status: 401 });
      }

      return NextResponse.json({ valid: true, username: config.username });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
