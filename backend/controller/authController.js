import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import userModel from "../model/user_model.js";
import dotenv from "dotenv/config"
import transporter from "../config/nodemailer.js";
import { getWelcomeEmailHTML, getOtpEmailHTML } from "../utils/emailTemplates.js";

export const register = async (req, res) => {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
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
            return res.status(409).json({ success: false, message: "User already exists with this email" })
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
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        try {
            // Register Email Logic
            const MailOptions = {
                from: process.env.SENDER_EMAIL,
                to: email,
                subject: "Welcome to Website",
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

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
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
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
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
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        return res.status(200).json({ success: true, message: "Logout successful" })

    } catch (error) {

        return res.status(500).json({ success: false, message: "Server error during logout" })
    }
}

export const sendVerifyOtp = async (req, res) => {

    try {

        const { userId } = req.body

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" })
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        if (user.isAccountVerified) {
            return res.status(400).json({ success: false, message: "User already verified" })
        }

        //generate OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.verifyOtp = otp
        user.verifyOtpExpiresAt = Date.now() + 24 * 60 * 60 * 1000
        await user.save();

        const MailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account Verification OTP",
            html: getOtpEmailHTML(user.name, otp),
        };

        await transporter.sendMail(MailOptions)

        return res.status(200).json({ success: true, message: "OTP sent to email successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error while sending OTP" })
    }

}

export const verifyEmail = async (req, res) => {

    const { userId, otp } = req.body

    if (!userId || !otp) {
        return res.json({ success: false, message: "please fill required details" })
    }

    try {

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        if (user.otp === "" || user.verifyOtp !== otp) {
            return res.status(404).json({ success: false, message: "invalid otp" })
        }
        if (user.verifyOtpExpiresAt < Date.now()) {
            return res.status(404).json({ success: false, message: "OTP Expired" })
        }

        user.isAccountVerified = true
        user.verifyOtp = ""
        user.verifyOtpExpiresAt = 0
        await user.save()

        res.json({ success: true, message: "email verify Successfully" })


    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error during send verifyEmail" })
    }

}