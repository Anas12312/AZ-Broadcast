/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#121212",
        "primary-alt": "#1e1f22",
        "secondary": "#b3b3b3",
        "secondary-alt": "#C0C0C0",
        "accent": "#533ba0",
        "accent-alt": "#00ff00",
        "highlight": "#ffd700",
        "highlight-alt": "#7df9ff",
        "text-main": "#333333",
        "queue": "#800080",
        "queue-alt": "#6a5acd"

      },
      fontFamily:{
        "main": ["main", "sans-serif"]
      }
    },
  },
  plugins: [],
}