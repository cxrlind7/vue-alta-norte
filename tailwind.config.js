/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2a3729',
          100: '#f0f2f0',
          200: '#e1e5e0',
          300: '#cbd2c7',
          400: '#b0baa9',
          500: '#2a3729',
          600: '#7a8a74',
          700: '#63735e',
          800: '#516953',
          900: '#2a3729',
          950: '#1e2a1e',
        },
        secondary: {
          DEFAULT: '#265143',
          100: '#d3e4de',
          200: '#d8e7de',
          300: '#b5d1c3',
          400: '#8fb2a4',
          500: '#265143',
          600: '#56766b',
          700: '#476055',
          800: '#265143',
          900: '#1d3e33',
          950: '#060f0c',
        },
        surface: {
          DEFAULT: '#061717',
          700: '#474f4f',
          800: '#3f4444',
          900: '#061717',
        },
        neutral: {
          50:  '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        amble:   ['Amble', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        body:    ['Amble', 'Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'spin-slow':    'spin 3s linear infinite',
        'pulse-slow':   'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-4px)' },
        },
      },
      boxShadow: {
        'elegant':    '0 4px 20px -2px rgba(0, 0, 0, 0.1), 0 2px 8px -2px rgba(0, 0, 0, 0.06)',
        'elegant-lg': '0 10px 40px -4px rgba(0, 0, 0, 0.15), 0 4px 16px -4px rgba(0, 0, 0, 0.1)',
        'luxury':     '0 4px 20px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)',
        'luxury-lg':  '0 10px 40px rgba(0, 0, 0, 0.2), 0 4px 16px rgba(0, 0, 0, 0.15)',
        'glow':       '0 0 20px rgb(42 55 41 / .3)',
      },
      transitionTimingFunction: {
        'elegant': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      backgroundImage: {
        'gradient-elegant': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'gradient-radial':  'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
