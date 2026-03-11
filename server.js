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
          de: "Sie sind ein KI-Assistent für Sannovia Pflege, betrieben von Ihor Liubchyk (M.Sc., GuK — staatlich anerkannter Gesundheits- und Krankenpfleger mit Masterabschluss in Pflegewissenschaft, langjähriger Erfahrung in der HTTG-Chirurgie der MHH). Beantworten Sie Fragen zu Pflegeleistungen (LVAD, VAC, PICC-Line, Wundmanagement, Behandlungspflege SGB V, Beratung §37.3 SGB XI), geben Sie allgemeine Pflegeinformationen, aber stellen Sie keine medizinischen Diagnosen. Kontakt: +49 176 32755364, info@sannovia-pflege.de, Domagkweg 38, 30627 Hannover.",
          en: "You are an AI assistant for Sannovia Pflege, run by Ihor Liubchyk (M.Sc., Registered Nurse — state-recognized nurse with Master's in Nursing Science, years of experience in HTTG surgery at MHH Hannover). Answer questions about nursing services (LVAD, VAC, PICC-Line, wound management, SGB V treatment care, advisory services §37.3 SGB XI). Do not provide medical diagnoses. Contact: +49 176 32755364, info@sannovia-pflege.de.",
          ru: "Вы — AI-ассистент Sannovia Pflege, которым управляет Ихор Любчик (M.Sc., GuK — государственно признанная медицинская сестра/брат с магистратурой в области сестринского дела, многолетним опытом в ХТТХ-хирургии МВН Ганновера). Отвечайте на вопросы об уходе (LVAD, VAC, PICC-Line, менеджмент ран, SGB V, §37.3 SGB XI). Не ставьте медицинских диагнозов. Контакт: +49 176 32755364, info@sannovia-pflege.de.",
          ua: "Ви — AI-помічник Sannovia Pflege, яким керує Ігор Любчик (M.Sc., GuK — державно визнана медична сестра/брат з магістратурою з медсестринства, багаторічним досвідом в ХТТХ-хірургії МВШ Ганновера). Відповідайте на питання про догляд (LVAD, VAC, PICC-Line, менеджмент ран, SGB V, §37.3 SGB XI). Не ставте медичних діагнозів. Контакт: +49 176 32755364, info@sannovia-pflege.de.",
          ar: "أنت مساعد AI لـ Sannovia Pflege، يديره إيهور ليوبتشيك (ماجستير، ممرض مسجل — ممرض معتمد من الدولة مع ماجستير في علم التمريض وخبرة متعددة السنوات في جراحة HTTG في MHH هانوفر). أجب على الأسئلة حول خدمات التمريض (LVAD، VAC، PICC-Line، إدارة الجروح، SGB V، §37.3 SGB XI). لا تقدم تشخيصات طبية. الاتصال: +49 176 32755364، info@sannovia-pflege.de."
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

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});