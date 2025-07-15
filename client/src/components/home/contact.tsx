import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { siteData } from '@/lib/data'; // Usando o novo data.ts enxuto
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { insertMessageSchema } from '../shared/schema';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin, FiPhone } from 'react-icons/fi';

export default function Contact() {
  const { t } = useTranslation();
  const [sectionRef, isSectionVisible] = useScrollAnimation<HTMLDivElement>();
  const { toast } = useToast();

  const formSchema = insertMessageSchema.extend({
    email: z.string().email(t('contact.validation.email')),
    name: z.string().min(3, t('contact.validation.nameMin')),
    subject: z.string().min(2, t('contact.validation.subjectRequired')),
    message: z.string().min(10, t('contact.validation.messageMin'))
  });

  type FormData = z.infer<typeof formSchema>;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' }
  });

  const sendMessageMutation = useMutation({
    mutationFn: (data: FormData) => apiRequest('POST', '/api/contact', data),
    onSuccess: () => {
      toast({
        title: t('contact.toast.successTitle'),
        description: t('contact.toast.successDescription')
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: t('contact.toast.errorTitle'),
        description: error instanceof Error ? error.message : t('contact.toast.errorDescription'),
        variant: "destructive"
      });
    }
  });

  const onSubmit = async (data: FormData) => {
    await sendMessageMutation.mutateAsync(data);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-secondary/50 dark:bg-accent/5 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="text-center mb-16">
          <motion.div initial="hidden" animate={isSectionVisible ? "visible" : "hidden"} variants={staggerContainer}>
            <motion.h2 variants={staggerItem} className="section-heading">{t('contact.title')}</motion.h2>
            <motion.div variants={staggerItem} className="section-divider"></motion.div>
            <motion.p variants={staggerItem} className="section-description">{t('contact.description')}</motion.p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm
            t={t}
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            isSubmitting={isSubmitting || sendMessageMutation.isPending}
          />
          <ContactInfo t={t} />
        </div>
      </div>
    </section>
  );
}

// Tipagem das Props
interface ContactFormProps {
  t: (key: string, options?: any) => string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  register: any;
  errors: any;
  isSubmitting: boolean;
}

function ContactForm({ t, onSubmit, register, errors, isSubmitting }: ContactFormProps) {
  const [formRef, isFormVisible] = useScrollAnimation<HTMLFormElement>();
  const subjectOptions = t('contact.form.subjectOptions', { returnObjects: true }) as { value: string, label: string }[];

  return (
    <motion.form
      ref={formRef}
      onSubmit={onSubmit}
      className="bg-card rounded-xl shadow-md p-8"
      initial="hidden"
      animate={isFormVisible ? "visible" : "hidden"}
      variants={staggerContainer}
      noValidate
    >
      <motion.div variants={staggerItem} className="mb-6">
        <label htmlFor="name" className="block font-medium mb-2">{t('contact.form.nameLabel')}</label>
        <Input id="name" placeholder={t('contact.form.namePlaceholder')} {...register("name")} aria-invalid={!!errors.name} aria-required="true" />
        {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message as string}</p>}
      </motion.div>

      <motion.div variants={staggerItem} className="mb-6">
        <label htmlFor="email" className="block font-medium mb-2">{t('contact.form.emailLabel')}</label>
        <Input type="email" id="email" placeholder={t('contact.form.emailPlaceholder')} {...register("email")} aria-invalid={!!errors.email} aria-required="true" />
        {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message as string}</p>}
      </motion.div>

      <motion.div variants={staggerItem} className="mb-6">
        <label htmlFor="subject" className="block font-medium mb-2">{t('contact.form.subjectLabel')}</label>
        <select id="subject" className="w-full px-4 py-3 rounded-lg border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" {...register("subject")} aria-invalid={!!errors.subject} aria-required="true" defaultValue="">
          {subjectOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.value === ""}>{option.label}</option>
          ))}
        </select>
        {errors.subject && <p className="mt-1 text-sm text-destructive">{errors.subject.message as string}</p>}
      </motion.div>

      <motion.div variants={staggerItem} className="mb-6">
        <label htmlFor="message" className="block font-medium mb-2">{t('contact.form.messageLabel')}</label>
        <Textarea id="message" rows={5} placeholder={t('contact.form.messagePlaceholder')} {...register("message")} aria-invalid={!!errors.message} aria-required="true" />
        {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message.message as string}</p>}
      </motion.div>

      <motion.div variants={staggerItem}>
        <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={isSubmitting}>
          <span>{t('contact.form.submitButton')}</span>
          <FiSend className="h-4 w-4" />
        </Button>
      </motion.div>
    </motion.form>
  );
}

function ContactInfo({ t }: { t: (key: string) => string }) {
  const [infoRef, isInfoVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <motion.div
      ref={infoRef}
      className="bg-card rounded-xl shadow-md p-8 h-full"
      initial="hidden"
      animate={isInfoVisible ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      <motion.h3 variants={staggerItem} className="text-2xl font-semibold mb-6">{t('contact.info.title')}</motion.h3>
      <motion.div variants={staggerContainer} className="space-y-6">
        <motion.div variants={staggerItem} className="flex items-start">
          <div className="bg-secondary dark:bg-muted p-3 rounded-full mr-4"><FiMail className="h-5 w-5 text-primary" /></div>
          <div>
            <h4 className="font-medium mb-1">{t('contact.info.emailLabel')}</h4>
            <a href={`mailto:${siteData.email}`} className="text-primary hover:underline">{siteData.email}</a>
          </div>
        </motion.div>
        <motion.div variants={staggerItem} className="flex items-start">
          <div className="bg-secondary dark:bg-muted p-3 rounded-full mr-4"><FiMapPin className="h-5 w-5 text-primary" /></div>
          <div>
            <h4 className="font-medium mb-1">{t('contact.info.locationLabel')}</h4>
            <p className="text-muted-foreground">{t('contact.info.locationValue')}</p>
          </div>
        </motion.div>
      </motion.div>
      <motion.div variants={staggerItem} className="mt-10">
        <h4 className="font-medium mb-4">{t('contact.info.socialTitle')}</h4>
        <div className="flex space-x-4">
          <a href={siteData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label={t('contact.socials.github')}><FiGithub className="h-5 w-5" /></a>
          <a href={siteData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label={t('contact.socials.linkedin')}><FiLinkedin className="h-5 w-5" /></a>
          <a href={siteData.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label={t('contact.socials.whatsapp')}><FiPhone className="h-5 w-5" /></a>
          <a href={`mailto:${siteData.email}`} className="social-icon" aria-label={t('contact.socials.email')}><FiMail className="h-5 w-5" /></a>
        </div>
      </motion.div>
    </motion.div>
  );
}