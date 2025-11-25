// components/FilterChips.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";

export default function FilterChips({ regions, activeRegion, setActiveRegion }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-wrap gap-3 bg-white/5 backdrop-blur-md rounded-3xl p-4 shadow-lg border border-white/20"
    >
      {/* "All Regions" Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActiveRegion(null)}
        className={`
          px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
          ${!activeRegion 
            ? "bg-white/10 text-white hover:bg-white/20" 
            : "bg-accent-400/50 text-white hover:bg-accent-400/60"}
          backdrop-blur-md
          shadow-sm
        `}
      >
        All Regions
      </motion.button>

      {/* Region Buttons */}
      {regions.map((r) => (
        <motion.button
          key={r}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveRegion(activeRegion === r ? null : r)}
          className={`
            px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
            ${activeRegion === r
              ? "bg-accent-400/50 text-white hover:bg-accent-400/60"
              : "bg-white/10 text-white hover:bg-white/20"}
            backdrop-blur-md
            shadow-sm
          `}
        >
          {r}
        </motion.button>
      ))}
    </motion.div>
  );
}
