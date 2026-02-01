"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = ({ isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItemsLoggedOut = [
    { id: 1, label: "Login", href: "/login" },
    { id: 2, label: "Signup", href: "/signup" },
  ];

  const navItemsLoggedIn = [
    { id: 1, label: "Dashboard", href: "/dashboard" },
    { id: 2, label: "Profile", href: "/profile" },
  ];

  const items = isAuthenticated ? navItemsLoggedIn : navItemsLoggedOut;

  const menuVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    open: { opacity: 1, height: "auto", transition: { duration: 0.4 } },
  };

  const linkVariants = {
    closed: { x: -15, opacity: 0 },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.08 },
    }),
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm"
    >
      <div className="mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-400"
          >
            Auth
            <span className="text-gray-900">Ze</span>
          </motion.div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {items.map((item) => (
            <motion.a
              key={item.id}
              href={item.href}
              whileHover={{ y: -2, color: "#047857" }} // emerald-600
              transition={{ type: "spring", stiffness: 300 }}
              className="text-[15px] font-medium text-gray-600"
            >
              {item.label}
            </motion.a>
          ))}

          {isAuthenticated && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600 transition"
            >
              Logout
            </motion.button>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="p-2 md:hidden text-gray-700 hover:bg-gray-100 rounded-md transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden bg-white border-t border-gray-100 shadow"
          >
            <div className="flex flex-col px-6 py-6 space-y-5">
              {items.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  custom={i}
                  variants={linkVariants}
                  onClick={() => setIsOpen(false)}
                  whileHover={{ x: 5, color: "#047857" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-lg font-semibold text-gray-800"
                >
                  {item.label}
                </motion.a>
              ))}

              {isAuthenticated && (
                <motion.button
                  custom={items.length}
                  variants={linkVariants}
                  whileHover={{ x: 5, scale: 1.05, color: "#DC2626" }} // red-600
                  whileTap={{ scale: 0.95 }}
                  className="text-lg font-semibold text-red-500 text-left"
                >
                  Logout
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
