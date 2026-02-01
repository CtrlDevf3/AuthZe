import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import API from "../../util/axios.js";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");


    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const { email, password } = formData;

        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        try {
            setLoading(true);

            const res = await API.post(
                "/login",
                formData,
                { withCredentials: true }
            );
            console.log(res.data);

            if (res.status === 200 || res.status === 201) {
                navigate("/");
            }


        } catch (err) {
            setError(err.response?.data?.message);
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
                    Login
                </h2>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-100 text-red-600 text-sm p-2 rounded-lg">
                            {error}
                        </div>
                    )}
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 bg-emerald-500 text-white font-semibold py-2 rounded-lg hover:bg-emerald-600 transition disabled:opacity-50 flex items-center justify-center"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>
                    <div className="text-center mt-2">
                        <Link
                            to="/forgot-password"
                            className="text-emerald-500 text-sm hover:underline"
                        >
                            Forgot Password?
                        </Link>
                        </div>
                </form>

                <div className="mt-4 text-center text-gray-500 text-sm">
                    Don’t have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-emerald-500 hover:underline font-medium"
                    >
                        Signup
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
