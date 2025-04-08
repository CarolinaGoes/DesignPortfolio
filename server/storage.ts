import { 
  users, type User, type InsertUser,
  messages, type Message, type InsertMessage,
  chatMessages, type ChatMessage, type InsertChatMessage 
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createMessage(message: InsertMessage): Promise<Message>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getMessages(): Promise<Message[]>;
  getChatMessages(): Promise<ChatMessage[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const now = new Date().toISOString();
    const [message] = await db
      .insert(messages)
      .values({ ...insertMessage, createdAt: now })
      .returning();
    return message;
  }

  async createChatMessage(insertChatMessage: InsertChatMessage): Promise<ChatMessage> {
    const now = new Date().toISOString();
    const [chatMessage] = await db
      .insert(chatMessages)
      .values({ ...insertChatMessage, createdAt: now })
      .returning();
    return chatMessage;
  }

  async getMessages(): Promise<Message[]> {
    return await db.select().from(messages).orderBy(messages.createdAt);
  }

  async getChatMessages(): Promise<ChatMessage[]> {
    return await db.select().from(chatMessages).orderBy(chatMessages.createdAt);
  }
}

export const storage = new DatabaseStorage();
