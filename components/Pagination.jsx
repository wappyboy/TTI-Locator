// components/Pagination.jsx
"use client";
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({ currentPage, totalItems, itemsPerPage, paginate }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t border-slate-200 dark:border-white/5">
      
      {/* Page Info text */}
      <span className="text-sm text-slate-500 dark:text-slate-400">
        Showing page <span className="font-bold text-slate-900 dark:text-white">{currentPage}</span> of <span className="font-bold text-slate-900 dark:text-white">{totalPages}</span>
      </span>

      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="
            flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all
            bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600
            dark:bg-slate-800 dark:border-white/10 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:dark:hover:bg-slate-800
          "
        >
          <FiChevronLeft /> Prev
        </button>

        {/* Next Button */}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="
            flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all
            bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600
            dark:bg-slate-800 dark:border-white/10 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:dark:hover:bg-slate-800
          "
        >
          Next <FiChevronRight />
        </button>
      </div>
    </div>
  );
}