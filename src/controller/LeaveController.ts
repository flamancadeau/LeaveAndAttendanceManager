import type { Request, Response } from "express";
import { CreateLeave } from "../service/ServiceLeave.ts";

import { LeaveValidation } from "../Schema/Leave.validation.ts";

const CreateLeaveController = async (req: Request, res: Response) => {
  const { error } = LeaveValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const leaveData = req.body;
    const newLeave = await CreateLeave(leaveData);

    return res.status(201).json({
      message: "Leave created successfully",
      leave: newLeave,
    });
  } catch (err: any) {
    return res.status(500).json({
      message: err.message || "Failed to request leave",
    });
  }
};

export { CreateLeaveController };
