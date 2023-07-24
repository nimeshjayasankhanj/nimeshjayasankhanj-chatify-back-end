import { Request, Response } from "express";
import UserService from "../service/User.Service";
import { response } from "../utils/response";

export default class UserController {
  private userService: UserService = new UserService();
  constructor() {
    this.getSupportAgents = this.getSupportAgents.bind(this);
    this.getProfileDetails = this.getProfileDetails.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }

  public async getSupportAgents(req: Request, res: Response) {
    try {
      const users = await this.userService.getSupportAgents();
      return res.status(200).json(response(200, "Support agents", users));
    } catch (error) {
      return res.status(500).json(response(500, "Something went wrong"));
    }
  }
  public async getProfileDetails(req: Request, res: Response) {
    try {
      const users = await this.userService.getProfileDetails(req.body);
      return res.status(200).json(response(200, "Support agents", users));
    } catch (error) {
      return res.status(500).json(response(500, "Something went wrong"));
    }
  }

  public async editProfile(req: Request, res: Response) {
    try {
      const isEmailAvailable = Boolean(
        await this.userService.checkEmailAlreadyUsedForUpdate(req.body)
      );
      if (isEmailAvailable) {
        return res
          .status(422)
          .json({ email: { message: "Email already used" } });
      }
      await this.userService.editProfile(req.body);
      return res.status(200).json(response(200, "profile edited successfully"));
    } catch (error) {
      console.log(error);
      return res.status(500).json(response(500, "Something went wrong"));
    }
  }
}
