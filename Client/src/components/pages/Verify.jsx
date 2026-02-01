import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../util/axios";

const Verify = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: "", otp: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
      e.preventDefault(); // prevent page reload
    setError("")
    try {
      const res = await API.post('/verify-email', formData, { Credential: true })
      console.log(res.data)
      if (res.status === 200 || res.status === 201) {
        navigate('/')
      }
    } catch (err) {
      setError(err.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }



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
          Verify Mial
        </h2>

        <form className="flex flex-col gap-4" onClick={handleSubmit}>
          {error && (
            <div className="bg-red-100 text-red-600 text-sm p-2 rounded-lg">
              {error}
            </div>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type='otp'
            name="otp"
            placeholder="OTP"
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-emerald-500 text-white font-semibold py-2 rounded-lg hover:bg-emerald-600 transition"
          >
            {loading ? "Verifying account" : "verify"}
          </button>
        </form>

        <div className="mt-4 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <button className="text-emerald-500 hover:underline">
            <Link to={'/login'}> Login</Link>
          </button>
        </div>
        <div className="mt-4 text-center text-gray-500 text-sm">
          IF you donot have an account?{" "}
          <button className="text-emerald-500 hover:underline">
            <Link to={'/signup'}>Signup</Link>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Verify;
