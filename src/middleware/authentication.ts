import { NextFunction, Request, Response } from "express";
import { LoginPayload } from "../dto/authentication.dto";
import { validateSignature } from "../utils/password";

declare global {
  namespace Express {
    interface Request {
      user?: LoginPayload;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = await validateSignature(req);
  if (validate) {
    next();
  } else {
    return res.status(401).json({ message: "user not authorized" });
  }
};
