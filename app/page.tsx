"use client";
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiInbox, FiRefreshCw } from "react-icons/fi";
// We don't need to import useTheme anymore for styling! CSS handles it.
import SearchBar from "../components/SearchBar";
import FilterChips from "../components/FilterChips";
import TtiCard from "../components/TtiCard";
import ttis from "../data/ttis.json";

type Tti = {
  id: string;
  name: string;
  province: string;
  region: string;
  lat?: number;
  lng?: number;
};

export default function Page() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<string | null>(null);
  const items: Tti[] = ttis as Tti[];

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

  return (
    // Base text color handles both modes: text-slate-900 (Light) vs dark:text-white (Dark)
    <div className="max-w-6xl mx-auto px-4 pb-20 text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* PAGE TITLE */}
      <div className="text-center py-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
          Find a Training Center
        </h2>
        <p className="text-sm md:text-base max-w-2xl mx-auto text-slate-600 dark:text-white/50">
          Search over {items.length} accredited institutions across the Philippines.
        </p>
      </div>

      {/* GLASS COMMAND BAR */}
      <div className="sticky top-6 z-40 mb-8">
        <div className="
          relative
          flex flex-col md:flex-row items-center gap-4 md:gap-6
          p-2 rounded-3xl
          backdrop-blur-xl border shadow-2xl
          
          /* LIGHT MODE: White-ish glass */
          bg-white/80 border-slate-200 shadow-slate-300/40
          
          /* DARK MODE: Dark glass */
          dark:bg-slate-900/80 dark:border-white/10 dark:shadow-black/50
          
          transition-colors duration-300
        ">
          
          {/* SEARCH */}
          <div className="w-full flex-1 relative group">
            <div className="pl-2">
              <SearchBar query={query} setQuery={setQuery} />
            </div>
          </div>

          {/* DIVIDER */}
          <div className="hidden md:block w-px h-10 bg-gradient-to-b from-transparent via-slate-300 dark:via-white/10 to-transparent" />

          {/* FILTERS */}
          <div className="w-full md:w-auto flex flex-col justify-center min-w-[200px]">
            <div className="flex items-center justify-between mb-1 px-3">
              <div className="flex items-center gap-2">
                <FiFilter className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-white/40">
                  Filter Region
                </span>
              </div>
              
              {/* Count Badge */}
              <span className="text-[10px] font-mono px-1.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-400">
                {filtered.length} found
              </span>
            </div>
            
            <div className="w-full md:max-w-xs overflow-x-auto custom-scrollbar px-1 pb-1">
              {/* Note: removed theme={theme} prop. The component should use dark: classes internally now */}
              <FilterChips
                regions={regions}
                activeRegion={region}
                setActiveRegion={setRegion}
              />
            </div>
          </div>
        </div>
      </div>

      {/* RESULTS GRID */}
      <motion.section layout className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            /* EMPTY STATE */
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="
                col-span-full flex flex-col items-center justify-center py-24 text-center border rounded-3xl
                bg-slate-100/50 border-slate-200
                dark:bg-white/5 dark:border-white/10
              "
            >
              <div className="
                p-4 rounded-full mb-4 ring-4
                bg-slate-200 text-slate-400 ring-slate-300/50
                dark:bg-slate-800 dark:text-slate-500 dark:ring-slate-800/50
              ">
                <FiInbox size={48} />
              </div>
              <h3 className="text-xl font-bold mb-2">No locations found</h3>
              <p className="max-w-md mx-auto mt-2 leading-relaxed text-sm text-slate-600 dark:text-white/50">
                We couldnt find any centers
                {query && <> matching <span className="font-medium text-slate-900 dark:text-white">{query}</span></>}
                {region && <> in <span className="font-medium text-slate-900 dark:text-white">{region}</span></>}.
              </p>
              <button
                onClick={() => { setQuery(""); setRegion(null); }}
                className="
                  mt-8 flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full transition-all shadow-lg
                  bg-blue-500 hover:bg-blue-400 text-white shadow-blue-500/30
                  dark:bg-blue-600 dark:hover:bg-blue-500 dark:shadow-blue-900/20
                "
              >
                <FiRefreshCw /> Clear Filters
              </button>
            </motion.div>
          ) : (
            filtered.map((t) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={t.id}
                className="h-full"
              >
                {/* Note: removed theme={theme} prop here too */}
                <TtiCard tti={t} /> 
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.section>
    </div>
  );
}