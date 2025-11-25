"use client";
import React from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle"; 

export default function Header() {
  // Shared Animation Config
  const spinTransition = {
    duration: 8, // 8 seconds per full rotation (Smooth & Majestic)
    repeat: Infinity,
    ease: "linear"
  };

  return (
    <header className="relative w-full z-50">
      {/* 1. BACKGROUND GLOW (New Color Injection) */}
      <div className="
        absolute inset-0 
        backdrop-blur-md border-b 
        transition-colors duration-300
        /* Light Mode: White with subtle blue tint */
        bg-white/80 border-slate-200
        /* Dark Mode: Dark Navy with a hint of warmth/gold at the top */
        dark:bg-slate-900/90 dark:border-white/5
      ">
        {/* Subtle Gradient Mesh for Dark Mode (Adds depth so it's not flat blue) */}
        <div className="absolute top-0 left-1/4 w-1/2 h-full bg-blue-500/10 blur-[100px] pointer-events-none opacity-0 dark:opacity-100" />
        <div className="absolute top-0 right-1/4 w-1/4 h-full bg-amber-500/10 blur-[100px] pointer-events-none opacity-0 dark:opacity-100" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between py-4 h-24">

          {/* LEFT: 3D ANIMATED LOGOS */}
          <div className="flex items-center gap-4 z-20">
            
            {/* 1. BAGONG PILIPINAS (3D) */}
            <div style={{ perspective: "1000px" }}>
              <motion.div 
                className="w-14 h-14 relative"
                animate={{ rotateY: 360 }}
                transition={spinTransition}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front Image */}
                <img 
                  src="/bagong-pilipinas.png" 
                  alt="Bagong Pilipinas" 
                  className="w-full h-full object-contain drop-shadow-md" 
                />
                {/* 3D Depth Shadow (Behind) */}
                <div 
                  className="absolute inset-0 rounded-full bg-black/10 blur-md -z-10" 
                  style={{ transform: "translateZ(-4px)" }} 
                />
              </motion.div>
            </div>
            
            {/* Divider */}
            <div className="w-px h-10 hidden sm:block bg-slate-300 dark:bg-white/10" />
            
            {/* 2. TESDA (3D) */}
            <div style={{ perspective: "1000px" }}>
              <motion.div 
                className="w-14 h-14 relative"
                animate={{ rotateY: 360 }}
                transition={spinTransition}
                style={{ transformStyle: "preserve-3d" }}
              >
                <img 
                  src="/tesda-logo.png" 
                  alt="TESDA" 
                  className="w-full h-full object-contain drop-shadow-md" 
                />
                <div 
                  className="absolute inset-0 rounded-full bg-black/10 blur-md -z-10" 
                  style={{ transform: "translateZ(-4px)" }} 
                />
              </motion.div>
            </div>

          </div>

          {/* CENTER: Text (Updated Colors) */}
          <div className="absolute left-0 right-0 top-0 bottom-0 flex flex-col items-center justify-center pointer-events-none">
            <h1 className="
              text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-sm text-center
              text-transparent bg-clip-text 
              /* Light Mode Gradient: Official Blue to Red (Patriotic) */
              bg-gradient-to-r from-blue-700 via-blue-600 to-red-600
              /* Dark Mode Gradient: White to Gold (Excellence) */
              dark:from-white dark:via-blue-100 dark:to-amber-200
            ">
              ROMO-TTIMD
            </h1>
            <p className="
              hidden md:block text-xs font-medium tracking-[0.2em] uppercase mt-1
              /* Updated Subtitle Colors */
              text-slate-500 dark:text-blue-200/80
            ">
              Regional Operations Management Division
            </p>
          </div>

          {/* RIGHT: Theme Toggle */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>

        </div>
      </div>
    </header>
  );
}