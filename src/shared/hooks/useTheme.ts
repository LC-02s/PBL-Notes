import { create } from 'zustand'
import type { Theme, RealTheme } from '../types'
import { DEFAULT_THEME, THEME_KEY, THEME_LABEL } from '../constants'
import { reportOnSuccess } from '../utils'

interface ThemeStore {
  theme: Theme
  realTheme: RealTheme
  setTheme: (theme: Theme) => void
}

function isDarkTheme(theme: Theme) {
  return (
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )
}

function saveTheme(theme: Theme): Partial<ThemeStore> {
  localStorage.setItem(THEME_KEY, theme)
  reportOnSuccess(`${THEME_LABEL[theme]}로 변경되었어요!`)

  if (isDarkTheme(theme)) {
    document.body.classList.add('dark' satisfies RealTheme)

    return { theme, realTheme: 'dark' }
  }

  document.body.classList.remove('dark' satisfies RealTheme)

  return { theme, realTheme: 'light' }
}

const defaultTheme = (localStorage.getItem(THEME_KEY) as Theme | null) || DEFAULT_THEME

const useThemeStore = create<ThemeStore>((set) => ({
  theme: defaultTheme,
  realTheme: isDarkTheme(defaultTheme) ? 'dark' : 'light',
  setTheme: (theme) => set(saveTheme(theme)),
}))

export default function useTheme() {
  return useThemeStore()
}
