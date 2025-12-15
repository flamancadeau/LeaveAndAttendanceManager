import express from "express";
import type { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";


const App = express();
App.use(cors());
App.use(express());
dotenv.config();
App.use(express.json());

const connectDb = async () => {
    try {
        if (!process.env.MONGO_URL) {
            console.log(`Error in connected to db ${Error}`)
        }
        await mongoose.connect(process.env.MONGO_URL!);
        console.log("✅ connected succesfull");



    } catch (error) {
        console.log(`Error in connection ${Error}`);
    }

}
connectDb();

const PORT = process.env.PORT || 3000;

App.listen(PORT, () => {
    console.log(`Our Server is running 🔥 on port ${PORT}`);
});
