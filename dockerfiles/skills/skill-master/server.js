const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 9100;
app.get('/health', (req, res) => res.json({ status: 'ok', service: 'skill-master' }));
app.post('/api/chat', async (req, res) => {
  const { message, action } = req.body;
  if (!message) return res.status(400).json({ error: 'message required' });
  try {
    const toolUrl = getToolUrl(action);
    if (toolUrl) {
      const r = await fetch(`${toolUrl}/api/chat`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({message}) });
      const d = await r.json();
      return res.json({ service: 'skill-master', tool: toolUrl, response: d });
    }
    res.json({ service: 'skill-master', response: 'No tool matched. Use OpenRouter chat.' });
  } catch(e) { res.status(502).json({ error: e.message }); }
});
function getToolUrl(action) {
  const tools = {
    meta: process.env.HARNESS_URL || 'http://skills-harness:9101',
    optimize: process.env.SKILL_OPT_URL || 'http://skills-skillopt:9102',
    seek: process.env.SKILL_SEEKERS_URL || 'http://skills-skillseekers:9103',
    book: process.env.BOOK_TO_SKILL_URL || 'http://book-to-skill:9104',
    humanize: process.env.HUMANIZER_URL || 'http://skills-humanizer:9105',
    slop: process.env.STOP_SLOP_URL || 'http://skills-stop-slop:9106',
  };
  return tools[action] || tools.meta;
}
app.listen(PORT, '0.0.0.0', () => console.log(`Skill Master :${PORT}`));
