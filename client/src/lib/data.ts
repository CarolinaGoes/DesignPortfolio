export const projectCategories = [
  { id: "all", name: "Todos" },
  { id: "html-css", name: "HTML/CSS" },
  { id: "javascript", name: "JavaScript" },
  { id: "react", name: "React" },
  { id: "tailwind", name: "Tailwind" },
  { id: "vue", name: "Vue.js" },
  { id: "php", name: "PHP" }
];

export const projects = [
  {
    id: 1,
    title: "E-commerce Modern",
    description: "Plataforma de comércio eletrônico completa com recursos de acessibilidade, filtros avançados e experiência de compra otimizada.",
    image: "/images/profile.jpeg",
    imageAlt: "Imagem de Carolina Goes",
    tags: ["React", "Tailwind", "Acessibilidade"],
    category: "react",
    demoLink: "#",
    repoLink: "https://github.com/CarolinaGoes"
  },
  {
    id: 2,
    title: "Dashboard Analytics",
    description: "Dashboard interativo com visualização de dados em tempo real, gráficos acessíveis e recursos de exportação de relatórios.",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&auto=format&fit=crop&w=800",
    imageAlt: "Screenshot do dashboard de análise de dados",
    tags: ["Vue.js", "D3.js", "Firebase"],
    category: "vue",
    demoLink: "#",
    repoLink: "https://github.com/CarolinaGoes"
  },
  {
    id: 3,
    title: "TodoFlow Pro",
    description: "Aplicativo de gerenciamento de tarefas com categorização inteligente, lembretes personalizados e sincronização entre dispositivos.",
    image: "https://images.unsplash.com/photo-1601430854328-26d0d85ca7bf?q=80&auto=format&fit=crop&w=800",
    imageAlt: "Screenshot do aplicativo de tarefas",
    tags: ["React", "TypeScript", "Redux"],
    category: "react",
    demoLink: "#",
    repoLink: "https://github.com/CarolinaGoes"
  },
  {
    id: 4,
    title: "Sistema CMS Corporativo",
    description: "Sistema de gerenciamento de conteúdo completo para empresas, com painel administrativo, templates personalizáveis e integrações.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&auto=format&fit=crop&w=800",
    imageAlt: "Screenshot do sistema CMS",
    tags: ["PHP", "MySQL", "Bootstrap"],
    category: "php",
    demoLink: "#",
    repoLink: "https://github.com/CarolinaGoes"
  },
  {
    id: 5,
    title: "App Financeiro",
    description: "Aplicativo mobile para gestão de finanças pessoais com gráficos detalhados, controle de orçamento e recursos de planejamento.",
    image: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&auto=format&fit=crop&w=800",
    imageAlt: "Interface do aplicativo financeiro",
    tags: ["JavaScript", "Firebase", "ChartJS"],
    category: "javascript",
    demoLink: "#",
    repoLink: "https://github.com/CarolinaGoes"
  },
  {
    id: 6,
    title: "Portfólio Criativo",
    description: "Site responsivo para exibição de trabalhos criativos com filtros dinâmicos, zoom em imagens e animações suaves.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&auto=format&fit=crop&w=800",
    imageAlt: "Screenshot do site de portfólio",
    tags: ["HTML5", "CSS3", "JavaScript"],
    category: "html-css",
    demoLink: "#",
    repoLink: "https://github.com/CarolinaGoes"
  },
  {
    id: 7,
    title: "API de Pagamentos",
    description: "API segura e escalável para processamento de pagamentos online com integração a múltiplos gateways e sistema anti-fraude.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&auto=format&fit=crop&w=800",
    imageAlt: "Diagrama de API de pagamentos",
    tags: ["PHP", "Laravel", "API REST"],
    category: "php",
    demoLink: "#",
    repoLink: "https://github.com/CarolinaGoes"
  },
  {
    id: 8,
    title: "Interface de Dashboard",
    description: "Interface moderna e responsiva para dashboard administrativo com componentes reutilizáveis e tema customizável.",
    image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&auto=format&fit=crop&w=800",
    imageAlt: "Screenshot do dashboard administrativo",
    tags: ["Tailwind", "Alpine.js", "HTML5"],
    category: "tailwind",
    demoLink: "#",
    repoLink: "https://github.com/CarolinaGoes"
  }
];

export const skills = {
  technologies: [
    { name: "HTML5 & CSS3", icon: "html5-css3" },
    { name: "JavaScript / TypeScript", icon: "js-square" },
    { name: "React", icon: "react" },
    { name: "Vue.js", icon: "vuejs" },
    { name: "Angular", icon: "angular" },
    { name: "UI/UX Design", icon: "figma" },
    { name: "Sass/SCSS", icon: "sass" },
    { name: "Git", icon: "git-alt" },
    { name: "Node.js", icon: "node-js" },
    { name: "MongoDB", icon: "database" },
    { name: "Acessibilidade Web", icon: "universal-access" }
  ]
};

export const personalInfo = {
  name: "Carolina Goes",
  title: "Desenvolvedora Frontend",
  description: "Transformando ideias em experiências digitais incríveis com foco em acessibilidade, usabilidade e design moderno.",
  email: "contato@carolinagoes.dev",
  location: "São Paulo, SP - Brasil",
  availability: "Segunda a Sexta, 9h às 18h",
  image: "/images/profile.jpeg",
  imageAlt: "Foto de perfil de Carolina Goes",
  about: [
    "Olá! Sou Carolina, desenvolvedora frontend com 5 anos de experiência criando interfaces interativas e acessíveis. Minha paixão está em transformar designs complexos em experiências de usuário intuitivas e inclusivas.",
    "Tenho especialização em frameworks modernos como React, Vue.js e Angular, além de amplo conhecimento em técnicas de acessibilidade web e otimização de performance.",
    "Durante minha carreira, trabalhei com grandes empresas e startups, ajudando a construir produtos digitais que atendem milhões de usuários. Estou sempre aprendendo novas tecnologias e compartilhando conhecimento com a comunidade."
  ],
  education: [
    {
      degree: "Ciência da Computação",
      institution: "Universidade Federal",
      year: "2018"
    },
    {
      degree: "UX/UI Design",
      institution: "Design Academy",
      year: "2019"
    }
  ],
  experience: [
    {
      role: "Senior Frontend Dev",
      company: "TechCorp Inc.",
      period: "2020-Atual"
    },
    {
      role: "Frontend Developer",
      company: "StartupXYZ",
      period: "2018-2020"
    }
  ],
  socialLinks: {
    github: "https://github.com/CarolinaGoes",
    linkedin: "https://www.linkedin.com/in/carolina-goes/",
    whatsapp: "https://wa.me/5511999999999",
    codepen: "#",
    email: "mailto:contato@carolinagoes.dev"
  },
  aboutImage: "/images/profile.jpeg",
  aboutImageAlt: "Carolina Goes trabalhando em seu computador"
};