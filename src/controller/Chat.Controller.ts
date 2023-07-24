import { Request, Response } from "express";
import ChatService from "../service/Chat.Service";
import { response } from "../utils/response";

export default class ChatController {
  private chatService: ChatService = new ChatService();
  constructor() {
    this.initializeChat = this.initializeChat.bind(this);
    this.getChatListsByCustomer = this.getChatListsByCustomer.bind(this);
    this.saveMessage = this.saveMessage.bind(this);
    this.getChatLists = this.getChatLists.bind(this);
  }

  public async initializeChat(req: Request, res: Response) {
    try {
      const chat = await this.chatService.initializeChat(req.body);
      return res.status(201).json(response(201, "Chat room id", chat));
    } catch (error) {
      return res.status(500).json(response(500, "Something went wrong"));
    }
  }

  public async getChatListsByCustomer(req: Request, res: Response) {
    try {
      const chats = await this.chatService.getChatListsByCustomer(req.body);
      return res.status(200).json(response(200, "Chat lists", chats));
    } catch (error) {
      console.log(error);
      return res.status(500).json(response(500, "Something went wrong"));
    }
  }

  public async saveMessage(req: Request, res: Response) {
    try {
      await this.chatService.saveMessage(req.body);
      return res.status(201).json(response(201, "Chat saved"));
    } catch (error) {
      return res.status(500).json(response(500, "Something went wrong"));
    }
  }

  public async getChatLists(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const chats = await this.chatService.getChatLists(id);
      return res.status(201).json(response(201, "Chat lists", chats));
    } catch (error) {
      console.log(error);
      return res.status(500).json(response(500, "Something went wrong"));
    }
  }
}
