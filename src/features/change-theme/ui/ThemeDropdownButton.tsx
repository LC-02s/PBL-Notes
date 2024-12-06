import { useDropdown, useTheme } from '@/shared/hooks'
import { THEME_LABEL, THEME_VALUES } from '@/shared/constants'
import { cn } from '@/shared/utils'
import { DropdownItem, DropdownWrapper, HiddenText, Icon, MenuButton } from '@/shared/ui'

export default function ThemeButton() {
  const { containerRef, isOpen, withClose, toggle } = useDropdown<HTMLDivElement>()
  const { realTheme, theme, setTheme } = useTheme()

  return (
    <div ref={containerRef} className="relative flex items-center justify-center">
      <MenuButton title="테마 변경" onClick={toggle}>
        <Icon.SunSolid
          className={cn(
            'absolute inset-0 m-auto opacity-0 transition-opacity',
            realTheme === 'light' && 'animate-pop-spin opacity-100',
          )}
        />
        <Icon.MoonSolid
          className={cn(
            'absolute inset-0 m-auto opacity-0 transition-opacity',
            realTheme === 'dark' && 'animate-pop-spin opacity-100',
          )}
        />
        <HiddenText>테마 변경</HiddenText>
      </MenuButton>
      <DropdownWrapper open={isOpen} className="left-[-7.25rem]">
        {THEME_VALUES.map((value) => (
          <DropdownItem
            key={value}
            title={THEME_LABEL[value]}
            className="w-36"
            value={value}
            selectedValue={theme}
            setValue={withClose(setTheme)}
          >
            {THEME_LABEL[value]}
          </DropdownItem>
        ))}
      </DropdownWrapper>
    </div>
  )
}
