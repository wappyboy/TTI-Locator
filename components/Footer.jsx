// components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full mt-10 py-6 px-6 sm:px-10 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        <div className="flex flex-col">
          <h3 className="text-white font-semibold text-sm">
            TESDA Training Institutions Locator
          </h3>
          <p className="text-white/60 text-xs mt-1">
            A public information tool for locating TESDA TTIs nationwide.
          </p>
        </div>

        <div className="flex flex-col text-right">

          <p className="text-white/40 text-xs mt-1">
            © {new Date().getFullYear()} TESDA. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
