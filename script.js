// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.card, section');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

// Active menu highlighting
function highlightActiveMenu() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;
        
        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
            const activeLink = document.querySelector(`nav a[href="#${section.id}"]`);
            
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to current section link
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Enhanced floating chat popups
function createFloatingChat() {
    const chatPopup = document.createElement('div');
    chatPopup.className = 'floating-chat';
    chatPopup.innerHTML = `
        👋 Hallo! Wie können wir Ihnen helfen?
        <button class="chat-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    chatPopup.addEventListener('click', function(e) {
        if (e.target.className !== 'chat-close') {
            window.open('https://wa.me/49123456789', '_blank');
        }
    });
    
    document.body.appendChild(chatPopup);
    
    setTimeout(() => {
        if (chatPopup.parentElement) {
            chatPopup.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => chatPopup.remove(), 500);
        }
    }, 10000);
}

function createSecondaryPopup() {
    const popup = document.createElement('div');
    popup.className = 'floating-chat-secondary';
    popup.innerHTML = `
        📞 Rufen Sie uns an!
        <button class="chat-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    popup.addEventListener('click', function(e) {
        if (e.target.className !== 'chat-close') {
            window.open('tel:+49123456789', '_blank');
        }
    });
    
    document.body.appendChild(popup);
    
    setTimeout(() => {
        if (popup.parentElement) {
            popup.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => popup.remove(), 500);
        }
    }, 8000);
}

// Form validation
function validateContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        
        if (!name || !email || !message) {
            showNotification('Bitte füllen Sie alle Felder aus!', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Bitte geben Sie eine gültige E-Mail-Adresse ein!', 'error');
            return;
        }
        
        showNotification('Vielen Dank! Wir werden uns bald bei Ihnen melden.', 'success');
        form.reset();
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#00b894' : '#ff6b6b'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        z-index: 10000;
        animation: slideInDown 0.5s ease;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        animateOnScroll();
        highlightActiveMenu();
    });
    
    animateOnScroll();
    validateContactForm();
    
    // Show popups with different timings
    setTimeout(createFloatingChat, 3000);
    setTimeout(createSecondaryPopup, 6000);
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentLink = document.querySelector(`nav a[href="${currentPage}"]`);
    if (currentLink) {
        currentLink.classList.add('active');
    }
});

// Add additional animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(20px); }
    }
    @keyframes slideInDown {
        from { opacity: 0; transform: translate(-50%, -100px); }
        to { opacity: 1; transform: translate(-50%, 0); }
    }
    @keyframes slideUp {
        from { opacity: 1; transform: translate(-50%, 0); }
        to { opacity: 0; transform: translate(-50%, -100px); }
    }
`;
document.head.appendChild(style);