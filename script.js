// Initialize EmailJS
(function() {
    emailjs.init("XlLRzHIK9Uww0lIoF");
})();

// Theme switching functionality
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference, otherwise use system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';
} else {
    htmlElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
    themeToggle.checked = systemPrefersDark;
}

// Theme toggle event listener
themeToggle.addEventListener('change', function() {
    const newTheme = this.checked ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Typing animation
const words = ['AI solutions.', 'ML models.', 'IoT projects.', 'innovative tech.'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseEnd = 1500;

function typeEffect() {
    const current = words[wordIndex];
    const dynamicText = document.querySelector('.dynamic-text');
    
    if (!dynamicText) return;

    if (isDeleting) {
        dynamicText.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        dynamicText.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeEffect, pauseEnd);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500);
        return;
    }

    setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
}

typeEffect();

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            if (entry.target.classList.contains('work-card')) {
                entry.target.style.transitionDelay = '0.2s';
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.work-card, .skill-category, .timeline-item').forEach(el => {
    observer.observe(el);
});

// Contact Form Handling
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Hide any existing messages
    document.getElementById('success-message').style.display = 'none';
    document.getElementById('error-message').style.display = 'none';

    // Get the form data
    const templateParams = {
        name: document.getElementById('from_name').value,
        email: document.getElementById('from_email').value,
        message: document.getElementById('message').value
    };

    console.log('Attempting to send email with params:', templateParams);

    // Send the email using EmailJS
    emailjs.send(
        'service_zzz5r4r',
        'template_vlwj6ue',
        templateParams
    )
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        // Show success message
        document.getElementById('success-message').style.display = 'block';
        // Reset the form
        document.getElementById('contact-form').reset();
    })
    .catch(function(error) {
        console.error('FAILED...', error);
        // Show error message with details
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Failed to send message: ' + (error.text || 'Please try again.');
        errorMessage.style.display = 'block';
    })
    .finally(function() {
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    });
});

// Parallax effect for shapes
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX;
    const y = e.clientY;
    
    shapes.forEach(shape => {
        const speed = shape.getAttribute('data-speed') || 0.1;
        const xOffset = (window.innerWidth - x * speed) / 100;
        const yOffset = (window.innerHeight - y * speed) / 100;
        
        shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Theme switcher
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.checked = currentTheme === 'dark';

    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}); 