import {
  ChatPayloadByCustomer,
  ChatRoom,
  FormatChatPayloadForCustomer,
  LoginUserData,
  MessagePayload,
} from "../dto/chat.dto";
import ChatRepository from "../repository/Chat.Repository";
import { v4 as uuidv4 } from "uuid";

export default class ChatService {
  private chatRepository: ChatRepository = new ChatRepository();
  constructor() {
    this.initializeChat = this.initializeChat.bind(this);
    this.getChatListsByCustomer = this.getChatListsByCustomer.bind(this);
    this.saveMessage = this.saveMessage.bind(this);
    this.getChatLists = this.getChatLists.bind(this);
  }

  public async initializeChat(data: ChatRoom) {
    try {
      const chatData = {
        receiver_id: data.id,
        chat_room_id: uuidv4(),
        sender_id: data.user._id,
      };
      const chat = await this.chatRepository.initializeChat(chatData);
      return {
        chat_room_id: chat.chat_room_id,
      };
    } catch (error) {
      throw error;
    }
  }

  public async getChatListsByCustomer(data: LoginUserData) {
    try {
      const id = data.user._id;

      const chats = await this.chatRepository.getChatListsByCustomer(id);
      return this.formatChatData(chats);
    } catch (error) {
      throw error;
    }
  }

  public async saveMessage(data: MessagePayload) {
    try {
      await this.chatRepository.saveMessage(data);
    } catch (error) {
      throw error;
    }
  }

  public async getChatLists(id: string) {
    try {
      return await this.chatRepository.getChatLists(id);
    } catch (error) {
      throw error;
    }
  }

  formatChatData(chats: any) {
    const formatPayload: FormatChatPayloadForCustomer[] = [];
    chats.forEach((element: any) => {
      formatPayload.push({
        _id: element.chat_room_id,
        full_name: element.sender_id.full_name,
      });
    });
    return formatPayload;
  }
}
