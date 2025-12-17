import type { Request, Response } from "express";
import { CreateLeave, approveOrDenyLeave } from "../service/ServiceLeave.ts";
import { LeaveValidation } from "../Schema/Leave.validation.ts";
import jwt from "jsonwebtoken";
import users from "../model/Users.ts";
import upload  from "../middleware/upload.ts";


const CreateLeaveController = async (req: Request, res: Response) => {
  const { error } = LeaveValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Handle file upload
  upload(req, res, async (err) => {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    }

    try {
      // Authorization logic
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
      }

      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET || 'icc85948nm34iz34ni');
      } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }

      if (!decoded || typeof decoded === 'string') {
        return res.status(401).json({ message: 'Invalid token structure' });
      }

      const { userId } = decoded;

      // Check if the user exists
      const user = await users.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Prepare the leave data (no need to set status manually)
      const leaveData = {
        ...req.body,
        user: userId,
        file: req.file ? req.file.path : undefined, // Store file path if uploaded
      };

      // Create the leave request
      const newLeave = await CreateLeave(leaveData);

      return res.status(201).json({
        message: 'Leave request created successfully',
        leave: newLeave,
      });
    } catch (err: any) {
      console.error('Error:', err);
      return res.status(500).json({
        message: err.message || 'Failed to request leave',
      });
    }
  });
};

const approveOrDenyLeaveController = async (req: Request, res: Response) => {
  const { leaveId, status } = req.body;
  try {
    if (status !== "Approved" && status !== "Denied") {
      return res
        .status(400)
        .json({ message: "Invalid status. Must be 'Approved' or 'Denied'." });
    }

    const leave = await approveOrDenyLeave(leaveId, status);

    return res.status(200).json({
      message: `Leave request ${status} successfully`,
      leave,
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: err.message || "Failed to approve/deny leave" });
  }
};
export { CreateLeaveController, approveOrDenyLeaveController };
