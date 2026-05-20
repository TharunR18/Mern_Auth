import cors from "cors"
import express from "express"
import dotenv from "dotenv/config"
import cookieParser from "cookie-parser";
import db from "./config/db.js";

const app = express();
const port = process.env.PORT || 4000;
db();

app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true }))

app.get("/", (req, res) => {
    res.send("Server is running");
})

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})