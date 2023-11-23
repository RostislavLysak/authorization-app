import { validationResult } from "express-validator";
import ApiError from "../exceptions/api-error";
import UserService from "@/service/user-service";
import SessionService from "@/service/SessionService";

export const verifyAccount: TController = async (req, res, next) => {
  try {
    const { code } = req.body;

    const deviceId = SessionService.extractDeviceId(req);

    const payload = await SessionService.createSession({
      code,
      deviceId,
    });

    if (!payload.user.isActivated) {
      await UserService.activateAccount(payload.user.id);
    }

    return res.json(payload);
  } catch (error) {
    next(error);
  }
};

export const registration: TController = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Validation error", errors.array()));
    }

    const { email, password, firstName, lastName } = req.body;

    const deviceId = SessionService.extractDeviceId(req);

    await UserService.registration(email, password, firstName, lastName, deviceId);

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const login: TController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const deviceId = SessionService.extractDeviceId(req);

    const userData = await UserService.login(email, password, deviceId);

    return res.json(userData);
  } catch (error) {
    next(error);
  }
};

export const logout: TController = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const user = await UserService.logout(refreshToken);

    res.clearCookie("refreshToken");

    const deviceId = SessionService.extractDeviceId(req);

    await SessionService.deleteSession({ email: user.email, deviceId });

    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};

// export const verify: TController = async (req, res, next) => {
//   try {
//     // const activationCode = req.params.link;

//     // await UserService.activate(activationCode);

//     // return res.redirect(config.CLIENT_URL);

//     const { code } = req.body;

//     const userData = await UserService.verify(code);

//     res.cookie("refreshToken", userData.refreshToken, {
//       maxAge: 30 * 24 * 60 * 60 * 1000,
//       httpOnly: true,
//     });

//     return res.json(userData);
//   } catch (error) {
//     next(error);
//   }
// };

export const forgetPassword: TController = async (req, res, next) => {
  try {
    const { email } = req.body;

    await UserService.forgetPassword(email);

    return res.json("");
  } catch (error) {
    next(error);
  }
};

export const resetPassword: TController = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Validation error", errors.array()));
    }

    const { code, newPassword } = req.body;

    await UserService.resetPassword(code, newPassword);

    return res.json("");
  } catch (error) {
    next(error);
  }
};

export const resetPasswordStatus: TController = async (req, res, next) => {
  try {
    const { code } = req.body;

    await UserService.resetPasswordStatus(code as string);

    return res.json("");
  } catch (error) {
    next(error);
  }
};

export const changePassword: TController = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Validation error", errors.array()));
    }

    const user = req.user;

    if (!user) {
      throw ApiError.NotFound("User not found");
    }

    const { oldPassword, newPassword } = req.body;

    if (newPassword.length <= 5) {
      throw ApiError.BadRequest("Min password 6 symhols");
    }

    // const {refreshToken} = req.cookies

    await UserService.changePassword(user.id, oldPassword, newPassword);

    return res.json("");
  } catch (error) {
    next(error);
  }
};

export const changeEmail: TController = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Validation error", errors.array()));
    }

    const user = req.user;

    if (!user) {
      throw ApiError.NotFound("User not found");
    }

    const { email } = req.body;

    await UserService.changeEmail(user.id, email);

    return res.json("");
  } catch (error) {
    next(error);
  }
};

export const deleteAccount: TController = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      throw ApiError.NotFound("User not found");
    }

    await UserService.deleteAccount(user.id);

    return res.json("");
  } catch (error) {
    next(error);
  }
};

export const createImage: TController = async (req, res, next) => {
  try {
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   return next(ApiError.BadRequest("Validation error", errors.array()));
    // }

    const user = req.user;

    if (!user) {
      throw ApiError.NotFound("User not found");
    }

    const { image } = req.body;

    await UserService.createImage(user.id, image);

    return res.json("");
  } catch (error) {
    next(error);
  }
};

export const deleteImage: TController = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      throw ApiError.NotFound("User not found");
    }

    await UserService.deleteImage(user.id);

    return res.json("");
  } catch (error) {
    next(error);
  }
};

export const refresh: TController = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const userData = await UserService.refresh(refreshToken);

    return res.json(userData);
  } catch (error) {
    next(error);
  }
};

export const changeFullname: TController = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Validation error", errors.array()));
    }
    const userId = req.user.id;

    const { firstName, lastName } = req.body;

    await UserService.changeFullname(userId, firstName, lastName);

    return res.json("");
  } catch (error) {
    next(error);
  }
};

export const me: TController = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await UserService.me(userId);

    return res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getUsers: TController = async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers();

    return res.json(users);
  } catch (error) {
    next(error);
  }
};
