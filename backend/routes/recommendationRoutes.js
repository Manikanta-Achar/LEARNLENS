import express from "express";

import { generateRecommendation } from "../controllers/recommendationController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

export const recommendationRouter = express.Router();

recommendationRouter.post("/generate", protectRoute, generateRecommendation);
