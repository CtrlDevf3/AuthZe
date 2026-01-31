import Profile from "../models/Profile";

export const createProfile = async (req, res) => {
    try {
        const { name, username, bio, avatar, phone, address } = req.body
        //check if already exit
        const existing = await Profile.findOne({ username })
        if (existing) {
            return res.status(400).json({ message: "username already taken" })
        }

        if (!name || !username || !bio || !avatar || !phone || !address) {
            return res.status(400).json({
                message: "All field are required for Profile"
            })
        }

        const profile = await Profile.create({
            name,
            username,
            bio,
            avatar,
            phone,
            address,
            user: req.user?._id
        })
        res.status(201).json({
            message: "Profile created successfully",
            profile
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
    try {
        const { name, bio, avatar, phone, address } = req.body;

        const profile = await Profile.findOne({ user: req.user._id });

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        profile.name = name || profile.name;
        profile.bio = bio || profile.bio;
        profile.avatar = avatar || profile.avatar;
        profile.phone = phone || profile.phone;
        profile.address = address || profile.address;

        await profile.save();

        res.json({
            message: "Profile updated successfully",
            profile
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMyProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user._id })
            .populate("user", "email role");

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json(profile);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
