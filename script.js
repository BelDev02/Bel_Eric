const root = document.documentElement;
const header = document.getElementById('heroHeader');
const currentPage = document.body.dataset.page;
let currentLanguage = localStorage.getItem('portfolio-language') || 'fr';
const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
const originalText = new Map();

document.querySelectorAll('.header-container').forEach((headerElement) => {
  const profile = headerElement.querySelector('.profile-container');
  const actions = headerElement.querySelector('.header-actions');
  if (profile && actions) profile.appendChild(actions);
});

const translations = {
  'Bonjour !': 'Hello!', 'Accueil': 'Home', 'À propos': 'About', 'Expériences': 'Experience', 'Projets': 'Projects', 'Contact': 'Contact',
  'Portfolio / Data & statistiques': 'Portfolio / Data & Statistics', 'Étudiant en Science des Données (EMS)': 'Data Science student (EMS)',
  'Transformer les données en décisions plus claires.': 'Turning data into clearer decisions.',
  "Je construis mon parcours autour de la Data, des mathématiques et de la statistique, avec l'envie de comprendre les phénomènes, modéliser les bons signaux et produire des analyses utiles.": 'I am building my path around data, mathematics and statistics, with a focus on understanding phenomena, modelling meaningful signals and producing useful analysis.',
  'Voir les projets': 'View projects', 'Me contacter': 'Contact me', 'Trajectoire': 'Path', 'Une formation progressive entre informatique, mathématiques et exploration statistique.': 'A progressive education across computer science, mathematics and statistical exploration.',
  'Étapes de formation': 'Education stages', 'Projets & analyses': 'Projects & analysis', 'Code à découvrir': 'Code to explore', 'Repères': 'Highlights', 'Un parcours entre trois disciplines.': 'A path across three disciplines.',
  'Parcours académique': 'Academic path', 'Savoir-faire': 'Expertise', 'Compétences & expériences': 'Skills & experience', 'Projets Data': 'Data projects', 'Découvrir le parcours': 'Discover the path', 'Explorer les compétences': 'Explore the skills',
  "De l'informatique au Togo aux mathématiques à Nîmes, puis à la Science des Données à Caen.": 'From computer science in Togo to mathematics in Nimes, then Data Science in Caen.',
  'Une pratique croisée de Python, R, SQL, statistique et visualisation de données.': 'A combined practice of Python, R, SQL, statistics and data visualisation.',
  'Des analyses, modèles et pipelines documentés, avec les dépôts accessibles sur GitHub.': 'Documented analyses, models and pipelines, with repositories available on GitHub.',
  "Chaque étape m'a rapproché d'une même question : comment rendre les données lisibles, fiables et utiles à la décision ?": 'Each step brought me closer to the same question: how can data become readable, reliable and useful for decisions?',
  'École Supérieure des Affaires (ESA), Togo. Une première base en algorithmique, programmation et conception logicielle.': 'Ecole Superieure des Affaires (ESA), Togo. A first foundation in algorithms, programming and software design.',
  'Université de Nîmes (Unimes). Approfondissement du raisonnement formel, de l\'algèbre et de l\'analyse.': 'University of Nimes (Unimes). Deeper work in formal reasoning, algebra and analysis.',
  "IUT Grand Ouest Normandie. Exploration et Modélisation Statistique appliquées à des problématiques de données.": 'IUT Grand Ouest Normandie. Exploration and Statistical Modelling applied to data problems.',
  'Mon parcours associe la rigueur des mathématiques à une culture de développement informatique pour aller de la donnée brute à une interprétation argumentée.': 'My path combines mathematical rigour with software development to move from raw data to a reasoned interpretation.',
  'Mettre en évidence les tendances et les relations importantes dans des données complexes.': 'Highlight important trends and relationships in complex data.', 'Choisir des méthodes statistiques et de machine learning adaptées au contexte.': 'Choose statistical and machine learning methods suited to the context.', 'Raconter les résultats avec des visualisations claires et des conclusions actionnables.': 'Tell the story through clear visualisations and actionable conclusions.',
  'Travaux de nettoyage, exploration et modélisation autour de jeux de données réels ou pédagogiques.': 'Cleaning, exploration and modelling work on real or educational datasets.', 'Formuler une problématique mesurable': 'Formulate a measurable problem', 'Préparer et documenter les données': 'Prepare and document data', 'Comparer les résultats et leurs limites': 'Compare results and limitations',
  'Analyses descriptives, tests, régressions et restitutions visuelles pour soutenir une conclusion claire.': 'Descriptive analysis, tests, regressions and visual reporting to support a clear conclusion.', 'Analyse exploratoire et visualisation': 'Exploratory analysis and visualisation', 'Interprétation des indicateurs': 'Interpret indicators', 'Présentation synthétique des résultats': 'Summarise results clearly',
  'Scripts, analyse, requêtes et algorithmique.': 'Scripts, analysis, queries and algorithms.', 'Tableaux de bord, notebooks et restitutions.': 'Dashboards, notebooks and reporting.', 'Bases pour comprendre les modèles.': 'Foundations for understanding models.', 'Méthodes adaptées aux questions posées.': 'Methods suited to the questions asked.',
  'Retrouvez ici les travaux d’analyse, de modélisation et d’ingénierie des données. Les informations spécifiques seront complétées au fil du parcours.': 'Find data analysis, modelling and engineering work here. Specific information will be completed as my path develops.', 'Étude d’un jeu de données avec nettoyage, visualisations et synthèse des tendances principales.': 'Study of a dataset with cleaning, visualisations and a summary of key trends.', 'Comparaison de modèles et interprétation des résultats sur une problématique appliquée.': 'Comparison of models and interpretation of results for an applied problem.', 'Conception d’un flux simple pour collecter, transformer et exploiter des données structurées.': 'Design of a simple flow to collect, transform and use structured data.',
  'Laboratoire': 'Lab', 'Formation': 'Education', 'Fil conducteur': 'Guiding principle', 'Comprendre avant de modéliser.': 'Understand before modelling.', 'Projection': 'Perspective', 'Aspirations professionnelles': 'Career goals',
  'Analyser': 'Analyse', 'Modéliser': 'Model', 'Transmettre': 'Communicate', 'Explorer, mesurer, expliquer.': 'Explore, measure, explain.', "Des projets académiques et des études de cas pour passer d'une question métier à une analyse documentée.": 'Academic projects and case studies that turn a business question into documented analysis.',
  'Projets d’études': 'Study projects', "Projets d'études": 'Study projects', 'De la question au résultat.': 'From question to result.', 'Raisonner avec les statistiques.': 'Reason with statistics.', 'Stack': 'Stack', 'Compétences techniques': 'Technical skills',
  'Langages': 'Languages', 'Outils Data': 'Data tools', 'Mathématiques': 'Mathematics', 'Statistique': 'Statistics', 'Sélection': 'Selection', 'Projets Data & dépôts GitHub': 'Data projects & GitHub repositories', 'À compléter': 'To complete', 'Dépôt GitHub': 'GitHub repository',
  'Des projets pour rendre les données lisibles.': 'Projects that make data readable.', 'Échange': 'Get in touch', 'Contactez-moi': 'Get in touch', "Un échange autour de la donnée, d'une collaboration ou d'une opportunité ?": 'A conversation about data, collaboration or an opportunity?', "Un échange autour de la donnée, d'une collaboration ou d'une opportunité ? Écrivez-moi directement via ce formulaire.": 'A conversation about data, collaboration or an opportunity? Write to me directly through this form.',
  'Nom': 'Last name', 'Prénom': 'First name', 'Adresse e-mail': 'Email address', 'Sujet': 'Subject', 'Message': 'Message', 'Envoyer le message': 'Send message', 'Votre message a bien été envoyé. Merci !': 'Your message was sent successfully. Thank you!', 'Une erreur est survenue. Réessayez plus tard.': 'Something went wrong. Please try again later.', '© 2026 · Portfolio Science des Données': '© 2026 · Data Science Portfolio'
};

function applyLanguage(language) {
  const nodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (nodes.nextNode()) textNodes.push(nodes.currentNode);
  textNodes.forEach((node) => {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const source = originalText.get(node);
    const key = source.trim();
    if (!key || !translations[key]) return;
    node.nodeValue = source.replace(key, language === 'en' ? translations[key] : key);
  });
  currentLanguage = language;
  document.documentElement.lang = language;
  document.title = language === 'en' ? `${translations[document.body.dataset.page === 'contact' ? 'Contact' : document.body.dataset.page === 'apropos' ? 'À propos' : document.body.dataset.page === 'experiences' ? 'Expériences' : document.body.dataset.page === 'projets' ? 'Projets' : 'Accueil']} | Data Portfolio` : `${document.body.dataset.page === 'contact' ? 'Contact' : document.body.dataset.page === 'apropos' ? 'À propos' : document.body.dataset.page === 'experiences' ? 'Expériences' : document.body.dataset.page === 'projets' ? 'Projets' : 'Portfolio'} | Portfolio Data`;
  localStorage.setItem('portfolio-language', language);
  document.querySelectorAll('.language-toggle').forEach((button) => { button.innerHTML = language === 'fr' ? 'FR <span aria-hidden="true">|</span> EN' : 'EN <span aria-hidden="true">|</span> FR'; });
  document.querySelectorAll('.menu-label').forEach((label) => { label.textContent = language === 'en' ? 'Menu' : 'Menu'; });
}

function applyTheme(theme) {
  root.dataset.theme = theme === 'dark' ? 'dark' : 'light';
  localStorage.setItem('portfolio-theme', root.dataset.theme);
  document.querySelectorAll('.theme-toggle').forEach((button) => {
    const isDark = root.dataset.theme === 'dark';
    button.innerHTML = `<span aria-hidden="true">${isDark ? '☀' : '☾'}</span><span class="theme-label">${isDark ? 'Clair' : 'Cendré'}</span>`;
    button.setAttribute('aria-label', isDark ? 'Activer le thème clair' : 'Activer le thème sombre');
  });
}

document.querySelectorAll('.language-toggle').forEach((button) => button.addEventListener('click', () => applyLanguage(currentLanguage === 'fr' ? 'en' : 'fr')));
document.querySelectorAll('.theme-toggle').forEach((button) => button.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark')));
document.querySelectorAll('.nav-bar').forEach((nav, index) => {
  const menuId = nav.id || `site-nav-${index + 1}`;
  nav.id = menuId;
  const menuButton = document.createElement('button');
  menuButton.className = 'mobile-menu-toggle';
  menuButton.type = 'button';
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-controls', menuId);
  menuButton.innerHTML = '<span class="menu-icon" aria-hidden="true"><span></span><span></span><span></span></span><span class="menu-label">Menu</span>';
  nav.parentElement.insertBefore(menuButton, nav);
  const mobileLanguageToggle = document.createElement('button');
  mobileLanguageToggle.className = 'mobile-language-toggle language-toggle';
  mobileLanguageToggle.type = 'button';
  mobileLanguageToggle.setAttribute('aria-label', 'Changer de langue');
  mobileLanguageToggle.innerHTML = 'FR <span aria-hidden="true">|</span> EN';
  nav.appendChild(mobileLanguageToggle);
  mobileLanguageToggle.addEventListener('click', () => applyLanguage(currentLanguage === 'fr' ? 'en' : 'fr'));
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('is-open', !isOpen);
  });
  nav.querySelectorAll('.nav-link').forEach((link) => link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }));
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) document.querySelectorAll('.mobile-menu-toggle').forEach((button) => {
    button.setAttribute('aria-expanded', 'false');
    document.getElementById(button.getAttribute('aria-controls'))?.classList.remove('is-open');
  });
});
applyTheme(savedTheme);
applyLanguage(currentLanguage);

document.querySelectorAll('.nav-link').forEach((link) => {
  const pageName = link.getAttribute('href').replace('.html', '').replace('index', 'accueil');
  link.classList.toggle('active', pageName === currentPage);
});

function updateHeaderState() {
  if (!header) return;
  if (window.scrollY > 100) header.classList.replace('is-hero', 'is-compact');
  else if (window.scrollY < 30) header.classList.replace('is-compact', 'is-hero');
}

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

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const status = contactForm.querySelector('.form-status');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    status.textContent = currentLanguage === 'en' ? 'Sending...' : 'Envoi en cours...';
    submitButton.disabled = true;
    try {
      const response = await fetch(contactForm.action, { method: 'POST', body: new FormData(contactForm), headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('Request failed');
      status.textContent = currentLanguage === 'en' ? translations['Votre message a bien été envoyé. Merci !'] : 'Votre message a bien été envoyé. Merci !';
      contactForm.reset();
    } catch (error) {
      status.textContent = currentLanguage === 'en' ? translations['Une erreur est survenue. Réessayez plus tard.'] : 'Une erreur est survenue. Réessayez plus tard.';
    } finally { submitButton.disabled = false; }
  });
}
