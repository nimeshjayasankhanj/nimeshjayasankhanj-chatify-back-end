import { TwoFACode } from "../dto/two-fa";
import TwoFARepository from "../repository/TwoFa.Repository";
import { decryptValue } from "../utils/encrypt-decrypt";

export default class TwoFACodeService {
  private twoFARepository: TwoFARepository = new TwoFARepository();
  constructor() {
    this.saveTWoFACode = this.saveTWoFACode.bind(this);
    this.verifyTwoFaCode = this.verifyTwoFaCode.bind(this);
  }

  public async saveTWoFACode(code: number, id: string) {
    try {
      await this.twoFARepository.saveTwoFaCode(code, id);
    } catch (error) {
      throw error;
    }
  }

  public async verifyTwoFaCode(data: TwoFACode) {
    try {
      const twoFaPayload = this.formatTwoFaPayload(data);
      const twoFARecord = this.twoFARepository.verifyTwoFaCode(twoFaPayload);
      return twoFARecord;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async updateTwoFAStatus(id: string) {
    try {
      await this.twoFARepository.updateTwoFAStatus(id);
    } catch (error) {
      throw error;
    }
  }

  formatTwoFaPayload(data: TwoFACode) {
    return {
      two_fa_code: data.two_fa_code,
      id: decryptValue(data.id),
    };
  }
}
