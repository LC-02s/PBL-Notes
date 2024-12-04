import type { ColorChip } from '@/shared/types'
import { cn } from '@/shared/utils'

interface ColorDropdownTriggerProps {
  value: ColorChip
  toggle: () => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const colorChip: Record<ColorChip, string> = {
  red: 'before:bg-chip-red',
  orange: 'before:bg-chip-orange',
  yellow: 'before:bg-chip-yellow',
  green: 'before:bg-chip-green',
  blue: 'before:bg-chip-blue',
  purple: 'before:bg-chip-purple',
  pink: 'before:bg-chip-pink',
  none: 'before:bg-gray500',
}

export function ColorDropdownTrigger({ value, toggle }: ColorDropdownTriggerProps) {
  return (
    <button
      type="button"
      title="색상 변경"
      className={cn(
        'flex h-10 w-32 items-center rounded-md border border-gray200 pl-10 transition-colors before:absolute before:inset-y-0 before:left-3.5 before:m-auto before:size-3 before:rounded-full before:bg-gray500 hover:border-info active:border-info',
        colorChip[value],
      )}
      onClick={toggle}
    >
      {value}
    </button>
  )
}
