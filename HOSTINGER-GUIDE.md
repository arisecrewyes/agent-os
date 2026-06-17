# Hostinger VPS — Docker Project Placement Guide

## Understanding Your VPS File Structure

Think of your Hostinger VPS like a filing cabinet. Here's what's already in it:

```
/root/                          ← Your home directory (the filing cabinet)
├── agentos/                    ← Agent OS Dashboard (ALREADY WORKING - don't touch!)
│   ├── docker-compose.yml      ← Dashboard's compose file
│   ├── .env                    ← Dashboard's environment variables
│   └── ...                     ← Dashboard source code
│
├── agentos-projects/           ← WHERE NEW AGENT PROJECTS GO (new drawer)
│   ├── agent-creator/          ← Project 1 (you already tried this)
│   │   └── docker-compose.yml
│   ├── hermes/                 ← Project 2
│   │   └── docker-compose.yml
│   └── ...etc
│
└── (other existing projects)   ← root-traefik-1, n8n, etc.
```

## Why NOT in /root/ directly?

If you put new compose files directly in `/root/`, they would conflict with the Agent OS dashboard's compose file. Each project needs its **own directory** with its **own compose file**.

## Why subdirectories in /root/agentos-projects/?

Each Docker project is a **self-contained folder** with its own `docker-compose.yml`. This is exactly like your existing `agentos/` folder — it has its own compose file, its own `.env`, and its own containers.

## Visual Example

Here's what your Agent Creator project folder should look like:

```
/root/agentos-projects/
└── agent-creator/
    ├── docker-compose.yml      ← Defines ALL containers for this agent
    └── .env                    ← API keys and settings (optional)
```

Inside that ONE `docker-compose.yml`, you define MULTIPLE containers — one for each tool that makes up that agent.

## Example: Content Creator Agent

The Content Creator agent uses multiple tools (reclip, Clypra, Hyperframes, etc.). Instead of separate projects for each tool, they all live in ONE project:

```
/root/agentos-projects/
└── content-creator/
    └── docker-compose.yml      ← ONE file with MULTIPLE containers
```

That single `docker-compose.yml` would look like:

```yaml
services:
  reclip:
    image: ghcr.io/yourname/reclip:latest
    container_name: cc-reclip
    restart: unless-stopped
    expose:
      - "8081"
    networks:
      - root_default

  clypra:
    image: ghcr.io/yourname/clypra:latest
    container_name: cc-clypra
    restart: unless-stopped
    expose:
      - "8082"
    networks:
      - root_default

  hyperframes:
    image: ghcr.io/yourname/hyperframes:latest
    container_name: cc-hyperframes
    restart: unless-stopped
    expose:
      - "8083"
    networks:
      - root_default

networks:
  root_default:
    external: true
```

All three containers share the `root_default` network, so they can talk to each other and to the Agent OS dashboard.

## How to Create This on Hostinger

1. Go to Hostinger → Docker → Compose
2. **Project name:** `content-creator`
3. **Compose file:** Paste the YAML (like above)
4. Click Deploy

The containers will be created at:
```
/root/agentos-projects/content-creator/
```

NOT in `/root/` directly. NOT in `/root/agentos/`. In their own folder.

---

## Docker Images — Two Approaches Explained

### Approach A: Use Pre-Built Images (Easiest)

Someone else already built the Docker image and published it to a registry (like GHCR or Docker Hub). You just reference it in your YAML.

**Example:**
```yaml
services:
  sherlock:
    image: ghcr.io/sherlock-project/sherlock:latest    ← Pre-built by someone
    container_name: osint-sherlock
    ...
```

**Pros:** Fast, no building needed
**Cons:** Image might not exist yet, might be outdated

### Approach B: Build Your Own Images (More Control)

You write a `Dockerfile` that tells Docker how to build the tool from source. Then you build it yourself on the VPS.

**Example:**
```yaml
services:
  sherlock:
    build:
      context: ./sherlock    ← Folder containing Dockerfile
    container_name: osint-sherlock
    ...
```

**Folder structure:**
```
/root/agentos-projects/osint/
├── docker-compose.yml
└── sherlock/
    └── Dockerfile          ← Instructions to build Sherlock
```

**Pros:** Always up-to-date, full control
**Cons:** Takes time to build, needs maintenance

### Recommendation for Your VPS

**Start with Approach A** for tools that have existing images. Use **Approach B** only for tools that don't have pre-built images.

Most of the GitHub repos you listed (reclip, Clypra, Sherlock, etc.) are Python/Node projects that either:
- Already have Docker images on GHCR/Docker Hub
- Need a simple Dockerfile written for them

I'll note which approach to use for each tool in the YAML files.

---

## Your Agent Creator "Not Found" Issue

Looking at your screenshots, the `agent-creator` project shows "Not Found" because:

1. The image `ghcr.io/arisecrewyes/agent-creator:latest` **doesn't exist yet** — it was never built and pushed to GHCR
2. Hostinger can't pull a non-existent image, so the container fails to start
3. Hostinger shows "Not Found" when the container can't be created

**Solution:** We need to either:
- Build the image on the VPS (Approach B), or
- Push a pre-built image to GHCR first (Approach A)

For the Agent Creator specifically, since it's your own code from the `agent-creator/` folder in the repo, we'd build it on the VPS using a Dockerfile.

---

## Summary

| Question | Answer |
|---|---|
| Where to put projects? | `/root/agentos-projects/<project-name>/` |
| How many compose files per project? | ONE `docker-compose.yml` per project |
| How many containers per compose file? | MULTIPLE — one per tool |
| SSL during testing? | No — use HTTP port first |
| SSL after testing? | Yes — add Traefik labels later |
| Pre-built images or build our own? | Pre-built when available, build when not |
| Priority order? | Main → Memory → Skills → rest |
