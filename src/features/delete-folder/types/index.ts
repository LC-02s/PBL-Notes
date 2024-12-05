import type { Folder } from '@/entities/folder'

export interface UseDeleteFolderParams {
  id: Folder['id']
  onDelete?: (withNote: boolean) => void
}

export interface DeleteWithNoteCheckboxProps {
  getDefaultValue: () => boolean
  toggle: () => void
}
