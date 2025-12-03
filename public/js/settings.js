// ========== LOAD SETTINGS ==========
function loadSettings() {
    // Load all settings from localStorage
    const smsRecommendations = localStorage.getItem('smsRecommendations');
    const pushNotifications = localStorage.getItem('pushNotifications');
    const emailNotifications = localStorage.getItem('emailNotifications');
    const darkMode = localStorage.getItem('darkMode');
    
    // Set toggle states
    if (smsRecommendations !== null) {
        document.getElementById('smsRecommendations').checked = smsRecommendations === 'true';
    }
    
    if (pushNotifications !== null) {
        document.getElementById('pushNotifications').checked = pushNotifications === 'true';
    }
    
    if (emailNotifications !== null) {
        document.getElementById('emailNotifications').checked = emailNotifications === 'true';
    }
    
    if (darkMode === 'on') {
        document.getElementById('darkMode').checked = true;
    }
}


// ========== SMS RECOMMENDATIONS ==========
function toggleSMSRecommendations() {
    const checked = document.getElementById('smsRecommendations').checked;
    localStorage.setItem('smsRecommendations', checked);
    
    if (checked) {
        showToast('SMS recommendations enabled');
    } else {
        showToast('SMS recommendations disabled');
    }
}

// ========== EMAIL NOTIFICATIONS ==========
function toggleEmailNotifications() {
    const checked = document.getElementById('emailNotifications').checked;
    localStorage.setItem('emailNotifications', checked);
    
    if (checked) {
        showToast('Email notifications enabled');
    } else {
        showToast('Email notifications disabled');
    }
}

// ========== DARK MODE ==========
function toggleDarkMode() {
    const html = document.documentElement;
    const checked = document.getElementById('darkMode').checked;
    
    if (checked) {
        html.classList.add('dark');
        localStorage.setItem('darkMode', 'on');
        showToast('Dark mode enabled');
    } else {
        html.classList.remove('dark');
        localStorage.setItem('darkMode', 'off');
        showToast('Dark mode disabled');
    }
}

// ========== OPEN LINKS ==========
function openLink(type) {
    // Future: Open actual pages
    const messages = {
        'privacy': 'Privacy Policy page coming soon!',
        'terms': 'Terms & Conditions page coming soon!',
        'support': 'Help & Support page coming soon!'
    };
    
    showToast(messages[type] || 'Coming soon!');
    
    // Baad me ye routes add honge:
    // window.location.href = '/privacy-policy';
    // window.location.href = '/terms';
    // window.location.href = '/support';
}

// ========== LOGOUT ==========
function handleLogout() {
    const confirmed = confirm('Are you sure you want to logout?');
    
    if (confirmed) {
        showToast('Logging out...');
        
        setTimeout(() => {
            window.location.href = '/user-selection';
        }, 500);
    }
}

// ========== TOAST NOTIFICATION ==========
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    if (type === 'error') {
        toast.style.background = '#ef4444';
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add slideOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// ========== INITIALIZE ==========
window.addEventListener('load', () => {
    loadSettings();
});

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