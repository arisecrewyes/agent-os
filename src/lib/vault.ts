import fs from "fs/promises";
import path from "path";

export const VAULT_PATH = process.env.VAULT_PATH || "/data/agentos-vault";

export async function ensureVault() {
  await fs.mkdir(VAULT_PATH, { recursive: true });
}

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

export async function appendMarkdown(dir: string, filename: string, content: string) {
  const dirPath = path.join(VAULT_PATH, dir);
  await fs.mkdir(dirPath, { recursive: true });
  await fs.writeFile(path.join(dirPath, filename), content);
}
