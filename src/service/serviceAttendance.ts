import Attendance from "../model/Attendance.ts";
import Users from "../model/Users.ts";

const createAttendance = async (data: any) => {
  try {

    const newAttendance = new Attendance(data);
    const savedAttendance = await newAttendance.save();

    const updateUser = await Users.findById(data.user);
    if (!updateUser) {
      throw new Error("User not found");
    }


    if (!updateUser.attendance) {
      updateUser.attendance = [];
    }

    updateUser.attendance.push(savedAttendance._id);

   
    await updateUser.save();

 
    return savedAttendance;
  } catch (error) {
    console.error("Error in creating attendance:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to create attendance: ${error.message}`);
    }
    throw new Error("Failed to create attendance");
  }
};

export { createAttendance };
