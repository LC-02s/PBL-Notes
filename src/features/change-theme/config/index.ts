import type { Theme } from '../model'

export const DEFAULT_THEME: Theme = 'system'

export const THEME_LABEL: Record<Theme, string> = {
  system: '시스템 테마',
  light: '밝은 테마',
  dark: '어두운 테마',
}

export const THEMES: Theme[] = ['system', 'light', 'dark']

export const THEME_KEY = 'theme'
