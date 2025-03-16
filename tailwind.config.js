/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js}',
  ],
  theme: {
    extend: {
      colors: {
        text: '#272c2d',
        primary: '#00b67a',
        secondary: '#8792a1',
        accent: '#07bbc4',
        error: '#ef5350',    
      }      
    },
  },
  plugins: [],
}
