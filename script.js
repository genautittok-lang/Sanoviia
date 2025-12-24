// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.card, section');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

// Active menu highlighting
function highlightActiveMenu() {
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;
        
        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
            const activeLink = document.querySelector(`.mobile-menu a[href*="${section.id}"]`);
            document.querySelectorAll('.mobile-menu a').forEach(link => link.classList.remove('active'));
            if (activeLink) activeLink.classList.add('active');
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

// Navigation Modal Logic
function toggleMenu() {
    const modal = document.getElementById('navModal');
    const hamburger = document.querySelector('.hamburger');
    modal.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    if (modal.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

function closeMenu() {
    const modal = document.getElementById('navModal');
    const hamburger = document.querySelector('.hamburger');
    modal.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        animateOnScroll();
        highlightActiveMenu();
    });
    
    animateOnScroll();
    
    // Show popups
    setTimeout(createFloatingChat, 3000);
    
    // Highlight current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentLink = document.querySelector(`.nav-modal-links a[href="${currentPage}"]`);
    if (currentLink) currentLink.classList.add('active');
    
    // Close modal on link click
    document.querySelectorAll('.nav-modal-links a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
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
`;
document.head.appendChild(style);