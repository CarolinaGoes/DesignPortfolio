import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChatMessageSchema, insertMessageSchema } from "./shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const contactData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(contactData);
      res.status(201).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      if (error instanceof ZodError) {
        // ✅ CORREÇÃO: Use .issues em vez de .errors para Zod v4
        const errorMessage = error.issues.map(issue => 
          `${issue.path.join('.')}: ${issue.message}`
        ).join(', ');
        res.status(400).json({ success: false, message: errorMessage });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ success: false, message: "Failed to send message" });
      }
    }
  });

  // Chat message endpoint
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const chatData = insertChatMessageSchema.parse(req.body);
      const chatMessage = await storage.createChatMessage(chatData);
      res.status(201).json({ success: true, message: "Chat message sent successfully" });
    } catch (error) {
      if (error instanceof ZodError) {
        // ✅ CORREÇÃO: Use .issues em vez de .errors para Zod v4
        const errorMessage = error.issues.map(issue => 
          `${issue.path.join('.')}: ${issue.message}`
        ).join(', ');
        res.status(400).json({ success: false, message: errorMessage });
      } else {
        console.error("Chat message error:", error);
        res.status(500).json({ success: false, message: "Failed to send chat message" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}