import { useTranslation } from "react-i18next";

export const useData = () => {
  const { t } = useTranslation();

  const projectCategories = [
    { id: "all", name: t("projects.categories.all") },
    { id: "html-css", name: t("projects.categories.html-css") },
    { id: "javascript", name: t("projects.categories.javascript") },
    { id: "react", name: t("projects.categories.react") }
  ];

  const projects = [
    {
      id: 1,
      title: "Menu Doces",
      description: t("projects.projectDescriptions.menuDoces"),
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&auto=format&fit=crop&w=800",
      imageAlt: t("projects.imageAlt.menuDoces"),
      tags: ["html", "css"],
      category: "html-css",
      demoLink: "https://menu-doces.vercel.app/",
      repoLink: "https://github.com/CarolinaGoes"
    }
  ];

  const skills = {
    technologies: [
      { name: t("skills.tech.html"), icon: "html5-css3" },
      { name: t("skills.tech.js"), icon: "js-square" },
      { name: t("skills.tech.react"), icon: "react" },
      { name: t("skills.tech.git"), icon: "git-alt" },
      { name: t("skills.tech.accessibility"), icon: "universal-access" }
    ]
  };

  const personalInfo = {
    name: "Carolina Goes",
    title: t("personal.title"),
    description: t("personal.description"),
    email: "carolinarocha.89@hotmail.com",
    location: "São Paulo, SP - Brasil",
    imageAlt: t("personal.imageAlt"),
    about: [
      t("personal.about[0]"),
      t("personal.about[1]")
    ],
    education: [
      {
        degree: t("personal.education.degree1"),
        institution: t("personal.education.institution1"),
        year: t("personal.education.year1")
      },
      {
        degree: t("personal.education.degree2"),
        institution: t("personal.education.institution2"),
        year: t("personal.education.year2")
      },
      {
        degree: t("personal.education.degree3"),
        institution: t("personal.education.institution3"),
        year: t("personal.education.year3")
      }
    ],
    experience: [
      {
        role: t("personal.experience.job1.role"),
        company: t("personal.experience.job1.company"),
        period: t("personal.experience.job1.period")
      },
      {
        role: t("personal.experience.job2.role"),
        company: t("personal.experience.job2.company"),
        period: t("personal.experience.job2.period")
      },
      {
        role: t("personal.experience.job3.role"),
        company: t("personal.experience.job3.company"),
        period: t("personal.experience.job3.period")
      },
      {
        role: t("personal.experience.job4.role"),
        company: t("personal.experience.job4.company"),
        period: t("personal.experience.job4.period")
      },
      {
        role: t("personal.experience.job5.role"),
        company: t("personal.experience.job5.company"),
        period: t("personal.experience.job5.period")
      }
    ],
    socialLinks: {
      github: "https://github.com/CarolinaGoes",
      linkedin: "https://www.linkedin.com/in/carolina-goes/",
      whatsapp: "https://wa.me/5511972230817",
      codepen: "https://codepen.io/Carolina-Goes",
      email: "carolinarocha.89@hotmail.com"
    },
    aboutImage: "./assets/images/profile.jfif",
    aboutImageAlt: "Carolina Goes"
  };

  return { projectCategories, projects, skills, personalInfo };
};
