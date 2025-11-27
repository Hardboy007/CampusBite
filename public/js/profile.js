/* ============================================
   PROFILE PAGE - SIMPLE VERSION
   Future Ready: Signup data se automatically load hoga
   ============================================ */

// ========== USER DATA (Demo + Real) ==========
let userData = {
    phone: "9548415772",
    email: "hardik77.aman@gmail.com",
    phoneVerified: false,
    emailVerified: false
};


// ========== LOAD DATA FROM SIGNUP ==========
function loadUserData() {
    // Check if user data exists from signup
    const savedData = localStorage.getItem('userData');
    
    if (savedData) {
        const parsed = JSON.parse(savedData);
        userData.phone = parsed.phone || userData.phone;
        userData.email = parsed.email || userData.email;
        userData.phoneVerified = parsed.phoneVerified || false;
        userData.emailVerified = parsed.emailVerified || false;
    }
    
    // Update UI
    document.getElementById('phoneDisplay').textContent = `+91 ${userData.phone}`;
    document.getElementById('emailDisplay').textContent = userData.email;
    
    // Update verify button states
    updateVerifyButtons();
}

// ========== UPDATE VERIFY BUTTON STATES ==========
function updateVerifyButtons(){
    const phoneBtn = document.getElementById('phoneVerifyBtn');
    const emailBtn = document.getElementById('emailVerifyBtn');
    if (userData.phoneVerified) {
        phoneBtn.textContent = '✓ Phone Verified';
        phoneBtn.classList.add('verified');
        phoneBtn.disabled = true;
        phoneBtn.style.cursor = 'not-allowed';
    } else {
        phoneBtn.textContent = 'Verify Phone Number';
        phoneBtn.classList.remove('verified');
        phoneBtn.disabled = false;
        phoneBtn.style.cursor = 'pointer';
    }
    if (userData.emailVerified) {
        emailBtn.textContent = '✓ Email Verified';
        emailBtn.classList.add('verified');
        emailBtn.disabled = true;
        emailBtn.style.cursor = 'not-allowed';
    } else {
        emailBtn.textContent = 'Verify Email Address';
        emailBtn.classList.remove('verified');
        emailBtn.disabled = false;
        emailBtn.style.cursor = 'pointer';
    }
}

// ========== DARK MODE ==========
const darkBtn = document.getElementById('darkModeBtn');

// Load saved theme on page load
const savedTheme = localStorage.getItem("darkMode");
if (savedTheme === "on") {
    document.documentElement.classList.add("dark");
}

// Toggle theme
darkBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");

    // Save new state
    if (document.documentElement.classList.contains("dark")) {
        localStorage.setItem("darkMode", "on");
    } else {
        localStorage.setItem("darkMode", "off");
    }
});

// ========== EDIT PHONE ==========
function editPhone(){
    const form = document.getElementById('phoneEditForm');
    const input = document.getElementById('phoneInput');
    const editBtn = document.getElementById('phoneEditBtn');

    form.classList.remove('hidden');
    input.value = userData.phone;
    input.focus();
    editBtn.style.display = 'none';
}
function cancelPhoneEdit() {
    const form = document.getElementById('phoneEditForm');
    const editBtn = document.getElementById('phoneEditBtn');
    
    form.classList.add('hidden');
    editBtn.style.display = 'block';
}

function savePhone(){
    const input = document.getElementById('phoneInput').value.trim();
    // Simple validation
    if (!/^[6-9][0-9]{9}$/.test(input)) {
        showToast('Please enter a valid 10-digit phone number', 'error');
        return;
    }

    // Check if phone number changed
    const phoneChanged = input !== userData.phone;

    // Update data
    userData.phone = input;
    // Reset verification if phone changed
    if (phoneChanged) {
        userData.phoneVerified = false;
    }

    // Save to localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Update UI
    document.getElementById('phoneDisplay').textContent = `+91 ${userData.phone}`;
    cancelPhoneEdit();
    updateVerifyButtons();
    
    // Show different message based on change
    if (phoneChanged) {
        showToast('Phone number updated! Please verify again.');
    } else {
        showToast('Phone number saved!');
    }
}

// ========== EDIT EMAIL ==========
function editEmail() {
    const form = document.getElementById('emailEditForm');
    const input = document.getElementById('emailInput');
    const editBtn = document.getElementById('emailEditBtn');
    
    form.classList.remove('hidden');
    input.value = userData.email;
    input.focus();
    editBtn.style.display = 'none';
}
function cancelEmailEdit() {
    const form = document.getElementById('emailEditForm');
    const editBtn = document.getElementById('emailEditBtn');
    
    form.classList.add('hidden');
    editBtn.style.display = 'block';
}


function saveEmail() {
    const input = document.getElementById('emailInput').value.trim();
    
    // Simple validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    // Check if email changed
    const emailChanged = input !== userData.email;

    // Update data
    userData.email = input;
    // Reset verification if email changed
    if (emailChanged) {
        userData.emailVerified = false;
    }
    
    // Save to localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Update UI
    document.getElementById('emailDisplay').textContent = userData.email;
    cancelEmailEdit();
    updateVerifyButtons();
    
    // Show different message based on change
    if (emailChanged) {
        showToast('Email updated! Please verify again.');
    } else {
        showToast('Email saved!');
    }
}

// ========== VERIFY FUNCTIONS ==========
function verifyPhone(){
    // Demo verification - Baad me OTP flow hogi
    showToast('Verification code sent to your phone!');
    
    // Simulate verification after 2 seconds
    setTimeout(() => {
        userData.phoneVerified = true;
        localStorage.setItem('userData', JSON.stringify(userData));
        updateVerifyButtons();
        showToast('Phone number verified successfully!');
    }, 3000);
}
function verifyEmail() {
    // Demo verification - Baad me email verification link hoga
    showToast('Verification link sent to your email!');
    
    // Simulate verification after 2 seconds
    setTimeout(() => {
        userData.emailVerified = true;
        localStorage.setItem('userData', JSON.stringify(userData));
        updateVerifyButtons();
        showToast('Email verified successfully!');
    }, 3000);
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
    initDarkMode();
    loadUserData();
});



// // After successful signup
// const userData = {
//     fullName: document.getElementById('fullName').value,
//     phone: document.getElementById('phone').value,
//     email: document.getElementById('email').value,
//     phoneVerified: false,
//     emailVerified: false
// };

// // Save to localStorage
// localStorage.setItem('userData', JSON.stringify(userData));

// // Redirect to menu or home
// window.location.href = '/menu';