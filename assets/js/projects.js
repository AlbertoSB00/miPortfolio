// ===== ALL PROJECTS DATA =====
const allProjectsData = [
    // Proyectos principales (los que aparecen en la página principal)
    {
        "name": "Web para Andújar Salud",
        "desc": "Sitio web corporativo desarrollado para la empresa Andújar Salud con diseño moderno y responsive.",
        "image": "webandujar",
        "category": "web",
        "featured": true,
        "links": {
            "view": "https://andujarsalud.appberto.es/",
            "code": "https://github.com/AlbertoSB00/webAndujarSalud"
        }
    },
    {
        "name": "PopFlix",
        "desc": "Aplicación móvil en Java para gestionar cines con interfaz moderna.",
        "image": "popflix",
        "category": "android",
        "featured": true,
        "links": {
            "view": "https://drive.google.com/file/d/1gPdJ1lukq9icOYbOyfwLLW6GcmPJaLLJ/view?usp=sharing",
            "code": "https://github.com/AlbertoSB00/gestionCine"
        }
    },
    {
        "name": "Fumadero Tycoon (android)",
        "desc": "Port del juego clicker web a Android usando Kotlin.",
        "image": "estancoclickerandroid",
        "category": "game",
        "featured": true,
        "links": {
            "view": "https://appberto.itch.io/fumadero-tycoon",
            "code": "https://github.com/AlbertoSB00/estancoClickerAndroid"
        }
    },
    // Proyectos adicionales
    {
        "name": "PopFlix (escritorio)",
        "desc": "Aplicación de escritorio en Java para gestionar cines con interfaz moderna.",
        "image": "popflix",
        "category": "java",
        "featured": true,
        "links": {
            "view": "https://drive.google.com/file/d/1gPdJ1lukq9icOYbOyfwLLW6GcmPJaLLJ/view?usp=sharing",
            "code": "https://github.com/AlbertoSB00/gestionCine"
        }
    },
    {
        "name": "Fumadero Tycoon (web)",
        "desc": "Juego clicker interactivo desarrollado con JavaScript, HTML y CSS con mecánicas de progresión.",
        "image": "estancoclicker",
        "category": "game",
        "featured": false,
        "links": {
            "view": "https://clicker.appberto.es/",
            "code": "https://github.com/AlbertoSB00/estancoClicker"
        }
    },
    {
        "name": "Mi Portfolio",
        "desc": "Portfolio personal desarrollado con HTML, CSS y JavaScript para mostrar mis proyectos y habilidades.",
        "image": "miportfolio",
        "category": "web",
        "featured": false,
        "links": {
            "view": "https://appberto.es/",
            "code": "https://github.com/AlbertoSB00/miPortfolio"
        }
    },
    {
        "name": "Gestión Andújar Salud (android)",
        "desc": "Aplicación móvil para gestionar la empresa Andújar Salud con funcionalidades avanzadas.",
        "image": "andujarsaludandroid",
        "category": "android",
        "featured": false,
        "links": {
            "view": "https://github.com/AlbertoSB00/gestionCartelAsistencial",
            "code": "https://github.com/AlbertoSB00/gestionCartelAsistencial"
        }
    },
    {
        "name": "Gestión Andújar Salud (escritorio)",
        "desc": "Aplicación de escritorio en Java para gestionar la base de datos de Andújar Salud.",
        "image": "andujarsaludescritorio",
        "category": "java",
        "featured": false,
        "links": {
            "view": "https://github.com/AlbertoSB00/gestionDatos",
            "code": "https://github.com/AlbertoSB00/gestionDatos"
        }
    }
];

// ===== PROJECTS PAGE FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    // Only run on projects page
    if (document.getElementById('allProjectsContainer')) {
        loadAllProjects();
        initProjectFilters();
    }
});

function loadAllProjects() {
    displayAllProjects(allProjectsData);
}

function displayAllProjects(projects) {
    const projectsContainer = document.getElementById('allProjectsContainer');
    
    if (!projectsContainer) {
        return;
    }

    const projectsHTML = projects.map(project => `
        <div class="project-card show" data-category="${project.category}">
            <div class="project-image">
                <img src="./assets/images/projects/${project.image}.png" 
                     alt="${project.name}"
                     loading="lazy"
                     onerror="this.style.display='none';" />
            </div>
            <div class="project-content">
                <div class="project-info">
                    <h3 class="project-title">${project.name}</h3>
                    <p class="project-description">${project.desc}</p>
                </div>
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
}

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const noResults = document.getElementById('noResults');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            filterProjects(filter, projectCards, noResults);
        });
    });
}

function filterProjects(filter, projectCards, noResults) {
    let visibleCount = 0;
    const container = document.getElementById('allProjectsContainer');

    // Primero ocultar todas las tarjetas
    projectCards.forEach(card => {
        card.classList.remove('show');
        card.classList.add('hidden');
    });

    // Esperar para la animación de ocultar
    setTimeout(() => {
        // Separar tarjetas visibles y ocultas
        const visibleCards = [];
        const hiddenCards = [];

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                visibleCards.push(card);
                visibleCount++;
            } else {
                hiddenCards.push(card);
            }
        });

        // Limpiar el contenedor
        container.innerHTML = '';

        // Añadir todas las tarjetas visibles primero con clase 'entering'
        visibleCards.forEach(card => {
            container.appendChild(card);
            card.classList.remove('hidden');
            card.classList.add('entering');
        });

        // Añadir las tarjetas ocultas al final
        hiddenCards.forEach(card => {
            container.appendChild(card);
        });

        // Animar la entrada de las tarjetas visibles con delay escalonado
        visibleCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.remove('entering');
                card.classList.add('show');
            }, index * 100);
        });

        // Mostrar/ocultar mensaje de sin resultados
        if (visibleCount === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }, 200);
}

// Navigation function for projects page
function navigateToSection(section) {
    window.location.href = `index.html#${section}`;
}
