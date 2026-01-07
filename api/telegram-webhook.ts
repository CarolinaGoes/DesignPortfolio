import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

// Inicializa o Firebase Admin usando a Service Account
if (!getApps().length) {
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);  
  initializeApp({
    credential: cert(serviceAccount),
    databaseURL: process.env.VITE_FIREBASE_DATABASE_URL
  });
}

const db = getDatabase();

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).send('Método não permitido');

  try {
    const { message } = req.body;

    // Lógica para responder apenas quando você der "Reply" no Telegram
    if (message?.reply_to_message) {
      const originalText = message.reply_to_message.text;
      const match = originalText.match(/IP\/Sessão:\s*([^\n]+)/);
      const sessionId = match ? match[1].trim() : null;

      if (sessionId) {
        await db.ref(`chats/${sessionId}/messages`).push({
          text: message.text,
          sender: 'system',
          timestamp: Date.now()
        });
        return res.status(200).json({ success: true });
      }
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Erro no Webhook:', error);
    return res.status(500).send('Erro interno');
  }
}