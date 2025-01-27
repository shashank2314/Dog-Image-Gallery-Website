/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        modalSlideIn: 'modalSlideIn 0.3s ease-out forwards',
        fadeIn: 'fadeIn 0.2s ease-out forwards',
      },
    },
  },
  plugins: [],
};