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
    const toggleBtn = document.querySelector('.toggle-btn i');

    body.classList.toggle('dark-mode');

    // Icon change karo
    if (body.classList.contains('dark-mode')) {
        toggleBtn.classList.remove('fa-moon');
        toggleBtn.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'true');
    } else {
        toggleBtn.classList.remove('fa-sun');
        toggleBtn.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'false');
    }
}

// Page load pe check karo saved preference
window.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.toggle-btn i');
    
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        toggleBtn.classList.remove('fa-moon');
        toggleBtn.classList.add('fa-sun');
    }
});
