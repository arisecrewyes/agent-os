# Bolt DIY — Free AI Coding & Development
# Source: https://github.com/stackblitz-labs/bolt.diy
# Uses node:22 (glibc) + wrangler pages dev for runtime
# Build uses patched vite config to remove cloudflare workerd dependency
FROM node:22
WORKDIR /app
RUN apt-get update && apt-get install -y git curl bash python3 build-essential && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN git clone --depth 1 https://github.com/stackblitz-labs/bolt.diy.git .
RUN pnpm install

# Write patched vite config (no cloudflare dependency for build)
RUN cat > vite.config.build.ts << VITEEOF
import { vitePlugin as remixVitePlugin } from "@remix-run/dev";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { optimizeCssModules } from "vite-plugin-optimize-css-modules";
import tsconfigPaths from "vite-tsconfig-paths";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });
dotenv.config();
export default defineConfig((config) => {
  return {
    define: { "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV) },
    build: { target: "esnext" },
    plugins: [
      remixVitePlugin(),
      nodePolyfills({
        include: ["buffer", "process", "util", "stream"],
        globals: { Buffer: true, process: true, global: true },
        protocolImports: true,
        exclude: ["child_process", "fs", "path"],
      }),
      UnoCSS(),
      optimizeCssModules({}),
      tsconfigPaths(),
    ],
  };
});
VITEEOF

RUN cp vite.config.ts vite.config.ts.orig && cp vite.config.build.ts vite.config.ts
ENV NODE_OPTIONS="--max-old-space-size=3072"
RUN pnpm run build
RUN ls -la /app/build/client/ || (echo "BUILD FAILED" && exit 1)

EXPOSE 5173
ENV NODE_ENV=production
ENV PORT=5173
CMD ["pnpm", "run", "dockerstart"]
