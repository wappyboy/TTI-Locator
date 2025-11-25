"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  // We do NOT need to check 'mounted' here.
  // 1. We handled the UI safety in ThemeToggle.jsx already.
  // 2. We added suppressHydrationWarning to layout.tsx already.
  // 3. Waiting to mount here would crash components calling useTheme().

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}