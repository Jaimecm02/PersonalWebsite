// Get the theme toggle button
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
} else {
    // Default to light theme
    body.setAttribute('data-theme', 'light');
    updateThemeIcon('light');
}

// Function to update the theme icon
function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for light mode
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for dark mode
    }
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Save theme preference
    updateThemeIcon(newTheme);
});

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

document.addEventListener("DOMContentLoaded", function () {
    // Get buttons
    const contactBtn = document.querySelector(".btn-primary");
    const downloadBtn = document.querySelector(".btn-outline");

    // "Contact Me" button scrolls to the contact section
    contactBtn.addEventListener("click", function (event) {
        event.preventDefault();
        const contactSection = document.querySelector("#contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    });

    // "Download CV" button triggers file download
    downloadBtn.addEventListener("click", function (event) {
        event.preventDefault();
        const cvUrl = "assets/docs/Jaime_Criado_Martin_CV.pdf";
        const link = document.createElement("a");
        link.href = cvUrl;
        link.download = "Jaime_Criado_Martin_CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});