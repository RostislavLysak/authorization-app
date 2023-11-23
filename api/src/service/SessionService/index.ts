import crypto from "crypto";

import RedisService from "@/service//RedisService";
import MailService from "@/service/mail-service";
import TokenService from "@/service/token-service";
import UserDto from "../../dtos/user-dto";
import UserModel from "@/models/user-model";
import ApiError from "@/exceptions/api-error";

class SessionsService {
  extractDeviceId(req: any) {
    const deviceId = req.headers["device-id"] as string;

    return deviceId;
  }

  _generateOtp(length: number) {
    const numbers = "0123456789";
    const lettersUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const pattern = numbers + lettersUpperCase;
    let otp = "";

    for (let i = 0; i < length; i++) {
      otp += pattern[crypto.randomInt(0, pattern.length)];
    }

    return otp;
  }

  async sendOtp({ email, deviceId }: { email: string; deviceId: string }) {
    const code = this._generateOtp(6);

    await RedisService.set(code, email);

    await MailService.sendEmail(email, "emailVerification", {
      code,
    });

    return email;
  }

  async checkOtp({ code }: { code: string }) {
    const email = await RedisService.get(code);

    return email;
  }

  async findSession({ email, deviceId }: { email: string; deviceId: string }) {
    const data = await RedisService.hget(email, deviceId);

    return data;
  }

  async findSessions({ email }: { email: string }) {
    const data = await RedisService.hgetall(email);

    return data;
  }

  async createSession({ code, deviceId }: { code: string; deviceId: string }) {
    const email = await this.checkOtp({ code });

    if (email && deviceId) {
      const user = await UserModel.findOne({ email });

      if (!user) {
        throw ApiError.UnauthorizedError();
      }

      await RedisService.hset(email, deviceId, crypto.randomUUID());

      const userDto = new UserDto(user);
      const tokens = TokenService.generateTokens({ ...userDto });
      await TokenService.saveToken(userDto.id, tokens.refreshToken);

      return {
        ...tokens,
        user: userDto,
      };
    }

    // TODO
    throw ApiError.NotFound('Invalid code');
  }

  async deleteSession({ email, deviceId }: { email: string; deviceId: string }) {
    await RedisService.hdel(email, deviceId);
  }

  async deleteAllSessions({ email }: { email: string }) {
    await RedisService.del(email);
  }
}

export default new SessionsService();
