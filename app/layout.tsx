import { ReactNode } from "react";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "TESDA TTI Locations",
  description:
    "Search TESDA Training and Testing Institutions (TTIs) and open them in Google Maps.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-tesda-900 text-white">
        <Header />
        <main className="min-h-[calc(100vh-120px)] p-6 sm:p-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
