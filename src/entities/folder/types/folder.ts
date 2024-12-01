import type { ColorChip, SortedAt, SortType } from '@/shared/types'

export interface Folder {
  id: number
  name: string
  color: ColorChip
  sort: { type: SortType; sortedAt: SortedAt }
}
