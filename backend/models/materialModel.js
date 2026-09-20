import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["pdf", "text"],
      required: true,
    },

    fileUrl: {
      type: String,
      default: "",
    },

    content: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["uploaded", "analyzed"],
      default: "uploaded",
    },
  },
  {
    timestamps: true,
  },
);

const MaterialModel = mongoose.model("Material", materialSchema);

export default MaterialModel;
