// DOM Elements
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('section');
const menuItems = document.querySelectorAll('.menu-item');
const testimonials = document.querySelectorAll('.testimonial');

// Sticky Header
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '15px 0';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    }
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animation for Sections
const observerOptions = {
    threshold: 0.25
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Menu Items Animation
menuItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
});

// Testimonial Slider (Simple Auto-scroll)
let currentTestimonial = 0;
const testimonialSlider = document.querySelector('.testimonial-slider');

function scrollTestimonials() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    if (testimonialSlider) {
        testimonialSlider.scrollTo({
            left: testimonials[currentTestimonial].offsetLeft - testimonialSlider.offsetLeft,
            behavior: 'smooth'
        });
    }
}

// Auto-scroll testimonials every 5 seconds
setInterval(scrollTestimonials, 5000);

// Form Submission
const reservationForm = document.querySelector('.reservation-form');
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple form validation
        const formInputs = reservationForm.querySelectorAll('input, select');
        let isValid = true;
        
        formInputs.forEach(input => {
            if (!input.value) {
                isValid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            // In a real application, you would send the form data to a server
            alert('Đặt bàn thành công! Chúng tôi sẽ liên hệ với bạn sớm.');
            reservationForm.reset();
        } else {
            alert('Vui lòng điền đầy đủ thông tin.');
        }
    });
}

// Add CSS class for animation when elements come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.menu-item, .about-image, .about-text, .testimonial');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('fade-in');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Add CSS class for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to elements that should animate on page load
    document.querySelectorAll('.hero-content, .section-header').forEach(el => {
        el.classList.add('fade-in');
    });
});
