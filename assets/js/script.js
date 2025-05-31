// ===== MODERN PORTFOLIO JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initThemeToggle();

    // Add a small delay to ensure DOM is fully loaded
    setTimeout(() => {
        loadSkills();
        loadProjects();
    }, 100);

    initScrollReveal();
});

// ===== NAVIGATION =====
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Update icon based on current theme
    updateThemeIcon(currentTheme, themeIcon);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, themeIcon);
    });
}

function updateThemeIcon(theme, iconElement) {
    if (theme === 'dark') {
        iconElement.className = 'fas fa-sun';
    } else {
        iconElement.className = 'fas fa-moon';
    }
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    const scrollTopBtn = document.getElementById('scrollTop');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Show/hide scroll to top button
        if (scrollTopBtn) {
            if (scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }

        // Add shadow to navigation on scroll
        if (scrollY > 50) {
            nav.style.boxShadow = 'var(--shadow-lg)';
        } else {
            nav.style.boxShadow = 'none';
        }

        // Active navigation link based on scroll position
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Scroll to top functionality
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== LOAD SKILLS =====
async function loadSkills() {
    try {
        const response = await fetch('skills.json');
        const skills = await response.json();
        displaySkills(skills);
    } catch (error) {
        console.error('Error loading skills:', error);
    }
}

function displaySkills(skills) {
    const skillsContainer = document.getElementById('skillsContainer');
    console.log('Skills container:', skillsContainer);
    console.log('Skills data:', skills);

    if (!skillsContainer) {
        console.error('Skills container not found!');
        return;
    }

    const skillsHTML = skills.map(skill => `
        <div class="skill-item">
            <img src="${skill.icon}" alt="${skill.name}" />
            <span>${skill.name}</span>
        </div>
    `).join('');

    skillsContainer.innerHTML = skillsHTML;
    console.log('Skills loaded successfully');
}

// ===== LOAD PROJECTS =====
async function loadProjects() {
    try {
        const response = await fetch('./projects/projects.json');
        const projects = await response.json();
        displayProjects(projects);
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function displayProjects(projects) {
    const projectsContainer = document.getElementById('projectsContainer');
    console.log('Projects container:', projectsContainer);
    console.log('Projects data:', projects);

    if (!projectsContainer) {
        console.error('Projects container not found!');
        return;
    }

    const projectsHTML = projects.map(project => `
        <div class="project-card">
            <img src="./assets/images/projects/${project.image}.png" alt="${project.name}" class="project-image" />
            <div class="project-content">
                <h3 class="project-title">${project.name}</h3>
                <p class="project-description">${project.desc}</p>
                <div class="project-links">
                    <a href="${project.links.view}" target="_blank" class="project-link">
                        <i class="fas fa-eye"></i> Ver proyecto
                    </a>
                    <a href="${project.links.code}" target="_blank" class="project-link secondary">
                        <i class="fas fa-code"></i> Código
                    </a>
                </div>
            </div>
        </div>
    `).join('');

    projectsContainer.innerHTML = projectsHTML;
    console.log('Projects loaded successfully');
}

// ===== SCROLL REVEAL ANIMATIONS =====
function initScrollReveal() {
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '60px',
            duration: 1000,
            delay: 200,
            reset: false
        });

        // Hero section
        sr.reveal('.hero-content', {
            origin: 'left',
            distance: '50px',
            duration: 800,
            delay: 100
        });
        sr.reveal('.hero-image', {
            origin: 'right',
            distance: '50px',
            duration: 800,
            delay: 300
        });

        // About section
        sr.reveal('.about-text', { origin: 'left' });
        sr.reveal('.about-skills', { origin: 'right', delay: 400 });

        // Projects
        sr.reveal('.project-card', { interval: 200 });

        // Experience
        sr.reveal('.experience-card', { interval: 300 });

        // Education
        sr.reveal('.education-card', { interval: 400 });

        // Contact
        sr.reveal('.contact-content', { delay: 200 });
    }
}

// ===== PAGE TITLE CHANGE ON VISIBILITY =====
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        document.title = 'Alberto Sánchez | Desarrollador Android';
    } else {
        document.title = '¡Vuelve pronto! - Alberto Sánchez';
    }
});

// ===== UTILITY FUNCTIONS =====
// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
