// Menu Mobile Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Scroll Snap e Indicadores
const slidesContainer = document.querySelector('.slides-container');
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const navLinksList = document.querySelectorAll('.nav-link');

// Atualizar indicadores ao rolar
slidesContainer.addEventListener('scroll', () => {
    const scrollTop = slidesContainer.scrollTop;
    const slideHeight = window.innerHeight;
    const currentSlide = Math.round(scrollTop / slideHeight);

    // Atualizar indicadores
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });

    // Atualizar navbar
    updateNavbar(scrollTop);
});

// Navegação por indicadores
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        slides[index].scrollIntoView({ behavior: 'smooth' });
    });
});

// Navegação suave dos links do menu
navLinksList.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Navbar transparente no topo, sólida ao rolar
function updateNavbar(scrollTop) {
    const navbar = document.querySelector('.navbar');
    if (scrollTop > 50) {
        navbar.style.background = 'rgba(47, 53, 66, 0.98)';
    } else {
        navbar.style.background = 'rgba(47, 53, 66, 0.95)';
    }
}

// Suporte para navegação por teclado
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

// Prevenir scroll horizontal
document.body.style.overflow = 'hidden';