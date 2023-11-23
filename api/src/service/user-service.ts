import UserModel from "../models/user-model";
import bcrypt from "bcrypt";
import crypto from "crypto";
import mailService from "./mail-service";
import tokenService from "./token-service";
import UserDto from "../dtos/user-dto";
import ApiError from "../exceptions/api-error";
// import userModel from "../models/user-model";
import SessionService from "./SessionService";
import TokenModel from "@/models/token-model";

class UserService {
  // _generateOtp(length: number) {
  //   const numbers = "0123456789";
  //   const lettersUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //   const pattern = numbers + lettersUpperCase;
  //   let otp = "";

  //   for (let i = 0; i < length; i++) {
  //     otp += pattern[crypto.randomInt(0, pattern.length)];
  //   }

  //   return otp;
  // }

  async activateAccount(userId: string) {
    const user = await UserModel.updateOne(
      { _id: userId },
      {
        $set: {
          isActivated: true,
        },
      }
    );

    return user;
  }

  async registration(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    deviceId: string
  ) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(`User with this ${email} address already exists`);
    }

    const hashPassword = await bcrypt.hash(password, 7);
    // const activationCode = SessionService._generateOtp(6);
    await UserModel.create({
      email,
      password: hashPassword,
      firstName,
      lastName,
      // activationCode,
    });

    SessionService.sendOtp({ email, deviceId });
    // await mailService.sendEmail(email, "emailVerification", {
    //   //   url: `${process.env.API_URL}/api/activate/${activationCode}`,
    //   code: activationCode,
    // });

    // const userDto = new UserDto(user); // email, id, isActivated
    // const tokens = tokenService.generateTokens({ ...userDto });
    // await tokenService.saveToken(userDto.id, tokens.refreshToken);

    // return {}
    return;
  }

  async login(email: string, password: string, deviceId: string) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest("User is not found");
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest("Invalid email address or password");
    }

    const session = await SessionService.findSession({ email, deviceId });

    if (!user.isActivated || !session) {
      await SessionService.sendOtp({
        email,
        deviceId,
      });
      throw ApiError.ShouldVerify(!user.isActivated ? "User is not activated" : "Should verify");
    }

    const userDto = new UserDto(user); // email, id, isActivated
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken: string) {
    const token = await TokenModel.findOne({ refreshToken });

    if (!token) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findOne({ _id: token.user });

    if (!user) {
      throw ApiError.UnauthorizedError();
    }
    await tokenService.removeToken(refreshToken);

    return user;
  }

  // async verify(code: string) {
  //   const user = await UserModel.findOne({ activationCode: code });

  //   if (!user) {
  //     throw ApiError.BadRequest("Invalid code");
  //   }

  //   await UserModel.updateOne(
  //     { _id: user._id },
  //     { $set: { isActivated: true }, $unset: { activationCode: true } }
  //   );

  //   await user.save();

  //   const userDto = new UserDto(user); // email, id, isActivated
  //   const tokens = tokenService.generateTokens({ ...userDto });
  //   await tokenService.saveToken(userDto.id, tokens.refreshToken);

  //   return {
  //     ...tokens,
  //     user: userDto,
  //   };
  // }

  async forgetPassword(email: string) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest("User not found");
    }

    const uuid = crypto.randomUUID();

    await UserModel.updateOne({ _id: user._id }, { $set: { code: uuid } });

    await mailService.sendEmail(user.email, "resetPassword", {
      url: `${process.env.CLIENT_URL}/reset-password?code=${uuid}`,
    });
  }

  async resetPassword(code: string, newPassword: string) {
    const user = await UserModel.findOne({ code });

    if (!user) {
      throw ApiError.BadRequest("User not found");
    }

    const hashPassword = await bcrypt.hash(newPassword, 7);

    await UserModel.updateOne(
      { _id: user._id },
      { $set: { password: hashPassword }, $unset: { code: true } }
    );
  }

  async resetPasswordStatus(code: string) {
    const user = await UserModel.findOne({ code });

    if (!user) {
      throw ApiError.BadRequest("User not found");
    }
  }

  async changePassword(id: string, oldPassword: string, newPassword: string) {
    if (oldPassword === newPassword) {
      throw ApiError.BadRequest("New password cannot be the same as old password");
    }

    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      throw ApiError.BadRequest("User not found");
    }

    const isPassEquals = await bcrypt.compare(oldPassword, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest("Wrong password");
    }

    const hashPassword = await bcrypt.hash(newPassword, 7);

    await UserModel.updateOne({ _id: user._id }, { $set: { password: hashPassword } });
  }

  async changeEmail(id: string, email: string) {
    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      throw ApiError.BadRequest("User not found");
    }

    const validEmail = await UserModel.findOne({ email: email });

    if (validEmail) {
      throw ApiError.BadRequest("User already exists");
    }

    await UserModel.updateOne({ _id: user._id }, { $set: { email: email } });
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);

    if (!user) {
      return;
    }

    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async changeFullname(id: string, firstName: string, lastName: string) {
    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      throw ApiError.NotFound("Not found");
    }

    await UserModel.updateOne({ _id: user._id }, { $set: { firstName, lastName } });
  }

  async me(id: string) {
    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      throw ApiError.NotFound("Not found");
    }

    return user;
  }

  async deleteAccount(id: string) {
    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      throw ApiError.BadRequest("User not found");
    }

    await UserModel.deleteOne({ _id: user._id });
  }

  async createImage(id: string, image: string) {
    await UserModel.updateOne({ _id: id }, { $set: { image: image } });
  }

  async deleteImage(id: string) {
    await UserModel.updateOne({ _id: id }, { $unset: { image: true } });
  }

  async getAllUsers() {
    const users = await UserModel.find();

    return users;
  }
}

export default new UserService();
