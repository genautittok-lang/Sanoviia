const http = require('http');
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL
});

const server = http.createServer((req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (req.url === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const { message, lang = 'de' } = JSON.parse(body);
        const langPrompts = {
          de: "Sie sind ein KI-Assistent für Sannovia Pflege.",
          en: "You are an AI assistant for Sannovia Pflege.",
          ru: "Вы — AI-ассистент Sannovia Pflege.",
          ua: "Ви — AI помічник Sannovia Pflege.",
          ar: "أنت مساعد AI لـ Sannovia Pflege."
        };
        const systemPrompt = langPrompts[lang] || langPrompts.de;
        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [{ role: "system", content: systemPrompt }, { role: "user", content: message }]
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply: completion.choices[0].message.content }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  let filePath = '.' + (req.url === '/' ? '/index.html' : req.url);
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = { 
    '.js': 'text/javascript', 
    '.css': 'text/css', 
    '.json': 'application/json', 
    '.png': 'image/png', 
    '.jpg': 'image/jpg', 
    '.jpeg': 'image/jpeg',
    '.html': 'text/html'
  };
  const contentType = mimeTypes[extname] || 'text/html';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        fs.readFile('./index.html', (err, cont) => {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(cont, 'utf-8');
        });
      } else {
        res.writeHead(500);
        res.end('Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});