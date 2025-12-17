import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import users from "../model/Users.ts";

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

const CreateUser = async (data: any) => {
  try {
    const existingUser = await users.findOne({ email: data.email });

    if (existingUser) {
      throw new Error(
        `The email address ${data.email} is already in use. Please use a different email.`
      );
    }

    const hashedPassword = await hashPassword(data.password);

    const newUser = new users({
      ...data,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      { userId: savedUser._id, email: savedUser.email, role: savedUser.role },
      process.env.JWT_SECRET || "jfn437cy5478yrng234yxgrtg3qmfyzyh54f"
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

const loginUser = async (email: string, password: string) => {
  try {
    const existingUser = await users.findOne({ email });


    if (!existingUser) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET || "jfn437cy5478yrng234yxgrtg3qmfyzyh54f"
    );

    return { user: existingUser, token };
  } catch (error: any) {
    console.error("Detailed error:", error);
    throw new Error(`Login failed: ${error.message}`);
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

export {
  CreateUser,
  loginUser,
  GetUsers,
  GetUserById,
  UpdateUserById,
  DeleteUserById,
};
