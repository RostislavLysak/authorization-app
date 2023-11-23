// import type { Request, Response, NextFunction } from "express";
// import RedisService from "@/service/RedisService";
// import UserService from "@/service/user-service";
// import mailService from "@/service/mail-service";

// const otpShield = async (req: Request, res: Response, next: NextFunction) => {
//   const { code } = req.body;
//   const otpCode = code ? await RedisService.get(code) : null;

//   if (!otpCode) {
//     const uuid = UserService._generateOtp(6);
//     await RedisService.set(uuid, req.user.id);
//     await mailService.sendEmail(req.user.email, "emailVerification", { code: uuid });

//     return res.json({ shouldVerify: true });
//   } else {
//     await RedisService.del(code);
//     return next();
//   }
// };

// export default otpShield;
