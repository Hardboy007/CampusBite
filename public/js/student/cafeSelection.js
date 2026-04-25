function toggleDarkMode() {
    const body = document.body;
    const toggleBtn = document.querySelector('.toggle-btn');

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        toggleBtn.textContent = 'Light Mode';
    } else {
        toggleBtn.textContent = 'Dark Mode';
    }
}

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