import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBXEfqZ_XR5vdKMWhrL_Jgl9I0pm0OOcT4",
    authDomain: "campusbite-b0225.firebaseapp.com",
    projectId: "campusbite-b0225",
    storageBucket: "campusbite-b0225.firebasestorage.app",
    messagingSenderId: "23993036703",
    appId: "1:23993036703:web:66f5372560f035b9f297aa"
};
// Logout function
window.handleLogout = async function () {
    try {
        await signOut(auth);
        window.location.href = '/user-selection';
    } catch (err) {
        console.error('Logout error:', err);
    }
}
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

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
    customerForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const email = document.getElementById("customerUsername").value.trim();
        const password = document.getElementById("customerPassword").value.trim();
        const errorMsg = document.getElementById("customerLoginError");

        errorMsg.textContent = '';

        if (!email || !password) {
            errorMsg.textContent = 'Please enter both email and password.';
            errorMsg.style.display = 'block';
            return;
        }

        try {
            errorMsg.style.color = '#10b981';
            errorMsg.style.display = 'block';
            errorMsg.textContent = 'Logging in...';

            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = '/cafeSelection';

        } catch (err) {
            errorMsg.style.color = '#ef4444';
            errorMsg.style.display = 'block';
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                errorMsg.textContent = 'Invalid email or password.';
            } else {
                errorMsg.textContent = err.message;
            }
        }
    });
}

//Login staff form submission (UPDATED)
const staffForm = document.getElementById("staffLoginForm");
if (staffForm) {
    staffForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const email = document.getElementById("staffUsername").value.trim();
        const password = document.getElementById("staffPassword").value.trim();
        const errorMsg = document.getElementById("staffLoginError");

        errorMsg.textContent = '';

        if (!email || !password) {
            errorMsg.textContent = 'Please enter both email and password.';
            errorMsg.style.display = 'block';
            return;
        }

        try {
            errorMsg.style.color = '#10b981';
            errorMsg.style.display = 'block';
            errorMsg.textContent = 'Logging in...';

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Firestore se role check karo
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists() && userDoc.data().role === 'staff') {
                window.location.href = '/staff/campus';
            } else {
                errorMsg.style.color = '#ef4444';
                errorMsg.textContent = 'Not authorized as staff.';
                await auth.signOut();
            }

        } catch (err) {
            errorMsg.style.color = '#ef4444';
            errorMsg.style.display = 'block';
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                errorMsg.textContent = 'Invalid email or password.';
            } else {
                errorMsg.textContent = err.message;
            }
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


// Flip to Signup for customer
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

// Handle Signup Form Submission for customer
document.addEventListener('DOMContentLoaded', function () {
    const customerSignupForm = document.getElementById('customerSignupForm');

    if (customerSignupForm) {
        customerSignupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            console.log('📝 Signup form submitted');
            handleCustomerSignup(e);
        });
        console.log('✅ Signup form handler attached');
    } else {
        console.error('❌ Signup form not found!');
    }
});

// Handle Signup Form Submission for staff
document.addEventListener('DOMContentLoaded', function () {
    const staffSignupForm = document.getElementById('staffSignupForm');

    if (staffSignupForm) {
        staffSignupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            console.log('📝 Signup form submitted');
            handleCustomerSignup(e);
        });
        console.log('✅ Signup form handler attached');
    } else {
        console.error('❌ Signup form not found!');
    }
});

async function handleCustomerSignup(e) {
    if (e) e.preventDefault();

    const form = e.target;
    const isStaff = form.id === 'staffSignupForm';
    const prefix = isStaff ? 'staffsignup' : 'customersignup';
    const errorMsg = document.getElementById(isStaff ? 'staffSignupError' : 'customerSignupError');

    const name = document.getElementById(prefix + 'Name').value.trim();
    const email = document.getElementById(prefix + 'Email').value.trim();
    const phone = document.getElementById(prefix + 'Phone').value.trim();
    const password = document.getElementById(prefix + 'Password').value;
    const confirmPassword = document.getElementById(prefix + 'ConfirmPassword').value;

    errorMsg.textContent = '';

    // Validation
    if (!name || !email || !phone || !password || !confirmPassword) {
        errorMsg.textContent = 'Please fill all fields'; return;
    }
    if (!/^[6-9][0-9]{9}$/.test(phone)) {
        errorMsg.textContent = 'Enter valid 10-digit phone number'; return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorMsg.textContent = 'Enter valid email'; return;
    }
    if (password !== confirmPassword) {
        errorMsg.textContent = 'Passwords do not match'; return;
    }
    if (password.length < 6) {
        errorMsg.textContent = 'Password must be at least 6 characters'; return;
    }

    try {
        errorMsg.style.color = '#10b981';
        errorMsg.textContent = 'Creating account...';

        // Firebase Auth mein user banao
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Firestore mein save karo
        await setDoc(doc(db, 'users', user.uid), {
            name,
            email,
            phone,
            role: isStaff ? 'staff' : 'customer',
            createdAt: new Date().toISOString()
        });

        errorMsg.textContent = 'Account created! Redirecting...';

        // Redirect
        setTimeout(() => {
            window.location.href = isStaff ? '/staff/campus' : '/cafeSelection';
        }, 1000);

    } catch (err) {
        errorMsg.style.color = '#ef4444';
        if (err.code === 'auth/email-already-in-use') {
            errorMsg.textContent = 'Email already registered. Please login.';
        } else {
            errorMsg.textContent = err.message;
        }
    }
}

// ========== PWA: SERVICE WORKER REGISTRATION ==========
if ('serviceWorker' in navigator && location.hostname !== "localhost") {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('✅ Service Worker registered successfully!');
                console.log('Scope:', registration.scope);

                registration.addEventListener('updatefound', () => {
                    console.log('🔄 New version available!');
                });
            })
            .catch((error) => {
                console.log('❌ Service Worker registration failed:', error);
            });
    });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('🔄 Service Worker updated! Refresh for new version.');
    });
}

if (location.hostname === "localhost" && 'serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations()
        .then(regs => regs.forEach(reg => reg.unregister()));
}

// Global scope mein expose karo
window.closeModal = closeModal;
window.flipToSignup = flipToSignup;
window.flipToLogin = flipToLogin;
window.togglePassword = togglePassword;