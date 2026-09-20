import MaterialModel from "../models/materialModel.js";
import TopicModel from "../models/topicModel.js";
import { analyzeMaterial } from "../services/aiService.js";

export const analyzeMaterialTopics = async (req, res) => {
  try {
    const { materialId } = req.body;

    if (!materialId) {
      return res.status(400).json({
        success: false,
        message: "Material ID is required",
      });
    }

    const material = await MaterialModel.findOne({
      _id: materialId,
      userId: req.user._id,
    });

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material not found",
      });
    }

    if (!material.content) {
      return res.status(400).json({
        success: false,
        message: "Material has no content",
      });
    }

    const topics = await analyzeMaterial(material.content);

    await TopicModel.deleteMany({
      materialId: material._id,
      userId: req.user._id,
    });

    const topicDocuments = topics.map((item) => ({
      materialId: material._id,
      userId: req.user._id,
      topic: item.topic,
      importance: item.importance,
      reason: item.reason,
    }));

    const savedTopics = await TopicModel.insertMany(topicDocuments);

    await MaterialModel.findByIdAndUpdate(material._id, {
      status: "analyzed",
    });

    res.status(200).json({
      success: true,
      message: "Material analyzed successfully",
      topics: savedTopics,
    });
  } catch (error) {
    console.error("Analyze material error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to analyze material",
    });
  }
};

export const getMaterialTopics = async (req, res) => {
  try {
    const { materialId } = req.params;

    const topics = await TopicModel.find({
      materialId,
      userId: req.user._id,
    }).sort({ importance: 1 });

    res.status(200).json({
      success: true,
      topics,
    });
  } catch (error) {
    console.error("Get topics error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to get topics",
    });
  }
};
