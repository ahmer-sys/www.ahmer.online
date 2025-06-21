// DOM Elements
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const sections = document.querySelectorAll('section');
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioGrid = document.querySelector('.portfolio-grid');
const portfolioItems = document.querySelectorAll('.portfolio-item');
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

// Portfolio Filtering and Animations
const filterButtons = document.querySelectorAll('.filter-btn');

// Initialize Isotope grid
let iso = new Isotope(portfolioGrid, {
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows',
    transitionDuration: '0.6s',
    stagger: 100
});

// Filter items on button click
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');
        
        // Update active state of filter buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        if (filterValue === 'all') {
            // Show all items with animation
            portfolioItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
            });
            
            setTimeout(() => {
                iso.arrange({ filter: '*' });
                portfolioItems.forEach(item => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                });
            }, 100);
        } else {
            // Filter items with animation
            portfolioItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
            });
            
            setTimeout(() => {
                iso.arrange({ filter: `.${filterValue}` });
                document.querySelectorAll(`.${filterValue}`).forEach(item => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                });
            }, 100);
        }
    });
});

// Portfolio item hover effects
portfolioItems.forEach(item => {
    const overlay = item.querySelector('.portfolio-overlay');
    const img = item.querySelector('img');
    
    item.addEventListener('mouseenter', () => {
        overlay.style.transform = 'translateY(0)';
        img.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    item.addEventListener('mouseleave', () => {
        overlay.style.transform = 'translateY(100%)';
        img.style.transform = 'scale(1) rotate(0)';
    });
});

// Intersection Observer for portfolio items
const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            portfolioObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '50px'
});

portfolioItems.forEach(item => portfolioObserver.observe(item));

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

const textArray = ['Flutter Developer', 'Web Developer', 'UI/UX Designer'];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains('typing')) {
            cursorSpan.classList.add('typing');
        }
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains('typing')) {
            cursorSpan.classList.add('typing');
        }
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, newTextDelay + 250);
});

// Skills Animation
const skillItems = document.querySelectorAll('.skill-item');
const skillsSection = document.querySelector('.skills');

function animateSkills() {
    skillItems.forEach(item => {
        const progress = item.getAttribute('data-progress');
        const progressBar = item.querySelector('.skill-progress');
        progressBar.style.setProperty('--progress', `${progress}%`);
        item.classList.add('animate');
    });
}

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillsObserver.observe(skillsSection);

// Enhanced scroll handling
let lastScrollTop = 0;
const scrollThreshold = 5;
let scrollTimer = null;

window.addEventListener('scroll', () => {
    if (scrollTimer !== null) {
        clearTimeout(scrollTimer);
    }

    scrollTimer = setTimeout(() => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        
        if (Math.abs(lastScrollTop - st) <= scrollThreshold) {
            return;
        }

        if (st > lastScrollTop) {
            // Scrolling down
            navbar.classList.add('scroll-down');
            navbar.classList.remove('scroll-up');
        } else {
            // Scrolling up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        
        lastScrollTop = st <= 0 ? 0 : st;
    }, 10);
}, { passive: true });

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