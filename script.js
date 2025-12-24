// Current language
let currentLang = localStorage.getItem('sannovia-lang') || 'de';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initHeader();
  initAnimations();
});

// Language System
function initLanguage() {
  setLanguage(currentLang);
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
    });
  });
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('sannovia-lang', lang);
  
  // Update active button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  
  // Set RTL for Arabic
  document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  
  // Translate all elements
  if (typeof translations !== 'undefined' && translations[lang]) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const value = getNestedValue(translations[lang], key);
      if (value) {
        el.textContent = value;
      }
    });
    
    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      const value = getNestedValue(translations[lang], key);
      if (value) {
        el.placeholder = value;
      }
    });
  }
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

// Navigation
function toggleMenu() {
  const modal = document.getElementById('navModal');
  const hamburger = document.querySelector('.hamburger');
  modal.classList.toggle('active');
  hamburger.classList.toggle('active');
  document.body.style.overflow = modal.classList.contains('active') ? 'hidden' : '';
}

// Close menu on link click
document.addEventListener('click', (e) => {
  if (e.target.closest('.nav-modal-links a')) {
    toggleMenu();
  }
});

// Header scroll effect
function initHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// Animations
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.service-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${i * 0.1}s`;
    observer.observe(card);
  });
}

// Chat System
function toggleChat() {
  const chat = document.getElementById('chatWindow');
  chat.classList.toggle('active');
}

function handleKey(e) {
  if (e.key === 'Enter') sendMessage();
}

async function sendMessage() {
  const input = document.getElementById('userInput');
  const text = input.value.trim();
  if (!text) return;

  appendMessage(text, 'user');
  input.value = '';

  const loadingMsg = appendMessage('...', 'bot');

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, lang: currentLang })
    });
    const data = await response.json();
    loadingMsg.innerHTML = data.reply || data.error || 'Error';
  } catch (err) {
    loadingMsg.innerHTML = 'Connection error. Please try again.';
  }
}

function appendMessage(text, side) {
  const chat = document.getElementById('chatMessages');
  const msg = document.createElement('div');
  msg.className = `message ${side}`;
  msg.innerHTML = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
  return msg;
}