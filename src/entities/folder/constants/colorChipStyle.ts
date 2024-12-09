import type { ColorChip } from '@/shared/types'

const COLOR_CHIP_STYLE: Record<ColorChip, string> = {
  red: 'before:bg-chip-red',
  orange: 'before:bg-chip-orange',
  yellow: 'before:bg-chip-yellow',
  green: 'before:bg-chip-green',
  blue: 'before:bg-chip-blue',
  purple: 'before:bg-chip-purple',
  pink: 'before:bg-chip-pink',
  none: 'before:bg-gray500',
}

export default COLOR_CHIP_STYLE
