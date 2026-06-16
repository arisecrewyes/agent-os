import { NextRequest, NextResponse } from "next/server";
import { VAULT_PATH, getAgentContext, saveChatLog, readJSON } from "@/lib/vault";

async function getAgentName(agentId: string): Promise<string> {
  const builtIn: Record<string, string> = {
    "agent-creator": "Agent Creator",
    openclaw: "OpenClaw",
    hermes: "Hermes",
    claude: "Claude",
  };
  if (builtIn[agentId]) return builtIn[agentId];

  // Look up custom agent name from vault
  try {
    const agents = await readJSON("custom-agents.json", []);
    const agent = agents.find((a: any) => a.id === agentId);
    return agent?.name || agentId;
  } catch {
    return agentId;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { message, agentId, history } = await req.json();

    const builtInNames: Record<string, string> = {
      "agent-creator": "Agent Creator",
      openclaw: "OpenClaw",
      hermes: "Hermes",
      claude: "Claude",
    };
    let agentName = builtInNames[agentId] || agentId;
    if (!builtInNames[agentId]) {
      try {
        const agents = await readJSON("custom-agents.json", []);
        const agent = agents.find((a: any) => a.id === agentId);
        if (agent?.name) agentName = agent.name;
      } catch {}
    }

    // Get vault context for memory injection
    let vaultContext = "";
    try {
      vaultContext = await getAgentContext(agentId);
    } catch {}

    const contextSection = vaultContext
      ? `\n\n--- VAULT CONTEXT (use this to personalize your response) ---\n${vaultContext}\n--- END VAULT CONTEXT ---`
      : "";

    const systemPrompt = `You are ${agentName}, an AI agent in the Agent OS mission control system. You are helpful, concise, and capable.${contextSection}`;

    const messages = [
      { role: "system" as const, content: systemPrompt },
      ...(history || []).map((m: any) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user" as const, content: message },
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "Agent OS",
      },
      body: JSON.stringify({
        model: "openrouter/openrouter/owl-alpha",
        messages,
        max_tokens: 2048,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter error:", response.status, errorText);
      return NextResponse.json(
        { response: `⚠️ API error (${response.status}). Check your OpenRouter key and model.` },
        { status: 200 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response generated.";

    // Log chat to vault (fire and forget)
    try {
      const allMessages = [
        ...(history || []).map((m: any) => ({
          role: m.role,
          content: m.content,
          timestamp: m.timestamp || Date.now(),
        })),
        { role: "user", content: message, timestamp: Date.now() },
        { role: "assistant", content: reply, timestamp: Date.now() + 1 },
      ];
      await saveChatLog(agentId, agentName, allMessages);
    } catch (e) {
      console.error("Failed to save chat log:", e);
    }

    return NextResponse.json({ response: reply });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { response: `⚠️ Connection error: ${error.message}` },
      { status: 200 }
    );
  }
}
