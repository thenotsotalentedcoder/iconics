/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Burgundy palette
        'primary': {
          50:  '#fff0f3',
          100: '#ffd6e0',
          200: '#ffadc0',
          300: '#ff7a99',
          400: '#e0406a',
          500: '#9E0034',  // lighter hover variant
          600: '#80002A',  // MAIN accent — burgundy
          700: '#5C001E',  // darker shade
          800: '#3D0014',
          900: '#1F000A',
        },

        // Off-white palette (warm-neutral, pairs with burgundy)
        'cream': {
          50:  '#FAFAFA',
          100: '#F5F0F1',
          200: '#EDE8E9',
          300: '#E8DEE0',
          400: '#D4C8CB',
          500: '#B8A8AC',
        },

        // Semantic tokens — off-white base
        'bg-primary':    '#FAFAFA',   // near-pure off-white
        'bg-dark':       '#EDE8E9',   // soft warm-gray section bg
        'bg-darker':     '#E8E2E3',   // deeper section bg
        'bg-light':      '#FFFFFF',   // pure white
        'bg-card':       '#FFFFFF',   // cards = white
        'bg-card-hover': '#F9F5F6',   // very faint warm on hover
        'bg-secondary':  '#F5F0F1',   // subtle warm-tinted off-white

        'accent':        '#80002A',   // burgundy
        'accent-light':  '#9E0034',   // lighter burgundy for hover
        'accent-dark':   '#5C001E',   // darker for pressed
        'accent-red':    '#80002A',   // alias

        'text-primary':  '#1A0A0E',   // near-black, warm undertone
        'text-secondary':'#3D1A24',   // dark burgundy-tinted
        'text-light':    '#FCFFE3',   // cream — for text on dark bg
        'text-muted':    '#7A5C63',   // warm rose-gray
        'text-dark':     '#1A0A0E',

        'border-subtle': '#E8DEE0',   // soft warm-rose border
        'border-dark':   '#D4C8CB',   // stronger border
        'border-light':  '#F0EAEB',
      },
      fontFamily: {
        'sans':    ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body':    ['Inter', 'system-ui', 'sans-serif'],
        'accent':  ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero':       'clamp(2.5rem, 8vw, 5rem)',
        'display':    'clamp(2rem, 5vw, 4rem)',
        'heading':    'clamp(1.5rem, 3vw, 2.5rem)',
        'subheading': 'clamp(1.25rem, 2vw, 1.75rem)',
      },
      boxShadow: {
        'soft':     '0 2px 20px rgba(128, 0, 42, 0.08)',
        'medium':   '0 4px 30px rgba(128, 0, 42, 0.12)',
        'large':    '0 8px 40px rgba(128, 0, 42, 0.16)',
        'glow':     '0 0 40px rgba(128, 0, 42, 0.25)',
        'glow-sm':  '0 0 20px rgba(128, 0, 42, 0.18)',
        'glow-red': '0 0 30px rgba(128, 0, 42, 0.22)',
        'card':     '0 2px 16px rgba(128, 0, 42, 0.08), 0 1px 4px rgba(128, 0, 42, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-cream':  'linear-gradient(180deg, #FAFAFA 0%, #EDE8E9 100%)',
        'gradient-card':   'linear-gradient(135deg, #FFFFFF 0%, #F9F5F6 100%)',
        'gradient-hero':   'linear-gradient(135deg, #FAFAFA 0%, #F5F0F1 50%, #EDE8E9 100%)',
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'pulse-slow':  'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient':    'gradient 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
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
