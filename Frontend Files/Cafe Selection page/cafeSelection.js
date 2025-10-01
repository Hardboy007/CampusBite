function toggleDarkMode() {
    const body = document.body;
    const toggleBtn = document.querySelector('.toggle-btn');

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        toggleBtn.textContent = 'Light Mode';
    } else {
        toggleBtn.textContent = 'Dark Mode';
    }
}
// Page load animation trigger for backend page load bug
window.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        const container = document.querySelector('.container');
        if (container) container.classList.add('loaded');
    }, 50);
});
