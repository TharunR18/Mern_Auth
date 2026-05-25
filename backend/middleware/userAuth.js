import jwt from "jsonwebtoken";
import dotenv from "dotenv/config"

export const userAuth = async (req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        return res.json({ success: false, message: "your not Authorized. please login again" })
    }

    try {

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

        if (tokenDecode.id) {
            if (!req.body) req.body = {}
            req.body.userId = tokenDecode.id
            next()
        } else {
            return res.json({ success: false, message: "your not Authorized. please login again" })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
             message: "Server error during in userAuth"
        })
    }

}
