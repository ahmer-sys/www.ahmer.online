// DOM Elements
const navbar = document.querySelector('.navbar');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const sections = document.querySelectorAll('section');
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioGrid = document.querySelector('.portfolio-grid');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Set dark theme as default
document.body.dataset.theme = localStorage.getItem('theme') || 'dark';
themeToggle.querySelector('i').className = document.body.dataset.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

// Mobile Menu Functionality
mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Toggle aria-expanded for accessibility
    mobileMenu.setAttribute('aria-expanded', mobileMenu.classList.contains('active'));
    
    // Toggle body scroll
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    const icon = themeToggle.querySelector('i');
    icon.className = document.body.dataset.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', document.body.dataset.theme);
});

// Portfolio Filtering
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    mirror: false
});

// Typed.js initialization
const typed = new Typed('.typed-text', {
    strings: [
        'Flutter Developer',
        'Full Stack Developer',
        'Mobile App Developer',
        'Web Developer'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true
});

// Handle drawer menu
const drawerToggle = document.querySelector('.drawer-toggle');
const drawerContent = document.querySelector('.drawer-content');
const drawerMenu = document.querySelector('.drawer-menu');

drawerToggle.addEventListener('click', () => {
    drawerMenu.classList.toggle('active');
});

// Close drawer when clicking outside
document.addEventListener('click', (e) => {
    if (!drawerMenu.contains(e.target)) {
        drawerMenu.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close drawer after clicking a link
            drawerMenu.classList.remove('active');
        }
    });
});

// Skills animation
const skillItems = document.querySelectorAll('.skill-item');
const progressBars = document.querySelectorAll('.progress-bar');

const animateSkills = () => {
    skillItems.forEach((item, index) => {
        const progressBar = progressBars[index];
        const percentage = item.dataset.progress;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    item.classList.add('animate');
                    progressBar.style.width = `${percentage}%`;
                    observer.unobserve(item);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(item);
    });
};

// Experience Timeline Animation
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.2,
    rootMargin: '0px'
});

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Client Cards Animation
const clientCards = document.querySelectorAll('.client-card');

const clientObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

clientCards.forEach(card => {
    clientObserver.observe(card);
});

// Navbar Scroll Effect
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

// Theme Colors
const updateThemeColors = () => {
    const isDarkMode = document.body.classList.contains('dark-mode');
    document.documentElement.style.setProperty('--bg-primary', isDarkMode ? '#1a1a1a' : '#ffffff');
    document.documentElement.style.setProperty('--bg-secondary', isDarkMode ? '#2d2d2d' : '#f5f5f5');
    document.documentElement.style.setProperty('--text-color', isDarkMode ? '#ffffff' : '#333333');
    document.documentElement.style.setProperty('--text-secondary', isDarkMode ? '#cccccc' : '#666666');
    document.documentElement.style.setProperty('--accent-color', '#007bff');
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateThemeColors();
    document.querySelector('.filter-btn[data-filter="all"]').click();
    animateSkills();
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const formObject = Object.fromEntries(formData);
            
            try {
                // Here you would typically send the form data to your backend
                console.log('Form submitted:', formObject);
                
                // Show success message
                alert('Message sent successfully!');
                contactForm.reset();
            } catch (error) {
                console.error('Error sending message:', error);
                alert('There was an error sending your message. Please try again.');
            }
        });
    }
}); 