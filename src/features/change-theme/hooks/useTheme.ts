import { useEffect } from 'react'
import { create } from 'zustand'
import { reportOnSuccess } from '@/shared/utils'
import type { Theme, RealTheme } from '../types'
import { DEFAULT_THEME, THEME_KEY, THEME_LABEL } from '../constants'

interface ThemeStore {
  theme: Theme
  realTheme: RealTheme
  setTheme: (theme: Theme) => void
  setRealTheme: (theme: RealTheme) => void
}

function checkDarkTheme(theme: Theme) {
  return (
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )
}

function saveTheme(theme: Theme): Partial<ThemeStore> {
  const isDarkTheme = checkDarkTheme(theme)

  document.body.classList.toggle('dark' satisfies RealTheme, isDarkTheme)
  localStorage.setItem(THEME_KEY, theme)
  reportOnSuccess(`${THEME_LABEL[theme]}로 변경되었어요!`)

  return { theme, realTheme: isDarkTheme ? 'dark' : 'light' }
}

const defaultTheme = (localStorage.getItem(THEME_KEY) as Theme | null) || DEFAULT_THEME

const useThemeStore = create<ThemeStore>((set) => ({
  theme: defaultTheme,
  realTheme: checkDarkTheme(defaultTheme) ? 'dark' : 'light',
  setTheme: (theme) => set(saveTheme(theme)),
  setRealTheme: (realTheme) => set({ realTheme }),
}))

export function useTheme() {
  return useThemeStore()
}

export function useChangeThemeEvent() {
  const { theme, setRealTheme } = useTheme()

  useEffect(() => {
    const mediaTheme = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        setRealTheme(e.matches ? 'dark' : 'light')
        document.body.classList.toggle('dark' satisfies RealTheme, e.matches)
      }
    }

    mediaTheme.addEventListener('change', listener)

    return () => {
      mediaTheme.removeEventListener('change', listener)
    }
  }, [theme, setRealTheme])
}
