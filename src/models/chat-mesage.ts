import mongoose, { Schema, Document } from "mongoose";

interface ChatDocument extends Document {
  chat_id: mongoose.Schema.Types.ObjectId;
  message: string;
}

const ChatMessageSchema = new Schema(
  {
    chat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chat",
      required: true,
    },
    message: {
      type: String,
      require: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.created_at;
        delete ret.updated_at;
      },
    },
  }
);

const ChatMessage = mongoose.model<ChatDocument>(
  "chat_message",
  ChatMessageSchema
);
export { ChatMessage };
