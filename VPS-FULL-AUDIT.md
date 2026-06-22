# Agent OS — Full VPS Audit

**Date:** 2026-06-22
**Time:** 07:38 UTC
**VPS Hostname:** srv1121935
**VPS IP:** 31.220.62.81
**Domain:** srv1121935.hstgr.cloud

---

## Table of Contents

1. [VPS System Information](#1-vps-system-information)
2. [Docker Environment](#2-docker-environment)
3. [Docker Networks](#3-docker-networks)
4. [Docker Volumes](#4-docker-volumes)
5. [All Containers](#5-all-containers)
6. [Docker Compose Projects](#6-docker-compose-projects)
7. [Environment Files](#7-environment-files)
8. [Traefik Configuration](#8-traefik-configuration)
9. [Container IP Addresses on root_default](#9-container-ip-addresses-on-root_default)
10. [GitHub Repository](#10-github-repository)

---

## 1. VPS System Information

| Property | Value |
|---|---|
| **OS** | Ubuntu 24.04.3 LTS (Noble Numbat) |
| **Kernel** | 6.8.0-124-generic |
| **Architecture** | x86_64 |
| **CPU Cores** | 2 |
| **RAM Total** | 7.8 GB |
| **RAM Used** | 3.2 GB |
| **RAM Available** | 4.6 GB |
| **Swap Total** | 2.0 GB |
| **Swap Used** | 1.4 GB |
| **Disk Total** | 96 GB |
| **Disk Used** | 73 GB (77%) |
| **Disk Available** | 23 GB |
| **Uptime** | 8 days, 6 hours, 29 minutes |
| **Load Average** | 0.25, 0.32, 0.38 |

---

## 2. Docker Environment

| Property | Value |
|---|---|
| **Docker Version** | 28.5.1 |
| **Docker API Version** | 1.51 |
| **Docker Compose Version** | v2.40.1 |
| **containerd Version** | v1.7.28 |
| **runc Version** | 1.3.0 |

---

## 3. Docker Networks

| Network Name | Driver | Scope | Subnet |
|---|---|---|---|
| agent-os_default | bridge | local | — |
| agentos_default | bridge | local | — |
| bridge | bridge | local | — |
| browser-use_default | bridge | local | — |
| browserless-hz1t_default | bridge | local | — |
| dify-zlfw_default | bridge | local | — |
| dify-zlfw_ssrf-network | bridge | local | — |
| hermes-agent-7llb_default | bridge | local | — |
| host | host | local | — |
| n8n-workflows_workflows-network | bridge | local | — |
| nocodb-a4cp_default | bridge | local | — |
| none | null | local | — |
| obsidian-webdav_default | bridge | local | — |
| obsidian-webdav_obsidian-webdav_default | bridge | local | — |
| openclaw-config-write_default | bridge | local | — |
| openclaw-oi15_default | bridge | local | — |
| openclaw-x9sc_default | bridge | local | — |
| **root_default** | **bridge** | **local** | **172.18.0.0/16 (Gateway: 172.18.0.1)** |
| the-vault-financial_default | bridge | local | — |

---

## 4. Docker Volumes

| Volume Name |
|---|
| 0b74ee606cf847c79e4a4c0cc04d6144d845980fa3b5403ff45405b354c4f69d |
| 1be068efd1f7c3486312ee1cffc6df6763215d957c972fc72e6e7d99b8db459a |
| 2ff4717f623b6789055687ac53ca9f67dd7959e2e0e173702a0f0f3262132a08 |
| 4f0fb1627307581f08efa15b505144bcb9e4e8ef9421987a043f32b08585ad4c |
| 5d11c09f4ab8b9ab315ed06bbd96f065f8e355bdccd56a82b40ae5dde12dc00f |
| 7e5135a94e225951c150dbb5a0bb498346d04054e6e3cfa519a9d248620f92c9 |
| 15a13b0c837faf9faed12bc0a6fd0abf414570627bd462155f9fa30010e330f6 |
| 35f37806ccc67564e44c3445ff9c88a03c19b94582213c8a7615831d5a57f8d |
| 298b941a6236e7c362f4998aa45e97930a2ad0cfc39c5679a4ed3f5182a4ef2c |
| 821f9076ec96d0d61c448058b71174c9d9d8d3f23c68d38c56274eb56654e8f6 |
| 3819a89dbb2393879cb9ca8919044c6b899d303129c18f11760d4c49e45c3594 |
| 56211898b920f3cd8502250e43e991448230cf341724823eeba9d3174414ad98 |
| aac6030fea9a9fd942b69f13438459b545c4771b0f4eb5b2a7a339d3ad85ed89 |
| agent-os_agentos-vault |
| agentos-data |
| agentos_agentos-data |
| b2a8e3422d97f7f74a64bf899764fe7f2a40dde5f156e5feb90d584a32136867 |
| bolt-diy-build |
| c4eede99c15192bb5194e75a84a044fd4db2c09605591be89c1aadee0fedf5d |
| dify-zlfw_db |
| dify-zlfw_dify-storage |
| dify-zlfw_plugin-daemon |
| dify-zlfw_redis |
| dify-zlfw_weaviate |
| e8c13a1682b4d7824e6622046b0a05c24cfb33bb5f29375e6005ec74ae73e2e9 |
| f6584feeee486a576948f9f3a21d3c3b7a2b29fb49119f8e861f3f3c231c715c |
| lead-gen_mautic-db-data |
| memory-brain_mem-data |
| memory-brain_obsidian-vault |
| n8n-workflows_workflows-db |
| n8n-workflows_workflows-logs |
| n8n_data |
| nocodb-a4cp_nocodb_data |
| nocodb-a4cp_nocodb_pgdata |
| obsidian-vault |
| obsidian-webdav_webdav-data |
| second-brain_obsidian-vault |
| traefik_data |

---

## 5. All Containers

### Running Containers (47 Total)

| # | Container Name | Image | Status | Ports |
|---|---|---|---|---|
| 1 | openclaw-x9sc-openclaw-1 | ghcr.io/hostinger/hvps-openclaw:latest | Up 2 hours | — |
| 2 | openclaw-oi15-openclaw-1 | ghcr.io/hostinger/hvps-openclaw:latest | Up 15 min | — |
| 3 | universal-api-gateway | universal-api-gateway-api-gateway | Up 25 hours | 8889/tcp |
| 4 | osint-sherlock | ghcr.io/arisecrewyes/osint:latest | Up 26 hours | 0.0.0.0:9090->9090/tcp |
| 5 | sales-outreach-langgraph | lead-gen-sales-outreach-langgraph:latest | Up 26 hours | 8706/tcp |
| 6 | wa-web-js | lead-gen-wa-web-js:latest | Up 26 hours | 8704/tcp |
| 7 | salesgpt | lead-gen-salesgpt:latest | Up 26 hours | 8703/tcp |
| 8 | understand-anything | lead-gen-understand-anything:latest | Up 26 hours | 8709/tcp |
| 9 | lead-gen-py | lead-gen-lead-gen-py:latest | Up 26 hours | 8700/tcp |
| 10 | cold-email-auto | lead-gen-cold-email-auto:latest | Up 26 hours | 8702/tcp |
| 11 | gitdorker | lead-gen-gitdorker:latest | Up 26 hours | 8705/tcp |
| 12 | leads-generator | lead-gen-leads-generator:latest | Up 26 hours | 8701/tcp |
| 13 | auto-apply | lead-gen-auto-apply:latest | Up 26 hours | 8707/tcp |
| 14 | fusion-fable | lead-gen-fusion-fable:latest | Up 26 hours | 8710/tcp |
| 15 | agentos-connector | ghcr.io/arisecrewyes/agent-connector:latest | Up 25 hours | 8888/tcp |
| 16 | coldcontactxlsx | ghcr.io/arisecrewyes/coldcontactxlsx:latest | Up 26 hours | 8680/tcp |
| 17 | skills | ghcr.io/arisecrewyes/skills:latest | Up 26 hours | 0.0.0.0:9100->9100/tcp |
| 18 | skills-skillseekers | skills-skillseekers:latest | Up 26 hours | 0.0.0.0:9103->9103/tcp |
| 19 | skills-skillopt | skills-skillopt:latest | Up 26 hours | 0.0.0.0:9102->9102/tcp |
| 20 | skills-humanizer | skills-humanizer:latest | Up 26 hours | 0.0.0.0:9105->9105/tcp |
| 21 | book-to-skill | book-to-skill:latest | Up 26 hours | 0.0.0.0:9104->9104/tcp |
| 22 | skills-stop-slop | skills-stop-slop:latest | Up 26 hours | 0.0.0.0:9106->9106/tcp |
| 23 | osint-spiderfoot | spiderfoot:latest | Up 26 hours | 0.0.0.0:9093->9093/tcp |
| 24 | osint-governance | governance:latest | Up 26 hours | 0.0.0.0:9095->9095/tcp |
| 25 | osint-hexstrike | hexstrike:latest | Up 26 hours | 0.0.0.0:9094->9094/tcp |
| 26 | conductor | ghcr.io/arisecrewyes/conductor:latest | Up 27 hours | 3002/tcp |
| 27 | dograh | ghcr.io/arisecrewyes/dograh:latest | Up 27 hours | 8670/tcp |
| 28 | second-brain | ghcr.io/arisecrewyes/second-brain:latest | Up 27 hours | 8095/tcp |
| 29 | goldie-hermes-mcp | ghcr.io/arisecrewyes/goldie-stack:latest | Up 27 hours | 8650/tcp |
| 30 | content-creator | ghcr.io/arisecrewyes/content-creator:latest | Up 27 hours | 8080/tcp |
| 31 | bolt-diy | bolt-diy:latest | Up 27 hours | 0.0.0.0:5173->5173/tcp |
| 32 | odysseus | ghcr.io/arisecrewyes/odysseus:latest | Up 27 hours | 7000/tcp |
| 33 | minimax-hermes | ghcr.io/arisecrewyes/minimax-hermes:latest | Up 27 hours | 8660/tcp |
| 34 | mem-memanto | mem-memanto:latest | Up 27 hours | 0.0.0.0:8091->8091/tcp |
| 35 | mem-quant-mind | mem-quant-mind:latest | Up 27 hours | 0.0.0.0:8092->8092/tcp |
| 36 | mem-turbovec | mem-turbovec:latest | Up 27 hours | 0.0.0.0:8093->8093/tcp |
| 37 | mem-deer-flow | mem-deer-flow:latest | Up 27 hours | 0.0.0.0:8094->8094/tcp |
| 38 | hermes-voice | ghcr.io/arisecrewyes/hermes-voice:latest | Up 27 hours | 8643/tcp |
| 39 | hermes | ghcr.io/arisecrewyes/hermes-agent:latest | Up 27 hours | 8642/tcp |
| 40 | goldie-codex | goldie-codex:latest | Up 27 hours | 0.0.0.0:8651->8651/tcp |
| 41 | pullfrog | pullfrog:latest | Up 27 hours | 0.0.0.0:8653->8653/tcp |
| 42 | openviking | openviking:latest | Up 27 hours | 0.0.0.0:8652->8652/tcp |
| 43 | memory-engine | ghcr.io/arisecrewyes/memory-brain:latest | Up 32 hours | 0.0.0.0:8090->8090/tcp |
| 44 | root-n8n-1 | docker.n8n.io/n8nio/n8n | Up 36 hours | 127.0.0.1:5678->5678/tcp |
| 45 | root-traefik-1 | traefik | Up 36 hours | 0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp |
| 46 | agent-os | ghcr.io/arisecrewyes/agent-os:latest | Up 3 days | 3000/tcp |
| 47 | hermes-agent-7llb-hermes-agent-1 | ghcr.io/hostinger/hvps-hermes-agent:latest | Up 8 days | 0.0.0.0:32769->4860/tcp |

### Exited/Stopped Containers

| # | Project Name | Config File | Status |
|---|---|---|---|
| 1 | browser-use | /docker/browser-use/docker-compose.yml | exited(1) |
| 2 | browserless-hz1t | /docker/browserless-hz1t/docker-compose.yml | exited(1) |
| 3 | dify-zlfw | /docker/dify-zlfw/docker-compose.yml | exited(1) |
| 4 | n8n-workflows | /docker/n8n-workflows/docker-compose.yml | exited(1) |
| 5 | nocodb-a4cp | /docker/nocodb-a4cp/docker-compose.yml | exited(1) |
| 6 | obsidian-webdav | /docker/obsidian-webdav/docker-compose.yml | exited(1) |
| 7 | openclaw-config-write | /docker/openclaw-config-write/docker-compose.yml | exited(1) |

---

## 6. Docker Compose Projects

### Active (Running) Projects

| # | Project Name | Containers | Config File |
|---|---|---|---|
| 1 | agent-connector | 1 | /root/agentos-projects/agent-connector/docker-compose.yml |
| 2 | agentos | 1 | /root/agentos/docker-compose.yml |
| 3 | bolt-diy | 1 | /root/agentos-projects/bolt-diy/docker-compose.yml |
| 4 | coding-dev | 3 | /root/agentos-projects/coding-dev/docker-compose.yml |
| 5 | coldcontactxlsx | 1 | /root/agentos-projects/coldcontactxlsx/docker-compose.yml |
| 6 | conductor | 1 | /root/agentos-projects/conductor/docker-compose.yml |
| 7 | content-creator | 1 | /root/agentos-projects/content-creator/docker-compose.yml |
| 8 | dograh | 1 | /root/agentos-projects/dograh/docker-compose.yml |
| 9 | goldie-stack | 1 | /root/agentos-projects/goldie-stack/docker-compose.yml |
| 10 | hermes-agent | 1 | /root/agentos-projects/hermes-agent/docker-compose.yml |
| 11 | hermes-agent-7llb | 1 | /docker/hermes-agent-7llb/docker-compose.yml |
| 12 | hermes-voice | 1 | /root/agentos-projects/hermes-voice/docker-compose.yml |
| 13 | lead-gen | 10 | /root/agentos-projects/lead-gen/docker-compose.yml |
| 14 | memory-brain | 4 | /root/agentos-projects/memory-brain/docker-compose.yml |
| 15 | minimax-hermes | 1 | /root/agentos-projects/minimax-hermes/docker-compose.yml |
| 16 | odysseus | 1 | /root/agentos-projects/odysseus/docker-compose.yml |
| 17 | openclaw-oi15 | 1 | /docker/openclaw-oi15/docker-compose.yml |
| 18 | openclaw-x9sc | 1 | /docker/openclaw-x9sc/docker-compose.yml |
| 19 | osint | 3 | /root/agentos-projects/osint/docker-compose.yml |
| 20 | root | 2 | /root/docker-compose.yml |
| 21 | second-brain | 1 | /root/agentos-projects/second-brain/docker-compose.yml |
| 22 | skills | 6 | /root/agentos-projects/skills/docker-compose.yml |
| 23 | universal-api-gateway | 1 | /root/agentos-projects/universal-api-gateway/docker-compose.yml |

---

### 6.1 agent-connector

**Config:** `/root/agentos-projects/agent-connector/docker-compose.yml`

```yaml
services:
  connector:
    image: ghcr.io/arisecrewyes/agent-connector:latest
    container_name: agentos-connector
    restart: unless-stopped
    expose:
      - "8888"
    environment:
      - NODE_ENV=production
      - PORT=8888
      - OPENROUTER_API_KEY=sk-or-v1-REDACTED
    networks:
      - root_default

networks:
  root_default:
    external: true
```

---

### 6.2 agentos (Dashboard)

**Config:** `/root/agentos/docker-compose.yml`

```yaml
services:
  agent-os:
    image: ghcr.io/arisecrewyes/agent-os:latest
    container_name: agent-os
    restart: unless-stopped
    expose:
      - "3000"
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - VAULT_PATH=${VAULT_PATH:-/data/agentos-vault}
      - NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL:-https://agentos.srv1121935.hstgr.cloud}
    volumes:
      - agentos-data:/data
    networks:
      - root_default
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.agentos.rule=Host(`agentos.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.agentos.entrypoints=websecure"
      - "traefik.http.routers.agentos.tls=true"
      - "traefik.http.routers.agentos.tls.certresolver=mytlschallenge"
      - "traefik.http.routers.agentos.middlewares=agentos-headers"
      - "traefik.http.routers.agentos-http.rule=Host(`agentos.srv1121935.hstgr.cloud`)"
      - "traefik.http.routers.agentos-http.entrypoints=web"
      - "traefik.http.routers.agentos-http.middlewares=agentos-redirect"
      - "traefik.http.middlewares.agentos-headers.headers.SSLRedirect=true"
      - "traefik.http.middlewares.agentos-headers.headers.STSSeconds=315360000"
      - "traefik.http.middlewares.agentos-headers.headers.browserXSSFilter=true"
      - "traefik.http.middlewares.agentos-headers.headers.contentTypeNosniff=true"
      - "traefik.http.middlewares.agentos-headers.headers.forceSTSHeader=true"
      - "traefik.http.middlewares.agentos-headers.headers.SSLHost=srv1121935.hstgr.cloud"
      - "traefik.http.middlewares.agentos-headers.headers.STSIncludeSubdomains=true"
      - "traefik.http.middlewares.agentos-headers.headers.STSPreload=true"
      - "traefik.http.middlewares.agentos-redirect.redirectscheme.scheme=https"
      - "traefik.http.services.agentos.loadbalancer.server.port=3000"

volumes:
  agentos-data:

networks:
  root_default:
    external: true
```

---

### 6.3 bolt-diy

**Config:** `/root/agentos-projects/bolt-diy/docker-compose.yml`

```yaml
services:
  bolt-diy:
    image: bolt-diy:latest
    container_name: bolt-diy
    restart: unless-stopped
    ports:
      - "5173:5173"
    environment:
      - NODE_ENV=production
      - PORT=5173
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
    networks:
      - root_default

networks:
  root_default:
    external: true
```

---

### 6.4 coding-dev

**Config:** `/root/agentos-projects/coding-dev/docker-compose.yml`

```yaml
services:
  goldie-codex:
    image: goldie-codex:latest
    container_name: goldie-codex
    restart: unless-stopped
    ports:
      - "8651:8651"
    environment:
      - PYTHONUNBUFFERED=1
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - GITHUB_TOKEN=${GITHUB_TOKEN}
      - SERVICE_NAME=goldie-codex
    networks:
      - root_default

  openviking:
    image: openviking:latest
    container_name: openviking
    restart: unless-stopped
    ports:
      - "8652:8652"
    environment:
      - PYTHONUNBUFFERED=1
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - SERVICE_NAME=openviking
    networks:
      - root_default

  pullfrog:
    image: pullfrog:latest
    container_name: pullfrog
    restart: unless-stopped
    ports:
      - "8653:8653"
    environment:
      - PYTHONUNBUFFERED=1
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - GITHUB_TOKEN=${GITHUB_TOKEN}
      - SERVICE_NAME=pullfrog
    networks:
      - root_default

networks:
  root_default:
    external: true
```

---

### 6.5 coldcontactxlsx

**Config:** `/root/agentos-projects/coldcontactxlsx/docker-compose.yml`

```yaml
services:
  coldcontactxlsx:
    image: ghcr.io/arisecrewyes/coldcontactxlsx:latest
    container_name: coldcontactxlsx
    restart: unless-stopped
    expose:
      - "8680"
    environment:
      - PYTHONUNBUFFERED=1
      - OPENROUTER_API_KEY=sk-or-v1-REDACTED
    networks:
      - root_default

networks:
  root_default:
    external: true
```

---

### 6.6 conductor

**Config:** `/root/agentos-projects/conductor/docker-compose.yml`

```yaml
services:
  conductor:
    image: ghcr.io/arisecrewyes/conductor:latest
    container_name: conductor
    restart: unless-stopped
    expose:
      - "3002"
    environment:
      - PYTHONUNBUFFERED=1
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
    networks:
      - root_default

networks:
  root_default:
    external: true
```

---

### 6.7 content-creator

**Config:** `/root/agentos-projects/content-creator/docker-compose.yml`

```yaml
services:
  content-creator:
    image: ghcr.io/arisecrewyes/content-creator:latest
    container_name: content-creator
    restart: unless-stopped
    expose:
      - "8080"
    environment:
      - PYTHONUNBUFFERED=1
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
    networks:
      - root_default

networks:
  root_default:
    external: true
```

---

### 6.8 dograh

**Config:** `/root/agentos-projects/dograh/docker-compose.yml`

```yaml
services:
  dograh:
    image: ghcr.io/arisecrewyes/dograh:latest
    container_name: dograh
    restart: unless-stopped
    expose:
      - "8670"
    environment:
      - PYTHONUNBUFFERED=1
      - DOGRAH_API_KEY=${DOGRAH_API_KEY:-}
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
    networks:
      - root_default

networks:
  root_default:
    external: true
```

---

### 6.9 goldie-stack

**Config:** `/root/agentos-projects/goldie-stack/docker-compose.yml`

```yaml
services:
  goldie-hermes-mcp:
    image: ghcr.io/arisecrewyes/goldie-stack:latest
    container_name: goldie-hermes-mcp
    restart: unless-stopped
    expose:
      - "8650"
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
    networks:
      - root_default

networks:
  root_default:
    external: true
```

---

### 6.10 hermes-agent

**Config:** `/root/agentos-projects/hermes-agent/docker-compose.yml`

```yaml
services:
  hermes:
    image: ghcr.io/arisecrewyes/hermes-agent:latest
    container_name: hermes
    restart: unless-stopped
    expose:
      - "8642"
    environment:
      - PYTHONUNBUFFERED=1
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - API_SERVER_ENABLED=true
      - API_SERVER_PORT=8642
    networks:
      - root_default

networks:
  root_default:
    external: true
```

---

### 6.11 hermes-agent-7llb

**Config:** `/docker/hermes-agent-7llb/docker-compose.yml`

```yaml
services:
  hermes-agent:
    image: ghcr.io/hostinger/hvps-hermes-agent:latest
    restart: unless-stopped
    ports:
      - "4860"
    labels:
      - traefik.enable=true
      - traefik.docker.network=root_default
      - traefik.http.routers.hermes-agent-7llb.rule=Host(`hermes-agent-7llb.srv1121935.hstgr.cloud`)
      - traefik.http.routers.hermes-agent-7llb.entrypoints=websecure
      - traefik.http.routers.hermes-agent-7llb.tls.certresolver=mytlschallenge
      - traefik.http.services.hermes-agent-7llb.loadbalancer.server.port=4860
    env_file:
      - .env
    volumes:
      - ./data:/opt/data
      - ./data/linuxbrew:/home/linuxbrew
    networks:
      - root_default

networks:
  root_default:
    external: true
```

---

### 6.12 hermes-voice

**Config:** `/root/agentos-projects/hermes-voice/docker-compose.yml`

```yaml
services:
  hermes-voice:
    image: ghcr.io/arisecrewyes/hermes-voice:latest
    container_name: hermes-voice
    restart: unless-stopped
    expose:
      - "8643"
    environment:
      - PYTHONUNBUFFERED=1
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - HERMES_URL=http://hermes:8642
    networks:
      - root_default

networks:
  root_default:
    external: true
```

---

### 6.13 lead-gen

**Config:** `/root/agentos-projects/lead-gen/docker-compose.yml`

```yaml
services:
  lead-gen-py:
    image: lead-gen-lead-gen-py:latest
    container_name: lead-gen-py
    restart: unless-stopped
    expose: ["8700"]
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=sk-or-v1-REDACTED
    networks: [root_default]

  leads-generator:
    image: lead-gen-leads-generator:latest
    container_name: leads-generator
    restart: unless-stopped
    expose: ["8701"]
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=sk-or-v1-REDACTED
    networks: [root_default]

  cold-email-auto:
    image: lead-gen-cold-email-auto:latest
    container_name: cold-email-auto
    restart: unless-stopped
    expose: ["8702"]
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=sk-or-v1-REDACTED
    networks: [root_default]

  salesgpt:
    image: lead-gen-salesgpt:latest
    container_name: salesgpt
    restart: unless-stopped
    expose: ["8703"]
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=sk-or-v1-REDACTED
    networks: [root_default]

  wa-web-js:
    image: lead-gen-wa-web-js:latest
    container_name: wa-web-js
    restart: unless-stopped
    expose: ["8704"]
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=sk-or-v1-REDACTED
    networks: [root_default]

  gitdorker:
    image: lead-gen-gitdorker:latest
    container_name: gitdorker
    restart: unless-stopped
    expose: ["8705"]
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=sk-or-v1-REDACTED
    networks: [root_default]

  sales-outreach-langgraph:
    image: lead-gen-sales-outreach-langgraph:latest
    container_name: sales-outreach-langgraph
    restart: unless-stopped
    expose: ["8706"]
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=sk-or-v1-REDACTED
    networks: [root_default]

  auto-apply:
    image: lead-gen-auto-apply:latest
    container_name: auto-apply
    restart: unless-stopped
    expose: ["8707"]
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=sk-or-v1-REDACTED
    networks: [root_default]

  understand-anything:
    image: lead-gen-understand-anything:latest
    container_name: understand-anything
    restart: unless-stopped
    expose: ["8709"]
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=sk-or-v1-REDACTED
    networks: [root_default]

  fusion-fable:
    image: lead-gen-fusion-fable:latest
    container_name: fusion-fable
    restart: unless-stopped
    expose: ["8710"]
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=sk-or-v1-REDACTED
    networks: [root_default]

networks:
  root_default:
    external: true
```

---

### 6.14 memory-brain

**Config:** `/root/agentos-projects/memory-brain/docker-compose.yml`

```yaml
services:
  mem-memanto:
    image: mem-memanto:latest
    container_name: mem-memanto
    restart: unless-stopped
    expose:
      - "8091"
    ports:
      - "8091:8091"
    environment:
      - PYTHONUNBUFFERED=1
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - SERVICE_NAME=mem-memanto
    volumes:
      - mem-data:/data
    networks:
      - root_default

  mem-quant-mind:
    image: mem-quant-mind:latest
    container_name: mem-quant-mind
    restart: unless-stopped
    expose:
      - "8092"
    ports:
      - "8092:8092"
    environment:
      - PYTHONUNBUFFERED=1
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - SERVICE_NAME=mem-quant-mind
    volumes:
      - mem-data:/data
    networks:
      - root_default

  mem-turbovec:
    image: mem-turbovec:latest
    container_name: mem-turbovec
    restart: unless-stopped
    expose:
      - "8093"
    ports:
      - "8093:8093"
    environment:
      - PYTHONUNBUFFERED=1
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - SERVICE_NAME=mem-turbovec
    volumes:
      - mem-data:/data
    networks:
      - root_default

  mem-deer-flow:
    image: mem-deer-flow:latest
    container_name: mem-deer-flow
    restart: unless-stopped
    expose:
      - "8094"
    ports:
      - "8094:8094"
    environment:
      - PYTHONUNBUFFERED=1
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - SERVICE_NAME=mem-deer-flow
    volumes:
      - mem-data:/data
    networks:
      - root_default

volumes:
  mem-data:

networks:
  root_default:
    external: true
```

---

### 6.15 minimax-hermes

**Config:** `/root/agentos-projects/minimax-hermes/docker-compose.yml`

```yaml
services:
  minimax-hermes:
    image: ghcr.io/arisecrewyes/minimax-hermes:latest
    container_name: minimax-hermes
    restart: unless-stopped
    expose:
      - "8660"
    environment:
      - PYTHONUNBUFFERED=1
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - OLLAMA_BASE_URL=${OLLAMA_BASE_URL:-http://localhost:11434}
      - MINIMAX_API_KEY=${MINIMAX_API_KEY:-}
    networks:
      - root_default

networks:
  root_default:
    external: true
```

---

### 6.16 odysseus

**Config:** `/root/agentos-projects/odysseus/docker-compose.yml`

```yaml
services:
  odysseus:
    image: ghcr.io/arisecrewyes/odysseus:latest
    container_name: odysseus
    restart: unless-stopped
    expose:
      - "7000"
    environment:
      - PYTHONUNBUFFERED=1
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
    networks:
      - root_default

networks:
  root_default:
    external: true
```

---

### 6.17 osint

**Config:** `/root/agentos-projects/osint/docker-compose.yml`

```yaml
services:
  osint-spiderfoot:
    image: spiderfoot:latest
    container_name: osint-spiderfoot
    restart: unless-stopped
    ports:
      - "9093:9093"
    environment:
      - PYTHONUNBUFFERED=1
      - OPENROUTER_API_KEY=sk-or-v1-REDACTED
      - SERVICE_NAME=osint-spiderfoot
    networks:
      - root_default

  osint-hexstrike:
    image: hexstrike:latest
    container_name: osint-hexstrike
    restart: unless-stopped
    ports:
      - "9094:9094"
    environment:
      - PYTHONUNBUFFERED=1
      - OPENROUTER_API_KEY=sk-or-v1-REDACTED
      - SERVICE_NAME=osint-hexstrike
    networks:
      - root_default

  osint-governance:
    image: governance:latest
    container_name: osint-governance
    restart: unless-stopped
    ports:
      - "9095:9095"
    environment:
      - PYTHONUNBUFFERED=1
      - OPENROUTER_API_KEY=sk-or-v1-REDACTED
      - SERVICE_NAME=osint-governance
    networks:
      - root_default

networks:
  root_default:
    external: true
```

---

### 6.18 second-brain

**Config:** `/root/agentos-projects/second-brain/docker-compose.yml`

```yaml
services:
  second-brain:
    image: ghcr.io/arisecrewyes/second-brain:latest
    container_name: second-brain
    restart: unless-stopped
    expose:
      - "8095"
    environment:
      - PYTHONUNBUFFERED=1
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - OBSIDIAN_VAULT_PATH=/data/obsidian-vault
    volumes:
      - obsidian-vault:/data/obsidian-vault
    networks:
      - root_default

volumes:
  obsidian-vault:

networks:
  root_default:
    external: true
```

---

### 6.19 skills

**Config:** `/root/agentos-projects/skills/docker-compose.yml`

```yaml
services:
  skills:
    image: ghcr.io/arisecrewyes/skills:latest
    container_name: skills
    restart: unless-stopped
    ports:
      - "9100:9100"
    environment:
      - PYTHONUNBUFFERED=1
      - OPENROUTER_API_KEY=sk-or-v1-REDACTED
      - SERVICE_NAME=skill-master
    networks:
      - root_default

  skills-skillopt:
    image: skills-skillopt:latest
    container_name: skills-skillopt
    restart: unless-stopped
    ports:
      - "9102:9102"
    environment:
      - PYTHONUNBUFFERED=1
      - OPENROUTER_API_KEY=sk-or-v1-REDACTED
      - SERVICE_NAME=skills-skillopt
    networks:
      - root_default

  skills-skillseekers:
    image: skills-skillseekers:latest
    container_name: skills-skillseekers
    restart: unless-stopped
    ports:
      - "9103:9103"
    environment:
      - PYTHONUNBUFFERED=1
      - OPENROUTER_API_KEY=sk-or-v1-REDACTED
      - SERVICE_NAME=skills-skillseekers
    networks:
      - root_default

  book-to-skill:
    image: book-to-skill:latest
    container_name: book-to-skill
    restart: unless-stopped
    ports:
      - "9104:9104"
    environment:
      - PYTHONUNBUFFERED=1
      - OPENROUTER_API_KEY=sk-or-v1-REDACTED
      - SERVICE_NAME=book-to-skill
    networks:
      - root_default

  skills-humanizer:
    image: skills-humanizer:latest
    container_name: skills-humanizer
    restart: unless-stopped
    ports:
      - "9105:9105"
    environment:
      - PYTHONUNBUFFERED=1
      - OPENROUTER_API_KEY=sk-or-v1-REDACTED
      - SERVICE_NAME=skills-humanizer
    networks:
      - root_default

  skills-stop-slop:
    image: skills-stop-slop:latest
    container_name: skills-stop-slop
    restart: unless-stopped
    ports:
      - "9106:9106"
    environment:
      - PYTHONUNBUFFERED=1
      - OPENROUTER_API_KEY=sk-or-v1-REDACTED
      - SERVICE_NAME=skills-stop-slop
    networks:
      - root_default

networks:
  root_default:
    external: true
```

---

### 6.20 universal-api-gateway

**Config:** `/root/agentos-projects/universal-api-gateway/docker-compose.yml`

```yaml
services:
  api-gateway:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: universal-api-gateway
    restart: unless-stopped
    expose:
      - "8889"
    environment:
      - NODE_ENV=production
      - PORT=8889
      - PROTON_SMTP_HOST=mail.protonmail.ch
      - PROTON_SMTP_PORT=587
      - PROTON_SMTP_USER=${PROTON_SMTP_USER:-}
      - PROTON_SMTP_PASSWORD=${PROTON_SMTP_PASSWORD:-}
    networks:
      - root_default
    volumes:
      - /app/node_modules

networks:
  root_default:
    external: true
```

**Dockerfile:**
```dockerfile
FROM node:22-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-venv \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

RUN pip install --no-cache-dir dnspython requests

COPY package.json package-lock.json ./
RUN npm ci --only=production

RUN npx playwright install chromium
RUN npx playwright install-deps chromium

COPY server.js ./
COPY adapters/ ./adapters/

RUN chmod +x /app/adapters/*.py

EXPOSE 8889

CMD ["node", "server.js"]
```

---

### 6.21 root (Traefik + n8n)

**Config:** `/root/docker-compose.yml`

```yaml
services:
  traefik:
    image: "traefik"
    restart: always
    command:
      - "--api=true"
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.web.http.redirections.entryPoint.to=websecure"
      - "--entrypoints.web.http.redirections.entryPoint.scheme=https"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.mytlschallenge.acme.tlschallenge=true"
      - "--certificatesresolvers.mytlschallenge.acme.email=${SSL_EMAIL}"
      - "--certificatesresolvers.mytlschallenge.acme.storage=/letsencrypt/acme.json"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - traefik_data:/letsencrypt
      - /var/run/docker.sock:/var/run/docker.sock:ro

  n8n:
    image: docker.n8n.io/n8nio/n8n
    restart: always
    ports:
      - "127.0.0.1:5678:5678"
    labels:
      - traefik.enable=true
      - traefik.http.routers.n8n.rule=Host(`${SUBDOMAIN}.${DOMAIN_NAME}`)
      - traefik.http.routers.n8n.tls=true
      - traefik.http.routers.n8n.entrypoints=web,websecure
      - traefik.http.routers.n8n.tls.certresolver=mytlschallenge
      - traefik.http.middlewares.n8n.headers.SSLRedirect=true
      - traefik.http.middlewares.n8n.headers.STSSeconds=315360000
      - traefik.http.middlewares.n8n.headers.browserXSSFilter=true
      - traefik.http.middlewares.n8n.headers.contentTypeNosniff=true
      - traefik.http.middlewares.n8n.headers.forceSTSHeader=true
      - traefik.http.middlewares.n8n.headers.SSLHost=${DOMAIN_NAME}
      - traefik.http.middlewares.n8n.headers.STSIncludeSubdomains=true
      - traefik.http.middlewares.n8n.headers.STSPreload=true
      - traefik.http.routers.n8n.middlewares=n8n@docker
    environment:
      - N8N_HOST=${SUBDOMAIN}.${DOMAIN_NAME}
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - NODE_ENV=production
      - WEBHOOK_URL=https://${SUBDOMAIN}.${DOMAIN_NAME}/
      - GENERIC_TIMEZONE=${GENERIC_TIMEZONE}
      - N8N_PROXY_HOPS=1
    volumes:
      - n8n_data:/home/node/.n8n
      - /local-files:/files

volumes:
  traefik_data:
    external: true
  n8n_data:
    external: true
```

---

### 6.22 openclaw-oi15

**Config:** `/docker/openclaw-oi15/docker-compose.yml`

```yaml
services:
  openclaw:
    image: ghcr.io/hostinger/hvps-openclaw:latest
    init: true
    env_file:
      - .env
    labels:
      - traefik.enable=true
      - traefik.docker.network=root_default
      - traefik.http.routers.openclaw-oi15.rule=Host(`openclaw-oi15.srv1121935.hstgr.cloud`)
      - traefik.http.routers.openclaw-oi15.entrypoints=websecure
      - traefik.http.routers.openclaw-oi15.tls=true
      - traefik.http.routers.openclaw-oi15.tls.certresolver=mytlschallenge
      - traefik.http.services.openclaw-oi15.loadbalancer.server.port=51461
    restart: unless-stopped
    volumes:
      - ./data:/data
      - ./data/linuxbrew:/home/linuxbrew
    networks:
      - root_default

networks:
  root_default:
    external: true
```

---

### 6.23 openclaw-x9sc

**Config:** `/docker/openclaw-x9sc/docker-compose.yml`

```yaml
services:
  openclaw:
    image: ghcr.io/hostinger/hvps-openclaw:latest
    init: true
    env_file:
      - .env
    labels:
      - traefik.enable=true
      - traefik.docker.network=root_default
      - traefik.http.routers.openclaw-x9sc.rule=Host(`openclaw-x9sc.srv1121935.hstgr.cloud`)
      - traefik.http.routers.openclaw-x9sc.entrypoints=websecure
      - traefik.http.routers.openclaw-x9sc.tls=true
      - traefik.http.routers.openclaw-x9sc.tls.certresolver=mytlschallenge
      - traefik.http.services.openclaw-x9sc.loadbalancer.server.port=47625
    restart: unless-stopped
    volumes:
      - ./data:/data
      - ./data/linuxbrew:/home/linuxbrew
    networks:
      - root_default

networks:
  root_default:
    external: true
```

---

### 6.24 Exited Projects

#### browser-use (`/docker/browser-use/docker-compose.yml`)
- **Status:** exited(1)
- **Image:** built from Dockerfile (browser-use-webui)
- **Ports:** 7788
- **Traefik:** browser-use.srv1121935.hstgr.cloud

#### browserless-hz1t (`/docker/browserless-hz1t/docker-compose.yml`)
- **Status:** exited(1)
- **Image:** ghcr.io/browserless/chromium
- **Ports:** 3000
- **Traefik:** browserless-hz1t.srv1121935.hstgr.cloud

#### dify-zlfw (`/docker/dify-zlfw/docker-compose.yml`)
- **Status:** exited(1)
- **Image:** langgenius/dify-api:latest
- **Ports:** 5001
- **Traefik:** dify-zlfw.srv1121935.hstgr.cloud

#### n8n-workflows (`/docker/n8n-workflows/docker-compose.yml`)
- **Status:** exited(1)
- **Image:** workflows-doc:latest (built from Dockerfile)
- **Ports:** 8000

#### nocodb-a4cp (`/docker/nocodb-a4cp/docker-compose.yml`)
- **Status:** exited(1)
- **Image:** nocodb/nocodb:latest
- **Ports:** 8080
- **Traefik:** nocodb-a4cp.srv1121935.hstgr.cloud

#### obsidian-webdav (`/docker/obsidian-webdav/docker-compose.yml`)
- **Status:** exited(1)
- **Image:** bytemark/webdav:latest
- **Ports:** 80
- **Traefik:** disabled

#### openclaw-config-write (`/docker/openclaw-config-write/docker-compose.yml`)
- **Status:** exited(1)
- **Image:** alpine:3.20
- **Purpose:** Writes openclaw.json config file

---

## 7. Environment Files

### `/root/.env` (root project - Traefik + n8n)
```
DOMAIN_NAME=srv1121935.hstgr.cloud
SUBDOMAIN=n8n
GENERIC_TIMEZONE=Europe/Berlin
SSL_EMAIL=user@srv1121935.hstgr.cloud
```

### `/root/agentos/.env` (Agent OS Dashboard)
```
OPENROUTER_API_KEY=sk-or-v1-REDACTED
VAULT_PATH=/data/agentos-vault
NEXT_PUBLIC_APP_URL=https://agentos.srv1121935.hstgr.cloud
```

### `/root/agentos-projects/agent-connector/.env`
```
OPENROUTER_API_KEY=sk-or-v1-REDACTED
```

### `/root/agentos-projects/bolt-diy/.env`
```
OPENROUTER_API_KEY=sk-or-v1-REDACTED
```

### `/root/agentos-projects/coding-dev/.env`
```
OPENROUTER_API_KEY=***
OPENAI_API_KEY=***
GITHUB_TOKEN=***
NETLIFY_AUTH_TOKEN=***
NETLIFY_SITE_ID=***
```

### `/root/agentos-projects/coldcontactxlsx/.env`
```
OPENROUTER_API_KEY=sk-or-v1-REDACTED
```

### `/root/agentos-projects/conductor/.env`
```
OPENROUTER_API_KEY=sk-or-v1-REDACTED
VAULT_PATH=/data/agentos-vault
NEXT_PUBLIC_APP_URL=https://agentos.srv1121935.hstgr.cloud
```

### `/root/agentos-projects/content-creator/.env`
```
OPENROUTER_API_KEY=sk-or-v1-REDACTED
```

### `/root/agentos-projects/dograh/.env`
```
OPENROUTER_API_KEY=sk-or-v1-REDACTED
VAULT_PATH=/data/agentos-vault
NEXT_PUBLIC_APP_URL=https://agentos.srv1121935.hstgr.cloud
```

### `/root/agentos-projects/goldie-stack/.env`
```
OPENROUTER_API_KEY=sk-or-v1-REDACTED
```

### `/root/agentos-projects/hermes-agent/.env`
```
OPENROUTER_API_KEY=sk-or-v1-REDACTED
```

### `/root/agentos-projects/hermes-voice/.env`
```
OPENROUTER_API_KEY=sk-or-v1-REDACTED
```

### `/root/agentos-projects/lead-gen/.env`
```
OPENROUTER_API_KEY=sk-or-v1-REDACTED
OPENAI_API_KEY=
GITHUB_TOKEN=
SENDGRID_API_KEY=
MAILGUN_API_KEY=
HUNTER_API_KEY=
CLEARBIT_API_KEY=
APOLLO_API_KEY=
```

### `/root/agentos-projects/memory-brain/.env`
```
OPENROUTER_API_KEY=sk-or-v1-REDACTED
```

### `/root/agentos-projects/minimax-hermes/.env`
```
OPENROUTER_API_KEY=sk-or-v1-REDACTED
```

### `/root/agentos-projects/odysseus/.env`
```
OPENROUTER_API_KEY=sk-or-v1-REDACTED
```

### `/root/agentos-projects/osint/.env`
```
OPENROUTER_API_KEY=sk-or-v1-REDACTED
```

### `/root/agentos-projects/second-brain/.env`
```
OPENROUTER_API_KEY=sk-or-v1-REDACTED
```

### `/root/agentos-projects/skills/.env`
```
OPENROUTER_API_KEY=sk-or-v1-REDACTED
```

---

## 8. Traefik Configuration

**Traefik Version:** traefik (latest)
**Container:** root-traefik-1
**Ports:** 0.0.0.0:80→80, 0.0.0.0:443→443
**Config File:** `/root/docker-compose.yml`

### Traefik Command Arguments
```
--api=true
--api.insecure=true
--providers.docker=true
--providers.docker.exposedbydefault=false
--entrypoints.web.address=:80
--entrypoints.web.http.redirections.entryPoint.to=websecure
--entrypoints.web.http.redirections.entryPoint.scheme=https
--entrypoints.websecure.address=:443
--certificatesresolvers.mytlschallenge.acme.tlschallenge=true
--certificatesresolvers.mytlschallenge.acme.email=${SSL_EMAIL}
--certificatesresolvers.mytlschallenge.acme.storage=/letsencrypt/acme.json
```

### Volumes
- `traefik_data:/letsencrypt` (external)
- `/var/run/docker.sock:/var/run/docker.sock:ro`

### SSL Certificate Resolver
- **Name:** mytlschallenge
- **Type:** TLS Challenge
- **Email:** user@srv1121935.hstgr.cloud
- **Storage:** /letsencrypt/acme.json

### Traefik-Routed Services (with SSL)

| Service | Host | Port | Container | Status |
|---|---|---|---|---|
| n8n | n8n.srv1121935.hstgr.cloud | 5678 | root-n8n-1 | ✅ Running |
| agent-os | agentos.srv1121935.hstgr.cloud | 3000 | agent-os | ✅ Running |
| hermes-agent-7llb | hermes-agent-7llb.srv1121935.hstgr.cloud | 4860 | hermes-agent-7llb-hermes-agent-1 | ✅ Running |
| openclaw-oi15 | openclaw-oi15.srv1121935.hstgr.cloud | 51461 | openclaw-oi15-openclaw-1 | ✅ Running |
| openclaw-x9sc | openclaw-x9sc.srv1121935.hstgr.cloud | 47625 | openclaw-x9sc-openclaw-1 | ✅ Running |
| browser-use | browser-use.srv1121935.hstgr.cloud | 7788 | — | ❌ Exited |
| browserless-hz1t | browserless-hz1t.srv1121935.hstgr.cloud | 3000 | — | ❌ Exited |
| dify-zlfw | dify-zlfw.srv1121935.hstgr.cloud | 5001 | — | ❌ Exited |
| nocodb-a4cp | nocodb-a4cp.srv1121935.hstgr.cloud | 8080 | — | ❌ Exited |
| agent-creator | agent-creator.srv1121935.hstgr.cloud | 3001 | — | ❌ Not deployed |

---

## 9. Container IP Addresses on root_default

| IP Address | Container |
|---|---|
| 172.18.0.2 | root-traefik-1 |
| 172.18.0.3 | openclaw-oi15-openclaw-1 |
| 172.18.0.4 | root-n8n-1 |
| 172.18.0.5 | mem-quant-mind |
| 172.18.0.6 | bolt-diy |
| 172.18.0.7 | wa-web-js |
| 172.18.0.8 | gitdorker |
| 172.18.0.9 | hermes-agent-7llb-hermes-agent-1 |
| 172.18.0.10 | sales-outreach-langgraph |
| 172.18.0.11 | hermes |
| 172.18.0.12 | agent-os |
| 172.18.0.13 | odysseus |
| 172.18.0.14 | dograh |
| 172.18.0.15 | conductor |
| 172.18.0.16 | memory-engine |
| 172.18.0.17 | osint-sherlock |
| 172.18.0.18 | hermes-voice |
| 172.18.0.19 | goldie-hermes-mcp |
| 172.18.0.20 | mem-turbovec |
| 172.18.0.21 | minimax-hermes |
| 172.18.0.22 | coldcontactxlsx |
| 172.18.0.23 | agentos-connector |
| 172.18.0.24 | mem-memanto |
| 172.18.0.25 | mem-deer-flow |
| 172.18.0.26 | cold-email-auto |
| 172.18.0.27 | fusion-fable |
| 172.18.0.28 | auto-apply |
| 172.18.0.29 | lead-gen-py |
| 172.18.0.30 | understand-anything |
| 172.18.0.31 | osint-governance |
| 172.18.0.32 | osint-spiderfoot |
| 172.18.0.33 | osint-hexstrike |
| 172.18.0.34 | openviking |
| 172.18.0.35 | pullfrog |
| 172.18.0.36 | goldie-codex |
| 172.18.0.37 | salesgpt |
| 172.18.0.38 | leads-generator |
| 172.18.0.39 | skills-skillopt |
| 172.18.0.40 | skills-humanizer |
| 172.18.0.41 | skills-stop-slop |
| 172.18.0.42 | skills-skillseekers |
| 172.18.0.43 | book-to-skill |
| 172.18.0.44 | content-creator |
| 172.18.0.45 | second-brain |
| 172.18.0.46 | skills |
| 172.18.0.47 | universal-api-gateway |
| 172.18.0.48 | openclaw-x9sc-openclaw-1 |

---

## 10. GitHub Repository

| Property | Value |
|---|---|
| **Repo URL** | https://github.com/arisecrewyes/agent-os |
| **Visibility** | Public |
| **Local Clone** | /root/agentos |
| **CI/CD** | GitHub Actions (.github/workflows/) |
| **Container Registry** | ghcr.io/arisecrewyes/* |

### GHCR Images Published
| Image | Description |
|---|---|
| ghcr.io/arisecrewyes/agent-os:latest | Agent OS Dashboard (Next.js) |
| ghcr.io/arisecrewyes/agent-connector:latest | Agent Connector (Node.js) |
| ghcr.io/arisecrewyes/hermes-agent:latest | Hermes Agent |
| ghcr.io/arisecrewyes/odysseus:latest | Odysseus |
| ghcr.io/arisecrewyes/conductor:latest | Conductor |
| ghcr.io/arisecrewyes/content-creator:latest | Content Creator |
| ghcr.io/arisecrewyes/memory-brain:latest | Memory Engine |
| ghcr.io/arisecrewyes/second-brain:latest | Second Brain |
| ghcr.io/arisecrewyes/skills:latest | Skills Master |
| ghcr.io/arisecrewyes/goldie-stack:latest | Goldie Stack (Hermes MCP) |
| ghcr.io/arisecrewyes/hermes-voice:latest | Hermes Voice |
| ghcr.io/arisecrewyes/minimax-hermes:latest | MiniMax Hermes |
| ghcr.io/arisecrewyes/dograh:latest | Dograh |
| ghcr.io/arisecrewyes/coldcontactxlsx:latest | Cold Contact XLSX |
| ghcr.io/arisecrewyes/osint:latest | OSINT (Sherlock) |
| ghcr.io/arisecrewyes/bolt-diy:latest | Bolt DIY |

---

## Summary Statistics

| Metric | Count |
|---|---|
| **Total Docker Compose Projects** | 23 active + 7 exited = 30 |
| **Running Containers** | 47 |
| **Exited Containers** | 7 |
| **Docker Networks** | 19 |
| **Docker Volumes** | 47 |
| **GHCR Images** | 16 |
| **Traefik-Routed Services** | 10 |
| **Agent OS Containers** | 31 (across 18 projects) |
| **Infrastructure Containers** | 4 (traefik, n8n, 2x openclaw) |
| **Lead Gen Containers** | 10 |
| **Other Containers** | 3 (universal-api-gateway, pullfrog, openviking) |

---

*This audit was automatically generated on 2026-06-22 at 07:38 UTC. All data is captured as-is from the live VPS environment. API keys and secrets have been redacted for security.*
