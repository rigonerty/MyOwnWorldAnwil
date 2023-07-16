import fs from "fs"
import express from "express"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import toolsRout from "./router/toolsRouter.js"
import authRout from "./router/authRouter.js"
import userRout from "./router/userRouter.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/errorMiddleware.js";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
const app = express()
app.use(express.json())
app.use(cors({
    credentials:true,
    origin: "http://localhost:3000"
}))
app.use(cookieParser())
app.use("/", authRout)
app.use("/", userRout)
app.use("/tools", toolsRout)
app.use(errorMiddleware)
const PORT = 5000
app.listen(PORT, (req,res)=>{console.log("SERVER IS STARTED ON PORT "+ PORT)})