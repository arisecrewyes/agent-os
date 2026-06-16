import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sourceType, sourceInput, sourceNote } = await req.json();

    // Build analysis prompt based on source type
    let sourceDescription = "";
    switch (sourceType) {
      case "url":
        sourceDescription = `Website: ${sourceInput}`;
        break;
      case "github":
        sourceDescription = `GitHub Repository: ${sourceInput}`;
        break;
      case "pdf":
        sourceDescription = `PDF/Document content: ${sourceInput}`;
        break;
      case "ebook":
        sourceDescription = `eBook: ${sourceInput}`;
        break;
      default:
        sourceDescription = `Custom source: ${sourceInput}`;
    }

    const noteContext = sourceNote ? `\n\nAdditional notes from the user: ${sourceNote}` : "";

    const systemPrompt = `You are an expert software architect and AI agent designer. A user wants to create a new AI agent based on a source reference. Analyze the source and provide a structured analysis.

Your response should include:
1. **What it is** — A clear description of what the source does/provides
2. **Core capabilities** — The key features and functions
3. **Agent potential** — What kind of agent could be built from this
4. **Suggested agent name** — A catchy, descriptive name
5. **Suggested role** — What the agent's role should be
6. **Key features to implement** — What the agent should be able to do

Keep it concise but thorough. Use markdown formatting.`;

    const userMessage = `Analyze this source and tell me what agent I could build from it:\n\n${sourceDescription}${noteContext}`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "Agent OS — Agent Creator",
      },
      body: JSON.stringify({
        model: "openrouter/openrouter/owl-alpha",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        max_tokens: 2048,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({
        analysis: `**Source Analysis**\n\nI've received your ${sourceType} source. Here's what I can build:\n\n1. **What it is**: Based on your input, this appears to be a ${sourceType === "url" ? "website" : sourceType === "github" ? "code repository" : "document"} with valuable functionality.\n\n2. **Agent potential**: A dedicated agent that can replicate and extend this source's capabilities.\n\n3. **Next step**: Tell me what custom features you'd like to add, and I'll design the perfect agent for you.`,
      });
    }

    const data = await response.json();
    const analysis = data.choices?.[0]?.message?.content || "Analysis complete. What custom features would you like to add?";

    return NextResponse.json({ analysis });
  } catch (error: any) {
    return NextResponse.json({
      analysis: "I've received your source. What custom features would you like to add to your new agent?",
    });
  }
}
