/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark mode colors
        'bg-primary': '#000000',
        'bg-secondary': '#0D0D0D',
        'bg-card': '#1A1A1A',
        'bg-card-hover': '#1F1F1F',
        'accent-red': '#DC143C',
        'accent-red-hover': '#B91C1C',
        'text-primary': '#FFFFFF',
        'text-secondary': '#E5E5E5',
        'text-muted': '#A3A3A3',
        'border-subtle': '#2A2A2A',

        // Light mode colors - Clean and vibrant
        'light-bg-primary': '#FFFFFF',
        'light-bg-secondary': '#F8F9FA',
        'light-bg-card': '#FFFFFF',
        'light-bg-card-hover': '#FFF5F5',
        'light-accent-red': '#DC143C',
        'light-accent-red-hover': '#B91C1C',
        'light-text-primary': '#1A1A1A',
        'light-text-secondary': '#4A4A4A',
        'light-text-muted': '#6B7280',
        'light-border-subtle': '#E5E7EB',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'heading': ['Sora', 'Inter', 'sans-serif'],
        'accent': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-red': '0 0 30px rgba(220, 20, 60, 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
