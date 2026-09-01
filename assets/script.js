// Menu Mobile Toggle
const hamburger = document.querySelector('.mobile-hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.mobile-menu .nav-link, .mobile-logo').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Navegação suave dos links do menu
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId.length > 1) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Scroll Snap, Indicadores e Navbar "frosted"
const slidesContainer = document.querySelector('.slides-container');
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const navbar = document.querySelector('.navbar');
const mobileNavbar = document.querySelector('.mobile-navbar');

slidesContainer.addEventListener('scroll', () => {
    const scrollTop = slidesContainer.scrollTop;
    const slideHeight = window.innerHeight;
    const currentSlide = Math.round(scrollTop / slideHeight);

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });

    const scrolled = scrollTop > 50;
    navbar.classList.toggle('scrolled', scrolled);
    mobileNavbar.classList.toggle('scrolled', scrolled);
});

slidesContainer.dispatchEvent(new Event('scroll'));

// Navegação por indicadores
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        slides[index].scrollIntoView({ behavior: 'smooth' });
    });
});

// Navegação por teclado
document.addEventListener('keydown', (e) => {
    const currentSlide = Math.round(slidesContainer.scrollTop / window.innerHeight);

    if (e.key === 'ArrowDown' && currentSlide < slides.length - 1) {
        slides[currentSlide + 1].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'ArrowUp' && currentSlide > 0) {
        slides[currentSlide - 1].scrollIntoView({ behavior: 'smooth' });
    }
});

// Animação de entrada dos slides
const observerOptions = {
    root: slidesContainer,
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const content = entry.target.querySelector('.slide-content');
            content.style.animation = 'none';
            setTimeout(() => {
                content.style.animation = 'fadeInUp 1s ease-out';
            }, 10);
        }
    });
}, observerOptions);

slides.forEach(slide => observer.observe(slide));

document.body.style.overflow = 'hidden';
