// Global interactions for Fraud Detector
document.addEventListener('DOMContentLoaded', () => {
    // Reveal animation logic
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < (window.innerHeight * 0.9);
            if (isVisible) {
                el.classList.add('visible');
            }
        });
    };

    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);

    // Subtle parallax effect for hero sections
    const heroes = document.querySelectorAll('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroes.forEach(hero => {
            hero.style.backgroundPositionY = (scrolled * 0.5) + 'px';
        });
    });
});
