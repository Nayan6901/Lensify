import { Router } from "express";
import {
  loginUserController,
  logoutUserController,
  registerUserController,
  uploadavtar,
  verifyEmailController,
  updateUserDetailsController,
  forgotpasswordcontroller,
  verifyOtpController,
  resetPasswordController,
  refreshTokenController,
  userProfileController,
} from "../controllers/user.controllers.js";
import auth from "../middlewear/auth.js";
import upload from "../middlewear/multers.js";
const userRouter = Router();
userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", verifyEmailController);
userRouter.post("/login", loginUserController);
userRouter.get("/logout", auth, logoutUserController);
userRouter.put("/upload-avatar", auth, upload.single("avtar"), uploadavtar);
userRouter.put("/update-user", auth, updateUserDetailsController);
userRouter.put("/forgot-password", forgotpasswordcontroller);
userRouter.post("/verify-otp", verifyOtpController);
userRouter.put("/reset-password", resetPasswordController);
userRouter.post("/refresh-token", refreshTokenController);
userRouter.get("/profile", auth, userProfileController);
export default userRouter;
