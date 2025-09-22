document.querySelectorAll('.view-more-btn').forEach(button => {
    button.addEventListener('click', function() {
        const details = this.nextElementSibling;
        details.classList.toggle('visible');
        this.textContent = details.classList.contains('visible') ? 'Voir moins' : 'Détails';
    });
});

// Gestion du bouton "Explorer le Portfolio"
document.addEventListener('DOMContentLoaded', function() {
    const exploreBtn = document.getElementById('explore-btn');
    const mainContent = document.getElementById('main-content');
    const navbar = document.querySelector('.navbar-vertical');
    const main = document.querySelector('main');

    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            // Afficher le contenu principal
            if (mainContent) {
                mainContent.classList.remove('hidden');
            }
            
            // Afficher la navbar verticale
            if (navbar) {
                navbar.classList.add('navbar-visible');
            }
            
            // Ajouter la marge au contenu principal
            if (main) {
                main.classList.add('navbar-visible');
            }
            
            // Faire défiler vers le contenu principal
            if (mainContent) {
                mainContent.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});