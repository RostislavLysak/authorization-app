import express from "express";
import * as controller from "../controllers/user-controller";
import { body } from "express-validator";
import authMiddleware from "../middlewares/auth-middleware";

const router = express.Router();

router.post("/account/verify", body("code").isEmpty(), controller.verifyAccount);

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 32 }),
  body("firstName").isLength({ min: 3, max: 12 }),
  body("lastName").isLength({ min: 3, max: 12 }),
  controller.registration
);
router.post("/login", controller.login);
router.post("/logout", controller.logout);
// router.post("/verify", controller.verify);
router.post("/forget-password", controller.forgetPassword);
router.post(
  "/reset-password",
  body("newPassword").isLength({ min: 6, max: 32 }),
  controller.resetPassword
);
router.post("/reset-password-status", controller.resetPasswordStatus);
router.post(
  "/change-password",
  authMiddleware,
  body("newPassword").isLength({ min: 6, max: 32 }),
  controller.changePassword
);
router.post("/change-email", authMiddleware, body("email").isEmail(), controller.changeEmail);
router.post(
  "/change-fullname",
  authMiddleware,
  body("firstName").isLength({ min: 3, max: 12 }),
  body("lastName").isLength({ min: 3, max: 12 }),
  controller.changeFullname
);
router.delete("/delete-account", authMiddleware, controller.deleteAccount);
router.post("/create-image", authMiddleware, controller.createImage);
router.delete("/delete-image", authMiddleware, controller.deleteImage);
router.post("/refresh", controller.refresh);
router.get("/me", authMiddleware, controller.me);
router.get("/users", authMiddleware, controller.getUsers);

export default router;
