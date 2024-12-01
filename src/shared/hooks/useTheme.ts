import { create } from 'zustand'
import type { Theme } from '../types'
import { DEFAULT_THEME, THEME_KEY, THEME_LABEL } from '../constants'
import { reportOnSuccess } from '../utils'

interface ThemeStore {
  theme: Theme
  setTheme: (theme: Theme) => void
}

function saveTheme(theme: Theme) {
  localStorage.setItem(THEME_KEY, theme)
  reportOnSuccess(`${THEME_LABEL[theme]}로 변경되었어요!`)

  return { theme }
}

const useThemeStore = create<ThemeStore>((set) => ({
  theme: (localStorage.getItem(THEME_KEY) as Theme | null) || DEFAULT_THEME,
  setTheme: (theme) => set(saveTheme(theme)),
}))

export default function useTheme() {
  return useThemeStore()
}
