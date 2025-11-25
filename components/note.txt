"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  FiMapPin, 
  FiArrowUpRight, 
  FiNavigation, 
  FiUser,     // Icon for Admin
  FiPhone,    // Icon for Contact
  FiMail,     // Icon for Email
  FiTag       // Icon for Classification
} from "react-icons/fi";

export default function TtiCard({ tti }) {
  
  const openMaps = (e) => {
    // Prevent opening map if user clicks a mailto or phone link
    if (e.target.closest('a')) return;

    const baseUrl = "https://www.google.com/maps/search/?api=1";
    const query = tti.lat && tti.lng 
      ? `${tti.lat},${tti.lng}` 
      : encodeURIComponent(`${tti.name} ${tti.province}`);
    window.open(`${baseUrl}&query=${query}`, "_blank", "noopener,noreferrer");
  };

  const getAccentColor = (region) => {
    if (region?.includes("Region I")) return "text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-400/30 bg-cyan-50 dark:bg-cyan-400/10";
    if (region?.includes("MIMAROPA")) return "text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-400/30 bg-emerald-50 dark:bg-emerald-400/10";
    if (region?.includes("NCR")) return "text-red-600 dark:text-red-400 border-red-200 dark:border-red-400/30 bg-red-50 dark:bg-red-400/10";
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
      {/* Changed from <button> to <div> to allow text selection and nested links */}
      <div
        onClick={openMaps}
        className="
          group relative w-full h-full text-left cursor-pointer
          overflow-hidden rounded-2xl border shadow-lg
          transition-all duration-300 flex flex-col
          
          /* LIGHT MODE */
          bg-white border-slate-200 hover:border-blue-300 hover:shadow-xl
          
          /* DARK MODE */
          dark:bg-slate-800/40 dark:backdrop-blur-md dark:border-white/5 
          dark:hover:bg-slate-800/60 dark:hover:border-blue-400/40
        "
      >
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none transition-opacity group-hover:opacity-[0.08]"
          style={{ 
            backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)", 
            backgroundSize: "20px 20px" 
          }} 
        />

        {/* Content Container */}
        <div className="relative z-10 p-6 flex flex-col h-full gap-4">
          
          {/* --- TOP HEADER --- */}
          <div className="flex justify-between items-start">
            <div className={`p-2.5 rounded-xl border transition-all duration-300 ${accentClass}`}>
              <FiMapPin size={20} />
            </div>
            <div className="text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              <FiArrowUpRight size={24} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </div>

          {/* --- TITLE & TAGS --- */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 leading-tight text-slate-900 dark:text-white">
              {tti.name}
            </h3>
            
            <div className="flex flex-wrap gap-2 text-xs font-medium">
              {/* Classification Badge */}
              {tti.classification && (
                 <span className="flex items-center gap-1 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 px-2 py-1 rounded">
                   <FiTag size={10} /> {tti.classification}
                 </span>
              )}
              {/* Province Badge */}
              <span className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-transparent px-2 py-1 rounded">
                {tti.province}
              </span>
            </div>
          </div>

          {/* --- NEW DETAILS SECTION --- */}
          <div className="mt-2 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            
            {/* Administrator */}
            {tti.admin && (
              <div className="flex items-start gap-2.5">
                <FiUser className="mt-0.5 text-slate-400 shrink-0" size={14} />
                <span className="truncate">{tti.admin}</span>
              </div>
            )}

            {/* Contact Number */}
            {tti.contact && (
              <div className="flex items-start gap-2.5">
                <FiPhone className="mt-0.5 text-slate-400 shrink-0" size={14} />
                <span className="font-mono text-xs sm:text-sm">{tti.contact}</span>
              </div>
            )}

            {/* Email (Clickable) */}
            {tti.email && (
              <div className="flex items-start gap-2.5">
                <FiMail className="mt-0.5 text-slate-400 shrink-0" size={14} />
                <a 
                  href={`mailto:${tti.email}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline truncate"
                  title={tti.email}
                >
                  {tti.email}
                </a>
              </div>
            )}
          </div>

          {/* --- FOOTER --- */}
          <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex justify-between items-center mt-auto">
             <div className="flex items-center gap-2 text-xs font-mono text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                <FiNavigation size={12} />
                {tti.lat 
                  ? <span>{tti.lat.toFixed(4)}, {tti.lng.toFixed(4)}</span> 
                  : <span>Locate via Map</span>
                }
             </div>
             
             <span className="text-xs font-bold uppercase tracking-wider opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-blue-600 dark:text-blue-400">
               Open Map
             </span>
          </div>

        </div>
      </div>
    </motion.div>
  );
}