/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  
    themes: ["light", "dark", "night","winter"],
  
  plugins: [require("daisyui")],
}

