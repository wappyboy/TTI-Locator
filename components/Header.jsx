// components/Header.jsx
import React from "react";

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-50 bg-gradient-to-r from-tesda-800 to-tesda-700/90 shadow-md backdrop-blur-md py-6 px-6 flex items-center justify-center relative">
      
      {/* Left Logos: Bagong Pilipinas + TESDA */}
      <div className="absolute left-6 flex items-center gap-4">
        {/* Bagong Pilipinas Logo */}
        <div className="w-20 h-16 flex items-center justify-center flex-shrink-0">
          <img
            src="/bagong-pilipinas.png" // replace with your logo path
            alt="Bagong Pilipinas Logo"
            className="h-full object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* TESDA Logo */}
        <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
          <img
            src="/tesda-logo.png" // replace with your logo path
            alt="TESDA Logo"
            className="h-full object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Center: NITESD Title + Subtitle */}
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-wide">
          NITESD
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-xl mt-1">
          National Institute for Technical Education and Skills Development
        </p>
      </div>

    </header>
  );
}
