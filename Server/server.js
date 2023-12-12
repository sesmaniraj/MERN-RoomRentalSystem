import express from "express";
import dotenv from "dotenv";
import cookie from "cookie-parser"
//dotenv config to get access file from .env
dotenv.config();
import cors from "cors";
import { connectDB } from "./database/db.js";
import userRoute from "./routes/userRoutes.js"

//app created for server
const app = express();
//call connection databae
connectDB();

//middleware
app.use(express.json());
app.use(cors());
app.use(cookie());

//routes
app.use("/api/v1",userRoute)

const port = process.env.PORT;
app.listen(port,(req,res)=>{
    console.log(`Server is started at the port : ${port}`)
})
