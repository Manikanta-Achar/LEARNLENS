import express from "express";
import { checkAuth, login, signup } from "../controllers/userController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

export const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.get("/check", protectRoute, checkAuth);
