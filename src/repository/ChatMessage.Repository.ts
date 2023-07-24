import { ChatMessagePayload, MessagePayload } from "../dto/chat.dto";
import { ChatMessage } from "../models/chat-mesage";

export default class ChatMessageRepository {
  public async saveChatMessage(data: ChatMessagePayload) {
    await ChatMessage.create({ message: data.message, chat_id: data.chat_id });
  }

  public async getChatLists(id: string) {
    const chats = await ChatMessage.find({ chat_id: id }).select("message");
    return chats;
  }
}
