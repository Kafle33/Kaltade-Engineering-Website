/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F5FA',
          100: '#DDE8F4',
          200: '#B8D1E9',
          300: '#8EB5DC',
          400: '#5F95CC',
          500: '#2C6EB6',
          600: '#1D5393',
          700: '#163E70',
          800: '#102A54',
          900: '#0B1D3A', // Brand Deep Navy
          950: '#060F1E',
        },
        dark: {
          bg: '#0B1120',
          surface: '#111C30',
          card: '#162238',
          elevated: '#1D2C48',
          border: '#233554',
          borderSubtle: '#1B2A43',
          text: '#F8FAFC',
          muted: '#94A3B8',
        },
        brand: {
          navy: '#0B1D3A',
          blue: '#163E70',
          accent: '#E68A00',
          gold: '#F59E0B',
          light: '#F8FAFC',
          surface: '#F1F5F9',
          border: '#E2E8F0',
          text: '#0F172A',
          muted: '#64748B',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(11, 29, 58, 0.05), 0 1px 2px rgba(11, 29, 58, 0.03)',
        'card': '0 4px 20px -2px rgba(11, 29, 58, 0.06), 0 2px 6px -1px rgba(11, 29, 58, 0.03)',
        'card-hover': '0 20px 35px -5px rgba(11, 29, 58, 0.12), 0 10px 15px -5px rgba(11, 29, 58, 0.04)',
        'card-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.4), 0 2px 6px -1px rgba(0, 0, 0, 0.2)',
        'card-dark-hover': '0 20px 35px -5px rgba(0, 0, 0, 0.6), 0 10px 15px -5px rgba(0, 0, 0, 0.3)',
        'float': '0 30px 60px rgba(11, 29, 58, 0.18)',
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle, rgba(15, 29, 58, 0.06) 1px, transparent 1px)",
        'grid-pattern-dark': "radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
        'hero-gradient': "linear-gradient(135deg, #0B1D3A 0%, #102A54 50%, #163E70 100%)",
        'hero-gradient-dark': "linear-gradient(135deg, #060F1E 0%, #0B1D3A 50%, #102A54 100%)",
        'subtle-gradient': "linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%)",
        'subtle-gradient-dark': "linear-gradient(180deg, #0B1120 0%, #111C30 100%)",
      },
    },
  },
  plugins: [],
};
