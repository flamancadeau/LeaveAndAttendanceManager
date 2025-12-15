import express from "express";
import {
  createUserController,
  getAllUsersController,
  getUserController,
  updateUserController,
  deleteUserController
} from "../controller/UserController.js";

const router = express.Router();

router.post("/users", createUserController);
router.get("/users", getAllUsersController);
router.get("/users/:id", getUserController);
router.put("/users/:id", updateUserController);
router.delete("/users/:id", deleteUserController);

export default router;