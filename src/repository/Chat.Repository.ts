import { InitializeChat, MessagePayload } from "../dto/chat.dto";
import { Chat } from "../models/chat";
import ChatMessageRepository from "./ChatMessage.Repository";

export default class ChatRepository {
  private chatMessageRepository: ChatMessageRepository =
    new ChatMessageRepository();
  public async initializeChat(data: InitializeChat) {
    const chatIsAvailable = await Chat.findOne({
      receiver_id: data.receiver_id,
      sender_id: data.sender_id,
    });
    if (chatIsAvailable) {
      return chatIsAvailable;
    }
    const chat = await Chat.create(data);
    return chat;
  }

  public async getChatListsByCustomer(id: string) {
    const chats = await Chat.find({
      receiver_id: id,
    }).populate({
      path: "sender_id",
      match: {
        type: "user",
      },
      select: "full_name",
    });
    return chats;
  }

  public async saveMessage(data: MessagePayload) {
    const chat = await Chat.findOne({ chat_room_id: data.id });
    if (chat) {
      const values = {
        message: data.message,
        chat_id: chat._id,
      };
      this.chatMessageRepository.saveChatMessage(values);
    }
  }

  public async getChatLists(id: string) {
    const chat = await Chat.findOne({ chat_room_id: id });
    if (chat) {
      return this.chatMessageRepository.getChatLists(chat._id);
    }
  }
}
