/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",   // ✅ React ke sare components scan karega
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
// module.exports = {
//   purge: [],
//   darkMode: false, // or 'media' or 'class'
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}" // 👈 This tells Tailwind to scan all files in src/ that use JSX or TSX
//   ],
//   theme: {
//     extend: {},
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// }
