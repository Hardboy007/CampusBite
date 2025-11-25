/* ---------------- Smooth Page Transitions ---------------- */
document.addEventListener('DOMContentLoaded', () => {
    // Fade in sections on load
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';

        setTimeout(() => {
            section.style.transition = 'all 0.5s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);  // Staggered animation
    });
});

/* ---------------- state ---------------- */
let cart = [];
// Load cart from localStorage (set by menu page)
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('campusbite_cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (e) {
            console.error('Error loading cart:', e);
            cart = [];
        }
    }
    renderCart();
}
// Call on page load    (DEMO FOR BACKEND)
window.addEventListener('load', () => {
    loadCartFromStorage();

    const savedPhone = localStorage.getItem('order_phone');
    // const savedName = localStorage.getItem('order_name');
    if (savedPhone) phoneEl.value = savedPhone;
    // if (savedName) nameEl.value = savedName;

    selectedPayment = null;
    document.querySelectorAll('.pay-card').forEach(c => c.classList.remove('selected'));
    checkPlaceBtnState();
});
let selectedPayment = null;
const payCards = document.querySelectorAll('.pay-card');
payCards.forEach(card => {
    card.addEventListener('click', () => selectPay(card));
});

// =============== DARK MODE TOGGLE ====================
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



/* ---------------- payment selection ---------------- */
function selectPay(card) {
    payCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedPayment = card.getAttribute('data-method');
    checkPlaceBtnState();
}

/* ---------------- cart render ---------------- */
function renderCart() {
    const itemsList = document.getElementById('itemsList');
    const itemSummary = document.getElementById('itemSummary');
    const itemCountBadge = document.getElementById('itemCount');
    const cartBadge = document.getElementById('cartBadge');
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const grandTotalEl = document.getElementById('grandTotal');
    const bottomTotal = document.getElementById('bottomTotal');

    //clear previous items
    itemsList.innerHTML = '';

    let count = 0, sub = 0;

    // Handle empty cart
    if (!cart || cart.length === 0) {
        itemsList.innerHTML = '<div style="text-align:center; padding:20px; color:#999;">No items in cart</div>';
        itemSummary.textContent = '0 items — ₹0';
        itemCountBadge.textContent = '0 items';
        cartBadge.textContent = '0';
        subtotalEl.textContent = '₹0';
        taxEl.textContent = '₹0';
        grandTotalEl.textContent = '₹0';
        bottomTotal.textContent = '₹0';
        return;
    }

    //render cart items
    cart.forEach(it => {
        count += it.qty;
        sub += it.price * it.qty;
        const row = document.createElement('div');
        row.className = 'item';
        row.innerHTML = `
            <div class="thumb">${it.emoji || '🍽️'}</div>
            <div>
                <div style="font-weight:700">${it.name}</div>
                <div class="small">₹${it.price} each</div>
            </div>
            <div style="margin-left:auto;display:flex;gap:8px;align-items:center">
                <div class="qty">x${it.qty}</div>
            </div>
        `;
        itemsList.appendChild(row);
    });
    const tax = Math.round(sub * 0.10);
    const total = sub + tax;
    //update ui
    itemSummary.textContent = `${count} items — ₹${sub}`;
    itemCountBadge.textContent = `${count} items`;
    cartBadge.textContent = count;
    subtotalEl.textContent = `₹${sub}`;
    taxEl.textContent = `₹${tax}`;
    grandTotalEl.textContent = `₹${sub + tax}`;
    bottomTotal.textContent = `₹${sub + tax}`;
    updateCartBadge();
}
renderCart();

// Update cart badge in header
function updateCartBadge() {
    const cartBadge = document.getElementById('cartBadge');
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    
    if (cartBadge) {
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

/* ---------------- UI small helpers ---------------- */
const toggleItems = document.getElementById('toggleItems');
const itemsList = document.getElementById('itemsList');
toggleItems.addEventListener('click', () => {
    itemsList.classList.toggle('open');
    toggleItems.textContent = itemsList.classList.contains('open') ? 'Collapse' : 'Expand';
});

/* ---------------- place order validation & flow ---------------- */
const phoneEl = document.getElementById('phone');
const saveInfoEl = document.getElementById('saveInfo');
const placeBtn = document.getElementById('placeOrder');
const confirmation = document.getElementById('confirmation');
const orderTokenEl = document.getElementById('orderToken');
const confirmList = document.getElementById('confirmList');

function checkPlaceBtnState() {
    const phoneOk = /^[0-9]{10}$/.test(phoneEl.value);
    const paymentOk = !!selectedPayment;
    placeBtn.disabled = !(phoneOk && paymentOk);
}
phoneEl.addEventListener('input', checkPlaceBtnState);

/* Place order click */
let processing = false;
placeBtn.addEventListener('click', placeOrder);

function placeOrder() {
    if (placeBtn.disabled || processing) return;

    // Phone validation with better error message
    const phone = phoneEl.value.trim();
    if (!/^[6-9][0-9]{9}$/.test(phone)) {  // Indian mobile numbers start with 6-9
        alert('Please enter a valid 10-digit Indian mobile number\n(Starting with 6, 7, 8, or 9)');
        phoneEl.focus();
        phoneEl.select();  // Select text for easy re-entry
        return;
    }

    if (!selectedPayment) {
        alert('Please select a payment method');
        return;
    }

    processing = true;
    placeBtn.disabled = true;
    // replace inner to show spinner + text but keep styling
    placeBtn.innerHTML = '<span><span class="spinner" aria-hidden="true"></span><span>Processing</span></span>';

    // save info if asked
    if (saveInfoEl.checked) {
        localStorage.setItem('order_phone', phoneEl.value);
    }

    // start tracking animation in background so progress shows while processing
    //openTracking(); // open tracking overlay immediately (optional) - comment out if you don't want this.
    // if you prefer tracking only from confirmation, remove the above line.

    setTimeout(() => {
        // hide sections and show confirmation
        ['sec1', 'sec2', 'sec3', 'sec4'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        });
        confirmation.classList.add('show');

        // token, confirm list, qr
        const token = generateToken();
        orderTokenEl.textContent = token;
        confirmList.innerHTML = '';
        cart.forEach(it => {
            confirmList.innerHTML += `<div style="display:flex;justify-content:space-between;padding:6px 0"><div>${it.qty} x ${it.name}</div><div>₹${it.price * it.qty}</div></div>`;
        });
        document.getElementById('qrBox').innerHTML = `<svg width='100' height='100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' fill='#fff'/><text x='50' y='55' font-size='10' text-anchor='middle' fill='#111'>${token}</text></svg>`;
        // CLEAR CART after successful order
        cart = [];
        localStorage.removeItem('campusbite_cart');
        // reset button label and state
        placeBtn.innerHTML = '<span>Place Order</span>';
        placeBtn.disabled = false;
        processing = false;
        // ensure place button remains disabled until new valid inputs/payment
        checkPlaceBtnState();
    }, 1400);
}

function generateToken(len = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let s = '';
    for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return s;
}

function closeConfirm() {
    confirmation.classList.remove('show');
    // Bring order sections back
    ['sec1', 'sec2', 'sec3', 'sec4'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('hidden');
    });
}


/* ---------------- Tracking (Option C) ---------------- */
const trackingUI = document.getElementById('trackingUI');
const progressEl = document.getElementById('trackingProgress') || document.getElementById('trackingProgress'); // fallback
const steps = ['st1', 'st2', 'st3', 'st4'];
let stepIndex = 0;
let trackingTimer = null;

function resetTracking() {
    // remove active class from items
    steps.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
    });
    stepIndex = 0;
    // reset progress width
    const prog = document.getElementById('trackingProgress');
    if (prog) prog.style.width = '0%';
    if (trackingTimer) clearTimeout(trackingTimer);
}

function animateTracking() {
    // compute percent per step: when first step active -> progress covers 0% (or a little), after each step increase
    if (stepIndex >= steps.length) return;
    const el = document.getElementById(steps[stepIndex]);
    if (el) el.classList.add('active');

    // set progress: percent = ((stepIndex + 1) / (steps.length)) * 100 - small adjustment so final reaches 100%
    const prog = document.getElementById('trackingProgress');
    const percent = Math.round(((stepIndex + 1) / steps.length) * 100);
    if (prog) prog.style.width = percent + '%';

    stepIndex++;
    if (stepIndex < steps.length) {
        // Change timing based on step (faster initially, slower at end)
        const delays = [800, 2000, 3000];  // milliseconds for each step
        trackingTimer = setTimeout(animateTracking, delays[stepIndex - 1] || 1700);
    }
}

function openTracking() {
    resetTracking();
    trackingUI.style.display = 'flex';
    // slight delay so overlay shows then animate
    setTimeout(() => {
        animateTracking();
    }, 180);
}

function closeTracking() {
    trackingUI.style.display = 'none';
    // Do NOT reset UI back to place order page
    // Confirmation overlay remains visible
}


/* hook tracking-close button is inline on markup */

/* restore saved contact if present */
window.addEventListener('load', () => {
    const savedPhone = localStorage.getItem('order_phone');
    if (savedPhone) {
        // Show option to use saved phone
        document.getElementById('savedPhoneOption').style.display = 'block';
        document.getElementById('savedPhoneDisplay').textContent = savedPhone;
    }
    // ensure payment starts none-selected
    loadCartFromStorage();
    selectedPayment = null;
    document.querySelectorAll('.pay-card').forEach(c => c.classList.remove('selected'));
    checkPlaceBtnState();
});

// Function to use saved phone
function useSavedPhone() {
    const savedPhone = localStorage.getItem('order_phone');
    if (savedPhone) {
        phoneEl.value = savedPhone;
        checkPlaceBtnState();
    }
}
/* small helpers */
/* Go back to edit cart */
function goEditCart() {
    // Option 1: Go back in history
    window.history.back();

    // Option 2: Or redirect to specific page
    // window.location.href = '/menu.html';     //DEMO FOR BACKEND
}

/* screenshot / share */
document.getElementById('screenshotBtn').addEventListener('click', () => window.print());
document.getElementById('shareBtn').addEventListener('click', async () => {
    const text = `Order ${orderTokenEl.textContent} ready in ${document.getElementById('eta').textContent}`;
    if (navigator.share) { try { await navigator.share({ title: 'My Order', text }) } catch (e) { } }
    else { try { await navigator.clipboard.writeText(text); alert('Copied order details') } catch (e) { alert(text) } }
});

/* keyboard enter */
phoneEl.addEventListener('keydown', e => { if (e.key === 'Enter' && !placeBtn.disabled) placeOrder(); });
