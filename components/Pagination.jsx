"use client";
import React from "react";
import { FiChevronLeft, FiChevronRight, FiMoreHorizontal } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Pagination({ currentPage, totalItems, itemsPerPage, paginate }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  // --- LOGIC: Page Numbers with Dots ---
  const getPageNumbers = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) rangeWithDots.push(l + 1);
        else if (i - l !== 1) rangeWithDots.push("...");
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  const pages = getPageNumbers();

  // Calculate "Showing X-Y of Z" text
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="
      flex flex-col md:flex-row items-center justify-between 
      gap-4 mt-12 pt-6 
      border-t border-slate-200 dark:border-white/5
    ">
      
      {/* LEFT: Data Status Text */}
      <div className="text-sm text-slate-500 dark:text-slate-400 font-mono">
        Showing <span className="font-bold text-slate-900 dark:text-white">{startItem}-{endItem}</span> of {totalItems}
      </div>

      {/* RIGHT: The "Blueprint" Button Group */}
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-lg">
        
        {/* PREV BUTTON */}
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="
            p-2 rounded-md transition-all duration-200
            text-slate-500 hover:bg-white hover:text-blue-600 hover:shadow-sm
            dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white
            disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:shadow-none
          "
          aria-label="Previous"
        >
          <FiChevronLeft size={18} />
        </button>

        {/* NUMBERS */}
        <div className="flex items-center gap-1 px-1 border-x border-slate-200 dark:border-white/5 mx-1">
          {pages.map((page, index) => {
            if (page === "...") {
              return (
                <span key={`dots-${index}`} className="px-2 text-xs text-slate-400 font-mono">
                  <FiMoreHorizontal />
                </span>
              );
            }

            const isActive = page === currentPage;
            return (
              <motion.button
                key={page}
                whileTap={{ scale: 0.95 }}
                onClick={() => paginate(page)}
                className={`
                  w-8 h-8 rounded-md text-xs font-bold font-mono transition-all duration-200
                  flex items-center justify-center border
                  ${isActive 
                    ? "bg-white border-slate-200 text-blue-600 shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white" 
                    : "bg-transparent border-transparent text-slate-500 hover:bg-white/50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
                  }
                `}
              >
                {page}
              </motion.button>
            );
          })}
        </div>

        {/* NEXT BUTTON */}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="
            p-2 rounded-md transition-all duration-200
            text-slate-500 hover:bg-white hover:text-blue-600 hover:shadow-sm
            dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white
            disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:shadow-none
          "
          aria-label="Next"
        >
          <FiChevronRight size={18} />
        </button>

      </div>
    </div>
  );
}