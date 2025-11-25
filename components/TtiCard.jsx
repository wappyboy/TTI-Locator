"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiArrowUpRight, FiNavigation } from "react-icons/fi";

export default function TtiCard({ tti }) {
  
  const openMaps = (e) => {
    e.stopPropagation(); // Stop click from bubbling up
    const baseUrl = "https://www.google.com/maps/search/?api=1";
    const query = tti.lat && tti.lng 
      ? `${tti.lat},${tti.lng}` 
      : encodeURIComponent(`${tti.name} ${tti.province}`);
    window.open(`${baseUrl}&query=${query}`, "_blank", "noopener,noreferrer");
  };

  // Helper for dynamic colors (Safe for Tailwind)
  // We return specific, full class strings instead of constructing them dynamically
  const getAccentColor = (region) => {
    if (region?.includes("Region I")) return "text-cyan-500 dark:text-cyan-400 border-cyan-200 dark:border-cyan-400/30 bg-cyan-50 dark:bg-cyan-400/10";
    if (region?.includes("MIMAROPA")) return "text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-400/30 bg-emerald-50 dark:bg-emerald-400/10";
    if (region?.includes("NCR")) return "text-red-600 dark:text-red-400 border-red-200 dark:border-red-400/30 bg-red-50 dark:bg-red-400/10";
    
    // Default Blue
    return "text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-400/30 bg-blue-50 dark:bg-blue-400/10";
  };

  const accentClass = getAccentColor(tti.region);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full"
    >
      <button
        onClick={openMaps}
        aria-label={`Open map for ${tti.name}`}
        className="
          group relative w-full h-full text-left
          overflow-hidden rounded-2xl border shadow-lg
          transition-all duration-300
          
          /* LIGHT MODE DEFAULTS */
          bg-white border-slate-200 hover:border-blue-300 hover:shadow-xl
          
          /* DARK MODE OVERRIDES */
          dark:bg-slate-800/40 dark:backdrop-blur-md dark:border-white/5 
          dark:hover:bg-slate-800/60 dark:hover:border-blue-400/40
        "
      >
        {/* Background Pattern (CSS-based Dot Grid) */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none transition-opacity group-hover:opacity-[0.08]"
          style={{ 
            backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)", 
            backgroundSize: "20px 20px" 
          }} 
        />

        {/* Decorative Glow (Generic Blue/Purple) */}
        <div className="absolute -top-10 -right-10 w-32 h-32 blur-[60px] rounded-full pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-20 bg-blue-500" />

        {/* Content Container */}
        <div className="relative z-10 p-6 flex flex-col h-full justify-between gap-5">
          
          {/* Top Row: Icon & Arrow */}
          <div className="flex justify-between items-start">
            {/* Dynamic Accent Box */}
            <div className={`p-2.5 rounded-xl border transition-all duration-300 ${accentClass}`}>
              <FiMapPin size={20} />
            </div>

            <div className="text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              <FiArrowUpRight size={24} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </div>

          {/* Middle Row: Title & Badges */}
          <div>
            <h3 className="
              text-lg sm:text-xl font-bold mb-2 leading-tight line-clamp-2 h-[3.5rem] flex items-center
              text-slate-900 dark:text-white
            ">
              {tti.name}
            </h3>
            
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 dark:text-white/50">
              <span className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-transparent px-2 py-1 rounded">
                {tti.province}
              </span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span>{tti.region}</span>
            </div>
          </div>

          {/* Footer Row: Coordinates & Action Text */}
          <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex justify-between items-center mt-auto">
             <div className="flex items-center gap-2 text-xs font-mono text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                <FiNavigation size={12} />
                {tti.lat 
                  ? <span>{tti.lat.toFixed(4)}, {tti.lng.toFixed(4)}</span> 
                  : <span>Locate via Name</span>
                }
             </div>
             
             <span className="text-xs font-bold uppercase tracking-wider opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-blue-600 dark:text-blue-400">
                Open Map
             </span>
          </div>

        </div>
      </button>
    </motion.div>
  );
}