/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Monochrome Palette
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#F8F9FA',
        'bg-tertiary': '#F3F4F6',

        'text-primary': '#111827',
        'text-secondary': '#6B7280',
        'text-muted': '#9CA3AF',

        'accent-dark': '#1F2937',
        'accent-medium': '#374151',

        'border-light': '#E5E7EB',
        'border-medium': '#D1D5DB',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'heading': ['Archivo Black', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'accent': ['Space Mono', 'monospace'],
      },
      fontSize: {
        'hero': 'clamp(4rem, 12vw, 10rem)',
        'display': 'clamp(2.5rem, 6vw, 5rem)',
        'heading': 'clamp(2rem, 4vw, 3rem)',
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'large': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
