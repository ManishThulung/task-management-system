/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#444CE7",
          25: "#F5F8FF",
          50: "#EEF4FF",
          100: "#E0EAFF",
          200: "#C7D7FE",
          300: "#A4BCFD",
          400: "#8098F9",
          500: "#6172F3",
          600: "#444CE7",
          700: "#3538CD",
          800: "#2D31A6",
          900: "#2D3282",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
      },
    },
  },
  plugins: [],
};
