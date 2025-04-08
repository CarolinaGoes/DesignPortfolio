import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema, insertChatMessageSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(contactData);
      res.status(201).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ success: false, message: validationError.message });
      } else {
        res.status(500).json({ success: false, message: "Failed to send message" });
      }
    }
  });

  // Chat message endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const chatData = insertChatMessageSchema.parse(req.body);
      const chatMessage = await storage.createChatMessage(chatData);
      res.status(201).json({ success: true, message: "Chat message sent successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ success: false, message: validationError.message });
      } else {
        res.status(500).json({ success: false, message: "Failed to send chat message" });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
