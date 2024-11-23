/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scrollbar: {
        thin: {
          size: '2px', // Adjust the size here
        },
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  
  plugins: [
    require('tailwind-scrollbar'), // Ensure compatibility mode is off
  ],
  
}