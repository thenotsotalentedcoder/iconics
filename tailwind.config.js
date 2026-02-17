/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Navy/Teal Palette - Minimal Medical Theme
        'primary': {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        'dark': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Semantic colors
        'bg-dark': '#0a1628',
        'bg-darker': '#050d18',
        'bg-light': '#f8fafc',
        'bg-card': '#0f2638',
        'bg-card-hover': '#153248',
        
        'accent': '#14b8a6',
        'accent-light': '#2dd4bf',
        'accent-dark': '#0d9488',
        
        'text-light': '#ffffff',
        'text-muted': '#94a3b8',
        'text-dark': '#0f172a',
        
        'border-dark': '#1e3a50',
        'border-light': '#e2e8f0',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(2.5rem, 8vw, 5rem)',
        'display': 'clamp(2rem, 5vw, 4rem)',
        'heading': 'clamp(1.5rem, 3vw, 2.5rem)',
        'subheading': 'clamp(1.25rem, 2vw, 1.75rem)',
      },
      boxShadow: {
        'soft': '0 2px 20px rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 30px rgba(0, 0, 0, 0.15)',
        'large': '0 8px 40px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 40px rgba(20, 184, 166, 0.3)',
        'glow-sm': '0 0 20px rgba(20, 184, 166, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dark': 'linear-gradient(180deg, #0a1628 0%, #050d18 100%)',
        'gradient-card': 'linear-gradient(135deg, #0f2638 0%, #0a1628 100%)',
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
