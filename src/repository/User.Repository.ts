import {
  LoginDTO,
  RegisterDTO,
  UpdatedEditProfileDTO,
  UserDTO,
} from "../dto/authentication.dto";
import { LoginUserData } from "../dto/chat.dto";
import { User } from "../models/user";
import { generateSignature, validatePassword } from "../utils/password";

export default class UserRepository {
  public async registerUser(data: RegisterDTO): Promise<void> {
    await User.create(data);
  }

  public async getUserByEmail(email: string) {
    const user = await User.findOne({ email });
    return user;
  }

  public async getUserByPhone(phone_number: string) {
    const user = await User.findOne({ phone_number });
    return user;
  }

  public async getProfileDetails(data: LoginUserData) {
    const user = await User.findOne({ _id: data.user._id });
    return user;
  }

  public async checkUserIsAvailable(data: LoginDTO) {
    const user: any = await this.getUserByEmail(data.email);

    if (!user) {
      return true;
    }
    const isPasswordValid = await validatePassword(
      data.password,
      user.password
    );

    if (!isPasswordValid) {
      return true;
    }
  }

  public async generateLoginToken(id: string) {
    const user = await User.findOne({ _id: id });
    if (user) {
      const signature = generateSignature({
        _id: user.id,
        email: user.email,
        name: user.full_name,
      });

      return {
        id: user.id,
        token: signature,
        name: user.full_name,
        user_type: user.user_type,
      };
    }
  }

  public async getSupportAgents() {
    const users = await User.find({ user_type: 0 }).select("full_name");
    return users;
  }

  public async editProfile(data: UpdatedEditProfileDTO) {
    await User.updateOne({ _id: data._id }, data, {
      new: true,
    });
  }
  public async checkEmailAlreadyUsedForUpdate(data: UpdatedEditProfileDTO) {
    const user = await User.findOne({ email: data.email });
    if (user) {
      if (user._id == data._id) {
        return false;
      }
      return true;
    }
    return false;
  }
}
