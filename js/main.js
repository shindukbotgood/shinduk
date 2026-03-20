/**
 * SINDEOK PHARM Homepage - Main JavaScript
 * 
 * Features:
 * - Hero Slider with auto-play and manual controls
 * - Mobile Navigation Toggle
 * - Notice Tab Switching
 * - Product Carousel Navigation
 * - Smooth Scroll Animations
 * - Submenu Toggle for Mobile
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // HERO SLIDER
    // ========================================
    const heroSlider = {
        slides: document.querySelectorAll('.hero-slide'),
        dots: document.querySelectorAll('.slider-dot'),
        prevBtn: document.querySelector('.slider-prev'),
        nextBtn: document.querySelector('.slider-next'),
        currentSlide: 0,
        autoplayInterval: null,
        
        init() {
            this.bindEvents();
            this.startAutoplay();
        },
        
        bindEvents() {
            // Dot navigation
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    this.goToSlide(index);
                    this.resetAutoplay();
                });
            });
            
            // Arrow navigation
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => {
                    this.prevSlide();
                    this.resetAutoplay();
                });
            }
            
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => {
                    this.nextSlide();
                    this.resetAutoplay();
                });
            }
            
            // Pause on hover
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.addEventListener('mouseenter', () => {
                    this.pauseAutoplay();
                });
                
                heroSection.addEventListener('mouseleave', () => {
                    this.startAutoplay();
                });
            }
        },
        
        goToSlide(index) {
            // Remove active class from current
            this.slides[this.currentSlide].classList.remove('active');
            this.dots[this.currentSlide].classList.remove('active');
            
            // Update current index
            this.currentSlide = index;
            
            // Add active class to new slide
            this.slides[this.currentSlide].classList.add('active');
            this.dots[this.currentSlide].classList.add('active');
        },
        
        nextSlide() {
            const nextIndex = (this.currentSlide + 1) % this.slides.length;
            this.goToSlide(nextIndex);
        },
        
        prevSlide() {
            const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.goToSlide(prevIndex);
        },
        
        startAutoplay() {
            this.autoplayInterval = setInterval(() => {
                this.nextSlide();
            }, 5000); // 5 seconds
        },
        
        pauseAutoplay() {
            if (this.autoplayInterval) {
                clearInterval(this.autoplayInterval);
                this.autoplayInterval = null;
            }
        },
        
        resetAutoplay() {
            this.pauseAutoplay();
            this.startAutoplay();
        }
    };
    
    heroSlider.init();
    
    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const mobileMenu = {
        toggleBtn: document.querySelector('.mobile-menu-toggle'),
        nav: document.querySelector('.main-navigation'),
        navItems: document.querySelectorAll('.nav-item.has-submenu'),
        
        init() {
            this.bindEvents();
        },
        
        bindEvents() {
            if (this.toggleBtn) {
                this.toggleBtn.addEventListener('click', () => {
                    this.toggleMenu();
                });
            }
            
            // Submenu toggle for mobile
            this.navItems.forEach(item => {
                const link = item.querySelector('.nav-link');
                if (link) {
                    link.addEventListener('click', (e) => {
                        if (window.innerWidth <= 768) {
                            e.preventDefault();
                            this.toggleSubmenu(item);
                        }
                    });
                }
            });
            
            // Close menu on outside click
            document.addEventListener('click', (e) => {
                if (this.nav.classList.contains('active') && 
                    !this.nav.contains(e.target) && 
                    !this.toggleBtn.contains(e.target)) {
                    this.closeMenu();
                }
            });
        },
        
        toggleMenu() {
            this.nav.classList.toggle('active');
            this.toggleBtn.classList.toggle('active');
            document.body.style.overflow = this.nav.classList.contains('active') ? 'hidden' : '';
        },
        
        closeMenu() {
            this.nav.classList.remove('active');
            this.toggleBtn.classList.remove('active');
            document.body.style.overflow = '';
        },
        
        toggleSubmenu(item) {
            item.classList.toggle('active');
        }
    };
    
    mobileMenu.init();
    
    // ========================================
    // NOTICE TAB SWITCHING
    // ========================================
    const noticeTabs = {
        tabBtns: document.querySelectorAll('.tab-btn'),
        noticeList: document.getElementById('notice-list'),
        
        // Sample data for different tabs
        noticeData: {
            notice: [
                { title: '★ 부산통합물류센터 오픈 및 이전에 따른 배송일정 안내 ..', date: '2026-10-26' },
                { title: '◈ 신덕팜 지점별 한글날 연휴 휴무 및 배송안내 ◈ ..', date: '2026-09-30' },
                { title: '◈ 신덕팜 지점별 개천절 연휴 휴무 및 배송안내 ◈ ..', date: '2026-09-29' },
                { title: '◈ 신덕팜 지점별 추석연휴 휴무 및 배송안내 ..', date: '2026-09-08' },
                { title: '◈ 신덕팜 지점별 광복절 휴무 및 배송안내 ◈ ..', date: '2026-08-12' }
            ],
            news: [
                { title: '신덕팜, 2026 년 상반기 매출 달성', date: '2026-03-15' },
                { title: '신덕팜 부산 물류센터 확장 이전', date: '2026-03-01' },
                { title: '신덕팜-OO 제약 전략적 파트너십 체결', date: '2026-02-20' }
            ],
            product: [
                { title: '신제품 '치감플러스액' 출시 안내', date: '2026-03-10' },
                { title: '의료기기 품목 확대 승인', date: '2026-02-28' }
            ],
            industry: [
                { title: '2026 년 제약업계 전망', date: '2026-03-18' },
                { title: '의료보험 정책 변경 안내', date: '2026-03-05' }
            ]
        },
        
        init() {
            this.bindEvents();
        },
        
        bindEvents() {
            this.tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const tabName = btn.dataset.tab;
                    this.switchTab(tabName);
                });
            });
        },
        
        switchTab(tabName) {
            // Update active tab button
            this.tabBtns.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.tab === tabName);
            });
            
            // Update notice list content
            if (this.noticeList && this.noticeData[tabName]) {
                this.noticeList.innerHTML = this.noticeData[tabName].map(item => `
                    <li class="notice-item">
                        <a href="#" class="notice-title">${item.title}</a>
                        <span class="notice-date">${item.date}</span>
                    </li>
                `).join('');
            }
        }
    };
    
    noticeTabs.init();
    
    // ========================================
    // PRODUCT CAROUSEL
    // ========================================
    const productCarousel = {
        grid: document.querySelector('.product-grid'),
        prevBtn: document.querySelector('.carousel-prev'),
        nextBtn: document.querySelector('.carousel-next'),
        dots: document.querySelectorAll('.carousel-dot'),
        currentSlide: 0,
        totalSlides: 4,
        
        init() {
            this.bindEvents();
        },
        
        bindEvents() {
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => {
                    this.prevSlide();
                });
            }
            
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => {
                    this.nextSlide();
                });
            }
            
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    this.goToSlide(index);
                });
            });
        },
        
        goToSlide(index) {
            this.currentSlide = index;
            
            // Update dots
            this.dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            // In real implementation, this would scroll/animate the grid
            // For template, we just update the active state
        },
        
        nextSlide() {
            const nextIndex = (this.currentSlide + 1) % this.totalSlides;
            this.goToSlide(nextIndex);
        },
        
        prevSlide() {
            const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
            this.goToSlide(prevIndex);
        }
    };
    
    productCarousel.init();
    
    // ========================================
    // SCROLL ANIMATIONS
    // ========================================
    const scrollAnimations = {
        observer: null,
        
        init() {
            if ('IntersectionObserver' in window) {
                this.observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animated');
                            this.observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                });
                
                this.observeElements();
            }
        },
        
        observeElements() {
            const animatedElements = document.querySelectorAll(
                '.hero-content, .notice-block, .product-block, .action-card, .about-intro, .about-philosophy'
            );
            
            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                this.observer.observe(el);
            });
        }
    };
    
    scrollAnimations.init();
    
    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================
    const headerEffect = {
        header: document.querySelector('.site-header'),
        lastScroll: 0,
        
        init() {
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 100) {
                    this.header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                    this.header.style.background = 'rgba(255, 255, 255, 0.98)';
                } else {
                    this.header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                    this.header.style.background = '#ffffff';
                }
                
                this.lastScroll = currentScroll;
            });
        }
    };
    
    headerEffect.init();
    
    console.log('SINDEOK PHARM Homepage initialized');
});
