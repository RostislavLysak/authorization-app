// import SessionService from "@/service/SessionService";
// import UserService from "@/service/user-service";

// export const sendOtp: TController = async (req, res, next) => {
//   try {
//     const { email } = req.body;

//     const deviceId = SessionService.extractDeviceId(req);

//     const payload = await SessionService.sendOtp({
//       email,
//       deviceId,
//     });

//     return res.json(payload);
//   } catch (error) {
//     next(error);
//   }
// };

// export const checkOtp: TController = async (req, res, next) => {
//   try {
//     const { code } = req.body;

//     const deviceId = SessionService.extractDeviceId(req);

//     const payload = await SessionService.createSession({
//       code,
//       deviceId,
//     });

//     if (!payload.user.isActivated) {
//       await UserService.activateAccount(payload.user.id);
//     }

//     return res.json(payload);
//   } catch (error) {
//     next(error);
//   }
// };
