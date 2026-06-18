const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8090;

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'memory-engine' }));

app.post('/api/chat', async (req, res) => {
  const { message, action } = req.body;
  if (!message) return res.status(400).json({ error: 'message required' });

  try {
    // Route to appropriate sub-tool based on action
    const toolUrl = getToolUrl(action);
    if (toolUrl) {
      const r = await fetch(`${toolUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const d = await r.json();
      return res.json({ service: 'memory-engine', tool: toolUrl, response: d });
    }
    res.json({ service: 'memory-engine', response: 'No tool matched. Use OpenRouter chat.' });
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
});

function getToolUrl(action) {
  const tools = {
    memory: process.env.MEMANTO_URL || 'http://mem-memanto:8091',
    knowledge: process.env.QUANT_MIND_URL || 'http://mem-quant-mind:8092',
    vector: process.env.TURBOVEC_URL || 'http://mem-turbovec:8093',
    agent: process.env.DEER_FLOW_URL || 'http://mem-deer-flow:8094',
    collaborate: process.env.ALOOK_URL || 'http://mem-alook:8095',
  };
  return tools[action] || tools.memory;
}

app.listen(PORT, '0.0.0.0', () => console.log(`Memory Engine :${PORT}`));
