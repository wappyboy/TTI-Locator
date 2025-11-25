"use client";
import React from "react";
import { motion } from "framer-motion";

export default function FilterChips({ regions, activeRegion, setActiveRegion }) {
  
  // Helper to determine button style based on ACTIVE state only.
  const getButtonStyle = (isActive) => {
    if (isActive) {
      // ACTIVE STATE
      // Light: Blue-500 background
      // Dark: Blue-600 background with glow
      return "border-blue-400 bg-blue-500 text-white shadow-md shadow-blue-500/30 dark:bg-blue-600 dark:border-blue-500 dark:shadow-[0_0_15px_rgba(37,99,235,0.5)]";
    }
    
    // INACTIVE STATE
    // Light: Slate-200 background
    // Dark: Slate-800/50 background
    return "bg-slate-200 text-slate-600 border-transparent hover:bg-slate-300 hover:text-slate-900 dark:bg-slate-800/50 dark:text-slate-400 dark:border-transparent dark:hover:bg-slate-700 dark:hover:text-white dark:hover:border-slate-600";
  };

  return (
    <div className="w-full flex items-center gap-2 overflow-x-auto py-1 px-1 custom-scrollbar scroll-smooth">
      
      {/* "All Regions" Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActiveRegion(null)}
        className={`
          flex-shrink-0
          px-4 py-1.5 
          rounded-full 
          text-xs font-semibold uppercase tracking-wide
          border
          transition-all duration-300
          whitespace-nowrap
          ${getButtonStyle(!activeRegion)}
        `}
      >
        All Regions
      </motion.button>

      {/* Region Buttons */}
      {regions.map((r) => {
        const isActive = activeRegion === r;
        return (
          <motion.button
            key={r}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveRegion(isActive ? null : r)}
            className={`
              flex-shrink-0
              px-4 py-1.5 
              rounded-full 
              text-xs font-semibold
              border
              transition-all duration-300
              whitespace-nowrap
              ${getButtonStyle(isActive)}
            `}
          >
            {r}
          </motion.button>
        );
      })}
    </div>
  );
}