document.addEventListener("DOMContentLoaded", () => {
    // Top loader animation
    const loader = document.getElementById('page-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 800);
        }, 1200);
    }

    // Scroll Navbar effect
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Smooth Scroll for anchor links
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

    // Newsletter Form Submission (Mock)
    const form = document.getElementById('newsletter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            
            if (input.value) {
                btn.innerText = 'Subscribed!';
                btn.style.backgroundColor = 'var(--accent-gold)';
                btn.style.color = 'var(--bg-color)';
                input.value = '';
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = 'transparent';
                    btn.style.color = 'var(--accent-gold)';
                }, 3000);
            }
        });
    }

    // Optional: Reveal animations on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply visibility class in CSS if needed for fade-ins
    // document.querySelectorAll('.fade-in-section').forEach(section => observer.observe(section));
});
