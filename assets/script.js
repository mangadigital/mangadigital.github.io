// Menu Mobile Toggle
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navList.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link, .nav-logo a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navList.classList.remove('active');
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

// Scroll Snap e Indicadores
const slidesContainer = document.querySelector('.slides-container');
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');

slidesContainer.addEventListener('scroll', () => {
    const scrollTop = slidesContainer.scrollTop;
    const slideHeight = window.innerHeight;
    const currentSlide = Math.round(scrollTop / slideHeight);

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
});

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
