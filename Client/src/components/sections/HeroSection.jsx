import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32 text-center">
        
        {/* Badge */}
        <motion.div
          className="mb-6 flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-200">
            Secure • Fast • Scalable
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Modern Authentication <br />
          <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            Made Simple
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          AuthZe provides a complete Node.js authentication system with clean architecture,
          JWT security, email verification, and high-performance backend logic — ready for production.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-10 flex items-center justify-center gap-4 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.a
            href="/register"
            className="rounded-lg bg-green-600 px-6 py-3 text-base font-semibold text-white shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Get Started
          </motion.a>

          <motion.a
            href="/login"
            className="rounded-lg border border-gray-300 px-6 py-3 text-base font-semibold text-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Login
          </motion.a>
        </motion.div>

        {/* Trust line */}
        <motion.p
          className="mt-8 text-sm text-gray-500"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Built for developers who value security and performance.
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
