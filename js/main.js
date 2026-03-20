// Main JavaScript for SINDEOK PHARM

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.style.height = '80px';
            header.style.position = 'fixed';
            header.style.top = '0';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.height = '140px';
            header.style.position = 'relative';
            header.style.boxShadow = 'none';
        }
    });

    // News tab switching
    const newsTabs = document.querySelectorAll('.news_tab li a');
    newsTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            newsTabs.forEach(t => t.classList.remove('on'));
            this.classList.add('on');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Mobile menu toggle (future enhancement)
    console.log('SINDEOK PHARM website loaded successfully');
});
