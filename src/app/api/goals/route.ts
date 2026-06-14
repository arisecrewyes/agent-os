import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const VAULT_PATH = process.env.VAULT_PATH || "/data/agentos-vault";
const GOALS_FILE = path.join(VAULT_PATH, "goals.json");

async function ensureVault() {
  try {
    await fs.mkdir(VAULT_PATH, { recursive: true });
  } catch {}
}

async function readGoals(): Promise<any[]> {
  try {
    const data = await fs.readFile(GOALS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeGoals(goals: any[]) {
  await ensureVault();
  await fs.writeFile(GOALS_FILE, JSON.stringify(goals, null, 2));
}

export async function GET() {
  const goals = await readGoals();
  return NextResponse.json({ goals });
}

export async function POST(req: NextRequest) {
  const { goals } = await req.json();
  await writeGoals(goals);
  return NextResponse.json({ success: true });
}
