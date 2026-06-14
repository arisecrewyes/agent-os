import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const VAULT_PATH = process.env.VAULT_PATH || "/data/agentos-vault";
const JOURNAL_DIR = path.join(VAULT_PATH, "journal");

async function ensureDir(p: string) {
  try {
    await fs.mkdir(p, { recursive: true });
  } catch {}
}

async function readJournalIndex(): Promise<any[]> {
  try {
    const data = await fs.readFile(path.join(JOURNAL_DIR, "index.json"), "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeJournalIndex(entries: any[]) {
  await ensureDir(JOURNAL_DIR);
  await fs.writeFile(path.join(JOURNAL_DIR, "index.json"), JSON.stringify(entries, null, 2));
}

export async function GET() {
  const entries = await readJournalIndex();
  return NextResponse.json({ entries });
}

export async function POST(req: NextRequest) {
  const { entries } = await req.json();

  // Save each entry as a markdown file
  await ensureDir(JOURNAL_DIR);
  for (const entry of entries) {
    const filename = `${entry.date}.md`;
    const content = `# ${entry.date}\n\n${entry.content}\n`;
    await fs.writeFile(path.join(JOURNAL_DIR, filename), content);
  }

  await writeJournalIndex(entries);
  return NextResponse.json({ success: true });
}
