"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = ({ isAuthenticated }) => {
  const navItemsLoggedOut = [
    { id: 1, label: "Login", href: "/login" },
    { id: 2, label: "Register", href: "/register" },
  ];

  const navItemsLoggedIn = [
    { id: 1, label: "Dashboard", href: "/dashboard" },
    { id: 2, label: "Profile", href: "/profile" },
  ];

  const items = isAuthenticated ? navItemsLoggedIn : navItemsLoggedOut;

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="border-t border-gray-200 mt-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Logo & Description */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center">
            <span className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-400">
              Auth
            </span>
            <span className="text-gray-900 font-extrabold text-2xl">Ze</span>
          </div>
          <p className="text-gray-600 text-sm max-w-xs">
            Modern authentication system built for developers who value security and performance.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h4 className="text-gray-900 font-semibold text-sm uppercase tracking-wider">
            Quick Links
          </h4>
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <motion.a
                key={item.id}
                href={item.href}
                whileHover={{ x: 4, color: "#047857" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-gray-600 text-sm font-medium"
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-2">
          <h4 className="text-gray-900 font-semibold text-sm uppercase tracking-wider">
            Connect
          </h4>
          <div className="flex gap-4 mt-2 text-gray-600">
            <motion.a
              href="https://github.com"
              target="_blank"
              whileHover={{ scale: 1.2, color: "#000" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaGithub size={20} />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target="_blank"
              whileHover={{ scale: 1.2, color: "#1DA1F2" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaTwitter size={20} />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              whileHover={{ scale: 1.2, color: "#0A66C2" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaLinkedin size={20} />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} AuthZe. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
