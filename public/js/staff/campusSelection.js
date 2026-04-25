// ===== DOM REFS =====
const campusSelect     = document.getElementById('campus');
const canteenSelect    = document.getElementById('canteen');
const canteenSection   = document.getElementById('canteenSection');
const noCanteenSection = document.getElementById('noCanteenSection');
const dashboardBtn     = document.getElementById('dashboardBtn');

// ===== CAMPUS CHANGE =====
campusSelect.addEventListener('change', async function () {
  const campusId = this.value;

  canteenSection.classList.add('hidden');
  noCanteenSection.classList.add('hidden');
  document.getElementById('canteenList').innerHTML = '';

  try {
    const res = await fetch(`/staff/get-canteens/${campusId}`);
    const canteens = await res.json();

    if (canteens.length) {
      document.getElementById('canteenList').innerHTML = canteens
        .map(c => `
          <div class="canteen-tag">
            <i class="fa-solid fa-store"></i> ${c.name}
          </div>`
        ).join('');
      canteenSection.classList.remove('hidden');
    } else {
      noCanteenSection.classList.remove('hidden');
    }
  } catch (err) {
    console.error(err);
    noCanteenSection.classList.remove('hidden');
  }
});

// ===== DASHBOARD NAVIGATION =====
if (dashboardBtn) {
  dashboardBtn.addEventListener('click', function () {
    const campusId  = campusSelect.value;
    const canteenId = canteenSelect.value;
    if (!campusId || !canteenId) return;
    window.location.href = `/staff/dashboard?campus=${campusId}&canteen=${canteenId}`;
  });
}

// ===== MODAL =====
function openModal()  { document.getElementById('canteenModal').classList.add('active'); }
function closeModal() { document.getElementById('canteenModal').classList.remove('active'); }

document.getElementById('canteenModal').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});

// ===== THEME TOGGLE =====
(function () {
  const KEY  = 'cb-theme';
  const root = document.documentElement;

  function getTheme() {
    const saved = localStorage.getItem(KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    localStorage.setItem(KEY, t);
  }

  if (!root.getAttribute('data-theme')) applyTheme(getTheme());

  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.addEventListener('click', function () {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  window.addEventListener('storage', function (e) {
    if (e.key === KEY && e.newValue) applyTheme(e.newValue);
  });
})();