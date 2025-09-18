
import { z } from "zod";

export const insertMessageSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Por favor, insira um email válido"),
  subject: z.string().min(2, "Por favor, selecione um assunto"),
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres"),
});

export const insertChatMessageSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  message: z.string().min(1, "A mensagem não pode estar vazia."),
});