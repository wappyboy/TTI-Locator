"use client";
import React, { useMemo, useState, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiInbox, FiRefreshCw, FiSearch, FiList } from "react-icons/fi";
import SearchBar from "../components/SearchBar";
import FilterChips from "../components/FilterChips";
import TtiCard from "../components/TtiCard";
import Pagination from "../components/Pagination"; 
import ttis from "../data/ttis.json";

// 1. Define Data Type
type Tti = {
  id: string;
  name: string;
  province: string;
  region: string;
  lat?: number;
  lng?: number;
};

export default function Page() {
  // --- STATE ---
  const [query, setQuery] = useState<string>("");
  const [region, setRegion] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("asc"); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // --- CONFIG ---
  const itemsPerPage = 9; 
  const items: Tti[] = ttis as Tti[];

  // --- HANDLERS (Clean Code Pattern) ---
  
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1); 
  };

  const handleRegionChange = (newRegion: string | null) => {
    setRegion(newRegion);
    setCurrentPage(1); 
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
    setCurrentPage(1); 
  };

  const handleClearAll = () => {
    setQuery("");
    setRegion(null);
    setCurrentPage(1); 
  };

  // --- MEMOIZED DATA LOGIC ---

  const regions = useMemo(() => {
    return Array.from(new Set(items.map((i) => i.region).filter(Boolean))).sort();
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      if (region && i.region !== region) return false;
      if (!q) return true;
      return (
        i.name?.toLowerCase().includes(q) ||
        i.province?.toLowerCase().includes(q) ||
        i.region?.toLowerCase().includes(q)
      );
    });
  }, [items, query, region]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortOrder === "asc") return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });
  }, [filtered, sortOrder]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sorted.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20 transition-colors duration-300">
      
      {/* 1. Page Title */}
      <div className="text-center py-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-slate-900 dark:text-white drop-shadow-sm">
          Find a Training Center
        </h2>
        <p className="text-sm md:text-base max-w-2xl mx-auto text-slate-600 dark:text-blue-100/70 font-medium">
          Search over {items.length} accredited institutions across the Philippines.
        </p>
      </div>

      {/* 2. Glass Command Bar (Sticky) */}
      <div className="sticky top-6 z-40 mb-8">
        <div className="
          relative flex flex-col md:flex-row items-center gap-4 md:gap-6 p-2 rounded-3xl 
          backdrop-blur-xl border shadow-2xl transition-colors duration-300 
          
          /* Light Mode: Crisp White Glass */
          bg-white/80 border-slate-200 shadow-slate-300/40 
          
          /* Dark Mode: Deep Navy Glass */
          dark:bg-slate-900/80 dark:border-white/10 dark:shadow-black/50
        ">
          
          {/* Search Input Section */}
          <div className="w-full flex-1 relative group flex items-center">
            <div className="pl-4 pr-2 text-slate-400 dark:text-white/30 group-focus-within:text-blue-500 transition-colors">
              <FiSearch size={20} />
            </div>
            <SearchBar query={query} setQuery={handleSearch} />
          </div>
          
          {/* Vertical Divider */}
          <div className="hidden md:block w-px h-10 bg-gradient-to-b from-transparent via-slate-300 dark:via-white/10 to-transparent" />
          
          {/* Filter Controls */}
          <div className="w-full md:w-auto flex flex-col justify-center min-w-[240px] gap-3 md:gap-0">
            
            {/* Sort & Count Row */}
            <div className="flex items-center justify-between px-3 md:mb-1">
               <div className="flex items-center gap-2">
                 <FiList className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                 <select 
                   value={sortOrder}
                   onChange={handleSortChange}
                   className="
                     bg-transparent text-[10px] uppercase tracking-widest font-bold 
                     text-slate-500 dark:text-white/40 
                     focus:outline-none cursor-pointer 
                     hover:text-blue-600 dark:hover:text-blue-400 transition-colors
                   "
                 >
                   <option value="asc">Sort A-Z</option>
                   <option value="desc">Sort Z-A</option>
                 </select>
               </div>
               
               {/* Result Count Badge */}
               <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 border border-transparent dark:border-blue-500/30">
                 {filtered.length} found
               </span>
            </div>

            {/* Horizontal Filter Chips */}
            <div className="w-full md:max-w-xs overflow-x-auto custom-scrollbar px-1 pb-1">
              <FilterChips regions={regions} activeRegion={region} setActiveRegion={handleRegionChange} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Results Grid */}
      <motion.section layout className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr">
        <AnimatePresence mode="popLayout">
          {sorted.length === 0 ? (
            
            /* --- EMPTY STATE (Updated for Premium Look) --- */
            <motion.div 
              layout 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              className="
                col-span-full flex flex-col items-center justify-center py-24 text-center 
                rounded-3xl border border-dashed
                
                /* Light Mode */
                bg-white/50 border-slate-300
                
                /* Dark Mode */
                dark:bg-white/5 dark:border-white/10
              "
            >
              <div className="
                p-5 rounded-full mb-4 ring-4 
                bg-slate-100 text-slate-400 ring-slate-200 
                dark:bg-slate-800 dark:text-slate-500 dark:ring-slate-700/50
              ">
                <FiInbox size={48} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">No locations found</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                Try adjusting your search or filter to find what youre looking for.
              </p>
              
              <button 
                onClick={handleClearAll} 
                className="
                  flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full transition-all shadow-lg 
                  bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/30 
                  dark:bg-blue-600 dark:hover:bg-blue-500 dark:shadow-blue-900/40
                "
              >
                <FiRefreshCw /> Clear Filters
              </button>
            </motion.div>

          ) : (
            
            /* --- RENDER CARDS --- */
            currentItems.map((t) => (
              <motion.div 
                layout 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.9 }} 
                transition={{ duration: 0.2 }} 
                key={t.id} 
                className="h-full"
              >
                <TtiCard tti={t} />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.section>

      {/* 4. Pagination Controls */}
      <Pagination 
        itemsPerPage={itemsPerPage} 
        totalItems={sorted.length} 
        paginate={paginate} 
        currentPage={currentPage} 
      />

    </div>
  );
}