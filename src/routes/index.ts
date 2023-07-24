import { Router } from "express";
import authenticationRoutes from "./authentication";
import chatRoutes from "./chat";
import userRoutes from "./user";

const route = Router();

route.use("/auth", authenticationRoutes);
route.use("/chat", chatRoutes);
route.use("/user", userRoutes);

export default route;
