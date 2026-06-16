import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/vault";

const CONFIG_FILE = "memory-system-config.json";

interface MemorySystemConfig {
  vaultPath: string;
  memoryFilePath: string;
  omiEnabled: boolean;
  autoSync: boolean;
  syncInterval: string;
}

const DEFAULT_CONFIG: MemorySystemConfig = {
  vaultPath: "",
  memoryFilePath: "",
  omiEnabled: true,
  autoSync: true,
  syncInterval: "weekly",
};

export async function GET() {
  try {
    const config = await readJSON(CONFIG_FILE, DEFAULT_CONFIG);
    return NextResponse.json(config);
  } catch {
    return NextResponse.json(DEFAULT_CONFIG);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const config: MemorySystemConfig = {
      ...DEFAULT_CONFIG,
      ...body,
    };
    await writeJSON(CONFIG_FILE, config);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to save config" },
      { status: 500 }
    );
  }
}
