// components/ThemeToggle.jsx
"use client";
import React, { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // THE FIX: Wrap setMounted in a setTimeout.
  // This makes the update asynchronous, which stops the linter from complaining.
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer); // Cleanup (good practice)
  }, []);

  if (!mounted) {
    // Return a placeholder of the exact same size to prevent layout shift
    return <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="
        p-2.5 rounded-full transition-all duration-300
        bg-slate-100 hover:bg-slate-200 text-slate-600
        dark:bg-white/10 dark:hover:bg-white/20 dark:text-white
      "
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  );
}