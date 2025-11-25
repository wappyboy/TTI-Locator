"use client";
import React from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle"; 

// --- 1. MOVED CONFIG OUTSIDE (Better Performance) ---
const spinTransition = {
  duration: 8,
  repeat: Infinity,
  ease: "linear"
};

// --- 2. MOVED COMPONENT OUTSIDE (Fixes the Error) ---
const AnimatedLogos = ({ sizeClass }) => (
  <>
    {/* 1. BAGONG PILIPINAS */}
    <div style={{ perspective: "1000px" }}>
      <motion.div 
        className={`${sizeClass} relative`}
        animate={{ rotateY: 360 }}
        transition={spinTransition}
        style={{ transformStyle: "preserve-3d" }}
      >
        <img src="/bagong-pilipinas.png" alt="Bagong Pilipinas" className="w-full h-full object-contain drop-shadow-md" />
        <div className="absolute inset-0 rounded-full bg-black/10 blur-md -z-10" style={{ transform: "translateZ(-4px)" }} />
      </motion.div>
    </div>

    {/* Divider */}
    <div className="w-px h-8 md:h-10 bg-slate-300 dark:bg-white/10" />

    {/* 2. TESDA */}
    <div style={{ perspective: "1000px" }}>
      <motion.div 
        className={`${sizeClass} relative`}
        animate={{ rotateY: 360 }}
        transition={spinTransition}
        style={{ transformStyle: "preserve-3d" }}
      >
        <img src="/tesda-logo.png" alt="TESDA" className="w-full h-full object-contain drop-shadow-md" />
        <div className="absolute inset-0 rounded-full bg-black/10 blur-md -z-10" style={{ transform: "translateZ(-4px)" }} />
      </motion.div>
    </div>
  </>
);

export default function Header() {
  return (
    <header className="relative w-full z-50">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 backdrop-blur-md border-b transition-colors duration-300 bg-white/80 border-slate-200 dark:bg-slate-900/90 dark:border-white/5">
        <div className="absolute top-0 left-1/4 w-1/2 h-full bg-blue-500/10 blur-[100px] pointer-events-none opacity-0 dark:opacity-100" />
        <div className="absolute top-0 right-1/4 w-1/4 h-full bg-amber-500/10 blur-[100px] pointer-events-none opacity-0 dark:opacity-100" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* CONTAINER: Adjusted height to fit stacked content on mobile */}
        <div className="flex items-center justify-center md:justify-between py-3 md:py-4 min-h-[120px] md:min-h-[6rem]">

          {/* --- A. DESKTOP LOGOS (Hidden on Mobile) --- */}
          <div className="hidden md:flex absolute left-4 lg:left-8 items-center gap-4 z-20">
            <AnimatedLogos sizeClass="w-14 h-14" />
          </div>

          {/* --- B. CENTER CONTENT (Stacked on Mobile, Text Only on Desktop) --- */}
          <div className="flex flex-col items-center justify-center w-full text-center z-10">
            
            {/* MOBILE LOGOS (Hidden on Desktop) */}
            <div className="flex md:hidden items-center gap-3 mb-3">
              <AnimatedLogos sizeClass="w-12 h-12" />
            </div>

            {/* TEXT (Visible Everywhere) */}
            <h1 className="
              text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-sm
              text-transparent bg-clip-text 
              bg-gradient-to-r from-blue-700 via-blue-600 to-red-600
              dark:from-white dark:via-blue-100 dark:to-amber-200
            ">
              ROMO-TTIMD
            </h1>
            <p className="
              text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase mt-1
              text-slate-500 dark:text-blue-200/80
            ">
              Regional Operations Management Division
            </p>
          </div>

          {/* --- C. THEME TOGGLE (Absolute Right) --- */}
          <div className="absolute right-4 top-4 md:top-1/2 md:-translate-y-1/2 z-30">
            <ThemeToggle />
          </div>

        </div>
      </div>
    </header>
  );
}