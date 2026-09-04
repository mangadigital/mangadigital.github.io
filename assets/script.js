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

// Navbar "frosted" ao rolar a página
const navbar = document.querySelector('.navbar');
const mobileNavbar = document.querySelector('.mobile-navbar');

const updateNavbar = () => {
    const scrolled = window.scrollY > 50;
    navbar.classList.toggle('scrolled', scrolled);
    mobileNavbar.classList.toggle('scrolled', scrolled);
};

window.addEventListener('scroll', updateNavbar, { passive: true });
window.addEventListener('load', updateNavbar);
window.addEventListener('pageshow', updateNavbar);

updateNavbar();

// Animação de entrada das seções
const sections = document.querySelectorAll('.section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const content = entry.target.querySelector('.section-content');
            if (content) {
                content.classList.add('is-visible');
            }
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => sectionObserver.observe(section));