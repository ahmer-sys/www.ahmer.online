// Loading Animation
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // Enable smooth scrolling after loading
        document.documentElement.style.scrollBehavior = 'smooth';
    }, 1500);
});

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

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

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

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile-specific interactions
if (window.innerWidth <= 768) {
    // Scroll Progress Indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
    });

    // Pull to Refresh Effect
    let touchStart = 0;
    const hero = document.querySelector('.hero');

    document.addEventListener('touchstart', (e) => {
        touchStart = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (window.scrollY === 0) {
            const touchDiff = e.touches[0].clientY - touchStart;
            if (touchDiff > 0 && touchDiff < 80) {
                hero.classList.add('pull-down');
                hero.style.transform = `translateY(${touchDiff / 3}px)`;
            }
        }
    }, { passive: true });

    document.addEventListener('touchend', () => {
        hero.classList.remove('pull-down');
        hero.style.transform = '';
    });

    // Smooth Testimonial Swipe
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let isDragging = false;
    let currentIndex = 0;
    let animationID;

    testimonialCards.forEach((card, index) => {
        card.addEventListener('touchstart', touchStart);
        card.addEventListener('touchmove', touchMove);
        card.addEventListener('touchend', touchEnd);
    });

    function touchStart(event) {
        startX = event.touches[0].clientX;
        isDragging = true;
        animationID = requestAnimationFrame(animation);
    }

    function touchMove(event) {
        if (isDragging) {
            const currentX = event.touches[0].clientX;
            currentTranslate = prevTranslate + currentX - startX;
        }
    }

    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        
        const moveBy = currentTranslate - prevTranslate;
        
        if (Math.abs(moveBy) > 100) {
            if (moveBy > 0 && currentIndex > 0) {
                currentIndex--;
            } else if (moveBy < 0 && currentIndex < testimonialCards.length - 1) {
                currentIndex++;
            }
        }
        
        prevTranslate = currentIndex * -window.innerWidth;
        currentTranslate = prevTranslate;
        
        testimonialSlider.style.transform = `translateX(${currentTranslate}px)`;
        testimonialSlider.style.transition = 'transform 0.3s ease';
    }

    function animation() {
        if (isDragging) {
            testimonialSlider.style.transform = `translateX(${currentTranslate}px)`;
            testimonialSlider.style.transition = 'none';
            requestAnimationFrame(animation);
        }
    }

    // Enhanced Form Interactions
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });

    // Smooth Scroll for Mobile
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
} 