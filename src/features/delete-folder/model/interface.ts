import type { Folder } from '@/entities/folder'

export interface UseDeleteFolderParams {
  id: Folder['id']
  onDelete?: () => void
}

export interface DeleteWithNoteCheckboxProps {
  getDefaultValue: () => boolean
  toggle: () => void
}
