import type { Request, Response } from "express";
import { attendanceValidation } from "../Schema/Attandance.validation.ts";
import { createAttendance } from "../service/serviceAttendance.ts"; 

const CreateAttendanceController = async (req: Request, res: Response) => {
  try {

    const { error } = attendanceValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { user, status, date } = req.body;

    const attendanceData = { user, status, date };
    const savedAttendance = await createAttendance(attendanceData);

    return res.status(201).json({
      message: "Attendance created successfully",
      attendance: savedAttendance,
    });
  } catch (error) {
    console.error("Error in controller:", error);
    return res.status(500).json({ message: "Failed in creating attendance" });
  }
};

export { CreateAttendanceController };
