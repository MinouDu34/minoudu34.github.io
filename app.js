fetch('experiences.json')
  .then(response => response.json())
  .then(data => {
    // Ici, 'data' contient le tableau d'expériences
    window.experiences = data;
    renderExperiences();
  })
  .catch(error => console.error('Erreur de chargement:', error));

// Supprimez ou commentez la déclaration suivante :
// const experiences = [ ... ];

// Données des compétences techniques
const competencesTechniques = {
  "Programmation": ["Python", "NodeJS", "Javascript", "HTML5/CSS", "R"],
  "Frameworks": ["Pandas", "Numpy", "Seaborn", "PySpark", "Django", "JQuery", "ExpressJS", "PrismaJS", "D3.js", "pytorch", "scikit-learn", "Jupyter"],
  "Bases de données": ["MySQL", "MariaDB", "PostgreSQL", "MongoDB"],
  "Outils de développement": ["Visual Studio Code", "Eclipse", "Git", "QGIS", "Skywise", "Cuda"],
  "Format de données": ["JSON", "XML"],
  "Déploiement": ["Docker", "Scaleway", "Heroku", "Spark", "Airflow"],
  "Systèmes d'exploitation": ["Mac OS X", "Windows Server", "Windows", "Linux"],
  "Modélisation de données": ["UML", "Merise (MCD - MOD)"],
  "Modélisation statistique": ["Régression logistiques", "Régression log-linéaire", "Régression linéaire", "ANOVA", "Kmeans", "SVM", "Random forest"],
  "Bureautique": ["LATEX", "Office 365", "Postman", "PowerBI"],
  "Méthode": ["Agile"]
};

// Couleurs par domaine professionnel
const domainColors = {
  "Aéronautique": "#ff6b9d",
  "Pharmaceutique": "#8b5cf6",
  "Conseil": "#ec4899",
  "Conseil Télécom et Digital": "#ff6b9d",
  "Santé Digitale": "#8b5cf6",
  "Formation": "#ec4899"
};

/**
 * Système de thème amélioré
 * Utilise localStorage pour la persistance et les préférences système pour le mode auto
 */
const ThemeManager = {
  // Les thèmes possibles
  THEMES: {
    AUTO: 'auto',
    LIGHT: 'light',
    DARK: 'dark'
  },
  
  // Clé pour stocker le thème dans localStorage
  STORAGE_KEY: 'lucas-portfolio-theme-preference',
  
  // Le thème actuel
  currentTheme: null,
  
  // L'objet MediaQueryList pour détecter les préférences système
  systemPreference: null,
  
  // Initialisation du système de thème
  init() {
    console.log('Initialisation du système de thème...');
    
    // Récupérer les préférences système
    this.systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Récupérer le thème stocké ou utiliser auto par défaut
    const savedTheme = this.getSavedTheme();
    
    // Initialiser les boutons de thème
    this.setupThemeButtons();
    
    // Écouter les changements de préférence système
    this.listenToSystemChanges();
    
    // Appliquer le thème initial
    this.setTheme(savedTheme);
    
    console.log(`Thème initial appliqué: ${savedTheme}`);
  },
  
  // Récupérer le thème sauvegardé dans localStorage ou retourner 'auto' par défaut
  getSavedTheme() {
    try {
      const savedTheme = localStorage.getItem(this.STORAGE_KEY);
      if (savedTheme && Object.values(this.THEMES).includes(savedTheme)) {
        return savedTheme;
      }
    } catch (error) {
      console.warn('Erreur lors de l\'accès à localStorage:', error);
    }
    return this.THEMES.AUTO; // Valeur par défaut
  },
  
  // Sauvegarder le thème dans localStorage
  saveTheme(theme) {
    try {
      localStorage.setItem(this.STORAGE_KEY, theme);
    } catch (error) {
      console.warn('Erreur lors de la sauvegarde du thème:', error);
    }
  },
  
  // Configurer les boutons de thème
  setupThemeButtons() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    themeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');
        this.setTheme(theme);
      });
    });
  },
  
  // Écouter les changements de préférence système
  listenToSystemChanges() {
    this.systemPreference.addEventListener('change', (e) => {
      console.log(`Préférence système modifiée: ${e.matches ? 'dark' : 'light'}`);
      // Si en mode auto, appliquer la nouvelle préférence système
      if (this.currentTheme === this.THEMES.AUTO) {
        this.applyTheme(this.THEMES.AUTO);
      }
    });
  },
  
  // Changer le thème
  setTheme(theme) {
    if (!Object.values(this.THEMES).includes(theme)) {
      console.warn(`Thème non valide: ${theme}, utilisation de 'auto'`);
      theme = this.THEMES.AUTO;
    }
    
    this.currentTheme = theme;
    this.saveTheme(theme);
    this.applyTheme(theme);
    this.updateActiveButton(theme);
  },
  
  // Appliquer le thème au document
  applyTheme(theme) {
    // Déterminer quel thème appliquer concrètement (light/dark)
    const effectiveTheme = theme === this.THEMES.AUTO
      ? (this.systemPreference.matches ? this.THEMES.DARK : this.THEMES.LIGHT)
      : theme;
    
    console.log(`Application du thème: ${theme} (effectif: ${effectiveTheme})`);
    
    // Appliquer le thème avec setAttribute (plutôt que classList)
    document.documentElement.setAttribute('data-color-scheme', effectiveTheme);
    
    // Forcer un redraw pour certains navigateurs qui peuvent avoir des problèmes de rendu
    this.forceRedraw();
  },
  
  // Mettre à jour le bouton actif
  updateActiveButton(theme) {
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-theme') === theme) {
        btn.classList.add('active');
      }
    });
  },
  
  // Forcer un redraw du document
  forceRedraw() {
    // Cette technique force un redraw dans la plupart des navigateurs
    const docEl = document.documentElement;
    const display = docEl.style.display;
    
    docEl.style.display = 'none';
    // eslint-disable-next-line no-unused-expressions
    void docEl.offsetHeight; // Déclenche un reflow
    docEl.style.display = display;
  }
};

// Fonction pour l'effet de halo qui suit la souris (améliorée)
function initMouseGlow() {
  const mouseGlow = document.getElementById('mouse-glow');
  let isOverElement = false;
  
  function updateMousePosition(e) {
    if (!isOverElement) {
      const x = e.clientX;
      const y = e.clientY;
      mouseGlow.style.left = x + 'px';
      mouseGlow.style.top = y + 'px';
      
      // Changer la couleur selon la position avec des couleurs plus douces
      const hue = (e.clientX / window.innerWidth) * 60 + 280; // Entre 280 et 340 (violet/rose)
      mouseGlow.style.background = `radial-gradient(circle, hsla(${hue}, 60%, 65%, 0.2) 0%, transparent 70%)`;
    }
  }
  
  document.addEventListener('mousemove', throttle(updateMousePosition, 16));
  
  // Désactiver le halo sur les éléments interactifs pour améliorer la lisibilité
  function setupHaloToggle() {
    const interactiveElements = document.querySelectorAll('button, a, .experience-card, .formation-card, .tech-category, .tech-item, .domain-badge, .about-presentation');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        isOverElement = true;
        mouseGlow.style.opacity = '0';
      });
      
      el.addEventListener('mouseleave', () => {
        isOverElement = false;
        mouseGlow.style.opacity = '0.4';
      });
    });
  }
  
  // Délai pour s'assurer que tous les éléments sont chargés
  setTimeout(setupHaloToggle, 500);
}

// Navigation entre les sections
function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.section');
  
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSection = btn.getAttribute('data-section');
      
      // Mettre à jour les boutons de navigation
      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Afficher la section correspondante avec une transition douce
      sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === targetSection) {
          section.classList.add('active');
          
          // Animer le contenu spécifique de chaque section
          if (targetSection === 'experiences') {
            setTimeout(animateExperienceCards, 200);
          } else if (targetSection === 'technologies') {
            if (!document.querySelector('.tech-grid').children.length) {
              renderTechnologies();
            }
            setTimeout(animateTechCategories, 200);
          } else if (targetSection === 'formation') {
            setTimeout(animateFormationCards, 200);
          }
        }
      });
    });
  });
}

// Générer et afficher les expériences
function renderExperiences() {
  const timeline = document.getElementById('timeline');
  timeline.innerHTML = '';
  
  experiences.forEach((exp, index) => {
    const card = document.createElement('div');
    card.className = 'experience-card';
    card.setAttribute('data-domain', exp.domaine);
    
    const techBadges = exp.technologies.map(tech => 
      `<span class="tech-badge">${tech}</span>`
    ).join('');
    
    const achievements = exp.realisations.map(achievement => 
      `<li>${achievement}</li>`
    ).join('');
    
    card.innerHTML = `
      <div class="experience-period">${exp.periode}</div>
      <h3 class="experience-position">${exp.poste}</h3>
      <div class="experience-company">${exp.entreprise} - ${exp.lieu}</div>
      <div class="experience-domain" style="background-color: ${domainColors[exp.domaine]}">${exp.domaine}</div>
      <div class="experience-objectives">${exp.objectifs}</div>
      <ul class="experience-achievements">${achievements}</ul>
      <div class="experience-technologies">${techBadges}</div>
    `;
    
    timeline.appendChild(card);
  });
}

// Animer les cartes d'expérience en cascade
function animateExperienceCards() {
  const cards = document.querySelectorAll('.experience-card:not([style*="display: none"])');
  
  cards.forEach((card, index) => {
    card.classList.remove('animate');
    setTimeout(() => {
      card.classList.add('animate');
    }, index * 100);
  });
}

// Animer les cartes de formation
function animateFormationCards() {
  const cards = document.querySelectorAll('.formation-card');
  
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 150);
  });
}

// Animer les catégories de technologies
function animateTechCategories() {
  const categories = document.querySelectorAll('.tech-category');
  
  categories.forEach((category, index) => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(20px)';
    setTimeout(() => {
      category.style.opacity = '1';
      category.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// Filtrage des expériences par domaine
function initDomainFilters() {
  const filterButtons = document.querySelectorAll('.domain-filter');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const domain = btn.getAttribute('data-domain');
      
      // Mettre à jour les boutons de filtre
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filtrer les cartes avec animation
      const cards = document.querySelectorAll('.experience-card');
      cards.forEach(card => {
        const cardDomain = card.getAttribute('data-domain');
        card.classList.remove('animate');
        
        if (domain === 'all' || cardDomain === domain) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
      
      // Réanimer les cartes visibles
      setTimeout(animateExperienceCards, 150);
    });
  });
}

// Générer et afficher les technologies
function renderTechnologies() {
  const techGrid = document.getElementById('tech-grid');
  techGrid.innerHTML = '';
  
  for (const [category, techs] of Object.entries(competencesTechniques)) {
    const categoryEl = document.createElement('div');
    categoryEl.className = 'tech-category';
    
    const techItems = techs.map(tech => 
      `<span class="tech-item">${tech}</span>`
    ).join('');
    
    categoryEl.innerHTML = `
      <h3 class="tech-category-title">${category}</h3>
      <div class="tech-list">${techItems}</div>
    `;
    
    techGrid.appendChild(categoryEl);
  }
}

// Fonctions utilitaires: Throttle pour optimiser mousemove et scroll
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Gestion des préférences reduced-motion
function respectReducedMotion() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  function updateAnimations(shouldReduce) {
    if (shouldReduce) {
      document.documentElement.style.setProperty('--duration-normal', '50ms');
      document.documentElement.style.setProperty('--duration-fast', '50ms');
    } else {
      document.documentElement.style.setProperty('--duration-normal', '250ms');
      document.documentElement.style.setProperty('--duration-fast', '150ms');
    }
  }
  
  updateAnimations(prefersReducedMotion.matches);
  prefersReducedMotion.addEventListener('change', (e) => updateAnimations(e.matches));
}

// Améliorer l'accessibilité des liens
function setupAccessibleLinks() {
  // S'assurer que tous les liens externes s'ouvrent dans un nouvel onglet
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.hasAttribute('target')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
  
  // S'assurer que les liens mailto fonctionnent correctement
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', (e) => {
      // Le comportement par défaut du navigateur pour mailto: est déjà correct
      console.log('Ouverture du client email pour:', link.href);
    });
  });
}

// Fonction de débogage pour afficher l'état actuel du thème
function debugTheme() {
  console.table({
    "Thème courant": ThemeManager.currentTheme,
    "Attribut HTML": document.documentElement.getAttribute('data-color-scheme'),
    "Préférence système": ThemeManager.systemPreference.matches ? 'dark' : 'light',
    "localStorage": localStorage.getItem(ThemeManager.STORAGE_KEY)
  });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initialisation du site de Lucas Nieder-Fioletti');
  
  // Initialiser le système de thème en premier
  ThemeManager.init();
  
  // Générer le contenu des expériences
  renderExperiences();
  
  // Initialiser la navigation
  initNavigation();
  
  // Initialiser les filtres
  initDomainFilters();
  
  // Initialiser l'effet de halo
  initMouseGlow();
  
  // Configurer l'accessibilité
  respectReducedMotion();
  setupAccessibleLinks();
  
  // Animer la première section (À propos) par défaut
  setTimeout(() => {
    const aboutSection = document.getElementById('about');
    if (aboutSection && aboutSection.classList.contains('active')) {
      const elementsToAnimate = aboutSection.querySelectorAll('.about-presentation, .forces, .competences-domains');
      elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, index * 150);
      });
    }
  }, 300);
  
  console.log('Initialisation terminée');
  
  // Déboguer le thème si nécessaire
  debugTheme();
});

// Gestion d'erreurs globale
window.addEventListener('error', (e) => {
  console.error('Erreur JavaScript détectée:', e.error);
});

// Optimisation du rafraîchissement
window.addEventListener('beforeunload', () => {
  // Nettoyer les event listeners si nécessaire
  document.removeEventListener('mousemove', updateMousePosition);
});
