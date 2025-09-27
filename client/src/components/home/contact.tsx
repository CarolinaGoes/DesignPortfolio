import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useEffect, useState } from 'react';

import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  FiSend, 
  FiCheckCircle,
  FiClock
} from 'react-icons/fi';
import ErrorBoundary from '../ErrorBoundary';

export default function Contact() {
  const { t } = useTranslation();
  const [sectionRef, isSectionVisible] = useScrollAnimation<HTMLDivElement>();
  const { toast } = useToast();
  const [userIP, setUserIP] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setUserIP(data.ip);
      } catch (error) {
        console.error('Erro ao obter IP:', error);
        setUserIP('Não detectado');
      }
    };

    fetchIP();
  }, []);

  const contactFormSchema = z.object({
    email: z.string().email(t('contact.validation.email') || 'Por favor, insira um email válido'),
    name: z.string().min(3, t('contact.validation.nameMin') || 'Nome deve ter pelo menos 3 caracteres'),
    subject: z.string().min(2, t('contact.validation.subjectRequired') || 'Assunto é obrigatório'),
    message: z.string().min(10, t('contact.validation.messageMin') || 'Mensagem deve ter pelo menos 10 caracteres')
  });

  type FormData = z.infer<typeof contactFormSchema>;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' }
  });

  const sendEmail = async (data: FormData) => {
    setIsSending(true);
    
    try {
      const serviceID = 'service_10ujfvq';
      const templateID = 'template_3n1vu9u';
      const publicKey = 'bci0R3NLb9P_o5BtZ';

      // Obter data e hora atual
      const now = new Date();
      const sendDate = now.toLocaleDateString('pt-BR');
      const sendTime = now.toLocaleTimeString('pt-BR');

      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_name: 'Carolina Goes', 
        reply_to: data.email,
        send_date: sendDate,
        send_time: sendTime,
        user_ip: userIP,
        full_timestamp: now.toISOString(),
        user_agent: navigator.userAgent.substring(0, 100)
      };

      const result = await emailjs.send(serviceID, templateID, templateParams, publicKey);
      
      if (result.status === 200) {
        // Mensagem de sucesso elaborada
        toast({
          title: "🎉 Mensagem Enviada com Sucesso!",
          description: "Obrigada pelo contato! Responderei em breve.",
          variant: "default",
          duration: 5000,
        });

        // Mostrar confirmação visual no formulário
        setIsSuccess(true);
        reset();
        
        // Resetar a confirmação após 5 segundos
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "❌ Erro ao Enviar",
        description: "Houve um problema ao enviar sua mensagem. Por favor, tente novamente.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <ErrorBoundary>
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            ref={sectionRef}
            variants={staggerContainer}
            initial="hidden"
            animate={isSectionVisible ? "visible" : "hidden"}
            className="max-w-6xl mx-auto"
          >
            {/* Título e descrição */}
            <motion.div variants={staggerItem} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t('contact.title') || 'Entre em Contato'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {t('contact.description') || 'Estou sempre aberta a novas oportunidades e conversas. Vamos trabalhar juntos!'}
              </p>
            </motion.div>

            <AnimatePresence>
              {isSuccess ? (
                // Mensagem de sucesso
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center"
                >
                  <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">
                    Mensagem Enviada! ✅
                  </h3>
                  <p className="text-green-700 dark:text-green-400 mb-4">
                    Obrigada pelo seu contato! Responderei o mais breve possível.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                    <FiClock className="w-4 h-4" />
                    <span className="text-sm">Você pode enviar outra mensagem a qualquer momento</span>
                  </div>
                </motion.div>
              ) : (
                // Formulário normal
                <motion.form 
                  onSubmit={handleSubmit(sendEmail)} 
                  className="space-y-6"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Input
                        {...register('name')}
                        placeholder={t('contact.form.name.placeholder') || "Seu nome completo"}
                        className="w-full"
                        disabled={isSending}
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <Input
                        {...register('email')}
                        type="email"
                        placeholder={t('contact.form.email.placeholder') || "seu.email@exemplo.com"}
                        className="w-full"
                        disabled={isSending}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <Input
                      {...register('subject')}
                      placeholder={t('contact.form.subject.placeholder') || "Assunto da mensagem"}
                      className="w-full"
                      disabled={isSending}
                    />
                    {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                  </div>
                  
                  <div>
                    <Textarea
                      {...register('message')}
                      placeholder={t('contact.form.message.placeholder') || "Sua mensagem... (mínimo 10 caracteres)"}
                      rows={6}
                      className="w-full"
                      disabled={isSending}
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                  </div>

                  
                  
                  <Button 
                    type="submit" 
                    disabled={isSending} 
                    className="w-full md:w-auto relative overflow-hidden"
                  >
                    {isSending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <FiSend className="mr-2" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>

          
          </motion.div>
        </div>
      </section>
    </ErrorBoundary>
  );
}