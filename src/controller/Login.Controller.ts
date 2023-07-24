import { Request, Response } from "express";
import UserService from "../service/User.Service";
import { response } from "../utils/response";

export default class LoginController {
  private userService: UserService = new UserService();
  constructor() {
    this.login = this.login.bind(this);
  }
  public async login(req: Request, res: Response) {
    try {
      const checkUserNotAvailable = await this.userService.checkUserIsAvailable(
        req.body
      );

      if (checkUserNotAvailable) {
        return res
          .status(422)
          .json({ invalid_details: { message: "Invalid credentials" } });
      }
      const user = await this.userService.login(req.body);

      const data = {
        id: user,
      };
      return res.status(200).json(response(200, "Valid credentials", data));
    } catch (error) {
      console.log(error);
      return res.status(500).json(response(500, "Something went wrong"));
    }
  }
}
