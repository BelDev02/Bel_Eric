const header = document.getElementById('heroHeader');
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];
const currentPage = document.body.dataset.page;

navLinks.forEach((link) => {
  const pageName = link.getAttribute('href').replace('.html', '').replace('index', 'accueil');
  link.classList.toggle('active', pageName === currentPage);
});

function updateHeaderState() {
  const scrollY = window.scrollY;
  if (scrollY > 100) {
    header.classList.replace('is-hero', 'is-compact');
  } else if (scrollY < 30) {
    header.classList.replace('is-compact', 'is-hero');
  }
}

function updateActiveSection(entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
  });
}

const sectionObserver = new IntersectionObserver(updateActiveSection, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

window.addEventListener('scroll', updateHeaderState, { passive: true });
updateHeaderState();
