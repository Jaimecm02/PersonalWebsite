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

// Text scramble animation class
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

// Text scramble animation function
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

// Typing effect functions
function typeCode(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

function initializeTypingEffects() {
    try {
        const typingConfigs = {
            'python': { speed: 50 },
            'javascript': { speed: 55 },
            'tensorflow': { speed: 60 },
            'pytorch': { speed: 65 }
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const codeElement = entry.target;
                    const editorType = codeElement.closest('.code-editor')?.classList[1];
                    if (editorType) {
                        const speed = typingConfigs[editorType]?.speed || 50;
                        const originalText = codeElement.textContent.trim();
                        typeCode(codeElement, originalText, speed);
                        observer.unobserve(codeElement);
                    }
                }
            });
        }, {
            threshold: 0.5
        });

        const codeElements = document.querySelectorAll('.editor-content code');
        if (codeElements.length > 0) {
            codeElements.forEach(code => {
                code.dataset.originalText = code.textContent.trim();
                code.textContent = '';
                observer.observe(code);
            });
        }
    } catch (error) {
        console.error('Error initializing typing effects:', error);
    }
}

function resetTypingEffects() {
    document.querySelectorAll('.editor-content code').forEach(code => {
        if (code.dataset.originalText) {
            code.textContent = '';
            typeCode(code, code.dataset.originalText);
        }
    });
}

// Main document ready event listener
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
        body.setAttribute('data-theme', 'light');
        updateThemeIcon('light');
    }

    function updateThemeIcon(theme) {
        const icons = themeToggle.querySelectorAll('.icon');
        icons.forEach(icon => {
            icon.classList.remove('showing', 'hiding', 'hidden');
        });

        if (theme === 'dark') {
            icons[0].classList.add('hiding');
            icons[1].classList.add('showing');
        } else {
            icons[1].classList.add('hiding');
            icons[0].classList.add('showing');
        }
    }

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
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

    menuBackdrop.addEventListener('click', () => {
        navLinks.classList.remove('show');
        menuBackdrop.classList.remove('show');
        mobileMenuBtn.classList.remove('active');
    });

    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('show');
            menuBackdrop.classList.remove('show');
            mobileMenuBtn.classList.remove('active');
        }
    });

    // Button functionality
    const contactBtn = document.querySelector(".btn-contact");
    const downloadBtn = document.querySelector(".btn-download-cv");
    const heroDownloadBtn = document.getElementById("hero-download-cv");

    contactBtn.addEventListener("click", function (event) {
        event.preventDefault();
        scrollToSection("#about");
    });

    downloadBtn.addEventListener("click", function (event) {
        event.preventDefault();
        downloadCV();
    });

    heroDownloadBtn.addEventListener("click", function (event) {
        event.preventDefault();
        downloadCV();
    });

    // Page initialization
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const pageWrap = document.querySelector('.page-wrap');
    pageWrap.classList.add('reveal');

    const header = document.querySelector('header');
    const startSection = document.querySelector('.start');
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const subtitle = document.querySelector('.subtitle');

    function checkScroll() {
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;
        
        if (scrollPosition >= viewportHeight) {
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
        }
    
        if (scrollPosition >= viewportHeight * 0.8) {
            startSection.classList.add('hidden');
        } else {
            startSection.classList.remove('hidden');
        }

        // Handle start section fade
        const heroOffset = heroSection.offsetTop - window.innerHeight;
        if (scrollPosition >= heroOffset) {
            const opacity = 1 - (scrollPosition - heroOffset) / window.innerHeight;
            startSection.style.opacity = Math.max(opacity, 0);
        } else {
            startSection.style.opacity = 1;
        }

        // Reset typing effects when scrolling back to top
        if (scrollPosition === 0) {
            resetTypingEffects();
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check

    const transitionDuration = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--page-wrap-transition')) * 1000;

    setTimeout(() => {
        startSection.classList.add('animate');
        heroContent.classList.add('animate-hero');
        subtitle.style.opacity = 1;
        pageWrap.style.display = 'none';
    }, transitionDuration);

    // Initialize animations
    textScrumbleAnimation();
    initializeTypingEffects();

    // Initialize Game of Life
    try {
        const gameCanvas = document.getElementById('gameOfLife');
        if (gameCanvas) {
            const game = new GameOfLifeSimulation('gameOfLife');
            console.log('Game of Life initialized successfully');
        }
    } catch (error) {
        console.error('Error initializing Game of Life:', error);
    }
});