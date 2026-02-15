// ==========================================
// Main JavaScript File
// ==========================================

// Document Ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded successfully');
    initializeApp();
});

// Initialize App
function initializeApp() {
    setupNavigation();
    setupButtonListeners();
    setupScrollAnimations();
}

// ==========================================
// Navigation
// ==========================================

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add active class to current link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ==========================================
// Button Listeners
// ==========================================

function setupButtonListeners() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ==========================================
// Scroll Animations
// ==========================================

function setupScrollAnimations() {
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ==========================================
// Utility Functions
// ==========================================

// Log function for debugging
function log(message, data = null) {
    if (data) {
        console.log(message, data);
    } else {
        console.log(message);
    }
}

// Fetch API helper
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        log('Error fetching data:', error);
        return null;
    }
}
