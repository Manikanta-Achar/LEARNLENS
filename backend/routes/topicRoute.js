import express from "express";

import {
  analyzeMaterialTopics,
  getMaterialTopics,
} from "../controllers/topicController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

export const topicRouter = express.Router();

topicRouter.post("/analyze", protectRoute, analyzeMaterialTopics);
topicRouter.get("/:materialId", protectRoute, getMaterialTopics);
