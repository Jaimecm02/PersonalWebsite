// Theme toggle functionality
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
const menuBackdrop = document.createElement('div');
document.body.appendChild(menuBackdrop);

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    menuBackdrop.classList.toggle('show');
    mobileMenuBtn.classList.toggle('active');
});

// Close the menu when clicking outside or on the backdrop
menuBackdrop.addEventListener('click', () => {
    navLinks.classList.remove('show');
    menuBackdrop.classList.remove('show');
    mobileMenuBtn.classList.remove('active');
});

// Close the menu when a link is clicked (optional)
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('show');
        menuBackdrop.classList.remove('show');
        mobileMenuBtn.classList.remove('active');
    }
});

// Contact and CV download functionality
document.addEventListener("DOMContentLoaded", function () {
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

// JavaScript to handle the project previews
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on mobile
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    // Project data with preview information
    const projectPreviews = {
        'Document Similarity Analyzer': {
            type: 'image',
            src: 'assets/images/DocumentSimilarityScreenshot.png',
            alt: 'Document Similarity Tool Interface',
            caption: 'TF-IDF visualization of document similarity'
        },
        'Daily Habit Tracker': {
            type: 'gif',
            src: 'assets/images/HabitTrackerScreenshot.png',
            alt: 'Habit Tracker App Demo',
            caption: 'User interface for tracking daily habits'
        },
        'Game of Life Implementation': {
            type: 'video',
            src: '/api/placeholder/540/360',
            alt: 'Game of Life Animation',
            caption: 'Pattern evolution in Conway\'s Game of Life'
        }
    };
    
    // Get all project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    // For each project card
    projectCards.forEach(card => {
        // Get the project title
        const titleElement = card.querySelector('.project-title');
        const title = titleElement.textContent;
        
        // Get preview data for this project
        const previewData = projectPreviews[title];
        
        if (previewData) {
            // Create preview container
            const previewContainer = document.createElement('div');
            previewContainer.className = 'project-preview';
            
            // Create preview content
            let previewContent;
            if (previewData.type === 'video') {
                previewContent = document.createElement('video');
                previewContent.src = previewData.src;
                previewContent.alt = previewData.alt;
                previewContent.autoplay = true;
                previewContent.loop = true;
                previewContent.muted = true;
            } else {
                // For both image and gif
                previewContent = document.createElement('img');
                previewContent.src = previewData.src;
                previewContent.alt = previewData.alt;
            }
            
            // Add caption
            const caption = document.createElement('div');
            caption.className = 'preview-caption';
            caption.textContent = previewData.caption;
            
            // Add to preview container
            previewContainer.appendChild(previewContent);
            previewContainer.appendChild(caption);
            
            // For mobile, add a close button
            if (isMobile) {
                const closeButton = document.createElement('button');
                closeButton.className = 'preview-close';
                closeButton.innerHTML = '&times;';
                closeButton.addEventListener('click', function(e) {
                    e.stopPropagation();
                    previewContainer.classList.remove('show');
                });
                previewContainer.appendChild(closeButton);
                
                // Show preview on tap
                card.addEventListener('click', function(e) {
                    // Don't trigger if clicking on the link
                    if (!e.target.closest('.project-link')) {
                        e.preventDefault();
                        previewContainer.classList.add('show');
                    }
                });
            }
            
            // Create a wrapper for the existing content
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'project-content';
            
            // Move all existing children to the wrapper
            while (card.firstChild) {
                contentWrapper.appendChild(card.firstChild);
            }
            
            // Add the content wrapper and preview to the card
            card.appendChild(contentWrapper);
            card.appendChild(previewContainer);
        }
    });
    
    // Close all previews when clicking outside
    if (isMobile) {
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.project-preview') && !e.target.closest('.project-card')) {
                document.querySelectorAll('.project-preview.show').forEach(preview => {
                    preview.classList.remove('show');
                });
            }
        });
    }
});