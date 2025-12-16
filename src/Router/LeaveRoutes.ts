import express  from "express";
import  { CreateLeaveController } from "../controller/LeaveController.ts";
import  { verifyAdminRole } from "../middleware/verifyAdminRole.ts";
const LeaveRouter=express.Router();

LeaveRouter.post("/leave",verifyAdminRole,CreateLeaveController);


export {LeaveRouter};