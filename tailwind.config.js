/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 6s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        dark: {
          DEFAULT: '#0a0a0a',
          100: '#111111',
          200: '#191919',
          300: '#232323',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      transitionDuration: {
        '1500': '1500ms',
        '2000': '2000ms',
      }
    },
  },
  plugins: [
    require('tailwind-gradient-mask-image'),
  ],
}; 