document.addEventListener('DOMContentLoaded', () => {
    const portfolioBtn = document.querySelector('.portfolio-btn');
    const sections = document.querySelectorAll('.section');
    const landingSection = document.querySelector('.landing-section');
    const navbar = document.querySelector('.navbar');

    // Initial animation delay for section buttons
    document.querySelectorAll('.section-btn').forEach((btn, index) => {
        btn.style.animationDelay = `${(index + 1) * 0.2}s`;
    });

    // Handle portfolio button click
    portfolioBtn.addEventListener('click', () => {
        // Hide landing section
        landingSection.style.transform = 'translateY(-100vh)';
        landingSection.style.opacity = '0';
        landingSection.style.transition = 'all 0.5s ease';
        
        // Show navbar
        setTimeout(() => {
            navbar.classList.remove('hidden');
            navbar.classList.add('visible');
        }, 300);

        // Show network student section
        setTimeout(() => {
            landingSection.style.display = 'none';
            showSection('network-student');
        }, 500);
    });

    // Handle section button clicks
    document.querySelectorAll('.section-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.target.dataset.target;
            hideCurrentSection();
            showSection(target);

            // Update active nav link
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${target}`) {
                    link.classList.add('active');
                }
            });
        });
    });

    // Handle navigation clicks
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href').substring(1);
            hideCurrentSection();
            showSection(target);

            // Update active state
            document.querySelectorAll('.nav-menu a').forEach(l => {
                l.classList.remove('active');
            });
            link.classList.add('active');
        });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Show navbar when scrolling to sections
                if (entry.target.id !== 'landing-section') {
                    navbar.classList.add('visible');
                }
                // Show about section when network student section is visible
                if (entry.target.id === 'network-student') {
                    const aboutSection = entry.target.querySelector('.about-section');
                    if (aboutSection) {
                        setTimeout(() => {
                            aboutSection.classList.add('visible');
                        }, 500);
                    }
                }
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Helper functions
    function showSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            // Hide all sections first
            sections.forEach(s => {
                s.classList.add('hidden');
                s.classList.remove('visible');
            });

            // Show target section
            section.classList.remove('hidden');
            setTimeout(() => {
                section.classList.add('visible');
            }, 50);

            // Animate cards if present
            const cards = section.querySelectorAll('.project-card, .bts-card');
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.2}s`;
            });
        }
    }

    function hideCurrentSection() {
        const visibleSection = document.querySelector('.section.visible');
        if (visibleSection) {
            visibleSection.classList.remove('visible');
            setTimeout(() => {
                visibleSection.classList.add('hidden');
            }, 500);
        }
    }

    // Handle scroll animations
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        const navbar = document.querySelector('.navbar');

        if (st > lastScrollTop) {
            // Scrolling down
            navbar.classList.remove('visible');
        } else {
            // Scrolling up
            navbar.classList.add('visible');
        }

        lastScrollTop = st <= 0 ? 0 : st;
    });
});
