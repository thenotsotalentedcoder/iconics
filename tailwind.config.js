/**
 * tailwind.config.js — updated color tokens for teal scheme
 * Replace your existing colors block with this.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent:        '#3E8B87',
        'accent-light':'#5AA8A3',
        'accent-dark': '#2D6E6A',
      },
      backgroundColor: {
        'bg-primary':  '#FAFBFB',
        'bg-secondary':'#EEF3F3',
        'bg-card':     '#FFFFFF',
        'bg-dark':     '#1C3A44',
        'bg-darker':   '#122830',
      },
      textColor: {
        'text-primary':  '#1A2E38',
        'text-secondary':'#4A6472',
        'text-muted':    '#7A9AA6',
      },
      borderColor: {
        'border-subtle': 'rgba(62,139,135,0.14)',
        'border-dark':   'rgba(62,139,135,0.22)',
      },
      boxShadow: {
        'card':   '0 2px 16px rgba(30,58,68,0.06)',
        'medium': '0 8px 32px rgba(30,58,68,0.10)',
        'large':  '0 16px 48px rgba(30,58,68,0.14)',
        'glow':   '0 0 28px rgba(62,139,135,0.35)',
      },
    },
  },
  plugins: [],
};

/*
  KEY TOKENS:
  --teal-dark:   #1C3A44  (deep navy-teal — hero bg, dark sections)
  --teal:        #3E8B87  (primary accent)
  --teal-light:  #5AA8A3  (hover states, highlights)
  --teal-pale:   #EEF3F3  (alternate section bg)
  --text:        #1A2E38  (headings)
  --text-mid:    #4A6472  (body)
  --text-muted:  #7A9AA6  (captions, labels)
*/