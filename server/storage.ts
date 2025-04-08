import { 
  users, type User, type InsertUser,
  messages, type Message, type InsertMessage,
  chatMessages, type ChatMessage, type InsertChatMessage 
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createMessage(message: InsertMessage): Promise<Message>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getMessages(): Promise<Message[]>;
  getChatMessages(): Promise<ChatMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private messages: Map<number, Message>;
  private chatMessages: Map<number, ChatMessage>;
  currentUserId: number;
  currentMessageId: number;
  currentChatMessageId: number;

  constructor() {
    this.users = new Map();
    this.messages = new Map();
    this.chatMessages = new Map();
    this.currentUserId = 1;
    this.currentMessageId = 1;
    this.currentChatMessageId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const createdAt = new Date().toISOString();
    const message: Message = { ...insertMessage, id, createdAt };
    this.messages.set(id, message);
    return message;
  }

  async createChatMessage(insertChatMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatMessageId++;
    const createdAt = new Date().toISOString();
    const chatMessage: ChatMessage = { ...insertChatMessage, id, createdAt };
    this.chatMessages.set(id, chatMessage);
    return chatMessage;
  }

  async getMessages(): Promise<Message[]> {
    return Array.from(this.messages.values());
  }

  async getChatMessages(): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values());
  }
}

export const storage = new MemStorage();
