import User from "../models/User.js";
import generateOTP from "../utils/generateOTP.js";
import { sendOTPEmail } from "../utils/SendEmail.js";
import { generateRefreshToken, generateAccessToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const Signup = async (req, res) => {
    try {
        // destructure request.body
        const { name, email, password } = req.body;
        //simply validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All field are requires for Signup" })
        }
        //existing user
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                message: 'User ALready exists'
            })
        }

        const otp = generateOTP()
        //Create User
        const user = await User.create({
            name,
            email,
            password,
            otp: {
                code: otp,
                expiresAt: Date.now() + 5 * 60 * 1000
            }

        })

        //send opt mail
        try {
            await sendOTPEmail(email, otp)
        } catch (err) {
            console.log("Error sending OTP:", err.message);
        }

        res.status(201).json({
            message: "user create successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        if (error.cod === 11000) {
            return res.status(400).json({
                message: "user already exits"
            })
        }
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }

}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All field are requires for login' })
        }
        //find email
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }
        //match password
        const ismatch = await user.matchPassword(password)
        if (!ismatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        if (!user.isVerified) {
            return res.status(403).json({ message: "Please verify your email first" });
        }

        //jwt token
        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)

        // Send token in HttpOnly cookie
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Send response
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
}

export const Logout = async (req, res) => {
    // Clear both tokens
    res.cookie("accessToken", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict"
    });

    res.cookie("refreshToken", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict"
    });

    res.status(200).json({ message: "Logged out successfully" });
}
export const verifyEmail = async (req, res) => {
    const { email, otp } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    if (user.isVerified) {
        return res.status(400).json({ message: "Email already verified" })
    }

    if (!user.otp || user.otp.code !== otp || user.otp.expiresAt < Date.now()) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true
    user.otp = undefined
    await user.save()

    //token
    const accessToken = generateAccessToken(user._id)
    const refreshToken = generateRefreshToken(user._id)

    // Send token in HttpOnly cookie
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    res.status(200).json({
        message: "Email verified & account activated",
        user: { id: user._id, name: user.name, email: user.email }
    });

}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({
                message: "If this email exists, an OTP has been sent" // avoid revealing email
            });
        }

        // Generate OTP
        const otp = generateOTP();

        //  Save OTP in user document
        user.otp = {
            code: otp,
            expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes expiry
        };
        await user.save();

        // Send OTP email
        await sendOTPEmail(user.email, otp);

        res.status(200).json({ message: "OTP sent to your email" });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


export const resetPassword= async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        //  Find user with matching email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or OTP" });
        }

        //  Check if OTP exists and is valid
        if (
            !user.otp ||
            user.otp.code !== otp ||
            user.otp.expiresAt < Date.now()
        ) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }
         
        user.password=newPassword
        // Clear OTP
        user.otp = undefined;

        // Save user
        await user.save();

        res.status(200).json({ message: "Password reset successful" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};