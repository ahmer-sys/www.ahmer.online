// DOM Elements
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const sections = document.querySelectorAll('section');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioGrid = document.querySelector('.portfolio-grid');
const contactForm = document.getElementById('contact-form');

// Sample portfolio items (replace with your actual projects)
const portfolioItems = [
    {
        title: 'Mobile App',
        category: 'mobile',
        image: 'assets/project1.jpg',
        description: 'Flutter-based mobile application',
        link: '#'
    },
    {
        title: 'Web Platform',
        category: 'web',
        image: 'assets/project2.jpg',
        description: 'Responsive web application',
        link: '#'
    },
    {
        title: 'UI Design',
        category: 'design',
        image: 'assets/project3.jpg',
        description: 'Modern user interface design',
        link: '#'
    }
    // Add more portfolio items as needed
];

// Set dark theme as default
document.body.dataset.theme = localStorage.getItem('theme') || 'dark';
themeToggle.querySelector('i').className = document.body.dataset.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');

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

// Improved scroll handling for mobile
let touchStart = 0;
let touchEnd = 0;

document.addEventListener('touchstart', (e) => {
    touchStart = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
    touchEnd = e.touches[0].clientY;
});

document.addEventListener('touchend', () => {
    if (touchStart - touchEnd > 50) {
        // Scrolling down
        navbar.classList.add('scroll-down');
        navbar.classList.remove('scroll-up');
    } else if (touchEnd - touchStart > 50) {
        // Scrolling up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
});

// Enhanced smooth scroll for better mobile performance
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';

            // Smooth scroll with dynamic offset based on screen size
            const headerOffset = window.innerWidth <= 768 ? 60 : 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Ensure animations work on mobile
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { 
    threshold: 0.1,
    rootMargin: '50px'  // Start animation slightly before element comes into view
});

fadeElements.forEach(element => fadeObserver.observe(element));

// Active section highlight in navbar
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelector(`.nav-links a[href="#${entry.target.id}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-links a[href="#${entry.target.id}"]`)?.classList.remove('active');
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => navObserver.observe(section));

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioGridItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioGridItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
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
                }, 400);
            }
        });
    });
});

// Initialize portfolio items visibility
document.querySelector('.filter-btn[data-filter="all"]').click();

// Testimonials Slider
let currentSlide = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

function showSlide(index) {
    testimonials.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

prevBtn?.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
    showSlide(currentSlide);
});

nextBtn?.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showSlide(currentSlide);
});

// Initialize first slide
showSlide(0);


// Contact Form Validation and Submission
contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(data.email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Processing...';
    
    try {
        // Simulate brief processing
        await new Promise(resolve => setTimeout(resolve, 500));

        // Show success message with WhatsApp direction
        const thankYouMessage = `Thank you for your message, ${data.name}! 🎉\n\nPlease contact me directly on WhatsApp (+92 318 5367721) for faster response. I'm looking forward to discussing your project!`;
        alert(thankYouMessage);

        // Optional: Open WhatsApp
        if (confirm("Would you like to open WhatsApp now?")) {
            window.open("https://wa.me/923185367721", "_blank");
        }

        // Reset form
        contactForm.reset();
    } catch (error) {
        alert('Something went wrong. Please try again or contact directly via WhatsApp.');
    } finally {
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
});

// Email validation helper
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Typing Animation
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

const textArray = [
    'Flutter Developer',
    'Full-Stack Developer',
    'Mobile App Expert',
    'UI/UX Designer'
];
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains('typing')) {
            cursorSpan.classList.add('typing');
        }
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        cursorSpan.classList.remove('typing');
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains('typing')) {
            cursorSpan.classList.add('typing');
        }
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        cursorSpan.classList.remove('typing');
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, 1000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});

// Enhanced Intersection Observer for animations
const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .scale-in');
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add specific animation class based on data attribute
            const animation = entry.target.dataset.animation;
            if (animation) {
                entry.target.classList.add(animation);
            }
        }
    });
}, { 
    threshold: 0.2,
    rootMargin: '50px'
});

animatedElements.forEach(element => animationObserver.observe(element));

// Parallax effect for floating shapes
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        const x = mouseX * speed;
        const y = mouseY * speed;
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
}); 