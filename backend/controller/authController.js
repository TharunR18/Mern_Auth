import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import userModel from "../model/user_model.js";
import dotenv from "dotenv/config"
import transporter from "../config/nodemailer.js";
import { getWelcomeEmailHTML, getOtpEmailHTML } from "../utils/emailTemplates.js";

export const register = async (req, res) => {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Name, email, and password are required" })
    }

    // Validate email format
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email format" })
    }

    // Validate password strength
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ success: false, message: "Password must be at least 8 characters with 1 uppercase letter, 1 number, and 1 special character" })
    }

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists Please Try to login" })
        }

        // Validate JWT_SECRET exists
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ success: false, message: "Server configuration error" })
        }

        const hashedpassword = await bcrypt.hash(password, 10)
        const user = new userModel({ name, email, password: hashedpassword })
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        try {
            // Register Email Logic
            const MailOptions = {
                from: `AUTH-R18 <${process.env.SENDER_EMAIL}>`,
                to: email,
                subject: "Welcome to AUTH-R18",
                html: getWelcomeEmailHTML(name, email),
            };
            await transporter.sendMail(MailOptions)

            return res.status(201).json({ success: true, message: "User registered successfully" })

        } catch (error) {
            // Account created but email failed
            return res.status(201).json({ success: true, message: "Account created. Verification email pending." })
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error during registration" })
    }
}

export const login = async (req, res) => {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" })
    }

    try {
        // Validate JWT_SECRET exists
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ success: false, message: "Server configuration error" })
        }

        const user = await userModel.findOne({ email })

        // Validating Email
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "Invalid password" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({ success: true, message: "Login successful" })

    } catch (error) {

        return res.status(500).json({ success: false, message: "Server error during login" })
    }
}

export const logout = async (req, res) => {

    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        })

        return res.status(200).json({ success: true, message: "Logout successful" })

    } catch (error) {

        return res.status(500).json({ success: false, message: "Server error during logout" })
    }
}

export const isAuthenticated = async (req, res) => {
    try {
        res.json({ success: true })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error during checking authenticated or not" })
    }

}

export const sendResetOtp = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" })
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        // Generate OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.resetOtp = otp
        user.resetOtpExpiresAt = Date.now() + 24 * 60 * 60 * 1000
        await user.save()

        const MailOptions = {
            from: `AUTH-R18 <${process.env.SENDER_EMAIL}>`,
            to: user.email,
            subject: "Password Reset OTP - AUTH-R18",
            html: getOtpEmailHTML(user.name, otp),
        }

        await transporter.sendMail(MailOptions)

        return res.status(200).json({ success: true, message: "Reset OTP sent to email successfully" })

    } catch (error) {
    console.error("OTP Email Error:", error);

    return res.status(500).json({
        success: false,
        message: "Server error while sending reset OTP"
    });
}
}

export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body

        if (!email || !otp || !newPassword) {
            return res.status(400).json({ success: false, message: "Email, OTP, and new password are required" })
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters with 1 uppercase letter, 1 number, and 1 special character" })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        if (user.resetOtp === "" || user.resetOtp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" })
        }

        if (user.resetOtpExpiresAt < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP Expired" })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        user.resetOtp = ""
        user.resetOtpExpiresAt = 0
        await user.save()

        return res.status(200).json({ success: true, message: "Password reset successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error during password reset" })
    }
}