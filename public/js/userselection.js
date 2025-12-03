document.addEventListener("DOMContentLoaded", function () {   //jab pura html content load ho jaye tab ye chale
    setTimeout(function () {        //added this to fix the LATE ANIMATION BUG after linking backend on page
        // Role cards animation trigger ← YE ADD KARO
        const roleCards = document.querySelectorAll('.role-card');
        roleCards.forEach((card) => {
            card.classList.add('loaded');
        });

        const sideImgs = document.querySelectorAll('.side-img');
        sideImgs.forEach((img, index) => {
            setTimeout(() => {
                img.classList.add('loaded');
            }, index * 150); // stagger 100ms per image
        });

    }, 100);


    //mobile image element ko select kiya
    const mobileImage = document.querySelector('.mobile-image');

    //Intersection Observer ek browser API hai jo detect krta hai ki koi element viewport me aa rha h ya nahi
    const observer = new IntersectionObserver(entries => {
        //ab mobile ke andar jitne elements hai un sabke liye loop lagaya
        entries.forEach(entry => {                          //entry naam ka object banaya
            if (entry.isIntersecting) {                     //agar mobile viewport me aaya
                mobileImage.classList.add('visible');       //toh visible class add kr denge jisme visible hone ka animation likha h css me
                mobileImage.classList.remove('hidden');     //aur visible hote hi hidden class hata denge jo css me likhi thi
                observer.unobserve(entry.target);         //ab ek bar animate hone pr unobserve kr do taki bar bar scroll krne par animate na ho
            }
        });
    }, {
        threshold: 0.4, // jab element ka 40% part dikhne lage tab trigger kro
    });

    observer.observe(mobileImage);      //mobile image ko observe krna shuru kro
});


// Open Customer Modal
document.querySelector(".customer-btn").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("customerOverlay").style.display = "block";
    document.getElementById("customerModal").style.display = "block";
});

// Open Staff Modal
document.querySelector(".staff-btn").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("staffOverlay").style.display = "block";
    document.getElementById("staffModal").style.display = "block";
});

// Close Modal (reusable function)
function closeModal(modalId, overlayId) {
    document.getElementById(modalId).style.display = "none";
    document.getElementById(overlayId).style.display = "none";
}

//Login customer form submission (UPDATED)
const customerForm = document.getElementById("customerLoginForm");
if (customerForm) {
    customerForm.addEventListener("submit", function (e) {
        const email = document.getElementById("customerUsername").value.trim();
        const password = document.getElementById("customerPassword").value.trim();
        const errorMsg = document.getElementById("customerLoginError");

        // Clear old error
        errorMsg.style.display = "none";
        errorMsg.textContent = "";

        if (!email || !password) {
            e.preventDefault();
            errorMsg.textContent = "Please enter both email and password.";
            errorMsg.style.display = "block";
        }
    });
}

//Login staff form submission (UPDATED)
const staffForm = document.getElementById("staffLoginForm");
if (staffForm) {
    staffForm.addEventListener("submit", function (e) {
        const staffId = document.getElementById("staffUsername").value.trim();
        const password = document.getElementById("staffPassword").value.trim();
        const errorMsg = document.getElementById("staffLoginError");

        // Clear old error
        errorMsg.style.display = "none";
        errorMsg.textContent = "";

        if (!staffId || !password) {
            e.preventDefault();
            errorMsg.textContent = "Please enter both Staff ID and Password.";
            errorMsg.style.display = "block";
        }
    });
}
//for eye toggle for password
function togglePassword(passwordId, iconElement) {
    const passwordInput = document.getElementById(passwordId); // exact input field

    if (!passwordInput || !iconElement) return; // safety check

    if (passwordInput.type === "password") {
        passwordInput.type = "text";                // show password
        iconElement.classList.remove("fa-eye-slash");
        iconElement.classList.add("fa-eye");
    } else {
        passwordInput.type = "password";            // hide password
        iconElement.classList.remove("fa-eye");
        iconElement.classList.add("fa-eye-slash");
    }
}


// Flip to Signup
function flipToSignup(role) {
    if (window.event) window.event.preventDefault();

    const modal = document.getElementById(role + 'Modal');
    const flipContainer = modal.querySelector('.modal-flip-container');
    // Add flip class
    flipContainer.classList.add('flipped');

    // Clear any error messages
    const signupError = document.getElementById(role + 'SignupError');
    const loginError = document.getElementById(role + 'LoginError');
    if (signupError) signupError.textContent = '';
    if (loginError) loginError.textContent = '';

    return false;
}

// Flip back to Login
function flipToLogin(role) {
    if (window.event) window.event.preventDefault();

    const modal = document.getElementById(role + 'Modal');
    const flipContainer = modal.querySelector('.modal-flip-container');

    // Remove flip class
    flipContainer.classList.remove('flipped');

    // Clear any error messages
    const signupError = document.getElementById(role + 'SignupError');
    const loginError = document.getElementById(role + 'LoginError');
    if (signupError) signupError.textContent = '';
    if (loginError) loginError.textContent = '';
    
    return false;
}

// Handle Signup Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const customerSignupForm = document.getElementById('customerSignupForm');
    
    if (customerSignupForm) {
        customerSignupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('📝 Signup form submitted');
            handleCustomerSignup(e);
        });
        console.log('✅ Signup form handler attached');
    } else {
        console.error('❌ Signup form not found!');
    }
});

function handleCustomerSignup(e){
    if (e) e.preventDefault();

    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const phone = document.getElementById('signupPhone').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    const errorMsg = document.getElementById('customerSignupError');

    // Clear previous errors
    errorMsg.textContent = '';
    errorMsg.style.color = '#ef4444';

    // Validation
    if (!name || !email || !phone || !password || !confirmPassword) {
        errorMsg.textContent = 'Please fill all fields';
        errorMsg.style.color = '#ef4444';
        return false;
    }

    // Phone validation (Indian numbers)
    if (!/^[6-9][0-9]{9}$/.test(phone)) {
        errorMsg.textContent = 'Please enter a valid 10-digit phone number';
        errorMsg.style.color = '#ef4444';
        return false;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorMsg.textContent = 'Please enter a valid email address';
        errorMsg.style.color = '#ef4444';
        return false;
    }

    // Password match validation
    if (password !== confirmPassword) {
        errorMsg.textContent = 'Passwords do not match';
        errorMsg.style.color = '#ef4444';
        return false;
    }

    // Password strength validation (min 6 characters)
    if (password.length < 6) {
        errorMsg.textContent = 'Password must be at least 6 characters';
        errorMsg.style.color = '#ef4444';
        return false;
    }

    // Clear error
    errorMsg.textContent = '';

    // Save user data to localStorage (Demo - Baad me backend API call hogi)
    const userData = {
        fullName: name,
        email: email,
        phone: phone,
        phoneVerified: false,
        emailVerified: false,
        joinDate: new Date().toISOString()
    };

    localStorage.setItem('userData', JSON.stringify(userData));

    // Show success message
    errorMsg.textContent = 'Account created successfully! Redirecting to login...';
    errorMsg.style.color = '#10b981';

    // Flip back to login after 1.5 seconds
    setTimeout(() => {
        flipToLogin('customer');
        
        // Clear form after flip animation completes
        setTimeout(() => {
            document.getElementById('customerSignupForm').reset();
            errorMsg.textContent = '';
        }, 800);
    }, 1200);
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