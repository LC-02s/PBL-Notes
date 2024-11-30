import React from 'react'
import { useTheme } from '@/shared/hooks'
import { THEME_LABEL } from '@/shared/constants'
import { cn } from '@/shared/utils'
import { HiddenText, Icon, MenuButton } from '@/shared/ui'

export default function ThemeButton() {
  const { theme, setTheme } = useTheme()
  const isLightTheme = theme === 'light'
  const isDarkTheme = theme === 'dark'

  React.useEffect(() => {
    document.body.classList.toggle('dark', isDarkTheme)
  }, [isDarkTheme])

  return (
    <MenuButton
      title={`테마 변경: ${THEME_LABEL[theme]}`}
      onClick={() => setTheme(isDarkTheme ? 'light' : 'dark')}
    >
      <Icon.SunSolid
        className={cn(
          'absolute inset-0 m-auto opacity-0 transition-opacity',
          isLightTheme && 'animate-pop-spin opacity-100',
        )}
      />
      <Icon.MoonSolid
        className={cn(
          'absolute inset-0 m-auto opacity-0 transition-opacity',
          isDarkTheme && 'animate-pop-spin opacity-100',
        )}
      />
      <HiddenText>{`테마 변경: ${THEME_LABEL[theme]}}`}</HiddenText>
    </MenuButton>
  )
}
