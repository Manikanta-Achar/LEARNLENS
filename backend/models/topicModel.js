import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    materialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    topic: {
      type: String,
      required: true,
      trim: true,
    },

    importance: {
      type: String,
      enum: ["high", "medium", "low"],
      required: true,
    },

    reason: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const TopicModel = mongoose.model("Topic", topicSchema);

export default TopicModel;
