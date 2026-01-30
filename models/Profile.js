import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true   // One profile per user
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    bio: {
        type: String,
        maxlength: 200
    },
    avatar: {
        type: String,
        default: ""
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamps: true });

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
