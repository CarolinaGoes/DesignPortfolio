import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';
import { popIn } from '@/lib/animations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { insertChatMessageSchema } from '../shared/schema';

export default function ChatButton() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const chatFormSchema = insertChatMessageSchema.extend({
    name: z.string().min(2, t('chat.validation.nameMin')),
    message: z.string().min(5, t('chat.validation.messageMin'))
  });

  type ChatFormData = z.infer<typeof chatFormSchema>;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ChatFormData>({
    resolver: zodResolver(chatFormSchema),
    defaultValues: {
      name: '',
      message: ''
    }
  });

  const sendChatMutation = useMutation({
    mutationFn: (data: ChatFormData) => {
      return apiRequest('POST', '/api/chat', data);
    },
    onSuccess: () => {
      toast({
        title: t('chat.toastSuccessTitle'),
        description: t('chat.toastSuccessDescription')
      });
      reset();
      setTimeout(() => setIsOpen(false), 1500);
    },
    onError: (error) => {
      toast({
        title: t('chat.toastErrorTitle'),
        description: error instanceof Error ? error.message : t('chat.toastErrorDescription'),
        variant: "destructive"
      });
    }
  });

  const onSubmit = async (data: ChatFormData) => {
    await sendChatMutation.mutateAsync(data);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button 
        variant="default" 
        size="icon" 
        className="chat-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? t('chat.closeLabel') : t('chat.openLabel')}
      >
        {isOpen ? <FiX className="h-5 w-5" /> : <FiMessageSquare className="h-5 w-5" />}
      </Button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute bottom-16 right-0 w-80 bg-card rounded-lg shadow-xl p-4"
            variants={popIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{t('chat.title')}</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7" 
                onClick={() => setIsOpen(false)}
                aria-label={t('chat.closeLabel')}
              >
                <FiX className="h-4 w-4" />
              </Button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="chat-name" className="block text-muted-foreground text-sm font-medium mb-1">{t('chat.nameLabel')}</label>
                <Input 
                  id="chat-name" 
                  placeholder={t('chat.namePlaceholder')}
                  {...register("name")}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="chat-message" className="block text-muted-foreground text-sm font-medium mb-1">{t('chat.messageLabel')}</label>
                <Textarea 
                  id="chat-message" 
                  rows={3} 
                  placeholder={t('chat.messagePlaceholder')}
                  {...register("message")}
                  aria-invalid={errors.message ? "true" : "false"}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2"
                disabled={isSubmitting || sendChatMutation.isPending}
              >
                <span>{t('chat.submitButton')}</span>
                <FiSend className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}