import express from "express";
import {
  createUserController,
  getAllUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
  loginUserController

} from "../controller/UserController.ts";
import  { verifyAdminRole } from "../middleware/verifyAdminRole.ts";

const userRouter= express.Router();

userRouter.post("/users", createUserController);
userRouter.post("/login", loginUserController);
userRouter.get("/users", verifyAdminRole , getAllUsersController);
userRouter.get("/users/:id", getUserController);
userRouter.put("/users/:id", updateUserController);
userRouter.delete("/users/:id", deleteUserController);

export default userRouter;