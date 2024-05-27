/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#237283",
        secondary: "#C0946C",
        gray500: "#4B4B4B",
        gray600: "#1E1E1E",
      },
    },
  },
  plugins: [],
}

