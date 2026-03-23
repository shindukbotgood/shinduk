/**
 * SINDEOK PHARM Homepage - Main JavaScript
 * 
 * Features:
 * - Header scroll behavior (jbMenu)
 * - Hero Slider with auto-play and manual controls
 * - Notice Tab Switching
 * - Product Carousel Navigation
 * - Smooth Scroll Animations
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // HEADER SCROLL BEHAVIOR (jbMenu)
    // ========================================
    const jbMenu = document.querySelector('.jb-menu');
    const topBar = document.getElementById('top-bar');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY || window.pageYOffset;
        
        if (scrollY > 100) {
            // Header 고정
            if (jbMenu) {
                jbMenu.classList.add('jb-fixed');
            }
            // Top Bar 숨김
            if (topBar) {
                topBar.classList.add('hidden');
            }
        } else {
            // Header 원래대로
            if (jbMenu) {
                jbMenu.classList.remove('jb-fixed');
            }
            // Top Bar 표시
            if (topBar) {
                topBar.classList.remove('hidden');
            }
        }
    });
    
    // 초기 상태 확인
    if (jbMenu) {
        console.log('Header element found:', jbMenu.tagName);
    }
    if (topBar) {
        console.log('Top bar element found:', topBar.id);
    }
    
    // ========================================
    // HERO SLIDER (exslider)
    // ========================================
    const exSlider = {
        slides: document.querySelectorAll('.exslider li'),
        prevBtn: document.querySelector('.ex-slider-prev'),
        nextBtn: document.querySelector('.ex-slider-next'),
        currentSlide: 0,
        autoplayInterval: null,
        
        init() {
            if (this.slides.length === 0) return;
            
            // Show first slide
            this.showSlide(0);
            this.bindEvents();
            this.startAutoplay();
        },
        
        showSlide(index) {
            this.slides.forEach((slide, i) => {
                slide.style.opacity = i === index ? '1' : '0';
                slide.style.visibility = i === index ? 'visible' : 'hidden';
                slide.style.zIndex = i === index ? '10' : '1';
            });
        },
        
        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            this.showSlide(this.currentSlide);
        },
        
        prevSlide() {
            this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.showSlide(this.currentSlide);
        },
        
        bindEvents() {
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.nextSlide();
                    this.resetAutoplay();
                });
            }
            
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.prevSlide();
                    this.resetAutoplay();
                });
            }
        },
        
        startAutoplay() {
            this.autoplayInterval = setInterval(() => {
                this.nextSlide();
            }, 5000); // 5 seconds
        },
        
        resetAutoplay() {
            clearInterval(this.autoplayInterval);
            this.startAutoplay();
        }
    };
    
    // Initialize slider
    exSlider.init();
    
    // ========================================
    // NOTICE TAB SWITCHING
    // ========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const noticeList = document.getElementById('notice-list');
    
    // Notice data for each tab
    const noticeData = {
        notice: [
            { title: '★ 부산통합물류센터 오픈 및 이전에 따른 배송일정 안내 ..', date: '2026-10-26' },
            { title: '◈ 신덕 지점별 한글날 연휴 휴무 및 배송안내 ◈ ..', date: '2026-09-30' },
            { title: '◈ 신덕팜 지점별 개천절 연휴 휴무 및 배송안내 ◈ ..', date: '2026-09-29' },
            { title: '◈ 신덕팜 지점별 추석연휴 휴무 및 배송안내 ..', date: '2026-09-08' },
            { title: '◈ 신덕팜 지점별 광복절 휴무 및 배송안내 ◈ ..', date: '2026-08-12' }
        ],
        news: [
            { title: '신덕팜, 2026 년 하반기 신규 제품 라인업 발표 ..', date: '2026-11-15' },
            { title: '제 18 회 신덕팜 임직원 체육대회 성황리 종료 ..', date: '2026-10-20' },
            { title: '신덕팜, 업계 최초 당일배송 서비스 시작 ..', date: '2026-09-05' }
        ],
        product: [
            { title: '신제품 '치감플러스액' 출시 안내 ..', date: '2026-11-01' },
            { title: '의료기기 '컴프레셔 네블라이져' 품절 임박 ..', date: '2026-10-15' },
            { title: '건강기능식품 할인 이벤트 진행 중 ..', date: '2026-09-25' }
        ],
        industry: [
            { title: '2026 년 의약품 유통 시장 전망 ..', date: '2026-11-10' },
            { title: '의료기기 규제 완화 논의 가속화 ..', date: '2026-10-05' },
            { title: '헬스케어 산업 디지털 전환 가속 ..', date: '2026-09-18' }
        ]
    };
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get tab type
            const tabType = this.getAttribute('data-tab');
            
            // Update notice list
            if (noticeList && noticeData[tabType]) {
                noticeList.innerHTML = noticeData[tabType].map(item => `
                    <li class="notice-item">
                        <a href="#" class="notice-title">${item.title}</a>
                        <span class="notice-date">${item.date}</span>
                    </li>
                `).join('');
            }
        });
    });
    
    // ========================================
    // PRODUCT CAROUSEL
    // ========================================
    const productGrid = document.querySelector('.product-grid');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    
    let currentCarouselPage = 0;
    const productsPerPage = 4;
    const totalProducts = productGrid ? productGrid.children.length : 0;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    
    function showCarouselPage(page) {
        if (!productGrid) return;
        
        const start = page * productsPerPage;
        const end = start + productsPerPage;
        
        Array.from(productGrid.children).forEach((product, index) => {
            if (index >= start && index < end) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
        
        // Update dots
        carouselDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === page);
        });
    }
    
    if (carouselNext) {
        carouselNext.addEventListener('click', function() {
            currentCarouselPage = (currentCarouselPage + 1) % totalPages;
            showCarouselPage(currentCarouselPage);
        });
    }
    
    if (carouselPrev) {
        carouselPrev.addEventListener('click', function() {
            currentCarouselPage = (currentCarouselPage - 1 + totalPages) % totalPages;
            showCarouselPage(currentCarouselPage);
        });
    }
    
    // Initialize carousel
    if (totalProducts > 0) {
        showCarouselPage(0);
    }
    
    // ========================================
    // SMOOTH SCROLL ANIMATIONS
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('.action-card, .about-intro, .about-philosophy, .product-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ========================================
    // ACTION CARDS HOVER EFFECT
    // ========================================
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    console.log('SINDEOK PHARM Homepage initialized successfully! 🚀');
});
