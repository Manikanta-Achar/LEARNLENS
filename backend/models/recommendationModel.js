import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const RecommendationModel = mongoose.model(
  "Recommendation",
  recommendationSchema,
);

export default RecommendationModel;
