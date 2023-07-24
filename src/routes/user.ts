import express from "express";
import UserController from "../controller/User.Controller";
import { authenticate } from "../middleware/authentication";
import Validation from "../middleware/Validation";
import { EditProfileSchema } from "../shema-validations/edit-profile";

const userRoutes = express.Router();

const userController = new UserController();

userRoutes.use(authenticate);

userRoutes.get("/support-agent-lists", userController.getSupportAgents);
userRoutes.get("/profile-details", userController.getProfileDetails);
userRoutes.post(
  "/edit-profile",
  Validation(EditProfileSchema),
  userController.editProfile
);

export default userRoutes;
