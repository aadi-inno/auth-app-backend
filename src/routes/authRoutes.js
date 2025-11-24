import express from "express";
import { registerUser ,logoutUser,loginUser,verifyOtp} from "../controllers/authControllers.js";
import {sendChangePasswordOtp,verifyChangePasswordOtp,resetPassword} from "../controllers/changePasswordControllers.js"

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOtp);
router.get("/logout", logoutUser);

//CHANGE PASSWORD ROUTES
router.post("/send-change-password-otp",sendChangePasswordOtp);
router.post("/verify-change-password-otp",verifyChangePasswordOtp);
router.post("/reset-password",resetPassword);

export default router;
