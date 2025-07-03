import { personalInfo } from '@/lib/data';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Send, Github, Linkedin, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertMessageSchema } from '@shared/validation';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

const formSchema = insertMessageSchema.extend({
  email: z.string().email("Por favor, insira um email válido"),
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  subject: z.string().min(2, "Por favor, selecione um assunto"),
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres")
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const { t } = useTranslation();
  const [sectionRef, isSectionVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="contact" className="py-16 md:py-24 bg-secondary/50 dark:bg-accent/5 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="text-center mb-16">
          <motion.div
            initial="hidden"
            animate={isSectionVisible ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h2 variants={staggerItem} className="section-heading">{t('contact.title')}</motion.h2>
            <motion.div variants={staggerItem} className="section-divider"></motion.div>
            <motion.p variants={staggerItem} className="section-description">
              {t('contact.description')}
            </motion.p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formRef, isFormVisible] = useScrollAnimation<HTMLFormElement>();

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const sendMessageMutation = useMutation({
    mutationFn: (data: FormData) => apiRequest('POST', '/api/contact', data),
    onSuccess: () => {
      toast({
        title: t('contact.messageSent'),
        description: t('contact.messageSentDescription')
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: t('contact.messageError'),
        description: error instanceof Error ? error.message : t('contact.messageErrorDescription'),
        variant: "destructive"
      });
    }
  });

  const onSubmit = async (data: FormData) => {
    await sendMessageMutation.mutateAsync(data);
  };

  return (
    <motion.form 
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card rounded-xl shadow-md p-8"
      initial="hidden"
      animate={isFormVisible ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      <motion.div variants={staggerItem} className="mb-6">
        <label htmlFor="name" className="block font-medium mb-2">{t('contact.form.name')}</label>
        <Input 
          id="name" 
          placeholder={t('contact.form.namePlaceholder')}
          {...register("name")}
          aria-invalid={errors.name ? "true" : "false"}
          aria-required="true"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-destructive">{errors.name.message as string}</p>
        )}
      </motion.div>

      <motion.div variants={staggerItem} className="mb-6">
        <label htmlFor="email" className="block font-medium mb-2">{t('contact.form.email')}</label>
        <Input 
          type="email" 
          id="email" 
          placeholder={t('contact.form.emailPlaceholder')}
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
          aria-required="true"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">{errors.email.message as string}</p>
        )}
      </motion.div>

      <motion.div variants={staggerItem} className="mb-6">
        <label htmlFor="subject" className="block font-medium mb-2">{t('contact.form.subject')}</label>
        <select 
          id="subject" 
          className="w-full px-4 py-3 rounded-lg border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          {...register("subject")}
          aria-invalid={errors.subject ? "true" : "false"}
          aria-required="true"
        >
          <option value="" disabled>{t('contact.form.subjectPlaceholder')}</option>
          <option value="project">{t('contact.form.optionProject')}</option>
          <option value="job">{t('contact.form.optionJob')}</option>
          <option value="collaboration">{t('contact.form.optionCollaboration')}</option>
          <option value="other">{t('contact.form.optionOther')}</option>
        </select>
        {errors.subject && (
          <p className="mt-1 text-sm text-destructive">{errors.subject.message as string}</p>
        )}
      </motion.div>

      <motion.div variants={staggerItem} className="mb-6">
        <label htmlFor="message" className="block font-medium mb-2">{t('contact.form.message')}</label>
        <Textarea 
          id="message" 
          rows={5} 
          placeholder={t('contact.form.messagePlaceholder')}
          {...register("message")}
          aria-invalid={errors.message ? "true" : "false"}
          aria-required="true"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-destructive">{errors.message.message as string}</p>
        )}
      </motion.div>

      <motion.div variants={staggerItem}>
        <Button 
          type="submit" 
          className="w-full flex items-center justify-center gap-2"
          disabled={isSubmitting || sendMessageMutation.isPending}
        >
          <span>{t('contact.form.submit')}</span>
          <Send className="h-4 w-4" />
        </Button>
      </motion.div>
    </motion.form>
  );
}

function ContactInfo() {
  const { t } = useTranslation();
  const [infoRef, isInfoVisible] = useScrollAnimation<HTMLDivElement>();
  
  return (
    <motion.div 
      ref={infoRef}
      className="bg-card rounded-xl shadow-md p-8 h-full"
      initial="hidden"
      animate={isInfoVisible ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      <motion.h3 variants={staggerItem} className="text-2xl font-semibold mb-6">{t('contact.infoTitle')}</motion.h3>
      
      <motion.div variants={staggerContainer} className="space-y-6">
        <motion.div variants={staggerItem} className="flex items-start">
          <div className="bg-secondary dark:bg-muted p-3 rounded-full mr-4">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium mb-1">{t('contact.infoEmail')}</h4>
            <a href={`mailto:${personalInfo.email}`} className="text-primary hover:underline">
              {personalInfo.email}
            </a>
          </div>
        </motion.div>
        
        <motion.div variants={staggerItem} className="flex items-start">
          <div className="bg-secondary dark:bg-muted p-3 rounded-full mr-4">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium mb-1">{t('contact.infoLocation')}</h4>
            <p className="text-muted-foreground">{t('personalInfo.location')}</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div variants={staggerItem} className="mt-10">
        <h4 className="font-medium mb-4">{t('contact.orReachOut')}</h4>
        <div className="flex space-x-4">
          <a 
            href={personalInfo.socialLinks.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-secondary dark:bg-muted text-primary p-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300" 
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a 
            href={personalInfo.socialLinks.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-secondary dark:bg-muted text-primary p-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300" 
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a 
            href={personalInfo.socialLinks.whatsapp} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-secondary dark:bg-muted text-primary p-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300" 
            aria-label="WhatsApp"
          >
            <Phone className="h-5 w-5" />
          </a>
          <a 
            href={`mailto:${personalInfo.email}`} 
            className="bg-secondary dark:bg-muted text-primary p-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300" 
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}