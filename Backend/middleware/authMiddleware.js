import jwt from 'jsonwebtoken';
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;

        if (!token) {
            return res.status(401).json({
                message: "Not authorized, no token"
            });
        }

        // Verify token
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // Find user
        const user = await User.findById(decode.id).select("-password");
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        // Attach user to request
        req.user = user;

        // Move on to next middleware/controller
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Not authorized, token failed"
        });
    }
};
