import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/vault";

const CONFIGS_FILE = "agent-configs.json";

export async function GET() {
  try {
    const configs = await readJSON(CONFIGS_FILE, {});
    return NextResponse.json({ configs });
  } catch {
    return NextResponse.json({ configs: {} });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { configs } = body;
    await writeJSON(CONFIGS_FILE, configs);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to save configs" },
      { status: 500 }
    );
  }
}
