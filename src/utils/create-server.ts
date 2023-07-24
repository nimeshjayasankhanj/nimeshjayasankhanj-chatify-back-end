import express from "express";
import routes from "../routes/index";
import cors from "cors";

const CrateServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(routes);

  return app;
};
export default CrateServer;
