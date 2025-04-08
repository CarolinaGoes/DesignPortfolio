import { personalInfo } from '@/lib/data';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Github, 
  Linkedin, 
  Phone 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertMessageSchema } from '@shared/schema';
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
  const [sectionRef, isSectionVisible] = useScrollAnimation<HTMLDivElement>();
  const { toast } = useToast();

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
    mutationFn: (data: FormData) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato, responderei em breve."
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: "Erro ao enviar mensagem",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.",
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
          <motion.div
            initial="hidden"
            animate={isSectionVisible ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h2 variants={staggerItem} className="section-heading">Entre em Contato</motion.h2>
            <motion.div variants={staggerItem} className="section-divider"></motion.div>
            <motion.p variants={staggerItem} className="section-description">
              Tem um projeto interessante ou oportunidade? Estou sempre aberta a novas conexões e colaborações.
            </motion.p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm 
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            isSubmitting={isSubmitting || sendMessageMutation.isPending}
          />
          <ContactInfo />
        </div>
      </div>
    </section>
  );
}

interface ContactFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  register: any;
  errors: any;
  isSubmitting: boolean;
}

function ContactForm({ onSubmit, register, errors, isSubmitting }: ContactFormProps) {
  const [formRef, isFormVisible] = useScrollAnimation<HTMLFormElement>();
  
  return (
    <motion.form 
      ref={formRef}
      onSubmit={onSubmit}
      className="bg-card rounded-xl shadow-md p-8"
      initial="hidden"
      animate={isFormVisible ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      <motion.div variants={staggerItem} className="mb-6">
        <label htmlFor="name" className="block font-medium mb-2">Nome</label>
        <Input 
          id="name" 
          placeholder="Seu nome completo"
          {...register("name")}
          aria-invalid={errors.name ? "true" : "false"}
          aria-required="true"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-destructive">{errors.name.message as string}</p>
        )}
      </motion.div>

      <motion.div variants={staggerItem} className="mb-6">
        <label htmlFor="email" className="block font-medium mb-2">Email</label>
        <Input 
          type="email" 
          id="email" 
          placeholder="seu.email@exemplo.com"
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
          aria-required="true"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">{errors.email.message as string}</p>
        )}
      </motion.div>

      <motion.div variants={staggerItem} className="mb-6">
        <label htmlFor="subject" className="block font-medium mb-2">Assunto</label>
        <select 
          id="subject" 
          className="w-full px-4 py-3 rounded-lg border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          {...register("subject")}
          aria-invalid={errors.subject ? "true" : "false"}
          aria-required="true"
        >
          <option value="" disabled>Selecione um assunto</option>
          <option value="project">Proposta de projeto</option>
          <option value="job">Oportunidade de trabalho</option>
          <option value="collaboration">Colaboração</option>
          <option value="other">Outro</option>
        </select>
        {errors.subject && (
          <p className="mt-1 text-sm text-destructive">{errors.subject.message as string}</p>
        )}
      </motion.div>

      <motion.div variants={staggerItem} className="mb-6">
        <label htmlFor="message" className="block font-medium mb-2">Mensagem</label>
        <Textarea 
          id="message" 
          rows={5} 
          placeholder="Descreva em detalhes como posso ajudar"
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
          disabled={isSubmitting}
        >
          <span>Enviar mensagem</span>
          <Send className="h-4 w-4" />
        </Button>
      </motion.div>
    </motion.form>
  );
}

function ContactInfo() {
  const [infoRef, isInfoVisible] = useScrollAnimation<HTMLDivElement>();
  
  return (
    <motion.div 
      ref={infoRef}
      className="bg-card rounded-xl shadow-md p-8 h-full"
      initial="hidden"
      animate={isInfoVisible ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      <motion.h3 variants={staggerItem} className="text-2xl font-semibold mb-6">Informações de Contato</motion.h3>
      
      <motion.div variants={staggerContainer} className="space-y-6">
        <motion.div variants={staggerItem} className="flex items-start">
          <div className="bg-secondary dark:bg-muted p-3 rounded-full mr-4">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium mb-1">Email</h4>
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
            <h4 className="font-medium mb-1">Localização</h4>
            <p className="text-muted-foreground">{personalInfo.location}</p>
          </div>
        </motion.div>
        
        <motion.div variants={staggerItem} className="flex items-start">
          <div className="bg-secondary dark:bg-muted p-3 rounded-full mr-4">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium mb-1">Disponibilidade</h4>
            <p className="text-muted-foreground">{personalInfo.availability}</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div variants={staggerItem} className="mt-10">
        <h4 className="font-medium mb-4">Entre em contato</h4>
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
            href={personalInfo.socialLinks.email} 
            target="_blank" 
            rel="noopener noreferrer"
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
