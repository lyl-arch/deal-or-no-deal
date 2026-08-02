/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
        'gold-light': '#F0D060',
        'gold-dark': '#996515',
        studio: {
          bg: '#0a0a0f',
          card: '#1a1a2e',
          accent: '#16213e',
        }
      },
      fontFamily: {
        display: ['"Trebuchet MS"', '"Lucida Sans Unicode"', 'sans-serif'],
        mono: ['"Courier New"', 'monospace'],
      },
      animation: {
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'spotlight': 'spotlight 8s ease-in-out infinite',
      },
      keyframes: {
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' },
        },
        spotlight: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}
