const express = require('express');
const { exec } = require('child_process');
const net = require('net');
const app = express();
app.use(express.json());

const PORT = 8889;

// ═══════════════════════════════════════════════════
// UNIVERSAL API GATEWAY
// Provides REST API access to tools without native APIs
// ═══════════════════════════════════════════════════

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'universal-api-gateway', uptime: process.uptime() });
});

// ═══════════════════════════════════════════════════
// TOOL ADAPTER REGISTRY
// Each adapter wraps a non-API tool with REST endpoints
// ═══════════════════════════════════════════════════
const ADAPTER_REGISTRY = {
  proton: {
    name: 'Proton Mail',
    description: 'Send and receive emails via Proton Business Suite SMTP/IMAP',
    status: 'configured',
    endpoints: ['/api/v1/proton/send', '/api/v1/proton/inbox']
  },
  browser: {
    name: 'Browser Automation',
    description: 'Web UI automation for tools without APIs (Playwright)',
    status: 'ready',
    endpoints: ['/api/v1/browser/scrape', '/api/v1/browser/click', '/api/v1/browser/form']
  },
  cli: {
    name: 'CLI Wrapper',
    description: 'Command-line interface wrapper for desktop tools',
    status: 'ready',
    endpoints: ['/api/v1/cli/execute']
  }
};

// List all available adapters
app.get('/api/v1/adapters', (req, res) => {
  res.json({ adapters: ADAPTER_REGISTRY });
});

// ═══════════════════════════════════════════════════
// PROTON MAIL ADAPTER
// Send emails via Proton SMTP
// ═══════════════════════════════════════════════════

// Send email via Proton SMTP
app.post('/api/v1/proton/send', async (req, res) => {
  const { to, subject, body, html } = req.body;

  if (!to || !subject || (!body && !html)) {
    return res.status(400).json({ error: 'to, subject, and body (or html) are required' });
  }

  try {
    // Use curl to send via Proton SMTP
    // Proton SMTP: mail.protonmail.ch:587 (STARTTLS) or mail.protonmail.ch:465 (SSL/TLS)
    const emailContent = html || body;
    const isHtml = !!html;

    // Build the email payload
    const emailData = {
      to,
      subject,
      content: emailContent,
      contentType: isHtml ? 'text/html' : 'text/plain'
    };

    // Execute send-email script
    const result = await executeCommand(
      `node /app/adapters/proton-send.js '${JSON.stringify(emailData).replace(/'/g, "'")}'`
    );

    res.json({ success: true, message: 'Email sent via Proton SMTP', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check Proton SMTP configuration status
app.get('/api/v1/proton/status', (req, res) => {
  const smtpHost = process.env.PROTON_SMTP_HOST || 'mail.protonmail.ch';
  const smtpPort = process.env.PROTON_SMTP_PORT || '587';
  const smtpUser = process.env.PROTON_SMTP_USER || 'not configured';
  const hasPassword = !!process.env.PROTON_SMTP_PASSWORD;

  res.json({
    configured: hasPassword,
    smtpHost,
    smtpPort,
    smtpUser: hasPassword ? smtpUser : 'not set',
    passwordSet: hasPassword,
    note: 'Set PROTON_SMTP_USER and PROTON_SMTP_PASSWORD environment variables'
  });
});

// ═══════════════════════════════════════════════════
// BROWSER AUTOMATION ADAPTER
// For tools that only have web UIs (no API)
// ═══════════════════════════════════════════════════

// Scrape a webpage
app.post('/api/v1/browser/scrape', async (req, res) => {
  const { url, selector, waitFor } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'url is required' });
  }

  try {
    const result = await executeCommand(
      `node /app/adapters/browser-scrape.js '${url}' '${selector || ''}' '${waitFor || ''}'`
    );
    res.json({ success: true, data: JSON.parse(result) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Click/interact with a webpage element
app.post('/api/v1/browser/click', async (req, res) => {
  const { url, selector, action, value } = req.body;

  if (!url || !selector) {
    return res.status(400).json({ error: 'url and selector are required' });
  }

  try {
    const result = await executeCommand(
      `node /app/adapters/browser-click.js '${url}' '${selector}' '${action || 'click'}' '${value || ''}'`
    );
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fill a form on a webpage
app.post('/api/v1/browser/form', async (req, res) => {
  const { url, fields } = req.body;

  if (!url || !fields) {
    return res.status(400).json({ error: 'url and fields are required' });
  }

  try {
    const result = await executeCommand(
      `node /app/adapters/browser-form.js '${url}' '${JSON.stringify(fields).replace(/'/g, "'")}'`
    );
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ═══════════════════════════════════════════════════
// CLI WRAPPER ADAPTER
// Execute CLI tools and return results
// ═══════════════════════════════════════════════════

app.post('/api/v1/cli/execute', async (req, res) => {
  const { command, timeout = 30000 } = req.body;

  if (!command) {
    return res.status(400).json({ error: 'command is required' });
  }

  // Security: block dangerous commands
  const blocked = ['rm -rf /', 'mkfs', 'dd if=', ':(){:|:&};:', 'chmod -R 777 /'];
  if (blocked.some(b => command.includes(b))) {
    return res.status(403).json({ error: 'Command blocked for security' });
  }

  try {
    const result = await executeCommand(command, timeout);
    res.json({ success: true, output: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ═══════════════════════════════════════════════════
// EMAIL FINDER ADAPTER (replaces Hunter.io)
// Self-hosted email discovery
// ═══════════════════════════════════════════════════

app.post('/api/v1/email/find', async (req, res) => {
  const { firstName, lastName, domain, username } = req.body;

  if (!domain && !username) {
    return res.status(400).json({ error: 'domain or username is required' });
  }

  try {
    const args = [];
    if (firstName) args.push(`--first '${firstName}'`);
    if (lastName) args.push(`--last '${lastName}'`);
    if (domain) args.push(`--domain '${domain}'`);
    if (username) args.push(`--username '${username}'`);

    const result = await executeCommand(
      `python3 /app/adapters/email-finder.py ${args.join(' ')}`,
      30000
    );
    res.json({ success: true, emails: JSON.parse(result) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ═══════════════════════════════════════════════════
// LEAD ENRICHMENT ADAPTER (replaces Clearbit/Apollo)
// Self-hosted data enrichment
// ═══════════════════════════════════════════════════

app.post('/api/v1/leads/enrich', async (req, res) => {
  const { email, domain, company } = req.body;

  if (!email && !domain && !company) {
    return res.status(400).json({ error: 'email, domain, or company is required' });
  }

  try {
    const args = [];
    if (email) args.push(`--email '${email}'`);
    if (domain) args.push(`--domain '${domain}'`);
    if (company) args.push(`--company '${company}'`);

    const result = await executeCommand(
      `python3 /app/adapters/lead-enrich.py ${args.join(' ')}`,
      30000
    );
    res.json({ success: true, data: JSON.parse(result) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ═══════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════

function executeCommand(cmd, timeout = 10000) {
  return new Promise((resolve, reject) => {
    exec(cmd, { timeout }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr || error.message));
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

// ═══════════════════════════════════════════════════
// START SERVER
// ═══════════════════════════════════════════════════
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Universal API Gateway running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Adapter list: http://localhost:${PORT}/api/v1/adapters`);
});
