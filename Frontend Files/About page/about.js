document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-links a");
    links.forEach(link => {
        if(link.href === window.location.href){     //"Ye link jo point kar raha hai" === "Ye current page ka URL"
            link.classList.add("active");
        }
    });
});

//for Dark mode
function toggleDarkMode() {
    const body = document.body;
    const toggleBtn = document.querySelector('.toggle-btn');

    body.classList.toggle('dark-mode');

    // Update button text
    if (body.classList.contains('dark-mode')) {
        toggleBtn.textContent = 'Light Mode';
        localStorage.setItem('darkMode', 'on');  // save state
    } else {
        toggleBtn.textContent = 'Dark Mode';
        localStorage.setItem('darkMode', 'off'); // save state
    }
}

// On page load, check localStorage
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const toggleBtn = document.querySelector('.toggle-btn');

    if(localStorage.getItem('darkMode') === 'on'){
        body.classList.add('dark-mode');
        if(toggleBtn) toggleBtn.textContent = 'Light Mode';     //update button text
    }
})
