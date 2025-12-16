import Leave from "../model/Leave.ts";
import users from "../model/Users.ts";

const CreateLeave = async (data: any) => {
  try {
    const newLeave = new Leave(data);
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

export { CreateLeave };
