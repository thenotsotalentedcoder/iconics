/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Crimson Red Palette
        'primary': {
          50: '#fff0f0',
          100: '#ffd6d6',
          200: '#ffadad',
          300: '#ff7a7a',
          400: '#f04040',
          500: '#C8000A',  // lighter hover variant
          600: '#A90007',  // MAIN accent
          700: '#8A0006',  // darker shade
          800: '#6B0005',
          900: '#4D0003',
        },
        'dark': {
          50: '#f4f4f4',
          100: '#e8e8e8',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#666666',
          600: '#444444',
          700: '#2a2a2a',
          800: '#1a1a1a',
          900: '#111111',
          950: '#0a0a0a',
        },
        // Semantic colors — pure black base
        'bg-primary': '#0A0A0A',
        'bg-dark': '#0A0A0A',
        'bg-darker': '#000000',
        'bg-light': '#f4f4f4',
        'bg-card': '#141414',
        'bg-card-hover': '#1C1C1C',
        'bg-secondary': '#0F0F0F',

        'accent': '#A90007',
        'accent-light': '#C8000A',
        'accent-dark': '#8A0006',
        'accent-red': '#A90007',

        'text-primary': '#FFFFFF',
        'text-secondary': '#E5E5E5',
        'text-light': '#ffffff',
        'text-muted': '#9A9A9A',
        'text-dark': '#111111',

        'border-subtle': '#262626',
        'border-dark': '#262626',
        'border-light': '#e8e8e8',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'accent': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(2.5rem, 8vw, 5rem)',
        'display': 'clamp(2rem, 5vw, 4rem)',
        'heading': 'clamp(1.5rem, 3vw, 2.5rem)',
        'subheading': 'clamp(1.25rem, 2vw, 1.75rem)',
      },
      boxShadow: {
        'soft': '0 2px 20px rgba(0, 0, 0, 0.3)',
        'medium': '0 4px 30px rgba(0, 0, 0, 0.4)',
        'large': '0 8px 40px rgba(0, 0, 0, 0.5)',
        'glow': '0 0 40px rgba(169, 0, 7, 0.35)',
        'glow-sm': '0 0 20px rgba(169, 0, 7, 0.25)',
        'glow-red': '0 0 30px rgba(169, 0, 7, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dark': 'linear-gradient(180deg, #0A0A0A 0%, #000000 100%)',
        'gradient-card': 'linear-gradient(135deg, #141414 0%, #0A0A0A 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
    },
  },
  plugins: [],
}
