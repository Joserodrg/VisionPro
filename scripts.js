// ===============================================
// VisionPro Media - Scripts
// Premium Video Marketing Agency Website
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavbar();
    initSmoothScroll();
    initPortfolioFilter();
    initVideoCards();
    initTestimonials();
    initContactForm();
    initScrollAnimations();
});

// ===============================================
// NAVBAR
// ===============================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            
            // Create mobile menu if doesn't exist
            let mobileMenu = document.querySelector('.mobile-menu');
            
            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                mobileMenu.innerHTML = navLinks.innerHTML;
                
                // Add styles
                mobileMenu.style.cssText = `
                    position: fixed;
                    top: 70px;
                    left: 0;
                    right: 0;
                    background: rgba(10, 10, 26, 0.98);
                    backdrop-filter: blur(20px);
                    padding: 32px;
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                    transform: translateY(-100%);
                    opacity: 0;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 999;
                `;
                
                const links = mobileMenu.querySelectorAll('a');
                links.forEach(link => {
                    link.style.cssText = `
                        font-size: 1.2rem;
                        font-weight: 600;
                        color: white;
                        padding: 12px 0;
                        border-bottom: 1px solid rgba(255,255,255,0.1);
                    `;
                });
                
                navbar.after(mobileMenu);
            }
            
            // Toggle menu
            if (mobileMenu.style.transform === 'translateY(0%)') {
                mobileMenu.style.transform = 'translateY(-100%)';
                mobileMenu.style.opacity = '0';
            } else {
                mobileMenu.style.transform = 'translateY(0%)';
                mobileMenu.style.opacity = '1';
            }
        });
    }
}

// ===============================================
// SMOOTH SCROLL
// ===============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.style.opacity === '1') {
                    mobileMenu.style.transform = 'translateY(-100%)';
                    mobileMenu.style.opacity = '0';
                }
            }
        });
    });
}

// ===============================================
// PORTFOLIO FILTER
// ===============================================
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const videoCards = document.querySelectorAll('.video-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            // Filter cards with animation
            videoCards.forEach((card, index) => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = `fadeIn 0.5s ease ${index * 0.1}s forwards`;
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===============================================
// VIDEO CARDS - Hover & Modal
// ===============================================
function initVideoCards() {
    const videoCards = document.querySelectorAll('.video-card');
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalClose = document.querySelector('.modal-close');
    
    videoCards.forEach(card => {
        const video = card.querySelector('.portfolio-video');
        const playBtn = card.querySelector('.play-btn');
        
        // Hover effects - play preview
        card.addEventListener('mouseenter', () => {
            if (video && video.readyState >= 2) {
                video.play().catch(() => {});
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });
        
        // Click to open modal
        if (playBtn) {
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                
                const videoSrc = video?.querySelector('source')?.src;
                
                if (videoSrc && modal && modalVideo) {
                    modalVideo.querySelector('source').src = videoSrc;
                    modalVideo.load();
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    modalVideo.play().catch(() => {});
                } else {
                    // Demo: show alert if no video source
                    showNotification('Los videos de muestra se cargarán aquí. Añade tus archivos MP4 a la carpeta /videos/', 'info');
                }
            });
        }
    });
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            closeModal();
        }
    });
    
    function closeModal() {
        if (modal && modalVideo) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            modalVideo.pause();
        }
    }
}

// ===============================================
// TESTIMONIALS SLIDER
// ===============================================
function initTestimonials() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    let currentIndex = 0;
    let autoSlide;
    
    function showSlide(index) {
        cards.forEach((card, i) => {
            card.classList.remove('active');
            dots[i]?.classList.remove('active');
        });
        
        cards[index]?.classList.add('active');
        dots[index]?.classList.add('active');
        currentIndex = index;
    }
    
    // Click on dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetAutoSlide();
        });
    });
    
    // Auto slide
    function startAutoSlide() {
        autoSlide = setInterval(() => {
            const nextIndex = (currentIndex + 1) % cards.length;
            showSlide(nextIndex);
        }, 5000);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }
    
    if (cards.length > 0) {
        startAutoSlide();
    }
}

// ===============================================
// CONTACT FORM
// ===============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Loading state
            submitBtn.innerHTML = `
                <span class="loading-spinner"></span>
                Enviando...
            `;
            submitBtn.disabled = true;
            
            // Add spinner styles
            const style = document.createElement('style');
            style.textContent = `
                .loading-spinner {
                    width: 20px;
                    height: 20px;
                    border: 2px solid transparent;
                    border-top-color: white;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                    display: inline-block;
                    margin-right: 8px;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success
            showNotification('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
            form.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    }
}

// ===============================================
// SCROLL ANIMATIONS
// ===============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animateElements = document.querySelectorAll(
        '.service-card, .video-card, .process-step, .contact-item, .stat'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index % 3 * 0.1}s`;
        observer.observe(el);
    });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ===============================================
// NOTIFICATION SYSTEM
// ===============================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        info: 'linear-gradient(135deg, #667eea, #764ba2)'
    };
    
    notification.style.cssText = `
        position: fixed;
        bottom: 32px;
        right: 32px;
        padding: 20px 32px;
        background: ${colors[type] || colors.info};
        color: white;
        border-radius: 12px;
        font-weight: 500;
        font-size: 0.95rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10001;
        animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 400px;
    `;
    
    notification.textContent = message;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

// ===============================================
// PARALLAX EFFECT FOR HERO
// ===============================================
window.addEventListener('scroll', () => {
    const shapes = document.querySelectorAll('.shape');
    const scrollY = window.scrollY;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// ===============================================
// LAZY LOADING FOR VIDEOS
// ===============================================
if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                const source = video.querySelector('source');
                
                if (source && source.dataset.src) {
                    source.src = source.dataset.src;
                    video.load();
                }
                
                videoObserver.unobserve(video);
            }
        });
    }, { threshold: 0.25 });
    
    document.querySelectorAll('.portfolio-video').forEach(video => {
        videoObserver.observe(video);
    });
}
