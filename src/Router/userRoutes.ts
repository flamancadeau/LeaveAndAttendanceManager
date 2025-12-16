import express from "express";
import {
  createUserController,
  getAllUsersController,
  getUserController,
  updateUserController,
  deleteUserController
} from "../controller/UserController.ts";

const userRouter= express.Router();

userRouter.post("/users", createUserController);
userRouter.get("/users", getAllUsersController);
userRouter.get("/users/:id", getUserController);
userRouter.put("/users/:id", updateUserController);
userRouter.delete("/users/:id", deleteUserController);

export default userRouter;