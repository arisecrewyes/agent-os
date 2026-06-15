import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const VAULT_PATH = process.env.VAULT_PATH || "/data/agentos-vault";
const SETTINGS_FILE = path.join(VAULT_PATH, "settings.json");

async function ensureVault() {
  try {
    await fs.mkdir(VAULT_PATH, { recursive: true });
  } catch {}
}

async function readSettings() {
  try {
    const data = await fs.readFile(SETTINGS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function writeSettings(settings: any) {
  await ensureVault();
  await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2));
}

export async function GET() {
  const settings = await readSettings();
  return NextResponse.json({
    vaultPath: process.env.VAULT_PATH || "/data/agentos-vault",
    appUrl: process.env.NEXT_PUBLIC_APP_URL || "",
    openrouterKey: process.env.OPENROUTER_API_KEY ? "••••••••" : "",
    ...settings,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await writeSettings(body);
  return NextResponse.json({ success: true });
}
