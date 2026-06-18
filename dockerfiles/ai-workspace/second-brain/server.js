const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8095;
app.get('/health', (req, res) => res.json({ status: 'ok', service: 'second-brain' }));
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'message required' });
  res.json({ service: 'second-brain', response: 'Second Brain: ' + message });
});
app.listen(PORT, '0.0.0.0', () => console.log(`Second Brain :${PORT}`));
