import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { target, analysis, customFeatures, sourceInput, deployNotes } = await req.json();

    const deployLabels: Record<string, string> = {
      hostinger: "Hostinger VPS",
      gostackbase: "GoStackBase",
      github: "GitHub Repo",
      local: "Local Download",
      "agent-only": "Agent Only (no deployment)",
    };

    const deployHints: Record<string, string> = {
      hostinger: "I'll generate a Dockerfile and docker-compose.yml tailored to your project. You'll be able to deploy it directly through your Hostinger Docker Manager.",
      gostackbase: "I'll create the project files compatible with GoStackBase's web builder platform, including any necessary configuration.",
      github: "I'll create a complete GitHub repository with all project files, README, and deployment instructions.",
      local: "I'll generate all project files for you to download and run locally.",
      "agent-only": "I'll create the agent in your dashboard. You can chat with it anytime to build more projects like this.",
    };

    const label = deployLabels[target] || target;
    const hint = deployHints[target] || "I'll prepare everything for you.";

    const noteContext = deployNotes ? `\n\nThe user also specified: ${deployNotes}` : "";

    const message = `**Deployment Target: ${label}**\n\n${hint}${noteContext}\n\nI'll now build your agent and ${target !== "agent-only" ? "prepare the deployment files" : "add it to your sidebar"}. Ready?`;

    return NextResponse.json({ message });
  } catch (error: any) {
    return NextResponse.json({
      message: "Ready to build your agent! I'll create it and add it to your sidebar.",
    });
  }
}
