# Agent OS Tool Analysis Report

**Generated:** June 19, 2026  
**Total Tools Analyzed:** 463  
**Duplicates Removed:** 253 (from 716 original entries)

---

## 📊 Summary

| Metric | Count |
|--------|-------|
| Total entries in spreadsheet | 716 |
| Duplicates removed | 253 |
| **Unique tools analyzed** | **463** |
| Matched to existing Agent OS agents | 83 |
| New tools not in original plan | 380 |
| Tools with pre-built Docker images | **0** |
| Tools needing to be built | 333 |
| Non-GitHub URLs | 130 |

---

## 🐳 Image Deployment Status

| Status | Count | Percentage |
|--------|-------|------------|
| Needs building | 333 | 71.9% |
| N/A - Not a GitHub URL | 130 | 28.1% |

> ⚠️ **Critical Finding:** None of the 463 tools have pre-built Docker images on GHCR or Docker Hub. Every tool must be built from source using `docker compose up -d --build` on the VPS.

---

## 🤖 SaaS / Chat Classification

| Type | Count |
|------|-------|
| Chat | 160 |
| Both | 129 |
| TBD | 121 |
| SaaS | 53 |

**Definitions:**
- **Chat** = Agent uses the tool on your behalf (you talk to the agent, agent executes)
- **SaaS** = You use it manually via a UI/dashboard
- **Both** = Can function either way (teacher/student model)
- **TBD** = Not enough info to classify

---

## 📁 Categories (Pass A — Agent OS Aligned)

| Category | Count |
|----------|-------|
| Core / Dashboard | 436 |
| Coding & Development | 348 |
| Automation | 280 |
| OSINT & Research | 212 |
| Content Creation | 163 |
| AI Workspace | 150 |
| Skills & Creation | 65 |
| Memory & Brain | 53 |
| Uncategorized | 4 |

---

## 📁 Categories (Pass B — Capability Based)

| Category | Count |
|----------|-------|
| Coding & Development | 420 |
| AI & Machine Learning | 306 |
| Productivity & Organization | 277 |
| Content Creation & Media | 271 |
| Social Media & Marketing | 267 |
| Utilities & Infrastructure | 246 |
| Education & Learning | 211 |
| Data & Analytics | 177 |
| AI Agent Frameworks | 152 |
| Communication & Messaging | 151 |
| OSINT & Reconnaissance | 122 |
| Cybersecurity & Hacking | 109 |
| Finance & Crypto | 58 |
| Uncategorized | 1 |

---

## ✅ Tools Matching Existing Agent OS Agents (83 tools)

### book-to-skill (2 matching tools)

- **https://github.com/virgiliojr94/book-to-skill**
  - *Reason:* This takes ebooks and/or PDFs and turns them into skills for OpenClaw
  - *Pass A:* OSINT & Research, Core / Dashboard, Skills & Creation, Automation
  - *Pass B:* Content Creation & Media, OSINT & Reconnaissance, AI Agent Frameworks
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

- **https://github.com/ahegazy0/linux-basics-for-hackers-notes**
  - *Reason:* This repo contains structured notes from “Linux Basics for Hackers,” turning the book into a searchable, code-adjacent knowledge base. You can use it both to review core Linux concepts and to seed RAG
  - *Pass A:* Automation, Coding & Development, Skills & Creation, OSINT & Research, Memory & Brain, Core / Dashboard
  - *Pass B:* Cybersecurity & Hacking, Social Media & Marketing, Content Creation & Media
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

### cc-clypra (1 matching tools)

- **https://github.com/AIEraDev/Clypra**
  - *Reason:* About
A modern video editor built with Tauri, React, and TypeScript. Focus on building free capabilities of premium capcut functionalities

clypra.abdulkabirmusa.com
  - *Pass A:* Automation, Coding & Development, Skills & Creation, Content Creation, Core / Dashboard
  - *Pass B:* Data & Analytics, Content Creation & Media, Utilities & Infrastructure
  - *SaaS/Chat:* Both
  - *Image:* Needs building

### cc-hyperframes (1 matching tools)

- **https://github.com/heygen-com/hyperframes?utm_source=opensourceprojects.dev&ref=opensourceprojects.dev**
  - *Reason:* HyperFrames is an open-source framework for turning HTML, CSS, media, and seekable animations into deterministic MP4 videos. Use it locally with the CLI, from AI coding agents with skills, or as the r
  - *Pass A:* Automation, Coding & Development, Skills & Creation, Content Creation, Core / Dashboard, AI Workspace
  - *Pass B:* Social Media & Marketing, Content Creation & Media, Utilities & Infrastructure
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

### cc-leads (1 matching tools)

- **https://github.com/Geolavor/leads-generator-app**
  - *Reason:* Prospects AI browser — extract contact details from the Internet in real time
  - *Pass A:* Automation, Core / Dashboard, Coding & Development, Content Creation
  - *Pass B:* Coding & Development, Social Media & Marketing, AI & Machine Learning
  - *SaaS/Chat:* SaaS
  - *Image:* Needs building

### cc-nango (2 matching tools)

- **https://github.com/NangoHQ/nango**
  - *Reason:* Nango is an open-source unified API for SaaS integrations, letting you connect to dozens of third-party services (HubSpot, Salesforce, GitHub, etc.) via a consistent abstraction. It handles OAuth, tok
  - *Pass A:* Automation, Coding & Development, Content Creation, Core / Dashboard, AI Workspace
  - *Pass B:* Social Media & Marketing, Content Creation & Media, Data & Analytics
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

- **https://github.com/rmyndharis/OpenWA**
  - *Reason:* OpenWA appears here in the context of WhatsApp automation/agent integration, likely a fork or wrapper around WhatsApp Web automation libraries. It enables sending/receiving messages, managing sessions
  - *Pass A:* Automation, Core / Dashboard, Coding & Development, Content Creation
  - *Pass B:* Social Media & Marketing, Content Creation & Media, Utilities & Infrastructure
  - *SaaS/Chat:* Both
  - *Image:* Needs building

### cc-open-gen-ai (2 matching tools)

- **https://github.com/Anil-matcha/Open-Generative-AI**
  - *Reason:* About
Open-source alternative to AI video platforms — Free AI image & video generation studio with 200+ models (Flux, Midjourney, Kling, Sora, Veo). No content filters. Self-hosted, MIT licensed.

mua
  - *Pass A:* Automation, Coding & Development, Content Creation, Core / Dashboard, AI Workspace
  - *Pass B:* Social Media & Marketing, Content Creation & Media, Data & Analytics
  - *SaaS/Chat:* Both
  - *Image:* Needs building

- **https://github.com/Anil-matcha/Open-Generative-AI (also in B)**
  - *Reason:* See above.
  - *Pass A:* Core / Dashboard
  - *Pass B:* Coding & Development, AI & Machine Learning
  - *SaaS/Chat:* TBD
  - *Image:* Needs building

### cc-reclip (1 matching tools)

- **https://github.com/averygan/reclip**
  - *Reason:* About
Download videos from almost any website. Lightweight, self-hosted media downloader with a clean web UI.
  - *Pass A:* Core / Dashboard, AI Workspace, Coding & Development, Content Creation
  - *Pass B:* Social Media & Marketing, Content Creation & Media, Utilities & Infrastructure
  - *SaaS/Chat:* SaaS
  - *Image:* Needs building

### cc-salesgpt (1 matching tools)

- **https://github.com/filip-michalsky/SalesGPT**
  - *Reason:* Context-aware AI Sales Agent — automates sales outreach via voice, email, SMS, WhatsApp
  - *Pass A:* Automation, Core / Dashboard, Coding & Development, Content Creation
  - *Pass B:* Social Media & Marketing, Content Creation & Media, AI Agent Frameworks
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

### cc-social-scrape (1 matching tools)

- **https://github.com/cporter202/social-media-scraping-apis**
  - *Reason:* A curated collection of social media scraping APIs and tools for Instagram, LinkedIn, Twitter/X, TikTok, YouTube, Facebook, and more. Extract posts, profiles, videos, comments, and engagement metrics.
  - *Pass A:* Automation, Coding & Development, Skills & Creation, Content Creation, OSINT & Research, Core / Dashboard
  - *Pass B:* Social Media & Marketing, Content Creation & Media, OSINT & Reconnaissance
  - *SaaS/Chat:* Both
  - *Image:* Needs building

### cc-vibevoice (1 matching tools)

- **https://github.com/microsoft/VibeVoice**
  - *Reason:* Open-Source Frontier Voice AI
  - *Pass A:* Core / Dashboard, Content Creation
  - *Pass B:* Coding & Development, Content Creation & Media, AI & Machine Learning
  - *SaaS/Chat:* TBD
  - *Image:* Needs building

### cc-video-use (1 matching tools)

- **https://github.com/browser-use/video-use**
  - *Reason:* Agent controlling browsers with video-style reasoning (probably built on browser-use). Good for complex web workflows that require visual steps. Unique in leaning on video/visual understanding for bro
  - *Pass A:* Automation, Coding & Development, Content Creation, Core / Dashboard, AI Workspace
  - *Pass B:* Social Media & Marketing, Content Creation & Media, AI Agent Frameworks
  - *SaaS/Chat:* Both
  - *Image:* Needs building

### cc-vimax (1 matching tools)

- **https://github.com/HKUDS/ViMax**
  - *Reason:* Agentic Video Generation — Director, Screenwriter, Producer, Generator All-in-One
  - *Pass A:* Automation, Core / Dashboard, Coding & Development, Content Creation
  - *Pass B:* Coding & Development, Content Creation & Media, AI & Machine Learning
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

### cc-wa-automate (1 matching tools)

- **https://github.com/open-wa/wa-automate-nodejs**
  - *Reason:* WA-Automate / OpenWA — Node.js WhatsApp automation
  - *Pass A:* Automation, Core / Dashboard, Coding & Development, Content Creation
  - *Pass B:* Coding & Development, Social Media & Marketing, Utilities & Infrastructure
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

### goldie-codex (5 matching tools)

- **https://github.com/affaan-m/ECC**
  - *Reason:* The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond.
  - *Pass A:* Coding & Development, Skills & Creation, OSINT & Research, Memory & Brain, Core / Dashboard
  - *Pass B:* Cybersecurity & Hacking, Data & Analytics, Utilities & Infrastructure
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

- **https://github.com/Lum1104/Understand-Anything**
  - *Reason:* Graphs that teach > graphs that impress. Turn any code into an interactive knowledge graph you can explore, search, and ask questions about. Works with Claude Code, Codex, Cursor, Copilot, Gemini CLI,
  - *Pass A:* Automation, Coding & Development, Skills & Creation, Content Creation, OSINT & Research, Memory & Brain, Core / Dashboard
  - *Pass B:* Data & Analytics, Content Creation & Media, Utilities & Infrastructure
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

- **https://github.com/ultraworkers/claw-code**
  - *Reason:* 100K+ stars repo — built in Rust using oh-my-codex
  - *Pass A:* Automation, Core / Dashboard, Coding & Development
  - *Pass B:* Coding & Development
  - *SaaS/Chat:* SaaS
  - *Image:* Needs building

- **https://github.com/openai/codex**
  - *Reason:* This is the OpenAI Codex repository, which historically documented and demoed the Codex model used for code generation and GitHub Copilot. It contains examples, APIs, and integration patterns for codi
  - *Pass A:* Automation, AI Workspace, Coding & Development, Core / Dashboard
  - *Pass B:* Social Media & Marketing, Content Creation & Media, AI Agent Frameworks
  - *SaaS/Chat:* Both
  - *Image:* Needs building

- **https://github.com/duolahypercho/fusion-fable**
  - *Reason:* About
Fuse two frontier models into one Fable-tier answer: Opus 4.8 drafts, a second model (Opus 4.8 or GPT-5.5 via codex) checks, Opus fuses. A Claude Code skill.
  - *Pass A:* Core / Dashboard, AI Workspace, Coding & Development, Skills & Creation
  - *Pass B:* Coding & Development, Education & Learning, AI & Machine Learning
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

### hermes (43 matching tools)

- **https://github.com/0x4m4/hexstrike-ai**
  - *Reason:* hexstrike-ai
HexStrike AI MCP Agents is an advanced MCP server that lets AI agents (Claude, GPT, Copilot, etc.) autonomously run 150+ cybersecurity tools for automated pentesting, vulnerability discov
  - *Pass A:* Automation, Coding & Development, OSINT & Research, Core / Dashboard, AI Workspace
  - *Pass B:* Cybersecurity & Hacking, Social Media & Marketing, Content Creation & Media
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

- **https://hermes-agent.nousresearch.com/docs/skills/**
  - *Reason:* Hermes Agent Skills Hub
  - *Pass A:* OSINT & Research, AI Workspace, Skills & Creation, Core / Dashboard
  - *Pass B:* Data & Analytics, Education & Learning, AI Agent Frameworks
  - *SaaS/Chat:* Chat
  - *Image:* N/A - Not a GitHub URL

- **https://github.com/aliasrobotics/cai**
  - *Reason:* Cybersecurity AI (CAI) is a lightweight, open-source framework that empowers security professionals to build and deploy AI-powered offensive and defensive automation. CAI is the de facto framework for
  - *Pass A:* OSINT & Research, Core / Dashboard, Coding & Development, Automation
  - *Pass B:* Cybersecurity & Hacking, Social Media & Marketing, Content Creation & Media
  - *SaaS/Chat:* Both
  - *Image:* Needs building

- **https://www.reddit.com/r/AIAgentsInAction/comments/1tuvhvq/the_soulmd_template_behind_my_hermes_agent_never/?rdt=62423**
  - *Reason:* SOUL to repo Ai Agnt Fraework for Hermes Agent
  - *Pass A:* Automation, AI Workspace, Core / Dashboard
  - *Pass B:* Social Media & Marketing, Content Creation & Media, AI Agent Frameworks
  - *SaaS/Chat:* Chat
  - *Image:* N/A - Not a GitHub URL

- **https://github.com/kaymen99/sales-outreach-automation-langgraph**
  - *Reason:* Automate lead research, qualification, outreach with AI agents + LangGraph + CRM
  - *Pass A:* OSINT & Research, Core / Dashboard, Automation
  - *Pass B:* Social Media & Marketing, Data & Analytics, Utilities & Infrastructure
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

- **https://github.com/mautic/mautic**
  - *Reason:* Mautic — open-source marketing automation platform
  - *Pass A:* Automation, AI Workspace, Core / Dashboard
  - *Pass B:* Coding & Development, Social Media & Marketing, Utilities & Infrastructure
  - *SaaS/Chat:* Both
  - *Image:* Needs building

- **https://github.com/n8n-io/n8n**
  - *Reason:* Open-source workflow automation (30k+ stars) — visual low-code lead gen workflows
  - *Pass A:* Automation, AI Workspace, Coding & Development, Core / Dashboard
  - *Pass B:* Social Media & Marketing, Content Creation & Media, Utilities & Infrastructure
  - *SaaS/Chat:* Both
  - *Image:* Needs building

- **https://github.com/NousResearch/hermes-agent**
  - *Reason:* The agent that grows with you
  - *Pass A:* OSINT & Research, AI Workspace, Core / Dashboard
  - *Pass B:* Coding & Development, Data & Analytics, AI Agent Frameworks
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

- **https://github.com/open-wa/wa-automate-nodejs**
  - *Reason:* WA-Automate / OpenWA — Node.js WhatsApp automation
  - *Pass A:* Automation, Core / Dashboard, Coding & Development, Content Creation
  - *Pass B:* Coding & Development, Social Media & Marketing, Utilities & Infrastructure
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

- **https://github.com/parcelvoy/platform**
  - *Reason:* Parcelvoy — open-source multi-channel marketing automation (email, SMS, push)
  - *Pass A:* Automation, Core / Dashboard
  - *Pass B:* Social Media & Marketing, Utilities & Infrastructure, Communication & Messaging
  - *SaaS/Chat:* Both
  - *Image:* Needs building

- **https://github.com/PaulleDemon/Email-automation**
  - *Reason:* Open-source cold email outreach tool with drip sequences
  - *Pass A:* Automation, Core / Dashboard
  - *Pass B:* Social Media & Marketing, Utilities & Infrastructure, Communication & Messaging
  - *SaaS/Chat:* TBD
  - *Image:* Needs building

- **https://github.com/smicallef/spiderfoot**
  - *Reason:* SpiderFoot — open-source intelligence automation tool
  - *Pass A:* OSINT & Research, Core / Dashboard, Coding & Development, Automation
  - *Pass B:* Social Media & Marketing, Utilities & Infrastructure, OSINT & Reconnaissance
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

- **https://github.com/OpenJarvis/OpenJarvis**
  - *Reason:* Open Jarvis-style assistant/agent (voice, tasks, automations). General assistant you can extend. Unique in being voice/assistant oriented, not just text CLI.
  - *Pass A:* Automation, Core / Dashboard, Content Creation
  - *Pass B:* Social Media & Marketing, Content Creation & Media, Utilities & Infrastructure
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

- **https://ultimatewebscraper.com/**
  - *Reason:* SaaS/course/tool around large-scale scraping automation. Might provide UI + code templates. Unique by being a packaged commercial “web scraper system,” not just code.
  - *Pass A:* Automation, Coding & Development, Content Creation, OSINT & Research, Core / Dashboard
  - *Pass B:* Social Media & Marketing, Content Creation & Media, OSINT & Reconnaissance
  - *SaaS/Chat:* Both
  - *Image:* N/A - Not a GitHub URL

- **https://digitaldfyproducts.com/products/the-ultimate-n8n-automation-bundle**
  - *Reason:* Bundle of n8n workflows/templates. You can use them as reference architectures. Unique for dense prebuilt n8n scenarios.
  - *Pass A:* Automation, AI Workspace, Coding & Development, Core / Dashboard
  - *Pass B:* Social Media & Marketing, Content Creation & Media, Utilities & Infrastructure
  - *SaaS/Chat:* Both
  - *Image:* N/A - Not a GitHub URL

- **https://github.com/Moh4696/websites-100-audit**
  - *Reason:* This repo appears to provide resources or scripts to audit 100+ websites or a structured methodology for “website audit 100”. It’s likely oriented toward systematic web security assessment or SEO/stru
  - *Pass A:* OSINT & Research, Core / Dashboard, Coding & Development, Automation
  - *Pass B:* Cybersecurity & Hacking, Social Media & Marketing, Content Creation & Media
  - *SaaS/Chat:* Both
  - *Image:* Needs building

- **https://github.com/pullfrog/pullfrog**
  - *Reason:* Pullfrog is an open-source AI-powered GitHub bot that runs entirely via GitHub Actions to review pull requests, triage issues, and remediate CI problems. It is model‑agnostic (“bring your own key”) an
  - *Pass A:* Automation, Coding & Development, Skills & Creation, Content Creation, Core / Dashboard, AI Workspace
  - *Pass B:* Social Media & Marketing, Content Creation & Media, Data & Analytics
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

- **https://repodir.com/repo/cporter202-api-mega-list**
  - *Reason:* This Repodir page points to cporter202-api-mega-list, a mega-list of APIs categorized by use case. It’s extremely useful for discovering third-party APIs to plug into agents, scrapers, and automations
  - *Pass A:* Automation, Coding & Development, Content Creation, OSINT & Research, Memory & Brain
  - *Pass B:* Social Media & Marketing, Content Creation & Media, OSINT & Reconnaissance
  - *SaaS/Chat:* Chat
  - *Image:* N/A - Not a GitHub URL

- **https://github.com/NangoHQ/nango**
  - *Reason:* Nango is an open-source unified API for SaaS integrations, letting you connect to dozens of third-party services (HubSpot, Salesforce, GitHub, etc.) via a consistent abstraction. It handles OAuth, tok
  - *Pass A:* Automation, Coding & Development, Content Creation, Core / Dashboard, AI Workspace
  - *Pass B:* Social Media & Marketing, Content Creation & Media, Data & Analytics
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

- **https://github.com/rmyndharis/OpenWA**
  - *Reason:* OpenWA appears here in the context of WhatsApp automation/agent integration, likely a fork or wrapper around WhatsApp Web automation libraries. It enables sending/receiving messages, managing sessions
  - *Pass A:* Automation, Core / Dashboard, Coding & Development, Content Creation
  - *Pass B:* Social Media & Marketing, Content Creation & Media, Utilities & Infrastructure
  - *SaaS/Chat:* Both
  - *Image:* Needs building

- **https://github.com/apurvsinghgautam/robin**
  - *Reason:* robin is likely a personal automation or agent that handles recurring tasks (email, scheduling, notifications) akin to a digital butler. It may integrate with multiple services to run workflows on you
  - *Pass A:* Automation, AI Workspace, Coding & Development, Core / Dashboard
  - *Pass B:* Social Media & Marketing, Utilities & Infrastructure, AI Agent Frameworks
  - *SaaS/Chat:* Both
  - *Image:* Needs building

- **https://github.com/chrysb/alphaclaw**
  - *Reason:* alphaclaw is part of the Claw ecosystem, likely integrating agentic workflows with “alpha” capabilities (e.g., trading, automation, or advanced orchestration). Public summaries are sparse, so you’d ne
  - *Pass A:* Automation, Coding & Development, Content Creation, Memory & Brain, AI Workspace, Core / Dashboard
  - *Pass B:* Social Media & Marketing, Content Creation & Media, Data & Analytics
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

- **https://github.com/cporter202/automate-faceless-content**
  - *Reason:* This repo contains scripts and workflows for automating faceless content creation (shorts, posts, etc.) using AI. It likely integrates with APIs, schedulers, and templates to generate and publish cont
  - *Pass A:* Automation, Coding & Development, Content Creation, Core / Dashboard, AI Workspace
  - *Pass B:* Social Media & Marketing, Content Creation & Media, Utilities & Infrastructure
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

- **https://github.com/DigitalPlatDev/FreeDomain**
  - *Reason:* FreeDomain looks like an automation or utility project to help acquire or manage free domains or DNS setups. That can be powerful when spinning up many disposable or micro SaaS sites. Its unique angle
  - *Pass A:* OSINT & Research, Core / Dashboard, Coding & Development, Automation
  - *Pass B:* Social Media & Marketing, Utilities & Infrastructure, OSINT & Reconnaissance
  - *SaaS/Chat:* Both
  - *Image:* Needs building

- **https://repodir.com/repo/rmyndharis-openwa**
  - *Reason:* Repodir’s page for rmyndharis/OpenWA provides metadata, description, and possibly mirrors for that WhatsApp automation project. Instead of going directly to GitHub, you get a snapshot of stars, tags, 
  - *Pass A:* Automation, Core / Dashboard, Coding & Development, Content Creation
  - *Pass B:* Social Media & Marketing, Data & Analytics, Utilities & Infrastructure
  - *SaaS/Chat:* Chat
  - *Image:* N/A - Not a GitHub URL

- **https://www.skool.com/codespring-3000/about?bhlid=80929698dc73eaa6fed5652aa762e9d796803e68**
  - *Reason:* This Skool page describes the “CodeSpring 3000” community/course, likely focused on AI agents, automation, or coding. It outlines the benefits, modules, and community features. Unique because it’s a l
  - *Pass A:* Automation, Coding & Development, Content Creation, Core / Dashboard, AI Workspace
  - *Pass B:* Social Media & Marketing, Content Creation & Media, Utilities & Infrastructure
  - *SaaS/Chat:* Chat
  - *Image:* N/A - Not a GitHub URL

- **https://omma.build/pricing**
  - *Reason:* Omma.build’s pricing page outlines the cost tiers and features of their product (likely an automation or app-building platform given context). It matters for ROI calculations if you consider it as par
  - *Pass A:* Automation, Coding & Development, Content Creation, Core / Dashboard, AI Workspace
  - *Pass B:* Social Media & Marketing, Content Creation & Media, Utilities & Infrastructure
  - *SaaS/Chat:* Both
  - *Image:* N/A - Not a GitHub URL

- **https://github.com/ruzin/stenoai**
  - *Reason:* StenoAI is likely a tool that provides transcription, summarization, or note-taking automation, possibly for meetings or calls. It automates the capture and structuring of spoken information. Unique b
  - *Pass A:* Automation, Coding & Development, Content Creation, OSINT & Research, Core / Dashboard, AI Workspace
  - *Pass B:* Social Media & Marketing, Content Creation & Media, OSINT & Reconnaissance
  - *SaaS/Chat:* Both
  - *Image:* Needs building

- **https://cobalt.tools/**
  - *Reason:* cobalt.tools is a web tool suite (often used for multimedia downloading/processing, historically YouTube-related). It can simplify media acquisition for downstream analysis. Unique as a hosted, generi
  - *Pass A:* Automation, Coding & Development, Content Creation, Core / Dashboard, AI Workspace
  - *Pass B:* Social Media & Marketing, Content Creation & Media, Data & Analytics
  - *SaaS/Chat:* Both
  - *Image:* N/A - Not a GitHub URL

- **https://www.hostinger.com/openclaw?session=…**
  - *Reason:* This is Hostinger’s OpenClaw landing/offer page, bundling hosting tailored for OpenClaw-based projects. It likely emphasizes easy deployment for agent/automation stacks built on OpenClaw. Its unique a
  - *Pass A:* Automation, AI Workspace, Coding & Development, Core / Dashboard
  - *Pass B:* Social Media & Marketing, Content Creation & Media, Utilities & Infrastructure
  - *SaaS/Chat:* Both
  - *Image:* N/A - Not a GitHub URL

- **https://getle.ad/?utm_id=…**
  - *Reason:* GetLe.ad appears to be a lead generation/automation product, automating outreach and follow-up. The page is likely an ad landing for the platform. Unique as a modern competitor/benchmark for AI-driven
  - *Pass A:* Automation, AI Workspace, Coding & Development, Core / Dashboard
  - *Pass B:* Social Media & Marketing, Data & Analytics, Utilities & Infrastructure
  - *SaaS/Chat:* Both
  - *Image:* N/A - Not a GitHub URL

- **https://getbasecase.com/products/the-executive-uhd?campaign_id=…**
  - *Reason:* “The Executive UHD” from BaseCase is a compact, portable workstation/monitor setup geared to remote professionals. It combines display, connectivity, and ergonomics in a travel-friendly form factor. I
  - *Pass A:* OSINT & Research, Core / Dashboard, Coding & Development, Automation
  - *Pass B:* Social Media & Marketing, Content Creation & Media, OSINT & Reconnaissance
  - *SaaS/Chat:* Chat
  - *Image:* N/A - Not a GitHub URL

- **https://botcommerce.app/lifetime-deal/?utm_id=…**
  - *Reason:* BotCommerce’s lifetime deal page; BotCommerce is likely a chatbot/automation platform for e‑commerce or sales. The page shows pricing, features, and urgency framing. Unique as a live example of lifeti
  - *Pass A:* Automation, AI Workspace, Coding & Development, Core / Dashboard
  - *Pass B:* Utilities & Infrastructure, Social Media & Marketing, Communication & Messaging
  - *SaaS/Chat:* Both
  - *Image:* N/A - Not a GitHub URL

- **https://appsumo.com/products/the-black-friday-bundle/?utm_id=…**
  - *Reason:* AppSumo listing for a “Black Friday Bundle,” bundling multiple tools at a deal price. Great for seeing how bundles are packaged and discounted. Unique as a reference for bundle strategy you can emulat
  - *Pass A:* OSINT & Research, Core / Dashboard, Coding & Development, Automation
  - *Pass B:* Social Media & Marketing, Content Creation & Media, OSINT & Reconnaissance
  - *SaaS/Chat:* Both
  - *Image:* N/A - Not a GitHub URL

- **https://www.aikido.dev/?ad_id=…**
  - *Reason:* Aikido.dev is a developer-first security platform that monitors repos/infrastructure for vulnerabilities and issues. The ad landing emphasizes ease-of-use and automation. Unique as a modern “security 
  - *Pass A:* Automation, Coding & Development, Content Creation, OSINT & Research, Core / Dashboard
  - *Pass B:* Cybersecurity & Hacking, Social Media & Marketing, Content Creation & Media
  - *SaaS/Chat:* Both
  - *Image:* N/A - Not a GitHub URL

- **https://dealify.com/products/n8nitro?utm_id=…**
  - *Reason:* Dealify’s page for n8NITRO, likely a performance-enhancing add-on/toolkit for n8n automations. It may include templates, infrastructure, or dashboards aimed at power users. Unique as a commercial prod
  - *Pass A:* Automation, Core / Dashboard, Coding & Development
  - *Pass B:* Social Media & Marketing, Content Creation & Media, Data & Analytics
  - *SaaS/Chat:* Both
  - *Image:* N/A - Not a GitHub URL

- **https://github.com/cporter202/API-mega-list**
  - *Reason:* About
This GitHub repo is a powerhouse collection of APIs you can start using immediately to build everything from simple automations to full-scale applications. One of the most valuable API lists on 
  - *Pass A:* Automation, Core / Dashboard, Coding & Development, Content Creation
  - *Pass B:* Social Media & Marketing, Content Creation & Media, Utilities & Infrastructure
  - *SaaS/Chat:* Both
  - *Image:* Needs building

- **https://github.com/nicotsx/zerobyte**
  - *Reason:* About
Backup automation for self-hosters. Built on top of restic

zerobyte.app
  - *Pass A:* Automation, Core / Dashboard, Coding & Development
  - *Pass B:* Coding & Development, Social Media & Marketing, Utilities & Infrastructure
  - *SaaS/Chat:* Both
  - *Image:* Needs building

- **https://github.com/cporter202/stock-market-signal-automation**
  - *Reason:* About
Build your own data-driven market edge with swing-trade signal webhooks, dashboards, alerts, AI agents, and automation examples.
  - *Pass A:* Automation, Core / Dashboard, Coding & Development
  - *Pass B:* Social Media & Marketing, Data & Analytics, Utilities & Infrastructure
  - *SaaS/Chat:* Both
  - *Image:* Needs building

- **https://github.com/opentabs-dev/opentabs**
  - *Reason:* About
Browser automation clicks buttons. OpenTabs calls APIs.

opentabs.dev
  - *Pass A:* Automation, Core / Dashboard, Coding & Development
  - *Pass B:* Coding & Development, Social Media & Marketing, Utilities & Infrastructure
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

- **https://github.com/loxy0devlp/RedTiger-Tools**
  - *Reason:* About
RedTiger-Tools is a multifunction automation tool dedicated to pentesting and OSINT. The project is open source and designed to be fully configurable according to user needs. It also includes a 
  - *Pass A:* Automation, Coding & Development, Content Creation, OSINT & Research, Core / Dashboard
  - *Pass B:* Cybersecurity & Hacking, Social Media & Marketing, Content Creation & Media
  - *SaaS/Chat:* Both
  - *Image:* Needs building

- **https://github.com/Salomondiei08/oh-my-hermes**
  - *Reason:* About
An opinionated workflow layer for building, shipping, and operating apps with Hermes Agent
  - *Pass A:* Automation, AI Workspace, Coding & Development, Core / Dashboard
  - *Pass B:* Coding & Development, Social Media & Marketing, Productivity & Organization
  - *SaaS/Chat:* Both
  - *Image:* Needs building

- **https://github.com/LiteLLM-Labs/litellm-agent-control-plane**
  - *Reason:* About
1 place to call all your agents - OpenCode, Hermes, Claude Managed Agents, Cursor Agents API, DeepAgents.

docs.litellm-agent-platform.ai
  - *Pass A:* Automation, AI Workspace, Coding & Development, Core / Dashboard
  - *Pass B:* Social Media & Marketing, AI Agent Frameworks, Communication & Messaging
  - *SaaS/Chat:* Both
  - *Image:* Needs building

### mem-deer-flow (3 matching tools)

- **https://github.com/bytedance/deer-flow**
  - *Reason:* About
An open-source long-horizon SuperAgent harness that researches, codes, and creates. With the help of sandboxes, memories, tools, skill, subagents and message gateway, it handles different levels
  - *Pass A:* Automation, Coding & Development, Skills & Creation, OSINT & Research, Memory & Brain, Core / Dashboard
  - *Pass B:* Social Media & Marketing, Data & Analytics, Utilities & Infrastructure
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

- **https://github.com/bytedance/deer-flow (already in A)**
  - *Reason:* See above.
  - *Pass A:* Core / Dashboard
  - *Pass B:* Coding & Development
  - *SaaS/Chat:* TBD
  - *Image:* Needs building

- **https://github.com/bytedance/deer-flow (already above)**
  - *Reason:* See above.
  - *Pass A:* Core / Dashboard
  - *Pass B:* Coding & Development
  - *SaaS/Chat:* TBD
  - *Image:* Needs building

### mem-memanto (1 matching tools)

- **https://github.com/moorcheh-ai/memanto**
  - *Reason:* MEMANTO is a memory agent. It remembers, recalls, and answers — so your agents can achieve long-term goals and avoid confusion.

Most memory tools today are passive infrastructure: agents have to quer
  - *Pass A:* Automation, Coding & Development, Content Creation, Memory & Brain, AI Workspace, Core / Dashboard
  - *Pass B:* Data & Analytics, Content Creation & Media, Utilities & Infrastructure
  - *SaaS/Chat:* Both
  - *Image:* Needs building

### mem-turbovec (1 matching tools)

- **https://github.com/RyanCodrai/turbovec**
  - *Reason:* A vector index built on TurboQuant, written in Rust with Python bindings
  - *Pass A:* Memory & Brain, Core / Dashboard, Coding & Development
  - *Pass B:* Coding & Development, AI & Machine Learning
  - *SaaS/Chat:* SaaS
  - *Image:* Needs building

### memory-engine (1 matching tools)

- **https://github.com/MemPalace/mempalace**
  - *Reason:* MemPalace is an AI memory system / benchmark that went viral for achieving extremely high scores on LongMemEval. The repo offers a memory system architecture for agents and benchmarks to evaluate long
  - *Pass A:* Memory & Brain, Core / Dashboard, Automation, Content Creation
  - *Pass B:* Social Media & Marketing, Content Creation & Media, AI Agent Frameworks
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

### odysseus-agent (1 matching tools)

- **https://github.com/pewdiepie-archdaemon/odysseus**
  - *Reason:* odysseus :A self-hosted AI workspace -- meant to be the self-hosted version of the UI experience you get from ChatGPT and Claude. But with more jank and fun. Running on your own hardware, with your ow
  - *Pass A:* Core / Dashboard, AI Workspace, Coding & Development
  - *Pass B:* Social Media & Marketing, Content Creation & Media, Data & Analytics
  - *SaaS/Chat:* Both
  - *Image:* Needs building

### openclaw (10 matching tools)

- **https://github.com/virgiliojr94/book-to-skill**
  - *Reason:* This takes ebooks and/or PDFs and turns them into skills for OpenClaw
  - *Pass A:* OSINT & Research, Core / Dashboard, Skills & Creation, Automation
  - *Pass B:* Content Creation & Media, OSINT & Reconnaissance, AI Agent Frameworks
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

- **https://github.com/alibaba/open-code-review/tree/main**
  - *Reason:* Viladates and reviews open soruced oded AI Agent skills for OPenClaw skills
  - *Pass A:* Core / Dashboard, Coding & Development, Skills & Creation
  - *Pass B:* Data & Analytics, Content Creation & Media, Utilities & Infrastructure
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

- **https://github.com/Alishahryar1/free-claude-code**
  - *Reason:* Use claude-code for free in the terminal, VSCode extension or discord like OpenClaw (voice supported)
  - *Pass A:* Core / Dashboard, Coding & Development, Content Creation
  - *Pass B:* Social Media & Marketing, Content Creation & Media, Utilities & Infrastructure
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

- **https://github.com/bytedance/deer-flow**
  - *Reason:* About
An open-source long-horizon SuperAgent harness that researches, codes, and creates. With the help of sandboxes, memories, tools, skill, subagents and message gateway, it handles different levels
  - *Pass A:* Automation, Coding & Development, Skills & Creation, OSINT & Research, Memory & Brain, Core / Dashboard
  - *Pass B:* Social Media & Marketing, Data & Analytics, Utilities & Infrastructure
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

- **https://github.com/iamlukethedev/Claw3D**
  - *Reason:* Open source 3D engine built on OpenClaw for games/simulations
  - *Pass A:* Core / Dashboard, Coding & Development, Content Creation
  - *Pass B:* Coding & Development, Data & Analytics, Content Creation & Media
  - *SaaS/Chat:* SaaS
  - *Image:* Needs building

- **https://www.hostinger.com/openclaw?session=…**
  - *Reason:* This is Hostinger’s OpenClaw landing/offer page, bundling hosting tailored for OpenClaw-based projects. It likely emphasizes easy deployment for agent/automation stacks built on OpenClaw. Its unique a
  - *Pass A:* Automation, AI Workspace, Coding & Development, Core / Dashboard
  - *Pass B:* Social Media & Marketing, Content Creation & Media, Utilities & Infrastructure
  - *SaaS/Chat:* Both
  - *Image:* N/A - Not a GitHub URL

- **https://github.com/OpenClaw/OpenClaw**
  - *Reason:* OpenClaw is the high-profile agentic framework and “Claude-powered IDE/agent environment” that exploded in popularity (100k+ stars). It focuses on turning Claude into a system-level agent with skills,
  - *Pass A:* Automation, Core / Dashboard, Coding & Development, Skills & Creation
  - *Pass B:* Social Media & Marketing, Utilities & Infrastructure, AI Agent Frameworks
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

- **https://github.com/refactoringhq/tolaria**
  - *Reason:* 💧 Tolaria
Tolaria is a desktop app for macOS, Windows, and Linux for managing markdown knowledge bases. People use it for a variety of use cases:

Operate second brains and personal knowledge
Organize
  - *Pass A:* Automation, Coding & Development, Memory & Brain, AI Workspace, Core / Dashboard
  - *Pass B:* Data & Analytics, Content Creation & Media, AI Agent Frameworks
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

- **https://github.com/Gen-Verse/OpenClaw-RL**
  - *Reason:* About
OpenClaw-RL: Train any agent simply by talking

arxiv.org/abs/2603.10165
  - *Pass A:* Core / Dashboard
  - *Pass B:* Coding & Development, AI & Machine Learning, AI Agent Frameworks
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

- **https://github.com/hesreallyhim/awesome-claude-code**
  - *Reason:* About
A curated list of awesome skills, hooks, slash-commands, agent orchestrators, applications, and plugins for Claude Code by Anthropic
  - *Pass A:* Core / Dashboard, Coding & Development, Skills & Creation
  - *Pass B:* Social Media & Marketing, AI Agent Frameworks, Coding & Development
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

### osint-gitrecon (1 matching tools)

- **https://github.com/techenthusiast167/GITRECON**
  - *Reason:* About
A powerful Python-based OSINT (Open Source Intelligence) tool for comprehensive GitHub reconnaissance, security assessment, and digital footprint analysis.
  - *Pass A:* OSINT & Research, Core / Dashboard, Coding & Development, Automation
  - *Pass B:* Cybersecurity & Hacking, Data & Analytics, Content Creation & Media
  - *SaaS/Chat:* TBD
  - *Image:* Needs building

### osint-sherlock (1 matching tools)

- **https://github.com/sherlock-project/sherlock**
  - *Reason:* Username OSINT tool: find accounts on hundreds of platforms. Core identity correlation tool. Unique in focusing exclusively on username presence across sites.
  - *Pass A:* OSINT & Research, Core / Dashboard, Coding & Development
  - *Pass B:* Data & Analytics, Utilities & Infrastructure, OSINT & Reconnaissance
  - *SaaS/Chat:* SaaS
  - *Image:* Needs building

### second-brain (2 matching tools)

- **https://github.com/breferrari/obsidian-mind**
  - *Reason:* obsidian-mind connects Obsidian vaults with AI, letting you chat with your notes and run RAG-like queries. It’s ideal for turning your vault into an “AI first” knowledge workspace. Unique because it t
  - *Pass A:* Memory & Brain, AI Workspace, Coding & Development, Core / Dashboard
  - *Pass B:* Social Media & Marketing, Utilities & Infrastructure, Communication & Messaging
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

- **https://github.com/refactoringhq/tolaria**
  - *Reason:* 💧 Tolaria
Tolaria is a desktop app for macOS, Windows, and Linux for managing markdown knowledge bases. People use it for a variety of use cases:

Operate second brains and personal knowledge
Organize
  - *Pass A:* Automation, Coding & Development, Memory & Brain, AI Workspace, Core / Dashboard
  - *Pass B:* Data & Analytics, Content Creation & Media, AI Agent Frameworks
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

### skills-humanizer (2 matching tools)

- **https://github.com/blader/humanizer#humanizer**
  - *Reason:* Humanizer
A skill for Claude Code and OpenCode that removes signs of AI-generated writing from text, making it sound more natural and human.
  - *Pass A:* Core / Dashboard, Coding & Development, Skills & Creation
  - *Pass B:* Coding & Development, Content Creation & Media, AI & Machine Learning
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

- **https://github.com/blader/humanizer**
  - *Reason:* humanizer is a Claude Code skill that rewrites text to sound more human, removing typical AI tell‑tale signs. It adjusts tone, phrasing, and structure to be less “LLM-ish” while preserving meaning. Un
  - *Pass A:* Automation, Coding & Development, Skills & Creation, Content Creation, Core / Dashboard, AI Workspace
  - *Pass B:* Social Media & Marketing, Content Creation & Media, Data & Analytics
  - *SaaS/Chat:* Both
  - *Image:* Needs building

### skills-skillopt (2 matching tools)

- **https://duckduckgo.com/?q=github%3A+microsoft%2FSkillOpt&atb=v457-1&ko=-1&t=ddg_android&ia=web**
  - *Reason:* This DuckDuckGo search URL queries GitHub for microsoft/SkillOpt. You’d use it to quickly jump into GitHub search results for that repository and related forks. Its unique role is being a meta-search 
  - *Pass A:* OSINT & Research, Core / Dashboard, Coding & Development, Skills & Creation
  - *Pass B:* Social Media & Marketing, Content Creation & Media, Data & Analytics
  - *SaaS/Chat:* SaaS
  - *Image:* N/A - Not a GitHub URL

- **https://duckduckgo.com/?q=github%3A+microsoft%2FSkillOpt&…**
  - *Reason:* DuckDuckGo search for github: microsoft/SkillOpt. It’s a saved search pivot for discovering SkillOpt context and forks. Unique as a search artifact rather than a repo.
  - *Pass A:* OSINT & Research, Core / Dashboard, Skills & Creation, Content Creation
  - *Pass B:* Coding & Development, Data & Analytics, Content Creation & Media
  - *SaaS/Chat:* TBD
  - *Image:* N/A - Not a GitHub URL

### skills-stop-slop (1 matching tools)

- **https://github.com/hardikpandya/stop-slop**
  - *Reason:* What this is
AI writing has patterns. Predictable phrases, structures, rhythms. This skill teaches Claude (or any LLM) to catch and remove them.
  - *Pass A:* Automation, AI Workspace, Skills & Creation, Core / Dashboard
  - *Pass B:* Coding & Development, Content Creation & Media, AI & Machine Learning
  - *SaaS/Chat:* Chat
  - *Image:* Needs building

---

## 🆕 New Tools Not in Original Plan (380 tools)

Grouped by primary category (Pass A):

### Automation (159 tools)

- **https://github.com/techenthusiast167/Master-OSINT-Toolkit-**  
  - OSINT tools that can be automated (the API keys that are required will need to be obained using alias information and are NOT free. So open source alt...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/alookai/alook**  
  - Backup Alternative to Agent OS  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://tools.termuxcommands.com/tookie-osint-in-termux-installation-and-usage-guide/**  
  - Tookie-OSINT is a powerful username OSINT and social media reconnaissance tool that is used to search usernames across different websites directly fro...  
  - *SaaS/Chat:* Both | *Image:* N/A - Not a GitHub URL
- **https://github.com/elm1nst3r/GHOST-osint-crm**  
  - GHOST - Global Human Operations & Surveillance Tracking: Open-source investigation management platform for tracking people, connections, and intellige...  
  - *SaaS/Chat:* SaaS | *Image:* Needs building
- **https://github.com/screetsec/Sudomy**  
  - Sudomy is a subdomain enumeration tool to collect subdomains and analyzing domains performing automated reconnaissance (recon) for bug hunting / pente...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/usestrix/strix**  
  - Open-source AI hackers to find and fix your app’s vulnerabilities.

strix.ai    Strix are autonomous AI agents that act just like real hackers - they ...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/revfactory/harness**  
  - A meta-skill that designs domain-specific agent teams, defines specialized agents, and generates the skills they use.

revfactory.github.io/harness/  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/agentwasp/agentwasp**  
  - WASP is an operational runtime built for operators who need an agent they can actually trust to run unattended. Three architectural commitments make i...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/dograh-hq/dograh/**  
  - About
Open source voice AI platform. Self-hosted alternative to Vapi and Retell. On Prem, BYOK across Speech to Speech or LLM/STT/TTS, with a visual w...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/Crosstalk-Solutions/project-nomad**  
  - Project N.O.M.A.D. is a self-contained, offline-first knowledge and education server packed with critical tools, knowledge, and AI to keep you informe...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/yo-yo-yo-jbo/whisper_leak**  
  - Whisper Leak is a research toolkit that demonstrates how encrypted, streaming conversations with Large Language Models leak prompt information through...  
  - *SaaS/Chat:* SaaS | *Image:* Needs building
- **https://github.com/Thysrael/Horizon?utm_source=opensourceprojects.dev&ref=opensourceprojects.dev**  
  - What It Does
Horizon is a calendar application that lets you create events with a more fluid structure. Instead of forcing every event into a start an...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/anonymousRAID/OSINT-Mapping-Tool**  
  - About
An OSINT Mapping tool for research.

Topics
osint maps mapping nodes google-maps-api osinttool osint-tool osint-tools  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/ahujasid/blender-mcp**  
  - BlenderMCP - Blender Model Context Protocol Integration
BlenderMCP connects Blender to Claude AI through the Model Context Protocol (MCP), allowing Cl...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/appcypher/awesome-mcp-servers**  
  - Awesome MCP Servers Awesome
A curated list of awesome Model Context Protocol (MCP) servers. MCP is an open protocol that enables AI models to securely...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/cermak-petr/actor-yellowpages-scraper**  
  - About
Apify actor for scraping information from Yellow Pages listings based on search term and location or a list of URLs.

apify.com/petr_cermak/yell...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/chatwoot/chatwoot**  
  - About
Open-source live-chat, email support, omni-channel desk. An alternative to Intercom, Zendesk, Salesforce Service Cloud etc. 🔥💬

www.chatwoot.com...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/dittofeed/dittofeed**  
  - About
Open-source customer engagement. Automate transactional and marketing messages across email, SMS, mobile push, WhatsApp, Slack, and more 📨

ditt...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/dmtrKovalenko/fff**  
  - A file search toolkit for humans and AI agents. Really fast.

Typo-resistant path and content search, frecency-ranked file access, a background watche...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/elder-plinius/OBLITERATUS**  
  - OBLITERATUS is the most advanced open-source toolkit for understanding and removing refusal behaviors from large language models — and every single ru...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/HQarroum/docker-android**  
  - Minimal & customizable Docker image running Android emulator as a service  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/joshiayush/inb**  
  - Automate the world of LinkedIn — connection requests, messages, endorsements  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/kaymen99/google-maps-lead-generator**  
  - Extract Google Maps business leads and enrich contact details using AI  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/krayin/laravel-crm**  
  - Krayin CRM — open-source Laravel CRM  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/Madi-S/Lead-Generation**  
  - Python scripts to generate robust leads on a mass scale (~140 stars)  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/PDFCraftTool/pdfcraft**  
  - Free, privacy-focused PDF toolkit with 90 tools — runs entirely in browser  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/RasaHQ/rasa**  
  - Open-source conversational AI framework — multi-channel bot builder (16k+ stars)  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/socioboard/inboard**  
  - Inboard — social media management and analytics  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/tiledesk/tiledesk**  
  - Tiledesk — open-source live chat and chatbot platform  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/timolins/clawdbot**  
  - Personal AI assistant — Any OS, Any Platform  
  - *SaaS/Chat:* SaaS | *Image:* Needs building
- **https://github.com/topics/clawdbot?l=shell**  
  - GitHub Topics: clawdbot (shell)  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/vas3k/TaxHacker**  
  - Self-hosted AI accounting app — LLM analyzer for receipts, invoices, transactions  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/0xSteph/pentest-ai**  
  - AI-assisted pentest framework that uses LLMs to plan and execute security testing workflows. It focuses on automating common attacker playbooks while ...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/0xSteph/pentest-ai-agents**  
  - Variant focused on multiple cooperating agents working on different parts of an engagement (recon, exploitation, reporting). It’s meant to orchestrate...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/Armur-Ai/Pentest-Swarm-AI**  
  - AI-powered swarm of agents oriented around penetration testing tasks. It leverages distributed agents for different parts of the kill chain. Unique in...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/bugbasesecurity/pentest-copilot**  
  - “Copilot” style assistant specialized for pentest workflow: suggests tests, payloads, and next steps based on context. Integrates closely with pentest...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/FerroxLabs/ijfw**  
  - Framework for building injection/ fuzzing/ web exploitation workflows. Likely used to automate repeated exploit attempts. Unique because it’s more abo...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/GH05TCREW/pentestagent**  
  - Pentest-oriented agent integrating several tools and workflows behind a single interface. Its goal is to give an “agentic” front-end to a pentest tool...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/huhusmang/Awesome-LLMs-for-Vulnerability-Detection**  
  - Curated list of LLM-based vulnerability detection projects and research. Great for exploring model-driven code auditing tools. Unique in that it is me...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/frishtik/osint-tools-mcp-server**  
  - MCP server exposing OSINT tools as skills to MPC‑compatible clients (e.g., Claude desktop). Ideal for your “build agents out of tools” workflows. Uniq...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/gwen001/github-subdomains**  
  - GitHub-based subdomain discovery using repo content. Ideal when subdomains exist only in code/config. Unique in focusing purely on GitHub as the data ...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/agent0ai/agent-zero**  
  - General-purpose open-source AI agent framework. Designed for building multi-tool, multi-step agents. Unique as a generic core agent framework not lock...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/Agenvoy (pardnchiu/Agenvoy)**  
  - Agent environment or orchestration layer (name implies Agent + Convoy). Helps manage fleets of agents. Unique in focusing on orchestrating multiple ag...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/mukul975/Anthropic-Cybersecurity-Skills**  
  - Collection of predefined cybersecurity “skills” for Anthropic/Claude. Lets you quickly wire security reasoning inside Claude. Unique because it’s focu...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools**  
  - Collection of system prompts and model configs for many AI tools. Very valuable for your meta‑learning about how others structure agents. Unique becau...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/Agenty/scrapingai**  
  - AI-augmented scraping framework; integrates models into scraping pipelines. Good for your “lead gen + AI summarization” funnels. Unique because it ble...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/cporter202/api-mega-list (via repodir link)**  
  - Mega list of APIs categorized by domain. Great discovery layer for building SaaS integrations. Unique in its API breadth versus typical “public-apis”.  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/D4Vinci/Scrapling**  
  - Web scraper that emphasizes ant-bot measures and robustness. Good base for stealth scraping flows. Unique because it’s focused on resilience against a...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/firecrawl/firecrawl**  
  - Crawler that converts sites into structured data (markdown/JSON) with LLM assistance. Excellent for building knowledge bases from websites. Unique for...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/public-apis/public-apis**  
  - Huge list of free/public APIs across many domains. A go-to for finding inputs for your agents. Unique as the canonical public API index.  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/affaan-m/everything-claude-code**  
  - Central repo about Claude Code usage, tips, and workflows. Great for mining patterns for your own Claude-based agents. Unique as a Claude-Code-specifi...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/luongnv89/claude-howto**  
  - Practical “how‑to” examples for Claude integration. Good for quick reference on typical patterns. Unique for being step-by-step rather than just snipp...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/nicedreamzapp/claude-code-local**  
  - Run Claude Code‑style workflows locally with your own stack. Very interesting for privacy/hardening. Unique in that it tries to replicate Claude Code ...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/langflow-ai/langflow**  
  - Node-based visual builder for LLM workflows (agents, tools, RAG). Great for orchestrating your multi-tool systems visually. Unique for having a visual...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/blakeblackshear/frigate**  
  - NVR solution for IP cameras with real-time object detection. Nice candidate for local AI video analytics. Unique because it merges security cams and A...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/netgoat-xyz/netgoat**  
  - Likely a lab environment or toolkit for network security/goat‑targets. Good for training and testing. Unique if it provides vulnerable-by-design scena...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://www.autodesk.com/products/flow-studio/overview**  
  - Autodesk Flow Studio for production workflows (media pipeline orchestration). Could be relevant for high-end content pipelines. Unique as a big-enterp...  
  - *SaaS/Chat:* Both | *Image:* N/A - Not a GitHub URL
- **https://appsumo.com/products/flexifunnels/**  
  - FlexiFunnels lifetime/SaaS funnel builder. Could complement your current funnel-hosting setup. Unique for its AppSumo-oriented pricing and integration...  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **https://botcommerce.app/lifetime-deal/**  
  - BotCommerce for chatbot-driven e‑commerce flows. Fits nicely into AI store funnels. Unique as a bot-first ecommerce engine.  
  - *SaaS/Chat:* Both | *Image:* N/A - Not a GitHub URL
- **https://github.com/scaleapi/scale-agentex**  
  - scale-agentex is Scale’s open-source example of advanced agent architectures, showcasing planning, tool‑use, and evaluation patterns. It’s intended as...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/techenthusiast167/OSINTMAILER-**  
  - OSINTMAILER is a Python OSINT tool focused on analyzing email addresses across social media, known breaches, and open data to build a digital footprin...  
  - *SaaS/Chat:* SaaS | *Image:* Needs building
- **https://github.com/OpenOSINT/OpenOSINT**  
  - OpenOSINT is an AI‑powered OSINT agent for the terminal that uses Claude, GPT‑5 or local models to investigate emails, usernames, domains, and other i...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/Hack-with-Github/Awesome-Hacking**  
  - Awesome-Hacking is a large curated list of hacking resources, tutorials, tools, and challenges maintained by the Hack-with-Github community. It’s a po...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/Binomica-Labs/SpliceCraft**  
  - SpliceCraft is a tool for editing and transforming code or data (often bioinformatics/“splicing” adjacent) using programmable rules. It may integrate ...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/pullfrog/pullfrog (already above)**  
  - See above: AI GitHub bot.  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/elkentaro/sharkbot**  
  - Sharkbot likely addresses detection or analysis related to the Sharkbot malware family (Android banking trojan), or it may be a separate security tool...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://thehackernews.com/2026/05/weekly-recap-linux-flaws-defender-0.html?m=1#:~:text=DevilNFC%20and%20NFCMultiPay%20Android%20NFC%20Relay%20Malware%20Spotted**  
  - This is a Hacker News weekly recap article highlighting several security stories, including DevilNFC and NFCMultiPay Android NFC relay malware campaig...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://www.opensourceprojects.dev/post/optimizerduck (meta)**  
  - Already mentioned as a project profile—can be used alongside API lists when browsing for optimization-related tools.  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://www.autodesk.com/products/flow-studio/overview?utm_id=120239989537040476**  
  - Autodesk Flow Studio is a workflow/orchestration product for media and production pipelines. You can use it as a model for higher-end orchestration or...  
  - *SaaS/Chat:* Both | *Image:* N/A - Not a GitHub URL
- **https://github.com/adithya-s-k/omniparse**  
  - OmniParse is a document and media ingestion platform that converts almost any unstructured content (PDF, Office docs, images, audio, video, web pages)...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/vigolium/vigolium**  
  - The public site describes Vigolium as an open-source agentic vulnerability scanner that combines deterministic scanning with AI‑driven audits. It ship...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://repodir.com/repo/nilbuild-developer-roadmap**  
  - This Repodir entry points to a “developer roadmap” repository that likely structures learning paths and skills for becoming a developer. It aggregates...  
  - *SaaS/Chat:* Both | *Image:* N/A - Not a GitHub URL
- **https://repodir.com/repo/cporter202-scraping-apis-for-devs**  
  - This page indexes a repo that catalogs scraping-friendly APIs and techniques specifically targeted at developers. It’s particularly useful when you’re...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://github.com/thewhiteh4t/FinalRecon**  
  - FinalRecon is an all‑in‑one web reconnaissance tool that performs subdomain discovery, port scanning, directory enumeration, and more against a target...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/sepivip/SeekerClaw**  
  - SeekerClaw is a fork or extension of Seeker that integrates with the “Claw” ecosystem (e.g., Claude skills/Claw bots) to automate geolocation campaign...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/CarterPerez-dev/Cybersecurity-Projects**  
  - This repo aggregates practical cybersecurity projects—from labs to scripts—for learning and demonstrating offensive and defensive techniques. It’s a g...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/SnailSploit/Claude-Red**  
  - Claude-Red is a curated library of offensive security skills for the Claude skills system, extending Claude with 100+ modules covering web security, A...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/OpenBMB/VoxCPM**  
  - VoxCPM is an open-source voice foundation model (multi-lingual, multi-speaker) from OpenBMB for speech understanding and generation. It’s suitable for...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://cybernews.com/security/ai-voice-bots-hidden-audio-hijack-attacks/?source=cn_facebook&medium=social&campaign=cybernews&content=post**  
  - This Cybernews article explores how AI voice bots and hidden audio channels can be hijacked for covert communication or command injection. It discusse...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://www.opensourceprojects.dev/post/omnivoice-studio**  
  - This page profiles “OmniVoice Studio,” an open-source or indie voice project, summarizing its features, tech stack, and stats. You can quickly gauge w...  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **http://sv101.ifastnet.com/cookies.html**  
  - This is a basic cookie policy page on an ifastnet-hosted site. It’s not itself a tool but could be part of a lab, training environment, or old asset. ...  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **https://github.com/kaifcodec/user-scanner**  
  - user-scanner appears to be a user enumeration/scanning tool, likely checking usernames or accounts across services or scanning local systems for user-...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://blink.new/pricing**  
  - Blink.new’s pricing page details costs and tiers for its product (likely a dev tool, app builder, or notebook environment given the .new domain). It m...  
  - *SaaS/Chat:* Both | *Image:* N/A - Not a GitHub URL
- **https://github.com/unicodeveloper/globalthreatmap**  
  - GlobalThreatMap aggregates threat intelligence data and visualizes cyber attacks and indicators on a world map. This can be used for situational aware...  
  - *SaaS/Chat:* SaaS | *Image:* Needs building
- **https://red-team.tools/course-bundle/photo-and-video-exploit-for-android-and-ios/**  
  - This is a commercial course bundle focused on exploiting photo and video handling on Android and iOS. It teaches how media processing pipelines can be...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://github.com/Giskard-AI/giskard-oss**  
  - Giskard is an open-source Python library for evaluating AI systems, including LLMs, RAG agents, and traditional ML models. It detects hallucinations, ...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://huggingface.co/SulphurAI/Sulphur-2-base**  
  - Sulphur-2-base is a base LLM checkpoint hosted on Hugging Face. It’s designed as a foundation model for downstream specialization, fine-tuning, and ex...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://github.com/higgsfield-ai/higgsfield**  
  - Higgsfield is an AI content creation / generation platform, with the repo providing SDKs, examples, or tools around their models. It appears aimed at ...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/H-mmer/pentest-agents**  
  - pentest-agents is an AI-driven pentest framework where agents plan and execute security testing tasks. It coordinates LLM-based reasoning with actual ...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/six2dez/reconftw**  
  - reconFTW is a fully automated recon framework that chains a large number of tools for subdomains, ports, web content, and vulnerabilities. It’s design...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/volcengine/OpenViking**  
  - OpenViking is an open-source context database / “context file system” for AI agents, with filesystem-based management, hierarchical context loading, a...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://www.google.com/search?q=Data%20scraper%20AI%20Agents%20open%20source%20github**  
  - This Google search URL is a meta link to search results for “Data scraper AI Agents open source GitHub.” It’s useful as a saved pivot to discover addi...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://huggingface.co/blog/samihalawa/automating-lead-generation-with-ai**  
  - This Hugging Face blog post explains how to build an AI-automated lead generation pipeline, combining web scraping, enrichment, and LLM-powered outrea...  
  - *SaaS/Chat:* Both | *Image:* N/A - Not a GitHub URL
- **https://github.com/earthtojake/text-to-cad**  
  - text-to-cad is a project that converts natural language descriptions into 3D CAD models using procedural generation. It shows how to translate textual...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/topics/ai-osint**  
  - This GitHub topic aggregates repositories that combine AI with OSINT—agents, assistants, and pipelines for intelligence gathering. It lets you quickly...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://www.google.com/search?q=Jail-break.ai%20open%20source%20agents%20github**  
  - This Google query URL searches for “Jail-break.ai open source agents GitHub.” It’s effectively a saved pivot to discover more jailbreak‑related agent ...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://github.com/ssrajadh/sentrysearch**  
  - SentrySearch is a tool for scanning Git repositories (local or remote) to detect secrets, credentials, and sensitive patterns. It’s useful for prevent...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://www.gitreverse.com/**  
  - GitReverse is a website that analyzes Git repositories, helping you reverse-engineer project structure, dependencies, or history from a URL. It can su...  
  - *SaaS/Chat:* Both | *Image:* N/A - Not a GitHub URL
- **https://allenai.org/multimodal-models**  
  - This Allen Institute for AI page summarizes their work on multimodal models, including capabilities and research directions. It’s a knowledge resource...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://github.com/calesthio/Crucix?ref=opensourceprojects.dev**  
  - Crucix is a project (referenced via opensourceprojects.dev) that you’ve bookmarked in the context of open-source experimentation. It likely focuses on...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/PolymathicAI/the_well/**  
  - the_well is a 15 TB collection of physics simulation datasets covering 16 domains (fluids, biological systems, acoustic scattering, MHD, supernovae, e...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://3dsvg.design/**  
  - 3dsvg.design is a site for creating and working with 3D SVG designs. It likely provides design tools, generators, or templates for vector-based 3D ima...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://www.blueprint.am/**  
  - blueprint.am is a product (likely a planning/blueprint tool) with a visually-oriented interface for mapping ideas, plans, or systems. It may offer tem...  
  - *SaaS/Chat:* Both | *Image:* N/A - Not a GitHub URL
- **https://www.skills.sh/browserbase/skills/autobrowse**  
  - This Skills.sh page describes an “autobrowse” Skill for Browserbase, exposing high-level browsing capabilities (open, click, extract) as a skill primi...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://github.com/NawfalMotii79/PLFM_RADAR**  
  - PLFM_RADAR is an open-source 10.5 GHz phased-array RADAR system, including hardware design, firmware, and processing code. It’s designed as a low-cost...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://safishamsi/graphify → https://github.com/safishamsi/graphify**  
  - Graphify is a project (context suggests graph tooling for AI, e.g., LangGraph-like agents or graph‑based workflows). It likely provides primitives for...  
  - *SaaS/Chat:* Both | *Image:* N/A - Not a GitHub URL
- **https://www.google.com/sorry/index?continue=… (YouTube + mcp_token)**  
  - This is a Google “Sorry” (reCAPTCHA/abuse protection) page that appears when automated or unusual access patterns are detected on a YouTube URL. It in...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://hexsec.netlify.app/**  
  - HexSec is a small site (Netlify-hosted) that likely showcases infosec content, tools, or a persona/brand you bookmarked. You can mine it for design an...  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **https://mapstocash.com/free-website-871576?campaign_id=… (two UTM variants)**  
  - These MapstoCash URLs are campaign-specific landers promising a free website built from Google Maps leads. The core idea is converting map listings in...  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **https://app.emergent.sh/landing/**  
  - Emergent.sh landing page: likely a product or course around AI, agents, or emergent behavior. It’s valuable for understanding modern positioning for A...  
  - *SaaS/Chat:* Both | *Image:* N/A - Not a GitHub URL
- **https://hoo.be/marckaz**  
  - Hoo.be profile page for Marc Kaz, aggregating his links (content, socials, offers). You can study his content and funnels. Unique as a creator hub you...  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://payhip.com/InspiredLibrary**  
  - InspiredLibrary is a Payhip store selling digital products (books, templates, courses) about productivity, learning, or AI. You can treat it as anothe...  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://ai.erickavelaars.com/ads-opt-in?…**  
  - This is an ad opt‑in landing page for Eric Kavelaars’ AI-related offer (likely AI ads or funnels). Useful as a real-world example of high-converting o...  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://restream.io/signup?continue=… & https://restream.io/dr/upload-and-stream?… & https://restream.io/pricing?…**  
  - These are Restream signup, upload-and-stream, and pricing pages. Restream powers multistreaming (simultaneously broadcast to YouTube, Twitch, etc.), m...  
  - *SaaS/Chat:* Both | *Image:* N/A - Not a GitHub URL
- **https://jail-break.chat/**  
  - Jail-break.chat is a site dedicated to jailbreak prompts and experiments for AI models. It collects prompts and results, useful both to red-team your ...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://www.redhat.com/en**  
  - Red Hat’s main site; relevant for enterprise Linux, OpenShift, Kubernetes, and long-term support. It’s the place to look when you want hardened, enter...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://getle.ad/?… (also under D)**  
  - Lead-gen product; see above.  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://www.spooky2.com/products/?utm_id=…**  
  - Spooky2’s products page lists frequency generators and Rife-style hardware systems. While fringe scientifically, it’s interesting as a niche, high-mar...  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://www.mobile-hacker.com/**  
  - Mobile-Hacker is a hardware/software brand around phones, hacking tools, and mobile security gear. It showcases bundles, tools, and likely training ar...  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://github.com/GP-commits/Git-Secrets**  
  - Git-Secrets is a repo focused on detecting and handling secrets in Git repositories (naming contextually aligned with secret detection best practices ...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/thinkbold-solutions/GHLDOCS**  
  - GHLDOCS appears to be documentation or templates for a broader GHLD (GitHub-related or dev tooling) solution. It may host docs, config files, or templ...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/sooryathejas/METATRON**  
  - METATRON is a CLI-based AI-powered penetration testing assistant that runs entirely on your local machine with a local LLM—no cloud, no API keys, no s...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://socialauditpro.com/how-to-retrieve-a-list-of-your-followers-from-instagram/**  
  - This article explains methods/tools to extract a list of your Instagram followers. It covers API, scraping, or third-party tool approaches. Unique as ...  
  - *SaaS/Chat:* Both | *Image:* N/A - Not a GitHub URL
- **https://aiblackmagic.com/?utm_id=…**  
  - AI Black Magic appears to be a brand around advanced AI prompt engineering or secret tactics. The landing is likely copy-focused, promising “black mag...  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://drive.google.com/drive/mobile/folders/14jjSnprC7AxqPCo8pl6hDZYtg8tuehs-**  
  - Drive folder with your own materials. Same use-case: internal corpus. Unique as seed material for proprietary agents.  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://appsumo.com/products/the-black-friday-bundle/?… (already above)**  
  - Bundle of tools/courses.  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **https://academy.pyxa.ai/bundles**  
  - Pyxa Academy bundles—training packages on AI engineering, agents, or related topics. These are helpful for understanding how pros package curricula. U...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://www.hiddenclearances.com/?ref=ig**  
  - HiddenClearances offers help navigating security clearance processes or revealing hidden government job/contracting pipelines. It plays in the governm...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://appsumo.com/products/flexifunnels/ (already in C)**  
  - Funnel builder listing; see above.  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **https://github.com/llm-exe/llm-exe and https://github.com/gregreindel/llm-exe?utm_id=…**  
  - llm-exe is a TypeScript/JavaScript library providing base components to build and maintain LLM-powered applications: typed functions, unified API acro...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/OpenBB-finance/OpenBB%EF%BF%BC**  
  - Core OpenBB repo (terminal/platform) for investment research and analytics. It aggregates data sources, charting, and analysis features. Unique as a f...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/FinancialDiets/OpenBBTerminal-Finance**  
  - A specialization of OpenBB Terminal tailored to personal finance workflows / The Financial Diet audience. It adds curated views and defaults. Unique i...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/safishamsi/graphify**  
  - Graphify is a graph-based framework (likely for AI workflows or graph data) you bookmarked. It structures workflows/data as graphs. Unique in pushing ...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/open-jarvis/OpenJarvis**  
  - OpenJarvis is a research framework for composable, on‑device AI systems designed to build personal AI agents that run primarily on your own hardware. ...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/elementalsouls/Claude-BugHunter**  
  - Claude-BugHunter is a Claude Code skill bundle for bug hunting and external red‑team work: 51 skills, 15 slash commands, and 681 disclosed-report patt...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/withkynam/vibecode-pro-max-kit/**  
  - vibecode-pro-max-kit is a bundle of tools, templates, and workflows for building “vibe” code/brands. Likely focused on creative coding/branding. Uniqu...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/arainho/awesome-api-security**  
  - Curated list on API security: best practices, tools, and resources. Useful for designing secure API-facing systems. Unique as the API security-focused...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/confident-ai/deepteam**  
  - DeepTeam is a simple-to-use, open-source red teaming framework for LLM systems. Think of it as penetration testing, but for LLMs.

DeepTeam simulates ...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/1N3/Sn1per**  
  - About
Automated penetration testing & attack surface management platform. Recon, scan, exploit, report — 600+ exploits, 90+ integrations, 10K+ detecti...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/psiinon/open-source-web-scanners**  
  - open-source-web-scanners
A list of open source web security scanners on GitHub and GitLab, ordered by Stars. It does not provide in-depth analysis - f...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/pydantic/monty**  
  - Experimental - This project is still in development, and not ready for the prime time.

A minimal, secure Python interpreter written in Rust for use b...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/agent-infra/sandbox**  
  - sandbox
All-in-One Sandbox for AI Agents that combines Browser, Shell, File, MCP and VSCode Server in a single Docker container.  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://fusion.adam.new/install**  
  - Install Adam – AI Copilot
Your AI copilot for Autodesk Fusion. Drives your CAD natively with agents.  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://github.com/braedonsaunders/codeflow**  
  - About
Paste any GitHub URL → interactive architecture map. See how files connect, find what breaks if you change something. No install, no accounts — ...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/AMAP-ML/SkillClaw?utm_source=opensourceprojects.dev&ref=opensourceprojects.dev**  
  - SkillClaw: Evolving Agent Skills From Real Conversations
Imagine you've built an AI agent that handles customer support. It starts out competent, but ...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/0xMassi/webclaw**  
  - About
Fast, local-first web content extraction for LLMs. Scrape, crawl, extract structured data — all from Rust. CLI, REST API, and MCP server.

webcl...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/YusufB5/ASCILINE**  
  - About
A high-performance, real-time ASCII video rendering engine. Streams binary-encoded frames via WebSockets for ultra-low latency, 30 FPS playback ...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/JCodesMore/ai-website-cloner-template**  
  - About
Clone any website with one command using AI coding agents

dsc.gg/jcodesmore  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://termux.achik.us/darkfly-in-termux-installation-and-usage-commands/**  
  - DarkFly-Tool in Termux – Installation & Usage Commands
DarkFly-Tool is an all-in-one Termux toolkit that provides a large collection of ethical hackin...  
  - *SaaS/Chat:* Both | *Image:* N/A - Not a GitHub URL
- **https://github.com/DietrichGebert/ponytail**  
  - About
Makes your AI agent think like the laziest senior dev in the room. The best code is the code you never wrote.  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/TencentCloud/TencentDB-Agent-Memory**  
  - About
TencentDB Agent Memory delivers fully local long-term memory for AI Agents via a 4-tier progressive pipeline, with zero external API dependencie...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/Donchitos/Claude-Code-Game-Studios**  
  - About
Turn Claude Code into a full game dev studio — 49 AI agents, 72 workflow skills, and a complete coordination system mirroring real studio hierar...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/santifer/career-ops**  
  - About
AI-powered job search system built on Claude Code. 14 skill modes, Go dashboard, PDF generation, batch processing.

career-ops.org  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/nextlevelbuilder/ui-ux-pro-max-skill**  
  - About
An AI SKILL that provide design intelligence for building professional UI/UX multiple platforms

www.uupm.cc/  
  - *SaaS/Chat:* SaaS | *Image:* Needs building
- **https://github.com/czlonkowski/n8n-mcp**  
  - About
A MCP for Claude Desktop / Claude Code / Windsurf / Cursor to build n8n workflows for you

www.n8n-mcp.com/  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://huggingface.co/nvidia/nemotron-3.5-asr-streaming-0.6b**  
  - Nemotron 3.5 ASR is a multilingual, streaming Automatic Speech Recognition (ASR) model engineered to deliver high-quality multilingual transcription a...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://github.com/LLMQuant/awesome-trading-agents**  
  - About
Curated list of LLM-driven trading agents, MCP servers, and agent skills for market research, strategy, and execution.  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/infoslack/awesome-web-hacking**  
  - awesome-web-hacking
This list is for anyone wishing to learn about web application security but do not have a starting point.

You can help by sending...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/mukul975/Privacy-Data-Protection-Skills**  
  - About
282+ structured privacy & data protection skills for AI agents. GDPR, CCPA, EU AI Act, HIPAA, LGPD, PIPL, DPDP Act.  
  - *SaaS/Chat:* Chat | *Image:* Needs building

### OSINT & Research (110 tools)

- **https://github.com/pardnchiu/Agenvoy**  
  - Clear Agent OS replacement  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/Z4nzu/hackingtool**  
  - Libarary of Hacking Tools  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/husnainfareed/awesome-ethical-hacking-resources**  
  - Ethical hacking resources  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/vflame6/leaker**  
  - OSINT intel gatherig tool (Paid and free API keys required)  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://tools.termuxcommands.com/ghosttrack-termux-tutorial-installation-and-usage/**  
  - GhostTrack is a simple information gathering tool that finds publicly available details related to IP addresses, phone numbers, and usernames. It help...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://tools.termuxcommands.com/how-to-install-and-use-recon-ng-in-termux/**  
  - Recon-ng is a powerful web reconnaissance framework that helps collect publicly available information related to domains, hosts, IP addresses, and oth...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://github.com/ageitgey/face_recognition**  
  - face_recognition
The world's simplest facial recognition api for Python and the command line  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/rawfilejson/awesome-osint-arsenal**  
  - OSINT Arsenal  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/trufflesecurity/trufflehog**  
  - About
Find, verify, and analyze leaked credentials

trufflesecurity.com  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/s0md3v/be-a-hacker**  
  - About
roadmap for a self-taught hacker  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/JoasASantos/OSCE3-Complete-Guide**  
  - OSWE, OSEP, OSED, OSEE

Topics
offensive-security offsec oscp osce osee oswe oswe-prep osep osed oswe-guide osep-prep osce3
Resources
 Readme  
  - *SaaS/Chat:* SaaS | *Image:* Needs building
- **https://github.com/jonaslejon/malicious-pdf**  
  - 💀 Generate malicious PDF test files for testing phone-home callbacks, SSRF, XSS, NTLM credential theft, and data exfiltration in PDF viewers, converte...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/mandiant/flare-learning-hub**  
  - Free educational content on reverse engineering and malware analysis from the FLARE team  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/aasthas2022/ColdContactXLSX**  
  - Overview
This project automates the process of sending cold emails from a job seeker (you) to recruiters. It utilizes common email address patterns to...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/aishwaryanr/awesome-generative-ai-guide**  
  - About
A one stop repository for generative AI research updates, interview resources, notebooks and much more!

www.linkedin.com/in/areganti/
Topics
aw...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/calesthio/Crucix**  
  - About
Your personal intelligence agent. Watches the world from multiple data sources and pings you when something changes.

crucix.live  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/gosom/google-maps-scraper**  
  - Google Maps scraper — Go-based, extracts name, address, phone, URL, rating, reviews  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/laramies/theHarvester**  
  - E-mails, subdomains and names Harvester — OSINT tool (~12k stars)  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/omkarcloud/google-maps-scraper**  
  - Extract names, addresses, phones, reviews, websites from Google Maps (~1.4k stars)  
  - *SaaS/Chat:* SaaS | *Image:* Needs building
- **https://github.com/PurpleAILAB/Decepticon**  
  - Autonomous Hacking Agent for Red Team  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/ruzinst/enoai**  
  - Steno — AI powered intelligence layer for confidential conversations  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/tinyhumansai/openhuman**  
  - Personal AI super intelligence — Private, Simple, extremely powerful  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/Wikkiee/LeadGenPy**  
  - Google Maps scraper → ChatGPT personalized email → auto-send pipeline  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/ASCIT31/Dark-Moon**  
  - Pentest-oriented toolkit (offensive scripts/utilities). Useful as a red‑team toolbox rather than a single-purpose scanner. Stands out by bundling mult...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/crowdsecurity/crowdsec**  
  - Collaborative intrusion detection & prevention, consumable by defenders or adversarial lab setups. Uses crowd‑sourced scenarios to detect common attac...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/gadievron/raptor**  
  - Red‑team/offensive security toolkit; can include automated exploitation and lateral movement helpers. Useful for adversary simulation. Unique for focu...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/hahwul/MobileHackersWeapons**  
  - Curated list of tools for mobile hacking and pentesting (Android/iOS). Good entry point for mobile-specific stacks. Unique because it’s focused on mob...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/KingOfBugbounty/KingOfBugBountyTips**  
  - Large collection of bug bounty tips, payloads, and methodology. Very actionable for web bug bounty hunters. Unique: practical, field-tested tips tailo...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/nahamsec/Resources-for-Beginner-Bug-Bounty-Hunters**  
  - Resource list specifically for beginners in bug bounty. Contains links, videos, tool recommendations, and methodology. Unique because it’s strongly be...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/OWASP/DockSec**  
  - OWASP project to secure Docker/container environments. Useful to pentesters and defenders assessing container posture. Unique because it’s Docker/cont...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/ytisf/theZoo**  
  - Repository of live malware samples (for research, AV testing, analysis). Useful in malware labs and AV evaluation. Unique because it intentionally agg...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://red-team.tools/tools/**  
  - Directory of red‑team tools spanning exploit, phishing, C2, etc. Good “shopping list” for building a red‑team stack. Unique as a vendor/tool aggregato...  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **https://github.com/Astrosp/Awesome-OSINT-List**  
  - Large curated list of OSINT tools and resources. Great starting map of the OSINT landscape. Unique because it aggregates many OSINT repos in one place...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/Astrosp/Awesome-OSINT-For-Everything**  
  - Similar OSINT mega-list but organized by specific use cases (“for everything”). Helps match tools to scenarios. Unique in its “for-everything” framing...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/cipher387/osint_stuff_tool_collection**  
  - Collection of small OSINT tools and scripts. Handy for quick niche OSINT tasks. Unique because it focuses on lots of small, focused utilities instead ...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/elementalsouls/Claude-OSINT**  
  - Claude-integrated OSINT assistant that wraps multiple recon sources. Lets you query targets in natural language. Unique because it fuses OSINT with Cl...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/obheda12/GitDorker**  
  - Automates GitHub dorking to find secrets and sensitive data in public repos. Great for code/secret OSINT. Unique focus on GitHub search patterns rathe...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/projectdiscovery/subfinder**  
  - Subdomain enumeration tool by ProjectDiscovery. Good integration into automated recon pipelines. Unique in combining speed with use of many passive da...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/skynet0x01/tugarecon**  
  - Recon framework for targets combining multiple sub‑tools. Useful as an integrated recon runner. Unique as a “meta runner” rather than a single-purpose...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/vil/h4x-tools**  
  - Bundle of recon and OSINT scripts. More of a personal toolbox. Unique because it mixes network, web, and OSINT helpers in one repo.  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://hackingpassion.com/dorks-eye/**  
  - Web GUI for search dorks OSINT (Google, etc.). Good for quick web‑based reconnaissance without CLI. Unique because it’s a browser‑based dork helper.  
  - *SaaS/Chat:* Both | *Image:* N/A - Not a GitHub URL
- **https://hackingpassion.com/shodan-eye/**  
  - Web front-end for Shodan-based OSINT. Simplifies device discovery via Shodan queries. Unique as a simple UI on top of Shodan search.  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **https://dorksearch.com/**  
  - Dork search engine for quick queries. Useful when you don’t want to write dorks manually. Unique as a dork-specific meta‑engine.  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **https://github.com/hisxo/gitGraber**  
  - Real-time GitHub monitoring for secrets and sensitive patterns. Good for continuous OSINT on code exposures. Unique in its streaming/monitor vibe rath...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/Rishabh-creator601/Books**  
  - OSINT/resource repo but focused on PDF/books for learning. Helps build your own OSINT library. Unique in being “books as OSINT resources”.  
  - *SaaS/Chat:* SaaS | *Image:* Needs building
- **https://github.com/AISecurityLab/hackagent**  
  - Security-focused AI agent for offensive/defensive tasks. Bridges AI planning with security tools. Unique as a “security-only” agent built by an AI sec...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/msitarzewski/agency-agents**  
  - Set of agents oriented around agency-style operations (research, outreach, etc.). Fits your “micro-SaaS agents” mindset. Unique in being targeted at b...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/HarmonicSecurity/claudit-sec**  
  - Security auditing framework for Claude/LLM prompts and flows. Useful for checking prompt injections, data exfil risks. Unique as a “Claude-specific” a...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/microsoft/agent-governance-toolkit**  
  - Microsoft toolkit for governance of AI agents: guardrails, policies, monitoring. Good blueprint for how to govern agent behaviors. Unique due to being...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/topics/ai-jailbreak-universal**  
  - GitHub aggregated topic for universal jailbreak tooling. Curated via GitHub topic search. Unique as a discovery surface rather than a concrete impleme...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.blog/security/hack-the-ai-agent-build-agentic-ai-security-skills-with-the-github-secure-code-game/**  
  - GitHub blog/secure-code game teaching agentic AI security. Great at framing security skills via gamification. Unique as an educational game, not just ...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://github.com/trimstray/the-book-of-secret-knowledge**  
  - Huge sysadmin/devops/infosec knowledge dump. Excellent for broad system-level awareness. Unique breadth across networking, Linux, security, and tools.  
  - *SaaS/Chat:* SaaS | *Image:* Needs building
- **https://github.com/pi-hole/pi-hole**  
  - Network-wide ad/tracker blocking DNS sinkhole. Perfect for your privacy/OPSEC rigs. Unique as a widely adopted “network Pi‑hole” appliance.  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/GyulyVGC/sniffnet**  
  - Cross-platform network traffic monitor with friendly UI. Great for visualizing what’s happening on your boxes. Unique for its UX vs. typical CLI sniff...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://yycsnakes.com/andrax/download.html**  
  - Android-based pentest distribution. Good for mobile on-the-go pentesting. Unique as an Android platform rather than VM/ISO.  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **https://www.withraven.ai/**  
  - Raven AI product (likely for note-taking, summarization, or meeting intelligence). Integrates with your AI workflow stack. Unique depending on specifi...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://github.com/reconurge/flowsint**  
  - Flowsint is a graph-based OSINT and cyber-investigation platform that lets you represent entities (domains, IPs, emails) as nodes and run “transforms”...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/OpenOSINT/OpenOSINT (already above)**  
  - See above: terminal OSINT agent with LLMs and MCP.  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/z0m31en7/WhatMail**  
  - WhatMail is an OSINT tool designed to gather information about email addresses, such as associated breach data, metadata, and potentially linked accou...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/LionSec/katoolin**  
  - Katoolin is a script that lets you install Kali Linux tools on Ubuntu/Debian-based systems. Instead of running a separate Kali VM, you can bring many ...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/yusing/godoxy**  
  - Godoxy appears to be a security or proxy tool (name suggests “go” + “proxy”). It likely provides a Go-based HTTP/TLS proxy for traffic inspection or a...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/Hack-with-Github/Awesome-Hacking (also in C)**  
  - Beyond tools, this list is a learning roadmap with training resources.  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/pullfrog/pullfrog (also in D)**  
  - Offers a research angle on AI code-review patterns as well as a tool.  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/Dheerajmadhukar/karma_v2**  
  - karma_v2 is a passive OSINT automated reconnaissance framework for infosec researchers and bug bounty hunters. It uses Shodan and other sources to dis...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/sepivip/Seeker**  
  - Seeker is a tool for gathering detailed geolocation information by generating a phishing page and capturing user device/location data via web APIs. It...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/elm1nst3r/GHOST-osint-crm (already above)**  
  - See above.  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://www.achik.us/theharvester-tutorial-for-beginners/**  
  - This is a beginner-friendly tutorial explaining how to use theHarvester, a well-known OSINT tool for collecting emails, hosts, and subdomains from pub...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://github.com/urbanadventurer/Android-PIN-Bruteforce**  
  - This tool exploits Android’s adb interface to brute-force the PIN of a locked device (under certain conditions) by simulating input attempts while byp...  
  - *SaaS/Chat:* SaaS | *Image:* Needs building
- **https://github.com/rix4uni/GarudRecon**  
  - GarudRecon is a recon tool that automates information gathering on targets, combining multiple techniques for domain/IP intelligence. It aims to simpl...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/AKCODEZ/hackingtool-plugin**  
  - This repo provides a plugin for the larger “hackingtool” framework, adding extra recon or exploitation features. It extends an existing ecosystem rath...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://www.reddit.com/r/OSINT/comments/1opzeng/experimenting_with_ai_agents_osint_tools/?…**  
  - This Reddit thread describes the author’s experience “experimenting with AI agents + OSINT tools” and introduces the above MCP server. It provides con...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://www.netgear.com/mobile-wifi/hotspots/mh7150/?campaign_id=…**  
  - This Netgear product page details the MH7150 mobile WiFi hotspot, including specs, bands, speeds, and battery. It matters if you want a portable conne...  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://www.zerotrusted.ai/**  
  - ZeroTrusted.ai is a site focused on AI + zero-trust security (products, consulting, or content). It can provide patterns for mixing AI and zero-trust ...  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://github.com/abhigyanpatwari/GitNexus**  
  - GitNexus is a project for organizing and managing Git repositories with AI assistance (e.g., summarization, search, mapping). It helps you understand ...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://jobsiterecon.com/?utm_id=…**  
  - JobSiteRecon is likely a SaaS for reconning job sites or job postings (lead gen, competitor tracking, OSINT on hiring signals). It probably surfaces c...  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://jobsiterecon.com/?utm_id=… (already above)**  
  - Same product; different tracking.  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://github.com/abhigyanpatwari/GitNexus (also in C)**  
  - Git intelligence; see above.  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://us.starlabs.systems/pages/byte?campaign_id=…**  
  - Star Labs’ Byte page advertises a small workstation/laptop optimized for devs/hackers. Great candidate as a dedicated “agent workstation” or portable ...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://ultimatewebscraper.com/ (also under D)**  
  - Scraping product; see above.  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://rambleofficeanywhere.com/products/the-destination**  
  - “The Destination” is another mobile office product—desk/monitor/gear solution—for working from anywhere. It targets professionals who want a consisten...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://netool.io/?utm_id=…**  
  - Netool sells handheld network analysis hardware that quickly maps network info (VLAN, switchport, etc.). It’s used by network engineers to identify in...  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **https://app.selfpublishing.ai/**  
  - SelfPublishing.ai is a tool/platform for AI-assisted book creation, layout, and publishing. It helps generate manuscripts, covers, and metadata. Uniqu...  
  - *SaaS/Chat:* Both | *Image:* N/A - Not a GitHub URL
- **https://rdctd.pro/**  
  - rdctd.pro is likely a link shortener or redirector brand. It might tie into link tracking/analytics. Unique as a tidy example of minimal SaaS packagin...  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://trdcrft.com/**  
  - trdcrft.com looks like a brand site (perhaps “Tradecraft”) oriented around security, tradecraft, or training. Good for analyzing branding and position...  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://duckduckgo.com/?q=error%3A+Expected+content-type+to+be+text%2Fevent-stream…**  
  - This DuckDuckGo search URL encodes a query about an error: “Expected content-type to be text/event-stream, Actual: text/html; charset=UTF-8”. It’s a s...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://github.com/search?q=OpenBB-finance&type=repositories**  
  - GitHub search for “OpenBB-finance,” surfacing the OpenBB ecosystem (terminal, SDK, etc.). It’s a discovery entrypoint for open-source investment resea...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://github.com/yusufkaraaslan/Skill_Seekers**  
  - Skill_Seekers is a repo about building or tracking skills (learning paths, projects). It may provide growth frameworks and curated resources. Unique a...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/cloudcommunity/Free-Certifications**  
  - Free-Certifications lists free and discounted certification courses across cloud, security, and more. It’s perfect for building a cert-focused learnin...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/capture0x/AdStrike**  
  - AdStrike is an ad-blocking or ad-related toolkit (context from naming and hacking focus). It may block, manipulate, or analyze ads. Unique as an ad-sp...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/techenthusiast167/OSINTMAILER- (also in C)**  
  - See above.  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/apurvsinghgautam/dark-web-osint-tools**  
  - About
OSINT Tools for the Dark Web  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/NVIDIA/SkillSpector**  
  - SkillSpector
Security scanner for AI agent skills. Detect vulnerabilities, malicious patterns, and security risks.  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/tmylla/Awesome-LLM4Cybersecurity**  
  - About
An overview of LLMs for cybersecurity  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/The-Osint-Toolbox/Telephone-OSINT**  
  - You will find helpful telephone number OSINT tools on this page. Telephone OSINT can be tricky as there are not that many open databases. You need to ...  
  - *SaaS/Chat:* SaaS | *Image:* Needs building
- **https://github.com/afsh4ck/HackLabs**  
  - About
Intentionally Vulnerable Hacking Labs  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/ssl/ezXSS**  
  - About
ezXSS is an easy way for penetration testers and bug bounty hunters to test (blind) Cross Site Scripting.

ezxss.com  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/geo-tp/ESP32-Bit-Pirate**  
  - About
A Hardware Hacking Tool with Web-Based CLI That Speaks Every Protocol  https://geo-tp.github.io/ESP32-Bit-Pirate/webflasher/  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/BullsEye0/ghost_eye**  
  - About
Ghost Eye Informationgathering Footprinting Scanner and Recon Tool Release. Ghost Eye is an Information Gathering Tool I made in python 3. To ru...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/HunxByts/GhostTrack**  
  - About
Useful tool to track location or mobile number  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/bkerler/exploit_me**  
  - About
Very vulnerable ARM/AARCH64 application (CTF style exploitation tutorial with 29 vulnerability techniques)  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://hackingpassion.com/atomic-arch-aur-malware/**  
  - N/A  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://github.com/techenthusiast167/INFOFINDER_PRO**  
  - About
A comprehensive Python-based OSINT (Open Source Intelligence) tool for email and phone number verification with breach detection, social media l...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/Runnin4ik/dpi-detector**  
  - About
DPI detection tool for internet censorship testing. Identifies TLS, TCP, HTTP, DNS blocking and 16-20KB connection drops  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/vivek-threatintel/cybersecurity-competency-framework**  
  - 🛡️ Cybersecurity Competency Framework
A structured, research-driven roadmap for developing deep cybersecurity expertise — from foundational systems kn...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://termux.achik.us/cupidcr4wl-in-termux-installation-usage-commands/**  
  - CupidCr4wl in Termux – Installation & Usage Commands
CupidCr4wl is a simple information gathering tool that searches for publicly available details us...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://github.com/cocoindex-io/cocoindex-code**  
  - About
A super light-weight embedded code search engine CLI (AST based) that just works - saves 70% token and improves speed for coding agent 🌟 Star if...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/crewAIInc/crewAI**  
  - About
Framework for orchestrating role-playing, autonomous AI agents. By fostering collaborative intelligence, CrewAI empowers agents to work together...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/google/magika**  
  - About
Fast and accurate AI powered file content types detection

securityresearch.google/magika/  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/hahwul/WebHackersWeapons**  
  - About
⚔️ Web Hacker's Weapons / A collection of cool tools used by Web hackers. Happy hacking , Happy bug-hunting  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/aadi1011/AI-ML-Roadmap-from-scratch**  
  - About
Become skilled in Artificial Intelligence, Machine Learning, Generative AI, Deep Learning, Data Science, Natural Language Processing, Reinforcem...  
  - *SaaS/Chat:* TBD | *Image:* Needs building

### Core / Dashboard (70 tools)

- **https://github.com/tw93/Pake**  
  - Turn any webpage into a desktop app with one command.  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/ticarpi/jwt_tool**  
  - About
🐍 A toolkit for testing, tweaking and cracking JSON Web Tokens  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/Adam-CAD/CADAM**  
  - About
CADAM is the open source text-to-CAD web application

adam.new/cadam  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/bytedance/UI-TARS-desktop**  
  - About
The Open-Source Multimodal AI Agent Stack: Connecting Cutting-Edge AI Models and Agent Infra  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/elder-plinius/ST3GG**  
  - STE.GG‍​‌​‌​​​​​‌​​‌‌​​​‌​​‌​​‌​‌​​‌‌‌​​‌​‌‌​​‌​​‌​​​​​​‌​​‌‌​​​‌​​‌‌‌‌​‌​‌​‌‌​​‌​​​‌​‌​‌​‌​​‌‌​​‌​​​​​​‌​‌‌​​‌​‌​​‌‌‌‌​‌​‌​‌​‌‍ is a feature-rich, op...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/fimbox/html-in-canvas/blob/main/plugins/html-cloth.mjs**  
  - html-cloth.mjs plugin for html-in-canvas  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/github/spec-kit**  
  - Toolkit to get started with Spec-Driven Development  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/lightningpixel/modly**  
  - Desktop app to generate 3D models from images using local AI on GPU  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/LvcidPsyche/auto-browser**  
  - Give AI agent a real browser with human in the loop — Open-source MCP-native  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/microsoft/BitNet**  
  - Official inference framework for 1-bit LLMs  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/NawfalMotii79/PLFMRADAR**  
  - Open-source, low-cost 10.5 GHz PLFM phased array RADAR system  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/nv-tlabs/lyra**  
  - Project Lyra — Open Generative 3D World Models  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/onyx-dot-app/onyx**  
  - Open Source AI Platform — AI Chat with advanced features for every LLM  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/OpenBB-finance/OpenBB**  
  - OpenBB Finance (link broken at time of bookmarking)  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/pedroslopez/whatsapp-web.js**  
  - WhatsApp Web API client library  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/PolymathicAI/thewell**  
  - A 15TB Collection of Physics Simulation Datasets  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/rohitg00/ai-engineering-from-scratch**  
  - AI Engineering from scratch — Learn it. Build it. Ship it.  
  - *SaaS/Chat:* SaaS | *Image:* Needs building
- **https://github.com/Significant-Gravitas/AutoGPT**  
  - AutoGPT — Autonomous GPT-4 agent framework  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/thedotmack/claude-mem**  
  - Persistent Context Across Sessions for Every Agent  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/WhiskeySockets/Baileys**  
  - Baileys — WhatsApp Web API library (TypeScript)  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/yusufkaraaslan/SkillSeekers**  
  - Convert ANY documentation website into a Claude skill  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/NVIDIA/garak**  
  - Adversarial testing framework targeting LLMs and AI systems. Used to probe model robustness, jailbreak resistance, etc. Unique as it focuses on “red-t...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/akitaonrails/ai-jail**  
  - AI jailbreak lab/tooling to study jailbreaking patterns. Good for generating and testing adversarial prompts. Unique as a practical lab for jailbreak ...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/HandsOnLLM/Hands-On-Large-Language-Models**  
  - Companion repo for the “Hands-on LLMs” book. Focused on practical LLM engineering. Unique as a structured curriculum with code.  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/Developer-Y/cs-video-courses**  
  - Massive curated list of CS courses with video lectures. Great for targeted upskilling. Unique for being course-first, not code-first.  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/sindresorhus/awesome**  
  - The original “awesome list” aggregator. Useful as a meta-index of many other lists. Unique in that it is the canonical awesome-list entrypoint.  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/codecrafters-io/build-your-own-x**  
  - Tutorials/repos for building your own DBs, interpreters, OS, etc. Great for deep technical mastery. Unique for its “build your own” philosophy, aligni...  
  - *SaaS/Chat:* SaaS | *Image:* Needs building
- **https://zerotomastery.io/courses/**  
  - ZTM course platform across dev/AI topics.  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **https://github.com/iv-org/invidious**  
  - Alternative front-end for YouTube, self-hostable. Useful for privacy-friendly viewing. Unique stand-in for YouTube with better privacy.  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://zerotrace.org/shop/**  
  - Privacy hardware & services (SIM, routers etc.). Supports your “extreme privacy” systems. Unique because it mixes hardware and privacy services.  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://www.dropcourse.com/**  
  - Course marketplace/downloader oriented platform. Useful to quickly source course content and see curricula. Unique as an aggregator of many courses.  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **https://www.opensourceprojects.dev/post/optimizerduck**  
  - This page profiles the “optimizerduck” open-source project (most likely a repo) and provides metadata like description, language, and popularity. It c...  
  - *SaaS/Chat:* Both | *Image:* N/A - Not a GitHub URL
- **https://github.com/swisskyrepo/PayloadsAllTheThings (already above)**  
  - Covered as payload mega‑repo.  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://stan.store/jacobhartmanofficial**  
  - This is Jacob Hartman’s Stan Store page, a marketplace for his digital products (courses, templates, etc.). You can analyze his offers, pricing, and f...  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **https://www.opensourceprojects.dev/post/removerized**  
  - This is a profile page on opensourceprojects.dev for the project “Removerized,” summarizing its purpose, language, and stats. It helps you quickly eva...  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **https://www.reddit.com/r/microsaas/comments/1qnla53/built_an_opensource_selfhosted_ai_agent/**  
  - This Reddit post discusses building an open-source, self-hosted AI agent as a micro‑SaaS. The comments often contain implementation details, stack dis...  
  - *SaaS/Chat:* Both | *Image:* N/A - Not a GitHub URL
- **https://barkod.studio/**  
  - Barkod Studio is a design/branding/product site—likely a studio offering design, visuals, or brand systems services. You can mine it for design patter...  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **https://vonsel.com/**  
  - Vonsel is a product or studio site (likely design, dev, or AI-oriented) you’ve bookmarked. It’s a reference for UX, branding, or product positioning. ...  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **https://www.sabrina.dev/p/claude-code-source-leak-analysis?…**  
  - Sabrina’s article analyzes the Claude Code source leak, explaining architecture decisions, capabilities, and implied internal design. It’s rich contex...  
  - *SaaS/Chat:* Both | *Image:* N/A - Not a GitHub URL
- **https://highticketaioffer.com/**  
  - HighTicketAIOffer likely sells frameworks/blueprints for high-ticket AI offers or done-for-you services. It’s pure funnel copy and offer design you ca...  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://hiro.fm/sp/lifetime-deal/**  
  - Hiro.fm’s lifetime deal page offers a one-time price for their platform (likely podcast/audio hosting or AI transcript tooling). This informs you abou...  
  - *SaaS/Chat:* Both | *Image:* N/A - Not a GitHub URL
- **https://coddy.tech/**  
  - Coddy.tech is an educational/coding platform (interactive coding exercises, games, or AI-driven teaching). It’s a reference for gamified learning. Uni...  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **https://github.com/codeforreal1/compressO**  
  - CompressO is a free, offline, open-source app that compresses any video or image into a tiny size on Mac, Windows, and Linux. It’s built for privacy a...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://www.aicut.pro/create?utm_id=…**  
  - aicut.pro “create” page is likely a tool for AI-powered video or image editing specifically tuned for social content. It’s positioned as a fast way to...  
  - *SaaS/Chat:* Chat | *Image:* N/A - Not a GitHub URL
- **https://members.garvinacademy.com/plans/1910360?bundle_token=… & https://members.garvinacademy.com/landing?utm_id=…**  
  - Garvin Academy pages for bundles and the main landing for some tech/business education. Good for observing bundle + membership pricing. Unique because...  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://zerotrace.org/kb/anonymous-sim-card-powered-by-silent-link/**  
  - Zerotrace KB article explaining anonymous SIM cards via Silent Link. It walks through how they work, legalities, and OPSEC considerations. Unique as a...  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **https://www.cnx-software.com/2026/03/15/aeris-10-open-source-hardware-radar-can-track-multiple-objects-up-to-20km-away/**  
  - This CNX Software article describes Aeris-10, an open-source radar that can track multiple objects up to 20 km away. It outlines specs, hardware stack...  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://github.com/**  
  - N/A  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://github.com/chenglou/pretext**  
  - Pretext is a pure JS/TS library for multiline text measurement and layout that never touches the DOM, using Canvas-based measurement and pure arithmet...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/browser-use/web-ui/tree/main/assets**  
  - Assets (icons, images, etc.) used by the browser-use web UI. Useful if you want to replicate or extend the UX. Unique as a ready-made asset pack align...  
  - *SaaS/Chat:* SaaS | *Image:* Needs building
- **https://github.com/nidhinjs/prompt-master**  
  - prompt-master is a repository for organizing, versioning, and managing prompts, likely providing structures, templates, and patterns for LLM prompts. ...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/withkynam/vibecode-pro-max-kit/ (already above)**  
  - See above.  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/scaleapi/scale-agentex (also in D)**  
  - See above.  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/OWASP/DockSec (also in D)**  
  - See above.  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/tom-doerr/repo_posts**  
  - repo_posts turns GitHub repos into “blog posts” via AI summarization of codebases. Useful for auto-documenting or explaining projects. Unique as a too...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/rohitg00/ai-engineering-from-scratch (also in B)**  
  - See above.  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/Alishahryar1/free-claude-code (also in C)**  
  - See above.  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/mauriceboe/TREK**  
  - About
A self-hosted travel/trip planner with real-time collaboration, interactive maps, PWA support, SSO, budgets, packing lists, and more.

demo.like...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/olalie/tapmap**  
  - About
Watch your computer connect across the internet in real time. Discover the world behind your apps.

olalie.github.io/tapmap/  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/awesome-foss/awesome-sysadmin**  
  - About
A curated list of amazingly awesome open-source sysadmin resources.  
  - *SaaS/Chat:* SaaS | *Image:* Needs building
- **https://github.com/FareedKhan-dev/train-llm-from-scratch**  
  - About
A straightforward method for training your LLM, from downloading data to generating text.     https://fareedkhan-dev.github.io/train-llm-from-sc...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/x90skysn3k/brutespray**  
  - About
Fast, multi-protocol credential brute-forcer. Parses Nmap, Nessus, and Nexpose output to automatically test default and custom credentials acros...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/six2dez/burp-ai-agent**  
  - About
Burp Suite extension that adds built-in MCP tooling, AI-assisted analysis, privacy controls, passive and active scanning and more

burp-ai-agent...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://nvlabs.github.io/motionbricks/**  
  - N/A  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://github.com/iamsrikanthnani/pluely**  
  - About
The Open Source Alternative to Cluely - A lightning-fast, privacy-first AI assistant that works seamlessly during meetings, interviews, and conv...  
  - *SaaS/Chat:* SaaS | *Image:* Needs building
- **https://github.com/obra/superpowers**  
  - About
An agentic skills framework & software development methodology that works.  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/gsd-build/get-shit-done**  
  - About
A light-weight and powerful meta-prompting, context engineering and spec-driven development system for Claude Code by TÂCHES.  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://www.designarena.ai/**  
  - N/A  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://github.com/ewebdzine/canonify**  
  - About
Teach your AI coding assistant how your codebase already does things, so it stops reinventing patterns — a Claude Code plugin.  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/OpenCut-app/OpenCut**  
  - About
The open-source CapCut alternative

opencut.app  
  - *SaaS/Chat:* SaaS | *Image:* Needs building

### Memory & Brain (23 tools)

- **https://github.com/spring-ai-alibaba/deepresearch**  
  - It is an extra brain that Agent OS can use for Deep Research  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/techenthusiast167/DeepSearch-**  
  - DeepSearch is a powerful Python-based OSINT utility that leverages Google's advanced search operators to perform comprehensive digital footprint analy...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/safishah/sigraphify**  
  - AI coding assistant skill — turn any folder of code into a queryable knowledge graph  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/Shubhamsaboo/awesome-llm-apps**  
  - 100 AI Agent & RAG apps you can clone, customize, and ship  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/OWASP-noir/noir**  
  - OWASP Noir: privacy- and tracking-related tooling for browser/network analysis. Useful for understanding fingerprinting and tracking vectors. Unique i...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/swisskyrepo/PayloadsAllTheThings**  
  - Massive collection of payloads for XSS, SQLi, SSRF, XXE, etc. Core reference for many pentesters. Unique in sheer breadth and depth of payload coverag...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/rohitg00/agentmemory**  
  - Persistent memory layer for agents (key-value, embeddings, retrieval). Lets agents remember interactions across runs. Unique because it focuses on mem...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/langgenius/dify**  
  - Full-stack “AI app builder” platform (chatflows, RAG, agents). Strong for deploying internal tools quickly. Unique because it’s production-focused (mu...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/ZishanAdThandar/pentest**  
  - This repository collects pentesting and bug bounty notes, cheat sheets, and guides for ethical hackers and CTF players. It acts as a consolidated know...  
  - *SaaS/Chat:* Both | *Image:* Needs building
- **https://github.com/laramies/theHarvester#**  
  - This is just the anchor version of the same repo URL (theHarvester) pointing into its README section. Functionally it’s the same project as above, jus...  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/MemPalace/mempalace (also in C)**  
  - Memory system + benchmark; see above.  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/breferrari/obsidian-mind (also in C)**  
  - Obsidian + AI interface; see above.  
  - *SaaS/Chat:* SaaS | *Image:* Needs building
- **https://drive.google.com/file/d/1-5ho2aSZ-z0FcW8W_jMUoFSQ5hTKvJ43/view**  
  - A Google Drive file; likely a PDF/book/course you saved. This is raw content you can convert into skills or RAG sources. Unique because it’s private I...  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://docs.google.com/document/u/0/d/1V4ddYjEKTHCdiKNbXylaLqKMuF52TQXRu-0Xr0ZflRw/mobilebasic**  
  - A Google Doc you’ve saved—likely a guide, set of notes, or DIY system. Again, great candidate for codifying into internal frameworks. Unique as a stru...  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **https://docs.google.com/document/d/1Z5SX89FV6bTy2KKnGGb61xCcS9iPg_fv2USQYi4Wc3g/mobilebasic**  
  - Another Google Doc you saved; likely a guide or notes on some technical or strategic topic. Unique as raw text to ingest into a private knowledge base...  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **https://github.com/MemPalace/mempalace (referenced earlier)**  
  - MemPalace is an AI memory system/benchmark that hit high LongMemEval scores. It offers a memory architecture and evaluation. Unique because it is both...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/rohitg00/agentmemory (also in B)**  
  - See above.  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://679894f2019f3c5c5707545e.sos.knowledgebases.net/kb**  
  - GoPhantom Knowledge Base. This is omething that I can refer to for GoStackBase, GoHighlEvel, & BuildwithOS since they are all lead connector platforms...  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **https://github.com/vstorm-co/full-stack-ai-agent-template**  
  - About
Full-stack AI app generator — FastAPI + Next.js with AI Agents, RAG, streaming, auth, and 20+ integrations out of the box.    https://vstorm-co....  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/chopratejas/headroom**  
  - About
Compress tool outputs, logs, files, and RAG chunks before they reach the LLM. 60-95% fewer tokens, same answers. Library, proxy, MCP server.    ...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/mito753/Kernel-Exploit-Dojo**  
  - About
CTF kernel exploitation notes, PoCs, exploits, and writeups.  
  - *SaaS/Chat:* TBD | *Image:* Needs building
- **https://github.com/kepano/obsidian-skills**  
  - About
Agent skills for Obsidian. Teach your agent to use Obsidian CLI and open formats including Markdown, Bases, JSON Canvas.  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/hkuds/lightrag**  
  - About
[EMNLP2025] "LightRAG: Simple and Fast Retrieval-Augmented Generation"

arxiv.org/abs/2410.05779  
  - *SaaS/Chat:* TBD | *Image:* Needs building

### Coding & Development (9 tools)

- **https://github.com/The-Art-of-Hacking/h4cker**  
  - This repository is maintained by Omar Santos (@santosomar) and includes thousands of resources related to ethical hacking, bug bounties, digital foren...  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://github.com/Agenty/scrapingai (duplicate noted)**  
  - Already above; its uniqueness is still LLM-integrated scraping.  
  - *SaaS/Chat:* Chat | *Image:* Needs building
- **https://scienceearth.org/**  
  - ScienceEarth is an educational site (course/blog platform) about science, likely with content that can be scraped and used for study or model training...  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **https://drive.google.com/… (three folders/files)**  
  - These Drive links are your own collections—likely PDFs, course dumps, or templates. They are raw material for your internal knowledge bases and future...  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **https://www.trademarkmystuff.com/?utm_id=…**  
  - TrademarkMyStuff is a service helping individuals and businesses file trademarks. It simplifies legal bureaucracy into a guided process. Unique becaus...  
  - *SaaS/Chat:* SaaS | *Image:* N/A - Not a GitHub URL
- **https://patrickhinchy.com/**  
  - Patrick Hinchy’s site (security/privacy, OSINT or digital forensics content). It serves as a personal brand plus knowledge base. Unique as a personal ...  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://www.billofexchange.ai/**  
  - BillOfExchange.ai is likely a product around automating or managing bills of exchange / negotiable instruments with AI. This straddles niche legal + f...  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://www.imonu.com/home**  
  - Studio
/ video engine
One prompt. Full video. Your keys or ours.

Bring Your Own Keys — any AI API — or use ours

Snipe Pyramid — NASA, Wikimedia & 20...  
  - *SaaS/Chat:* Both | *Image:* N/A - Not a GitHub URL
- **https://github.com/akhil-dara/WAInsight**  
  - About
Forensic analysis of already-acquired WhatsApp Android databases - browse every chat exactly like the WhatsApp home screen, plus 30 forensic pag...  
  - *SaaS/Chat:* SaaS | *Image:* Needs building

### AI Workspace (4 tools)

- **https://secretsofhitsongs.com/hooked-checkout-page**  
  - Checkout page for a “Secrets of Hit Songs” product, likely training on songwriting hooks and production. Shows pricing, bonuses, and risk-reversal cop...  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://www.bulletproofentrepreneur.io/pm-v?utm_id=…**  
  - Bulletproof Entrepreneur page for some PM/V (product-market or program) offer—likely mindset/strategy training for entrepreneurs. It’s a good example ...  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://fr.ifixit.com/ifixit-pro-repair-academy?utm_id=…**  
  - iFixit Pro Repair Academy offers training on professional device repair. It’s hands-on, skills-focused content. Unique as a hardware/repair skill cour...  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://www.linuxsocial.com/p/become-anonymous-private-course.html?m=1**  
  - LinuxSocial’s course page on becoming anonymous/private. It likely covers OPSEC, privacy tooling, and threat modeling. Unique as a paid product in you...  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL

### Uncategorized (4 tools)

- **https://zerotomastery.io/courses/ (already above)**  
  - See above.  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://aiblackmagic.com/?utm_id=… (also in C)**  
  - AI Black Magic; see above.  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://arena.ai/**  
  - N/A  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL
- **https://pinokio.co/**  
  - N/A  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL

### Content Creation (1 tools)

- **https://fmhy.net/**  
  - FMHY: massive directory of free media/resources (including learning). Good for gathering materials. Unique in mixing entertainment with learning resou...  
  - *SaaS/Chat:* TBD | *Image:* N/A - Not a GitHub URL

---

## 🖥️ SaaS / Manual-Use Tools (182 tools)

These tools have a UI/dashboard you can use manually (like installing software on your OS):

- **[Both]** https://github.com/pardnchiu/Agenvoy
  - Clear Agent OS replacement
- **[Both]** https://github.com/techenthusiast167/Master-OSINT-Toolkit-
  - OSINT tools that can be automated (the API keys that are required will need to be obained using alias information and are NOT free. So open source alternatives will be required to find and lookup)
- **[Both]** https://github.com/vflame6/leaker
  - OSINT intel gatherig tool (Paid and free API keys required)
- **[Both]** https://tools.termuxcommands.com/tookie-osint-in-termux-installation-and-usage-guide/
  - Tookie-OSINT is a powerful username OSINT and social media reconnaissance tool that is used to search usernames across different websites directly from the terminal. It supports multi-thread scanning,
- **[Both]** https://github.com/pewdiepie-archdaemon/odysseus
  - odysseus :A self-hosted AI workspace -- meant to be the self-hosted version of the UI experience you get from ChatGPT and Claude. But with more jank and fun. Running on your own hardware, with your ow
- **[SaaS]** https://github.com/elm1nst3r/GHOST-osint-crm
  - GHOST - Global Human Operations & Surveillance Tracking: Open-source investigation management platform for tracking people, connections, and intelligence data. Because Excel spreadsheets are for accou
- **[SaaS]** https://github.com/RyanCodrai/turbovec
  - A vector index built on TurboQuant, written in Rust with Python bindings
- **[Both]** https://github.com/screetsec/Sudomy
  - Sudomy is a subdomain enumeration tool to collect subdomains and analyzing domains performing automated reconnaissance (recon) for bug hunting / pentesting
- **[Both]** https://github.com/usestrix/strix
  - Open-source AI hackers to find and fix your app’s vulnerabilities.

strix.ai    Strix are autonomous AI agents that act just like real hackers - they run your code dynamically, find vulnerabilities, a
- **[Both]** https://github.com/agentwasp/agentwasp
  - WASP is an operational runtime built for operators who need an agent they can actually trust to run unattended. Three architectural commitments make it different from other self-hosted agent harnesses
- **[Both]** https://github.com/cporter202/social-media-scraping-apis
  - A curated collection of social media scraping APIs and tools for Instagram, LinkedIn, Twitter/X, TikTok, YouTube, Facebook, and more. Extract posts, profiles, videos, comments, and engagement metrics.
- **[Both]** https://github.com/moorcheh-ai/memanto
  - MEMANTO is a memory agent. It remembers, recalls, and answers — so your agents can achieve long-term goals and avoid confusion.

Most memory tools today are passive infrastructure: agents have to quer
- **[Both]** https://github.com/dograh-hq/dograh/
  - About
Open source voice AI platform. Self-hosted alternative to Vapi and Retell. On Prem, BYOK across Speech to Speech or LLM/STT/TTS, with a visual workflow builder, MCP native and telephony support.
- **[Both]** https://github.com/AIEraDev/Clypra
  - About
A modern video editor built with Tauri, React, and TypeScript. Focus on building free capabilities of premium capcut functionalities

clypra.abdulkabirmusa.com
- **[Both]** https://github.com/tw93/Pake
  - Turn any webpage into a desktop app with one command.
- **[SaaS]** https://github.com/yo-yo-yo-jbo/whisper_leak
  - Whisper Leak is a research toolkit that demonstrates how encrypted, streaming conversations with Large Language Models leak prompt information through packet sizes and timing. By capturing TLS traffic
- **[SaaS]** https://github.com/JoasASantos/OSCE3-Complete-Guide
  - OSWE, OSEP, OSED, OSEE

Topics
offensive-security offsec oscp osce osee oswe oswe-prep osep osed oswe-guide osep-prep osce3
Resources
 Readme
- **[Both]** https://github.com/Thysrael/Horizon?utm_source=opensourceprojects.dev&ref=opensourceprojects.dev
  - What It Does
Horizon is a calendar application that lets you create events with a more fluid structure. Instead of forcing every event into a start and end time, it allows events to have durations, fl
- **[Both]** https://github.com/aliasrobotics/cai
  - Cybersecurity AI (CAI) is a lightweight, open-source framework that empowers security professionals to build and deploy AI-powered offensive and defensive automation. CAI is the de facto framework for
- **[SaaS]** https://github.com/averygan/reclip
  - About
Download videos from almost any website. Lightweight, self-hosted media downloader with a clean web UI.
- **[Both]** https://github.com/jonaslejon/malicious-pdf
  - 💀 Generate malicious PDF test files for testing phone-home callbacks, SSRF, XSS, NTLM credential theft, and data exfiltration in PDF viewers, converters, and web applications. Can be used with Burp Co
- **[Both]** https://github.com/anonymousRAID/OSINT-Mapping-Tool
  - About
An OSINT Mapping tool for research.

Topics
osint maps mapping nodes google-maps-api osinttool osint-tool osint-tools
- **[Both]** https://github.com/aasthas2022/ColdContactXLSX
  - Overview
This project automates the process of sending cold emails from a job seeker (you) to recruiters. It utilizes common email address patterns to generate potential email addresses for recruiters
- **[Both]** https://github.com/Adam-CAD/CADAM
  - About
CADAM is the open source text-to-CAD web application

adam.new/cadam
- **[Both]** https://github.com/ahujasid/blender-mcp
  - BlenderMCP - Blender Model Context Protocol Integration
BlenderMCP connects Blender to Claude AI through the Model Context Protocol (MCP), allowing Claude to directly interact with and control Blender
- **[Both]** https://github.com/Anil-matcha/Open-Generative-AI
  - About
Open-source alternative to AI video platforms — Free AI image & video generation studio with 200+ models (Flux, Midjourney, Kling, Sora, Veo). No content filters. Self-hosted, MIT licensed.

mua
- **[Both]** https://github.com/appcypher/awesome-mcp-servers
  - Awesome MCP Servers Awesome
A curated list of awesome Model Context Protocol (MCP) servers. MCP is an open protocol that enables AI models to securely interact with local and remote resources through 
- **[Both]** https://github.com/dmtrKovalenko/fff
  - A file search toolkit for humans and AI agents. Really fast.

Typo-resistant path and content search, frecency-ranked file access, a background watcher, and a lightweight in-memory content index. Way 
- **[Both]** https://github.com/elder-plinius/OBLITERATUS
  - OBLITERATUS is the most advanced open-source toolkit for understanding and removing refusal behaviors from large language models — and every single run makes it smarter. It implements abliteration — a
- **[Both]** https://github.com/elder-plinius/ST3GG
  - STE.GG‍​‌​‌​​​​​‌​​‌‌​​​‌​​‌​​‌​‌​​‌‌‌​​‌​‌‌​​‌​​‌​​​​​​‌​​‌‌​​​‌​​‌‌‌‌​‌​‌​‌‌​​‌​​​‌​‌​‌​‌​​‌‌​​‌​​​​​​‌​‌‌​​‌​‌​​‌‌‌‌​‌​‌​‌​‌‍ is a feature-rich, open-source steganography toolkit that hides secret 
- **[SaaS]** https://github.com/Geolavor/leads-generator-app
  - Prospects AI browser — extract contact details from the Internet in real time
- **[SaaS]** https://github.com/iamlukethedev/Claw3D
  - Open source 3D engine built on OpenClaw for games/simulations
- **[Both]** https://github.com/mautic/mautic
  - Mautic — open-source marketing automation platform
- **[Both]** https://github.com/n8n-io/n8n
  - Open-source workflow automation (30k+ stars) — visual low-code lead gen workflows
- **[SaaS]** https://github.com/omkarcloud/google-maps-scraper
  - Extract names, addresses, phones, reviews, websites from Google Maps (~1.4k stars)
- **[Both]** https://github.com/onyx-dot-app/onyx
  - Open Source AI Platform — AI Chat with advanced features for every LLM
- **[Both]** https://github.com/parcelvoy/platform
  - Parcelvoy — open-source multi-channel marketing automation (email, SMS, push)
- **[Both]** https://github.com/pedroslopez/whatsapp-web.js
  - WhatsApp Web API client library
- **[Both]** https://github.com/RasaHQ/rasa
  - Open-source conversational AI framework — multi-channel bot builder (16k+ stars)
- **[SaaS]** https://github.com/rohitg00/ai-engineering-from-scratch
  - AI Engineering from scratch — Learn it. Build it. Ship it.
- **[Both]** https://github.com/Shubhamsaboo/awesome-llm-apps
  - 100 AI Agent & RAG apps you can clone, customize, and ship
- **[Both]** https://github.com/tiledesk/tiledesk
  - Tiledesk — open-source live chat and chatbot platform
- **[SaaS]** https://github.com/timolins/clawdbot
  - Personal AI assistant — Any OS, Any Platform
- **[SaaS]** https://github.com/ultraworkers/claw-code
  - 100K+ stars repo — built in Rust using oh-my-codex
- **[Both]** https://github.com/yusufkaraaslan/SkillSeekers
  - Convert ANY documentation website into a Claude skill
- **[Both]** https://github.com/0xSteph/pentest-ai
  - AI-assisted pentest framework that uses LLMs to plan and execute security testing workflows. It focuses on automating common attacker playbooks while keeping a human in the loop for dangerous actions.
- **[Both]** https://github.com/FerroxLabs/ijfw
  - Framework for building injection/ fuzzing/ web exploitation workflows. Likely used to automate repeated exploit attempts. Unique because it’s more about exploit framework structure than one-off tools.
- **[Both]** https://github.com/GH05TCREW/pentestagent
  - Pentest-oriented agent integrating several tools and workflows behind a single interface. Its goal is to give an “agentic” front-end to a pentest toolkit. Unique in that it tries to unify multiple pen
- **[SaaS]** https://red-team.tools/tools/
  - Directory of red‑team tools spanning exploit, phishing, C2, etc. Good “shopping list” for building a red‑team stack. Unique as a vendor/tool aggregator rather than a GitHub repo.
- **[Both]** https://github.com/cipher387/osint_stuff_tool_collection
  - Collection of small OSINT tools and scripts. Handy for quick niche OSINT tasks. Unique because it focuses on lots of small, focused utilities instead of monoliths.
- **[Both]** https://github.com/frishtik/osint-tools-mcp-server
  - MCP server exposing OSINT tools as skills to MPC‑compatible clients (e.g., Claude desktop). Ideal for your “build agents out of tools” workflows. Unique in its focus on making OSINT tools agent‑native
- **[SaaS]** https://github.com/sherlock-project/sherlock
  - Username OSINT tool: find accounts on hundreds of platforms. Core identity correlation tool. Unique in focusing exclusively on username presence across sites.
- **[Both]** https://hackingpassion.com/dorks-eye/
  - Web GUI for search dorks OSINT (Google, etc.). Good for quick web‑based reconnaissance without CLI. Unique because it’s a browser‑based dork helper.
- **[SaaS]** https://hackingpassion.com/shodan-eye/
  - Web front-end for Shodan-based OSINT. Simplifies device discovery via Shodan queries. Unique as a simple UI on top of Shodan search.
- **[SaaS]** https://dorksearch.com/
  - Dork search engine for quick queries. Useful when you don’t want to write dorks manually. Unique as a dork-specific meta‑engine.
- **[SaaS]** https://github.com/Rishabh-creator601/Books
  - OSINT/resource repo but focused on PDF/books for learning. Helps build your own OSINT library. Unique in being “books as OSINT resources”.
- **[Both]** https://github.com/agent0ai/agent-zero
  - General-purpose open-source AI agent framework. Designed for building multi-tool, multi-step agents. Unique as a generic core agent framework not locked into one vertical.
- **[Both]** https://github.com/AISecurityLab/hackagent
  - Security-focused AI agent for offensive/defensive tasks. Bridges AI planning with security tools. Unique as a “security-only” agent built by an AI security lab.
- **[Both]** https://github.com/browser-use/video-use
  - Agent controlling browsers with video-style reasoning (probably built on browser-use). Good for complex web workflows that require visual steps. Unique in leaning on video/visual understanding for bro
- **[Both]** https://github.com/Agenvoy (pardnchiu/Agenvoy)
  - Agent environment or orchestration layer (name implies Agent + Convoy). Helps manage fleets of agents. Unique in focusing on orchestrating multiple agents rather than building one.
- **[Both]** https://github.com/mukul975/Anthropic-Cybersecurity-Skills
  - Collection of predefined cybersecurity “skills” for Anthropic/Claude. Lets you quickly wire security reasoning inside Claude. Unique because it’s focused on skill definitions rather than tools.
- **[Both]** https://github.com/cporter202/api-mega-list (via repodir link)
  - Mega list of APIs categorized by domain. Great discovery layer for building SaaS integrations. Unique in its API breadth versus typical “public-apis”.
- **[Both]** https://github.com/firecrawl/firecrawl
  - Crawler that converts sites into structured data (markdown/JSON) with LLM assistance. Excellent for building knowledge bases from websites. Unique for its “crawl → segment → LLM-chunk” pipeline.
- **[Both]** https://ultimatewebscraper.com/
  - SaaS/course/tool around large-scale scraping automation. Might provide UI + code templates. Unique by being a packaged commercial “web scraper system,” not just code.
- **[Both]** https://github.com/affaan-m/everything-claude-code
  - Central repo about Claude Code usage, tips, and workflows. Great for mining patterns for your own Claude-based agents. Unique as a Claude-Code-specific “everything” guide.
- **[Both]** https://github.com/luongnv89/claude-howto
  - Practical “how‑to” examples for Claude integration. Good for quick reference on typical patterns. Unique for being step-by-step rather than just snippets.
- **[Both]** https://github.com/nicedreamzapp/claude-code-local
  - Run Claude Code‑style workflows locally with your own stack. Very interesting for privacy/hardening. Unique in that it tries to replicate Claude Code locally.
- **[Both]** https://github.com/langflow-ai/langflow
  - Node-based visual builder for LLM workflows (agents, tools, RAG). Great for orchestrating your multi-tool systems visually. Unique for having a visual flow UI plus API.
- **[Both]** https://github.com/langgenius/dify
  - Full-stack “AI app builder” platform (chatflows, RAG, agents). Strong for deploying internal tools quickly. Unique because it’s production-focused (multi-tenant, auth, etc.).
- **[SaaS]** https://github.com/trimstray/the-book-of-secret-knowledge
  - Huge sysadmin/devops/infosec knowledge dump. Excellent for broad system-level awareness. Unique breadth across networking, Linux, security, and tools.
- **[SaaS]** https://github.com/codecrafters-io/build-your-own-x
  - Tutorials/repos for building your own DBs, interpreters, OS, etc. Great for deep technical mastery. Unique for its “build your own” philosophy, aligning with your meta-learning style.
- **[SaaS]** https://zerotomastery.io/courses/
  - ZTM course platform across dev/AI topics.
- **[Both]** https://github.com/GyulyVGC/sniffnet
  - Cross-platform network traffic monitor with friendly UI. Great for visualizing what’s happening on your boxes. Unique for its UX vs. typical CLI sniffers.
- **[SaaS]** https://yycsnakes.com/andrax/download.html
  - Android-based pentest distribution. Good for mobile on-the-go pentesting. Unique as an Android platform rather than VM/ISO.
- **[Both]** https://www.autodesk.com/products/flow-studio/overview
  - Autodesk Flow Studio for production workflows (media pipeline orchestration). Could be relevant for high-end content pipelines. Unique as a big-enterprise orchestration tool, not indie.
- **[SaaS]** https://www.dropcourse.com/
  - Course marketplace/downloader oriented platform. Useful to quickly source course content and see curricula. Unique as an aggregator of many courses.
- **[SaaS]** https://appsumo.com/products/flexifunnels/
  - FlexiFunnels lifetime/SaaS funnel builder. Could complement your current funnel-hosting setup. Unique for its AppSumo-oriented pricing and integration stack.
- **[Both]** https://botcommerce.app/lifetime-deal/
  - BotCommerce for chatbot-driven e‑commerce flows. Fits nicely into AI store funnels. Unique as a bot-first ecommerce engine.
- **[Both]** https://digitaldfyproducts.com/products/the-ultimate-n8n-automation-bundle
  - Bundle of n8n workflows/templates. You can use them as reference architectures. Unique for dense prebuilt n8n scenarios.
- **[Both]** https://github.com/scaleapi/scale-agentex
  - scale-agentex is Scale’s open-source example of advanced agent architectures, showcasing planning, tool‑use, and evaluation patterns. It’s intended as a reference for building production-grade agents 
- **[SaaS]** https://github.com/techenthusiast167/OSINTMAILER-
  - OSINTMAILER is a Python OSINT tool focused on analyzing email addresses across social media, known breaches, and open data to build a digital footprint. It validates addresses and enriches them with i
- **[Both]** https://github.com/OpenOSINT/OpenOSINT
  - OpenOSINT is an AI‑powered OSINT agent for the terminal that uses Claude, GPT‑5 or local models to investigate emails, usernames, domains, and other indicators. It ships both a CLI REPL and an MCP ser
- **[Both]** https://github.com/reconurge/flowsint
  - Flowsint is a graph-based OSINT and cyber-investigation platform that lets you represent entities (domains, IPs, emails) as nodes and run “transforms” to expand the graph. It runs via Docker, provides
- **[Both]** https://github.com/ZishanAdThandar/pentest
  - This repository collects pentesting and bug bounty notes, cheat sheets, and guides for ethical hackers and CTF players. It acts as a consolidated knowledge base rather than a tool, organizing techniqu
- **[Both]** https://github.com/Moh4696/websites-100-audit
  - This repo appears to provide resources or scripts to audit 100+ websites or a structured methodology for “website audit 100”. It’s likely oriented toward systematic web security assessment or SEO/stru
- **[Both]** https://www.opensourceprojects.dev/post/optimizerduck
  - This page profiles the “optimizerduck” open-source project (most likely a repo) and provides metadata like description, language, and popularity. It can help quickly evaluate whether the linked projec
- **[Both]** https://www.autodesk.com/products/flow-studio/overview?utm_id=120239989537040476
  - Autodesk Flow Studio is a workflow/orchestration product for media and production pipelines. You can use it as a model for higher-end orchestration or integrate with its APIs in media-heavy projects. 
- **[Both]** https://github.com/adithya-s-k/omniparse
  - OmniParse is a document and media ingestion platform that converts almost any unstructured content (PDF, Office docs, images, audio, video, web pages) into clean structured JSON optimized for LLMs. It
- **[Both]** https://repodir.com/repo/nilbuild-developer-roadmap
  - This Repodir entry points to a “developer roadmap” repository that likely structures learning paths and skills for becoming a developer. It aggregates tech topics, tools, and suggested progression int
- **[Both]** https://github.com/thewhiteh4t/FinalRecon
  - FinalRecon is an all‑in‑one web reconnaissance tool that performs subdomain discovery, port scanning, directory enumeration, and more against a target. It is designed as an easy entrypoint for web rec
- **[Both]** https://github.com/CarterPerez-dev/Cybersecurity-Projects
  - This repo aggregates practical cybersecurity projects—from labs to scripts—for learning and demonstrating offensive and defensive techniques. It’s a good place to find project ideas to practice or sho
- **[SaaS]** https://duckduckgo.com/?q=github%3A+microsoft%2FSkillOpt&atb=v457-1&ko=-1&t=ddg_android&ia=web
  - This DuckDuckGo search URL queries GitHub for microsoft/SkillOpt. You’d use it to quickly jump into GitHub search results for that repository and related forks. Its unique role is being a meta-search 
- **[Both]** https://github.com/rmyndharis/OpenWA
  - OpenWA appears here in the context of WhatsApp automation/agent integration, likely a fork or wrapper around WhatsApp Web automation libraries. It enables sending/receiving messages, managing sessions
- **[Both]** https://github.com/apurvsinghgautam/robin
  - robin is likely a personal automation or agent that handles recurring tasks (email, scheduling, notifications) akin to a digital butler. It may integrate with multiple services to run workflows on you
- **[Both]** https://github.com/OpenBMB/VoxCPM
  - VoxCPM is an open-source voice foundation model (multi-lingual, multi-speaker) from OpenBMB for speech understanding and generation. It’s suitable for building conversational agents, voicebots, and sp
- **[SaaS]** https://www.opensourceprojects.dev/post/omnivoice-studio
  - This page profiles “OmniVoice Studio,” an open-source or indie voice project, summarizing its features, tech stack, and stats. You can quickly gauge whether it fits your needs (e.g., TTS/ASR editing e
- **[SaaS]** http://sv101.ifastnet.com/cookies.html
  - This is a basic cookie policy page on an ifastnet-hosted site. It’s not itself a tool but could be part of a lab, training environment, or old asset. Unique only as a “live website stub” you might tar
- **[Both]** https://blink.new/pricing
  - Blink.new’s pricing page details costs and tiers for its product (likely a dev tool, app builder, or notebook environment given the .new domain). It matters to you mostly for evaluating ROI if you ado
- **[SaaS]** https://github.com/unicodeveloper/globalthreatmap
  - GlobalThreatMap aggregates threat intelligence data and visualizes cyber attacks and indicators on a world map. This can be used for situational awareness dashboards and demo environments. Unique in t
- **[SaaS]** https://github.com/urbanadventurer/Android-PIN-Bruteforce
  - This tool exploits Android’s adb interface to brute-force the PIN of a locked device (under certain conditions) by simulating input attempts while bypassing delays/lockouts. It’s often used in forensi
- **[Both]** https://github.com/Giskard-AI/giskard-oss
  - Giskard is an open-source Python library for evaluating AI systems, including LLMs, RAG agents, and traditional ML models. It detects hallucinations, prompt injection, data leakage, bias, and performa
- **[Both]** https://github.com/higgsfield-ai/higgsfield
  - Higgsfield is an AI content creation / generation platform, with the repo providing SDKs, examples, or tools around their models. It appears aimed at creative media or text generation workflows. Uniqu
- **[Both]** https://github.com/DigitalPlatDev/FreeDomain
  - FreeDomain looks like an automation or utility project to help acquire or manage free domains or DNS setups. That can be powerful when spinning up many disposable or micro SaaS sites. Its unique angle
- **[SaaS]** https://stan.store/jacobhartmanofficial
  - This is Jacob Hartman’s Stan Store page, a marketplace for his digital products (courses, templates, etc.). You can analyze his offers, pricing, and funnel structure as a pattern for your own info pro
- **[SaaS]** https://www.opensourceprojects.dev/post/removerized
  - This is a profile page on opensourceprojects.dev for the project “Removerized,” summarizing its purpose, language, and stats. It helps you quickly evaluate whether the underlying repo (likely an image
- **[Both]** https://huggingface.co/blog/samihalawa/automating-lead-generation-with-ai
  - This Hugging Face blog post explains how to build an AI-automated lead generation pipeline, combining web scraping, enrichment, and LLM-powered outreach. It describes a multi-stage architecture you ca
- **[Both]** https://github.com/openai/codex
  - This is the OpenAI Codex repository, which historically documented and demoed the Codex model used for code generation and GitHub Copilot. It contains examples, APIs, and integration patterns for codi
- **[Both]** https://github.com/topics/ai-osint
  - This GitHub topic aggregates repositories that combine AI with OSINT—agents, assistants, and pipelines for intelligence gathering. It lets you quickly find AI‑augmented OSINT tools similar to Claude‑O
- **[Both]** https://www.gitreverse.com/
  - GitReverse is a website that analyzes Git repositories, helping you reverse-engineer project structure, dependencies, or history from a URL. It can surface metrics and diagrams useful in code comprehe
- **[Both]** https://www.reddit.com/r/microsaas/comments/1qnla53/built_an_opensource_selfhosted_ai_agent/
  - This Reddit post discusses building an open-source, self-hosted AI agent as a micro‑SaaS. The comments often contain implementation details, stack discussions, and monetization considerations for such
- **[Both]** https://omma.build/pricing
  - Omma.build’s pricing page outlines the cost tiers and features of their product (likely an automation or app-building platform given context). It matters for ROI calculations if you consider it as par
- **[Both]** https://github.com/calesthio/Crucix?ref=opensourceprojects.dev
  - Crucix is a project (referenced via opensourceprojects.dev) that you’ve bookmarked in the context of open-source experimentation. It likely focuses on a specific developer, devops, or AI utility—detai
- **[Both]** https://github.com/ruzin/stenoai
  - StenoAI is likely a tool that provides transcription, summarization, or note-taking automation, possibly for meetings or calls. It automates the capture and structuring of spoken information. Unique b
- **[Both]** https://github.com/PolymathicAI/the_well/
  - the_well is a 15 TB collection of physics simulation datasets covering 16 domains (fluids, biological systems, acoustic scattering, MHD, supernovae, etc.). It ships with a unified PyTorch interface so
- **[SaaS]** https://barkod.studio/
  - Barkod Studio is a design/branding/product site—likely a studio offering design, visuals, or brand systems services. You can mine it for design patterns or use it as a source of inspiration when promp
- **[Both]** https://www.blueprint.am/
  - blueprint.am is a product (likely a planning/blueprint tool) with a visually-oriented interface for mapping ideas, plans, or systems. It may offer templates and boards useful for strategy and architec
- **[Both]** https://github.com/blader/humanizer
  - humanizer is a Claude Code skill that rewrites text to sound more human, removing typical AI tell‑tale signs. It adjusts tone, phrasing, and structure to be less “LLM-ish” while preserving meaning. Un
- **[Both]** https://github.com/NawfalMotii79/PLFM_RADAR
  - PLFM_RADAR is an open-source 10.5 GHz phased-array RADAR system, including hardware design, firmware, and processing code. It’s designed as a low-cost, open reference platform capable of tracking mult
- **[SaaS]** https://vonsel.com/
  - Vonsel is a product or studio site (likely design, dev, or AI-oriented) you’ve bookmarked. It’s a reference for UX, branding, or product positioning. Unique to you as a design/business inspiration rat
- **[Both]** https://safishamsi/graphify → https://github.com/safishamsi/graphify
  - Graphify is a project (context suggests graph tooling for AI, e.g., LangGraph-like agents or graph‑based workflows). It likely provides primitives for building graph‑structured AI apps. Its unique ang
- **[Both]** https://cobalt.tools/
  - cobalt.tools is a web tool suite (often used for multimedia downloading/processing, historically YouTube-related). It can simplify media acquisition for downstream analysis. Unique as a hosted, generi
- **[Both]** https://www.sabrina.dev/p/claude-code-source-leak-analysis?…
  - Sabrina’s article analyzes the Claude Code source leak, explaining architecture decisions, capabilities, and implied internal design. It’s rich context for understanding how a frontier IDE/agent like 
- **[Both]** https://www.hostinger.com/openclaw?session=…
  - This is Hostinger’s OpenClaw landing/offer page, bundling hosting tailored for OpenClaw-based projects. It likely emphasizes easy deployment for agent/automation stacks built on OpenClaw. Its unique a
- **[SaaS]** https://hexsec.netlify.app/
  - HexSec is a small site (Netlify-hosted) that likely showcases infosec content, tools, or a persona/brand you bookmarked. You can mine it for design and content patterns for your own security brand pre
- **[Both]** https://getle.ad/?utm_id=…
  - GetLe.ad appears to be a lead generation/automation product, automating outreach and follow-up. The page is likely an ad landing for the platform. Unique as a modern competitor/benchmark for AI-driven
- **[SaaS]** https://mapstocash.com/free-website-871576?campaign_id=… (two UTM variants)
  - These MapstoCash URLs are campaign-specific landers promising a free website built from Google Maps leads. The core idea is converting map listings into cash-generating sites. Unique as a conceptual p
- **[SaaS]** https://scienceearth.org/
  - ScienceEarth is an educational site (course/blog platform) about science, likely with content that can be scraped and used for study or model training. It might also host curated resources on physics/
- **[Both]** https://app.emergent.sh/landing/
  - Emergent.sh landing page: likely a product or course around AI, agents, or emergent behavior. It’s valuable for understanding modern positioning for AI devtools or educational platforms. Unique as a r
- **[Both]** https://hiro.fm/sp/lifetime-deal/
  - Hiro.fm’s lifetime deal page offers a one-time price for their platform (likely podcast/audio hosting or AI transcript tooling). This informs you about value anchoring and lifetime pricing strategies.
- **[SaaS]** https://coddy.tech/
  - Coddy.tech is an educational/coding platform (interactive coding exercises, games, or AI-driven teaching). It’s a reference for gamified learning. Unique as a modern example of “code learning as a pro
- **[SaaS]** https://drive.google.com/… (three folders/files)
  - These Drive links are your own collections—likely PDFs, course dumps, or templates. They are raw material for your internal knowledge bases and future book‑to‑skill conversions. Unique because they’re
- **[SaaS]** https://github.com/breferrari/obsidian-mind (also in C)
  - Obsidian + AI interface; see above.
- **[Both]** https://restream.io/signup?continue=… & https://restream.io/dr/upload-and-stream?… & https://restream.io/pricing?…
  - These are Restream signup, upload-and-stream, and pricing pages. Restream powers multistreaming (simultaneously broadcast to YouTube, Twitch, etc.), making it key infrastructure for live content funne
- **[SaaS]** https://netool.io/?utm_id=…
  - Netool sells handheld network analysis hardware that quickly maps network info (VLAN, switchport, etc.). It’s used by network engineers to identify infrastructure on the go. Unique as a specialized di
- **[Both]** https://github.com/codeforreal1/compressO
  - CompressO is a free, offline, open-source app that compresses any video or image into a tiny size on Mac, Windows, and Linux. It’s built for privacy and simplicity, requiring no cloud upload. Unique b
- **[Both]** https://github.com/GP-commits/Git-Secrets
  - Git-Secrets is a repo focused on detecting and handling secrets in Git repositories (naming contextually aligned with secret detection best practices like gitleaks/TruffleHog). It likely includes scri
- **[Both]** https://github.com/sooryathejas/METATRON
  - METATRON is a CLI-based AI-powered penetration testing assistant that runs entirely on your local machine with a local LLM—no cloud, no API keys, no subscriptions. It automates recon (nmap, whois, wha
- **[Both]** https://botcommerce.app/lifetime-deal/?utm_id=…
  - BotCommerce’s lifetime deal page; BotCommerce is likely a chatbot/automation platform for e‑commerce or sales. The page shows pricing, features, and urgency framing. Unique as a live example of lifeti
- **[Both]** https://socialauditpro.com/how-to-retrieve-a-list-of-your-followers-from-instagram/
  - This article explains methods/tools to extract a list of your Instagram followers. It covers API, scraping, or third-party tool approaches. Unique as a high-intent growth-hacking guide you can integra
- **[Both]** https://app.selfpublishing.ai/
  - SelfPublishing.ai is a tool/platform for AI-assisted book creation, layout, and publishing. It helps generate manuscripts, covers, and metadata. Unique as a vertical-specific AI SaaS (publishing) that
- **[Both]** https://appsumo.com/products/the-black-friday-bundle/?utm_id=…
  - AppSumo listing for a “Black Friday Bundle,” bundling multiple tools at a deal price. Great for seeing how bundles are packaged and discounted. Unique as a reference for bundle strategy you can emulat
- **[Both]** https://www.aikido.dev/?ad_id=…
  - Aikido.dev is a developer-first security platform that monitors repos/infrastructure for vulnerabilities and issues. The ad landing emphasizes ease-of-use and automation. Unique as a modern “security 
- **[SaaS]** https://www.trademarkmystuff.com/?utm_id=…
  - TrademarkMyStuff is a service helping individuals and businesses file trademarks. It simplifies legal bureaucracy into a guided process. Unique because it shows how to turn legal complexity into a ste
- **[Both]** https://dealify.com/products/n8nitro?utm_id=…
  - Dealify’s page for n8NITRO, likely a performance-enhancing add-on/toolkit for n8n automations. It may include templates, infrastructure, or dashboards aimed at power users. Unique as a commercial prod
- **[SaaS]** https://docs.google.com/document/u/0/d/1V4ddYjEKTHCdiKNbXylaLqKMuF52TQXRu-0Xr0ZflRw/mobilebasic
  - A Google Doc you’ve saved—likely a guide, set of notes, or DIY system. Again, great candidate for codifying into internal frameworks. Unique as a structured text asset ideal for parsing into skills.
- **[SaaS]** https://appsumo.com/products/the-black-friday-bundle/?… (already above)
  - Bundle of tools/courses.
- **[SaaS]** https://zerotrace.org/kb/anonymous-sim-card-powered-by-silent-link/
  - Zerotrace KB article explaining anonymous SIM cards via Silent Link. It walks through how they work, legalities, and OPSEC considerations. Unique as a detailed, product-backed guide for anonymous comm
- **[SaaS]** https://appsumo.com/products/flexifunnels/ (already in C)
  - Funnel builder listing; see above.
- **[SaaS]** https://docs.google.com/document/d/1Z5SX89FV6bTy2KKnGGb61xCcS9iPg_fv2USQYi4Wc3g/mobilebasic
  - Another Google Doc you saved; likely a guide or notes on some technical or strategic topic. Unique as raw text to ingest into a private knowledge base.
- **[Both]** https://github.com/llm-exe/llm-exe and https://github.com/gregreindel/llm-exe?utm_id=…
  - llm-exe is a TypeScript/JavaScript library providing base components to build and maintain LLM-powered applications: typed functions, unified API across providers (OpenAI, Anthropic, xAI, Bedrock), an
- **[Both]** https://github.com/chenglou/pretext
  - Pretext is a pure JS/TS library for multiline text measurement and layout that never touches the DOM, using Canvas-based measurement and pure arithmetic for layout. It supports all languages, mixed bi
- **[Both]** https://github.com/OpenBB-finance/OpenBB%EF%BF%BC
  - Core OpenBB repo (terminal/platform) for investment research and analytics. It aggregates data sources, charting, and analysis features. Unique as a flagship OSS “Bloomberg for hackers”—ideal for feed
- **[Both]** https://github.com/yusufkaraaslan/Skill_Seekers
  - Skill_Seekers is a repo about building or tracking skills (learning paths, projects). It may provide growth frameworks and curated resources. Unique as a skills-first, meta-learning resource you can c
- **[Both]** https://github.com/cloudcommunity/Free-Certifications
  - Free-Certifications lists free and discounted certification courses across cloud, security, and more. It’s perfect for building a cert-focused learning agent. Unique because it maps direct credential 
- **[SaaS]** https://github.com/browser-use/web-ui/tree/main/assets
  - Assets (icons, images, etc.) used by the browser-use web UI. Useful if you want to replicate or extend the UX. Unique as a ready-made asset pack aligned with an AI browsing framework.
- **[Both]** https://github.com/open-jarvis/OpenJarvis
  - OpenJarvis is a research framework for composable, on‑device AI systems designed to build personal AI agents that run primarily on your own hardware. It provides shared primitives for building local-f
- **[Both]** https://github.com/elementalsouls/Claude-BugHunter
  - Claude-BugHunter is a Claude Code skill bundle for bug hunting and external red‑team work: 51 skills, 15 slash commands, and 681 disclosed-report patterns across 24 vulnerability classes, plus matrice
- **[Both]** https://github.com/withkynam/vibecode-pro-max-kit/
  - vibecode-pro-max-kit is a bundle of tools, templates, and workflows for building “vibe” code/brands. Likely focused on creative coding/branding. Unique as a kit exploring aesthetics + code synergy.
- **[Both]** https://github.com/confident-ai/deepteam
  - DeepTeam is a simple-to-use, open-source red teaming framework for LLM systems. Think of it as penetration testing, but for LLMs.

DeepTeam simulates attacks — jailbreaking, prompt injection, multi-tu
- **[Both]** https://github.com/1N3/Sn1per
  - About
Automated penetration testing & attack surface management platform. Recon, scan, exploit, report — 600+ exploits, 90+ integrations, 10K+ detections.

sn1persecurity.com
- **[Both]** https://github.com/cporter202/API-mega-list
  - About
This GitHub repo is a powerhouse collection of APIs you can start using immediately to build everything from simple automations to full-scale applications. One of the most valuable API lists on 
- **[SaaS]** https://github.com/The-Osint-Toolbox/Telephone-OSINT
  - You will find helpful telephone number OSINT tools on this page. Telephone OSINT can be tricky as there are not that many open databases. You need to use various technquies and tradecraft. Apps like T
- **[SaaS]** https://679894f2019f3c5c5707545e.sos.knowledgebases.net/kb
  - GoPhantom Knowledge Base. This is omething that I can refer to for GoStackBase, GoHighlEvel, & BuildwithOS since they are all lead connector platforms.
- **[Both]** https://github.com/AMAP-ML/SkillClaw?utm_source=opensourceprojects.dev&ref=opensourceprojects.dev
  - SkillClaw: Evolving Agent Skills From Real Conversations
Imagine you've built an AI agent that handles customer support. It starts out competent, but after a few hundred real conversations, you realiz
- **[Both]** https://www.imonu.com/home
  - Studio
/ video engine
One prompt. Full video. Your keys or ours.

Bring Your Own Keys — any AI API — or use ours

Snipe Pyramid — NASA, Wikimedia & 20+ archives

Parallel Rendering — renders segments 
- **[Both]** https://github.com/nicotsx/zerobyte
  - About
Backup automation for self-hosters. Built on top of restic

zerobyte.app
- **[Both]** https://github.com/JCodesMore/ai-website-cloner-template
  - About
Clone any website with one command using AI coding agents

dsc.gg/jcodesmore
- **[SaaS]** https://github.com/akhil-dara/WAInsight
  - About
Forensic analysis of already-acquired WhatsApp Android databases - browse every chat exactly like the WhatsApp home screen, plus 30 forensic pages: media recovery, visual-hash search, contact + 
- **[SaaS]** https://github.com/awesome-foss/awesome-sysadmin
  - About
A curated list of amazingly awesome open-source sysadmin resources.
- **[Both]** https://termux.achik.us/darkfly-in-termux-installation-and-usage-commands/
  - DarkFly-Tool in Termux – Installation & Usage Commands
DarkFly-Tool is an all-in-one Termux toolkit that provides a large collection of ethical hacking, OSINT, networking, and security tools in a sing
- **[Both]** https://github.com/cporter202/stock-market-signal-automation
  - About
Build your own data-driven market edge with swing-trade signal webhooks, dashboards, alerts, AI agents, and automation examples.
- **[Both]** https://github.com/six2dez/burp-ai-agent
  - About
Burp Suite extension that adds built-in MCP tooling, AI-assisted analysis, privacy controls, passive and active scanning and more

burp-ai-agent.six2dez.com/
- **[Both]** https://github.com/loxy0devlp/RedTiger-Tools
  - About
RedTiger-Tools is a multifunction automation tool dedicated to pentesting and OSINT. The project is open source and designed to be fully configurable according to user needs. It also includes a 
- **[SaaS]** https://github.com/iamsrikanthnani/pluely
  - About
The Open Source Alternative to Cluely - A lightning-fast, privacy-first AI assistant that works seamlessly during meetings, interviews, and conversations without anyone knowing. Built with Tauri
- **[Both]** https://github.com/Donchitos/Claude-Code-Game-Studios
  - About
Turn Claude Code into a full game dev studio — 49 AI agents, 72 workflow skills, and a complete coordination system mirroring real studio hierarchy.
- **[Both]** https://github.com/santifer/career-ops
  - About
AI-powered job search system built on Claude Code. 14 skill modes, Go dashboard, PDF generation, batch processing.

career-ops.org
- **[SaaS]** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
  - About
An AI SKILL that provide design intelligence for building professional UI/UX multiple platforms

www.uupm.cc/
- **[Both]** https://github.com/czlonkowski/n8n-mcp
  - About
A MCP for Claude Desktop / Claude Code / Windsurf / Cursor to build n8n workflows for you

www.n8n-mcp.com/
- **[SaaS]** https://github.com/OpenCut-app/OpenCut
  - About
The open-source CapCut alternative

opencut.app
- **[Both]** https://github.com/infoslack/awesome-web-hacking
  - awesome-web-hacking
This list is for anyone wishing to learn about web application security but do not have a starting point.

You can help by sending Pull Requests to add more information.

If you're
- **[Both]** https://github.com/Salomondiei08/oh-my-hermes
  - About
An opinionated workflow layer for building, shipping, and operating apps with Hermes Agent
- **[Both]** https://github.com/LiteLLM-Labs/litellm-agent-control-plane
  - About
1 place to call all your agents - OpenCode, Hermes, Claude Managed Agents, Cursor Agents API, DeepAgents.

docs.litellm-agent-platform.ai

---

## 📝 Notes

- All 463 tools require building from source (no pre-built Docker images found)
- Deployment should use `docker compose up -d --build` on the VPS (not Hostinger editor)
- The Hostinger Docker Compose editor only supports pre-built registry images
- Next step: prioritize which tools to build and deploy first

---

*Report generated by OWL — Agent OS Analysis Engine*