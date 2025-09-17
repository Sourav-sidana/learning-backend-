import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"



const connectDB = async()=>{
    console.log("Loaded MONGODB_URI:", process.env.MONGODB_URI);


    try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

    //    console.log(`\n MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`)
    console.log(`\n✅ MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGO connection error",error)
        process.exit(1);
    }
}
export default connectDB;