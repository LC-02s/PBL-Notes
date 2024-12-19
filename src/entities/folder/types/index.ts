export type ColorChip = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'none'

export type SortedAt = 'desc' | 'asc'

export type SortType = 'create' | 'update' | 'title'
export interface Folder {
  id: number
  name: string
  color: ColorChip
  sort: { type: SortType; sortedAt: SortedAt }
}

export type FolderDB = Map<Folder['id'], Folder>

export type FolderNameMap = Map<Folder['name'], Folder['id']>

export type FolderFormValues = { name: Folder['name']; color: ColorChip }
