import express from "express";
import dotenv from "dotenv";
//dotenv config to get access file from .env
dotenv.config();
import cors from "cors";
import { connectDB } from "./database/db.js";

//app created for server
const app = express();
//call connection databae
connectDB();

const port = process.env.PORT;
app.listen(port,(req,res)=>{
    console.log(`Server is started at the port : ${port}`)
})
