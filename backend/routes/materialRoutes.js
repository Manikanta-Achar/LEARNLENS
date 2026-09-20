import express from "express";
import multer from "multer";

import {
  addTextMaterial,
  addPdfMaterial,
  getMaterials,
} from "../controllers/materialController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const materialRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

materialRouter.post("/text", protectRoute, addTextMaterial);

materialRouter.post(
  "/pdf",
  protectRoute,
  upload.single("file"),
  addPdfMaterial,
);

materialRouter.get("/all", protectRoute, getMaterials);

export { materialRouter };
