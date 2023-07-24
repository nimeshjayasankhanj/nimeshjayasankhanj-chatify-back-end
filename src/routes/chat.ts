import express from "express";
import ChatController from "../controller/Chat.Controller";
import { authenticate } from "../middleware/authentication";

const chatRoutes = express.Router();

const chatController = new ChatController();

chatRoutes.use(authenticate);

chatRoutes.post("/initialize-chat", chatController.initializeChat);
chatRoutes.get("/customers", chatController.getChatListsByCustomer);
chatRoutes.post("/save-message", chatController.saveMessage);
chatRoutes.get("/get-chat-lists/:id", chatController.getChatLists);

export default chatRoutes;
