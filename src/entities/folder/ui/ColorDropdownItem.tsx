import type { ColorChip } from '@/shared/types'
import { colorChip } from './ColorDropdownTrigger'
import { cn } from '@/shared/utils'

interface ColorDropdownItemProps {
  value: ColorChip
  selectedValue: ColorChip
  setValue: (value: ColorChip) => void
}

export default function ColorDropdownItem({
  value,
  setValue,
  selectedValue,
}: ColorDropdownItemProps) {
  const isSelected = value === selectedValue

  if (isSelected) {
    return null
  }

  return (
    <li
      className={cn(
        'relative before:pointer-events-none before:absolute before:inset-y-0 before:left-3 before:m-auto before:size-3 before:rounded-full before:bg-gray500',
        colorChip[value],
      )}
    >
      <button
        type="button"
        title={`색상 선택: ${value}`}
        className="flex h-9 w-36 items-center rounded pl-10 transition-colors hover:bg-gray100 active:bg-gray100"
        onClick={() => setValue(value)}
        disabled={isSelected}
      >
        {value}
      </button>
    </li>
  )
}
