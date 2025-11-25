"use client";
import React from "react";
import { FiMapPin, FiPhone, FiMail, FiExternalLink, FiGlobe, FiFacebook } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="
      w-full mt-20 relative z-20 
      border-t
      transition-colors duration-300
      bg-slate-50 border-slate-200
      dark:bg-slate-900 dark:border-white/5
    ">
      
      {/* Decorative Top Highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          
          {/* COLUMN 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/tesda-logo.png" 
                alt="TESDA" 
                className="w-8 h-8 opacity-80 grayscale hover:grayscale-0 transition-all duration-300" 
              />
              <h3 className="font-bold text-lg tracking-wide text-slate-900 dark:text-white">
                TTI Locator
              </h3>
            </div>
            
            <p className="text-sm leading-relaxed max-w-xs text-slate-600 dark:text-slate-400">
              Bridging the gap between Filipino talent and technical education. Find accredited training centers nationwide and upskill for the future.
            </p>
            
            <div className="flex items-center gap-4 pt-2">
               <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-mono border border-blue-500/20">
                 NOT YET OFFICIAL ROMO TOOL
               </span>
            </div>

            {/* Social Media */}
            <div className="pt-4">
               <h4 className="text-xs font-bold uppercase tracking-wider mb-3 text-slate-400 dark:text-slate-500">
                 Connect With Us
               </h4>
               <a 
                 href="https://www.facebook.com/TESDAOfficial" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="
                   group inline-flex items-center gap-2 px-4 py-2 rounded-full
                   bg-[#1877F2] text-white
                   hover:bg-[#166fe5] hover:shadow-lg hover:-translate-y-0.5
                   transition-all duration-300
                   text-sm font-medium
                 "
                 aria-label="Visit our Facebook Page"
               >
                 <FiFacebook size={18} className="fill-current" />
                 <span>Facebook Page</span>
               </a>
            </div>
          </div>

          {/* COLUMN 2: Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-slate-900 dark:text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="https://www.tesda.gov.ph" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                  <FiExternalLink size={14} /> Official TESDA Website
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">Top In-Demand Courses</a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">Scholarship Programs</a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">Assessment Centers</a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-slate-900 dark:text-white">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <FiMapPin className="mt-1 text-blue-600 dark:text-blue-500 shrink-0" />
                <span>TESDA Complex, East Service Road, South Luzon Expressway, Taguig City, Philippines</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-blue-600 dark:text-blue-500 shrink-0" />
                <span>(02) 8888-5641 to 46</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-blue-600 dark:text-blue-500 shrink-0" />
                <a href="mailto:contactcenter@tesda.gov.ph" className="transition-colors hover:text-slate-900 dark:hover:text-white">
                  contactcenter@tesda.gov.ph
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR (Fixed Visibility) */}
      <div className="
        py-6 border-t
        bg-slate-200 border-slate-300
        dark:bg-black dark:border-white/10
      ">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
             <FiGlobe />
             <span>Republic of the Philippines</span>
          </div>

          <p className="text-xs text-center md:text-right text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} ROMO • TESDA. All Content is in the public domain unless otherwise stated.
          </p>
        </div>
      </div>
    </footer>
  );
}