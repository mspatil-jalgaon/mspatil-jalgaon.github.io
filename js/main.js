/**
 * Main JavaScript file for the portfolio website
 * Handles animations, mobile menu, and smooth scrolling
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('.nav-link');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Immediately animate the hero section on load
    const heroSection = document.getElementById('about');
    if (heroSection) {
        heroSection.classList.add('animate');
    }

    // Scroll Reveal Animation using Intersection Observer
    const animatedElements = document.querySelectorAll(
        '.project-card, ' + // Project cards
        '.bg-white.rounded-xl.shadow-lg.p-6, ' + // Skill cards
        '.bg-gray-100.rounded-xl.shadow-md.p-6, ' + // Awards cards
        '.max-w-3xl.mx-auto.bg-white.rounded-xl.shadow-lg.p-8, ' + // Contact form container
        'h2.fade-in-up' // Section titles
    );
    
    const observerOptions = {
        root: null, // viewport as root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe all elements that need animation
    animatedElements.forEach(element => {
        element.classList.add('fade-in-up'); // Ensure the fade-in-up class is present
        observer.observe(element);
    });

    // Form submission handling (example - would need backend integration)
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
});