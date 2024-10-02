/** @type {import('tailwindcss').Config} */
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
    },
  },
  
  plugins: [
    require('tailwind-scrollbar'), // Ensure compatibility mode is off
  ],
  
}