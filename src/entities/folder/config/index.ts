import type { Folder, ColorChip, SortType, SortedAt } from '../model'

export const DEFAULT_COLOR_CHIP: ColorChip = 'none'

export const DEFAULT_SORT_TYPE: SortType = 'create'

export const DEFAULT_SORTED_AT: SortedAt = 'asc'

export const DEFAULT_NOTE_SORT_TYPE: Readonly<Folder['sort']> = Object.freeze({
  type: DEFAULT_SORT_TYPE,
  sortedAt: DEFAULT_SORTED_AT,
})

export const MAX_NAME_LENGTH = 12

export const FOLDER_DB_KEY = 'folders'

export const COLOR_CHIP_STYLE: Record<ColorChip, string> = {
  red: 'before:bg-chip-red',
  orange: 'before:bg-chip-orange',
  yellow: 'before:bg-chip-yellow',
  green: 'before:bg-chip-green',
  blue: 'before:bg-chip-blue',
  purple: 'before:bg-chip-purple',
  pink: 'before:bg-chip-pink',
  none: 'before:bg-gray500',
}

export const INDEX_PATH = '/'

export const FOLDER_PATH_KEY = '/folder'

export const TRASH_PATH = '/trash'
