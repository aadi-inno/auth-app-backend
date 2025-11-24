import { PasswordResetOtp } from "../models/PasswordResetOtp.js"
import { User } from "../models/User.js"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"
import { sendMail } from "../utils/sendMail.js";

export const sendChangePasswordOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: "Email not found" });
        }


        await PasswordResetOtp.destroy({ where: { userId: user.id } });

        const otp = (Math.floor(100000 + Math.random() * 900000)).toString();

        const otpHash = await bcrypt.hash(otp, 12);

        const expiresAt = new Date(Date.now() + 60 * 1000);

        const record = await PasswordResetOtp.create({
            userId: user.id,
            otpHash,
            expiresAt
        });

        await sendMail(
            email,
            "Your Password Reset OTP",
            `<h2>Your OTP is: <b>${otp}</b></h2>
            <p>This OTP is valid for 1 minute.</p>`
        );

        return res.json({
            message: "OTP sent!",
            userId: user.id
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export const verifyChangePasswordOtp = async (req, res) => {

    try {
        const { userId, otp } = req.body;

        const record = await PasswordResetOtp.findOne({ where: { userId } });

        if (!record) {
            return res.status(400).json({ message: "OTP Expired or Invalid" })
        }

        if (record.expiresAt < new Date()) {
            await PasswordResetOtp.destroy({ where: { userId } });
            return res.status(400).json({ message: "OTP Expired" });
        }

        const isMatch = await bcrypt.compare(otp, record.otpHash);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        return res.json({
            message: "OTP verified successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export const resetPassword = async (req, res) => {

    try {
        const { userId, newPassword } = req.body;

        const user = await User.findByPk(userId)

        const hashPassword = await bcrypt.hash(newPassword, 12);
        user.passwordHash = hashPassword;

        await user.save();

        await PasswordResetOtp.destroy({ where: { userId } });

        return res.json({ message: "Password Updated Successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}