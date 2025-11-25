// components/TtiCard.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiMapPin } from "react-icons/fi";

export default function TtiCard({ tti }) {
  const openMaps = () => {
    const url = tti.lat && tti.lng
      ? `https://www.google.com/maps?q=${tti.lat},${tti.lng}`
      : `https://www.google.com/maps?q=${encodeURIComponent(tti.name)}`;
    window.open(url, "_blank", "noopener");
  };

  return (
    <motion.button
      onClick={openMaps}
      whileHover={{ scale: 1.03, boxShadow: "0 20px 25px rgba(0,0,0,0.2)" }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="
        w-full
        p-5
        flex flex-col justify-between
        rounded-3xl
        bg-white/5 backdrop-blur-md
        border border-white/10
        text-left
        shadow-sm
        hover:shadow-lg
        transition-all duration-300
      "
      aria-label={`Open ${tti.name} in Google Maps`}
    >
      {/* Title & Region */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-white text-lg sm:text-xl font-semibold leading-snug">{tti.name}</h3>
          <p className="text-sm text-white/70 mt-1">{tti.province} • {tti.region}</p>
        </div>
        <div className="text-xs text-white/50 font-mono">
          {tti.lat ? `${tti.lat.toFixed(3)}, ${tti.lng.toFixed(3)}` : "Lookup"}
        </div>
      </div>

      {/* Action & Info */}
      <div className="flex items-center justify-between mt-2">
        <span className="
          inline-flex items-center gap-1
          px-3 py-1
          text-xs font-medium
          rounded-full
          bg-gradient-to-r from-accent-400 to-accent-600
          text-white
          shadow-sm
          transition-all duration-200
        ">
          <FiMapPin className="w-4 h-4" /> Open in Maps
        </span>
        <span className="text-xs text-white/60">Click card to launch</span>
      </div>
    </motion.button>
  );
}
