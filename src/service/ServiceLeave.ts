import Leave from "../model/Leave.ts";
import users from "../model/Users.ts";

const CreateLeave = async (data: any) => {
  try {
    const leaveData = {
      ...data,
      status: data.status || "pending",
    };

    const newLeave = new Leave(leaveData);
    const savedLeave = await newLeave.save();

    const userToUpdate = await users.findById(data.user);
    if (!userToUpdate) {
      throw new Error("User not found");
    }

    if (!userToUpdate.leave) {
      userToUpdate.leave = [];
    }

    userToUpdate.leave.push(savedLeave._id);
    await userToUpdate.save();

    return savedLeave;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Detailed Error:", error);
      throw new Error(`Failed to request leave: ${error.message}`);
    }
    throw new Error("An unknown error occurred");
  }
};

const approveOrDenyLeave = async (leaveId: string,status: "Approved" | "Denied") => {
  
  try {
    if (status !== "Approved" && status !== "Denied") {
      throw new Error("Invalid status. Must be 'Approved' or 'Denied'.");
    }

    const leave = await Leave.findById(leaveId);
    if (!leave) {
      throw new Error("Leave request not found");
    }

    if (leave.status === "Approved" || leave.status === "Denied") {
      throw new Error("This leave request has already been processed.");
    }

    leave.status = status;

    const updatedLeave = await leave.save();

    return updatedLeave;
  } catch (error: any) {
    console.error("Error updating leave status:", error);
    throw new Error(error.message || "Failed to approve/deny leave");
  }
};

export { CreateLeave, approveOrDenyLeave };
