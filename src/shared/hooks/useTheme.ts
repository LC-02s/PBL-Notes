import { create } from 'zustand'
import { toast } from 'react-toastify'
import type { Theme } from '../types'
import { DEFAULT_THEME, THEME_KEY, THEME_LABEL } from '../constants'

interface ThemeStore {
  theme: Theme
  setTheme: (theme: Theme) => void
}

function saveTheme(theme: Theme) {
  localStorage.setItem(THEME_KEY, theme)
  toast.success(`현재 테마: ${THEME_LABEL[theme]}`)

  return { theme }
}

const useThemeStore = create<ThemeStore>((set) => ({
  theme: (localStorage.getItem(THEME_KEY) as Theme | null) || DEFAULT_THEME,
  setTheme: (theme) => set(saveTheme(theme)),
}))

export default function useTheme() {
  return useThemeStore()
}
