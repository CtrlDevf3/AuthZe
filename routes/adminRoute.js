import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

//  Admin 
router.get("/dashboard", protect, authorizeRoles("admin"), (req, res) => {
    res.json({ message: "Welcome Admin 👑" });
});


// View All Users 
router.get("/users", protect, authorizeRoles("admin"), async (req, res) => {
    const users = await User.find().select("name email role");
    res.json(users);
});

export default router;
