import express from "express";
import multer from "multer";

import {
  addTextMaterial,
  uploadPdfMaterial,
  getMaterials,
} from "../controllers/materialController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

export const materialRouter = express.Router();

materialRouter.post("/text", protectRoute, addTextMaterial);

materialRouter.post(
  "/pdf",
  protectRoute,
  upload.single("file"),
  uploadPdfMaterial,
);

materialRouter.get("/all", protectRoute, getMaterials);
