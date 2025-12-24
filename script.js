// Navigation
function toggleMenu() {
    const modal = document.getElementById('navModal');
    const hamburger = document.querySelector('.hamburger');
    modal.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.style.overflow = modal.classList.contains('active') ? 'hidden' : 'auto';
}

// Chat UI
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

    const loadingMsg = appendMessage('Думаю...', 'bot');

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });
        const data = await response.json();
        loadingMsg.innerHTML = data.reply;
    } catch (err) {
        loadingMsg.innerHTML = 'Вибачте, сталася помилка. Спробуйте пізніше.';
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

document.addEventListener('DOMContentLoaded', () => {
    // Current page highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-modal-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) link.style.color = '#00c6ff';
        link.addEventListener('click', () => {
            document.getElementById('navModal').classList.remove('active');
            document.querySelector('.hamburger').classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
});