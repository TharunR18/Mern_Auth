import dotenv from "dotenv/config"
import mongoose from "mongoose"

const db = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`)
        console.log("Database was running")
    } catch (error) {
        console.log("DB connection Error:", error.message);
        process.exit(1);
    }
}
export default db;