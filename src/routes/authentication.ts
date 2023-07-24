import express from "express";
import LoginController from "../controller/Login.Controller";
import RegisterController from "../controller/Register.Controller";
import TwoFAController from "../controller/TwoFa.Controller";
import Validation from "../middleware/Validation";
import { LoginSchema } from "../shema-validations/login";
import { RegisterSchema } from "../shema-validations/register";
import { TwoFASchema } from "../shema-validations/two-fa";

const authenticationRoutes = express.Router();
const registerController = new RegisterController();

const loginController = new LoginController();

const twoFaController = new TwoFAController();

authenticationRoutes.post(
  "/store",
  Validation(RegisterSchema),
  registerController.register
);
authenticationRoutes.post(
  "/login",
  Validation(LoginSchema),
  loginController.login
);
authenticationRoutes.post(
  "/verify-two-fa",
  Validation(TwoFASchema),
  twoFaController.verifyTwoFa
);

export default authenticationRoutes;
