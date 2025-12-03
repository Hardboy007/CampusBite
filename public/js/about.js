document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-links a");
    links.forEach(link => {
        if (link.href === window.location.href) {     //"Ye link jo point kar raha hai" === "Ye current page ka URL"
            link.classList.add("active");
        }
    });
});

//for Dark mode
function toggleDarkMode() {
    const body = document.body;
    const toggleBtn = document.querySelector('.toggle-btn i');

    body.classList.toggle('dark-mode');

    // Icon change karo
    if (body.classList.contains('dark-mode')) {
        toggleBtn.classList.remove('fa-moon');
        toggleBtn.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'true');
    } else {
        toggleBtn.classList.remove('fa-sun');
        toggleBtn.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'false');
    }
}

// Page load pe check karo saved preference
window.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.querySelector('.toggle-btn i');

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        toggleBtn.classList.remove('fa-moon');
        toggleBtn.classList.add('fa-sun');
    }
});

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
    // Select sections to animate
    const sections = document.querySelectorAll('.hero, .our-story, .container, .join-us, .team-section');
    const cards = document.querySelectorAll('.grid .card, .team-card');

    // Intersection Observer configuration
    const observerOptions = {
        root: null,
        threshold: 0.15,  // Trigger when 15% visible
        rootMargin: '0px 0px -80px 0px'
    };

    // Callback function
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    };

    // Create observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe sections
    sections.forEach(section => {
        section.classList.add('animate-section');
        observer.observe(section);
    });

    // Observe cards with stagger
    cards.forEach((card, index) => {
        card.classList.add('animate-card');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    console.log('✅ Scroll animations initialized');
}

// ========== INITIALIZE ANIMATIONS ON PAGE LOAD ==========
window.addEventListener('load', () => {
    initScrollAnimations();
    console.log('🎬 Page animations ready');
});

// ========== HAMBURGER MENU TOGGLE ==========
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent document click
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when any link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// ========== PWA: SERVICE WORKER REGISTRATION ==========
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('✅ Service Worker registered successfully!');
                console.log('Scope:', registration.scope);
                
                // Check for updates
                registration.addEventListener('updatefound', () => {
                    console.log('🔄 New version available!');
                });
            })
            .catch((error) => {
                console.log('❌ Service Worker registration failed:', error);
            });
    });
    
    // Listen for service worker updates
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('🔄 Service Worker updated! Refresh for new version.');
    });
}