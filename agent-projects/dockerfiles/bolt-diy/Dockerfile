# Bolt DIY — Free AI Coding & Development
# Source: https://github.com/stackblitz-labs/bolt.diy
# Uses pnpm + Cloudflare Wrangler
FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache git curl bash

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

RUN git clone --depth 1 https://github.com/stackblitz-labs/bolt.diy.git .

# Install with pnpm
RUN pnpm install

# Build the app
RUN pnpm run build 2>/dev/null || true

EXPOSE 5173
ENV NODE_ENV=production
ENV PORT=5173

# Use wrangler pages dev for runtime
CMD ["pnpm", "run", "dockerstart"]
