
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/index.js";
import { app } from "./app.js";
connectDB().then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
console.log("server running too fast",process.env.PORT )
    })
}).catch((error)=>{
    console.log("MONGOdb connect failed !!!", error)
})

























/*
// require("dotenv").config({path:"./env"})
import express from "express";
import mongoose from "mogoose";
import {DB_NAME} from "./constnats"
import {}
const app = express()
(async()=>{
    try {
      await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) 
      app.on("error",(err)=>{
        console.log("Error",err)
        throw err
      })
      app.listen(process.env.PORT,()=>{
        console.log(`App is listening on port ${process.env.PORT}`)
      })
    } catch (error) {
        console.log("error")
        throw err
    }
})()
    */