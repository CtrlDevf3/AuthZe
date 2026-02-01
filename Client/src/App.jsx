import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import HeroSection from "./components/sections/HeroSection";
import Footer from "./components/ui/Footer";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Verify from "./components/pages/Verify";
import ForgotPassword from "./components/pages/Forgot";
import ResetPassword from "./components/pages/Reset";


const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-mail" element={<Verify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
