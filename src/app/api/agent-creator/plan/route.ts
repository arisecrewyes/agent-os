import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { analysis, customFeatures, sourceType, sourceInput } = await req.json();

    const systemPrompt = `You are an expert AI agent architect. Based on the source analysis and the user's custom feature requests, create a detailed plan for the new agent.

Your response should:
1. Acknowledge the custom features requested
2. Describe the agent's capabilities in detail
3. Suggest a specific name, role, icon (single emoji), and color (hex) for the agent
4. Outline what the agent will be able to do
5. Ask where the user wants to deploy (Hostinger VPS, GoStackBase, GitHub, etc.)

Format the response in markdown. Be specific and actionable.`;

    const userMessage = `Source analysis:\n${analysis}\n\nCustom features requested:\n${customFeatures}\n\nCreate a detailed agent plan.`;

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
        plan: `**Agent Plan**\n\nBased on your custom features, here's what I'll build:\n\n✅ Agent with your requested custom features\n✅ Deployment-ready configuration\n✅ Full chat interface\n\n**Where would you like to deploy this?**\n- Hostinger VPS (Docker container)\n- GoStackBase (web builder)\n- GitHub Repo\n- Agent only (no deployment)`,
      });
    }

    const data = await response.json();
    const plan = data.choices?.[0]?.message?.content || "Plan ready! Where would you like to deploy?";

    return NextResponse.json({ plan });
  } catch (error: any) {
    return NextResponse.json({
      plan: "I've created a plan for your agent. Where would you like to deploy it?",
    });
  }
}
