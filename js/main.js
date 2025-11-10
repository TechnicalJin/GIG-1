// Portfolio Template - Main JavaScript File

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Mobile Navigation Toggle =====
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('#mobile-menu a');
    
    // Toggle mobile menu
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Animate hamburger icon (optional enhancement)
            const icon = menuBtn.querySelector('svg');
            if (icon) {
                icon.classList.toggle('rotate-90');
            }
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
    
    
    // ===== Smooth Scrolling for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80; // Adjust based on your fixed header height
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    // ===== Scroll to Top Button =====
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (scrollTopBtn) {
        // Show/hide scroll to top button
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.remove('opacity-0', 'invisible');
                scrollTopBtn.classList.add('opacity-100', 'visible');
            } else {
                scrollTopBtn.classList.add('opacity-0', 'invisible');
                scrollTopBtn.classList.remove('opacity-100', 'visible');
            }
        });
        
        // Scroll to top when clicked
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    
    // ===== Active Navigation Link on Scroll =====
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('#nav-links a');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('text-primary', 'font-semibold');
                    item.classList.add('text-gray-700');
                    
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('text-primary', 'font-semibold');
                        item.classList.remove('text-gray-700');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    
    // ===== Contact Form Handling =====
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual form submission logic)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            
            // Simulate API call
            setTimeout(function() {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 2000);
        });
    }
    
    
    // ===== Notification System =====
    function showNotification(message, type = 'info') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification fixed top-20 right-6 px-6 py-4 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-0`;
        
        // Set color based on type
        if (type === 'success') {
            notification.classList.add('bg-green-500', 'text-white');
        } else if (type === 'error') {
            notification.classList.add('bg-red-500', 'text-white');
        } else {
            notification.classList.add('bg-blue-500', 'text-white');
        }
        
        notification.innerHTML = `
            <div class="flex items-center gap-3">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Slide in animation
        setTimeout(() => {
            notification.classList.add('translate-x-0');
        }, 10);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    
    // ===== Scroll Animations =====
    function revealOnScroll() {
        const elements = document.querySelectorAll('.fade-in-up, .card-hover');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('opacity-100', 'translate-y-0');
                element.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
    
    
    // ===== Skill Progress Bars Animation =====
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress, [class*="bg-"][class*="rounded-full"]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('skill-progress');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }
    
    animateSkillBars();
    
    
    // ===== Typing Effect (Optional Enhancement) =====
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Example usage (uncomment to enable):
    // const heroTitle = document.querySelector('#hero h1 span');
    // if (heroTitle) {
    //     const text = heroTitle.textContent;
    //     typeWriter(heroTitle, text, 100);
    // }
    
    
    // ===== Image Lazy Loading =====
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    
    // ===== Navbar Background on Scroll =====
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('shadow-lg');
            } else {
                header.classList.remove('shadow-lg');
            }
        });
    }
    
    
    // ===== Prevent Right Click on Images (Optional) =====
    // Uncomment if you want to prevent right-click on images
    // images.forEach(img => {
    //     img.addEventListener('contextmenu', function(e) {
    //         e.preventDefault();
    //         showNotification('Image protection enabled', 'info');
    //     });
    // });
    
    
    // ===== Console Welcome Message =====
    console.log('%c👋 Welcome to My Portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with ❤️ using HTML, TailwindCSS & Vanilla JavaScript', 'color: #8b5cf6; font-size: 14px;');
    console.log('%cInterested in the code? Check out my GitHub!', 'color: #ec4899; font-size: 14px;');
    
    
    // ===== Performance Optimization =====
    // Debounce function for scroll events
    function debounce(func, wait = 10) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debounce to scroll events
    window.addEventListener('scroll', debounce(function() {
        highlightNavigation();
        revealOnScroll();
    }, 10));
    
    
    // ===== Dark Mode Toggle (Optional Enhancement) =====
    // Uncomment to enable dark mode
    /*
    const darkModeToggle = document.createElement('button');
    darkModeToggle.id = 'dark-mode-toggle';
    darkModeToggle.className = 'fixed bottom-24 right-8 w-12 h-12 bg-gray-800 text-yellow-400 rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 z-40';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', function() {
        document.documentElement.classList.toggle('dark');
        const icon = darkModeToggle.querySelector('i');
        
        if (document.documentElement.classList.contains('dark')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        const icon = darkModeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    */
    
    
    // ===== Easter Egg - Konami Code =====
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join('') === konamiSequence.join('')) {
            showNotification('🎮 Konami Code Activated! You found the secret!', 'success');
            document.body.style.transform = 'rotate(360deg)';
            document.body.style.transition = 'transform 2s';
            
            setTimeout(() => {
                document.body.style.transform = 'rotate(0deg)';
            }, 2000);
        }
    });
    
    
    // ===== Initialize All Functions =====
    console.log('✅ Portfolio Initialized Successfully!');
});


// ===== External Links - Open in New Tab =====
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
        if (!link.getAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});


// ===== Service Worker Registration (PWA - Optional) =====
// Uncomment to enable PWA features
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful:', registration.scope);
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}
*/
