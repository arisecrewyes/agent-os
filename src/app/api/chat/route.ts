import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, agentId, history } = await req.json();

    const systemPrompt = `You are ${agentId === "openclaw" ? "OpenClaw" : agentId === "hermes" ? "Hermes" : "Claude"}, an AI agent in the Agent OS mission control system. You are helpful, concise, and capable. You have access to the user's goals, journal, and vault context. Respond naturally and helpfully.`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...(history || []).map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
      { role: "user", content: message },
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

    return NextResponse.json({ response: reply });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { response: `⚠️ Connection error: ${error.message}` },
      { status: 200 }
    );
  }
}
