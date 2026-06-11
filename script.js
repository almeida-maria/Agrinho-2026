
// Modal functionality
const modal = document.getElementById('infoModal');
const openBtn = document.getElementById('openModalBtn');
const openBtn2 = document.getElementById('openModalBtn2');
const closeBtn = document.getElementById('closeModalBtn');

function openModal() {
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

if (openBtn) openBtn.addEventListener('click', openModal);
if (openBtn2) openBtn2.addEventListener('click', openModal);
if (closeBtn) closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Smooth scroll for anchor links + active nav highlight
const navLinks = document.querySelectorAll('.nav-links a');
const sections = ['equilibrio', 'praticas', 'impacto'];

function setActiveNav() {
    let scrollPos = window.scrollY + 120;
    let currentSection = 'home';
    
    for (let sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section && section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
            currentSection = sectionId;
            break;
        }
    }
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');
        if (href === '#equilibrio' && currentSection === 'equilibrio') link.classList.add('active');
        else if (href === '#praticas' && currentSection === 'praticas') link.classList.add('active');
        else if (href === '#impacto' && currentSection === 'impacto') link.classList.add('active');
        else if (href === '#' && currentSection === 'home') link.classList.add('active');
    });
}

window.addEventListener('scroll', setActiveNav);
window.addEventListener('load', setActiveNav);

// Smooth scroll para links internos
document.querySelectorAll('.nav-links a, .btn-primary[href="#equilibrio"], .btn-outline[href="#equilibrio"]').forEach(anchor => {
    if (anchor.getAttribute('href') && anchor.getAttribute('href').startsWith('#')) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (targetId === '') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    }
});

// Botão explorar soluções do hero
const exploreBtn = document.querySelector('.btn-primary[href="#equilibrio"]');
if (exploreBtn) {
    exploreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('equilibrio').scrollIntoView({ behavior: 'smooth' });
    });
}

// Animação de entrada para cards (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0px)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .practice-item, .impact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.5s ease';
    observer.observe(el);
});

// Garantir que elementos já visíveis no carregamento apareçam
setTimeout(() => {
    document.querySelectorAll('.card, .practice-item, .impact-card').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0px)';
        }
    });
}, 200);
