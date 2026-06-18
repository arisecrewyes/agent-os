const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;
app.get('/health', (req, res) => res.json({ status: 'ok', service: 'content-creator' }));
app.post('/api/chat', async (req, res) => {
  const { message, action } = req.body;
  if (!message) return res.status(400).json({ error: 'message required' });
  try {
    const toolUrl = getToolUrl(action);
    if (toolUrl) {
      const r = await fetch(`${toolUrl}/api/chat`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({message}) });
      const d = await r.json();
      return res.json({ service: 'content-creator', tool: toolUrl, response: d });
    }
    res.json({ service: 'content-creator', response: 'No tool matched. Use OpenRouter chat.' });
  } catch(e) { res.status(502).json({ error: e.message }); }
});
function getToolUrl(action) {
  const tools = {
    video: process.env.RECLIP_URL || 'http://cc-reclip:8081',
    edit: process.env.CLYPRA_URL || 'http://cc-clypra:8082',
    render: process.env.HYPERFRAMES_URL || 'http://cc-hyperframes:8084',
    generate: process.env.OPEN_GEN_AI_URL || 'http://cc-open-gen-ai:8085',
    sales: process.env.SALESGPT_URL || 'http://cc-salesgpt:8086',
    leads: process.env.LEADS_URL || 'http://cc-leads:8087',
    vimax: process.env.VIMAX_URL || 'http://cc-vimax:8088',
    voice: process.env.VIBEVOICE_URL || 'http://cc-vibevoice:8089',
    scrape: process.env.SOCIAL_SCRAPE_URL || 'http://cc-social-scrape:8090',
    integrate: process.env.NANGO_URL || 'http://cc-nango:8091',
    videoUse: process.env.VIDEO_USE_URL || 'http://cc-video-use:8092',
    whatsapp: process.env.WA_URL || 'http://cc-wa-automate:8093',
  };
  return tools[action] || tools.video;
}
app.listen(PORT, '0.0.0.0', () => console.log(`Content Creator :${PORT}`));
