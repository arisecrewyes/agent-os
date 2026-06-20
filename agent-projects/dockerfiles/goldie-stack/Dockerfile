# Goldie Stack — Hermes + Codex + MCP
# Source: https://github.com/affaan-m/ECC (Everything Claude Code)
FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache git python3 py3-pip make g++

# Clone ECC as the harness framework
RUN git clone --depth 1 https://github.com/affaan-m/ECC.git .

# Install Node dependencies if package.json exists
RUN if [ -f package.json ]; then npm ci; fi

# Create MCP server wrapper
COPY <<'JSEOF' /app/mcp_server.js
const http = require('http');
const PORT = process.env.PORT || 8650;

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        // MCP protocol: respond with agent capabilities
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
          jsonrpc: '2.0',
          id: data.id,
          result: {
            protocolVersion: '2024-11-05',
            capabilities: {},
            serverInfo: { name: 'goldie-mcp', version: '1.0.0' }
          }
        }));
      } catch(e) {
        res.writeHead(400);
        res.end('Invalid JSON');
      }
    });
  } else {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ status: 'ok', service: 'goldie-mcp' }));
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Goldie MCP server running on port ${PORT}`);
});
JSEOF

EXPOSE 8650
ENV NODE_ENV=production
ENV PORT=8650

CMD ["node", "mcp_server.js"]
