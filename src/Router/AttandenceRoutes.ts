import  express  from "express";

import { CreateAttendanceController}  from "../controller/ControllerAttandance.ts";
import  { verifyAdminRole } from "../middleware/verifyAdminRole.ts";

const AttandenceRouter=express.Router();
AttandenceRouter.post("/attendance",verifyAdminRole,CreateAttendanceController)

export default AttandenceRouter;