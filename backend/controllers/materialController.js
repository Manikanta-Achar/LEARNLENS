import fs from "fs";
import MaterialModel from "../models/materialModel.js";
import { extractPdfText } from "../services/pdfService.js";

// Add text material
export const addTextMaterial = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const material = await MaterialModel.create({
      userId: req.user._id,
      title,
      type: "text",
      content,
      status: "uploaded",
    });

    res.status(201).json({
      success: true,
      message: "Text material added successfully",
      material,
    });
  } catch (error) {
    console.error("Add text material error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Upload PDF
export const uploadPdfMaterial = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "PDF file is required",
      });
    }

    // Extract text from PDF
    const extractedText = await extractPdfText(req.file.path);

    if (!extractedText.trim()) {
      fs.unlinkSync(req.file.path);

      return res.status(400).json({
        success: false,
        message: "Could not extract text from PDF",
      });
    }

    // Save material
    const material = await MaterialModel.create({
      userId: req.user._id,
      title,
      type: "pdf",
      content: extractedText,
      fileUrl: req.file.path,
      status: "uploaded",
    });

    res.status(201).json({
      success: true,
      message: "PDF uploaded successfully",
      material,
    });
  } catch (error) {
    console.error("PDF upload error:", error.message);

    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (deleteError) {
        console.error("File delete error:", deleteError.message);
      }
    }

    res.status(500).json({
      success: false,
      message: "Failed to upload PDF",
    });
  }
};

// Get user's materials
export const getMaterials = async (req, res) => {
  try {
    const materials = await MaterialModel.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      materials,
    });
  } catch (error) {
    console.error("Get materials error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
