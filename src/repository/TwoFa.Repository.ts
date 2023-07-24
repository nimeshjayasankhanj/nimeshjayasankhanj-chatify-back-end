import { TwoFACode } from "../dto/two-fa";
import { TwoFA } from "../models/two-fa";

export default class TwoFARepository {
  public async saveTwoFaCode(code: number, id: string) {
    await TwoFA.create({ two_fa: code, status: 0, user_id: id });
  }

  public async updateTwoFAStatus(id: string) {
    const data = {
      status: 1,
    };
    await TwoFA.updateOne({ _id: id }, data, {
      new: true,
    });
  }

  public async verifyTwoFaCode(data: TwoFACode) {
    const twoFARecord = await TwoFA.findOne({
      two_fa: data.two_fa_code,
      user_id: data.id,
      status: 0,
      sort: { _id: -1 },
    });
    return twoFARecord;
  }
}
