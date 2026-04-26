// ===== MOCK DATA =====
const mockOrders = [
    { id: '#001', items: 'Aloo Paratha x2, Chai x1', total: 95, time: '9:15 AM', status: 'completed' },
    { id: '#002', items: 'Chole Bhature x1, Coffee x1', total: 90, time: '10:30 AM', status: 'completed' },
    { id: '#003', items: 'Samosa x2, Chai x2', total: 70, time: '11:00 AM', status: 'pending' },
    { id: '#004', items: 'Paneer Butter Masala x1', total: 80, time: '12:15 PM', status: 'completed' },
    { id: '#005', items: 'White Sauce Pasta x1, Coffee x1', total: 70, time: '1:00 PM', status: 'pending' },
];

const weeklyEarnings = [320, 480, 290, 610, 540, 390, 720];
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initStatus();
    setDate();
    loadMenuItems();
    renderOrders();
    renderEarningsChart();
    renderPopularItems();
    updateOverviewCards();
    initScrollSpy();
});

// ===== DATE =====
function setDate() {
    const now = new Date();
    document.getElementById('dashDate').textContent = now.toLocaleDateString('en-IN', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
}

// ===== LOAD MENU ITEMS FROM LOCALSTORAGE =====
function loadMenuItems() {
    const saved = localStorage.getItem('cb_menu');
    const items = saved ? JSON.parse(saved) : [];

    document.getElementById('totalMenuItems').textContent = items.length;

    const grid = document.getElementById('dashMenuGrid');
    if (items.length === 0) {
        grid.innerHTML = `
      <div class="empty-dash-msg">
        <i class="fa-solid fa-bowl-food"></i>
        <p>No menu items yet. <a href="/staff/add-menu" style="color:var(--accent);">Add items</a></p>
      </div>`;
        return;
    }

    grid.innerHTML = items.map((item, i) => {
        const available = item.isAvailable !== false;
        return `
    <div class="dash-menu-card glass" id="menuCard${i}" style="opacity:${available ? '1' : '0.6'}">
      <div class="dash-menu-thumb-wrap">
        <img src="${item.image}" alt="${item.name}" class="dash-menu-thumb" />
        ${!available ? `<span class="out-of-stock-badge">Out of Stock</span>` : ''}
      </div>
      <div class="dash-menu-info">
        <p class="dash-menu-name">${item.name}</p>
        <p class="dash-menu-meta">${item.category} · ₹${item.price} · ${item.isVeg ? '🟢' : '🔴'}</p>
      </div>
      <div class="dash-menu-actions">
        <button class="edit-btn" onclick="openEditModal(${i})">
            <i class="fa-solid fa-pen"></i>
        </button>
        <label class="avail-toggle" title="${available ? 'Mark Unavailable' : 'Mark Available'}">
          <input type="checkbox" ${available ? 'checked' : ''} onchange="toggleAvailability(${i}, this.checked)" />
          <span class="avail-slider"></span>
        </label>
        <button class="remove-btn" onclick="deleteMenuItem(${i})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>`
    }).join('');

    // Canteen name from first load
    const canteenName = localStorage.getItem('cb_canteen_name') || 'My Canteen';
    document.getElementById('sidebarCanteenName').textContent = canteenName;
    document.getElementById('dashCanteenName').textContent = canteenName + ' — Dashboard';
}

// ===== TOGGLE AVAILABILITY =====
function toggleAvailability(index, available) {
    const saved = localStorage.getItem('cb_menu');
    const items = saved ? JSON.parse(saved) : [];
    items[index].isAvailable = available;
    localStorage.setItem('cb_menu', JSON.stringify(items));

    const card = document.getElementById(`menuCard${index}`);
    if (card) card.style.opacity = available ? '1' : '0.5';
}

// ===== DELETE MENU ITEM =====
function deleteMenuItem(index) {
    if (!confirm('Delete this item?')) return;
    const saved = localStorage.getItem('cb_menu');
    const items = saved ? JSON.parse(saved) : [];
    items.splice(index, 1);
    localStorage.setItem('cb_menu', JSON.stringify(items));
    loadMenuItems();
}

// ===== OVERVIEW CARDS =====
function updateOverviewCards() {
    const completed = mockOrders.filter(o => o.status === 'completed');
    const revenue = completed.reduce((sum, o) => sum + o.total, 0);
    document.getElementById('totalOrders').textContent = mockOrders.length;
    document.getElementById('totalRevenue').textContent = '₹' + revenue;
}

// ===== EARNINGS CHART =====
function renderEarningsChart() {
    const max = Math.max(...weeklyEarnings);
    const chart = document.getElementById('earningsChart');
    chart.innerHTML = weeklyEarnings.map((val, i) => {
        const height = Math.round((val / max) * 100);
        return `
      <div class="bar-wrap">
        <span class="bar-val">₹${val}</span>
        <div class="bar" style="height:${height}%"></div>
        <span class="bar-label">${weekDays[i]}</span>
      </div>`;
    }).join('');
}

// ===== POPULAR ITEMS =====
function renderPopularItems() {
    const popular = [
        { name: 'Aloo Paratha', orders: 24, emoji: '🫓' },
        { name: 'Chai', orders: 19, emoji: '☕' },
        { name: 'Samosa', orders: 15, emoji: '🥟' },
        { name: 'Chole Bhature', orders: 12, emoji: '🍛' },
    ];
    const max = popular[0].orders;
    document.getElementById('popularItems').innerHTML = popular.map(item => `
    <div class="popular-item">
      <span class="popular-emoji">${item.emoji}</span>
      <div class="popular-info">
        <div class="popular-top">
          <span class="popular-name">${item.name}</span>
          <span class="popular-count">${item.orders} orders</span>
        </div>
        <div class="popular-bar-bg">
          <div class="popular-bar-fill" style="width:${Math.round((item.orders / max) * 100)}%"></div>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== ORDERS =====
function renderOrders() {
    document.getElementById('ordersList').innerHTML = mockOrders.map((order, i) => `
    <div class="order-card glass" id="orderCard${i}">
      <div class="order-left">
        <p class="order-id">${order.id}</p>
        <p class="order-items">${order.items}</p>
        <p class="order-time"><i class="fa-regular fa-clock"></i> ${order.time}</p>
      </div>
      <div class="order-right">
        <p class="order-total">₹${order.total}</p>
        ${order.status === 'pending' ? `
          <div class="order-actions">
            <button class="accept-btn" onclick="updateOrder(${i}, 'completed')">
              <i class="fa-solid fa-check"></i> Accept
            </button>
            <button class="reject-btn" onclick="updateOrder(${i}, 'unavailable')">
                <i class="fa-solid fa-ban"></i> Unavailable
            </button>
          </div>
        ` : `
          <span class="order-status ${order.status}">${order.status}</span>
        `}
      </div>
    </div>
  `).join('');
}

function updateOrder(index, status) {
    mockOrders[index].status = status;
    renderOrders();
    updateOverviewCards();
}

// ===== STATUS TOGGLE =====
function toggleStatus() {
    const btn = document.getElementById('statusToggle');
    const label = document.getElementById('statusLabel');
    const isOpen = btn.classList.contains('open');
    btn.classList.toggle('open', !isOpen);
    btn.classList.toggle('closed', isOpen);
    label.textContent = isOpen ? 'Closed' : 'Open';
    label.style.color = isOpen ? 'var(--danger)' : '#22c55e';
    localStorage.setItem('cb_canteen_status', isOpen ? 'closed' : 'open');
}

function initStatus() {
    const saved = localStorage.getItem('cb_canteen_status') || 'open';
    const btn = document.getElementById('statusToggle');
    const label = document.getElementById('statusLabel');
    if (saved === 'closed') {
        btn.classList.remove('open');
        btn.classList.add('closed');
        label.textContent = 'Closed';
        label.style.color = 'var(--danger)';
    }
}

// ===== SIDEBAR ACTIVE =====
function setActive(el) {
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    el.classList.add('active');
}

// ===== SCROLL SPY =====
function initScrollSpy() {
    const sections = document.querySelectorAll('.dash-section');
    const links = document.querySelectorAll('.sidebar-link[href^="#"]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.sidebar-link[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));
}

// ===== SEARCH MENU ITEMS =====
function searchMenuItems(query) {
    const cards = document.querySelectorAll('.dash-menu-card');
    const q = query.toLowerCase();
    cards.forEach(card => {
        const name = card.querySelector('.dash-menu-name').textContent.toLowerCase();
        card.style.display = name.includes(q) ? 'flex' : 'none';
    });
}

// ===== EDIT MENU ITEM =====
let editingIndex = -1;

function openEditModal(index) {
    const saved = localStorage.getItem('cb_menu');
    const items = saved ? JSON.parse(saved) : [];
    const item = items[index];
    if (!item) return;

    editingIndex = index;
    document.getElementById('editName').value = item.name;
    document.getElementById('editDesc').value = item.desc;
    document.getElementById('editPrice').value = item.price;
    document.getElementById('editCategory').value = item.category;
    document.getElementById('editModal').classList.remove('hidden');
}

function closeEditModal() {
    document.getElementById('editModal').classList.add('hidden');
    editingIndex = -1;
}

function saveEdit() {
    if (editingIndex === -1) return;
    const saved = localStorage.getItem('cb_menu');
    const items = saved ? JSON.parse(saved) : [];

    items[editingIndex].name = document.getElementById('editName').value.trim();
    items[editingIndex].desc = document.getElementById('editDesc').value.trim();
    items[editingIndex].price = Number(document.getElementById('editPrice').value);
    items[editingIndex].category = document.getElementById('editCategory').value;

    localStorage.setItem('cb_menu', JSON.stringify(items));
    closeEditModal();
    loadMenuItems();
}

// ===== THEME =====
function initTheme() {
    const KEY = 'cb-theme';
    const root = document.documentElement;
    function applyTheme(t) { root.setAttribute('data-theme', t); localStorage.setItem(KEY, t); }
    if (!root.getAttribute('data-theme')) applyTheme(localStorage.getItem(KEY) || 'light');
    const btn = document.getElementById('themeToggle');
    if (btn) btn.addEventListener('click', () => {
        applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
}