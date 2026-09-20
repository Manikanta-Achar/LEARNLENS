import dns from "dns";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { userRouter } from "./routes/userRoute.js";
import { materialRouter } from "./routes/materialRoutes.js";
import { topicRouter } from "./routes/topicRoute.js";
import { quizRouter } from "./routes/quizRoutes.js";
import { recommendationRouter } from "./routes/recommendationRoutes.js";

dotenv.config();

// Use Google DNS for MongoDB Atlas SRV resolution
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "LearnLens AI Backend is running",
  });
});

const PORT = process.env.PORT || 5000;

connectDB();

//apis
app.use("/api/user", userRouter);
app.use("/api/material", materialRouter);
app.use("/api/topic", topicRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/recommendation", recommendationRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
