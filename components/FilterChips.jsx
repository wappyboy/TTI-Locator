"use client";
import React from "react";
import { motion } from "framer-motion";

export default function FilterChips({ regions, activeRegion, setActiveRegion }) {
  
  // Helper to determine button style
  const getButtonStyle = (isActive) => {
    if (isActive) {
      // ACTIVE STATE: Gradient Blue-to-Indigo
      // This matches the "Command Center" aesthetic
      return `
        border-transparent text-white shadow-lg shadow-blue-500/25
        bg-gradient-to-r from-blue-600 to-indigo-600
        dark:from-blue-500 dark:to-indigo-500
      `;
    }
    
    // INACTIVE STATE: Clean Slate
    return `
      bg-slate-100 text-slate-600 border-slate-200 
      hover:bg-white hover:text-blue-600 hover:border-blue-300 hover:shadow-sm
      
      dark:bg-slate-800/50 dark:text-slate-400 dark:border-white/5 
      dark:hover:bg-slate-700 dark:hover:text-white dark:hover:border-slate-500
    `;
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