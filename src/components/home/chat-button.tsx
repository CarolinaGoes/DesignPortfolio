import { useState, useEffect } from 'react';
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
import { useToast } from '@/hooks/use-toast';

// Imports do Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, serverTimestamp } from "firebase/database";

// Configuração Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Tipagens
type ChatFormData = {
  name: string;
  phone: string;
  message: string;
};

type ChatMessage = {
  id: string;
  text: string;
  sender: 'user' | 'system';
  timestamp: any;
};

// Funções Auxiliares
const formatPhone = (numbers: string): string => {
  if (!numbers) return '';
  const n = numbers.replace(/\D/g, '');
  if (n.length <= 2) return n;
  if (n.length <= 7) return `(${n.substring(0, 2)}) ${n.substring(2)}`;
  return `(${n.substring(0, 2)}) ${n.substring(2, 7)}-${n.substring(7, 11)}`;
};

const isValidPhone = (phone: string): boolean => {
  if (!phone) return true;
  const numbers = phone.replace(/\D/g, '');
  return numbers.length === 10 || numbers.length === 11;
};

const getIPGeolocation = async () => {
  try {
    const services = ['https://ipapi.co/json/', 'https://ipinfo.io/json/'];
    for (const service of services) {
      try {
        const response = await fetch(service);
        if (response.ok) {
          const data = await response.json();
          return {
            ip: data.ip || '',
            country: data.country_name || data.country || '',
            region: data.region || '',
            city: data.city || '',
            isp: data.org || data.isp || ''
          };
        }
      } catch { continue; }
    }
    return { ip: 'Não detectado', country: 'N/A', region: 'N/A', city: 'N/A', isp: 'N/A' };
  } catch { return { ip: 'Erro', country: 'N/A', region: 'N/A', city: 'N/A', isp: 'N/A' }; }
};

export default function ChatButton() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneValue, setPhoneValue] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [showWaitMessage, setShowWaitMessage] = useState(false);
  const [userIP, setUserIP] = useState<string>('');

  // Efeito para buscar IP e ouvir respostas do Firebase
  useEffect(() => {
    getIPGeolocation().then(data => {
      const sanitizedIP = data.ip.replace(/[.:]/g, '_');
      setUserIP(sanitizedIP);

      if (sanitizedIP) {
        const chatRef = ref(db, `chats/${sanitizedIP}/messages`);
        return onValue(chatRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const messagesList = Object.entries(data).map(([id, val]: [string, any]) => ({
              id,
              ...val
            })).sort((a, b) => a.timestamp - b.timestamp);
            setChatMessages(messagesList);
          }
        });
      }
    });
  }, []);

  const chatFormSchema = z.object({
    name: z.string().min(2, { message: t('chat.validation.nameMin') || 'Nome muito curto' }),
    phone: z.string().optional().refine((p) => !p || isValidPhone(p), { message: 'Telefone inválido' }),
    message: z.string().min(2, { message: t('chat.validation.messageMin') || 'Mensagem muito curta' }),
  });

  const { register, handleSubmit, reset, setValue } = useForm<ChatFormData>({
    resolver: zodResolver(chatFormSchema),
    defaultValues: { name: '', phone: '', message: '' }
  });

  const handlePhoneChangeSimple = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/[^\d()-\s]/g, '');
    setPhoneValue(cleaned);
    setValue('phone', cleaned.replace(/\D/g, ''), { shouldValidate: true });
  };

  const onSubmit = async (data: ChatFormData) => {
    setIsSubmitting(true);
    const geolocation = await getIPGeolocation();
    const sessionId = userIP || geolocation.ip.replace(/[.:]/g, '_') || 'anon';

    try {
      // 1. Grava no Firebase
      const messagesRef = ref(db, `chats/${sessionId}/messages`);
      await push(messagesRef, {
        text: data.message,
        sender: 'user',
        name: data.name,
        timestamp: serverTimestamp()
      });

      // 2. Envia para o Telegram
      const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

      const telegramMessage = `🔔 *NOVA MENSAGEM DO SITE*\n\n👤 *Nome:* ${data.name}\n📞 *Telefone:* ${data.phone ? formatPhone(data.phone) : 'N/A'}\n💬 *Mensagem:* ${data.message}\n\n🌐 *Rede:*\n📍 *IP/Sessão:* ${sessionId}\n🗺️ *Local:* ${geolocation.city}, ${geolocation.country}\n🕒 *Data:* ${new Date().toLocaleString('pt-BR')}`;

     await fetch(`/api/telegram-webhook`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    chat_id: chatId, 
    text: telegramMessage, 
    sessionId: sessionId // Adicione isso para o backend saber quem é
  }),
});

      setShowWaitMessage(true);
      toast({ title: "✅ Enviado com sucesso!" });
      reset();
      setPhoneValue('');
    } catch (error) {
      toast({ title: "❌ Erro ao enviar", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        variant="default" size="icon" className="rounded-full w-14 h-14 shadow-lg bg-primary text-primary-foreground"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX className="h-6 w-6" /> : <FiMessageSquare className="h-6 w-6" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-20 right-0 w-96 h-[500px] bg-card rounded-xl shadow-2xl border flex flex-col overflow-hidden"
            variants={popIn} initial="hidden" animate="visible" exit="hidden"
          >
            <div className="p-4 border-b bg-primary text-primary-foreground">
              <h3 className="font-bold">{t('chat.headerTitle') || 'Suporte Online'}</h3>
              <p className="text-xs opacity-80">{t('chat.headerSubtitle') || 'Respondemos rápido'}</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20">
              {chatMessages.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <FiMessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>{t('chat.placeholder') || 'Olá! Como podemos ajudar?'}</p>
                </div>
              ) : (
                chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-background border'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
              {showWaitMessage && (
                <div className="p-2 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-700 italic text-center animate-pulse">
                  ⚠️ Aguarde a resposta aqui. Por favor, não feche ou atualize o navegador.
                </div>
              )}
            </div>

            <div className="p-4 border-t bg-card">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Nome" {...register("name")} className="h-9 text-xs" />
                  <Input placeholder="Telefone" value={phoneValue} onChange={handlePhoneChangeSimple} className="h-9 text-xs" />
                </div>
                <div className="flex gap-2 items-end">
                  <Textarea placeholder="Digite sua mensagem..." {...register("message")} className="min-h-[60px] text-xs resize-none" />
                  <Button type="submit" disabled={isSubmitting} size="icon" className="h-10 w-10 shrink-0">
                    {isSubmitting ? <div className="h-4 w-4 border-2 border-current border-t-transparent animate-spin rounded-full" /> : <FiSend />}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}