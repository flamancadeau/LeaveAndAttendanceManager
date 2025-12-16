import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import users from "../model/Users.ts";

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

const CreateUser = async (data: any) => {
  try {
    const hashedPassword = await hashPassword(data.password);

    const newUser = new users({
      ...data,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      { userId: savedUser._id, email: savedUser.email, role: savedUser.role },
      process.env.JWT_SECRET || "jfn437cy5478yrng234yxgrtg3qmfyzyh54f",
      { expiresIn: "1h" }
    );

    return { savedUser, token };
  } catch (error) {
    console.error("Detailed error:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
    throw new Error("Failed to create user");
  }
};

const GetUsers = async () => {
  try {
    return await users.find().lean();
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

const GetUserById = async (id: string) => {
  try {
    return await users.findById(id).lean();
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
};

const UpdateUserById = async (id: string, data: any) => {
  try {
    const updated = await users.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return updated;
  } catch (error) {
    throw new Error("Failed to update user");
  }
};

const DeleteUserById = async (id: string) => {
  try {
    return await users.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};

export { CreateUser, GetUsers, GetUserById, UpdateUserById, DeleteUserById };
