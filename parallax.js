document.addEventListener('DOMContentLoaded', function() {
    const parallaxBg = document.querySelector('.parallax-bg');
    let lastScrollTop = 0;
    let ticking = false;

    // Function to update the parallax effect
    function updateParallax() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
        const scrollSpeed = Math.abs(scrollTop - lastScrollTop) * 0.1;
        
        // Apply different effects based on scroll direction
        if (scrollDirection === 'down') {
            parallaxBg.style.transform = `translateY(${-scrollSpeed}px) scale(1.01)`;
        } else {
            parallaxBg.style.transform = `translateY(${scrollSpeed}px) scale(0.99)`;
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }

    // Throttle the scroll event for better performance
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateParallax();
            });
            ticking = true;
        }
    });

    // Initial setup
    updateParallax();
}); 