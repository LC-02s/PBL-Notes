import { create } from 'zustand'
import type { Theme } from '../types'
import { THEME_KEY } from '../constants'

interface ThemeStore {
  theme: Theme
  setTheme: (theme: Theme) => void
}

function saveTheme(theme: Theme) {
  localStorage.setItem(THEME_KEY, theme)

  return { theme }
}

const useThemeStore = create<ThemeStore>((set) => ({
  theme: (localStorage.getItem(THEME_KEY) as Theme | null) || 'light',
  setTheme: (theme) => set(saveTheme(theme)),
}))

export default function useTheme() {
  return useThemeStore()
}
