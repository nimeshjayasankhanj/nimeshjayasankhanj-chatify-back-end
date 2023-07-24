import mongoose from "mongoose";
import CrateServer from "./utils/create-server";
import { Server, Socket } from "socket.io";
require("dotenv/config");

const app = CrateServer();

mongoose
  .connect(<string>process.env.MONGOOSE_URL)
  .then((result) => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

const server = app.listen(8000, () => {
  console.log("Application listen at 8000");
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket: Socket) => {
  const roomId = Math.floor(Math.random() * 100);

  console.log("we have a new connection");
  // Handle chat messages
  socket.on("message", (data) => {
    // Broadcast the message to all connected clients
    const { id, message } = data;
    io.emit(`message_${id}`, message);
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

export default app;
