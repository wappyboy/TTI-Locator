"use client";
import React, { useMemo, useState } from "react";
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
    return Array.from(new Set(items.map((i) => i.region).filter(Boolean)));
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
    <div className="max-w-5xl mx-auto">
      <section className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <div className="mb-3 text-white/80 font-semibold text-lg sm:text-xl">
              TTI Locator
            </div>
            <SearchBar query={query} setQuery={setQuery} />
          </div>
          <div className="w-full sm:w-64 mt-3 sm:mt-0">
            <div className="text-sm text-white/70 mb-2">Region</div>
            <FilterChips
              regions={regions}
              activeRegion={region}
              setActiveRegion={setRegion}
            />
          </div>
        </div>
      </section>

      <section className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {filtered.length === 0 ? (
          <div className="text-white/70 col-span-full py-10 text-center">
            No results found.
          </div>
        ) : (
          filtered.map((t) => <TtiCard key={t.id} tti={t} />)
        )}
      </section>
    </div>
  );
}
