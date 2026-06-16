import fs from "fs/promises";
import path from "path";

export const VAULT_PATH = process.env.VAULT_PATH || "/data/agentos-vault";

// Folder structure inside vault
export const VAULT_DIRS = {
  root: "",
  chats: "Chats",
  goals: "Goals",
  journal: "Journal",
  memories: "Memories",
  agents: "Agents",
} as const;

async function ensureDir(dirPath: string) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch {}
}

export async function ensureVault() {
  await ensureDir(VAULT_PATH);
  for (const dir of Object.values(VAULT_DIRS)) {
    if (dir) await ensureDir(path.join(VAULT_PATH, dir));
  }
}

// ─── Generic JSON read/write ───────────────────────────────────────────────

export async function readJSON(file: string, fallback: any = []) {
  try {
    const data = await fs.readFile(path.join(VAULT_PATH, file), "utf-8");
    return JSON.parse(data);
  } catch {
    return fallback;
  }
}

export async function writeJSON(file: string, data: any) {
  await ensureVault();
  await fs.writeFile(path.join(VAULT_PATH, file), JSON.stringify(data, null, 2));
}

// ─── Markdown file operations ──────────────────────────────────────────────

export async function readMarkdown(filePath: string): Promise<string | null> {
  try {
    return await fs.readFile(path.join(VAULT_PATH, filePath), "utf-8");
  } catch {
    return null;
  }
}

export async function writeMarkdown(filePath: string, content: string) {
  await ensureDir(path.dirname(path.join(VAULT_PATH, filePath)));
  await fs.writeFile(path.join(VAULT_PATH, filePath), content);
}

export async function appendMarkdown(filePath: string, content: string) {
  await ensureDir(path.dirname(path.join(VAULT_PATH, filePath)));
  try {
    const existing = await fs.readFile(path.join(VAULT_PATH, filePath), "utf-8");
    await fs.writeFile(path.join(VAULT_PATH, filePath), existing + content);
  } catch {
    await fs.writeFile(path.join(VAULT_PATH, filePath), content);
  }
}

// ─── Daily note management ─────────────────────────────────────────────────

export function getDailyNotePath(date?: Date): string {
  const d = date || new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return path.join(VAULT_DIRS.memories, `${yyyy}-${mm}-${dd}.md`);
}

export function getDailyNoteDate(filePath: string): string | null {
  const match = path.basename(filePath).match(/^(\d{4}-\d{2}-\d{2})\.md$/);
  return match ? match[1] : null;
}

export async function readDailyNote(date?: Date): Promise<string> {
  const notePath = getDailyNotePath(date);
  const content = await readMarkdown(notePath);
  if (content) return content;

  // Create template for new daily note
  const d = date || new Date();
  const dateStr = d.toISOString().split("T")[0];
  return `# ${dateStr}\n\n## Notes\n\n## Memories\n\n## Tasks\n\n`;
}

export async function writeDailyNote(content: string, date?: Date) {
  const notePath = getDailyNotePath(date);
  await writeMarkdown(notePath, content);
}

// ─── Chat logging ──────────────────────────────────────────────────────────

export function getChatLogPath(agentId: string, date?: Date): string {
  const d = date || new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return path.join(VAULT_DIRS.chats, agentId, `${yyyy}-${mm}-${dd}.md`);
}

export async function saveChatLog(
  agentId: string,
  agentName: string,
  messages: Array<{ role: "user" | "assistant"; content: string; timestamp: number }>
) {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const filePath = path.join(VAULT_DIRS.chats, agentId, `${yyyy}-${mm}-${dd}.md`);

  let content = `# Chat Log — ${agentName} — ${yyyy}-${mm}-${dd}\n\n`;
  content += `Agent: ${agentName} | ID: ${agentId}\n`;
  content += `Date: ${date.toISOString()}\n\n---\n\n`;

  for (const msg of messages) {
    const time = new Date(msg.timestamp).toLocaleTimeString();
    if (msg.role === "user") {
      content += `## [${time}] User\n\n${msg.content}\n\n---\n\n`;
    } else {
      content += `## [${time}] ${agentName}\n\n${msg.content}\n\n---\n\n`;
    }
  }

  await writeMarkdown(filePath, content);
  return filePath;
}

// ─── Vault file listing ────────────────────────────────────────────────────

export interface VaultFile {
  name: string;
  path: string;
  isDir: boolean;
  size: number;
  mtime: number;
}

export async function listVaultFiles(dir: string = ""): Promise<VaultFile[]> {
  const fullPath = path.join(VAULT_PATH, dir);
  try {
    const entries = await fs.readdir(fullPath, { withFileTypes: true });
    const files: VaultFile[] = [];
    for (const entry of entries) {
      const entryPath = path.join(dir, entry.name);
      const stats = await fs.stat(path.join(VAULT_PATH, entryPath));
      files.push({
        name: entry.name,
        path: entryPath,
        isDir: entry.isDirectory(),
        size: stats.size,
        mtime: stats.mtimeMs,
      });
    }
    // Dirs first, then files, alphabetical
    files.sort((a, b) => {
      if (a.isDir && !b.isDir) return -1;
      if (!a.isDir && b.isDir) return 1;
      return a.name.localeCompare(b.name);
    });
    return files;
  } catch {
    return [];
  }
}

// ─── Vault search ──────────────────────────────────────────────────────────

export async function searchVault(query: string): Promise<Array<{ file: string; line: string; context: string }>> {
  const results: Array<{ file: string; line: string; context: string }> = [];
  const lowerQuery = query.toLowerCase();

  async function searchDir(dir: string) {
    const fullPath = path.join(VAULT_PATH, dir);
    try {
      const entries = await fs.readdir(fullPath, { withFileTypes: true });
      for (const entry of entries) {
        const entryPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          await searchDir(entryPath);
        } else if (entry.name.endsWith(".md") || entry.name.endsWith(".json")) {
          try {
            const content = await fs.readFile(path.join(VAULT_PATH, entryPath), "utf-8");
            const lines = content.split("\n");
            for (const line of lines) {
              if (line.toLowerCase().includes(lowerQuery)) {
                results.push({
                  file: entryPath,
                  line: line.trim().substring(0, 100),
                  context: entry.name,
                });
                if (results.length >= 50) return; // Limit results
              }
            }
          } catch {}
        }
      }
    } catch {}
  }

  await searchDir("");
  return results;
}

// ─── Agent context (memory injection) ──────────────────────────────────────

export async function getAgentContext(agentId: string): Promise<string> {
  const parts: string[] = [];

  // 1. Read agent's recent chat history (last 7 days)
  const chatDir = path.join(VAULT_DIRS.chats, agentId);
  try {
    const chatFiles = await fs.readdir(path.join(VAULT_PATH, chatDir));
    const recentFiles = chatFiles
      .filter((f) => f.endsWith(".md"))
      .sort()
      .reverse()
      .slice(0, 3); // Last 3 days

    if (recentFiles.length > 0) {
      parts.push("## Recent Conversation History\n");
      for (const file of recentFiles) {
        const content = await fs.readFile(path.join(VAULT_PATH, chatDir, file), "utf-8");
        parts.push(content);
      }
    }
  } catch {}

  // 2. Read today's daily note
  try {
    const todayNote = await readDailyNote();
    if (todayNote && todayNote.trim().length > 50) {
      parts.push("\n## Today's Daily Note\n");
      parts.push(todayNote);
    }
  } catch {}

  // 3. Read goals
  try {
    const goals = await readJSON("goals.json", []);
    if (goals.length > 0) {
      parts.push("\n## Active Goals\n");
      for (const g of goals.slice(0, 10)) {
        parts.push(`- [${g.completed ? "x" : " "}] ${g.text}`);
      }
    }
  } catch {}

  return parts.join("\n");
}
