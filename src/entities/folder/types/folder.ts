import type { ColorChip, SortedAt, SortType } from '@/shared/types'

export interface Folder {
  id: number
  name: string
  color: ColorChip
  sort: { type: SortType; sortedAt: SortedAt }
}

export type FolderDB = Map<Folder['id'], Folder>

export type FolderNameMap = Map<Folder['name'], Folder['id']>

export type FolderFormValues = { name: Folder['name']; color: ColorChip }
