// Reusable function for downloading CV
function downloadCV() {
    const cvUrl = "assets/docs/Jaime_Criado_Martin_CV.pdf";
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "Jaime_Criado_Martin_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Reusable function for scrolling to a section
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}

document.addEventListener("DOMContentLoaded", function () {
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

    // Function to update the theme icon with animation
    function updateThemeIcon(theme) {
        const icons = themeToggle.querySelectorAll('.icon');
        icons.forEach(icon => {
            icon.classList.remove('showing', 'hiding', 'hidden');
        });

        if (theme === 'dark') {
            icons[0].classList.add('hiding'); // Hide moon icon
            icons[1].classList.add('showing'); // Show sun icon
        } else {
            icons[1].classList.add('hiding'); // Hide sun icon
            icons[0].classList.add('showing'); // Show moon icon
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
    const contactBtn = document.querySelector(".btn-contact");
    const downloadBtn = document.querySelector(".btn-download-cv");
    const heroDownloadBtn = document.getElementById("hero-download-cv");

    // "Contact Me" button scrolls to the about section
    contactBtn.addEventListener("click", function (event) {
        event.preventDefault();
        scrollToSection("#about");
    });

    // "Download CV" button triggers file download
    downloadBtn.addEventListener("click", function (event) {
        event.preventDefault();
        downloadCV();
    });

    // "Download CV" button in the hero section
    heroDownloadBtn.addEventListener("click", function (event) {
        event.preventDefault();
        downloadCV();
    });

    // Check if we're on mobile
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const pageWrap = document.querySelector('.page-wrap');
    pageWrap.classList.add('reveal');

    const header = document.querySelector('header');
    const startSection = document.querySelector('.start');
    const startSectionHeight = startSection.offsetHeight;

    function checkScroll() {
        const scrollPosition = window.scrollY;

        if (scrollPosition > startSectionHeight) {
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
        }
    }

    // Initial check in case the page is loaded with a scroll position
    checkScroll();

    // Add scroll event listener
    window.addEventListener('scroll', checkScroll);

    const heroContent = document.querySelector('.hero-content');
    const subtitle = document.querySelector('.subtitle');

    setTimeout(() => {
        startSection.classList.add('animate');
        heroContent.classList.add('animate-hero');
        subtitle.computedStyleMap.opacity = 1;
        pageWrap.style.display = 'none';
    }, 500);

    // Text scramble animation
    textScrumbleAnimation();

    // Project data with preview information
    const projectPreviews = {
        'Document Similarity Analyzer': {
            type: 'image',
            src: 'assets/images/DocumentSimilarityScreenshot.png',
            alt: 'Document Similarity Tool Interface',
            caption: 'TF-IDF visualization of document similarity'
        },
        'Daily Habit Tracker': {
            type: 'image',
            src: 'assets/images/HabitTrackerScreenshot.png',
            alt: 'Habit Tracker App Demo',
            caption: 'User interface for tracking daily habits'
        },
        'Game of Life Implementation': {
            type: 'video',
            src: 'assets/images/game_of_life.mp4',
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

function textScrumbleAnimation() {
    const el = document.getElementById('text_scrumble');
    if(el) {
        let phrases = el.getAttribute('data-phrases').slice(0, -1);
        phrases = phrases.split(',');

        const fx = new TextScramble(el);
        let counter = 0;
        const next = () => {
            fx.setText(phrases[counter]).then(() => {
                setTimeout(next, 1500);
            });
            counter = (counter + 1) % phrases.length;
        };
        next();
    }
}

class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 50);
            const end = start + Math.floor(Math.random() * 50);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}