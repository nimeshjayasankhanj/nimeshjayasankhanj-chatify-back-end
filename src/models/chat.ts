import mongoose, { Schema, Document } from "mongoose";

interface ChatDocument extends Document {
  receiver_id: mongoose.Schema.Types.ObjectId;
  chat_room_id: string;
  sender_id: mongoose.Schema.Types.ObjectId;
}

const ChatSchema = new Schema(
  {
    receiver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    chat_room_id: {
      type: String,
      require: true,
    },
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
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

const Chat = mongoose.model<ChatDocument>("chat", ChatSchema);
export { Chat };
