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
        const { message, lang = 'de' } = JSON.parse(body);
        
        const langPrompts = {
          de: "Sie sind ein KI-Assistent für die Website Sannovia Pflege (Hannover, Deutschland). Regeln: 1. Informieren Sie über Dienstleistungen (Häusliche Pflege, LVAD, Medizintechnik). 2. Geben Sie allgemeine Ratschläge zu Medikamenten, aber IMMER mit Hinweis, dass Sie kein Arzt sind. 3. NIEMALS Diagnosen stellen. 4. Verweisen Sie auf Kontaktseite oder +49 123 456 789. Antworten Sie auf Deutsch.",
          en: "You are an AI assistant for Sannovia Pflege website (Hannover, Germany). Rules: 1. Provide info about services (home care, LVAD, medical tech). 2. Give general medication advice but ALWAYS add disclaimer you're not a doctor. 3. NEVER diagnose. 4. Direct to contact page or +49 123 456 789. Answer in English.",
          ru: "Вы — AI-ассистент сайта Sannovia Pflege (Ганновер, Германия). Правила: 1. Информируйте об услугах (уход на дому, LVAD, медтехника). 2. Давайте общие советы о лекарствах, но ВСЕГДА с оговоркой, что вы не врач. 3. НИКОГДА не ставьте диагнозы. 4. Направляйте на страницу контактов или +49 123 456 789. Отвечайте на русском.",
          ua: "Ви — AI помічник для сайту Sannovia Pflege (Ганновер, Німеччина). Правила: 1. Інформуйте про послуги (догляд на дому, LVAD, медтехніка). 2. Давайте загальні поради про ліки, але ЗАВЖДИ з застереженням, що ви не лікар. 3. НІКОЛИ не ставте діагнози. 4. Спрямовуйте на сторінку контактів або +49 123 456 789. Відповідайте українською.",
          ar: "أنت مساعد AI لموقع Sannovia Pflege (هانوفر، ألمانيا). القواعد: 1. قدم معلومات عن الخدمات (الرعاية المنزلية، LVAD، التقنية الطبية). 2. قدم نصائح عامة عن الأدوية مع التأكيد أنك لست طبيباً. 3. لا تشخص أبداً. 4. وجه إلى صفحة الاتصال أو +49 123 456 789. أجب بالعربية."
        };
        
        const systemPrompt = langPrompts[lang] || langPrompts.de;
        
        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message }
          ]
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply: completion.choices[0].message.content }));
      } catch (err) {
        console.error('AI Error:', err);
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

const PORT = process.env.PORT || 8080;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
