import {
  EditProfileDTO,
  LoginDTO,
  RegisterDTO,
} from "../dto/authentication.dto";
import UserRepository from "../repository/User.Repository";
import { decryptValue, encryptValue } from "../utils/encrypt-decrypt";
import { generatePassword } from "../utils/password";
import axios from "axios";
import { generateRandomNumber } from "../utils/generate-random-number";
import TwoFACodeService from "./TwoFa.Service";
import { LoginUserData } from "../dto/chat.dto";

export default class UserService {
  private userRepository: UserRepository = new UserRepository();
  private twoFaCodeService: TwoFACodeService = new TwoFACodeService();
  constructor() {
    this.registerUser = this.registerUser.bind(this);
    this.checkEmailAlreadyUsed = this.checkEmailAlreadyUsed.bind(this);
    this.checkPhoneNumberAlreadyUsed =
      this.checkPhoneNumberAlreadyUsed.bind(this);
    this.checkUserIsAvailable = this.checkUserIsAvailable.bind(this);
    this.generateLoginToken = this.generateLoginToken.bind(this);
    this.checkEmailAlreadyUsedForUpdate =
      this.checkEmailAlreadyUsedForUpdate.bind(this);
  }

  public async registerUser(data: RegisterDTO): Promise<void> {
    try {
      const userRegisterData = await this.formatData(data);
      this.userRepository.registerUser(userRegisterData);
    } catch (error) {
      throw error;
    }
  }

  public async checkEmailAlreadyUsed(email: string) {
    try {
      return await this.userRepository.getUserByEmail(email);
    } catch (error) {
      throw error;
    }
  }

  public async checkPhoneNumberAlreadyUsed(phoneNumber: string) {
    try {
      return await this.userRepository.getUserByPhone(phoneNumber);
    } catch (error) {
      throw error;
    }
  }

  async formatData(data: RegisterDTO) {
    return {
      full_name: data.full_name,
      phone_number: data.phone_number,
      email: data.email,
      password: await generatePassword(data.password),
      user_type: data.user_type,
    };
  }

  public async checkUserIsAvailable(data: LoginDTO) {
    try {
      return await this.userRepository.checkUserIsAvailable(data);
    } catch (error) {
      throw error;
    }
  }

  public async login(data: LoginDTO) {
    try {
      const user = await this.userRepository.getUserByEmail(data.email);
      const userId = user?._id;
      const randomNumber = generateRandomNumber();
      await this.twoFaCodeService.saveTWoFACode(randomNumber, userId);
      await this.sendTwoFaCode(randomNumber, user?.phone_number);
      const encryptedId = encryptValue(userId.toString());
      return encryptedId;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async generateLoginToken(id: string) {
    try {
      const userId = decryptValue(id);
      await this.twoFaCodeService.updateTwoFAStatus(id);
      return await this.userRepository.generateLoginToken(userId);
    } catch (error) {
      throw error;
    }
  }

  public async getSupportAgents() {
    try {
      return await this.userRepository.getSupportAgents();
    } catch (error) {
      throw error;
    }
  }
  public async editProfile(data: EditProfileDTO) {
    try {
      const newPayload = this.formatEditPlayerPayload(data);
      return await this.userRepository.editProfile(newPayload);
    } catch (error) {
      throw error;
    }
  }

  public async checkEmailAlreadyUsedForUpdate(data: EditProfileDTO) {
    try {
      const newPayload = this.formatEditPlayerPayload(data);
      return await this.userRepository.checkEmailAlreadyUsedForUpdate(
        newPayload
      );
    } catch (error) {
      throw error;
    }
  }

  formatEditPlayerPayload(data: EditProfileDTO) {
    return {
      _id: data.user._id,
      full_name: data.full_name,
      phone_number: data.phone_number,
      email: data.email,
      password: data.password,
    };
  }

  public async getProfileDetails(data: LoginUserData) {
    try {
      const user = await this.userRepository.getProfileDetails(data);
      if (user) {
        return {
          full_name: user.full_name,
          email: user.email,
          phone_number: user.phone_number,
        };
      }
      return {};
    } catch (error) {
      throw error;
    }
  }

  public async sendTwoFaCode(
    randomNumber: number,
    phone_number: string | undefined
  ) {
    try {
      const url = process.env.GRAPHQL_URL;
      const headers = {
        Authorization: `Bearer ${process.env.FACEBOOK_TOKEN}`,
        "Content-Type": "application/json",
      };

      const data = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: { phone_number },
        type: "text",
        text: {
          preview_url: false,
          body: `Your two fa code is - ${randomNumber}`,
        },
      };

      // Make the CURL-like request using axios
      const response = await axios({
        method: "post",
        url: url,
        headers: headers,
        data: data,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
