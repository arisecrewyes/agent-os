import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, step, analysis, customFeatures, sourceType, sourceInput, history } = await req.json();

    const contextInfo = `
Current step: ${step}
Source type: ${sourceType}
Source input: ${sourceInput}
Analysis: ${analysis || "Not yet performed"}
Custom features: ${customFeatures || "Not yet provided"}
`;

    const systemPrompt = `You are the Agent Creator — an AI agent inside Agent OS that helps users build new AI agents from source materials.

Your personality: You're a skilled architect and builder. You ask smart clarifying questions, suggest improvements, and guide users through creating powerful agents.

Current conversation context:
${contextInfo}

Guidelines:
- If in "source" step: Help the user identify and describe their source material
- If in "customize" step: Ask about specific features, integrations, and modifications they want
- If in "deploy" step: Ask clarifying questions about their deployment target (domain, requirements, etc.)
- If in "done" step: Help them use their new agent or create another one
- Always be specific and actionable
- Suggest features the user might not have thought of
- Keep responses concise but helpful

The user's Agent OS has these deployment targets:
1. Hostinger VPS — Docker containers deployed via Hostinger Docker Manager
2. GoStackBase — Web builder platform for websites/apps
3. GitHub — Push to a repository
4. Local — Generate files for local use
5. Agent Only — Just create the chat agent, no external project`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...(history || []).slice(-10).map((m: any) => ({
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
        "X-Title": "Agent OS — Agent Creator",
      },
      body: JSON.stringify({
        model: "openrouter/owl-alpha",
        messages,
        max_tokens: 2048,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({
        response: "I'm here to help you build agents! What source material do you want to work with?",
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Tell me more about what you'd like to build.";

    return NextResponse.json({ response: reply });
  } catch (error: any) {
    return NextResponse.json({
      response: "I'm ready to help you build an agent. What source would you like to start with?",
    });
  }
}
