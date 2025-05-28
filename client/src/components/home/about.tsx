import { personalInfo } from '@/lib/data';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, slideRight } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, 
  Briefcase, 
  Download 
} from 'lucide-react';
import { profileImage } from '@/assets';

export default function About() {
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
                  alt={personalInfo.aboutImageAlt} 
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
              <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-bold mb-4">Sobre Mim</motion.h2>
              <motion.div variants={staggerItem} className="h-1 w-20 bg-primary rounded-full mb-6"></motion.div>

              {personalInfo.about.map((paragraph, index) => (
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
                  <motion.h3 variants={staggerItem} className="font-semibold text-lg mb-3">Educação</motion.h3>
                  <motion.ul variants={staggerContainer} className="space-y-2">
                    {personalInfo.education.map((edu, index) => (
                      <motion.li key={index} variants={staggerItem} className="flex items-start">
                       {index === 0 && (
                          <GraduationCap className="h-5 w-5 text-primary mt-1 mr-2" />
                        )}
                        <div>
                          <p className="font-medium">{edu.degree}</p>
                          <p className="text-sm text-muted-foreground">{edu.institution}, {edu.year}</p>
                        </div>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                <div>
                  <motion.h3 variants={staggerItem} className="font-semibold text-lg mb-3">Experiência</motion.h3>
                  <motion.ul variants={staggerContainer} className="space-y-2">
                    {personalInfo.experience.map((exp, index) => (
                      <motion.li key={index} variants={staggerItem} className="flex items-start">
                        <Briefcase className="h-5 w-5 text-primary mt-1 mr-2" />
                        <div>
                          <p className="font-medium">{exp.company}</p>
                          <p className="text-sm text-muted-foreground">{exp.role}, {exp.period}</p>
                        </div>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>

              <motion.div variants={staggerItem}>
                <a href="/CarolinaGoesCV.pdf" download>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    <span>Download CV</span>
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
