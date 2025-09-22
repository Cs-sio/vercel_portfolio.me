// Navigation dynamique moderne
class PortfolioNavigation {
    constructor() {
        this.currentSection = 'home';
        this.sections = document.querySelectorAll('.section');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.exploreBtn = document.getElementById('explore-btn');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.showSection('home');
        this.animateOnLoad();
    }
    
    setupEventListeners() {
        // Navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute('data-section');
                this.showSection(sectionId);
                this.updateActiveLink(link);
            });
        });
        
        // Explore button
        if (this.exploreBtn) {
            this.exploreBtn.addEventListener('click', () => {
                this.showSection('about');
                const aboutLink = document.querySelector('[data-section="about"]');
                if (aboutLink) {
                    this.updateActiveLink(aboutLink);
                }
            });
        }
        
        // Hamburger menu
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar-horizontal')) {
                this.closeMobileMenu();
            }
        });
    }
    
    showSection(sectionId) {
        // Hide all sections
        this.sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
            
            // Animate content
            this.animateSectionContent(targetSection);
        }
    }
    
    updateActiveLink(activeLink) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }
    
    animateSectionContent(section) {
        const animatedElements = section.querySelectorAll('.skill-card, .formation-card, .stage-card, .project-card, .veille-card, .epreuve-category, .achievement-item');
        
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    animateOnLoad() {
        // Animate welcome container
        const welcomeContainer = document.querySelector('.welcome-container');
        if (welcomeContainer) {
            welcomeContainer.style.opacity = '0';
            welcomeContainer.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                welcomeContainer.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                welcomeContainer.style.opacity = '1';
                welcomeContainer.style.transform = 'translateY(0)';
            }, 300);
        }
        
        // Animate profile section
        const profileSection = document.querySelector('.profile-section');
        if (profileSection) {
            profileSection.style.opacity = '0';
            profileSection.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                profileSection.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                profileSection.style.opacity = '1';
                profileSection.style.transform = 'translateY(0)';
            }, 800);
        }
    }
    
    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
    }
    
    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
    }
}

// Effets de parallaxe pour l'arrière-plan
class ParallaxEffect {
    constructor() {
        this.parallaxBg = document.querySelector('.parallax-bg');
        this.codeGrid = document.querySelector('.code-grid');

        this.scrollY = 0;
        this.mouseX = 0;
        this.mouseY = 0;

        this.state = {
            bg: { x: 0, y: 0, scale: 1, opacity: 0.1 },
            grid: { x: 0, y: 0 }
        };
        this.target = {
            bg: { x: 0, y: 0, scale: 1, opacity: 0.1 },
            grid: { x: 0, y: 0 }
        };

        this.speeds = {
            scroll: { bg: 0.25, grid: 0.15 },
            mouse: { bg: 20, grid: 35 }
        };

        this.ticking = false;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
            this.requestTick();
        });

        window.addEventListener('mousemove', (e) => {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            // Normaliser la position de la souris autour du centre (-1 .. 1)
            const nx = (e.clientX - vw / 2) / (vw / 2);
            const ny = (e.clientY - vh / 2) / (vh / 2);
            this.mouseX = Math.max(-1, Math.min(1, nx));
            this.mouseY = Math.max(-1, Math.min(1, ny));
            this.requestTick();
        });

        this.requestTick();
    }

    requestTick() {
        if (!this.ticking) {
            this.ticking = true;
            window.requestAnimationFrame(() => {
                this.updateTargets();
                this.interpolateState();
                this.applyTransforms();
                this.ticking = false;
            });
        }
    }

    updateTargets() {
        // Cibles basées sur le scroll
        this.target.bg.y = this.scrollY * this.speeds.scroll.bg;
        this.target.grid.y = this.scrollY * this.speeds.scroll.grid;

        // Parallax souris (même direction que le mouvement pour donner de la profondeur)
        this.target.bg.x = this.mouseX * this.speeds.mouse.bg;
        this.target.grid.x = this.mouseX * this.speeds.mouse.grid;

        // Subtile influence verticale de la souris
        this.target.bg.y += this.mouseY * 6;
        this.target.grid.y += this.mouseY * 10;

        // Légère variation de scale et d'opacité avec le scroll (profondeur)
        const maxScaleBoost = 0.03; // +3% max
        const clamped = Math.min(1, this.scrollY / 2000);
        this.target.bg.scale = 1 + clamped * maxScaleBoost;
        this.target.bg.opacity = 0.1 + clamped * 0.05; // 0.10 -> 0.15
    }

    interpolateState() {
        // Interpolation linéaire pour fluidité
        const lerp = (a, b, t) => a + (b - a) * t;
        const tPos = 0.12;
        const tScale = 0.08;
        const tOpacity = 0.08;

        this.state.bg.x = lerp(this.state.bg.x, this.target.bg.x, tPos);
        this.state.bg.y = lerp(this.state.bg.y, this.target.bg.y, tPos);
        this.state.bg.scale = lerp(this.state.bg.scale, this.target.bg.scale, tScale);
        this.state.bg.opacity = lerp(this.state.bg.opacity, this.target.bg.opacity, tOpacity);

        this.state.grid.x = lerp(this.state.grid.x, this.target.grid.x, tPos);
        this.state.grid.y = lerp(this.state.grid.y, this.target.grid.y, tPos);
    }

    applyTransforms() {
        if (this.parallaxBg) {
            this.parallaxBg.style.willChange = 'transform, opacity';
            this.parallaxBg.style.transform = `translate3d(${this.state.bg.x}px, ${this.state.bg.y}px, 0) scale(${this.state.bg.scale})`;
            this.parallaxBg.style.opacity = `${this.state.bg.opacity}`;
        }
        if (this.codeGrid) {
            this.codeGrid.style.willChange = 'transform';
            this.codeGrid.style.transform = `translate3d(${this.state.grid.x}px, ${this.state.grid.y}px, 0)`;
        }
    }
}

// Animations d'interaction
class InteractionAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupHoverEffects();
        this.setupClickEffects();
    }
    
    setupHoverEffects() {
        // Cards hover effects
        const cards = document.querySelectorAll('.skill-card, .formation-card, .stage-card, .project-card, .veille-card, .epreuve-category');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Social links hover
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-5px) scale(1.1)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    setupClickEffects() {
        // Button click effects
        const buttons = document.querySelectorAll('.explore-btn, .contact-btn, .download-cv');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
}

// Effet de typing pour le titre
class TypingEffect {
    constructor() {
        this.init();
    }
    
    init() {
        const title = document.querySelector('.welcome-title');
        if (title) {
            const text = title.textContent;
            title.textContent = '';
            title.style.borderRight = '2px solid var(--accent-color)';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    title.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    setTimeout(() => {
                        title.style.borderRight = 'none';
                    }, 1000);
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    }
}

class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');

        this.columns = [];
        this.fontSize = 16;
        this.characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz{}[]<>/\\+=-*#$%@&';
        this.charsArray = this.characters.split('');
        this.bgAlpha = 0.07;
        this.speedMin = 2;
        this.speedMax = 6;

        this.resizeObserver = null;

        this.handleResize = this.handleResize.bind(this);
        this.tick = this.tick.bind(this);

        this.init();
    }

    init() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
        this.tick();
    }

    handleResize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.canvas.width = Math.floor(window.innerWidth * dpr);
        this.canvas.height = Math.floor(window.innerHeight * dpr);
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const columnsCount = Math.ceil(window.innerWidth / this.fontSize);
        this.columns = new Array(columnsCount).fill(0).map(() => ({
            y: Math.random() * window.innerHeight,
            speed: this.speedMin + Math.random() * (this.speedMax - this.speedMin)
        }));
        this.ctx.font = `${this.fontSize}px 'Courier New', monospace`;
    }

    draw() {
        // Fade the canvas with a translucent rect to create trails
        this.ctx.fillStyle = `rgba(0, 0, 0, ${this.bgAlpha})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.columns.length; i++) {
            const colX = i * this.fontSize;
            const column = this.columns[i];

            const char = this.charsArray[Math.floor(Math.random() * this.charsArray.length)];

            // Leading glow
            this.ctx.fillStyle = 'rgba(0, 255, 157, 0.85)';
            this.ctx.fillText(char, colX, column.y);

            // Tail
            this.ctx.fillStyle = 'rgba(0, 220, 255, 0.35)';
            this.ctx.fillText(char, colX, column.y - this.fontSize);

            column.y += column.speed * 1.2;

            if (column.y > window.innerHeight + 50) {
                column.y = -Math.random() * 200;
                column.speed = this.speedMin + Math.random() * (this.speedMax - this.speedMin);
            }
        }
    }

    tick() {
        this.draw();
        requestAnimationFrame(this.tick);
    }
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioNavigation();
    new ParallaxEffect();
    new InteractionAnimations();
    new TypingEffect();
    new MatrixRain();
});

// CSS pour l'effet ripple
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.nav-menu.active {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(10, 10, 10, 0.98);
    backdrop-filter: blur(20px);
    border-top: 1px solid var(--border-color);
    padding: 1rem;
    box-shadow: var(--shadow);
}

.hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}
`;

// Injecter le CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Fonction pour gérer les détails des créateurs
function toggleCreatorDetails(creatorId) {
    const detailsElement = document.getElementById(`${creatorId}-details`);
    const button = document.querySelector(`[onclick="toggleCreatorDetails('${creatorId}')"]`);
    
    if (detailsElement && button) {
        const isActive = detailsElement.classList.contains('active');
        
        if (isActive) {
            detailsElement.classList.remove('active');
            button.classList.remove('active');
        } else {
            detailsElement.classList.add('active');
            button.classList.add('active');
        }
    }
}

// Animation d'apparition des cartes de créateurs
function animateCreatorCards() {
    const creatorCards = document.querySelectorAll('.creator-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    creatorCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Fonction pour gérer l'extension des cartes de projets
function toggleProjectDetails(projectId) {
    const detailsElement = document.getElementById(`${projectId}-details`);
    const button = document.querySelector(`[onclick="toggleProjectDetails('${projectId}')"]`);
    
    if (detailsElement && button) {
        const isActive = detailsElement.classList.contains('active');
        
        if (isActive) {
            detailsElement.classList.remove('active');
            button.classList.remove('active');
            button.querySelector('span').textContent = 'Voir plus';
        } else {
            detailsElement.classList.add('active');
            button.classList.add('active');
            button.querySelector('span').textContent = 'Voir moins';
        }
    }
}

// Initialiser les animations des cartes de créateurs
document.addEventListener('DOMContentLoaded', () => {
    animateCreatorCards();
});
