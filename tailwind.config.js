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
        'chip-red': '#CF4542',
        'chip-orange': '#D4671D',
        'chip-yellow': '#C48632',
        'chip-green': '#3C7758',
        'chip-blue': '#2C739D',
        'chip-purple': '#885FA6',
        'chip-pink': '#B9447D',
        dimmed: 'var(--dimmed-background)',
        warn: 'var(--smtc-warn)',
        'warn-light': 'var(--smtc-warn-light)',
        'warn-sub': 'var(--smtc-warn-sub)',
        caution: 'var(--smtc-caution)',
        'caution-light': 'var(--smtc-caution-light)',
        'caution-sub': 'var(--smtc-caution-sub)',
        success: 'var(--smtc-success)',
        'success-light': 'var(--smtc-success-light)',
        'success-sub': 'var(--smtc-success-sub)',
        info: 'var(--smtc-info)',
        'info-light': 'var(--smtc-info-light)',
        'info-sub': 'var(--smtc-info-sub)',
      },
    },
  },
  plugins: [],
}
