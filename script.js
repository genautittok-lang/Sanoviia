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

// Floating chat popup
function createFloatingChat() {
    const chatPopup = document.createElement('div');
    chatPopup.className = 'floating-chat';
    chatPopup.innerHTML = `
        Hallo! Wie können wir Ihnen helfen?
        <button class="chat-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add click handler for chat popup
    chatPopup.addEventListener('click', function(e) {
        if (e.target.className !== 'chat-close') {
            window.open('https://wa.me/49123456789', '_blank');
        }
    });
    
    document.body.appendChild(chatPopup);
    
    // Auto remove after 8 seconds
    setTimeout(() => {
        if (chatPopup.parentElement) {
            chatPopup.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => chatPopup.remove(), 500);
        }
    }, 8000);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll listener
    window.addEventListener('scroll', function() {
        animateOnScroll();
        highlightActiveMenu();
    });
    
    // Initial animation check
    animateOnScroll();
    
    // Show floating chat after 2 seconds
    setTimeout(createFloatingChat, 2000);
    
    // Highlight current page in menu
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentLink = document.querySelector(`nav a[href="${currentPage}"]`);
    if (currentLink) {
        currentLink.classList.add('active');
    }
});

// Add fadeOut animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(20px); }
    }
`;
document.head.appendChild(style);