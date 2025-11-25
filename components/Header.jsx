// components/Header.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";
// Import the new component we just made
import ThemeToggle from "./ThemeToggle"; 

export default function Header() {
  // Look how clean this component is now! 
  // No useState, no useEffect, no linter errors.

  return (
    <header className="relative w-full z-50">
      <div className="
        absolute inset-0 
        backdrop-blur-md border-b 
        transition-colors duration-300
        bg-white/80 border-slate-200
        dark:bg-slate-900/90 dark:border-white/5
      " />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between py-4 h-24">

          {/* LEFT: Logos */}
          <div className="flex items-center gap-4 z-20">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              className="w-14 h-14 rounded-full p-1 border shadow-sm bg-slate-100 border-slate-200 dark:bg-white/5 dark:border-white/5"
            >
              <img src="/bagong-pilipinas.png" alt="Bagong Pilipinas" className="w-full h-full object-contain" />
            </motion.div>
            
            <div className="w-px h-10 hidden sm:block bg-slate-300 dark:bg-white/10" />
            
            <motion.div whileHover={{ scale: 1.05 }} className="w-14 h-14">
              <img src="/tesda-logo.png" alt="TESDA" className="w-full h-full object-contain drop-shadow-md" />
            </motion.div>
          </div>

          {/* CENTER: Text */}
          <div className="absolute left-0 right-0 top-0 bottom-0 flex flex-col items-center justify-center pointer-events-none">
            <h1 className="
              text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-sm text-center
              text-transparent bg-clip-text 
              bg-gradient-to-r from-blue-700 via-blue-500 to-blue-800
              dark:from-white dark:via-blue-100 dark:to-white/80
            ">
              NITESD
            </h1>
            <p className="
              hidden md:block text-xs font-medium tracking-[0.2em] uppercase mt-1
              text-slate-500 dark:text-blue-200/70
            ">
              National Institute for Technical Education
            </p>
          </div>

          {/* RIGHT: Theme Toggle (Extracted Component) */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>

        </div>
      </div>
    </header>
  );
}