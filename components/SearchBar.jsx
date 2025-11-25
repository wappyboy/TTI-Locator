// components/SearchBar.jsx
"use client";
import React, { useRef, useEffect } from "react";
import { FiX, FiCommand } from "react-icons/fi"; // Ensure you have FiCommand
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBar({ query, setQuery }) {
  const inputRef = useRef(null);

  // 1. KEYBOARD SHORTCUT LOGIC
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check for Ctrl+K or Cmd+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault(); // Stop browser default behavior
        inputRef.current?.focus();
      }
      // Check for Escape
      if (e.key === "Escape") {
        setQuery("");
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setQuery]);

  return (
    <div className="relative w-full group">
      <input
        ref={inputRef}
        aria-label="Search training centers"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type a name, province, or region..."
        className="
          w-full block py-3 pr-12
          bg-transparent
          border-none outline-none focus:ring-0
          text-base md:text-lg font-medium
          transition-colors duration-300
          
          /* CUSTOM TEXT SELECTION COLOR (Matches your brand) */
          selection:bg-blue-500 selection:text-white
          
          /* PREMIUM CURSOR */
          caret-blue-500
          
          /* LIGHT MODE */
          text-slate-900 
          placeholder-slate-400
          
          /* DARK MODE */
          dark:text-white 
          dark:placeholder-white/30
        "
      />

      {/* 2. SMART ACTION AREA (Right Side) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center pr-1 pointer-events-none">
        <AnimatePresence mode="wait">
          
          {/* STATE A: Show CLEAR button if there is text */}
          {query ? (
            <motion.button
              key="clear-btn"
              initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 45 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setQuery("");
                inputRef.current?.focus(); // Keep focus after clearing
              }}
              // Add pointer-events-auto so the button is clickable
              className="
                pointer-events-auto
                p-1.5 rounded-full
                bg-slate-200 text-slate-500
                hover:bg-slate-300 hover:text-slate-700
                dark:bg-white/10 dark:text-white/60 dark:hover:bg-white/20 dark:hover:text-white
                transition-colors shadow-sm
              "
              aria-label="Clear search"
            >
              <FiX size={14} />
            </motion.button>
          ) : (
            /* STATE B: Show SHORTCUT BADGE if empty */
            <motion.div
              key="shortcut-badge"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="hidden md:flex items-center gap-1 px-2 py-1 rounded-md border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5"
            >
              <span className="text-[10px] font-bold text-slate-400 dark:text-white/30 font-mono flex items-center gap-0.5">
                <span className="text-xs">⌘</span> K
              </span>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}