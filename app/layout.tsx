import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google"; // Official Font optimization
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Providers } from "./providers"; // Import the wrapper we just made

// Optimize fonts (performance win)
const inter = Inter({ subsets: ["latin"] });

// 1. Enhanced Metadata for SEO & Sharing
export const metadata: Metadata = {
  title: "ROMO-TTIMD TTI Locator | TESDA",
  description: "Official government tool to locate TESDA Training and Testing Institutions (TTIs) nationwide.",
  icons: {
    icon: "/favicon.ico", // Ensure you have this file in public/
  },
  openGraph: {
    title: "TESDA TTI Locator",
    description: "Find accredited training centers near you.",
    type: "website",
    locale: "en_PH",
  },
};

// 2. Viewport settings (critical for mobile responsiveness)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Prevents zooming issues on inputs
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning is REQUIRED when using next-themes
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased transition-colors duration-300`}>
        <Providers>
          {/* Background Layer:
            - Supports Dark (slate-900) and Light (slate-50) modes automatically.
            - Uses the 'bg-grid' pattern we will define in CSS.
          */}
          <div className="fixed inset-0 -z-10 bg-slate-50 dark:bg-[#0B1120] transition-colors duration-300" />
          
          {/* Optional: The Dot Pattern Background */}
          <div className="fixed inset-0 -z-10 opacity-40 dark:opacity-20 pointer-events-none bg-[url('/assets/grid-pattern.svg')] bg-[size:20px_20px] mask-gradient" />

          {/* Header Section */}
          <Header />

          {/* Main Content:
            - flex-grow: Pushes the footer down automatically (No calc() needed)
            - w-full: Ensures full width
          */}
          <main className="flex-grow w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
            {children}
          </main>

          {/* Footer Section */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}