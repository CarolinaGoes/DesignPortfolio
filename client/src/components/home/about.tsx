// client/src/components/home/about.tsx

// --- PASSO 1: Mudar as importações ---
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, slideRight } from '../../lib/animations';
import { Button } from '../../components/ui/button';
import { GraduationCap, Briefcase } from 'lucide-react';
import profileImage from '@/assets/profileImage.jpg';
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// O seu custom hook de animação (mantido como está)
export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible] as const;
}


export default function About() {
  const [sectionRef, isSectionVisible] = useScrollAnimation();
  const [imageRef, isImageVisible] = useScrollAnimation();

  // --- PASSO 2: Ativar o hook e buscar os dados do JSON ---
  const { t } = useTranslation();
  
  // 2.1 - Buscamos os dados complexos (listas) do common.json
  const aboutParagraphs = t('personalInfo.about', { returnObjects: true });
  const educationList = t('personalInfo.education', { returnObjects: true });
  const experienceList = t('personalInfo.experience', { returnObjects: true });


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
                  // --- PASSO 3: Usar 't()' para textos simples ---
                  alt={t('personalInfo.imageAlt')}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-lg opacity-20 z-[-1]"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary rounded-lg opacity-20 z-[-1]"></div>
            </div>
          </motion.div>

          <div ref={sectionRef}>
            <motion.div
              initial="hidden"
              animate={isSectionVisible ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {/* Usando a chave do JSON para o título */}
              <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-bold mb-4">{t('about.title')}</motion.h2>
              <motion.div variants={staggerItem} className="h-1 w-20 bg-primary rounded-full mb-6"></motion.div>

              {/* --- PASSO 4: Usar as listas que buscamos do JSON --- */}
              {Array.isArray(aboutParagraphs) &&
                aboutParagraphs
                  .filter((paragraph): paragraph is string => typeof paragraph === "string")
                  .map((paragraph, index) => (
                    <motion.p
                      key={index}
                      variants={staggerItem}
                      className="text-muted-foreground mb-4"
                    >
                      {paragraph}
                    </motion.p>
                  ))}

              <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  {/* Usando a chave do JSON para o subtítulo */}
                  <motion.h3 variants={staggerItem} className="font-semibold text-lg mb-3">{t('about.education')}</motion.h3>
                  <motion.ul variants={staggerContainer} className="space-y-2">
                    {/* Mapeando a lista de educação vinda do JSON */}
                    {Array.isArray(educationList) &&
                      educationList
                        .filter(
                          (edu): edu is { degree: string; institution: string; year: string } =>
                            typeof edu === "object" &&
                            edu !== null &&
                            "degree" in edu &&
                            "institution" in edu &&
                            "year" in edu
                        )
                        .map(
                          (edu, index) => (
                            <motion.li key={index} variants={staggerItem} className="flex items-start">
                              <GraduationCap className="h-5 w-5 text-primary mt-1 mr-2" />
                              <div>
                                <p className="font-medium">{edu.degree}</p>
                                <p className="text-sm text-muted-foreground">
                                  {edu.institution}, {edu.year}
                                </p>
                              </div>
                            </motion.li>
                          )
                        )}
                  </motion.ul>
                </div>

                <div>
                  {/* Usando a chave do JSON para o subtítulo */}
                  <motion.h3 variants={staggerItem} className="font-semibold text-lg mb-3">{t('about.experience')}</motion.h3>
                  <motion.ul variants={staggerContainer} className="space-y-2">
                    {/* Mapeando a lista de experiência vinda do JSON */}
                    {Array.isArray(experienceList) &&
                      experienceList
                        .filter(
                          (exp): exp is { company: string; role: string; period: string } =>
                            typeof exp === "object" &&
                            exp !== null &&
                            "company" in exp &&
                            "role" in exp &&
                            "period" in exp
                        )
                        .map(
                          (exp, index) => (
                            <motion.li key={index} variants={staggerItem} className="flex items-start">
                              <Briefcase className="h-5 w-5 text-primary mt-1 mr-2" />
                              <div>
                                {/* A ordem aqui estava invertida, ajustei para ficar como no JSON */}
                                <p className="font-medium">{exp.role}</p>
                                <p className="text-sm text-muted-foreground">{exp.company}, {exp.period}</p>
                              </div>
                            </motion.li>
                          )
                        )
                    }
                  </motion.ul>
                </div>
              </motion.div>

              {/* Lembre-se de adicionar 'about.cvButton': 'Baixar CV' no seu JSON! */}
              <a href="/curriculo.pdf" download>
                <Button>
                  {t('about.cvButton', 'Download CV')}
                </Button>
              </a>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}