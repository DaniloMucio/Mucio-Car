/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#121212',
        secondary: '#FFD700',
        accent: '#DC143C',
        dark: {
          DEFAULT: '#121212',
          light: '#1E1E1E',
          medium: '#2A2A2A',
          dark: '#0A0A0A',
        },
        light: {
          DEFAULT: '#DCD7C9',
          dark: '#B8B2A7',
          medium: '#E5E1D8',
          light: '#F2EFE9',
        },
        gold: {
          DEFAULT: '#EAB308',
          dark: '#A16207',
          light: '#FACC15',
          pale: '#FEF9C3',
        },
        vintage: {
          red: '#8B0000',
          brown: '#8B4513',
          gold: '#DAA520',
          cream: '#F5F5DC',
          black: '#121212',
        },
      },
      fontFamily: {
        sans: ['Roboto Slab', 'serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'vintage': '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 215, 0, 0.05)',
        'vintage-inset': 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
        'vintage-text': '1px 1px 2px rgba(0, 0, 0, 0.5)',
        'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'custom-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'vintage-pattern': "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233a3a3a' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      textShadow: {
        'vintage': '1px 1px 2px rgba(0, 0, 0, 0.5)',
        'vintage-light': '1px 1px 2px rgba(255, 255, 255, 0.2)',
      },
      borderWidth: {
        '3': '3px',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'slide-up': 'slideUp 1s ease-out',
        'slide-left': 'slideInLeft 1s ease-out',
        'slide-right': 'slideInRight 1s ease-out',
      },
    },
  },
  plugins: [],
} 