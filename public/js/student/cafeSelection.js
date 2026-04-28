import { requireAuth } from '/js/authGuard.js';
requireAuth('customer');

// Page load pe dark mode sync karo
if (localStorage.getItem('darkMode') === 'on') {
    document.body.classList.add('dark-mode');
}

function toggleDarkMode() {
    const body = document.body;
    const toggleBtn = document.querySelector('.toggle-btn');
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'on');
        toggleBtn.textContent = 'Light Mode';
    } else {
        localStorage.setItem('darkMode', 'off');
        toggleBtn.textContent = 'Dark Mode';
    }
}

const collegeCanteens = {
    'dbuu': [
        { value: 'bbc', label: 'BBC Cafeteria' },
        { value: 'main', label: 'Main Block Cafe' }
    ]
};

document.getElementById('college').addEventListener('change', function () {
    const cafe = document.getElementById('cafe');
    const canteens = collegeCanteens[this.value] || [];

    cafe.innerHTML = '<option value="" selected disabled>Select your cafe</option>';
    canteens.forEach(c => {
        cafe.innerHTML += `<option value="${c.value}">${c.label}</option>`;
    });
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