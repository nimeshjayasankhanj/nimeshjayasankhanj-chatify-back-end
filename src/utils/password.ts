import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { LoginPayload, SignatureDTO } from "../dto/authentication.dto";
require("dotenv/config");

export const generatePassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const validatePassword = async (
  enteredPassword: string,
  savedPassword: string
) => {
  return bcrypt.compare(enteredPassword, savedPassword);
};

export const generateSignature = (payload: SignatureDTO) => {
  return jwt.sign(payload, "app_secret", { expiresIn: "1d" });
};

export const validateSignature = async (req: Request) => {
  const signature = req.get("Authorization");

  if (signature) {
    const payload = (await jwt.verify(
      signature.split(" ")[1],
      "app_secret"
    )) as LoginPayload;
    req.body.user = payload;
    return req;
  }
  return false;
};
