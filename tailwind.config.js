/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3483fa",
        "primary-hover": "#2968c8",
        secondary: "#00a650",
        warning: "#ff6b35",
        "text-primary": "#333333",
        "text-secondary": "#666666",
        "text-muted": "#999999",
        border: "#e6e6e6",
        "border-light": "#f5f5f5",
      },
      fontFamily: {
        sans: [
          "Proxima Nova",
          "-apple-system",
          "Helvetica Neue",
          "Helvetica",
          "Roboto",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
