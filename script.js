const translations = {
  fr: {
    skip: "Aller au contenu", menu: "Menu", navWork: "Projets", navAbout: "À propos", navContact: "Contact",
    available: "Disponible pour de nouvelles opportunités", heroA: "Je donne une", heroB: "voix visuelle", heroC: "aux idées.",
    intro: "Designer graphique, créatrice d’identités et développeuse frontend. Je transforme les concepts en marques cohérentes et en expériences numériques vivantes.",
    discover: "Découvrir", selected: "Sélection", projects: "Projets<br />choisis", caseStudies: "études de cas",
    filterAll: "Tout", filterIdentity: "Identité", filterDigital: "Digital", branding: "Branding", visualIdentity: "Identité visuelle", brandWorld: "Univers de marque",
    p1Title: "Mochi Monsters", p1Desc: "Une franchise de mascottes où chaque émotion devient un personnage, une collection et un produit à adopter.",
    p2Desc: "Une identité Instagram premium pour des citations, du mindset et des contenus destinés aux jeunes entrepreneurs.",
    p3Desc: "Une identité scandinave et naturelle pour un coffee shop fictif centré sur le café responsable et le brunch.",
    p4Desc: "Une marque et un parcours de commande pour un centre d’impression moderne inspiré de Bureau en Gros Canada.",
    aboutEyebrow: "À propos", aboutTitle: "Entre intuition visuelle<br />et logique numérique.",
    aboutP1: "Je suis Maria, designer graphique polyvalente avec un regard particulier pour les identités qui ont du caractère. Logo, système de marque, contenu social: je cherche toujours l’idée simple qui rend une marque mémorable.",
    aboutP2: "Ma pratique du frontend me permet d’aller plus loin: je ne pense pas seulement à l’apparence d’une interface, mais aussi à la façon dont elle bouge, répond et prend vie dans le navigateur.",
    service1: "Identité & branding", service1p: "Logos, chartes graphiques, systèmes visuels", service2: "Design digital", service2p: "Sites web, interfaces, contenu social",
    service3: "Frontend créatif", service3p: "React.js, Next.js, JavaScript, interfaces responsive", service4: "Community management", service4p: "Stratégie de contenu, création, cohérence de marque",
    viewCase: "Voir l’étude de cas", contactEyebrow: "Un projet, une équipe, une idée?", contactTitle: "Créons quelque chose", contactAccent: "qui compte.", backTop: "Retour en haut ↑"
  },
  en: {
    skip: "Skip to content", menu: "Menu", navWork: "Work", navAbout: "About", navContact: "Contact",
    available: "Available for new opportunities", heroA: "I give ideas", heroB: "a visual voice", heroC: "of their own.",
    intro: "Graphic designer, identity maker and frontend developer. I turn concepts into cohesive brands and vibrant digital experiences.",
    discover: "Explore", selected: "Selected work", projects: "Featured<br />projects", caseStudies: "case studies",
    filterAll: "All", filterIdentity: "Identity", filterDigital: "Digital", branding: "Branding", visualIdentity: "Visual identity", brandWorld: "Brand world",
    p1Title: "Mochi Monsters", p1Desc: "A mascot franchise where every emotion becomes a character, collection and product to adopt.",
    p2Desc: "A premium Instagram identity for quotes, mindset and content aimed at young entrepreneurs.",
    p3Desc: "A Scandinavian, natural identity for a fictional coffee shop focused on responsible coffee and brunch.",
    p4Desc: "A brand and ordering journey for a modern print centre inspired by Staples Canada.",
    aboutEyebrow: "About", aboutTitle: "Where visual instinct<br />meets digital logic.",
    aboutP1: "I’m Maria, a multidisciplinary graphic designer with a keen eye for identities that have character. From logos and brand systems to social content, I look for the simple idea that makes a brand memorable.",
    aboutP2: "My frontend practice lets me go further: I think not only about how an interface looks, but also how it moves, responds and comes alive in the browser.",
    service1: "Identity & branding", service1p: "Logos, brand guidelines, visual systems", service2: "Digital design", service2p: "Websites, interfaces, social content",
    service3: "Creative frontend", service3p: "React.js, Next.js, JavaScript, responsive interfaces", service4: "Community management", service4p: "Content strategy, creation, brand consistency",
    viewCase: "View case study", contactEyebrow: "A project, a team, an idea?", contactTitle: "Let’s make something", contactAccent: "that matters.", backTop: "Back to top ↑"
  }
};

const languageButtons = document.querySelectorAll("[data-lang]");

function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = translations[lang][element.dataset.i18n];
    if (value) element.innerHTML = value;
  });
  languageButtons.forEach((button) => {
    const active = button.dataset.lang === lang;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.title = lang === "fr" ? "Maria Ichtar — Design graphique & Frontend" : "Maria Ichtar — Graphic Design & Frontend";
  localStorage.setItem("maria-language", lang);
}

languageButtons.forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.lang)));
setLanguage(localStorage.getItem("maria-language") || "fr");

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  navigation.classList.toggle("open", !open);
});
navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("open");
}));

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".project").forEach((project) => {
      project.classList.toggle("hidden", filter !== "all" && !project.dataset.category.includes(filter));
    });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
document.querySelector("#year").textContent = new Date().getFullYear();
