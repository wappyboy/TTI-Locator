import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Providers } from "./providers"; 

// Optimize fonts 
const inter = Inter({ subsets: ["latin"] });

// 1. Enhanced Metadata
export const metadata: Metadata = {
  title: "ROMO-TTIMD TTI Locator | TESDA",
  description: "Official government tool to locate TESDA Training and Testing Institutions (TTIs) nationwide.",
  icons: {
    icon: "/favicon.ico", 
  },
  openGraph: {
    title: "TESDA TTI Locator",
    description: "Find accredited training centers near you.",
    type: "website",
    locale: "en_PH",
  },
};

// 2. Viewport settings
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased transition-colors duration-300`}>
        <Providers>
          
          {/* --- BACKGROUND LAYER 1: Solid Base --- */}
          {/* Light: Slate-50 / Dark: Deep Navy (#0B1120) */}
          <div className="fixed inset-0 -z-30 bg-slate-50 dark:bg-[#0B1120] transition-colors duration-300" />
          
          {/* --- BACKGROUND LAYER 2: Atmospheric Glow (The "Color Injection") --- */}
          <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
            {/* Top Left - Blue (Professionalism) */}
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] dark:bg-blue-600/10" />
            
            {/* Top Right - Amber/Gold (Excellence/Sun) */}
            <div className="absolute top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-amber-500/20 blur-[120px] dark:bg-amber-500/10" />
            
            {/* Bottom Left - Cyan (Technology) */}
            <div className="absolute -bottom-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-cyan-500/20 blur-[120px] dark:bg-cyan-500/10" />
          </div>

          {/* --- BACKGROUND LAYER 3: Grid Pattern (CSS Only) --- */}
          {/* This creates a tech grid without needing an external SVG file */}
          <div 
            className="fixed inset-0 -z-10 opacity-40 dark:opacity-20 pointer-events-none"
            style={{ 
              backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)", 
              backgroundSize: "32px 32px",
              maskImage: "radial-gradient(circle at center, black 50%, transparent 100%)", // Vignette effect
              WebkitMaskImage: "radial-gradient(circle at center, black 50%, transparent 100%)"
            }}
          />

          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="flex-grow w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
            {children}
          </main>

          {/* Footer */}
          <Footer />
          
        </Providers>
      </body>
    </html>
  );
}