import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_DB_URL = process.env.MONGO_DB_URL as string

const DBConnection = async () =>{
   try{
     const connection = await mongoose.connect(MONGO_DB_URL);
     return `Successfully connected to the MongoDB ${connection.connection.host}`;
   } catch (error){
     return  "MongoDB Connection Error :" + error
   }
}

export default DBConnection;