import React, { useState } from "react";
import { motion } from "framer-motion";
import API from "../../util/axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (!email) {
            setMessage("Email is required");
            return;
        }
        try {
            setLoading(true);
            const res = await API.post("/forgot-password", { email });
            setMessage(res.data.message);
            if (res.status === 200 || res.status === 201) {
                navigate('/reset-password')
            }
        } catch (err) {
            setMessage(err.response?.data?.message || "Server error");
        } finally {
            setLoading(false);
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    Forgot Password
                </h2>

                {message && (
                    <div className="bg-blue-100 text-blue-700 p-2 rounded mb-4 text-center">
                        {message}
                    </div>
                )}

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 bg-emerald-500 text-white font-semibold py-2 rounded-lg hover:bg-emerald-600 transition disabled:opacity-50"
                    >
                        {loading ? "Sending OTP..." : "Send OTP"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
