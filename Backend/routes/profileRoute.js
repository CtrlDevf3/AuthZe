// routes/profileRoutes.js

import express from "express";
import { createProfile, updateProfile, getMyProfile } from "../controllers/profileController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/user/create", authMiddleware, createProfile);
router.put("/user/update", authMiddleware, updateProfile);
router.get("/user/me", authMiddleware, getMyProfile);

export default router;
