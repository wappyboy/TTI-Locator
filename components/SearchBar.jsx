// components/SearchBar.jsx
"use client";
import React from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";

export default function SearchBar({ query, setQuery }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col gap-4 bg-white/5 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/20"
    >
      {/* Title with icon */}
      <div className="flex items-center gap-3">
        <FiMapPin className="w-7 h-7 text-accent-400" />
        <h2 className="text-white text-3xl sm:text-4xl font-extrabold tracking-wide">
          TTI Locator
        </h2>
      </div>

      {/* Subtitle */}
      <p className="text-white/70 text-sm sm:text-base max-w-xl">
        Search by name, province, or region to locate TESDA Training Institutions.
      </p>

      {/* Search Input */}
      <div className="relative w-full mt-2">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <FiSearch className="text-white/60 w-5 h-5" />
        </div>
        <input
          aria-label="Search TTIs"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a name, province, or region..."
          className="
            w-full pl-12 pr-4 py-4
            rounded-3xl
            bg-white/10 backdrop-blur-md
            border border-white/20
            text-white placeholder-white/50
            focus:outline-none focus:ring-2 focus:ring-accent-400
            focus:border-accent-400
            hover:bg-white/20 hover:shadow-lg
            transition-all duration-300
          "
        />
      </div>
    </motion.div>
  );
}
