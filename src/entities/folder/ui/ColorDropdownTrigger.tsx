import { cn } from '@/shared/lib'
import type { ColorChip } from '../model'
import { COLOR_CHIP_STYLE } from '../config'

interface ColorDropdownTriggerProps {
  value: ColorChip
  toggle: () => void
}

export default function ColorDropdownTrigger({ value, toggle }: ColorDropdownTriggerProps) {
  return (
    <button
      type="button"
      title="색상 변경"
      className={cn(
        'flex h-10 w-32 items-center rounded-md border border-gray200 pl-10 transition-colors before:absolute before:inset-y-0 before:left-3.5 before:m-auto before:size-3 before:rounded-full before:bg-gray500 hover:border-info active:border-info',
        COLOR_CHIP_STYLE[value],
      )}
      onClick={toggle}
    >
      {value}
    </button>
  )
}
