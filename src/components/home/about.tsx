import { useTranslation } from "react-i18next";
import { useScrollAnimation } from "../../lib/hooks/use-scroll-animation";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, slideRight } from "../../lib/animations";
import { FiBookOpen, FiBriefcase } from "react-icons/fi";
import profileImage from "../../../public/assets/profileImage.jpg";



export default function About() {
  const { t } = useTranslation();

  const rawParagraphs = t("about.paragraphs", { returnObjects: true });
  const paragraphs = Array.isArray(rawParagraphs) ? rawParagraphs : rawParagraphs ? [rawParagraphs] : [];

  const rawEducationItems = t("about.education.items", { returnObjects: true });
  const educationItems = Array.isArray(rawEducationItems) ? rawEducationItems : rawEducationItems ? [rawEducationItems] : [];

  const rawExperienceItems = t("about.experience.items", { returnObjects: true });
  const experienceItems = Array.isArray(rawExperienceItems) ? rawExperienceItems : rawExperienceItems ? [rawExperienceItems] : [];

  const [sectionRef, isSectionVisible] = useScrollAnimation<HTMLDivElement>();
  const [imageRef, isImageVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="about" className="py-16 md:py-24 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={imageRef}
            initial="hidden"
            animate={isImageVisible ? "visible" : "hidden"}
            variants={slideRight}
          >
            <div className="relative">
              <div className="w-full h-auto rounded-lg overflow-hidden">
                <img
                  src={profileImage}
                  alt={t("about.imageAlt")}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-lg opacity-20 z-[-1]" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary rounded-lg opacity-20 z-[-1]" />
            </div>
          </motion.div>

          <div ref={sectionRef}>
            <motion.div
              initial="hidden"
              animate={isSectionVisible ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.h2
                variants={staggerItem}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                {t("about.title")}
              </motion.h2>
              <motion.div
                variants={staggerItem}
                className="h-1 w-20 bg-primary rounded-full mb-6"
              />

              {Array.isArray(paragraphs) && paragraphs.length > 0 ? (
                paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    variants={staggerItem}
                    className="text-muted-foreground mb-4"
                  >
                    {paragraph}
                  </motion.p>
                ))
              ) : null}

              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-2 gap-6 mb-8"
              >
                <div>
                  <motion.h3
                    variants={staggerItem}
                    className="font-semibold text-lg mb-3"
                  >
                    {t("about.education.title")}
                  </motion.h3>
                  <motion.ul
                    variants={staggerContainer}
                    className="space-y-2"
                  >
                    {educationItems.map((edu, index) => (
                      <motion.li
                        key={index}
                        variants={staggerItem}
                        className="flex items-start"
                      >
                        <FiBookOpen className="h-5 w-5 text-primary mt-1 mr-2" />
                        <div>
                          <p className="font-medium">{edu.degree}</p>
                          <p className="text-sm text-muted-foreground">
                            {edu.institution}, {edu.year}
                          </p>
                        </div>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                <div>
                  <motion.h3
                    variants={staggerItem}
                    className="font-semibold text-lg mb-3"
                  >
                    {t("about.experience.title")}
                  </motion.h3>
                  <motion.ul
                    variants={staggerContainer}
                    className="space-y-2"
                  >
                    {experienceItems.map((exp, index) => (
                      <motion.li
                        key={index}
                        variants={staggerItem}
                        className="flex items-start"
                      >
                        <FiBriefcase className="h-5 w-5 text-primary mt-1 mr-2" />
                        <div>
                          <p className="font-medium">{exp.role}</p>
                          <p className="text-sm text-muted-foreground">
                            {exp.company}, {exp.period}
                          </p>
                        </div>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>

              <motion.div variants={staggerItem}>
              
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
