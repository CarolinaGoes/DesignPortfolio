// client/src/lib/data.ts - VERSÃO CORRIGIDA

export const projectCategories = [
  { id: "all", nameKey: "projects.categories.all" },
  { id: "html-css", nameKey: "projects.categories.html-css" },
  { id: "javascript", nameKey: "projects.categories.javascript" },
  { id: "react", nameKey: "projects.categories.react" },
];

export const projects = [
  {
    id: 1,
    // As chaves que apontam para o arquivo de tradução
    titleKey: "projects.items.menuDoces.title",
    descriptionKey: "projects.items.menuDoces.description",
    imageAltKey: "projects.items.menuDoces.imageAlt",
    
    // Dados que não são texto e não mudam com o idioma
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&auto=format&fit=crop&w=800",
    tags: ["html", "css"],
    category: "html-css",
    demoLink: "https://menu-doces.vercel.app/",
    repoLink: "https://github.com/CarolinaGoes"
  }
  // Adicione outros projetos aqui
];

export const skills = {
  technologies: [
    { nameKey: "skills.items.htmlCss", icon: "html5-css3" },
    { nameKey: "skills.items.javascript", icon: "js-square" },
    { nameKey: "skills.items.react", icon: "react" },
    { nameKey: "skills.items.git", icon: "git-alt" },
    { nameKey: "skills.items.accessibility", icon: "universal-access" }
  ]
};

// O personalInfo agora contém APENAS dados que não são texto.
// Todo o resto (descrição, sobre, educação, experiência) foi movido
// para o arquivo de tradução JSON.
export const personalInfo = {
  name: "Carolina Goes",
  email: "carolinarocha.89@hotmail.com",
  socialLinks: {
    github: "https://github.com/CarolinaGoes",
    linkedin: "https://www.linkedin.com/in/carolina-goes/",
    whatsapp: "https://wa.me/5511972230817",
    codepen: "https://codepen.io/Carolina-Goes",
    email: "carolinarocha.89@hotmail.com"
  },
  aboutImage: "./assets/images/profile.jfif"
};
