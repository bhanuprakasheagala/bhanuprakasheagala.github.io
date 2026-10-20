document.documentElement.classList.add('js-enabled');

if (window.AOS) {
    window.AOS.init({
        duration: 1000,
        once: true
    });
    document.documentElement.classList.add('aos-enabled');
}

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

function setMenuOpen(isOpen) {
    navMenu.classList.toggle('active', isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    mobileMenuBtn.querySelector('i').className = isOpen ? 'fas fa-times' : 'fas fa-bars';
}

mobileMenuBtn.addEventListener('click', () => {
    setMenuOpen(mobileMenuBtn.getAttribute('aria-expanded') !== 'true');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        setMenuOpen(false);
    });
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobileMenuBtn.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        mobileMenuBtn.focus();
    }
});

const revealElements = document.querySelectorAll('.fade-up-scroll, .slide-in-left, .slide-in-right');
let revealObserver;

function revealPassedElements() {
    const triggerPoint = window.innerHeight * 0.8;

    revealElements.forEach(element => {
        if (element.getBoundingClientRect().top < triggerPoint) {
            element.classList.add('active');
            revealObserver?.unobserve(element);
        }
    });
}

if (!('IntersectionObserver' in window)) {
    revealElements.forEach(element => element.classList.add('active'));
} else {
    revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight * 0.8) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -10% 0px' });

    revealElements.forEach(element => revealObserver.observe(element));
    window.addEventListener('scroll', revealPassedElements, { passive: true });
    window.addEventListener('load', revealPassedElements);
    revealPassedElements();
}
