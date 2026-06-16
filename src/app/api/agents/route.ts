import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const VAULT_PATH = process.env.VAULT_PATH || "/data/agentos-vault";
const AGENTS_FILE = path.join(VAULT_PATH, "custom-agents.json");

async function ensureVault() {
  try {
    await fs.mkdir(VAULT_PATH, { recursive: true });
  } catch {}
}

async function readAgents() {
  try {
    const data = await fs.readFile(AGENTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeAgents(agents: any[]) {
  await ensureVault();
  await fs.writeFile(AGENTS_FILE, JSON.stringify(agents, null, 2));
}

export async function GET() {
  const agents = await readAgents();
  return NextResponse.json({ agents });
}

export async function POST(req: NextRequest) {
  const { agents } = await req.json();
  await writeAgents(agents);
  return NextResponse.json({ success: true });
}
