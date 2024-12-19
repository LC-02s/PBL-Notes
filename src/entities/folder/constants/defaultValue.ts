import type { Folder, ColorChip, SortType, SortedAt } from '../types'

export const DEFAULT_COLOR_CHIP: ColorChip = 'none'

export const DEFAULT_SORT_TYPE: SortType = 'create'

export const DEFAULT_SORTED_AT: SortedAt = 'asc'

export const DEFAULT_NOTE_SORT_TYPE: Folder['sort'] = {
  type: DEFAULT_SORT_TYPE,
  sortedAt: DEFAULT_SORTED_AT,
}
