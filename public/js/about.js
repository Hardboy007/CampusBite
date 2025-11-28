document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-links a");
    links.forEach(link => {
        if(link.href === window.location.href){     //"Ye link jo point kar raha hai" === "Ye current page ka URL"
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
window.addEventListener('DOMContentLoaded', function() {
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
