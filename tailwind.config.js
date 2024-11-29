import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    './src/app/*.{js,ts,jsx,tsx,mdx}',
    './src/widgets/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/entities/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Pretendard"', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        light: 'url("/img/light-theme-bg.jpeg")',
        dark: 'url("/img/dark-theme-bg.jpeg")',
      },
      colors: {
        gray000: 'var(--grsc-000)',
        gray100: 'var(--grsc-100)',
        gray200: 'var(--grsc-200)',
        gray300: 'var(--grsc-300)',
        gray400: 'var(--grsc-400)',
        gray500: 'var(--grsc-500)',
        gray600: 'var(--grsc-600)',
        gray700: 'var(--grsc-700)',
        gray800: 'var(--grsc-800)',
        gray900: 'var(--grsc-900)',
        warn: 'var(--smtc-warn)',
        caution: 'var(--smtc-caution)',
        success: 'var(--smtc-success)',
        info: 'var(--smtc-info)',
        'chip-red': '#CF4542',
        'chip-orange': '#D4671D',
        'chip-yellow': '#C48632',
        'chip-green': '#3C7758',
        'chip-blue': '#2C739D',
        'chip-purple': '#885FA6',
        'chip-pink': '#B9447D',
      },
    },
  },
  plugins: [],
}
