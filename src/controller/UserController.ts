import type { Request, Response } from "express";
import {
  CreateUser,
  loginUser,
  GetUsers,
  GetUserById,
  UpdateUserById,
  DeleteUserById,
} from "../service/ServiceUsers.ts";
import { usersValiadtion } from "../Schema/user.validation.ts";

export const createUserController = async (req: Request, res: Response) => {
  const { error } = usersValiadtion.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { savedUser, token } = await CreateUser(req.body);

    return res.status(201).json({
      message: "User created successfully",
      user: savedUser,
      token: token,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await loginUser(email, password);

    return res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const all = await GetUsers();
    return res.status(200).json(all);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const getUserController = async (req: Request, res: Response) => {
  try {
    const user = await GetUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const updated = await UpdateUserById(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ message: "User updated", user: updated });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const deleted = await DeleteUserById(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ message: "User deleted" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
