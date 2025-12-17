import express  from "express";
import  { CreateLeaveController ,approveOrDenyLeaveController} from "../controller/LeaveController.ts";
import  { verifyAdminRole } from "../middleware/verifyAdminRole.ts";
const LeaveRouter=express.Router();

LeaveRouter.post("/leave",CreateLeaveController);
LeaveRouter.post("/leave/approve-deny", verifyAdminRole,approveOrDenyLeaveController);

export {LeaveRouter};