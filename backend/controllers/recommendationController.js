import QuizResultModel from "../models/quizResultModel.js";
import RecommendationModel from "../models/recommendationModel.js";

export const generateRecommendation = async (req, res) => {
  try {
    const { quizId } = req.body;

    if (!quizId) {
      return res.status(400).json({
        success: false,
        message: "Quiz ID is required",
      });
    }

    const result = await QuizResultModel.findOne({
      quizId,
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Quiz result not found",
      });
    }

    let message;
    let priority;

    if (result.score < 50) {
      message = "Review the important topics and take the quiz again.";
      priority = "high";
    } else if (result.score < 75) {
      message = "Review the topics where you made mistakes.";
      priority = "medium";
    } else {
      message = "Good performance! Continue learning the next topics.";
      priority = "low";
    }

    const recommendation = await RecommendationModel.create({
      userId: req.user._id,
      quizId,
      message,
      priority,
    });

    res.status(201).json({
      success: true,
      message: "Recommendation generated successfully",
      recommendation,
    });
  } catch (error) {
    console.error("Recommendation error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to generate recommendation",
    });
  }
};
