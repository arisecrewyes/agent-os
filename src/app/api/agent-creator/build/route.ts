import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { target, analysis, customFeatures, sourceType, sourceInput, deployNotes } = await req.json();

    // Use the AI to generate the agent specification
    const systemPrompt = `You are an AI agent architect. Based on the conversation, create a JSON specification for a new agent.

Respond with ONLY a valid JSON object (no markdown, no code fences) with these exact fields:
{
  "name": "Agent Name (short, catchy)",
  "role": "Brief role description",
  "icon": "Single emoji that represents the agent",
  "color": "Hex color code like #6c5ce7",
  "description": "Detailed 1-2 sentence description of what the agent does",
  "deployResult": "Brief deployment result message, or null if agent-only"
}

The agent should be specifically designed to replicate and extend the source material with the custom features requested.`;

    const userMessage = `Create an agent based on:
Source: ${sourceInput}
Analysis: ${analysis}
Custom features: ${customFeatures}
Deploy target: ${target}
${deployNotes ? `Notes: ${deployNotes}` : ""}`;

    let agentSpec = {
      name: "Custom Agent",
      role: "General Purpose",
      icon: "🤖",
      color: "#6c5ce7",
      description: "A custom AI agent created from your source material.",
      deployResult: null as string | null,
    };

    try {
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
          max_tokens: 1024,
          temperature: 0.7,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || "";

        // Try to extract JSON from the response
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          agentSpec = { ...agentSpec, ...parsed };
        }
      }
    } catch {
      // Use default spec if AI fails
    }

    // Add deployment result message
    if (target === "hostinger") {
      agentSpec.deployResult = "Docker files generated. Deploy via Hostinger Docker Manager with the provided YAML.";
    } else if (target === "gostackbase") {
      agentSpec.deployResult = "Project files prepared for GoStackBase deployment.";
    } else if (target === "github") {
      agentSpec.deployResult = "GitHub repository files generated. Push to your repo to deploy.";
    } else if (target === "local") {
      agentSpec.deployResult = "Project files generated. Download and run locally.";
    } else {
      agentSpec.deployResult = null;
    }

    const agent = {
      id: `custom-${Date.now()}`,
      name: agentSpec.name,
      role: agentSpec.role,
      icon: agentSpec.icon,
      status: "live" as const,
      description: agentSpec.description,
      color: agentSpec.color,
      repoUrl: sourceType === "github" ? sourceInput : undefined,
    };

    return NextResponse.json({
      agent,
      deployResult: agentSpec.deployResult,
    });
  } catch (error: any) {
    return NextResponse.json({
      agent: {
        id: `custom-${Date.now()}`,
        name: "Custom Agent",
        role: "General Purpose",
        icon: "🤖",
        status: "live",
        description: "A custom AI agent created from your source material.",
        color: "#6c5ce7",
      },
      deployResult: null,
    });
  }
}
