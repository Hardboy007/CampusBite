// ===== MOCK DATA =====
const mockOrders = [
    { id: '#001', items: 'Aloo Paratha x2, Chai x1', total: 95, time: '9:15 AM', status: 'incoming' },
    { id: '#002', items: 'Chole Bhature x1, Coffee x1', total: 90, time: '10:30 AM', status: 'incoming' },
    { id: '#003', items: 'Samosa x2, Chai x2', total: 70, time: '11:00 AM', status: 'preparing' },
    { id: '#004', items: 'Paneer Butter Masala x1', total: 80, time: '12:15 PM', status: 'completed' },
    { id: '#005', items: 'White Sauce Pasta x1, Coffee x1', total: 70, time: '1:00 PM', status: 'completed' },
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

    // loadMenuItems ke andar ye block move karo — grid check se pehle
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
    const statusOrder = { incoming: 0, preparing: 1, completed: 2, unavailable: 3 };
    const sorted = [...mockOrders].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);

    document.getElementById('ordersList').innerHTML = sorted.map(o => {
        const realIndex = mockOrders.indexOf(o);
        return `
    <div class="order-card glass">
      <div class="order-left">
        <p class="order-id">${o.id}</p>
        <p class="order-items">${o.items}</p>
        <p class="order-time"><i class="fa-regular fa-clock"></i> ${o.time}</p>
      </div>
      <div class="order-right">
        <p class="order-total">₹${o.total}</p>
        ${o.status === 'incoming' ? `
          <div class="order-actions">
            <button class="accept-btn" onclick="updateOrder(${realIndex}, 'preparing')">
              <i class="fa-solid fa-check"></i> Accept
            </button>
            <button class="reject-btn" onclick="updateOrder(${realIndex}, 'unavailable')">
              <i class="fa-solid fa-ban"></i> Unavailable
            </button>
          </div>
        ` : o.status === 'preparing' ? `
          <button class="accept-btn" onclick="updateOrder(${realIndex}, 'completed')">
            <i class="fa-solid fa-bell"></i> Mark Done
          </button>
          <span class="order-status preparing">Preparing</span>
        ` : `
          <span class="order-status ${o.status}">${o.status}</span>
        `}
      </div>
    </div>`;
    }).join('');
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
    const sidebarLinks = document.querySelectorAll('.sidebar-link[href^="#"]');
    const bottomLinks = document.querySelectorAll('.bottom-nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;

                sidebarLinks.forEach(l => l.classList.remove('active'));
                const sidebarActive = document.querySelector(`.sidebar-link[href="#${id}"]`);
                if (sidebarActive) sidebarActive.classList.add('active');

                bottomLinks.forEach(l => l.classList.remove('active'));
                const bottomActive = document.querySelector(`.bottom-nav-link[href="#${id}"]`);
                if (bottomActive) bottomActive.classList.add('active');
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));
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