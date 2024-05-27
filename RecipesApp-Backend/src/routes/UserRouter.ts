import express from "express";
import { userController } from "../controller/UserController";
import { verifyTokenForAdmin } from "../utils/middleware";

export const userRouter = express.Router();

userRouter.post("/register", userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/", verifyTokenForAdmin, userController.getUsers);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", verifyTokenForAdmin, userController.deleteUser);
