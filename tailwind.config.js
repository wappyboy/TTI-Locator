/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tesda: {
          50: "#f3f7ff",
          100: "#e6f0ff",
          300: "#8fb0ff",
          500: "#1e3a8a",
          600: "#16326b",
          700: "#0f274f",
          800: "#0a1b34",
        },
        accent: {
          400: "#3B82F6",
          600: "#2563EB"
        },
        // --- New NITESD Colors ---
        nitesd: {
          darkest: '#103F3F', // A very dark teal for the background or text
          dark: '#1A4D4D',    // The darker base for the gradient (from-nitesd-dark)
          medium: '#286B6B',  // The slightly lighter color for the gradient (to-nitesd-medium)
          light: '#4A90E2',   // A lighter blue for accents, like hover states (hover:text-nitesd-light)
        }
        // -------------------------
      },
    },
  },
  plugins: [],
};