// Parallax effect for hero section
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    
    // Create parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Move the background slightly slower than the scroll speed
        if (hero) {
            const yPos = -scrollPosition * 0.3;
            hero.style.backgroundPosition = `center ${yPos}px`;
        }
    });
    
    // Create moving particles effect
    if (hero) {
        createParticles(hero);
    }
    
    function createParticles(container) {
        // Create 20 particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'parallax-particle';
            
            // Random size between 2px and 6px
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random opacity
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            
            // Random animation duration between 15s and 30s
            const duration = Math.random() * 15 + 15;
            particle.style.animationDuration = `${duration}s`;
            
            // Random animation delay
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            container.appendChild(particle);
        }
    }
});
