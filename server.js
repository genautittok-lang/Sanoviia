const http = require('http');
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');

// Initialize OpenAI using Replit AI integration
const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL
});

const server = http.createServer((req, res) => {
  // Set cache control
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  // API Route for AI Chat
  if (req.url === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const { message } = JSON.parse(body);
        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            { role: "system", content: "Ви — AI помічник для сайту Sannovia Pflege (Ганновер, Німеччина). Ваші правила: 1. Надавайте інформацію про послуги сайту (догляд на дому, LVAD, медтехніка). 2. Дайте загальні поради про ліки, але ЗАВЖДИ додавайте дисклеймер, що ви не лікар. 3. КАТЕГОРИЧНО ЗАБОРОНЕНО ставити діагнози. 4. Спрямовуйте користувачів на сторінку контактів або телефон +49 123 456 789 для професійної консультації. Відповідайте українською мовою." },
            { role: "user", content: message }
          ]
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply: completion.choices[0].message.content }));
      } catch (err) {
        console.error('AI Error:', err);
        res.writeHead(500);
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
        res.end('Server Error: ' + error.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Sannovia Pflege website running on port ${PORT}`);
});
