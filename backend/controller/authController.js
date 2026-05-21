import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import userModel from "../model/user_model.js";
import dotenv from "dotenv/config"

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

        return res.status(201).json({ success: true, message: "User registered successfully" })

    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ success: false, message: "Server error during registration" })
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
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Server error during login" })
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
        console.error("Logout error:", error);
        res.status(500).json({ success: false, message: "Server error during logout" })
    }
}

