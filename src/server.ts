import express from "express";
import type { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import {userRouter,AttendeRouter,LeaveRouter} from "./Router/IndexRouter.ts"
import bodyParser from "body-parser";

const App = express();
App.use(cors());
dotenv.config(); 
App.use(express.json());

App.use(bodyParser.json());


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

App.use("/api", userRouter); 
App.use("/api", AttendeRouter); 
App.use("/api",LeaveRouter);

const PORT = process.env.PORT || 3000;

App.listen(PORT, () => {
    console.log(`Our Server is running 🔥 on port ${PORT}`);
});

