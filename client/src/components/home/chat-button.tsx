import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';
import { popIn } from '@/lib/animations';
import { personalInfo } from '@/lib/data';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { insertChatMessageSchema } from "../../../../shared/schema";


const chatFormSchema = insertChatMessageSchema.extend({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  message: z.string().min(5, "A mensagem deve ter pelo menos 5 caracteres")
});

type ChatFormData = z.infer<typeof chatFormSchema>;

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

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
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato, responderei em breve."
      });
      reset();
      setTimeout(() => setIsOpen(false), 1500);
    },
    onError: (error) => {
      toast({
        title: "Erro ao enviar mensagem",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.",
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
        aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
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
              <h3 className="text-lg font-semibold">Chat Rápido</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7" 
                onClick={() => setIsOpen(false)}
                aria-label="Fechar chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="chat-name" className="block text-muted-foreground text-sm font-medium mb-1">Nome</label>
                <Input 
                  id="chat-name" 
                  placeholder="Seu nome"
                  {...register("name")}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="chat-message" className="block text-muted-foreground text-sm font-medium mb-1">Mensagem</label>
                <Textarea 
                  id="chat-message" 
                  rows={3} 
                  placeholder="Como posso ajudar?"
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
                <span>Enviar</span>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
