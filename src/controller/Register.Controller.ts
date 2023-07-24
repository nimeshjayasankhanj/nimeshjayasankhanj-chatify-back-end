import { Request, Response } from "express";
import UserService from "../service/User.Service";
import { response } from "../utils/response";
export default class RegisterController {
  private userService: UserService = new UserService();
  constructor() {
    this.register = this.register.bind(this);
  }

  /**
   * save user to database
   * @param req
   * @param res
   * @return {object} is for success or error message
   */
  public async register(req: Request, res: Response) {
    try {
      const isEmailAvailable = Boolean(
        await this.userService.checkEmailAlreadyUsed(req.body.email)
      );
      if (isEmailAvailable) {
        return res
          .status(422)
          .json({ email: { message: "Email already used" } });
      }
      const isPhoneNumberAvailable = Boolean(
        await this.userService.checkPhoneNumberAlreadyUsed(
          req.body.phone_number
        )
      );
      if (isPhoneNumberAvailable) {
        return res
          .status(422)
          .json({ phone_number: { message: "Phone Number already used" } });
      }

      const data = this.userService.registerUser(req.body);
      return res
        .status(201)
        .json(response(201, "Successfully user registered", data));
    } catch (error) {
      return res.status(500).json(response(500, "Something went wrong"));
    }
  }
}
