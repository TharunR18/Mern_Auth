import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    password: { type: String, required: true },
    verifyOtp: { type: String, default: "" },
    verifyOtpExprieAt: { type: Number, default: 0 },
    isAccountVerfied: { type: Boolean, default: "false" },
    resetOtp: { type: String, default: "" },
    resetOtpExprieAt: { type: Number, default: 0 },

});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel