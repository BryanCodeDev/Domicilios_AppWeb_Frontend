/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#E91E63',
        primaryDark: '#C2185B',
        secondary: '#FF9800',
        secondaryDark: '#F57C00',
        accent: '#4CAF50',
        dark: '#212121',
        light: '#FAFAFA',
      },
    },
  },
  plugins: [],
}