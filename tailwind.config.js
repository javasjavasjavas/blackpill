/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        void: '#000000',
        ink: '#0A0A0A',
        carbon: '#111111',
        graphite: '#1A1A1A',
        ash: '#2A2A2A',
        steel: '#4D4D4D',
        smoke: '#8A8A8A',
        bone: '#C9C7C1',
        paper: '#F2F1ED',
        chalk: '#FFFFFF',
        accent: '#FF3B00',
        volt: '#D6FF3B',
      },
      fontFamily: {
        sans: ['Archivo', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Archivo', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        '10': ['10px', { lineHeight: '1.2' }],
        '11': ['11px', { lineHeight: '1.2' }],
        '13': ['13px', { lineHeight: '1.35' }],
        mega: ['clamp(3.25rem, 11vw, 12rem)', { lineHeight: '0.86', letterSpacing: '-0.045em' }],
        giga: ['clamp(4rem, 16vw, 20rem)', { lineHeight: '0.82', letterSpacing: '-0.05em' }],
        title: ['clamp(2.25rem, 5.5vw, 5rem)', { lineHeight: '0.92', letterSpacing: '-0.035em' }],
        section: ['clamp(1.75rem, 3.4vw, 3.25rem)', { lineHeight: '0.96', letterSpacing: '-0.03em' }],
      },
      letterSpacing: {
        tightest: '-0.05em',
        meta: '0.14em',
        label: '0.22em',
      },
      maxWidth: {
        frame: '1680px',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.23, 1, 0.32, 1)',
        swift: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-50%,0,0)' },
        },
        blink: {
          '0%, 45%': { opacity: '1' },
          '50%, 95%': { opacity: '0.15' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        blink: 'blink 2.4s steps(1, end) infinite',
        shimmer: 'shimmer 1.6s infinite',
      },
    },
  },
  plugins: [],
}
