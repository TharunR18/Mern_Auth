import userModel from "../model/user_model.js";

export const getUserDetails = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
            }
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error while fetching user details" });
    }
};
