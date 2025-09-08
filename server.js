const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Set cache control to prevent caching issues in the Replit iframe
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  let filePath;
  
  // Handle different routes
  if (req.url === '/' || req.url === '/index.html') {
    filePath = path.join(__dirname, 'index.html');
  } else if (req.url === '/leistungen.html') {
    filePath = path.join(__dirname, 'leistungen.html');
  } else if (req.url === '/ueber-uns.html') {
    filePath = path.join(__dirname, 'ueber-uns.html');
  } else if (req.url === '/kontakt.html') {
    filePath = path.join(__dirname, 'kontakt.html');
  } else if (req.url === '/style.css') {
    filePath = path.join(__dirname, 'style.css');
  } else if (req.url === '/script.js') {
    filePath = path.join(__dirname, 'script.js');
  } else {
    filePath = path.join(__dirname, 'index.html');
  }
  
  // Determine content type
  const extname = String(path.extname(filePath)).toLowerCase();
  let contentType = 'text/html';
  if (extname === '.css') {
    contentType = 'text/css';
  } else if (extname === '.js') {
    contentType = 'application/javascript';
  }
  
  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error');
      return;
    }
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Sannovia Pflege website running on port ${PORT}`);
});