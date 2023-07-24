import { Request, Response } from "express";
import TwoFACodeService from "../service/TwoFa.Service";
import UserService from "../service/User.Service";
import { response } from "../utils/response";

export default class TwoFAController {
  private twoFACodeService: TwoFACodeService = new TwoFACodeService();
  private userService: UserService = new UserService();
  constructor() {
    this.verifyTwoFa = this.verifyTwoFa.bind(this);
  }

  public async verifyTwoFa(req: Request, res: Response) {
    try {
      const isRecordAvailable = await this.twoFACodeService.verifyTwoFaCode(
        req.body
      );
      if (!isRecordAvailable) {
        return res
          .status(422)
          .json({ invalid_detail: { message: "Invalid details" } });
      }
      const token = await this.userService.generateLoginToken(req.body.id);
      return res
        .status(201)
        .json(response(201, "User login successfully", token));
    } catch (error) {
      return res.status(500).json(response(500, "Something went wrong"));
    }
  }
}
