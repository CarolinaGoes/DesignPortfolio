import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiUser, FiPhone } from 'react-icons/fi';
import { popIn } from '@/lib/animations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

// Definir o tipo ChatFormData antes do componente
type ChatFormData = {
  name: string;
  phone: string;
  message: string;
};

// Definir tipo para mensagens do chat
type ChatMessage = {
  id: string;
  text: string;
  sender: 'user' | 'system';
  timestamp: Date;
};

// Função para formatar telefone
const formatPhone = (numbers: string): string => {
  if (!numbers) return '';

  if (numbers.length <= 2) {
    return numbers;
  } else if (numbers.length <= 7) {
    return `(${numbers.substring(0, 2)}) ${numbers.substring(2)}`;
  } else if (numbers.length <= 11) {
    return `(${numbers.substring(0, 2)}) ${numbers.substring(2, 7)}-${numbers.substring(7)}`;
  } else {
    return `(${numbers.substring(0, 2)}) ${numbers.substring(2, 7)}-${numbers.substring(7, 11)}`;
  }
};

// Função para validar telefone
const isValidPhone = (phone: string): boolean => {
  if (!phone) return true; // Opcional, então vazio é válido

  const numbers = phone.replace(/\D/g, '');
  // Valida se tem 10 ou 11 dígitos (com DDD)
  return numbers.length === 10 || numbers.length === 11;
};

// Função para obter IPs locais
const getLocalIPs = (): Promise<string[]> => {
  return new Promise((resolve) => {
    const ips: string[] = [];

    // Verificar se WebRTC está disponível
    if (!RTCPeerConnection) {
      resolve(ips);
      return;
    }

    try {
      const pc = new RTCPeerConnection({ iceServers: [] });

      pc.createDataChannel('');
      pc.createOffer().then(offer => pc.setLocalDescription(offer));

      pc.onicecandidate = (ice) => {
        if (!ice.candidate) {
          resolve(ips);
          return;
        }

        const candidate = ice.candidate.candidate;
        const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
        const match = candidate.match(ipRegex);

        if (match && !ips.includes(match[1])) {
          ips.push(match[1]);
        }
      };

      setTimeout(() => resolve(ips), 1000);
    } catch (error) {
      console.log('Erro WebRTC:', error);
      resolve(ips);
    }
  });
};

// Adicionar polyfill para timeout se necessário
if (!AbortSignal.timeout) {
  AbortSignal.timeout = function (ms: number) {
    const controller = new AbortController();
    setTimeout(() => controller.abort(new Error("Timeout")), ms);
    return controller.signal;
  };
}

// Função para obter localização detalhada por IP (SEM AUTORIZAÇÃO)
const getIPGeolocation = async () => {
  try {
    // Tentar vários serviços de geolocalização por IP como fallback
    const services = [
      'https://ipapi.co/json/',
      'https://ipinfo.io/json/',
      'https://geolocation-db.com/json/',
      'https://api.db-ip.com/v2/free/self'
    ];

    for (const service of services) {
      try {
        const response = await fetch(service, {
          signal: AbortSignal.timeout(5000) // Timeout de 5 segundos
        });

        if (response.ok) {
          const data = await response.json();

          // Padronizar os dados de diferentes serviços
          let locationData = {
            ip: data.ip || data.IPv4 || '',
            country: data.country_name || data.country || '',
            region: data.region || data.state || data.region_name || '',
            city: data.city || '',
            latitude: data.latitude || data.lat || null,
            longitude: data.longitude || data.lon || data.lng || null,
            isp: data.org || data.isp || data.asn || '',
            timezone: data.timezone || '',
            postal: data.postal || data.zip || ''
          };

          console.log('📍 Dados de localização obtidos:', locationData);
          return locationData;
        }
      } catch (error) {
        console.log(`Serviço ${service} falhou, tentando próximo...`);
        continue;
      }
    }

    throw new Error('Todos os serviços de geolocalização falharam');

  } catch (error) {
    console.log('Erro na geolocalização por IP:', error);
    return {
      ip: '',
      country: 'Não disponível',
      region: 'Não disponível',
      city: 'Não disponível',
      latitude: null,
      longitude: null,
      isp: 'Não disponível',
      timezone: 'Não disponível',
      postal: ''
    };
  }
};

// Função para obter informações completas de rede
const getCompleteNetworkInfo = async () => {
  try {
    // IP Público
    let publicIP = 'Não detectado';
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      publicIP = ipData.ip;
    } catch (error) {
      console.log('Erro ao obter IP público:', error);
    }

    // IPs Locais
    const localIPs = await getLocalIPs();

    // Informações de conexão
    const connection = (navigator as any).connection;
    const connectionInfo = connection ? {
      type: connection.effectiveType,
      downlink: connection.downlink + ' Mbps',
      rtt: connection.rtt + ' ms'
    } : {
      type: 'desconhecido',
      downlink: 'desconhecido',
      rtt: 'desconhecido'
    };

    // Obter localização detalhada por IP (SEM PERMISSÃO)
    const ipLocation = await getIPGeolocation();

    return {
      publicIP: ipLocation.ip || publicIP,
      localIPs,
      connectionType: connectionInfo.type,
      downlink: connectionInfo.downlink,
      rtt: connectionInfo.rtt,
      // DETALHES COMPLETOS DA LOCALIZAÇÃO
      locationByIP: `${ipLocation.city || 'N/A'}, ${ipLocation.region || 'N/A'}, ${ipLocation.country || 'N/A'}`,
      country: ipLocation.country,
      region: ipLocation.region,
      city: ipLocation.city,
      isp: ipLocation.isp,
      timezone: ipLocation.timezone,
      postalCode: ipLocation.postal,
      // COORDENADAS POR IP (aproximadas)
      coordinates: {
        latitude: ipLocation.latitude,
        longitude: ipLocation.longitude,
        accuracy: 'Aproximada (baseada em IP)',
        source: 'IP Geolocation'
      },
      hasExactGPS: false // Indica que não usamos GPS real
    };

  } catch (error) {
    console.log('Erro ao obter informações de rede:', error);
    return {
      publicIP: 'Erro ao obter',
      localIPs: [],
      connectionType: 'desconhecido',
      downlink: 'desconhecido',
      rtt: 'desconhecido',
      locationByIP: 'Erro ao obter',
      coordinates: {
        latitude: null,
        longitude: null,
        accuracy: 'Indisponível',
        source: 'Erro'
      },
      hasExactGPS: false
    };
  }
};

export default function ChatButton() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneValue, setPhoneValue] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Schema de validação com telefone opcional
  const chatFormSchema = z.object({
    name: z.string().min(2, { message: t('chat.validation.nameMin') || 'Nome deve ter pelo menos 2 caracteres' }),
    phone: z.string()
      .optional()
      .refine((phone) => !phone || isValidPhone(phone), {
        message: 'Telefone deve ter 10 ou 11 dígitos'
      }),
    message: z.string().min(5, { message: t('chat.validation.messageMin') || 'Mensagem deve ter pelo menos 5 caracteres' }),
  });

  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<ChatFormData>({
    resolver: zodResolver(chatFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      message: ''
    }
  });

  // Versão alternativa ainda mais simples - sem formatação automática
  const handlePhoneChangeSimple = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Permite apenas números e alguns caracteres especiais básicos
    const cleanedValue = inputValue.replace(/[^\d()-\s]/g, '');

    setPhoneValue(cleanedValue);

    // Para validação, usa apenas números
    const numbersOnly = cleanedValue.replace(/\D/g, '');
    setValue('phone', numbersOnly, { shouldValidate: true });
  };

  const sendToTelegram = async (data: ChatFormData) => {
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    // Verificar se as variáveis de ambiente estão configuradas
    if (!botToken || !chatId) {
      console.error('❌ Tokens do Telegram não configurados');
      toast({
        title: "❌ Erro de configuração",
        description: "Chat temporariamente indisponível",
        variant: "destructive",
        duration: 4000,
      });
      throw new Error('Configuração do Telegram incompleta');
    }

    try {
      // Coletar informações completas de rede
      const networkInfo = await getCompleteNetworkInfo();

      // ✅ MENSAGEM SUPER SIMPLES - APENAS TEXTO BÁSICO
      const telegramMessage = `NOVA MENSAGEM DO SITE

Nome: ${data.name}
Telefone: ${data.phone ? formatPhone(data.phone) : 'Nao informado'}

Mensagem:
${data.message}

IP: ${networkInfo.publicIP}
Local: ${networkInfo.city || 'N/A'}, ${networkInfo.country || 'N/A'}
Data: ${new Date().toLocaleString('pt-BR')}`;

      console.log('🔧 Enviando mensagem para Telegram...', telegramMessage);

      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage,
        }),
      });

      const responseData = await response.json();
      console.log('📨 Resposta completa do Telegram:', responseData);

      if (!response.ok) {
        console.error('❌ Erro do Telegram:', responseData);
        
        // ✅ TENTATIVA COM MENSAGEM MÍNIMA
        const minimalMessage = `Mensagem de ${data.name}: ${data.message.substring(0, 50)}`;
        
        console.log('🔄 Tentando mensagem mínima...');
        const minimalResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: minimalMessage,
          }),
        });
        
        const minimalData = await minimalResponse.json();
        console.log('📨 Resposta da mensagem mínima:', minimalData);
        
        if (!minimalResponse.ok) {
          throw new Error(`Telegram API error: ${response.status} - ${JSON.stringify(responseData)}`);
        }
        
        console.log('✅ Mensagem mínima enviada com sucesso!');
        return minimalData;
      }

      console.log('✅ Mensagem enviada com sucesso!');
      return responseData;

    } catch (error) {
      console.error('💥 Erro completo no envio:', error);
      throw error;
    }
  };

  const onSubmit = async (data: ChatFormData) => {
    console.log('🚀 Iniciando envio do formulário...', data);
    setIsSubmitting(true);

    // Adicionar mensagem do usuário ao chat
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: data.message,
      sender: 'user',
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);

    try {
      await sendToTelegram(data);

      // Adicionar mensagem de confirmação no chat
      const successMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "✅ Mensagem enviada com sucesso! Recebi sua mensagem no Telegram e responderei em breve.",
        sender: 'system',
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, successMessage]);

      console.log('🎉 Sucesso! Mostrando mensagem de confirmação...');
      toast({
        title: "✅ Mensagem enviada com sucesso!",
        description: "Sua mensagem foi recebida no Telegram. Responderei em breve!",
        variant: "default",
        duration: 6000,
      });

      // Limpar formulário após sucesso
      reset();
      setPhoneValue('');
      
      // Manter o chat aberto para ver a confirmação
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);

    } catch (error: any) {
      console.error('💥 Erro no envio:', error);

      // Adicionar mensagem de erro no chat
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "❌ Erro ao enviar mensagem. Tente novamente.",
        sender: 'system',
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, errorMessage]);

      let errorMessageText = "Erro ao enviar mensagem. Tente novamente.";

      if (error.message.includes('401')) {
        errorMessageText = "Erro de autenticação. Verifique as configurações.";
      } else if (error.message.includes('400')) {
        errorMessageText = "Problema na formatação. Tente uma mensagem mais curta e simples.";
      } else if (error.message.includes('Failed to fetch')) {
        errorMessageText = "Erro de conexão. Verifique sua internet.";
      }

      toast({
        title: "❌ Erro ao enviar",
        description: errorMessageText,
        variant: "destructive",
        duration: 6000,
      });

      setIsSubmitting(false);
    }
  };

  // Limpar mensagens quando o chat for fechado
  const handleCloseChat = () => {
    setChatMessages([]);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        variant="default"
        size="icon"
        className="chat-button rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? t('chat.closeLabel') || 'Fechar chat' : t('chat.openLabel') || 'Abrir chat'}
      >
        {isOpen ? <FiX className="h-6 w-6" /> : <FiMessageSquare className="h-6 w-6" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-20 right-0 w-96 h-[500px] bg-card rounded-xl shadow-2xl border border-border flex flex-col"
            variants={popIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-border">
              <div>
                <h3 className="text-lg font-bold text-card-foreground">
                  {t('chat.title') || 'Chat Rápido'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Envie uma mensagem direta
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:bg-secondary"
                onClick={handleCloseChat}
                aria-label={t('chat.closeLabel') || 'Fechar chat'}
              >
                <FiX className="h-4 w-4" />
              </Button>
            </div>

            {/* Área de Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <FiMessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma mensagem ainda</p>
                  <p className="text-sm">Envie sua primeira mensagem!</p>
                </div>
              ) : (
                chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground border'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <div className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground/70'
                      }`}>
                        {message.timestamp.toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Formulário de Mensagem */}
            <div className="p-4 border-t border-border">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="chat-name" className="block text-sm font-medium text-card-foreground mb-1">
                      <FiUser className="inline w-3 h-3 mr-1" />
                      {t('chat.nameLabel') || 'Seu nome*'}
                    </label>
                    <Input
                      id="chat-name"
                      placeholder={t('chat.namePlaceholder') || 'Seu nome'}
                      {...register("name")}
                      className="w-full bg-background border-input"
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="chat-phone" className="block text-sm font-medium text-card-foreground mb-1">
                      <FiPhone className="inline w-3 h-3 mr-1" />
                      Telefone (opcional)
                    </label>
                    <Input
                      id="chat-phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={phoneValue}
                      onChange={handlePhoneChangeSimple}
                      className="w-full bg-background border-input"
                      disabled={isSubmitting}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="chat-message" className="block text-sm font-medium text-card-foreground mb-1">
                    {t('chat.messageLabel') || 'Sua mensagem*'}
                  </label>
                  <Textarea
                    id="chat-message"
                    rows={3}
                    placeholder={t('chat.messagePlaceholder') || 'Conte-me como posso ajudar...'}
                    {...register("message")}
                    className="w-full resize-none bg-background border-input"
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="h-4 w-4" />
                      <span>{t('chat.submitButton') || 'Enviar Mensagem'}</span>
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}