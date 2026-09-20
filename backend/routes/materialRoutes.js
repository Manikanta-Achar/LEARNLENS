import express from "express";
import multer from "multer";

import {
  addTextMaterial,
  uploadPdfMaterial,
  getMaterials,
} from "../controllers/materialController.js";

import { protectRoute } from "../middleware/authMiddleware.js";

const materialRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

// Add text material
materialRouter.post("/text", protectRoute, addTextMaterial);

// Upload PDF
materialRouter.post(
  "/pdf",
  protectRoute,
  upload.single("file"),
  uploadPdfMaterial,
);

// Get all materials
materialRouter.get("/all", protectRoute, getMaterials);

export { materialRouter };
