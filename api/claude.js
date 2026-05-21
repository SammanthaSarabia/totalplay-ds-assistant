export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-claude-key, x-figma-key');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // Figma image proxy
  if (req.method === 'GET' && req.query.figma_image) {
    const figmaKey = req.headers['x-figma-key'];
    const { file_id, node_id } = req.query;
    if (!figmaKey || !file_id || !node_id) return res.status(400).json({ error: 'Missing params' });
    try {
      const r = await fetch(`https://api.figma.com/v1/images/${file_id}?ids=${node_id}&format=png&scale=2`, {
        headers: { 'X-Figma-Token': figmaKey }
      });
      const data = await r.json();
      return res.status(200).json(data);
    } catch(e) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = req.headers['x-claude-key'];
  if (!apiKey) return res.status(400).json({ error: 'Missing API key' });

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
