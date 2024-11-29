export type ColorChip = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'none'

export type SortType = 'create' | 'update' | 'title'

export type SortedAt = 'desc' | 'asc'

export interface Folder {
  id: number
  name: string
  color: ColorChip
  sort: { type: SortType; sortedAt: SortedAt }
}
