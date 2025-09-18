import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { siteData } from '@/lib/data';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin, FiPhone } from 'react-icons/fi';
import ErrorBoundary from '../ErrorBoundary';

export default function Contact() {
  const { t } = useTranslation();
  const [sectionRef, isSectionVisible] = useScrollAnimation<HTMLDivElement>();
  const { toast } = useToast();

  const contactFormSchema = z.object({
    email: z.string().email(t('contact.validation.email')),
    name: z.string().min(3, t('contact.validation.nameMin')),
    subject: z.string().min(2, t('contact.validation.subjectRequired')),
    message: z.string().min(10, t('contact.validation.messageMin'))
  });

  type FormData = z.infer<typeof contactFormSchema>;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' }
  });
}

  // ... resto do código permanece igual