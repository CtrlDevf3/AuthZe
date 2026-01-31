// import React from "react";
// import { motion } from "framer-motion";

// /* ICON LIBRARIES */
// import { FaGithub, FaTwitter } from "react-icons/fa";      // FontAwesome
// import { MdSettings } from "react-icons/md";               // Material
// import { AiOutlineArrowRight } from "react-icons/ai";      // Ant Design
// import { BsLightningFill } from "react-icons/bs";          // Bootstrap
// import { HiOutlineSparkles } from "react-icons/hi";        // Heroicons
// import { IoLogoReact } from "react-icons/io5";             // Ionicons
// import { RiDashboardLine } from "react-icons/ri";          // Remix
// import { TbBrandVite } from "react-icons/tb";              // Tabler

// /* MOTION VARIANTS */
// const container = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: { staggerChildren: 0.15 }
//   }
// };

// const item = {
//   hidden: { opacity: 0, y: 30 },
//   show: { opacity: 1, y: 0 }
// };

// export default function App() {
//   return (
//     <div className="min-h-screen bg-gray-100 p-10 space-y-24">

//       {/* HERO SECTION */}
//       <motion.section
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-center space-y-6"
//       >
//         <h1 className="text-5xl font-bold">
//           Full Stack Web
//           <span className="block text-blue-600">Developer</span>
//         </h1>

//         {/* SOCIAL ICONS */}
//         <div className="flex justify-center gap-6 text-4xl">
//           <motion.div whileHover={{ scale: 1.3 }}>
//             <FaGithub />
//           </motion.div>

//           <motion.div whileHover={{ scale: 1.3 }}>
//             <FaTwitter className="text-blue-500" />
//           </motion.div>

//           {/* INFINITE ROTATION */}
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
//           >
//             <IoLogoReact className="text-cyan-500" />
//           </motion.div>
//         </div>
//       </motion.section>

//       {/* FEATURES GRID (STAGGER ANIMATION) */}
//       <motion.section
//         variants={container}
//         initial="hidden"
//         animate="show"
//         className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto"
//       >
//         <motion.div variants={item} className="bg-white p-6 rounded-xl shadow">
//           <motion.div whileHover={{ scale: 1.2 }} className="text-3xl text-yellow-500">
//             <BsLightningFill />
//           </motion.div>
//           <h3 className="font-bold mt-4">Fast</h3>
//           <p>Optimized UI</p>
//         </motion.div>

//         <motion.div variants={item} className="bg-white p-6 rounded-xl shadow">
//           <motion.div whileHover={{ rotate: 20 }} className="text-3xl text-indigo-500">
//             <RiDashboardLine />
//           </motion.div>
//           <h3 className="font-bold mt-4">Dashboard</h3>
//           <p>Admin layouts</p>
//         </motion.div>

//         <motion.div variants={item} className="bg-white p-6 rounded-xl shadow">
//           <motion.div whileHover={{ rotate: -20 }} className="text-3xl text-gray-700">
//             <MdSettings />
//           </motion.div>
//           <h3 className="font-bold mt-4">Custom</h3>
//           <p>Easy config</p>
//         </motion.div>

//         <motion.div variants={item} className="bg-white p-6 rounded-xl shadow">
//           <motion.div whileHover={{ scale: 1.3 }} className="text-3xl text-pink-500">
//             <HiOutlineSparkles />
//           </motion.div>
//           <h3 className="font-bold mt-4">Modern</h3>
//           <p>Clean UX</p>
//         </motion.div>
//       </motion.section>

//       {/* CTA BUTTON */}
//       <section className="flex justify-center">
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.9 }}
//           className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-lg"
//         >
//           Start Building
//           <motion.span
//             animate={{ x: [0, 6, 0] }}
//             transition={{ repeat: Infinity, duration: 1 }}
//           >
//             <AiOutlineArrowRight />
//           </motion.span>
//         </motion.button>
//       </section>

//       {/* TOOL ICONS */}
//       <section className="flex justify-center gap-8 text-5xl">
//         <TbBrandVite className="text-purple-500" />
//         <IoLogoReact className="text-cyan-500" />
//         <FaGithub />
//       </section>

//     </div>
//   );
// }






// for react router dom
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import NotFound from "./pages/NotFound";

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/about" element={<About />} />
//       <Route path="/contact" element={<Contact />} />
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }










// App.jsx
import React from "react";

// 1️⃣ Recharts se components import karte hain
// LineChart, BarChart, PieChart → charts ke types
// Line, Bar, Pie → actual data plot karne ke liye
// XAxis, YAxis → axes labels
// CartesianGrid → background grid
// Tooltip → hover info
// Legend → chart keys
// ResponsiveContainer → responsive scaling
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function App() {
  // 2️⃣ Chart data
  // Ye array of objects hai, jisme har object ek point represent karta hai
  const data = [
    { month: "Jan", sales: 4000, revenue: 2400 },
    { month: "Feb", sales: 3000, revenue: 1398 },
    { month: "Mar", sales: 5000, revenue: 9800 },
    { month: "Apr", sales: 4000, revenue: 3908 },
    { month: "May", sales: 6000, revenue: 4800 },
  ];

  // Pie chart ke liye separate data
  const pieData = [
    { name: "Product A", value: 400 },
    { name: "Product B", value: 300 },
    { name: "Product C", value: 300 },
    { name: "Product D", value: 200 },
  ];

  // Colors for pie slices
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      {/* 3️⃣ Dashboard Title */}
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Dashboard Charts</h1>

      {/* 4️⃣ LINE CHART */}
      <div style={{ width: "100%", height: 300, marginBottom: "2rem" }}>
        <h2>Monthly Sales (Line Chart)</h2>

        {/* ResponsiveContainer makes chart responsive */}
        <ResponsiveContainer>
          <LineChart
            data={data} // data provide karte hain chart ko
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }} // chart ka margin
          >
            <CartesianGrid strokeDasharray="3 3" /> {/* Grid lines */}
            <XAxis dataKey="month" /> {/* X-axis: month */}
            <YAxis /> {/* Y-axis: automatic scaling */}
            <Tooltip /> {/* Hover par info show kare */}
            <Legend /> {/* Legend show kare lines ka */}
            {/* Line ke liye dataKey specify karte hain */}
            <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 5️⃣ BAR CHART */}
      <div style={{ width: "100%", height: 300, marginBottom: "2rem" }}>
        <h2>Monthly Revenue (Bar Chart)</h2>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* Multiple bars possible */}
            <Bar dataKey="sales" fill="#8884d8" />
            <Bar dataKey="revenue" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 6️⃣ PIE CHART */}
      <div style={{ width: "100%", height: 300 }}>
        <h2>Product Sales Distribution (Pie Chart)</h2>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData} // Pie data
              dataKey="value" // value field
              nameKey="name" // label field
              cx="50%" // center X
              cy="50%" // center Y
              outerRadius={100} // size
              fill="#8884d8"
              label // label show kare slice ke upar
            >
              {/* Custom colors for slices */}
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;
