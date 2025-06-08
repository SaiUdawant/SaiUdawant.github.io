// Initialize EmailJS
(function() {
    emailjs.init("XlLRzHIK9Uww0lIoF");
})();

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    const diffX = mouseX - cursorX;
    const diffY = mouseY - cursorY;
    
    cursorX += diffX * 0.2;
    cursorY += diffY * 0.2;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    
    requestAnimationFrame(updateCursor);
}

updateCursor();

// Cursor interactions
const links = document.querySelectorAll('a, button');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(1.5)`;
        cursorFollower.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(2)`;
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(1)`;
        cursorFollower.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(1)`;
    });
});

// Initialize Vanilla Tilt
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});

// Typing Animation
const typed = new Typed('.typed-text', {
    strings: [
        'IoT Developer',
        'Full Stack Engineer',
        'Problem Solver',
        'Tech Enthusiast'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true
});

// Theme Toggle
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    themeSwitch.checked = true;
}

// Theme toggle handler
themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Update active link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-tilt]');
    
    parallaxElements.forEach(element => {
        const speed = 0.15;
        const yPos = -(scrolled * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
});

// Update active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact Form
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.name.value;
    const email = this.email.value;
    const message = this.message.value;
    
    emailjs.send("service_zzz5r4r", "template_lib4c04", {
        name: name,
        email: email,
        message: message,
        time: new Date().toLocaleString()
    }).then(
        function(response) {
            alert("Message sent successfully!");
            contactForm.reset();
        },
        function(error) {
            alert("Failed to send message. Please try again.");
        }
    );
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