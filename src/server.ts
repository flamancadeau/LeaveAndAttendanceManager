import express from "express";
import type { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./Router/userRoutes.js";


const App = express();
App.use(cors());
dotenv.config(); 
App.use(express.json());




const connectDb = async () => {
    try {
        if (!process.env.MONGO_URL) {

            throw new Error("MONGO_URL is not defined in environment variables.");
        }
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ connected succesfull");

    } catch (error) {
          console.log(`Error in connection:`, error); 
       
    }
}
connectDb();

App.use("/api", userRoutes); 

const PORT = process.env.PORT || 3000;

App.listen(PORT, () => {
    console.log(`Our Server is running 🔥 on port ${PORT}`);
});

