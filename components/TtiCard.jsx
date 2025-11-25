"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiArrowUpRight, FiNavigation } from "react-icons/fi";

export default function TtiCard({ tti }) {
  
  const openMaps = (e) => {
    e.stopPropagation(); // Stop click from bubbling up
    // Use the secure, universal Google Maps search URL
    const baseUrl = "https://www.google.com/maps/search/?api=1";
    const query = tti.lat && tti.lng 
      ? `${tti.lat},${tti.lng}` 
      : encodeURIComponent(`${tti.name} ${tti.province}`);
    window.open(`${baseUrl}&query=${query}`, "_blank", "noopener,noreferrer");
  };

  // --- DYNAMIC COLOR THEME LOGIC ---
  // This breaks the "Wall of Blue" and categorizes regions by color
  const getThemeColors = (region) => {
    // 1. URBAN / CAPITAL (Amber/Gold)
    // NCR, CAR, Region 3, Region 4A
    if (["NCR", "CAR", "Region III", "Region IV-A"].some(r => region?.includes(r))) {
      return {
        iconBox: "text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10",
        glow: "bg-amber-500",
        badge: "text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20",
        hoverBorder: "hover:border-amber-400/50",
        actionText: "text-amber-600 dark:text-amber-400"
      };
    }
    
    // 2. VISAYAS / ISLANDS (Cyan/Teal)
    // Region 6, 7, 8, MIMAROPA
    if (["Region VI", "Region VII", "Region VIII", "MIMAROPA"].some(r => region?.includes(r))) {
      return {
        iconBox: "text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/30 bg-cyan-50 dark:bg-cyan-500/10",
        glow: "bg-cyan-500",
        badge: "text-cyan-700 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/20",
        hoverBorder: "hover:border-cyan-400/50",
        actionText: "text-cyan-600 dark:text-cyan-400"
      };
    }

    // 3. MINDANAO (Emerald/Green)
    // Region 9, 10, 11, 12, BARMM, Caraga
    if (["Region IX", "Region X", "Region XI", "Region XII", "BARMM", "Caraga"].some(r => region?.includes(r))) {
      return {
        iconBox: "text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10",
        glow: "bg-emerald-500",
        badge: "text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20",
        hoverBorder: "hover:border-emerald-400/50",
        actionText: "text-emerald-600 dark:text-emerald-400"
      };
    }

    // 4. LUZON / DEFAULT (Indigo/Blue)
    // Region 1, 2, 5
    return {
      iconBox: "text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10",
      glow: "bg-indigo-500",
      badge: "text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20",
      hoverBorder: "hover:border-indigo-400/50",
      actionText: "text-indigo-600 dark:text-indigo-400"
    };
  };

  const theme = getThemeColors(tti.region);

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
        className={`
          group relative w-full h-full text-left
          overflow-hidden rounded-2xl border shadow-lg
          transition-all duration-300
          
          /* LIGHT MODE DEFAULTS */
          bg-white border-slate-200 hover:shadow-xl
          
          /* DARK MODE OVERRIDES */
          dark:bg-slate-800/40 dark:backdrop-blur-md dark:border-white/5 
          dark:hover:bg-slate-800/60 
          
          /* DYNAMIC BORDER COLOR ON HOVER */
          ${theme.hoverBorder}
        `}
      >
          {/* --- BACKGROUND LAYER 3: The "Engineering Graph" (TESDA Vibe) --- */}
        <div 
          className="fixed inset-0 -z-10 pointer-events-none"
          style={{ 
            // This creates two grids: 
            // 1. Small grid (Minor lines) every 20px
            // 2. Large grid (Major lines) every 100px
            backgroundImage: `
              linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
              linear-gradient(to right, rgba(148, 163, 184, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(148, 163, 184, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px, 100px 100px, 20px 20px, 20px 20px",
            
            // Focus the eye on the center (Vignette)
            maskImage: "radial-gradient(circle at center, black 60%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 60%, transparent 100%)"
          }}
        />

        {/* Decorative Glow (Dynamic Color) */}
        <div className={`absolute -top-10 -right-10 w-32 h-32 blur-[60px] rounded-full pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-20 ${theme.glow}`} />

        {/* Content Container */}
        <div className="relative z-10 p-6 flex flex-col h-full justify-between gap-5">
          
          {/* Top Row: Icon & Arrow */}
          <div className="flex justify-between items-start">
            {/* Dynamic Accent Box */}
            <div className={`p-2.5 rounded-xl border transition-all duration-300 ${theme.iconBox}`}>
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
            
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium">
              {/* Dynamic Province Badge */}
              <span className={`px-2 py-1 rounded border ${theme.badge}`}>
                {tti.province}
              </span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-slate-500 dark:text-white/50">{tti.region}</span>
            </div>
          </div>

          {/* Footer Row: Coordinates & Action Text */}
          <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex justify-between items-center mt-auto">
             <div className="flex items-center gap-2 text-xs font-mono text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                <FiNavigation size={12} />
                {tti.lat 
                  ? <span>{tti.lat.toFixed(4)}, {tti.lng.toFixed(4)}</span> 
                  : <span>Locate via Name</span>
                }
             </div>
             
             <span className={`text-xs font-bold uppercase tracking-wider opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${theme.actionText}`}>
                Open Map
             </span>
          </div>

        </div>
      </button>
    </motion.div>
  );
}