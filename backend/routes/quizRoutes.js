import express from "express";

import {
  generateQuiz,
  getQuizResult,
  submitQuiz,
} from "../controllers/quizController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

export const quizRouter = express.Router();

quizRouter.post("/generate", protectRoute, generateQuiz);
quizRouter.post("/submit", protectRoute, submitQuiz);
quizRouter.get("/result/:quizId", protectRoute, getQuizResult);
