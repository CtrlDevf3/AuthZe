// routes/profileRoutes.js

import express from "express";
import { createProfile, updateProfile, getMyProfile } from "../controllers/profileController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createProfile);
router.put("/update", authMiddleware, updateProfile);
router.get("/me", authMiddleware, getMyProfile);

export default router;
