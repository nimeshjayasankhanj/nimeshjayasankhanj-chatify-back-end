export type ChatRoom = {
  id: string;
  user: {
    _id: string;
    email: string;
    name: string;
  };
};

export type LoginUserData = {
  user: {
    _id: string;
    email: string;
    name: string;
  };
};

export type InitializeChat = {
  receiver_id: string;
  chat_room_id: string;
  sender_id: string;
};

export type ChatPayloadByCustomer = {
  _id?: string;
  receiver_id?: string;
  chat_room_id?: string;
  sender_id?: {
    _id: string;
    full_name: string;
  };
};

export type FormatChatPayloadForCustomer = {
  full_name: string;
  _id: string;
};

export type MessagePayload = {
  id: string;
  message: string;
};

export type ChatMessagePayload = {
  message: string;
  chat_id: string;
};
