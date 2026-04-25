let menuItems = [];
let selectedImageUrl = '';
let isVeg = true;

// ===== VEG TOGGLE =====
function setVeg(veg) {
    isVeg = veg;
    document.getElementById('vegBtn').classList.toggle('active', veg);
    document.getElementById('nonVegBtn').classList.toggle('active', !veg);
}

// ===== IMAGE SEARCH =====
async function searchImages() {
    const query = document.getElementById('imageSearch').value.trim();
    if (!query) return;

    const resultsDiv = document.getElementById('imageResults');
    resultsDiv.innerHTML = '<p style="color:var(--muted); font-size:13px;">Searching...</p>';
    resultsDiv.classList.remove('hidden');

    try {
        const res = await fetch(`/staff/search-images?q=${encodeURIComponent(query)}`);
        const images = await res.json();

        if (!images.length) {
            resultsDiv.innerHTML = '<p style="color:var(--muted); font-size:13px;">No images found. Try different keywords.</p>';
            return;
        }

        resultsDiv.innerHTML = images.map(img => `
      <img 
        src="${img.url}" 
        alt="${img.alt || query}"
        class="img-option"
        onclick="selectImage('${img.url}')"
        title="Click to select"
      />
    `).join('');
    } catch (err) {
        resultsDiv.innerHTML = '<p style="color:var(--danger); font-size:13px;">Error fetching images. Try again.</p>';
    }
}

// ===== SELECT IMAGE =====
function selectImage(url) {
    selectedImageUrl = url;

    // Highlight selected
    document.querySelectorAll('.img-option').forEach(img => img.classList.remove('selected'));
    event.target.classList.add('selected');

    // Show preview
    document.getElementById('selectedImagePreview').src = url;
    document.getElementById('selectedImageWrap').classList.remove('hidden');
}

// ===== ADD ITEM =====
function addItem() {
    const name = document.getElementById('itemName').value.trim();
    const desc = document.getElementById('itemDesc').value.trim();
    const price = document.getElementById('itemPrice').value.trim();
    const category = document.getElementById('itemCategory').value;

    if (!name || !desc || !price || !selectedImageUrl) {
        alert('Sabhi fields fill karo aur ek image select karo.');
        return;
    }

    const item = { name, desc, price: Number(price), category, isVeg, image: selectedImageUrl };
    menuItems.push(item);

    renderItemsList();
    resetForm();
}

// ===== RENDER LIST =====
function renderItemsList() {
    const list = document.getElementById('menuItemsList');
    const emptyMsg = document.getElementById('emptyMsg');
    const dashBtn = document.getElementById('dashboardBtn');
    const count = document.getElementById('itemCount');

    count.textContent = menuItems.length;
    dashBtn.disabled = menuItems.length === 0;

    // CLEAR FIRST (important)
    list.innerHTML = '';

    if (menuItems.length === 0) {
        emptyMsg.style.display = "flex";
        return;
    }

    emptyMsg.style.display = "none";

    emptyMsg.classList.add('hidden');

    menuItems.forEach((item, i) => {
        const card = document.createElement('div');
        card.className = 'menu-item-card glass';

        card.innerHTML = `
      <img src="${item.image}" class="menu-item-thumb" />
      <div class="menu-item-info">
        <p class="menu-item-name">${item.name}</p>
        <p class="menu-item-meta">${item.category} · ₹${item.price} · ${item.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}</p>
      </div>
      <button class="remove-btn" onclick="removeItem(${i})">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;

        list.appendChild(card);
    });
}

// ===== REMOVE ITEM =====
function removeItem(index) {
    menuItems.splice(index, 1);
    renderItemsList();
}

// ===== RESET FORM =====
function resetForm() {
    document.getElementById('itemName').value = '';
    document.getElementById('itemDesc').value = '';
    document.getElementById('itemPrice').value = '';
    document.getElementById('imageSearch').value = '';
    document.getElementById('imageResults').innerHTML = '';
    document.getElementById('imageResults').classList.add('hidden');
    document.getElementById('selectedImageWrap').classList.add('hidden');
    selectedImageUrl = '';
    isVeg = true;
    setVeg(true);
}

// ===== GO TO DASHBOARD =====
function goToDashboard() {
    if (menuItems.length === 0) return;
    // Save to localStorage for demo — replace with POST when backend ready
    localStorage.setItem('cb_menu', JSON.stringify(menuItems));
    window.location.href = '/staff/dashboard';
}

// ===== ENTER KEY on image search =====
document.getElementById('imageSearch').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') searchImages();
});

// ===== THEME =====
(function () {
    const KEY = 'cb-theme';
    const root = document.documentElement;
    function applyTheme(t) { root.setAttribute('data-theme', t); localStorage.setItem(KEY, t); }
    if (!root.getAttribute('data-theme')) applyTheme(localStorage.getItem(KEY) || 'light');
    const btn = document.getElementById('themeToggle');
    if (btn) btn.addEventListener('click', () => {
        applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
})();