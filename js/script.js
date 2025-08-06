// ===== MAIN JAVASCRIPT FILE =====

// ===== GLOBAL VARIABLES =====
const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');
const backToTopBtn = document.getElementById('back-to-top');

// ===== NAVIGATION FUNCTIONALITY =====
function initNavigation() {
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
            
            // Update toggle icon
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('show-menu')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            if (navToggle) {
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('show-menu');
            if (navToggle) {
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// ===== STICKY HEADER =====
function initStickyHeader() {
    function updateHeader() {
        if (window.scrollY >= 100) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
    }

    window.addEventListener('scroll', updateHeader);
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    if (!backToTopBtn) return;

    function updateBackToTopBtn() {
        if (window.scrollY >= 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', updateBackToTopBtn);
}

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.service-card, .plant-card, .feature, .contact__method, .faq-item'
    );
    
    animatedElements.forEach(el => observer.observe(el));
}

// ===== FORM VALIDATION UTILITIES =====
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(el => el.textContent = '');
}

function showLoading(formId) {
    const form = document.getElementById(formId);
    const loadingMessage = document.getElementById(`${formId.replace('Form', '')}LoadingMessage`);
    if (form && loadingMessage) {
        form.style.display = 'none';
        loadingMessage.style.display = 'block';
    }
}

function showSuccess(formId) {
    const form = document.getElementById(formId);
    const loadingMessage = document.getElementById(`${formId.replace('Form', '')}LoadingMessage`);
    const successMessage = document.getElementById(`${formId.replace('Form', '')}SuccessMessage`);
    
    if (loadingMessage) loadingMessage.style.display = 'none';
    if (successMessage) successMessage.style.display = 'block';
}

function hideMessages(formId) {
    const loadingMessage = document.getElementById(`${formId.replace('Form', '')}LoadingMessage`);
    const successMessage = document.getElementById(`${formId.replace('Form', '')}SuccessMessage`);
    
    if (loadingMessage) loadingMessage.style.display = 'none';
    if (successMessage) successMessage.style.display = 'none';
}

// ===== REGISTRATION FORM HANDLING =====
function initRegistrationForm() {
    const registerForm = document.getElementById('registerForm');
    const buyPlantsCheckbox = document.getElementById('buyPlants');
    const plantPreferencesGroup = document.getElementById('plantPreferencesGroup');

    if (!registerForm) return;

    // Show/hide plant preferences based on "Buy Plants" selection
    if (buyPlantsCheckbox && plantPreferencesGroup) {
        function togglePlantPreferences() {
            if (buyPlantsCheckbox.checked) {
                plantPreferencesGroup.style.display = 'block';
            } else {
                plantPreferencesGroup.style.display = 'none';
                // Clear all plant type checkboxes
                const plantCheckboxes = document.querySelectorAll('input[name="plantTypes"]');
                plantCheckboxes.forEach(cb => cb.checked = false);
            }
        }

        buyPlantsCheckbox.addEventListener('change', togglePlantPreferences);
        
        // Initialize on page load
        togglePlantPreferences();
    }

    // Form validation
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();
        
        let isValid = true;
        
        // Get form data
        const formData = new FormData(registerForm);
        const fullName = formData.get('fullName').trim();
        const email = formData.get('email').trim();
        const phone = formData.get('phone').trim();
        const services = formData.getAll('services');
        const terms = formData.get('terms');

        // Validate full name
        if (!fullName || fullName.length < 2) {
            showError('fullName', 'Please enter your full name (minimum 2 characters)');
            isValid = false;
        }

        // Validate email
        if (!email) {
            showError('email', 'Email address is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate phone
        if (!phone) {
            showError('phone', 'Phone number is required');
            isValid = false;
        } else if (!validatePhone(phone)) {
            showError('phone', 'Please enter a valid phone number');
            isValid = false;
        }

        // Validate services
        if (services.length === 0) {
            showError('services', 'Please select at least one service or product');
            isValid = false;
        }

        // Validate terms
        if (!terms) {
            showError('terms', 'You must agree to the terms and conditions');
            isValid = false;
        }

        if (isValid) {
            // Disable submit button
            const submitBtn = document.getElementById('submitBtn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            }

            // Show loading message
            showLoading('registerForm');

            // Send email using the email service
            if (window.sendRegistrationEmail) {
                window.sendRegistrationEmail(registerForm)
                    .then(() => {
                        showSuccess('registerForm');
                    })
                    .catch((error) => {
                        console.error('Registration failed:', error);
                        alert('Registration failed. Please try again or contact us directly.');
                        
                        // Re-enable form
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Registration';
                        }
                        hideMessages('registerForm');
                        registerForm.style.display = 'block';
                    });
            } else {
                // Fallback to mailto
                const mailtoLink = createMailtoLink(formData);
                window.location.href = mailtoLink;
                showSuccess('registerForm');
            }
        }
    });
}

// ===== CONTACT FORM HANDLING =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();
        
        let isValid = true;
        
        // Get form data
        const formData = new FormData(contactForm);
        const firstName = formData.get('firstName').trim();
        const lastName = formData.get('lastName').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject');
        const message = formData.get('message').trim();

        // Validate first name
        if (!firstName || firstName.length < 2) {
            showError('firstName', 'First name is required (minimum 2 characters)');
            isValid = false;
        }

        // Validate last name
        if (!lastName || lastName.length < 2) {
            showError('lastName', 'Last name is required (minimum 2 characters)');
            isValid = false;
        }

        // Validate email
        if (!email) {
            showError('contactEmail', 'Email address is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('contactEmail', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate subject
        if (!subject) {
            showError('subject', 'Please select a subject');
            isValid = false;
        }

        // Validate message
        if (!message || message.length < 10) {
            showError('contactMessage', 'Please enter a message (minimum 10 characters)');
            isValid = false;
        }

        if (isValid) {
            // Disable submit button
            const submitBtn = document.getElementById('contactSubmitBtn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }

            // Show loading message
            showLoading('contactForm');

            // Send email using the email service
            if (window.sendContactEmail) {
                window.sendContactEmail(contactForm)
                    .then(() => {
                        showSuccess('contactForm');
                    })
                    .catch((error) => {
                        console.error('Contact form submission failed:', error);
                        alert('Message sending failed. Please try again or contact us directly.');
                        
                        // Re-enable form
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                        }
                        hideMessages('contactForm');
                        contactForm.style.display = 'block';
                    });
            } else {
                // Fallback to mailto
                const mailtoLink = createContactMailtoLink(formData);
                window.location.href = mailtoLink;
                showSuccess('contactForm');
            }
        }
    });
}

// ===== MAILTO LINK CREATION =====
function createMailtoLink(formData) {
    const to = 'heerasaw14@gmail.com';
    const subject = encodeURIComponent('Nature Lovers Registration');
    
    let body = `New Registration from Nature Lovers Website\n\n`;
    body += `Name: ${formData.get('fullName')}\n`;
    body += `Email: ${formData.get('email')}\n`;
    body += `Phone: ${formData.get('phone')}\n\n`;
    
    const services = formData.getAll('services');
    if (services.length > 0) {
        body += `Selected Services:\n`;
        services.forEach(service => body += `- ${service}\n`);
        body += `\n`;
    }
    
    const plantTypes = formData.getAll('plantTypes');
    if (plantTypes.length > 0) {
        body += `Plant Preferences:\n`;
        plantTypes.forEach(plant => body += `- ${plant}\n`);
        body += `\n`;
    }
    
    if (formData.get('address')) {
        body += `Address: ${formData.get('address')}\n\n`;
    }
    
    if (formData.get('message')) {
        body += `Additional Details:\n${formData.get('message')}\n\n`;
    }
    
    body += `Preferred Contact Time: ${formData.get('contactTime')}\n`;
    body += `Newsletter Subscription: ${formData.get('newsletter') ? 'Yes' : 'No'}\n`;
    
    return `mailto:${to}?subject=${subject}&body=${encodeURIComponent(body)}`;
}

function createContactMailtoLink(formData) {
    const to = 'heerasaw14@gmail.com';
    const subject = encodeURIComponent(`Nature Lovers: ${formData.get('subject')}`);
    
    let body = `New Contact Form Submission\n\n`;
    body += `Name: ${formData.get('firstName')} ${formData.get('lastName')}\n`;
    body += `Email: ${formData.get('email')}\n`;
    if (formData.get('phone')) {
        body += `Phone: ${formData.get('phone')}\n`;
    }
    body += `Subject: ${formData.get('subject')}\n`;
    body += `Preferred Contact: ${formData.get('preferredContact')}\n\n`;
    body += `Message:\n${formData.get('message')}\n`;
    
    return `mailto:${to}?subject=${subject}&body=${encodeURIComponent(body)}`;
}

// ===== RESET CONTACT FORM =====
function resetContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('contactSuccessMessage');
    
    if (contactForm && successMessage) {
        contactForm.reset();
        clearErrors();
        successMessage.style.display = 'none';
        contactForm.style.display = 'block';
        
        // Re-enable submit button
        const submitBtn = document.getElementById('contactSubmitBtn');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
    }
}

// Make resetContactForm globally available
window.resetContactForm = resetContactForm;

// ===== LAZY LOADING IMAGES =====
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function debounce(func, wait) {
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

// ===== ACCESSIBILITY IMPROVEMENTS =====
function initAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'visually-hidden';
    skipLink.addEventListener('focus', () => skipLink.classList.remove('visually-hidden'));
    skipLink.addEventListener('blur', () => skipLink.classList.add('visually-hidden'));
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Keyboard navigation for mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
            if (navToggle) {
                navToggle.focus();
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    try {
        initNavigation();
        initStickyHeader();
        initBackToTop();
        initSmoothScrolling();
        initScrollAnimations();
        initRegistrationForm();
        initContactForm();
        initLazyLoading();
        initAccessibility();
        
        console.log('Nature Lovers website initialized successfully');
    } catch (error) {
        console.error('Error initializing website:', error);
    }
});

// ===== EXPORT FUNCTIONS FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        validatePhone,
        createMailtoLink,
        createContactMailtoLink
    };
}
